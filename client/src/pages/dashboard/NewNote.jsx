import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import 'dotenv/config'


export default function NewNote() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [value, setValue] = useState(`<h1 style="text-align: center; font-weight: bold;">Note title...</h1><p>Write here...</p>`);
    const URI = process.env.MODE === 'production'? 'https://notepad-server-at29.onrender.com' : 'http://localhost:3000';

    const htmlString = value;

    const content = document.createElement('div');
    content.innerHTML = htmlString;

    // Get the first child
    const firstChild = content.firstChild;

    // Check if the first child has text content
    const title = firstChild.textContent.trim() || null;
    
    const body = JSON.stringify(content.innerHTML);

    function handleSubmit(e) {
        e.preventDefault();
        const url = process.env.MODE === 'production'? `${URI}/user/addNote` : `/api/user/addNote`;
       
        fetch(url, {
            credentials: 'include',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                content: body,
            }),
        }).then((result) => {
            if (result.status >= 400) {
                throw new Error('Error creating note');
            }

            return result.json();
        }).then((data) => {
            navigate('/dashboard');
        }).catch((err) => {
            console.log(err);
        });


    }

    return <>
        <div className="flex justify-center pt-20 pb-5 h-screen sm:ml-64 relative border border-red-700">
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
    </>
}