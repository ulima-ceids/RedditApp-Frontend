import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from './App';
import SignUp from './SignUp';
import Login from './Login';

const RouterApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
};

export default RouterApp;