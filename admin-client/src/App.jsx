import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./layouts/app-layout/index.jsx";
import AuthLayout from "./layouts/auth-layout/index.jsx";
import CreateSong from "./pages/song/CreateSong.jsx";
import Song from "./pages/song/index.jsx";
import UpdateSong from "./pages/song/UpdateSong.jsx";
import CreateUser from "./pages/user/CreateUser.jsx";
import User from "./pages/user/index.jsx";
import UpdateUser from "./pages/user/UpdateUser.jsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />} path="/auth"></Route>
                <Route element={<AppLayout />} path="/">
                    <Route element={<User />} path="/user"></Route>
                    <Route element={<CreateUser />} path="/user/create"></Route>
                    <Route element={<UpdateUser />} path="/user/:id"></Route>

                    <Route element={<Song />} path="/song"></Route>
                    <Route element={<CreateSong />} path="/song/create"></Route>
                    <Route element={<UpdateSong />} path="/song/:id"></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
