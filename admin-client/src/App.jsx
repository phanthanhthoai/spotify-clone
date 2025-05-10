import {BrowserRouter, Route, Routes} from "react-router";
import AuthLayout from "./layouts/auth-layout/index.jsx";
import AppLayout from "./layouts/app-layout/index.jsx";
import User from "./pages/user/index.jsx";
import Song from "./pages/song/index.jsx";
import CreateUser from "./pages/user/CreateUser.jsx";
import UpdateUser from "./pages/user/UpdateUser.jsx";
import CreateSong from "./pages/song/CreateSong.jsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route element={<AuthLayout/>} path="/auth"></Route>
              <Route element={<AppLayout/>} path="/">
                  <Route element={<User/>} path="/user"></Route>
                  <Route element={<CreateUser/>} path="/user/create"></Route>
                  <Route element={<UpdateUser/>} path="/user/:id"></Route>

                  <Route element={<Song/>} path="/song"></Route>
                  <Route element={<CreateSong/>} path="/song/create"></Route>
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
