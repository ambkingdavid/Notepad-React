import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import Aside from "./Aside"
import Header from "./Header"


export default function DashboardLayout() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const URI = process.env.MODE === 'production'? 'https://notepad-server-at29.onrender.com' : 'http://localhost:3000';


    useEffect(() => {
        const url = process.env.MODE === 'production'? `${URI}/status` : `/api/status`;
        fetch(url, {
            method: 'GET',
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