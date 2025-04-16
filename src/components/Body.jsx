import { Outlet, useNavigate } from "react-router";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "profile/view", {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(addUser(res.data));
        // Dispatch the user data to the Redux store or handle it as needed
      } else {
        console.error("Failed to fetch user data:", res.statusText);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
        // Redirect to login page or handle unauthorized access
      }
      console.error("Error fetching user data:", error);
      // Handle the error as needed
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
