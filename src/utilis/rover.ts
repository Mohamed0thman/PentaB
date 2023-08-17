// commands
// [f,b,l,r]

/*
[y]                     N
  5                   W + E
  4                     S
  3     
  2   
  1 
[x] 1 2 3 4 5
*/

//Commands
export enum Commands {
  Forward = "f",
  Backward = "b",
  Left = "l",
  Right = "r",
}

//Compass directions
export enum Directions {
  North = "N",
  East = "E",
  South = "S",
  West = "W",
}
//  status
export enum Status {
  MOVING = "MOVING",
  STOPPED = "STOPPED",
}

export const obstacles = [
  [1, 4],
  [3, 5],
  [5, 4],
];

function rover(
  startingPoint: { x: number; y: number },
  direction: string,
  commands: string[]
) {
  let currentPosition = startingPoint;
  let status = Status.MOVING;

  commands.forEach((command) => {
    if (command === Commands.Forward || command === Commands.Backward) {
      const updatedPosition = move(currentPosition, direction, command);
      currentPosition = updatedPosition.position;
      direction = updatedPosition.direction;

      status = updatedPosition.status || Status.MOVING;

      console.log("updatedPosition.status", updatedPosition.status);
    } else if (command === Commands.Right || command === Commands.Left) {
      direction = turn(direction, command);
    }
  });

  return { finalPosition: currentPosition, direction, status };
}

function move(
  currentPosition: { x: number; y: number },
  currentDirection: string,
  command: string
) {
  const newPosition = currentPosition;
  let direction = 1;

  if (command === Commands.Backward) {
    direction = -1;
  }

  if (currentDirection === Directions.North) {
    newPosition.y += 1 * direction;
  } else if (currentDirection === Directions.East) {
    newPosition.x += 1 * direction;
  } else if (currentDirection === Directions.South) {
    newPosition.y -= 1 * direction;
  } else if (currentDirection === Directions.West) {
    newPosition.x -= 1 * direction;
  }

  const position = wrapEdges(newPosition, currentDirection);

  const status = obstacleChecker(position.position);
  console.log("status", status);

  return { ...position, status };
}

function wrapEdges(position: { x: number; y: number }, direction: string) {
  const lowestCoord = 1;
  const highestCoord = 5;
  let newDirection = direction;

  if (position.x > highestCoord) {
    position.x = lowestCoord;
  }
  if (position.x < lowestCoord) {
    position.x = highestCoord;
  }

  //Needs to change direction if wrapping North or South
  if (position.y > highestCoord || position.y < lowestCoord) {
    if (position.y > highestCoord) {
      position.y = highestCoord;
      position.x = highestCoord + lowestCoord - position.x;
    }

    if (position.y < lowestCoord) {
      position.y = lowestCoord;
      position.x = highestCoord + lowestCoord - position.x;
    }

    newDirection = direction === "S" ? "N" : "S"; //Swap Direction
  }

  return { position, direction: newDirection };
}

function turn(currentDirection: string, command: string) {
  const directions = Object.values(Directions);

  const minIndex = 0;
  const maxIndex = directions.length - 1;

  let index = directions.findIndex(
    (direction) => direction === currentDirection
  );

  if (command === Commands.Right) {
    index++;
  } else if (command === Commands.Left) {
    index--;
  }

  if (index < minIndex) {
    index = maxIndex;
  } else if (index > maxIndex) {
    index = minIndex;
  }

  return directions[index];
}

//  obstacles checker

function obstacleChecker(position: { x: number; y: number }) {
  const convertPosToString = `${position.x},${position.y}`;
  let status;

  obstacles.forEach((obstacle) => {
    if (convertPosToString === obstacle.toString()) {
      status = Status.STOPPED;
    }
  });

  console.log("statusstatusstatusstatusstatus", status);

  return status;
}

export default rover;
