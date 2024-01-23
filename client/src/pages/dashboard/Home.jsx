import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { formatDate } from '../../../utils/helpers.js'


export default function DashboardHome() {
    const navigate = useNavigate()
    const [notes, setNotes] = useState([]);
    const [totalNotes, setTotalNotes] = useState(0);
    const [numOfPages, setNumOfPages] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const BASE_URL = import.meta.env.VITE_SERVER_URL;


    useEffect(() => {
        const url = `${BASE_URL}/user/notes?page=${page || 1}`;
        fetch(url, {
            credentials: 'include'
        }).then((result) => {
            if (result.status !== 200) {
                throw new Error('cannot retrieve notes');
            }
            return result.json()
        }).then((data) => {
            setNotes(data.notes);
            setTotalNotes(data.totalNotes);
            setNumOfPages(data.numOfPages);
            setPage(data.page);
            setLimit(data.limit);
            navigate(`/dashboard?page=${data.page}`)
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    function handlePrev() {
        const url = `${BASE_URL}/user/notes?page=${Math.max(1, page - 1)}`
        fetch(url, {
            credentials: 'include',
        }).then((result) => {
            if (result.status !== 200) {
                throw new Error('cannot retrieve notes');
            }
            return result.json()
        }).then((data) => {
            setNotes(data.notes);
            setTotalNotes(data.totalNotes);
            setNumOfPages(data.numOfPages);
            setPage(data.page);
            setLimit(data.limit);
            navigate(`/dashboard?page=${data.page}`)
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleNext() {
        const url = `${BASE_URL}/user/notes?page=${Math.min(numOfPages, page + 1)}`
        fetch(url, {
            credentials: 'include'
        }).then((result) => {
            if (result.status !== 200) {
                throw new Error('cannot retrieve notes');
            }
            return result.json()
        }).then((data) => {
            setNotes(data.notes);
            setTotalNotes(data.totalNotes);
            setNumOfPages(data.numOfPages);
            setPage(data.page);
            setLimit(data.limit);
            navigate(`/dashboard?page=${data.page}`)
        }).catch((err) => {
            console.log(err);
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

    return (
        <div className="py-10 px-2 h-screen sm:ml-64 grid grid-cols-1">
            <div className="flex justify-center items-center">
                <h3 className="text-xs md:text-2xl lg:text-5xl mt-6 py-4 font-bold tracking-tight text-gray-900 dark:text-white">My
                    Notes
                </h3>
            </div>
            <div className="p-5">
                <ul className="flex flex-col md:flex-row flex-wrap justify-around space-x-1 space-y-5">
                    <li className="hidden"></li>
                    {notes.map((note) => (
                        <li key={note?._id} className="border border-gray-200 rounded-lg p-0 shadow-lg relative md:w-1/4">
                            <div className="grid grid-rows-3 md:grid-rows-4 lg:grid-rows-5">
                                <div className="flex justify-center items-center">
                                    <p className="truncate text-center text-base md:text-lg lg:text-1xl xl:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{note.title}</p>
                                </div>
                                <div className="px-1 row-span-2 lg:row-span-3">
                                    <p className="line-clamp-3 mb-3 text-sm md:text-normal text-gray-700 dark:text-gray-400">{parseContent(note?.content)}</p>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-center line-clamp-1 pr-2">
                                        <span className="text-xs align-text-bottom text-center">
                                            updated: {formatDate(note?.updatedAt)}
                                        </span>
                                    </div>
                                    <Link to='/dashboard/viewnote' state={note}>
                                        <button className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-1 lg:px-5 lg:py-2.5 text-center">
                                            open
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}

                </ul>
            </div>

            <div className="flex flex-col items-center justify-end pt-14">

                <span className="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">
                        {page === 1 && (
                            page
                        )}
                        {page > 1 && (
                            (((page - 1) * 6) + 1)
                        )}
                    </span> to <span className="font-semibold text-gray-900 dark:text-white">
                        {page * limit}
                    </span> of <span className="font-semibold text-gray-900 dark:text-white">
                        {totalNotes}
                    </span> Entries
                </span>



                <div className="inline-flex mt-2 xs:mt-0">

                    {page > 1 && (
                        <a onClick={handlePrev} className="mr-2">
                            <button
                                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                Prev
                            </button>
                        </a>
                    )}




                    {numOfPages !== page && (
                        < a onClick={handleNext}>
                            <button
                                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border border-gray-700 rounded hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                Next
                            </button>
                        </a>
                    )}

                </div>
            </div>
        </div >
    )
}