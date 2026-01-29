"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside id="sidebar" className="fixed top-16 left-0 bottom-0 w-50 border-r-2 bg-white border-blue-200 shadow-sm flex flex-col z-40">
      <div className="p-4 border-b border-gray-200">
        <div className="w-10 h-10 bg-gray-300 rounded mb-2">Logo DBC</div>
        {/* <h2 className="text-base font-semibold text-gray-800">Javindotech</h2> */}
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          <li>
            <Link href="/" className={`flex items-center px-3 py-2.5 text-blue-600 ${isActive('/') ? 'bg-blue-50 border-l-4 border-blue-600 rounded-r' : 'hover:bg-gray-100 rounded'}`}>
              <i className="fa-solid fa-house w-5 mr-3"></i>
              <span className="font-medium">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/power-meter" className={`flex items-center px-3 py-2.5 text-blue-600 ${isActive('/power-meter') ? 'bg-blue-50 border-l-4 border-blue-600 rounded-r' : 'hover:bg-gray-100 rounded'}`}>
              <i className="fa-solid fa-bolt w-5 mr-3"></i>
              <span>Power Meter</span>
            </Link>
          </li>
          <li>
            <Link href="/chiller" className={`flex items-center px-3 py-2.5 text-blue-600 ${isActive('/chiller') ? 'bg-blue-50 border-l-4 border-blue-600 rounded-r' : 'hover:bg-gray-100 rounded'}`}>
              <i className="fa-solid fa-fan w-5 mr-3"></i>
              <span>Chiller</span>
            </Link>
          </li>
          <li>
            <Link href="/analytics" className={`flex items-center px-3 py-2.5 text-blue-600 ${isActive('/analytics') ? 'bg-blue-50 border-l-4 border-blue-600 rounded-r' : 'hover:bg-gray-100 rounded'}`}>
              <i className="fa-solid fa-chart-line w-5 mr-3"></i>
              <span>Analytics</span>
            </Link>
          </li>
          <li>
            <Link href="/settings" className={`flex items-center px-3 py-2.5 text-blue-600 ${isActive('/settings') ? 'bg-blue-50 border-l-4 border-blue-600 rounded-r' : 'hover:bg-gray-100 rounded'}`}>
              <i className="fa-solid fa-gear w-5 mr-3"></i>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-3 border-t border-gray-200">
        <button className="w-full flex items-center justify-center px-3 py-2.5 bg-white border border-gray-300 rounded hover:bg-gray-50">
          <i className="fa-solid fa-rotate-right mr-2"></i>
          <span className="font-medium text-gray-700">Refresh</span>
        </button>
      </div>
    </aside>
  );
}