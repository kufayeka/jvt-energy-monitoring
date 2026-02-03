import { useState, useEffect } from "react";

export interface Settings {
  tariff1PerKwh: number;
  tariff1StartTime: string;
  tariff1EndTime: string;
  tariff2PerKwh: number;
  powerFactor: number;
}

const DEFAULT_SETTINGS: Settings = {
  tariff1PerKwh: 0,
  tariff1StartTime: "00:00",
  tariff1EndTime: "00:00",
  tariff2PerKwh: 0,
  powerFactor: 0,
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
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings),
      });
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
