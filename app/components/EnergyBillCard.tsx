"use client";

import { useMemo } from "react";
import type { ReactNode } from "react";
import { useSettings } from "../hooks/useSettings";
import { useAtomValue } from "jotai";
import { refreshTickAtom } from "../state/grafana";
import DebugLink from "./DebugLink";

/* ================= CONFIG ================= */

const GRAFANA_BASE =
  "http://192.168.68.99:3000/d-solo/jv5xcvr/graha-pacific";

type PanelKey =
  | "energyTotal"
  | "energyWBP"
  | "energyLWBP"
  | "billTotal"
  | "billWBP"
  | "billLWBP";

const PANEL_ID: Record<PanelKey, string> = {
  energyTotal: "panel-9",
  energyWBP: "panel-12",
  energyLWBP: "panel-13",
  billTotal: "panel-7",
  billWBP: "panel-10",
  billLWBP: "panel-11",
};

/* ================= HELPERS ================= */

const buildGrafanaUrl = (
  panelId: string,
  vars: {
    powerFactor: number | null;
    WBP: string | null;
    LWBP: string | null;
    WBP_price: number | null;
    LWBP_price: number | null;
  },
  refreshKey?: number
) => {
  const refreshQuery = refreshKey ? `&_refresh=${refreshKey}` : "";
  return (
    `${GRAFANA_BASE}?orgId=1` +
    `&from=now-2d&to=now&timezone=browser` +
    `&var-site=&var-equipment=&var-sample=&var-signal=&var-device=&var-area=` +
    `&var-powerFactor=${vars.powerFactor ?? ""}` +
    `&var-WBP=${vars.WBP ?? ""}` +
    `&var-LWBP=${vars.LWBP ?? ""}` +
    `&var-WBP_price=${vars.WBP_price ?? ""}` +
    `&var-LWBP_price=${vars.LWBP_price ?? ""}` +
    `&refresh=5s&panelId=${panelId}&theme=light` +
    `&__feature.dashboardSceneSolo=true${refreshQuery}`
  );
};

/* ================= COMPONENT ================= */

export default function EnergyBillCard() {
  const { settings, isLoaded } = useSettings();
  const refreshTick = useAtomValue(refreshTickAtom);

  const panels = useMemo<Record<PanelKey, string>>(() => {
    if (!isLoaded) {
      return {
        energyTotal: "",
        energyWBP: "",
        energyLWBP: "",
        billTotal: "",
        billWBP: "",
        billLWBP: "",
      };
    }

    const vars = {
      powerFactor: settings.powerFactor ?? null,
      WBP: settings.tariff1StartTime ?? null,
      LWBP: settings.tariff1EndTime ?? null,
      WBP_price: settings.tariff1PerKwh ?? null,
      LWBP_price: settings.tariff2PerKwh ?? null,
    };

    return {
      energyTotal: buildGrafanaUrl(PANEL_ID.energyTotal, vars, refreshTick),
      energyWBP: buildGrafanaUrl(PANEL_ID.energyWBP, vars, refreshTick),
      energyLWBP: buildGrafanaUrl(PANEL_ID.energyLWBP, vars, refreshTick),
      billTotal: buildGrafanaUrl(PANEL_ID.billTotal, vars, refreshTick),
      billWBP: buildGrafanaUrl(PANEL_ID.billWBP, vars, refreshTick),
      billLWBP: buildGrafanaUrl(PANEL_ID.billLWBP, vars, refreshTick),
    };
  }, [isLoaded, settings, refreshTick]);

  const renderPanel = (url: string): ReactNode =>
    url ? (
      <>
        <iframe src={url} width="100%" height="120" frameBorder="0" />
        <DebugLink url={url} />
      </>
    ) : (
      <div className="text-xs text-gray-400">Loading…</div>
    );

  return (
    <div className="bg-white rounded-lg border-2 border-blue-200 shadow-sm p-6">
      {/* HEADER */}
      <div className="flex items-start justify-between mb-5">
        <h3 className="text-lg font-bold text-gray-800">
          Energy & Bill Summary
        </h3>
        <p className="text-sm text-gray-500">Last 2 Days</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ENERGY */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Total Energy Consumption
            </p>
            {renderPanel(panels.energyTotal)}
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">
              Energy Consumption (WBP)
            </p>
            {renderPanel(panels.energyWBP)}
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">
              Energy Consumption (LWBP)
            </p>
            {renderPanel(panels.energyLWBP)}
          </div>
        </div>

        {/* BILL */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Total Energy Bill
            </p>
            {renderPanel(panels.billTotal)}
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">
              Energy Bill (WBP)
            </p>
            {renderPanel(panels.billWBP)}
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">
              Energy Bill (LWBP)
            </p>
            {renderPanel(panels.billLWBP)}
          </div>
        </div>
      </div>
    </div>
  );
}
