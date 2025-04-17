import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  console.log("Feed data:", feed);
  const fetchFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.error("Error fetching feed data:", error);
      // Handle the error as needed
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);
  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(BASE_URL + "request/send/" + status + "/" + userId, {}, {
        withCredentials: true,
      })
      dispatch(removeUserFromFeed(userId));
    }
    catch (error) {
      console.error("Error sending request:", error);
      // Handle the error as needed
    }
  }
  if(!feed) return null;
  if (feed.length === 0) {
    return <div className="flex justify-center my-10">No Nore new User</div>;
  }
  return (
    feed && 
    <div className="flex justify-center my-10">
      <UserCard handleSendRequest={handleSendRequest} user = {feed[0]}/>
    </div>
  );
};

export default Feed;
