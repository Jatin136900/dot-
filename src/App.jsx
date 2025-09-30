import { useState } from "react";
import "./App.css";

function App() {
  const [circles, setCircles] = useState([]);
  const [deletedCircles, setDeletedCircles] = useState([]);

  function handelclick(e) {
    if (e.target.nodeName === "BUTTON") return;
    const obj = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setCircles([...circles, obj]);
    setDeletedCircles([]); 
  }

  function handleUndo() {
    if (circles.length === 0) return;
    let copy = [...circles];
    const lastInsertedCircle = copy.pop();
    setCircles(copy);
    setDeletedCircles([...deletedCircles, lastInsertedCircle]);
  }

  function handleRedo() {
    if (deletedCircles.length === 0) return;
    let copy = [...deletedCircles];
    const lastDeletedCircle = copy.pop();
    setDeletedCircles(copy);
    setCircles([...circles, lastDeletedCircle]);
  }

  function handleReset() {
    setCircles([]);
    setDeletedCircles([]);
  }

  return (
    <>
      <div className="wrapper" onClick={handelclick}>
        <div className="buttons">
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleUndo}>Undo</button>
          <button onClick={handleRedo}>Redo</button>
        </div>

        {circles.map((obj) => (
          <div
            key={obj.id}
            className="circle"
            style={{
              top: obj.y - 7.5 + "px",
              left: obj.x - 7.5 + "px",
              position: "absolute",
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

export default App;
