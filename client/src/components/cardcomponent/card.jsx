import "./card.css";
import NoteInfo from "../noteinfo/noteinfo";
const Card=(props)=>{
    const displayInfo=()=>{
        props.urr[props.number]=true;
        props.setUrr([...props.urr]);
    }
    return(
        <>
        <div className="cardContainer" onClick={displayInfo}>
        <div>{props.data.date}</div>
        <div>{props.data.title}</div>
        <div>{(props.data.description).slice(0,30)}...</div>
        </div>
        {props.urr[props.number]===true?<NoteInfo info={props.data} xrr={props.urr} setXrr={props.setUrr} ind={props.number}/>:null}
        </>
    )
}
export default Card;