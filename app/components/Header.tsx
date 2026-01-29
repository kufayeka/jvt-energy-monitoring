export default function Header() {
  return (
    <header id="header" className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 z-50">
      <h1 className="text-lg font-semibold text-gray-800">Energy Management System – Electricity</h1>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">Thursday, 29/01/2026 – 11:04:22</span>
        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">DATA LOGGER : RUNNING</span>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">PM READER : RUNNING</span>
      </div>
    </header>
  );
}