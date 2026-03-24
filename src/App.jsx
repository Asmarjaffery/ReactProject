import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import UserData from './components/userData'
import ProductData from './components/PoductData'

function App() {
  const [showTable, setShowTable] = useState("")

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-16 gap-4">
        <div className="flex gap-2">
          <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-success-800 font-medium rounded-lg text-sm px-4 py-3 text-center leading-5 tracking-wide" onClick={() => setShowTable("userData")}>User Data</button>
          <button type="button" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-nonefocus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-4 py-3 text-center leading-5 tracking-wide" onClick={() => setShowTable("ProductData")}>Product Data</button>
        </div>
        <div className="w-full max-w-5xl mx-auto px-4">
          {
            showTable === "userData" ? <UserData /> : <ProductData />
          }
        </div>
      </div>

    </>
  )
}

export default App
