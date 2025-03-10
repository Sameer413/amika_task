import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import SignIn from "./SignIn";
import Unauthorized from "./Unauthorized";
import AllowedPage from "./AllowedPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Signup} />
        <Route path="/login" Component={SignIn} />
        <Route path="/not" Component={Unauthorized} />
        <Route path="/allowed" Component={AllowedPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
