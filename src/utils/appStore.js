import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice";
import FeedReducer from "./feedSlice";
import ConnectionReducer from "./connectionSlice";

const appStore = configureStore({
  reducer: {
    user: UserReducer,
    feed: FeedReducer,
    connection: ConnectionReducer,
  },
});

export default appStore;
