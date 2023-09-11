import { Link } from "react-router-dom";

export default function Notfound() {
    return (
        <div className="flex items-center h-full text-gray-200 justify-center">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl text-blue-600">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">
                        Sorry, This page isn't available.
                    </p>
                    <Link
                        to="/"
                        className="flex gap-2 items-center justify-center font-semibold text-blue-600"
                    >
                        <span>Back to homepage</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}