"use client";

import { useState, useEffect } from "react";
import { useSettings } from "../hooks/useSettings";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function formatDateFull(d: Date) {
  const weekday = d.toLocaleDateString(undefined, { weekday: "long" });
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());
  return `${weekday}, ${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function formatRange(now: Date) {
  const start = new Date(now);
  start.setDate(now.getDate() - 2);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now);
  // use current time for end
  return `${formatDateFull(start)} – ${formatDateFull(end)}`;
}

export default function EnergyConsumptionCard() {
  const { settings, isLoaded: settingsLoaded } = useSettings();
  const [displayRange, setDisplayRange] = useState("");
  const [iframeSrc, setIframeSrc] = useState("");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  // compute from/to dates once on client mount to avoid SSR hydration mismatch
  useEffect(() => {
    const now = new Date();
    const from = new Date(now);
    from.setDate(now.getDate() - 2);
    from.setHours(0, 0, 0, 0);
    setFromDate(from);
    setToDate(now);
    setDisplayRange(formatRange(now));
  }, []);

  // build iframe URL using the computed from/to dates and settings
  useEffect(() => {
    if (settingsLoaded && fromDate && toDate) {
      const pf = settings.powerFactor ?? "";
      const fromMs = fromDate.getTime();
      const toMs = toDate.getTime();

      const src = `http://192.168.68.99:3000/d-solo/jv5xcvr/graha-pacific?orgId=1&from=${fromMs}&to=${toMs}&timezone=browser&var-site=&var-equipment=&var-sample=&var-signal=&var-device=&var-area=&var-powerFactor=${encodeURIComponent(
        String(pf)
      )}&var-LWBP=&var-WBP=&var-LWBP_price=&var-WBP_price=&refresh=5s&panelId=panel-5&theme=light&__feature.dashboardSceneSolo=true`;
      setIframeSrc(src);
    }
  }, [settingsLoaded, settings.powerFactor, fromDate, toDate]);

  return (
    <div id="energy-consumption-card" className="bg-white rounded-lg border-2 border-blue-200 shadow-sm p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Energy Consumption (Last 2 Days)</h3>
          <p className="text-xs text-gray-500 mt-1">{displayRange}</p>
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

      <div className="bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
        {/* <span className="text-gray-400 text-sm">Grafana Placeholder</span> */}
        <iframe src={iframeSrc || undefined} width="100%" height="500" frameBorder="0"></iframe>
      </div>
      {iframeSrc && (
        <p className="text-xs text-gray-500 break-all mb-4">
          <strong>Link:</strong> <a href={iframeSrc} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{iframeSrc}</a>
        </p>
      )}
    </div>
  );
}