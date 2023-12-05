import MyContext from "../context";
import React, { useContext } from "react";

function Header() {
  const context = useContext(MyContext);
  return (
    <div>
      <div>
        <button
          onClick={() =>
            context.changeColor(
              context.backgroundColor === "white" ? "black" : "white"
            )
          }
        >
          Change Background Color
        </button>
      </div>
    </div>
  );
}

export default Header;
