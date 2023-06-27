import { bin } from "next/image";

export default function Message(props) {
const BACK_END_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000" ;
 async function deleteMsg(){
    console.log("in delete msg func")
    const updated_meet = await fetch(`${BACK_END_URL}/Sendmessage`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          meet_id:props.meet_id,
          email:props.author,
          id:props.comment_id,
          flag:"delete"
        }),
      }).then((res)=>res.json()).then((data)=>console.log(data))
    console.log(updated_meet)
  }

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
        <img src="/assets/dustbin.png" onClick={deleteMsg} style={{ height: "20px",position:"absolute",right:"17vw",cursor:"pointer" }} alt="" />
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
