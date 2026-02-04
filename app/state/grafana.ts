import { atom } from "jotai";
import { buildGrafanaEmbedUrl } from "../config/links";

const pad2 = (value: number) => String(value).padStart(2, "0");

const formatDateTimeLocal = (date: Date) => {
  const year = date.getFullYear();
  const month = pad2(date.getMonth() + 1);
  const day = pad2(date.getDate());
  const hours = pad2(date.getHours());
  const minutes = pad2(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// set default analytic start-end time range from 7 days ago to now  
const getDefaultAnalyticsRange = () => {
  const now = new Date();
  now.setSeconds(0, 0);

  const start = new Date(now);
  start.setDate(now.getDate() - 7);
  start.setHours(0, 0, 0, 0);

  return {
    startDate: formatDateTimeLocal(start),
    endDate: formatDateTimeLocal(now),
    startMs: start.getTime(),
    endMs: now.getTime(),
  };
};

export const DEFAULT_ANALYTICS_RANGE = getDefaultAnalyticsRange();
export const refreshTickAtom = atom(0);
export const analyticsStartDateAtom = atom(DEFAULT_ANALYTICS_RANGE.startDate);
export const analyticsEndDateAtom = atom(DEFAULT_ANALYTICS_RANGE.endDate);
export const analyticsSampleTimeAtom = atom("1h");

export const analyticsIframeTotalAtom = atom(
  buildGrafanaEmbedUrl({
    panelId: "panel-3",
    from: DEFAULT_ANALYTICS_RANGE.startMs,
    to: DEFAULT_ANALYTICS_RANGE.endMs,
  })
);

export const analyticsIframeBreakdownAtom = atom(
  buildGrafanaEmbedUrl({
    panelId: "panel-4",
    from: DEFAULT_ANALYTICS_RANGE.startMs,
    to: DEFAULT_ANALYTICS_RANGE.endMs,
  })
);
