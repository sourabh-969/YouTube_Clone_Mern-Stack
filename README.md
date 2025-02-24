# YouTube Clone - MERN Stack<img src="https://www.aalpha.net/wp-content/uploads/2023/11/MERN-Stack-technologies.png" width=20% >

<h2>Deploy link(frontend only): <a href="https://you-tube-clone-mern-stack.vercel.app/"> Click🔗Me</h2>
<h3>Note</h3>
<p>This project includes a file upload feature that allows users to upload videos. The backend uses <a href="https://www.npmjs.com/package/multer"><b>Multer</b></a>, a Node.js middleware, to handle the file upload process and save the videos to the local machine.`for more `</p><br>

**Project Demonstration**

https://github.com/user-attachments/assets/3b0399dd-b0c0-403c-870a-4a0be886e963

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [File Upload Feature](#file-upload-feature)
5. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
6. [Project Structure](#project-structure)
7. [API Endpoints](#api-endpoints)
8. [Frontend Components](#frontend-components)
9. [Authentication](#authentication)
10. [Search and Filter Functionality](#search-and-filter-functionality)
11. [Responsive Design](#responsive-design)
12. [Testing](#testing)
13. [Deployment](#deployment)
14. [Contributing](#contributing)
15. [License](#license)

## Project Overview

This project is a full-stack YouTube clone built using the <a href="https://www.geeksforgeeks.org/mern-stack/"><b>MERN</b></a> (MongoDB, Express, React, Node.js) stack. It aims to replicate core features of YouTube, allowing users to view, interact with videos, and manage their own channels.

## Features

1. **User Authentication**
   - Register and login functionality
   - JWT-based authentication

2. **Home Page**
   - YouTube-like header with search bar
   - Toggleable sidebar
   - Filter buttons for video categories
   - Grid display of video thumbnails

3. **Video Player Page**
   - Video playback functionality
   - Title and description display
   - Channel information
   - Like and dislike buttons
   - Comments section (add, edit, delete comments)

4. **Channel Page**
   - Create a channel (for authenticated users)
   - Display channel videos
   - Edit or delete videos

5. **Search and Filter Functionality**
   - Search videos by title
   - Filter videos by category

6. **Responsive Design**
   - Fully responsive across devices (mobile, tablet, desktop)

## Technologies Used

- **Client aka (Frontend)**: React, React Router, Axios
- **Server aka (Backend)**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Version Control**: Git
   - Addition vscode extension
      - **Pitter**: Format Document

## File Upload Feature
- This project includes a file upload feature that allows users to upload videos. The backend uses <a href="https://www.npmjs.com/package/multer"><b>Multer</b></a>, a Node.js middleware, to handle the file upload process and save the videos to the local machine. { use can find uploaded file in directory- `server/src/assest` }<br>
####   *If you plan to deploy this project, consider using cloud storage (e.g., AWS S3, Google Cloud Storage) for better scalability.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (MongoDB Atlas account)
- Git

### Installation

1. Clone the repository:

https://github.com/sourabh-969/YouTube_Clone_Mern-Stack.git

2. Install backend dependencies:
>cd `server`<br>
>npm install

3. Install frontend dependencies:
>cd `../client`<br>
>npm install


4. Set up environment variables:
- Search for `.envExample` file in the `server` and `client` directory
- Edit both the file accordingly and `Rename` file as `.env`.


5. Start the backend server:
>cd server<br>
>node src/server.js || nodemon src/server.js


6. Start the frontend development server: 
>cd client<br>
>npm run dev

7. Open your browser and navigate to `http://localhost:${PORT}$`

8. Project Structure
<table>
<tr><pre>
**YouTube/ root directory**
├─ client/
├─ LICENSE
├─ README.md
└─ server/
</pre>
</tr>
<tr>
<td width=50%>
<pre>
***client/ aka Backend***
├─ .env
├─ .eslintrc.cjs
├─ .gitignore
├─ index.html
├─ package-lock.json
├─ package.json
├─ public/
│  └─ vite.svg
├─ src/
│  ├─ App.jsx
│  ├─ assets/
│  │  ├─ banner.png
│  │  ├─ bookstore.png
│  │  ├─ default.png
│  │  ├─ listcover.png
│  │  └─ sample.mp4
│  ├─ components/
│  │  ├─ comments/
│  │  │  ├─ Comment.jsx
│  │  │  ├─ comments.css
│  │  │  └─ Comments.jsx
│  │  ├─ custom/
│  │  │  ├─ Avatar.jsx
│  │  │  ├─ videoplayer.css
│  │  │  └─ VideoPlayer.jsx
│  │  ├─ navbar/
│  │  │  ├─ navbar.css
│  │  │  ├─ Navbar.jsx
│  │  │  ├─ navmenu.css
│  │  │  └─ NavMenu.jsx
│  │  ├─ sidebar/
│  │  │  ├─ sidebar.css
│  │  │  └─ Sidebar.jsx
│  │  └─ videos/
│  │     ├─ playlistcard.css
│  │     ├─ PlaylistCard.jsx
│  │     ├─ videocard.css
│  │     ├─ VideoCard.jsx
│  │     ├─ videolist.css
│  │     └─ VideoList.jsx
│  ├─ context/
│  │  └─ AppContext.jsx
│  ├─ global.css
│  ├─ main.jsx
│  ├─ pages/
│  │  ├─ channel/
│  │  │  ├─ channel.css
│  │  │  ├─ Channel.jsx
│  │  │  ├─ ChannelVideos.jsx
│  │  │  ├─ editchannel.css
│  │  │  └─ EditChannel.jsx
│  │  ├─ home/
│  │  │  ├─ home.css
│  │  │  └─ Home.jsx
│  │  ├─ login/
│  │  │  ├─ login.css
│  │  │  └─ Login.jsx
│  │  ├─ register/
│  │  │  ├─ register.css
│  │  │  └─ Register.jsx
│  │  ├─ search/
│  │  │  └─ Search.jsx
│  │  ├─ upsert/
│  │  │  ├─ dragdrop.css
│  │  │  ├─ DragDropFiles.jsx
│  │  │  ├─ upsert.css
│  │  │  └─ Upsert.jsx
│  │  └─ video/
│  │     ├─ OtherVideos.jsx
│  │     ├─ video.css
│  │     └─ Video.jsx
│  └─ services/
│     └─ services.js
└─ vite.config.js
</pre>
</td>
<td>
<pre>
***server/ aka Frontend***
├─ .gitignore
├─ package-lock.json
├─ package.json
└─ src/
   ├─ .env
   ├─ assets/
   │  ├─ banners/
   │  │  └─ banner.png
   │  ├─ covers/
   │  │  ├─ 1740227920803-bookstore.png
   │  │  ├─ 1740228262866-cover2.jpg
   │  │  ├─ 1740228698833-cover1.jpg
   │  │  └─ cover1.jpg
   │  ├─ profiles/
   │  │  ├─ 1740228032789-profile.jpg
   │  │  ├─ 1740228210899-1740228032789-profile.jpg
   │  │  └─ 1740228475227-backiee-120891.jpg
   │  └─ videos/
   │     ├─ 1740227919957-sample.mp4
   │     ├─ 1740228262044-sample1.mp4
   │     └─ 1740228697963-sample2.mp4
   ├─ controllers/
   │  ├─ authController.js
   │  ├─ channelController.js
   │  ├─ commentController.js
   │  └─ videoController.js
   ├─ helps/
   │  ├─ dbConfig.js
   │  ├─ upload.js
   │  └─ verify.js
   ├─ models/
   │  ├─ Channel.js
   │  ├─ Comment.js
   │  └─ Video.js
   ├─ routes/
   │  ├─ auth.js
   │  ├─ channels.js
   │  ├─ comments.js
   │  ├─ uploads.js
   │  └─ videos.js
   └─ server.js
   </pre>
</td>
</tr>
</table>

## API Endpoints
```
- **Auth Routes**:
  - POST `/api/auth/register`: Register a new user
  - POST `/api/auth/login`: Login user

- **Video Routes**:
  - GET `/api/videos`: Get all videos
  - GET `/api/videos/:id`: Get a specific video
  - POST `/api/videos`: Create a new video (protected)
  - PUT `/api/videos/:id`: Update a video (protected)
  - DELETE `/api/videos/:id`: Delete a video (protected)

- **Channel Routes**:
  - GET `/api/channels/:id`: Get channel information
  - POST `/api/channels`: Create a new channel (protected)
  - PUT `/api/channels/:id`: Update channel information (protected)

- **Comment Routes**:
  - GET `/api/videos/:id/comments`: Get comments for a video
  - POST `/api/videos/:id/comments`: Add a comment (protected)
  - PUT `/api/comments/:id`: Update a comment (protected)
  - DELETE `/api/comments/:id`: Delete a comment (protected)
```


## Frontend Components

- `Header`: Contains the YouTube logo, search bar, and user authentication buttons
- `Sidebar`: Toggleable sidebar with navigation links
- `VideoGrid`: Displays a grid of video thumbnails
- `VideoPlayer`: Handles video playback and associated information
- `CommentSection`: Manages comments for a video
- `ChannelPage`: Displays channel information and videos
- `AuthForms`: Handles user registration and login


## Authentication

JWT-based authentication is implemented. Upon successful login, a token is generated and stored in local storage. This token is then sent with each request to authenticate the user for protected routes.

## Search and Filter Functionality

- The search bar in the header allows users to search videos by title.
- Filter buttons on the home page enable filtering videos by category.


## Responsive Design

The application is designed to be fully responsive across devices:

- Mobile: Single column layout
- Tablet: Two column video grid
- Desktop: Multi-column video grid with sidebar


## Testing

- Backend: Use Postman testing of API endpoints

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## License

This project is licensed under the MIT License.
