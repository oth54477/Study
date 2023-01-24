import { useState } from "react";
import styled from "styled-components";

interface ContainerProps {
  bgcolor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgcolor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string;
}

function Circle({ bgColor, borderColor }: CircleProps) {
  const [counter, setCounter] = useState(1);
  return <Container bgcolor={bgColor} borderColor={borderColor ?? bgColor} />;
}

export default Circle;

interface PlayerShape {
  name: string;
  age: number;
}

const sayHello = (playerObj: PlayerShape) =>
  "Hello ${playerObj.name} you are ${platerObj.age} years old.";

sayHello({ name: "nico", age: 12 });
sayHello({ name: "nhi", age: 12 });
