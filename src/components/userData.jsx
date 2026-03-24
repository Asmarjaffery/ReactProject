import React, { useEffect, useState } from 'react'

export default function UserData() {
    const [userList, setUserList] = useState([]);
    const [loader, setLoader] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        getUsers();
        const interval = setInterval(() => {
            getUsers();
        }, 10000);
        return () => clearInterval(interval)
    }, [])

    const getUsers = async () => {
        try {
            setLoader(true)
            const response = await fetch("https://dummyjson.com/users?limit=100");
            const data = await response.json();
            setUserList(data.users)
        } catch (error) {
            console.log(error)
        } finally {
            setLoader(false)
        }
    }

    const totalPages = Math.ceil(userList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = userList.slice(startIndex, endIndex);

    if (loader) {
        return (
            <div className="flex items-center justify-center py-20 text-gray-400">
                <svg className="animate-spin h-8 w-8 mr-3 text-cyan-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span className="text-cyan-500 font-medium text-lg">Loading...</span>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mx-auto w-full max-w-5xl px-2 sm:px-0">

            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-teal-500 px-4 sm:px-6 py-4">
                <h2 className="text-white text-lg sm:text-xl font-bold tracking-wide">Users</h2>
                <p className="text-cyan-100 text-xs mt-0.5">
                    Showing {startIndex + 1} - {Math.min(endIndex, userList.length)} of {userList.length} users
                </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="px-3 sm:px-6 py-3 font-semibold">#</th>
                            <th className="px-3 sm:px-6 py-3 font-semibold">Image</th>
                            <th className="px-3 sm:px-6 py-3 font-semibold">First Name</th>
                            <th className="hidden sm:table-cell px-3 sm:px-6 py-3 font-semibold">Last Name</th>
                            <th className="px-3 sm:px-6 py-3 font-semibold">Age</th>
                            <th className="hidden md:table-cell px-3 sm:px-6 py-3 font-semibold">Birth Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="px-3 sm:px-6 py-3">{startIndex + index + 1}</td>
                                <td className="px-3 sm:px-6 py-3">
                                    <img
                                        src={item.image}
                                        alt={item.firstName}
                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                                    />
                                </td>
                                <td className="px-3 sm:px-6 py-3">{item.firstName}</td>
                                <td className="hidden sm:table-cell px-3 sm:px-6 py-3">{item.lastName}</td>
                                <td className="px-3 sm:px-6 py-3">{item.age}</td>
                                <td className="hidden md:table-cell px-3 sm:px-6 py-3">{item.birthDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 sm:px-6 py-4 border-t border-gray-100">
                <span className="text-xs sm:text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                </span>
                <div className="flex flex-wrap justify-center gap-1">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-cyan-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                        ← Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg border transition ${
                                currentPage === page
                                    ? 'bg-cyan-500 text-white border-cyan-500'
                                    : 'border-gray-200 text-gray-600 hover:bg-cyan-50'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-cyan-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    )
}