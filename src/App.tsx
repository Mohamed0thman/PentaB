import { useEffect, useState } from "react";
import rover from "./utilis/rover";

import "./App.css";
import Ship from "./components/Ship";
import CustomButton from "./components/CustomButton";

function App() {
  const [commands, setCommands] = useState<string[]>([]);
  const [currentPosition, setCurrentPosition] = useState({
    finalPosition: { x: 3, y: 3 },
    direction: "N",
  });

  // {x: , y: }, direction, commands
  useEffect(() => {
    setCurrentPosition(
      rover(currentPosition.finalPosition, currentPosition.direction, commands)
    );
    if (commands.length > 0) {
      setCommands([]);
    }
  }, [commands, currentPosition.direction, currentPosition.finalPosition]);

  return (
    <div className="App">
      <div>
        <h1 style={{ textAlign: "center", marginBottom: 10 }}>
          Welcome To Space
        </h1>
        <h3 style={{ textAlign: "center", marginBottom: 10 }}>
          x:{currentPosition.finalPosition.x} y:
          {currentPosition.finalPosition.y} dir:{currentPosition.direction}
        </h3>
        <div className="planet">
          <div className="spaceGrid">
            <Ship
              x={currentPosition.finalPosition.x}
              y={currentPosition.finalPosition.y}
              direction={currentPosition.direction}
            />
            {[...new Array(25)].map((_index, key) => (
              <div key={`piece-${key}`}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="btns">
        <CustomButton
          text="Forwards"
          handleOnClick={() => setCommands(["f"])}
        />

        <div style={{ display: "flex", gap: 100, margin: "10px 0px 10px 0px" }}>
          <CustomButton text="Left" handleOnClick={() => setCommands(["l"])} />
          <CustomButton text="Right" handleOnClick={() => setCommands(["r"])} />
        </div>
        <CustomButton
          text="Backwards"
          handleOnClick={() => setCommands(["b"])}
        />
      </div>
    </div>
  );
}

export default App;
