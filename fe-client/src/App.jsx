import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/home/index.jsx";
import PlayList from "./pages/playlist/index.jsx";
import AuthLayout from "./layouts/auth-layout/index.jsx";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<AuthLayout/>}></Route>
              <Route path="/" element={<MainLayout/>}>
                  <Route index element={<Home/>}></Route>
                  <Route path="playlist" element={<PlayList/>}></Route>
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
