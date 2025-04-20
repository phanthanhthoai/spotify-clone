import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/auth-layout/index.jsx";
import Login from "./layouts/auth-layout/Login.jsx";
import Register from "./layouts/auth-layout/Register.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Album from "./pages/album/index.jsx";
import Home from "./pages/home/index.jsx";
import PlayList from "./pages/playlist/index.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={<Login />}></Route>
                    <Route path="register" element={<Register />}></Route>
                </Route>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />}></Route>
                    <Route path="playlist" element={<PlayList />}></Route>
                    <Route path="album" element={<Album />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
