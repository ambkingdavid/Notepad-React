import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import Aside from "./Aside"
import Header from "./Header"


export default function DashboardLayout() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    useEffect(() => {
        fetch('/api/status', {
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