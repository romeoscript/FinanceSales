

import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="min-h-screen ">
      {/* <Navbar /> */}
      <main className="flex-grow   mx-auto ">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Main;