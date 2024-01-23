import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import Aside from "./Aside"
import Header from "./Header"



export default function DashboardLayout() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const BASE_URL = import.meta.env.VITE_SERVER_URL;


    useEffect(() => {
        const url = `${BASE_URL}/status`;
        fetch(url, {
            method: 'get',
            credentials: 'include',
        }).then((res) => {
            if (res.status >= 400) {
                navigate('/login');
            }
            return res.json()
        }).then((data) => {
            setUser(data.user);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <>
            {user &&
                <div>
                    <Header user={user} />
                    <Aside />
                    <Outlet />
                </div>

            }
        </>
    )
}