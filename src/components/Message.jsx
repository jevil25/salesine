import { bin } from "next/image";

export default function Message(props) {
  return (
    <div style={{marginBottom:"20px"}}>
      <div className="messageHeading" style={{display:"flex",alignItems:"center",position:"relative"}}>
        <div id="messageInfo" style={{ display: "flex",alignItems:"center" }}>
          <p id="messageAuthor" style={{margin:"0px"}}>{props.author} - </p>
          <p id="timestamp" style={{ color: "grey",margin:"0px" }}>
            {" "}
            {props.timestamp}
          </p>
        </div>
        <img src="/assets/dustbin.png" style={{ height: "20px",position:"absolute",right:"17vw",cursor:"pointer" }} alt="" />
      </div>
      <div
        style={{
          height: "fit-content",
          padding: "5px",
          backgroundColor: "#87bb72",
          width: "450px",
        }}
      >
        {props.messageText}
      </div>
    </div>
  );
}
