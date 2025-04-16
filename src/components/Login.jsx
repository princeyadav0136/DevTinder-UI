import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
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
    <form className="flex justify-center my-5" onSubmit={handleSubmit}>
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">Login</legend>

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
        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </form>
  );
};

export default Login;
