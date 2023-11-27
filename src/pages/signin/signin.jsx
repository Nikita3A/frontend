import React, { useState } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";

import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';


const Signin = () => {
  console.log('signin rendered');
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const currentUser = useSelector(state => state.user.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/api/auth/signin", { email, password });
      // console.log(res.data);
      const { accessToken, refreshToken } = res.data; // JWT token as a string
      const { user } = jwtDecode(accessToken); // Decode the token to get the user data
      console.log('7y: ', user);
      dispatch(loginSuccess({user, accessToken, refreshToken}));
      navigate("/");
    } catch (err) {
      console.log('e:', err);
      dispatch(loginFailed());
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden dark:bg-secondaryBackgroundDark">      
      <div className="w-full p-6 m-auto border-2 border-accent bg-backgroundLight dark:bg-backgroundDark dark:text-textLight rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-textLight dark:text-textDark">
          Sign in
        </h1>
        <form className="mt-6">
        <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-semibold text-textLight dark:text-textDark">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-textLight dark:text-textDark dark:bg-inputDark rounded-md focus:border-accent focus:ring-accent focus:outline-none focus:ring focus:ring-opacity-99"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-semibold text-textLight dark:text-textDark">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-textLight dark:text-textDark dark:bg-inputDark rounded-md focus:border-accent focus:ring-accent focus:outline-none focus:ring focus:ring-opacity-99"
            />
          </div>
          <a href="#" className="text-xs text-accent dark:text-accent hover:underline">
            Forget Password?
          </a>
          <div className="mt-6 flex flex-col items-center">
            <button onClick={handleLogin} className="text-textDark dark:text-textDark bg-accent hover:bg-accentHover font-bold py-2 px-4 rounded-full">
              Signin
            </button>
          </div>
        </form>
  
        <p className="mt-8 text-xs font-light text-center text-textLight dark:text-textDark">
          {" "}
          Don't have an account{" "}
          <a href="signup" className="font-medium text-accent dark:text-accent hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
  
  
};

export default Signin;