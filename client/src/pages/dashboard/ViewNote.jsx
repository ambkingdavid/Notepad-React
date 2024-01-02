import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ViewNote() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [edit, setEdit] = useState(false);
    const [inputs, setInputs] = useState({title: state.title, content: state.content});

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    function handleDelete() {
        const url = `http://localhost:3000/user/note/${state._id}`
        fetch(url, {
            credentials: 'include',
            method: 'DELETE',
        }).then((response) => {
            if (response.status >= 400) {
                throw new Error('Error deleting note')
            }
            navigate('/dashboard');
        }).catch((err) => console.log(err));
    }

    function handleEditNote() {
        setEdit(!edit);
    }

    function handleSubmit(e) {
        e.preventDefault()
        const url = `http://localhost:3000/user/note/${state._id}`
        fetch(url, {
            credentials: 'include',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: inputs.title,
                content: inputs.content,
            }),
        })
    }
    return <>
        {!edit && (
            <div id="viewNote" className="px-6 pt-20 pb-5 h-screen sm:ml-64 relative">


                <div id="edit-btn" className="flex justify-center">
                    <div
                        className="relative w-full max-h-full  p-6 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700">
                        <a href="/dashboard">
                            <svg className="absolute top-3 right-3 w-3 h-3 lg:w-5 lg:h-5 transition duration-75 text-gray-800 dark:text-white"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </a>
                        <div className="flex flex-row flex-nowrap justify-center relative">
                            <h3
                                className=" text-center mb-2 text-base text-center md:text-lg lg:text-1xl xl:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {state.title}
                            </h3>

                        </div>
                        <div>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {state.content}
                            </p>
                        </div>
                        <div className="absolute bottom-0 right-0">
                            <span className="text-xs align-text-bottom">
                                created: {state.createdAt}
                            </span>
                        </div>
                    </div>
                </div>


                <div id="edit-btn" className="flex flex-row justify-end my-3 absolute bottom-0 right-0">

                    <button type="button" onClick={handleEditNote}
                        className="my-auto text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 mb-2 ">
                        edit
                    </button>


                    <button onClick={handleDelete}
                        className="my-auto text-white bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 mb-2 ">
                        delete
                    </button>

                </div>
            </div>
        )}

        {edit && (
            <div id="editNote" className="flex justify-center pt-20 pb-5 h-screen sm:ml-64 relative border border-red-700">
                <div className="max-h-full w-11/12 md:w-3/4">
                    <form className="shadow-2xl">
                        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <div className="flex items-center justify-between border-b dark:border-gray-600">
                                <input name="title" type="text" onChange={handleChange} value={ inputs.title }
                                    className="text-center bg-gray-200 text-gray-900 font-bold text-xl block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white placeholder-gray-500"
                                    placeholder="Title..." required />
                            </div>
                            <div
                                className="relative w-full h-[390px] bg-blue border border-gray-200 overflow-hidden my-0 mx-auto shadow-xl dark:bg-gray-800 dark:border-gray-700">
                                <div className="absolute top-0 right-0 bottom-0 left-0"
                                    style={{ background: 'linear-gradient(transparent, transparent 28px, black 28px)', backgroundSize: '30px 30px' }}>
                                    <textarea name="content" rows="" placeholder="Write here..." onChange={handleChange} value={ inputs.content }
                                        className="w-full h-full max-h-full max-w-full leading-[30px] py-0 px-2 bg-transparent box-border border-none resize-none z-10"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-end my-3 absolute bottom-0 right-0">
                            <button onClick={handleSubmit}
                                className="my-auto text-white bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 mb-2 ">
                                save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </>
}