"use client";

import { useState } from "react";
import type { Signal } from "@/app/types/signal.types";
import AdminControlPanel from "./AdminControlPanel";
import AdminSignalsTable from "./AdminSignalsTable";

export default function AdminClient({ signals }: { signals: Signal[] }) {
  const [rows, setRows] = useState<Signal[]>(signals);

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  return (
    <div className="space-y-8 max-w-6xl mx-auto">

      <AdminControlPanel
        rows={rows}
        setRows={setRows} // ✅ REAL STATE
        isAuthorized={isAuthorized}
        setIsAuthorized={setIsAuthorized}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        adminPassword={adminPassword}
        setAdminPassword={setAdminPassword}
      />

      <AdminSignalsTable
        rows={rows}
        setRows={setRows} 
        isAuthorized={isAuthorized}
        setShowPassword={setShowPassword}
        adminPassword={adminPassword}
      />

    </div>
  );
}