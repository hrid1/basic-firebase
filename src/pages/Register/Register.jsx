import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";

const Register = () => {
 
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccess("")
    setError("")
    // 
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const isChecked = e.target.checkbox.checked;

    // console.log(email, password, isChecked);

    // reset error
    setSuccess("");
    setError("");

    //------------------------ validation-----------------------------
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("email is not valid");
      return;
    } else if (password.length < 6) {
      setError("Password should be 6 charecters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("Password must contain Uppercase Letter");
      return;
    } else if (!isChecked) {
      setError("Plz accept terms and conditions");
    }

    // create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // update profile
        updateProfile(result.user, {
          displayName: username,
          photoURL: "https://example/profile/.com",
        })
          .then(() => {
            setSuccess("User Created Successfully.");
          })
          .catch((error) => {
            setError(error.message);
          });

        // send varification email
        sendEmailVerification(result.user).then(() => {
          alert("Check your mail");
        });
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });

    //
  };

  return (
    <section className="bg-blueGray-50">
      <div className="w-[440px] lg:w-4/12 px-4 mx-auto pt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-400 border-0 text-gray-800">
          <div className="rounded-t mb-0 px-6 py-4"></div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div className="text-blueGray-400 text-center mb-3 font-bold">
              {/* <p className="tex-t">Sign Up </p> */}
            </div>
            <form onSubmit={handleRegister}>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600  font-bold mb-2"
                  htmlFor="grid-password"
                >
                  User Name
                </label>
                <input
                  type="username"
                  name="username"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="User Name"
                />
              </div>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600  font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="username"
                  name="email"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                />
              </div>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                />
              </div>
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    name="checkbox"
                    type="checkbox"
                    className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                  <span className="ml-2 text-sm font-semibold text-blueGray-600">
                    Accept Terms and Conditions
                  </span>
                </label>

                <div>
                  {error && (
                    <p className="text-xs font-semibold text-red-700">
                      {error}
                    </p>
                  )}

                  {success && (
                    <p className="text-xs font-semibold text-emerald-600">
                      {success}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-center mt-6">
                <button
                  className="bg-slate-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                >
                  {" "}
                  Register{" "}
                </button>
              </div>
            </form>

            <div className="text-center mb-3">
              <hr className="mt-6 border-b-1 border-blueGray-300" />
              <h6 className="text-blueGray-500 text-sm font-semibold">
                Sign Up with
              </h6>
            </div>
            <div className="btn-wrapper text-center">
              <button
                className="bg-white active:bg-blueGray-50 text-blueGray-700 font-bold px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center  text-xs ease-linear transition-all duration-150"
                type="button"
              >
                <img
                  alt="..."
                  className="w-5 mr-1"
                  src="https://demos.creative-tim.com/notus-js/assets/img/github.svg"
                />
                Github
              </button>
              <button
                className="bg-white active:bg-blueGray-50 text-blueGray-700  px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                type="button"
              >
                <img
                  alt="..."
                  className="w-5 mr-1"
                  src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"
                />
                Google
              </button>
            </div>

            <p className="text-sm font-semibold mt-2">
              Already have an account ?{" "}
              <Link to={"/login"} className="underline font-bold text-sm">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
