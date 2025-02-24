// setup Profile_aka _Avatar pic.....
import noprofile from "../../assets/default.png";//populating default pic...

export default function Avatar({ src, size, radius }) {
  const style = {
    height: size ? `${size}px` : "40px",
    width: size ? `${size}px` : "40px",
    borderRadius: "50%" ,
    overflow: "hidden",
  };
  return (
    <div className="avatar" style={style}>
      <img
        src={src ? src : noprofile}
        alt="avatar"
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
      />
    </div>
  );
}
