import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react";
import Aside from "./Aside"
import Header from "./Header"


export default function DashboardLayout() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        fetch('http://localhost:3000/login', {
            method: 'GET',
            credentials: 'include',
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                }
                throw new Error('Authentication Failed');
            })
            .then((data) => {
                setUser(data.user);
            }).catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Header user={user}/>
            <Aside />
            <Outlet />
        </>
    )
}