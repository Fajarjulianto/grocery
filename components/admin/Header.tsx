import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header className="z-10 py-4 bg-gray-800 shadow-md">
      <div className="flex container justify-center items-center h-full px-6 mx-auto text-white">
        {/* Tombol Notifikasi */}
        <button
          className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
          aria-label="Notifications"
          aria-haspopup="true"
        >
          <FaBell className="w-5 h-5" />
          <span className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"></span>
        </button>
        {/* Tombol Profil */}
        <button
          className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple ml-4"
          aria-label="Account"
          aria-haspopup="true"
        >
          <FaUserCircle className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
