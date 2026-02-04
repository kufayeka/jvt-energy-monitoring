"use client";

import { useEffect, useMemo } from "react";
import { TextField } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DebugLink from "../components/DebugLink";
import ExportExcelButton from "../components/ExportExcelButton";
import { useSettings } from "../hooks/useSettings";
import { useAtom, useAtomValue } from "jotai";
import { buildGrafanaEmbedUrl } from "../config/links";
import {
  analyticsEndDateAtom,
  analyticsIframeBreakdownAtom,
  analyticsIframeTotalAtom,
  analyticsSampleTimeAtom,
  analyticsStartDateAtom,
  DEFAULT_ANALYTICS_RANGE,
  refreshTickAtom,
} from "../state/grafana";

export default function Analytics() {
  const [startDate, setStartDate] = useAtom(analyticsStartDateAtom);
  const [endDate, setEndDate] = useAtom(analyticsEndDateAtom);
  const [sampleTime, setSampleTime] = useAtom(analyticsSampleTimeAtom);
  const [iframeSrcTotal, setIframeSrcTotal] = useAtom(analyticsIframeTotalAtom);
  const [iframeSrcBreakdown, setIframeSrcBreakdown] = useAtom(analyticsIframeBreakdownAtom);
  const refreshTick = useAtomValue(refreshTickAtom);
  const { settings } = useSettings();

  const buildGrafanaSrc = (panelId: string, refreshKey?: number) => {
    // Fallback to default range if dates aren't provided
    const fromMs = startDate
      ? new Date(startDate).getTime()
      : DEFAULT_ANALYTICS_RANGE.startMs;
    const toMs = endDate
      ? new Date(endDate).getTime()
      : DEFAULT_ANALYTICS_RANGE.endMs;
    const pf = settings?.powerFactor ?? "";
    const sample = sampleTime ?? "";

    return buildGrafanaEmbedUrl({
      panelId,
      from: fromMs,
      to: toMs,
      sample,
      powerFactor: pf,
      refreshKey,
    });
  };

  const handleGenerate = () => {
    setIframeSrcTotal(buildGrafanaSrc("panel-3"));
    setIframeSrcBreakdown(buildGrafanaSrc("panel-4"));
  };

  useEffect(() => {
    if (refreshTick > 0) {
      setIframeSrcTotal(buildGrafanaSrc("panel-3", refreshTick));
      setIframeSrcBreakdown(buildGrafanaSrc("panel-4", refreshTick));
    }
  }, [refreshTick]);

  const iframeSrcTotalWithRefresh = useMemo(
    () => {
      if (!iframeSrcTotal || refreshTick === 0) return iframeSrcTotal;
      const url = new URL(iframeSrcTotal);
      url.searchParams.set("_refresh", String(refreshTick));
      return url.toString();
    },
    [iframeSrcTotal, refreshTick]
  );

  const iframeSrcBreakdownWithRefresh = useMemo(
    () => {
      if (!iframeSrcBreakdown || refreshTick === 0) return iframeSrcBreakdown;
      const url = new URL(iframeSrcBreakdown);
      url.searchParams.set("_refresh", String(refreshTick));
      return url.toString();
    },
    [iframeSrcBreakdown, refreshTick]
  );

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main-content" className="ml-52 mt-16 p-6">

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
                  <option value="1 month">1 month</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                  <option value="1 year">1 year</option>
                </TextField>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleGenerate}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-40"
                >
                  Generate
                </button>
              </div>
            </div>

          <div className="my-8 flex flex-col items-center gap-6 bg-white border border-blue-200 p-4 rounded">
            <h2 className="text-xl font-semibold">Energy Consumption Trend (Total)</h2>
            <ExportExcelButton
              embedUrl={iframeSrcTotalWithRefresh}
              label="Get Excel Report"
              filePrefix="energy-total"
            />
            <iframe src={iframeSrcTotalWithRefresh} width="100%" height="500" frameBorder="0"></iframe>
            <DebugLink url={iframeSrcTotalWithRefresh} />
            
            <h2 className="text-xl font-semibold">Energy Consumption Trend (Breakdown)</h2>
                        <ExportExcelButton
              embedUrl={iframeSrcBreakdownWithRefresh}
              label="Get Excel Report"
              filePrefix="energy-breakdown"
            />
            <iframe src={iframeSrcBreakdownWithRefresh} width="100%" height="500" frameBorder="0"></iframe>
            <DebugLink url={iframeSrcBreakdownWithRefresh} />

          </div>

        </div>
      </main>
    </>
  );
}