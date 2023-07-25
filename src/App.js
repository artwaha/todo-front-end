import { Outlet } from "react-router-dom";
import Footer from "./layout/footer";
import Navbar from "./layout/navbar";

function App() {
  return (
    <div className="flex flex-col container mx-auto min-h-screen">
      <Navbar />
      {/* <main className="flex-1 p-4 border border-blue-600"> */}
      <main className="flex-1 p-4 mx-auto w-full max-w-screen-lg">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
