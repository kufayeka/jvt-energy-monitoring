import { atom } from "jotai";

export const refreshTickAtom = atom(0);

export const analyticsStartDateAtom = atom("");
export const analyticsEndDateAtom = atom("");
export const analyticsSampleTimeAtom = atom("");

export const analyticsIframeTotalAtom = atom(
  "http://192.168.68.99:3000/d-solo/jv5xcvr/graha-pacific?orgId=1&from=1766135892000&to=1766141404000&timezone=browser&var-site=&var-equipment=&var-sample=&var-signal=&var-device=&var-area=&var-powerFactor=&var-LWBP=&var-WBP=&var-LWBP_price=&var-WBP_price=&refresh=5s&panelId=panel-3&theme=light&__feature.dashboardSceneSolo=true"
);

export const analyticsIframeBreakdownAtom = atom(
  "http://192.168.68.99:3000/d-solo/jv5xcvr/graha-pacific?orgId=1&from=1766135892000&to=1766141404000&timezone=browser&var-site=&var-equipment=&var-sample=&var-signal=&var-device=&var-area=&var-powerFactor=&var-LWBP=&var-WBP=&var-LWBP_price=&var-WBP_price=&refresh=5s&panelId=panel-4&theme=light&__feature.dashboardSceneSolo=true"
);
