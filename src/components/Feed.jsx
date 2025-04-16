import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
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
  return (
    feed && feed[0] && 
    <div className="flex justify-center my-10">
      <UserCard user = {feed[0]}/>
    </div>
  );
};

export default Feed;
