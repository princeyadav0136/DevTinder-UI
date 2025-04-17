import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { useEffect } from "react";


const Connections = () => {
    const connections = useSelector((store) => store.connection);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "user/connections", {
                withCredentials: true,
            })
            dispatch(addConnection(res.data.data));
        }
        catch (error) {
            console.error("Error fetching connections data:", error);
            // Handle the error as needed
        }
    }
    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return null;
    if(connections.length === 0) {
        return (
            <div>
                No connections found
            </div>
        )
    }
    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-3xl">Connections</h1>
            {
                connections?.map((user) => <div key={user?._id} className="flex m-4 p-4 mx-auto bg-base-300 w-1/2">
                    <div className="">
                        <img src={user?.photoUrl} alt="User" className="w-20 h-20 rounded-full" />
                    </div>
                    <div className="text-left mx-4">
                        <h2 className="font-bold text-xl">{user?.firstName} {user?.lastName}</h2>
                        <p>{user?.about}</p>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Connections;