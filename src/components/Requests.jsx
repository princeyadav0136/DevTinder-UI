import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/requests/received", {
        withCredentials: true,
      });
      console.log("Received requests:", res.data.data);
      dispatch(addRequest(res.data.data));
    } catch (error) {
      console.error("Error fetching connections data:", error);
      // Handle the error as needed
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  console.log("Requests data:", requests);
  if (!requests) return null;
  if (requests.length === 0) {
    return <div>No requests found</div>;
  }
  return (
    <div>
      <div className="text-center my-10">
        <h1 className="text-bold text-3xl">Connections</h1>
        {requests?.map((request) => (
          <div
            key={request?.fromUserId?._id}
            className="flex justify-between items-center m-4 p-4 mx-auto bg-base-300 w-2/3"
          >
            <div className="">
              <img
                src={request?.fromUserId?.photoUrl}
                alt="User"
                className="w-50 h-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {request?.fromUserId?.firstName} {request?.fromUserId?.lastName}
              </h2>
              <p>{request?.fromUserId?.about}</p>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-primary">Reject</button>
              <button className="btn btn-secondary">Accept</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
