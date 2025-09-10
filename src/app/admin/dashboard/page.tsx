export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Welcome to the Admin Dashboard</h2>
      <p className="text-gray-600">
        Use the menu on the left (or the top menu on mobile) to navigate through different sections of your dashboard.
      </p>

      {/* Example stats grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-700">Users</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">1,245</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-700">Projects</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">312</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">$45,210</p>
        </div>
      </div>
    </div>
  );
}
