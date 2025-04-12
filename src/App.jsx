import { BrowserRouter, Route, Routes } from "react-router";
import NavBar from "./components/Navbar";
import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />} >
          <Route path = "/login" element = {<Login />} />
          <Route path = "/connections" element = {<h1>Connections</h1>} />
          <Route path = "/profile" element = {<h1>Profile</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
