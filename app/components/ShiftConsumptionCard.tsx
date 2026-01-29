export default function ShiftConsumptionCard() {
  return (
    <div id="shift-consumption-card" className="bg-white rounded-lg border-2 border-blue-200 shadow-sm p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Energy Consumption per Shift (Last 24 Hours)</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-medium">Shift 1:</span> 07:00 – 14:59</p>
            <p><span className="font-medium">Shift 2:</span> 15:00 – 22:59</p>
            <p><span className="font-medium">Shift 3:</span> 23:00 – 06:59</p>
          </div>
        </div>
        {/* <div className="flex flex-col space-y-2">
          <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
            <i className="fa-solid fa-expand text-sm"></i>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
            <i className="fa-solid fa-rotate-right text-sm"></i>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
            <i className="fa-solid fa-download text-sm"></i>
          </button>
        </div> */}
      </div>

      <div className="flex items-center justify-center my-8">
        <div className="w-64 h-64 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-gray-400 text-sm">Pie Chart Grafana Placeholder</span>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
          <span className="text-sm text-gray-700">Shift 1</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
          <span className="text-sm text-gray-700">Shift 2</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
          <span className="text-sm text-gray-700">Shift 3</span>
        </div>
      </div>
    </div>
  );
}