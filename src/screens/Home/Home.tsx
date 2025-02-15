import React, { useState } from "react";
import reactLogo from "@assets/react.svg";
import viteLogo from "/vite.svg";
import { useLoaderData } from "react-router-dom";

import styles from "./Home.module.scss";
import Board from "@components/Board/Board";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Home: React.FC = (_props) => {
  const [count, setCount] = useState(0);
  const data = useLoaderData();

  console.log(data);

  return (
    <>
      <title>Home</title>
      <Board />
    </>
  );
};

export default Home;
