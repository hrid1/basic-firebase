import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState, useTransition } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";

const Login = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // console.log(email, password);

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    console.log(email, password);
    // authentication
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("Login Successful");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const handleForgotPassword = () => {
    console.log(email);
    sendPasswordResetEmail(auth, email)
      .then(() => alert("Check Your Email"))
      .catch((error) => setError(error.message));
  };
  return (
    <div className="flex flex-col my-10 bg-gray-00 ">
      {/* Auth Card Container */}
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        {/* Auth Card */}
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-4/12 2xl:w-4/12 
          px-6 py-10 sm:px-10 sm:py-6 
          bg-slate-400 rounded-lg shadow-md lg:shadow-lg"
        >
          {/* Card Title */}
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Login
          </h2>

          <form className="mt-10" onSubmit={handleLogin}>
            {/* Email Input */}
            <label
              htmlFor="email"
              className="block font-semibold text-gray-800 uppercase"
            >
              E-mail
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              type="email"
              name="email"
              placeholder="e-mail address"
              autoComplete="email"
              className="block bg-white w-full py-3 px-2 mt-2 
            text-gray-800 appearance-none 
            border-b-2 border-gray-100
            rounded"
              required
            />

            {/* Password Input */}
            <label
              htmlFor="password"
              className="block mt-2  font-semibold text-gray-900 uppercase"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              type="password"
              name="password"
              placeholder="password"
              autoComplete="current-password"
              className="block w-full py-3 px-2 mt-2 mb-4
            text-gray-800 bg-white appearance-none 
            border-b-2 border-gray-100
           rounded"
              required
            />

            {/* Auth Button */}
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-gray-800 rounded-sm
            font-medium text-white uppercase
            focus:outline-none hover:bg-gray-700 hover:shadow-none"
            >
              Login
            </button>

            <div className="mt-2">
              {error && (
                <p className="text-sm font-bold text-red-700">{error}</p>
              )}
              {success && (
                <p className="text-sm font-bold text-green-700">{success}</p>
              )}
            </div>

            {/* Another Auth Routes */}
            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-slate-800 font-semibold text-center">
              <p
                onClick={handleForgotPassword}
                className="flex-2 underline cursor-pointer"
              >
                Forgot password?
              </p>

              <p className="flex-1 text-gray-900 text-md mx-4 my-1 sm:my-auto">
                or
              </p>

              <Link to={"/register"} className="flex-2 underline">
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
