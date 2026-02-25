import { useState, useEffect } from "react";

export interface Settings {
  tariff1PerKwh: number;
  tariff1StartTime: string;
  tariff1EndTime: string;
  tariff2PerKwh: number;
  powerFactor: number;
  chiller1RunningHoursLimit: number;
  chiller2RunningHoursLimit: number;
  chiller3RunningHoursLimit: number;
  chiller1CurrentRunningHours: number;
  chiller2CurrentRunningHours: number;
  chiller3CurrentRunningHours: number;
  inletPump1RunningHoursLimit: number;
  inletPump2RunningHoursLimit: number;
  outletPump1RunningHoursLimit: number;
  outletPump2RunningHoursLimit: number;
}

const DEFAULT_SETTINGS: Settings = {
  tariff1PerKwh: 0,
  tariff1StartTime: "00:00",
  tariff1EndTime: "00:00",
  tariff2PerKwh: 0,
  powerFactor: 0,
  chiller1RunningHoursLimit: 0,
  chiller2RunningHoursLimit: 0,
  chiller3RunningHoursLimit: 0,
  chiller1CurrentRunningHours: 0,
  chiller2CurrentRunningHours: 0,
  chiller3CurrentRunningHours: 0,
  inletPump1RunningHoursLimit: 0,
  inletPump2RunningHoursLimit: 0,
  outletPump1RunningHoursLimit: 0,
  outletPump2RunningHoursLimit: 0,
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from API on mount
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        const data = (await res.json()) as Settings;
        if (active) {
          setSettings(data);
          setIsLoaded(true);
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
        if (active) {
          setSettings(DEFAULT_SETTINGS);
          setIsLoaded(true);
        }
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  // Save to API
  const saveSettings = async (newSettings: Settings) => {
    setSettings(newSettings);
    setIsLoaded(true);
    try {
      // Save to local API
      const localSave = fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings),
      });

      // Save to external endpoint
      const externalSave = fetch("http://172.25.104.4:1880/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings),
      });

      // Wait for both requests to complete
      await Promise.all([localSave, externalSave]);
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  // Update single field
  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    const updated = { ...settings, [key]: value };
    saveSettings(updated);
  };

  return { settings, saveSettings, updateSetting, isLoaded };
}
