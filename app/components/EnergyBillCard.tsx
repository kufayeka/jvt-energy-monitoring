"use client";

import { useMemo } from "react";
import type { ReactNode } from "react";
import { useSettings } from "../hooks/useSettings";
import { useAtomValue } from "jotai";
import { refreshTickAtom } from "../state/grafana";
import DebugLink from "./DebugLink";
import { buildGrafanaEmbedUrl } from "../config/links";

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

    const grafanaVars = {
      WBP: vars.WBP,
      LWBP: vars.LWBP,
      WBP_price: vars.WBP_price,
      LWBP_price: vars.LWBP_price,
    };

    return {
      energyTotal: buildGrafanaEmbedUrl({
        panelId: PANEL_ID.energyTotal,
        from: "now/M",
        to: "now",
        powerFactor: vars.powerFactor ?? "",
        variables: grafanaVars,
        refreshKey: refreshTick,
      }),
      energyWBP: buildGrafanaEmbedUrl({
        panelId: PANEL_ID.energyWBP,
        from: "now/M",
        to: "now",
        powerFactor: vars.powerFactor ?? "",
        variables: grafanaVars,
        refreshKey: refreshTick,
      }),
      energyLWBP: buildGrafanaEmbedUrl({
        panelId: PANEL_ID.energyLWBP,
        from: "now/M",
        to: "now",
        powerFactor: vars.powerFactor ?? "",
        variables: grafanaVars,
        refreshKey: refreshTick,
      }),
      billTotal: buildGrafanaEmbedUrl({
        panelId: PANEL_ID.billTotal,
        from: "now/M",
        to: "now",
        powerFactor: vars.powerFactor ?? "",
        variables: grafanaVars,
        refreshKey: refreshTick,
      }),
      billWBP: buildGrafanaEmbedUrl({
        panelId: PANEL_ID.billWBP,
        from: "now/M",
        to: "now",
        powerFactor: vars.powerFactor ?? "",
        variables: grafanaVars,
        refreshKey: refreshTick,
      }),
      billLWBP: buildGrafanaEmbedUrl({
        panelId: PANEL_ID.billLWBP,
        from: "now/M",
        to: "now",
        powerFactor: vars.powerFactor ?? "",
        variables: grafanaVars,
        refreshKey: refreshTick,
      }),
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
        <p className="text-sm text-gray-500">This Month</p>
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
