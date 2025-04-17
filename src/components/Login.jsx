import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post(
        BASE_URL + "signup",
        { email, password, firstName, lastName },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(addUser(res.data));
        navigate("/");
      })
      .catch((err) => {
        setError(err?.response?.data || "Something went wrong");
        console.error(err);
      });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        BASE_URL + "login",
        { email, password },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(addUser(res.data));
        navigate("/");
      })
      .catch((err) => {
        setError(err?.response?.data || "Something went wrong");
        console.error(err);
      });
  };

  return (
    <form
      className="flex justify-center my-5"
      onSubmit={isLoginForm ? handleLogin : handleSignup}
    >
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">
          <h1 className="text-xl font-bold text-center">
            {isLoginForm ? "Login" : "Register"}
          </h1>
        </legend>
        {!isLoginForm && (
          <>
            <label className="fieldset-label">First Name</label>
            <input
              type="text"
              className="input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="fieldset-label">Last Name</label>
            <input
              type="text"
              className="input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}
        <label className="fieldset-label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="fieldset-label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500">{error}</p>
        <button className="btn btn-neutral mt-4">
          {isLoginForm ? "Login" : "Register"}
        </button>
        <button
          type="button"
          className="btn btn-link mt-4"
          onClick={() => setIsLoginForm(!isLoginForm)}
        >
          {isLoginForm
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </button>
      </fieldset>
    </form>
  );
};

export default Login;
