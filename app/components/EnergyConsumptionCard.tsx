"use client";

import { useMemo } from "react";
import { useSettings } from "../hooks/useSettings";
import { useAtomValue } from "jotai";
import { refreshTickAtom } from "../state/grafana";
import DebugLink from "./DebugLink";
import { buildGrafanaEmbedUrl } from "../config/links";

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
  const refreshTick = useAtomValue(refreshTickAtom);

  const { fromDate, toDate, displayRange } = useMemo(() => {
    const now = new Date();
    const from = new Date(now);
    from.setDate(now.getDate() - 2);
    from.setHours(0, 0, 0, 0);
    return {
      fromDate: from,
      toDate: now,
      displayRange: formatRange(now),
    };
  }, []);

  const iframeSrc = useMemo(() => {
    if (!settingsLoaded) return "";
    const pf = settings.powerFactor ?? "";
    const fromMs = fromDate.getTime();
    const toMs = toDate.getTime();

    return buildGrafanaEmbedUrl({
      panelId: "panel-5",
      from: fromMs,
      to: toMs,
      powerFactor: pf,
      refreshKey: refreshTick,
    });
  }, [settingsLoaded, settings.powerFactor, fromDate, toDate, refreshTick]);

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
        <DebugLink url={iframeSrc} />
      )}
    </div>
  );
}