import React from "react";
import AllWords from "../Page/AllWords/AllWords";
import TrueWords from "../Page/TrueWords/TrueWords";

export default function PageTransition({
  ComponentIndex,
}: {
  ComponentIndex: string;
}) {
  return (
    <div>
      {ComponentIndex === "2" ? (
        <AllWords />
      ) : ComponentIndex === "3" ? (
        <TrueWords />
      ) : (
        <>test</>
      )}
    </div>
  );
}
