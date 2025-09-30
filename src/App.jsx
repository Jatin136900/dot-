import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [array, setArray] = useState([]);
  const [redo, setRedo] = useState([]);
  const [btn, setBtn] = useState(true);


  const handleClick = (e) => {
    const obj = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setArray([...array, obj]);
    setRedo([]);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setArray([]);
    setRedo([]);
    setBtn(true);
  };


  const handleUndo = (e) => {
    e.stopPropagation();
    if (array.length === 0) return;
    const newArray = [...array];
    const removed = newArray.pop();
    setArray(newArray);
    setRedo([removed, ...redo]);
  };


  const handleRedo = (e) => {
    e.stopPropagation();
    if (redo.length === 0) return;
    const newRedo = [...redo];
    const restored = newRedo.shift();
    setRedo(newRedo);
    setArray([...array, restored]);
  };


  useEffect(() => {
    setBtn(array.length === 0);
  }, [array]);

  return (
    <>
      <div id="wrapper" onClick={handleClick}>
        <div id="buttons" >
          <button className="btn" onClick={handleReset} disabled={btn}> Reset </button>
          <button className="btn" onClick={handleUndo} disabled={btn}> Undo </button>
          <button className="btn" onClick={handleRedo} disabled={redo.length === 0}> Redo </button>
        </div>

        {array.map((item) => (
          <div key={item.id} className="circle" style={{ position: "absolute", top: item.y - 25, left: item.x - 25, pointerEvents: "none", }}></div>
        ))}
      </div>
    </>
  );
}

export default App;
