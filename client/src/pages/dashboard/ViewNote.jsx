import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


export default function ViewNote() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(JSON.parse(state.content));
    const BASE_URL = import.meta.env.VITE_SERVER_URL;

    const htmlString = value;

    const content = document.createElement('div');
    content.innerHTML = htmlString;

    const firstChild = content.firstChild;
    const title = firstChild.textContent.trim() || null;
    const body = JSON.stringify(content.innerHTML);

    function handleDelete() {
        const url = `${BASE_URL}/user/note/${state._id}`;
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

    function handleSubmit() {
        const url = `${BASE_URL}/user/note/${state._id}`;
        fetch(url, {
            credentials: 'include',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                content: body,
            }),
        }).then((response) => {
            if (response.status >= 400) {
                throw new Error('Failed to update note')
            }
            navigate('/dashboard');
        }).catch((err) => {
            console.log(err);
            navigate('/dashboard');
        })
    }

    function parseContent(content) {
        const body = JSON.parse(content);
        const tempDiv = document.createElement('div');

        tempDiv.innerHTML = body;
        const firstChild = tempDiv.firstChild;
        tempDiv.removeChild(firstChild);

        const innerText = tempDiv.innerText.trim();

        return innerText;
    }

    return <>
        {!edit && (
            <div id="viewNote" className="px-6 pt-20 pb-5 h-screen sm:ml-64 relative">


                <div id="edit-btn" className="flex justify-center">
                    <div
                        className="relative w-full md:h-[70vh] min-h-[60vh]  p-6 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700">
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
                                {parseContent(state.content)}
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
                <div className="max-h-full w-11/12 md:w-3/4 relative">
                    <ReactQuill className='h-2/3 relative text-center' theme="snow" value={value} onChange={setValue} />
                </div>
                <div className="absolute bottom-5 w-11/12 md:w-3/4 flex flex-row justify-end">
                    <button onClick={handleSubmit}
                        className="my-auto text-white bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 mb-2 ">
                        save
                    </button>
                </div>
            </div>
            
        )}
    </>
}