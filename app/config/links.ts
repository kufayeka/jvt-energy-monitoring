export const SERVER_IP = "172.25.104.4";
export const APP_ORIGIN = `http://${SERVER_IP}:3000`;
export const GRAFANA_BASE_URL = `http://${SERVER_IP}:3000`;
export const GRAFANA_DASHBOARD_UID = "jv5xcvr";
export const GRAFANA_DASHBOARD_SLUG = "graha-pacific";
export const EXCEL_BASE_URL = `http://${SERVER_IP}:3333`;
export const NODE_RED_DASHBOARD_URL = `http://${SERVER_IP}:1880/dashboard/EMSCard`;
export const CHILLER_EMBED_URL = `http://${SERVER_IP}:1111/online/swtop/mi6im`;

type GrafanaEmbedOptions = {
  panelId: string;
  from: string | number;
  to: string | number;
  sample?: string;
  powerFactor?: string | number;
  refreshKey?: number;
  variables?: Record<string, string | number | null | undefined>;
};

export function buildGrafanaEmbedUrl({
  panelId,
  from,
  to,
  sample,
  powerFactor,
  refreshKey,
  variables,
}: GrafanaEmbedOptions) {
  const url = new URL(
    `/d-solo/${GRAFANA_DASHBOARD_UID}/${GRAFANA_DASHBOARD_SLUG}`,
    GRAFANA_BASE_URL
  );

  url.searchParams.set("orgId", "1");
  url.searchParams.set("from", String(from));
  url.searchParams.set("to", String(to));
  url.searchParams.set("timezone", "browser");
  url.searchParams.set("var-site", "");
  url.searchParams.set("var-equipment", "");
  url.searchParams.set("var-sample", sample ?? "");
  url.searchParams.set("var-signal", "");
  url.searchParams.set("var-device", "");
  url.searchParams.set("var-area", "");
  url.searchParams.set("var-powerFactor", powerFactor == null ? "" : String(powerFactor));
  url.searchParams.set("var-LWBP", "");
  url.searchParams.set("var-WBP", "");
  url.searchParams.set("var-LWBP_price", "");
  url.searchParams.set("var-WBP_price", "");
  url.searchParams.set("refresh", "5s");
  url.searchParams.set("panelId", panelId);
  url.searchParams.set("theme", "light");
  url.searchParams.set("__feature.dashboardSceneSolo", "true");

  if (refreshKey) {
    url.searchParams.set("_refresh", String(refreshKey));
  }

  if (variables) {
    Object.entries(variables).forEach(([key, value]) => {
      url.searchParams.set(`var-${key}`, value == null ? "" : String(value));
    });
  }

  return url.toString();
}

const normalizeToMs = (value: string | null) => {
  if (!value) return "";
  if (/^\d+$/.test(value)) return value;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? "" : String(parsed);
};

export function buildExcelUrlFromEmbed(embedUrl: string) {
  const embed = new URL(embedUrl);
  const panelRaw = embed.searchParams.get("panelId") ?? "";
  const panelId = panelRaw.startsWith("panel-")
    ? panelRaw.replace("panel-", "")
    : panelRaw;
  const fromMs = normalizeToMs(embed.searchParams.get("from"));
  const toMs = normalizeToMs(embed.searchParams.get("to"));

  const excelUrl = new URL("/excel", EXCEL_BASE_URL);
  excelUrl.searchParams.set("dashboardUid", GRAFANA_DASHBOARD_UID);
  if (panelId) excelUrl.searchParams.set("panelId", panelId);
  if (fromMs) excelUrl.searchParams.set("from", fromMs);
  if (toMs) excelUrl.searchParams.set("to", toMs);

  embed.searchParams.forEach((value, key) => {
    if (key.startsWith("var-")) {
      excelUrl.searchParams.set(key, value);
    }
  });

  return excelUrl.toString();
}
