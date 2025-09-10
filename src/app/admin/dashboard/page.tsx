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
          <h3 className="text-lg font-bold text-gray-700">Vision</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">To secure the right to education and a life free from violence for less privileged children in Nigeria.</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-lg font-bold text-gray-700">Mission</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">To explore innovative solutions that will transform communities through improved equity and excellence.</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-lg font-bold text-gray-700">Values</h3>
          <ul className="mt-2 text-3xl font-semibold text-gray-900 list-disc pl-5 text-left space-y-1">
            <li>Integrity</li>
            <li>Inclusion</li>
            <li>Impact</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
