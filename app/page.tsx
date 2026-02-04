"use client"

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CompanyInfoCard from "./components/CompanyInfoCard";
import EnergyConsumptionCard from "./components/EnergyConsumptionCard";
import EnergyBillCard from "./components/EnergyBillCard";
import ShiftConsumptionCard from "./components/ShiftConsumptionCard";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Header />
      <Sidebar />
      <main id="main-content" className="ml-52 mt-16 p-6">
        <section id="top-section" className="grid grid-cols-[30%_70%] mb-6 gap-1">
          <CompanyInfoCard />
          <EnergyBillCard />
        </section>
        <section id="bottom-section" className="grid grid-cols-[70%_30%] gap-1">
          <EnergyConsumptionCard />
          <ShiftConsumptionCard />
        </section>
      </main>
    </div>
  );
}
