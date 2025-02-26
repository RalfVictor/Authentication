"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:8000";

  const router = useRouter();

  const [user, setUser] = useState(null);
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);

  const registerUser = async (e) => {
    e.preventDefault();
    if (
      !userState.email.includes("@") ||
      !userState.password ||
      userState.password.length < 6
    ) {
      toast.error("Please enter a valid email and password(min 6 characters)");
      return;
    }
    try {
      const res = await axios.post(`${serverUrl}/api/v1/register`, userState);
      console.log("User registered successfully", res.data);
      toast.success("User registered successfully");
      console.log(res.data);
      setUserState({
        name: "",
        email: "",
        password: "",
      });
      router.push("/login");
    } catch (error) {
      console.log("Error registering User.", error);
      toast.error(error.response.data.message);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/login`,
        {
          email: userState.email,
          password: userState.password,
        },
        { withCredentials: true }
      );
      toast.success("User Logged in Successfully");
      setUserState({
        email: "",
        password: "",
      });
      router.push("/dashboard");
    } catch (error) {
      console.log("Error logging into User", error);
      toast.error(error.response.data.message);
    }
  };

  const handleUserInput = (name) => (e) => {
    const value = e.target.value;

    setUserState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <UserContext.Provider value={{ loginUser,registerUser, userState, handleUserInput }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
