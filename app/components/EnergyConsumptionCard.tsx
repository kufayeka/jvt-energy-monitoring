export default function EnergyConsumptionCard() {
  return (
    <div id="energy-consumption-card" className="bg-white rounded-lg border-2 border-blue-200 shadow-sm p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Energy Consumption (Last 2 Days)</h3>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Active Energy:</span> 238,632.866 kWh
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Wednesday, 28/01/2026 00:00:00 – Thursday, 29/01/2026 23:59:59
          </p>
        </div>
        {/* <div className="flex space-x-2">
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

      <div className="h-56 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
        <span className="text-gray-400 text-sm">Grafana Placeholder</span>
      </div>
    </div>
  );
}