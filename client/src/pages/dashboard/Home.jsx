import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { formatDate } from '../../../utils/helpers.js'


export default function DashboardHome() {
    const [notes, setNotes] = useState([]);
    const [totalNotes, setTotalNotes] = useState(0);
    const [numOfPages, setNumOfPages] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);

    useEffect(() => {
        fetch('http://localhost:3000/user/notes', {
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
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    function handleClick() {
        console.log('submit')
    }

    function handlePrev() {
        const url = `/user/notes?page=${Math.max(1, page - 1)}`
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
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleNext() {
        const url = `/user/notes?${page}=${Math.min(numOfPages, page + 1)}`
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
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="py-10 px-2 h-screen sm:ml-64 grid grid-cols-1">
            <div className="flex justify-center items-center">
                <h3 className="text-xs md:text-2xl lg:text-5xl mt-6 py-4 font-bold tracking-tight text-gray-900 dark:text-white">My
                    Notes
                </h3>
            </div>
            <ul className="flex flex-row flex-wrap">
                {notes.map((note) => (
                    <li key={note?._id} className="h-56">
                        <div
                            className="h-full relative p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div>
                                <h3
                                    className="truncate mb-2 text-base md:text-lg lg:text-1xl xl:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {note?.title}
                                </h3>
                            </div>
                            <div>
                                <p className="line-clamp-3 mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    {note?.content}
                                </p>
                            </div>
                            <div className="absolute left-0 bottom-0 w-full">
                                <div className="flex flex-col">
                                    <div className="text-center">
                                        <span className="text-xs align-text-bottom text-center">
                                            updated: {formatDate(note?.updatedAt)}
                                        </span>
                                    </div>

                                    <Link onClick={handleClick} to='/dashboard/viewnote' state={note}
                                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-1 lg:px-5 lg:py-2.5 text-center">
                                        open
                                    </Link>

                                </div>
                            </div>
                        </div>

                    </li>
                ))}

            </ul>

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

                    <a onClick={handlePrev} className="mr-2">
                        <button
                            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Prev
                        </button>
                    </a>




                    < a onClick={handleNext}>
                        <button
                            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border border-gray-700 rounded hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Next
                        </button>
                    </a>

                </div>
            </div>
        </div >
    )
}