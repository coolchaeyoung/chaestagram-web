import React from "react";
import { logUserOut } from "../apollo";

const Home = () => {
  return (
    <>
      <div>Home</div>
      <button onClick={logUserOut}>Log out</button>
    </>
  );
};

export default Home;
