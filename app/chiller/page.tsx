import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function HVAC() {
  return (
    <div className="bg-gray-100">
      <Header />
      <Sidebar />
      <main id="main-content" className="ml-52 mt-16">
        <iframe className="bg-gray-100" src="http://localhost:3001/online/qq2xw/mi6im" title="iFrame" width="100%" height="700px" scrolling="no" frameBorder="no" allow="fullscreen"></iframe>
      </main>
    </div>
  );
}