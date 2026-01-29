import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Analytics() {
  return (
    <>
      <Header />
      <Sidebar />
      <main id="main-content" className="ml-52 mt-16 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Analytics</h1>
        <p className="text-gray-600">This is the Analytics page. Placeholder content.</p>
        {/* Add more content here */}
      </main>
    </>
  );
}