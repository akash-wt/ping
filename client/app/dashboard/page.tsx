"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/header";
import AvgResponseTime from "@/components/stats/average";
import UptimeChart from "@/components/charts/uptimeChart";
import ResponseTimeChart from "@/components/charts/responseTimeChats";
import ServiceUp from "@/components/stats/serviceUp";
import ServiceDown from "@/components/stats/serviceDown";
import Warning from "@/components/stats/warning";
import MoniterStats from "@/components/moniterStats";

export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token") || sessionStorage.getItem("token")
        : null;

    if (!token) {
      console.log("No token found - would redirect to login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <Header></Header>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ServiceUp upCount={5}></ServiceUp>
          <ServiceDown downCount={4}></ServiceDown>
          <Warning warningCount={2}></Warning>
          <AvgResponseTime avgResponseTime={234}></AvgResponseTime>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ResponseTimeChart></ResponseTimeChart>
          <UptimeChart></UptimeChart>
        </div>

        {/* Monitor List */}
        <MoniterStats></MoniterStats>
      </div>
    </div>
  );
}
