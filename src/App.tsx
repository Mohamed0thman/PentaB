import { useEffect, useState } from "react";
import rover, { obstacles, Status } from "./utilis/rover";

import "./App.css";
import Ship from "./components/Ship";
import CustomButton from "./components/CustomButton";
import { sleep } from "./utilis/utiles";
import CustomInput from "./components/CustomInput";

function App() {
  const [commands, setCommands] = useState<string[]>([]);
  const [currentPosition, setCurrentPosition] = useState({
    finalPosition: { x: 3, y: 3 },
    direction: "N",
    status: Status.MOVING,
  });
  const [canMove, setCanMove] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<string>("");

  function handleOnClick(commnd: string) {
    setCanMove(true);
    setCommands([commnd]);
  }

  async function handleOnGo() {
    setCanMove(true);

    for (let index = 0; index < inputValue.length; index++) {
      const input = inputValue[index];
      setCommands([input]);
      await sleep(500);
    }
  }

  // {x: , y: }, direction, commands
  useEffect(() => {
    if (canMove) {
      const { finalPosition, direction, status } = rover(
        currentPosition.finalPosition,
        currentPosition.direction,
        commands
      );

      if (status !== Status.MOVING) {
        setCanMove(false);
        setCurrentPosition((prev) => ({ ...prev, status }));
        return;
      }

      setCurrentPosition({ finalPosition, direction, status });
      if (commands.length > 0) {
        setCommands([]);
      }
    }
  }, [
    commands,
    currentPosition.direction,
    currentPosition.finalPosition,
    currentPosition.status,
    canMove,
  ]);

  return (
    <div className="App">
      <div>
        <h1 style={{ textAlign: "center", marginBottom: 10 }}>
          Welcome To Space
        </h1>
        <h3 style={{ textAlign: "center", marginBottom: 10 }}>
          x:{currentPosition.finalPosition.x} y:
          {currentPosition.finalPosition.y} dir:{currentPosition.direction}{" "}
          state:{currentPosition.status}
        </h3>
        <div className="planet">
          <div className="spaceGrid">
            <Ship
              x={currentPosition.finalPosition.x}
              y={currentPosition.finalPosition.y}
              direction={currentPosition.direction}
            />
            {[...new Array(25)].map((_index, key) => {
              const row = (Math.floor(key / 5) + 1 - 6) * -1;
              const col = (key % 5) + 1;
              const obstacleClass = obstacles.find(
                (item) => `${col},${row}` === item.toString()
              );

              return (
                <div
                  key={`piece-${key}`}
                  style={{
                    backgroundColor: obstacleClass ? "#7113ec" : "#bc2732",
                  }}
                >
                  {col} , {row}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <div className="btns">
          <CustomButton
            text="Forwards"
            handleOnClick={() => handleOnClick("f")}
          />

          <div
            style={{ display: "flex", gap: 100, margin: "10px 0px 10px 0px" }}
          >
            <CustomButton
              text="Left"
              handleOnClick={() => handleOnClick("l")}
            />
            <CustomButton
              text="Right"
              handleOnClick={() => handleOnClick("r")}
            />
          </div>
          <CustomButton
            text="Backwards"
            handleOnClick={() => handleOnClick("b")}
          />
        </div>

        <div>
          <h3>you can insert only ["f","b","r","l"]</h3>

          <CustomInput
            type="text"
            onKeyDown={(e) => {
              if (!/([fblr/b])/g.test(e.key) && e.key !== "Backspace") {
                e.preventDefault();
              }
            }}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          {/* <input /> */}
          <CustomButton text="Go" handleOnClick={handleOnGo} />
        </div>
      </div>
    </div>
  );
}

export default App;
