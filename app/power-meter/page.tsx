import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { NODE_RED_DASHBOARD_URL } from "../config/links";

export default function PowerMeter() {
  return (
    <>
      <Header />
      <Sidebar />
      <main id="main-content" className="ml-50 mt-20">
        {/* <h1 className="text-2xl font-bold text-gray-800 mb-4">Power Meter</h1>
        <p className="text-gray-600">This is the Power Meter page. Placeholder content.</p> */}
        {/* Add more content here */}
        <div style={{ transform: "scale(0.67)", transformOrigin: "top left", width: "150%", height: "1500px" }}>
          <iframe style={{ border: "1px #FFFFFF none" }} src={NODE_RED_DASHBOARD_URL} title="iFrame" width="100%" height="2000px"  allow="fullscreen"></iframe>
        </div>
      </main>
    </>
  );
}