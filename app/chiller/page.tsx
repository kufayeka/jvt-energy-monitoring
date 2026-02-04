import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { CHILLER_EMBED_URL } from "../config/links";

export default function HVAC() {
  return (
    <div className="bg-gray-100">
      <Header />
      <Sidebar />
      <main id="main-content" className="ml-50 mt-16">
        <iframe className="bg-gray-100" src={CHILLER_EMBED_URL} title="iFrame" width="100%" height="700px" allow="fullscreen"></iframe>
      </main>
    </div>
  );
}