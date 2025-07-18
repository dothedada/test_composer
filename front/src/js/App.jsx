import { useState } from "react";
import { PostForm, UserPublications } from "./posts";
import { UserBar } from "./userBar";

function App() {
  return (
    <>
      <UserBar />
      <UserPublications />
    </>
  );
}

export default App;
