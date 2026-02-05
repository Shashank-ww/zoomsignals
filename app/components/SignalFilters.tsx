type Filters = {
  status: string;
  vehicleType: string;
  velocity: string;
};

export default function SignalFilters({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
}) {
  return (
    <div className="space-y-4 text-sm">
      <div>
        <b>Status</b>
        <select
          className="w-full border mt-1 p-1"
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        >
          <option value="">All</option>
          <option value="EARLY">Early</option>
          <option value="PEAKING">Peaking</option>
          <option value="SATURATED">Saturated</option>
        </select>
      </div>

      <div>
        <b>Segment</b>
        <select
          className="w-full border mt-1 p-1"
          onChange={(e) =>
            setFilters({ ...filters, vehicleType: e.target.value })
          }
        >
          <option value="">All</option>
          <option value="SUV">SUV</option>
          <option value="EV">EV</option>
        </select>
      </div>

      <div>
        <b>Velocity</b>
        <select
          className="w-full border mt-1 p-1"
          onChange={(e) =>
            setFilters({ ...filters, velocity: e.target.value })
          }
        >
          <option value="">All</option>
          <option value="Accelerating">Accelerating</option>
          <option value="Stable">Stable</option>
          <option value="Emerging">Emerging</option>
        </select>
      </div>
    </div>
  );
}
