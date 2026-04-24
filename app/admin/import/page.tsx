"use client";

import { useRef, useState, useEffect } from "react";
import Papa from "papaparse";

type ImportMode = "append" | "upsert";

type ImportError = {
  formatName?: string;
  message: string;
};

type ImportResponse = {
  inserted: number;
  updated: number;
  failed: number;
  errors: ImportError[];
};

export default function ImportPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("No file selected");
  const [result, setResult] = useState<ImportResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState<ImportMode>("append");
  const [replaceAll, setReplaceAll] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const [history, setHistory] = useState<any[]>([]);

  // Admin password (no frontend validation)
  const [adminPassword, setAdminPassword] = useState("");

  /* =============================
     Fetch Import History
  ============================= */

  const fetchHistory = async () => {
    const res = await fetch("/api/admin/import/history", {
      headers: {
        "x-admin-secret": adminPassword,
      },
    });

    if (!res.ok) return;

    const data = await res.json();
    setHistory(data || []);
  };

  useEffect(() => {
    if (adminPassword) {
      fetchHistory();
    }
  }, [adminPassword]);

  /* =============================
     Reset
  ============================= */

  const resetState = () => {
    setFile(null);
    setProgress(0);
    setResult(null);
    setLoading(false);
    setStatus("No file selected");
    setConfirmText("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* =============================
     Handle Import
  ============================= */

  const handleImport = async () => {
    if (!file) return;

    if (!adminPassword) {
      alert("Admin password required");
      return;
    }

    if (replaceAll && confirmText !== "DELETE ALL SIGNALS") {
      alert("Confirmation text mismatch");
      return;
    }

    setLoading(true);
    setResult(null);
    setProgress(10);
    setStatus("Parsing file...");

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const allRows = results.data as any[];

          if (!allRows.length) {
            throw new Error("CSV is empty");
          }

          setProgress(25);

          // 🔥 Replace All
          if (replaceAll) {
            setStatus("Deleting existing signals...");
            setProgress(35);

            const replaceRes = await fetch(
              "/api/admin/signals/replace-all",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-admin-secret": adminPassword,
                },
                body: JSON.stringify({ confirmText }),
              }
            );

            if (!replaceRes.ok) {
              throw new Error("Failed to replace signals");
            }
          }

          setStatus("Uploading data...");
          setProgress(40);

          const chunkSize = 500;

          let aggregatedResult: ImportResponse = {
            inserted: 0,
            updated: 0,
            failed: 0,
            errors: [],
          };

          for (let i = 0; i < allRows.length; i += chunkSize) {
            const chunk = allRows.slice(i, i + chunkSize);

            const response = await fetch("/api/admin/import", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-admin-secret": adminPassword,
              },
              body: JSON.stringify({
                mode,
                rows: chunk,
                fileName: file.name,
              }),
            });

            if (!response.ok) {
              throw new Error("Import chunk failed");
            }

            const data: ImportResponse = await response.json();

            aggregatedResult.inserted += data.inserted || 0;
            aggregatedResult.updated += data.updated || 0;
            aggregatedResult.failed += data.failed || 0;

            if (Array.isArray(data.errors)) {
              aggregatedResult.errors.push(...data.errors);
            }

            const percent =
              40 + Math.round(((i + chunk.length) / allRows.length) * 60);

            setProgress(Math.min(percent, 100));
          }

          setResult(aggregatedResult);
          setStatus("Import completed successfully");
          setProgress(100);

          await fetchHistory();
        } catch (err: any) {
          setStatus("Import failed");
          setResult({
            inserted: 0,
            updated: 0,
            failed: 0,
            errors: [{ message: err.message || "Unknown error" }],
          });
        }

        setLoading(false);
      },
    });
  };

  /* =============================
     UI
  ============================= */

  return (
    <div className="min-h-screen flex justify-center">
      {/* 🔄 LOADING OVERLAY */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
            <div className="text-sm text-gray-700">{status}</div>
            <div className="w-48 bg-gray-200 h-2 rounded">
              <div
                className="bg-black h-2 rounded transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-6xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center border-b py-8">
          Signal Import Workflow
        </h1>

        {/* Admin Password */}
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>

        <div className="bg-white border rounded-2xl p-8 space-y-6">
          {/* File Upload */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed rounded-xl p-6 cursor-pointer"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              hidden
              onChange={(e) =>
                setFile(e.target.files?.[0] || null)
              }
            />
            {file ? file.name : "Click to choose CSV file"}
          </div>

          {/* Mode */}
          <div className="space-y-3">
            <label className="font-medium text-sm">Import Mode</label>

            <div className="flex gap-6 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={mode === "append"}
                  onChange={() => setMode("append")}
                />
                Append (Insert Only)
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={mode === "upsert"}
                  onChange={() => setMode("upsert")}
                />
                Upsert (Update if Exists)
              </label>
            </div>
          </div>

          {/* Replace All */}
          <div className="space-y-3 border-t pt-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={replaceAll}
                onChange={(e) =>
                  setReplaceAll(e.target.checked)
                }
              />
              Replace all existing signals before import
            </label>

            {replaceAll && (
              <input
                type="text"
                placeholder="Type DELETE ALL SIGNALS"
                value={confirmText}
                onChange={(e) =>
                  setConfirmText(e.target.value)
                }
                className="border rounded-lg px-3 py-2 w-full"
              />
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleImport}
              disabled={!file || loading}
              className="px-6 py-2 bg-black text-white rounded-lg disabled:opacity-40"
            >
              Start Import
            </button>

            <button
              onClick={resetState}
              disabled={loading}
              className="px-6 py-2 border rounded-lg"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Result Summary */}
        {result && (
          <>
            <div className="bg-gray-50 p-4 rounded-xl border text-sm space-y-2">
              <p>Inserted: {result.inserted}</p>
              <p>Updated: {result.updated}</p>
              <p>Failed: {result.failed}</p>
            </div>

            {/* ✅ ERROR CARD RESTORED */}
            {result.errors?.length > 0 && (
              <div className="mt-4 bg-red-50 border border-red-200 p-4 rounded-xl text-sm">
                <p className="font-semibold mb-2">Errors:</p>
                <ul className="space-y-1 max-h-60 overflow-auto">
                  {result.errors.map((err, index) => (
                    <li key={index}>
                      {err.formatName || "Unknown"} – {err.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {/* Import History */}
        <div className="bg-white border rounded-2xl p-6">
          <h2 className="font-semibold mb-4">Import History</h2>

          {history.length === 0 && (
            <p className="text-sm text-gray-500">
              No imports yet.
            </p>
          )}

          {history.map((item) => (
            <div
              key={item.id}
              className="text-sm border-b py-2 flex justify-between"
            >
              <span>{item.fileName}</span>
              <span>
                {new Date(item.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}