import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase.config";

const Navbar = () => {
  const [currentUser, setcurrentUser] = useState(null);


  useEffect(() => {
    const unSubscirbe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setcurrentUser(user);
      } else {
        setcurrentUser(null);
      }
    });

    return () => unSubscirbe();
  }, []);

  // Log out
  const handleLogout = () => {
    signOut(auth)
      .then(() => alert("Logout Successful"))
      .catch((error) => {
        alert(error.message);
      });
  };

  const navLinks = (
    <>
      <li>
        {" "}
        <Link to={"/"}>Home</Link>{" "}
      </li>
      <li>
        {" "}
        <Link to={"/about"}>About</Link>{" "}
      </li>

      <li>
        {" "}
        <Link to={"/services"}>Services</Link>{" "}
      </li>
    </>
  );

  return (
    <div className="navbar bg-slate-900 sticky top-0 z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">FireBase</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">{navLinks}</ul>
      </div>
      <div className="navbar-end ">
        {/* <a className="btn">User</a> */}

        <div className="space-x-4">
          {currentUser ? (
            <div className="flex gap-4 items-center justify-center">
              <p className="font-bold">Hi, {currentUser?.displayName}</p>
              <button onClick={handleLogout} className="btn btn-primary ">
                Log out
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to={"/login"} className="btn btn-primary">
                Log In
              </Link>
              <Link to={"/register"} className="btn btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
