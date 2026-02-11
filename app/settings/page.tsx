"use client";

import { useState } from "react";
import { TextField } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useSettings, type Settings as SettingsModel } from "../hooks/useSettings";


function SettingsForm({
  settings,
  onSave,
}: {
  settings: SettingsModel;
  onSave: (next: SettingsModel) => void;
}) {
  const [formData, setFormData] = useState<SettingsModel>(() => settings);
  const [saved, setSaved] = useState(false);

  const handleChange = <K extends keyof SettingsModel>(
    field: K,
    value: SettingsModel[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    onSave(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-lg border-2 border-blue-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Power Meter Setting</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className=" mb-4 bg-white p-4 rounded border-2 border-dashed border-blue-200">
          <div className="my-3">Multi Tariff 1 (WBP)</div>
          <TextField
            label="Tariff per kWh"
            type="number"
            fullWidth
            inputProps={{ step: "1" }}
            value={formData.tariff1PerKwh}
            onChange={(e) =>
              handleChange("tariff1PerKwh", parseFloat(e.target.value) || 0)
            }
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Tariff per kWh"
          />
          <div className="grid grid-cols-2 gap-4 my-6">
            <TextField
              label="Start Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.tariff1StartTime}
              onChange={(e) => handleChange("tariff1StartTime", e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
              placeholder="Start Time"
            />
            <TextField
              label="End Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.tariff1EndTime}
              onChange={(e) => handleChange("tariff1EndTime", e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
              placeholder="End Time"
            />
          </div>
        </div>

        <div className=" mb-4 bg-white p-4 rounded border-2 border-dashed border-blue-200">
          <div className="my-3">Multi Tariff 2 (LWBP)</div>
          <TextField
            label="Tariff per kWh"
            type="number"
            fullWidth
            inputProps={{ step: "1" }}
            value={formData.tariff2PerKwh}
            onChange={(e) =>
              handleChange("tariff2PerKwh", parseFloat(e.target.value) || 0)
            }
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Tariff per kWh"
          />
        </div>

        <div className=" mb-4 bg-white p-4 rounded border-2 border-dashed border-blue-200">
          <div className="my-3">Power Factor</div>
          <TextField
            label="Power Factor"
            type="number"
            fullWidth
            inputProps={{ step: "0.001" }}
            value={formData.powerFactor}
            onChange={(e) => handleChange("powerFactor", parseFloat(e.target.value) || 0)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Power Factor"
          />
        </div>

        <div className=" mb-4 bg-white p-4 rounded border-2 border-dashed border-blue-200">
          <div className="my-3">Chiller 1 Running Hours Limit</div>
          <TextField
            label="Running Hours Limit (hours)"
            type="number"
            fullWidth
            inputProps={{ step: "1" }}
            value={formData.chiller1RunningHoursLimit}
            onChange={(e) => handleChange("chiller1RunningHoursLimit", parseFloat(e.target.value) || 0)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Running Hours Limit (hours)"
          />
        </div>

        <div className=" mb-4 bg-white p-4 rounded border-2 border-dashed border-blue-200">
          <div className="my-3">Chiller 2 Running Hours Limit</div>
          <TextField
            label="Running Hours Limit (hours)"
            type="number"
            fullWidth
            inputProps={{ step: "1" }}
            value={formData.chiller2RunningHoursLimit}
            onChange={(e) => handleChange("chiller2RunningHoursLimit", parseFloat(e.target.value) || 0)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Running Hours Limit (hours)"
          />
        </div>

        <div className=" mb-4 bg-white p-4 rounded border-2 border-dashed border-blue-200">
          <div className="my-3">Chiller 3 Running Hours Limit</div>
          <TextField
            label="Running Hours Limit (hours)"
            type="number"
            fullWidth
            inputProps={{ step: "1" }}
            value={formData.chiller3RunningHoursLimit}
            onChange={(e) => handleChange("chiller3RunningHoursLimit", parseFloat(e.target.value) || 0)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Running Hours Limit (hours)"
          />
        </div>

      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className=" mb-4 bg-white p-4 rounded border-2 border-dashed border-blue-200">
          <div className="my-3">Inlet Pump 1 Running Hours Limit</div>
          <TextField
            label="Running Hours Limit (hours)"
            type="number"
            fullWidth
            inputProps={{ step: "1" }}
            value={formData.inletPump1RunningHoursLimit}
            onChange={(e) => handleChange("inletPump1RunningHoursLimit", parseFloat(e.target.value) || 0)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Running Hours Limit (hours)"
          />
        </div>

        <div className=" mb-4 bg-white p-4 rounded border-2 border-dashed border-blue-200">
          <div className="my-3">Inlet Pump 2 Running Hours Limit</div>
          <TextField
            label="Running Hours Limit (hours)"
            type="number"
            fullWidth
            inputProps={{ step: "1" }}
            value={formData.inletPump2RunningHoursLimit}
            onChange={(e) => handleChange("inletPump2RunningHoursLimit", parseFloat(e.target.value) || 0)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Running Hours Limit (hours)"
          />
        </div>

        <div className=" mb-4 bg-white p-4 rounded border-2 border-dashed border-blue-200">
          <div className="my-3">Outlet Pump 1 Running Hours Limit</div>
          <TextField
            label="Running Hours Limit (hours)"
            type="number"
            fullWidth
            inputProps={{ step: "1" }}
            value={formData.outletPump1RunningHoursLimit}
            onChange={(e) => handleChange("outletPump1RunningHoursLimit", parseFloat(e.target.value) || 0)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Running Hours Limit (hours)"
          />
        </div>

        <div className=" mb-4 bg-white p-4 rounded border-2 border-dashed border-blue-200">
          <div className="my-3">Outlet Pump 2 Running Hours Limit</div>
          <TextField
            label="Running Hours Limit (hours)"
            type="number"
            fullWidth
            inputProps={{ step: "1" }}
            value={formData.outletPump2RunningHoursLimit}
            onChange={(e) => handleChange("outletPump2RunningHoursLimit", parseFloat(e.target.value) || 0)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Running Hours Limit (hours)"
          />
        </div>

      </div>

      <div className="mt-4">
        <div className="flex items-center gap-3 justify-end w-full">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Save Settings
          </button>
          {saved && (
            <p className="text-green-600 text-sm font-semibold">✓ Saved!</p>
          )}
        </div>
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
        <SettingsForm key={JSON.stringify(settings)} settings={settings} onSave={saveSettings} />
      </main>
    </>
  );
}