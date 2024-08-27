import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import EditPost from "./pages/EditPost";
import MyBlogs from "./pages/MyBlogs";
import Profile from "./pages/Profile";
import UserContextProvider from "./context/UserContext";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/write" element={<CreatePost />} />
        <Route path="/Post/post/:id" element={<PostDetails />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/myblogs/:id" element={<MyBlogs />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
