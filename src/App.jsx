import { BrowserRouter, Route, Routes } from "react-router";
import NavBar from "./Navbar";
import Body from "./Body";
import Login from "./Login";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />} >
          <Route path = "/login" element = {<Login />} />
          <Route path = "/connections" element = {<h1>Connections</h1>} />
          <Route path = "/profile" element = {<h1>Profile</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
