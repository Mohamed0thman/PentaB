import roverImage from "../assets/rover.png";

type Props = {
  x: number;
  y: number;
  direction: string;
};

const Ship = ({ x, y, direction }: Props) => {
  const directions = ["N", "E", "S", "W"];
  const style = {
    gridColumn: `${x} / ${x}`,
    gridRow: 6 - y,
    transform: `rotate(${directions.indexOf(direction) * 90}deg)`,
  };
  return (
    <img style={style} alt="myPal" className="myRobotFriend" src={roverImage} />
  );
};

export default Ship;
