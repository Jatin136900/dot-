import { useState } from "react";
import "./App.css";

function App() {

  const [circles, SetCircles] = useState([]);
  const [deletedCircles, SetDeletedCircles] = useState([]);

  function handelclick(e) {
    if (e.target.nodeName === "BUTTON") return;
    const obj = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    }

    // push obj in circle 
    SetCircles([...circles, obj]); // circle.push(obj)
  }

  function handleUndo() {
    let copy = circles;
    const lastInsertedCircle = copy.pop();
    SetDeletedCircles([...deletedCircles, lastInsertedCircle]);
  }

  function handleRedo() {
    let copy = circles;
    const lastDeletedCircle = copy.pop();
    SetCircles([...circles, lastDeletedCircle]);
  }

  console.log("circles" + circles);
  console.log("deleted" + deletedCircles)
  return <>
    <div className="wrapper" onClick={handelclick}>
      <div className="buttons">
        <button>Reset</button>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>

      {
        circles.length > 0 ?
          circles.map((obj) => {
            return (
              <div className="circle" style={{ top: obj.y - 7.5 + "px", left: obj.x - 7.5 + "px" }}></div>
            );
          })
          : ""
      }

    </div>

  </>

}

export default App;