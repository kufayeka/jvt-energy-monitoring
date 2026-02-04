"use client";

import { useState } from "react";
import { buildExcelUrlFromEmbed } from "../config/links";

type ExportExcelButtonProps = {
  embedUrl: string;
  label: string;
  filePrefix?: string;
  className?: string;
};

export default function ExportExcelButton({
  embedUrl,
  label,
  filePrefix,
  className,
}: ExportExcelButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    if (!embedUrl || isLoading) return;
    setIsLoading(true);

    try {
      const excelUrl = buildExcelUrlFromEmbed(embedUrl);
      const response = await fetch(excelUrl);

      if (!response.ok) {
        throw new Error(`Export failed (${response.status})`);
      }

      const blob = await response.blob();
      const fileDate = new Date().toISOString().slice(0, 10);
      const prefix = filePrefix ?? label.toLowerCase().replace(/\s+/g, "-");
      const fileName = `${prefix}-${fileDate}.xlsx`;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={!embedUrl || isLoading}
      className={
        className ??
        "bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition disabled:opacity-60"
      }
    >
      {isLoading ? "Exporting..." : label}
    </button>
  );
}
