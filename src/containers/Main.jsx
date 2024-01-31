// En Main.js
import React from 'react';
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main className="flex-grow bg-white">
      <Outlet/>
    </main>
  );
};

export default Main;
