import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <section
            className="h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
            <div
                className="flex flex-col justify-center items-center py-8 px-4 mx-auto my-44 max-w-screen-xl text-center lg:py-16 z-10 relative">
                <h1
                    className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    Unleash Your Creativity, One Note at a Time</h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">Elevate your ideas
                    with our intuitive notepad, where innovation meets simplicity for a seamless note-taking experience.</p>
                <Link to='/register'>
                    <button type="button"
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                        Get Started
                    </button>
                </Link>
            </div>
            <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0">
            </div>
        </section>
    )
}