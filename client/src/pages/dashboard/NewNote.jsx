import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewNote() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        const url = 'http://localhost:3000/user/addNote';

        fetch(url, {
            credentials: 'include',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: inputs.title,
                content: inputs.content,
            }),
        }).then((result) => {
            if (result.status >= 400) {
                throw new Error('Error creating note');
            }

            return result.json();
        }).then((data) => {
            navigate('/dashboard');
            console.log(`${data}`)
        }).catch((err) => {
            console.log(err);
        });
        
       
    }

    return <>
        <div className="flex justify-center pt-20 pb-5 h-screen sm:ml-64 relative border border-red-700">
            <div className="max-h-full w-11/12 md:w-3/4">
                <form className="shadow-2xl">
                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div className="flex items-center justify-between border-b dark:border-gray-600">
                            <input name="title" type="text" onChange={handleChange} value={inputs.title}
                                className="text-center bg-gray-200 text-gray-900 font-bold text-xl block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white placeholder-gray-500"
                                placeholder="Title..." required />
                        </div>
                        <div
                            className="relative w-full h-[390px] bg-blue border border-gray-200 overflow-hidden my-0 mx-auto shadow-xl dark:bg-gray-800 dark:border-gray-700">
                            <div className="absolute top-0 right-0 bottom-0 left-0"
                                style={{background: 'linear-gradient(transparent, transparent 28px, black 28px)', backgroundSize: '30px 30px'}}>
                                <textarea name="content" rows="" placeholder="Write here..." onChange={handleChange} value={inputs.content}
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
    </>
}