import React from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchBar: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center py-6">
      <div className="flex items-center bg-white shadow-2xl rounded-full px-4 py-4 w-full max-w-4xl">
        <div className="flex flex-1 items-center border-r px-4">
          <div className="text-xs font-semibold text-gray-700">Where</div>
          <input
            type="text"
            placeholder="Search destinations"
            className="ml-2 outline-none text-sm text-gray-600 w-full"
          />
        </div>

        <div className="flex flex-1 items-center border-r px-4">
          <div className="text-xs font-semibold text-gray-700">Check in</div>
          <input
            type="date"
            className="ml-2 outline-none text-sm text-gray-600 w-full"
          />
        </div>

        <div className="flex flex-1 items-center border-r px-4">
          <div className="text-xs font-semibold text-gray-700">Check out</div>
          <input
            type="date"
            className="ml-2 outline-none text-sm text-gray-600 w-full"
          />
        </div>

        <div className="flex flex-1 items-center px-4">
          <div className="text-xs font-semibold text-gray-700">Who</div>
          <input
            type="number"
            min="1"
            placeholder="Add guests"
            className="ml-2 outline-none text-sm text-gray-600 w-full"
          />
        </div>

        <button className="ml-4 bg-red-500 text-white p-3 rounded-full hover:bg-red-600">
          <FaSearch />
        </button>
      </div>
    </div>
    </div>
  )
}

export default SearchBar
