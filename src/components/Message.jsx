export default function Message(props){
    return(
        <div>
        <div id="messageInfo" style={{display:"flex"}}>
          <p id="messageAuthor">{props.author} - </p>
          <p id="timestamp" style={{color:"grey"}}> {props.timestamp}</p>
        </div>
        <div style={{ height: "fit-content",padding:"5px", backgroundColor: "#87bb72",width:"450px" }}>
          {props.messageText}
        </div>
      </div>
    )
}