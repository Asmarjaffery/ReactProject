import React, { useEffect, useState } from 'react'

export default function ProductData() {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; 

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        try {
            const response = await fetch("https://dummyjson.com/products?limit=100");
            const data = await response.json();
            setProductList(data.products)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    
    const totalPages = Math.ceil(productList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = productList.slice(startIndex, endIndex);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <svg className="animate-spin h-8 w-8 mr-3 text-teal-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span className="text-teal-500 font-medium text-lg">Loading...</span>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mx-auto max-w-5xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-400 to-teal-600 px-6 py-4">
                <h2 className="text-white text-xl font-bold tracking-wide">Products</h2>
                <p className="text-teal-100 text-xs mt-0.5">
                    Showing {startIndex + 1} - {Math.min(endIndex, productList.length)} of {productList.length} products
                </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-teal-50 text-teal-800 border-b border-teal-100">
                        <tr>
                            <th className="px-6 py-3 font-semibold">#</th>
                            <th className="px-6 py-3 font-semibold">Image</th>
                            <th className="px-6 py-3 font-semibold">Title</th>
                            <th className="px-6 py-3 font-semibold">Brand</th>
                            <th className="px-6 py-3 font-semibold">Price</th>
                            <th className="px-6 py-3 font-semibold">Stock</th>
                            <th className="px-6 py-3 font-semibold">Rating</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentItems.map((item, index) => (  // ✅ currentItems use karo
                            <tr key={item.id} className="hover:bg-teal-50 transition-colors duration-150">
                                <td className="px-6 py-4 text-gray-400">{startIndex + index + 1}</td>
                                <td className="px-6 py-4">
                                    <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-contain" />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-800 max-w-xs truncate">{item.title}</td>
                                <td className="px-6 py-4 text-gray-500">{item.brand}</td>
                                <td className="px-6 py-4 font-semibold text-teal-600">${item.price}</td>
                                <td className="px-6 py-4 text-gray-600">{item.stock}</td>
                                <td className="px-6 py-4">{item.rating} ⭐</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ✅ Pagination Buttons */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                </span>
                <div className="flex gap-1">
                    {/* Previous button */}
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-teal-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                        ← Prev
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1.5 text-sm rounded-lg border transition ${currentPage === page
                                    ? 'bg-teal-500 text-white border-teal-500'
                                    : 'border-gray-200 text-gray-600 hover:bg-teal-50'
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    {/* Next button */}
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-teal-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    )
}