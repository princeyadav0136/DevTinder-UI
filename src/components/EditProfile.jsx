import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    try {
      const res = await axios.patch(
        BASE_URL + "profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.data));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center space-x-8 my-5">
      <form className="flex justify-center" onSubmit={handleSubmit}>
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Edit Profile</legend>

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

          <label className="fieldset-label">Photo URL</label>
          <input
            type="text"
            className="input"
            placeholder="Photo URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <label className="fieldset-label">Age</label>
          <input
            type="number"
            className="input"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <label className="fieldset-label">Gender</label>
          <select
            defaultValue="Select Gender"
            className="select"
            value={gender}
            onChange={(e) => setGender(e?.target.value)}
          >
            <option disabled={true}>Select Gender</option>
            <option>male</option>
            <option>female</option>
          </select>

          <label className="fieldset-label">About</label>
          <textarea
            type="text"
            className="input"
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <p className="text-red-500">{error}</p>
          <button className="btn btn-neutral mt-4">Save</button>
        </fieldset>
      </form>
      <UserCard user={{ firstName, lastName, about, photoUrl }} />
      {success && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Profile Updated Successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
