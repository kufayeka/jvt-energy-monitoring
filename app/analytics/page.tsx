"use client";

import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useSettings } from "../hooks/useSettings";

export default function Analytics() {
  const [isClient, setIsClient] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sampleTime, setSampleTime] = useState("");
  const { settings, saveSettings, updateSetting, isLoaded: settingsLoaded } = useSettings();
  const [iframeSrcTotal, setIframeSrcTotal] = useState(
    `http://192.168.68.99:3000/d-solo/jv5xcvr/graha-pacific?orgId=1&from=1766135892000&to=1766141404000&timezone=browser&var-site=&var-equipment=&var-sample=&var-signal=&var-device=&var-area=&var-powerFactor=&var-LWBP=&var-WBP=&var-LWBP_price=&var-WBP_price=&refresh=5s&panelId=panel-3&theme=light&__feature.dashboardSceneSolo=true`
  );
  const [iframeSrcBreakdown, setIframeSrcBreakdown] = useState(
    `http://192.168.68.99:3000/d-solo/jv5xcvr/graha-pacific?orgId=1&from=1766135892000&to=1766141404000&timezone=browser&var-site=&var-equipment=&var-sample=&var-signal=&var-device=&var-area=&var-powerFactor=&var-LWBP=&var-WBP=&var-LWBP_price=&var-WBP_price=&refresh=5s&panelId=panel-4&theme=light&__feature.dashboardSceneSolo=true`
  );

  const buildGrafanaSrc = (panelId: string) => {
    // Fallback to fixed timestamps if dates aren't provided
    const fromMs = startDate ? new Date(startDate).getTime() : 1766135892000;
    const toMs = endDate ? new Date(endDate).getTime() : 1766141404000;
    const pf = settings?.powerFactor ?? "";
    const sample = sampleTime ?? "";

    return `http://192.168.68.99:3000/d-solo/jv5xcvr/graha-pacific?orgId=1&from=${fromMs}&to=${toMs}&timezone=browser&var-site=&var-equipment=&var-sample=${encodeURIComponent(
      sample
    )}&var-signal=&var-device=&var-area=&var-powerFactor=${encodeURIComponent(String(
      pf
    ))}&var-LWBP=&var-WBP=&var-LWBP_price=&var-WBP_price=&refresh=5s&panelId=${panelId}&theme=light&__feature.dashboardSceneSolo=true`;
  };

  const handleGenerate = () => {
    setIframeSrcTotal(buildGrafanaSrc("panel-3"));
    setIframeSrcBreakdown(buildGrafanaSrc("panel-4"));
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main-content" className="ml-52 mt-16 p-6">
        {/* <h1 className="text-2xl font-bold text-gray-800 mb-4">Analytics</h1> */}
        {/* <p className="text-gray-600">This is the Analytics page. Placeholder content.</p> */}
        {/* Add more content here */}

        
        <div className="bg-white rounded-lg border-2 border-blue-200 shadow-sm p-6">

          <h2 className="text-lg font-semibold text-gray-800 mb-3">Trend Visualisation</h2>
            <div className="bg-white border-2 border-dashed border-blue-200 p-4 rounded">
              <div className="w-full grid grid-cols-3 gap-4 mb-4">
                <TextField
                  label="Start Date"
                  type="datetime-local"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
                />

                <TextField
                  label="End Date"
                  type="datetime-local"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
                />

                <TextField
                  label="Sample Time"
                  select
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={sampleTime}
                  onChange={(e) => setSampleTime(e.target.value)}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
                  SelectProps={{ native: true }}
                >
                  <option value="">Select time</option>
                  <option value="1h">1 hours</option>
                  <option value="8h">8 hours</option>
                  <option value="12h">12 hours</option>
                  <option value="1d">1 day</option>
                  <option value="1w">1 week</option>
                </TextField>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleGenerate}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-40"
                >
                  Generate
                </button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition w-40">
                  Export to Excel
                </button>
              </div>
            </div>

          <div className="my-8 flex flex-col items-center gap-6 bg-white border border-blue-200 p-4 rounded">
            <h2 className="text-xl font-semibold">Energy Consumption Trend (Total)</h2>
            <iframe src={iframeSrcTotal} width="100%" height="500" frameBorder="0"></iframe>
            <p className="text-xs text-gray-500 break-all">
              <strong>Link:</strong> <a href={iframeSrcTotal} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{iframeSrcTotal}</a>
            </p>
            
            <h2 className="text-xl font-semibold">Energy Consumption Trend (Breakdown)</h2>
            <iframe src={iframeSrcBreakdown} width="100%" height="500" frameBorder="0"></iframe>
            <p className="text-xs text-gray-500 break-all">
              <strong>Link:</strong> <a href={iframeSrcBreakdown} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{iframeSrcBreakdown}</a>
            </p>

          </div>

        </div>
      </main>
    </>
  );
}