import "./auth-layout.scss"
import {Outlet} from "react-router-dom";
import {Toaster} from "../../components/ui/toaster.jsx";

export default function AuthLayout() {
    return (
        <Outlet></Outlet>
    )
}