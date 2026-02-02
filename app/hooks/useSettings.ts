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

const STORAGE_KEY = "powerMeterSettings";

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          console.log("Loaded settings from localStorage:", parsed);
          setSettings(parsed);
        } catch (error) {
          console.error("Failed to parse settings:", error);
          setSettings(DEFAULT_SETTINGS);
        }
      } else {
        console.log("No saved settings found, using defaults");
        setSettings(DEFAULT_SETTINGS);
      }
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  const saveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      console.log("Settings saved to localStorage:", newSettings);
    }
  };

  // Update single field
  const updateSetting = (key: keyof Settings, value: any) => {
    const updated = { ...settings, [key]: value };
    saveSettings(updated);
  };

  return { settings, saveSettings, updateSetting, isLoaded };
}
