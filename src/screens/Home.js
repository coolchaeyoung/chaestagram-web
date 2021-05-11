import React from "react";
import { isLoggedUserOut } from "../apollo";

const Home = () => {
  return (
    <>
      <div>Home</div>
      <button onClick={isLoggedUserOut}>Log out</button>
    </>
  );
};

export default Home;
