import { Outlet } from "react-router-dom";
import Footer from "../src/components/layout/footer";
import Navbar from "../src/components/layout/navbar";
import { createContext, useEffect, useState } from "react";
export const NavStateContext = createContext();
function App() {
  // const [reloadNav, setReloadNav] = useState(false);
  const [refreshNav, setRefreshNav] = useState(false);
  // useEffect(() => {
  //   console.log("Rendering App");
  // });

  return (
    <div className="flex flex-col container mx-auto min-h-screen">
      <NavStateContext.Provider value={{ refreshNav, setRefreshNav }}>
        <Navbar />
        <main className="flex-1 p-4 mx-auto w-full max-w-screen-lg">
          <Outlet />
        </main>
      </NavStateContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
