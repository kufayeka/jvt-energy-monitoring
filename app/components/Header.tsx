"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function formatDateTime(d: Date) {
  const weekday = d.toLocaleDateString(undefined, { weekday: "long" });
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());
  return `${weekday}, ${day}/${month}/${year} – ${hours}:${minutes}:${seconds}`;
}

export default function Header() {
  const [nowText, setNowText] = useState("");

  useEffect(() => {
    const update = () => setNowText(formatDateTime(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header id="header" className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 h-20 flex items-center justify-between px-6 z-50">
      <div className="flex flex-col py-6">
        <Image src="/tracnergy_logo.png" alt="DBC Logo" width={200} height={200} />
        <h4 className="text-sm text-gray-600">
          by Javindotech
        </h4>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">{nowText}</span>
        {/* <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">DATA LOGGER : RUNNING</span>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">PM READER : RUNNING</span> */}
      </div>
    </header>
  );
}