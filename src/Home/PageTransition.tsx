import React from "react";
import AllWords from "../Page/AllWords/AllWords";

export default function PageTransition({
  ComponentIndex,
}: {
  ComponentIndex: string;
}) {
  return <div>{ComponentIndex === "2" ? <AllWords /> : <>test</>}</div>;
}
