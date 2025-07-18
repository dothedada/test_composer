import { useState } from "react";
import { NotLogged, UserPublications } from "./posts";
import { UserBar } from "./userBar";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <UserBar user={user} setUser={setUser} />
      {user ? <UserPublications /> : <NotLogged />}
    </>
  );
}

export default App;
