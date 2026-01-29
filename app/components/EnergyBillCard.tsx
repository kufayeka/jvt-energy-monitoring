export default function EnergyBillCard() {
  return (
    <div id="energy-bill-card" className="bg-white rounded-lg border-2 border-blue-200 shadow-sm p-6">
      <div className="flex items-start justify-between mb-5">
        <h3 className="text-lg font-bold text-gray-800">Energy & Bill Summary</h3>
        <p className="text-sm text-gray-500">Summary from 01/01/2026 to 31/01/2026</p>
      </div>

      <div className="mb-6 space-y-1">
        <p className="text-sm text-gray-600">Multi-Tariff 1 (WBP) : <span className="font-medium">Rp. 1553.67 per kWh</span></p>
        <p className="text-sm text-gray-600">Multi-Tariff 2 (LWBP) : <span className="font-medium">Rp. 1035.78 per kWh</span></p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4 flex flex-col items-center">
          <div className="flex items-start space-x-3 pb-4 border-b-2 border-gray-200">
            <i className="fa-solid fa-bolt text-2xl text-blue-600 mt-1"></i>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Energy Consumption</p>
              <p className="text-2xl font-bold text-blue-600">111,333.77 kWh</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col justify-between items-center">
                <span className="text-sm text-gray-600">Energy Consumption (WBP)</span>
                <div className="flex items-center justify-center">
                    <div className="w-70 h-20 bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Grafana Placeholder</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between items-center">
              <span className="text-sm text-gray-600">Energy Consumption (LWBP)</span>
                <div className="flex items-center justify-center">
                    <div className="w-70 h-20 bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Grafana Placeholder</span>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 flex flex-col items-center">
          <div className="flex items-start space-x-3 pb-4 border-b-2 border-gray-200">
            <i className="fa-solid fa-coins text-2xl text-red-600 mt-1"></i>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Energy Bill</p>
              <p className="text-2xl font-bold text-red-600">Rp. 111,333,777</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col justify-between items-center">
              <span className="text-sm text-gray-600">Energy Bill (WBP)</span>
                <div className="flex items-center justify-center">
                    <div className="w-70 h-20 bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Grafana Placeholder</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between items-center">
              <span className="text-sm text-gray-600">Energy Bill (LWBP)</span>
                <div className="flex items-center justify-center">
                    <div className="w-70 h-20 bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Grafana Placeholder</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}