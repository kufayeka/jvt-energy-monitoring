export default function CompanyInfoCard() {
  return (
    <div id="company-info-card" className="bg-white rounded-lg border-2 border-blue-200 shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Graha Pacific</h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        Jl. Basuki Rahmat No. 87 -91<br />
        Surabaya - Jawa Timur 60271
      </p>

      <div className="h-100 bg-gray-100 rounded-sm overflow-hidden">
        <img className="w-full h-full object-contain" src="./grahapacific1-transparent-ai.png" alt="modern industrial building facade exterior corporate headquarters" />
      </div>
    </div>
  );
}