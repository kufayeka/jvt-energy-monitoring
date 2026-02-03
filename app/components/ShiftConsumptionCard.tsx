"use client";

import { useMemo } from "react";
import { useSettings } from "../hooks/useSettings";
import { useAtomValue } from "jotai";
import { refreshTickAtom } from "../state/grafana";
import DebugLink from "./DebugLink";

export default function ShiftConsumptionCard() {
  const { settings, isLoaded: settingsLoaded } = useSettings();
  const refreshTick = useAtomValue(refreshTickAtom);

  const iframeSrc = useMemo(() => {
    const pf = settingsLoaded ? settings.powerFactor ?? "" : "";
    const refreshQuery = refreshTick ? `&_refresh=${refreshTick}` : "";
    return `http://192.168.68.99:3000/d-solo/jv5xcvr/graha-pacific?orgId=1&from=now-2d&to=now&timezone=browser&var-site=&var-equipment=&var-sample=&var-signal=&var-device=&var-area=&var-powerFactor=${encodeURIComponent(
      String(pf)
    )}&var-LWBP=&var-WBP=&var-LWBP_price=&var-WBP_price=&refresh=5s&panelId=panel-8&theme=light&__feature.dashboardSceneSolo=true${refreshQuery}`;
  }, [settingsLoaded, settings.powerFactor, refreshTick]);

  return (
    <div id="shift-consumption-card" className="bg-white rounded-lg border-2 border-blue-200 shadow-sm p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Energy Consumption per Shift (Last 24 Hours)</h3>

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

      {/* <div className="flex items-center justify-center my-8">
        <div className="w-64 h-64 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-gray-400 text-sm">Pie Chart Grafana Placeholder</span>
        </div>
      </div> */}
      <iframe src={iframeSrc} width="450" height="400" frameBorder="0"></iframe>
      <DebugLink url={iframeSrc} />
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
          <span className="text-sm text-gray-700">Shift 1: 07:00 – 14:59</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
          <span className="text-sm text-gray-700">Shift 2: 15:00 – 22:59</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
          <span className="text-sm text-gray-700">Shift 3: 23:00 – 06:59</span>
        </div>
      </div>

  );
}