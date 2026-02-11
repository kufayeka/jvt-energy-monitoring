"use client";

import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useSettings, type Settings as SettingsModel } from "../hooks/useSettings";

function SettingsForm({
  settings,
  onSave,
}: {
  settings: SettingsModel;
  onSave: (next: SettingsModel) => Promise<void> | void;
}) {
  const [formData, setFormData] = useState<SettingsModel>(settings);

  // Sync form ketika settings berubah (tanpa remount component)
  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleChange = <K extends keyof SettingsModel>(
    field: K,
    value: SettingsModel[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await onSave(formData);
      alert("Settings berhasil disimpan!");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan settings!");
    }
  };

  return (
    <div className="bg-white rounded-lg border-2 border-blue-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Power Meter Setting
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Multi Tariff 1 */}
        <div className="bg-white p-4 rounded border-2 border-dashed border-blue-200">
          <div className="my-3">Multi Tariff 1 (WBP)</div>
          <TextField
            label="Tariff per kWh"
            type="number"
            fullWidth
            value={formData.tariff1PerKwh}
            onChange={(e) =>
              handleChange("tariff1PerKwh", parseFloat(e.target.value) || 0)
            }
          />

          <div className="grid grid-cols-2 gap-4 my-6">
            <TextField
              label="Start Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.tariff1StartTime}
              onChange={(e) =>
                handleChange("tariff1StartTime", e.target.value)
              }
            />
            <TextField
              label="End Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.tariff1EndTime}
              onChange={(e) =>
                handleChange("tariff1EndTime", e.target.value)
              }
            />
          </div>
        </div>

        {/* Multi Tariff 2 */}
        <div className="bg-white p-4 rounded border-2 border-dashed border-blue-200">
          <div className="my-3">Multi Tariff 2 (LWBP)</div>
          <TextField
            label="Tariff per kWh"
            type="number"
            fullWidth
            value={formData.tariff2PerKwh}
            onChange={(e) =>
              handleChange("tariff2PerKwh", parseFloat(e.target.value) || 0)
            }
          />
        </div>

        {/* Power Factor */}
        <div className="bg-white p-4 rounded border-2 border-dashed border-blue-200">
          <div className="my-3">Power Factor</div>
          <TextField
            label="Power Factor"
            type="number"
            fullWidth
            value={formData.powerFactor}
            onChange={(e) =>
              handleChange("powerFactor", parseFloat(e.target.value) || 0)
            }
          />
        </div>

        {/* Chiller 1 */}
        <div className="bg-white p-4 rounded border-2 border-dashed border-blue-200">
          <div className="my-3">Chiller 1 Running Hours Limit</div>
          <TextField
            label="Running Hours Limit (hours)"
            type="number"
            fullWidth
            value={formData.chiller1RunningHoursLimit}
            onChange={(e) =>
              handleChange(
                "chiller1RunningHoursLimit",
                parseFloat(e.target.value) || 0
              )
            }
          />
        </div>

        {/* Chiller 2 */}
        <div className="bg-white p-4 rounded border-2 border-dashed border-blue-200">
          <div className="my-3">Chiller 2 Running Hours Limit</div>
          <TextField
            label="Running Hours Limit (hours)"
            type="number"
            fullWidth
            value={formData.chiller2RunningHoursLimit}
            onChange={(e) =>
              handleChange(
                "chiller2RunningHoursLimit",
                parseFloat(e.target.value) || 0
              )
            }
          />
        </div>

        {/* Chiller 3 */}
        <div className="bg-white p-4 rounded border-2 border-dashed border-blue-200">
          <div className="my-3">Chiller 3 Running Hours Limit</div>
          <TextField
            label="Running Hours Limit (hours)"
            type="number"
            fullWidth
            value={formData.chiller3RunningHoursLimit}
            onChange={(e) =>
              handleChange(
                "chiller3RunningHoursLimit",
                parseFloat(e.target.value) || 0
              )
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* Inlet Pump 1 */}
        <div className="bg-white p-4 rounded border-2 border-dashed border-blue-200">
          <div className="my-3">Inlet Pump 1 Running Hours Limit</div>
          <TextField
            label="Running Hours Limit (hours)"
            type="number"
            fullWidth
            value={formData.inletPump1RunningHoursLimit}
            onChange={(e) =>
              handleChange(
                "inletPump1RunningHoursLimit",
                parseFloat(e.target.value) || 0
              )
            }
          />
        </div>

        {/* Inlet Pump 2 */}
        <div className="bg-white p-4 rounded border-2 border-dashed border-blue-200">
          <div className="my-3">Inlet Pump 2 Running Hours Limit</div>
          <TextField
            label="Running Hours Limit (hours)"
            type="number"
            fullWidth
            value={formData.inletPump2RunningHoursLimit}
            onChange={(e) =>
              handleChange(
                "inletPump2RunningHoursLimit",
                parseFloat(e.target.value) || 0
              )
            }
          />
        </div>

        {/* Outlet Pump 1 */}
        <div className="bg-white p-4 rounded border-2 border-dashed border-blue-200">
          <div className="my-3">Outlet Pump 1 Running Hours Limit</div>
          <TextField
            label="Running Hours Limit (hours)"
            type="number"
            fullWidth
            value={formData.outletPump1RunningHoursLimit}
            onChange={(e) =>
              handleChange(
                "outletPump1RunningHoursLimit",
                parseFloat(e.target.value) || 0
              )
            }
          />
        </div>

        {/* Outlet Pump 2 */}
        <div className="bg-white p-4 rounded border-2 border-dashed border-blue-200">
          <div className="my-3">Outlet Pump 2 Running Hours Limit</div>
          <TextField
            label="Running Hours Limit (hours)"
            type="number"
            fullWidth
            value={formData.outletPump2RunningHoursLimit}
            onChange={(e) =>
              handleChange(
                "outletPump2RunningHoursLimit",
                parseFloat(e.target.value) || 0
              )
            }
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default function Settings() {
  const { settings, saveSettings, isLoaded } = useSettings();

  if (!isLoaded) return null;

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main-content" className="ml-52 mt-16 p-6">
        <SettingsForm
          settings={settings}
          onSave={saveSettings}
        />
      </main>
    </>
  );
}
