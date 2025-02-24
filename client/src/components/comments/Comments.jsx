import React, { useContext, useState } from "react"; 
import "./comments.css";
import Avatar from "../custom/Avatar";
import Comment from "./Comment";
import { AppContext } from "../../context/AppContext";
import * as services from "../../services/services";

export default function Comments({ videoId }) {
  const { state } = useContext(AppContext); 
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!commentText.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    try {
      // Post the comment to the backend
      const res = await services.postCommentAsync(videoId, {
        desc: commentText,
      });

      if (res.status === 200) {
        // Add the new comment 
        setComments([...comments, res.data]);
        setCommentText(""); // Clear field
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  return (
    <div className={`comments ${state?.theme}`}>
      <div className="comments-wrapper">
        <h4>{comments.length} Comments</h4>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="inputs-wrapper">
            <Avatar size={35} />
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Enter your comment"
              required
            />
          </div>
          <div className="inputs-actions">
            <button type="button" onClick={() => setCommentText("")}>
              Clear
            </button>
            <button type="submit">Comment</button>
          </div>
        </form>

        {/* Comment List */}
        <div className="comment-list">
          {comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}