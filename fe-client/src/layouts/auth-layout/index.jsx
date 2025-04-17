import "./auth-layout.scss"
import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import authService from "../../api/authService.js";

export default function AuthLayout() {
    useEffect(() => {
        async function getProfile() {
            const profile = await authService.profile();

            if (profile.status === 200) {
                window.location.href = '/'
            }
        }

        getProfile();
    }, []);

    return (
        <Outlet></Outlet>
    )
}