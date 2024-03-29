import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Header({ user }) {
    const [dropdown, setDropdown] = useState(false);
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_SERVER_URL;


    function handleDropdown() {
        setDropdown(!dropdown)
    }

    function handleLogout() {
        const url = `${BASE_URL}/logout`
        fetch(url, {
            credentials: 'include'
        }).then((res) => {
            navigate('/');
        }).catch((err) => {
            console.log(err)
            navigate('/');
        })
    }
    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <a href="/dashboard" className="flex ms-2 md:me-24">
                            <svg className="h-8 me-3 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                            </svg>
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">NotePad</span>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ms-3 relative">
                            <div>
                                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" onClick={handleDropdown}>
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-8 h-8 rounded-full" src={user?.profileImage} alt="user photo" />
                                </button>
                            </div>
                            {dropdown && (
                                <div className={`z-50 absolute top-5 right-0 w-fit my-4 mx-0 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}>
                                    <div className="px-4" role="none">
                                        <p className="text-sm text-gray-900 py-2 dark:text-white" role="none">
                                            {user?.fullName}
                                        </p>
                                        <p className="text-sm font-medium pb-2 text-gray-900 truncate dark:text-gray-300" role="none">
                                            {user?.email}
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </nav>
    )
}