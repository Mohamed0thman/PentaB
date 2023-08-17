//Commands
const forward = "f";
const backward = "b";
const left = "l";
const right = "r";
//Compass directions
const north = "N";
const east = "E";
const south = "S";
const west = "W";

function rover(
  startingPoint: { x: number; y: number },
  direction: string,
  commands: string[]
) {
  let currentPosition = startingPoint;

  commands.forEach((command) => {
    if (command === forward || command === backward) {
      const updatedPosition = move(currentPosition, direction, command);
      currentPosition = updatedPosition.position;
      direction = updatedPosition.direction;
    } else if (command === right || command === left) {
      direction = turn(direction, command);
    }
  });

  return { finalPosition: currentPosition, direction };
}

function move(
  currentPosition: { x: number; y: number },
  currentDirection: string,
  command: string
) {
  const newPosition = currentPosition;
  let direction = 1;

  if (command === backward) {
    direction = -1;
  }

  if (currentDirection === north) {
    newPosition.y += 1 * direction;
  } else if (currentDirection === east) {
    newPosition.x += 1 * direction;
  } else if (currentDirection === south) {
    newPosition.y -= 1 * direction;
  } else if (currentDirection === west) {
    newPosition.x -= 1 * direction;
  }

  const position = wrapEdges(newPosition, currentDirection);
  return { ...position };
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
  const directions = [north, east, south, west];
  const minIndex = 0;
  const maxIndex = directions.length - 1;

  let index = directions.findIndex(
    (direction) => direction === currentDirection
  );

  if (command === right) {
    index++;
  } else if (command === left) {
    index--;
  }

  if (index < minIndex) {
    index = maxIndex;
  } else if (index > maxIndex) {
    index = minIndex;
  }

  return directions[index];
}

export default rover;
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
