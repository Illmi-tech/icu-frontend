import type { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "This site can’t be reached",
  robots: { index: false, follow: false },
};

/** Fallback only — middleware serves the primary unreachable HTML when mode is on. */
export default async function MaintenancePage() {
  const headerList = await headers();
  const host = headerList.get("host") || "this site";

  return (
    <div className="min-h-screen bg-white text-[#333] px-5 pt-[72px] pb-10 font-[Segoe_UI,Tahoma,sans-serif] text-[75%]">
      <div className="max-w-[600px] mx-auto">
        <div
          className="w-[72px] h-[72px] mb-5 rounded-full bg-[#e8eaed] relative"
          aria-hidden
        >
          <span className="absolute inset-[18px] border-4 border-[#9aa0a6] rounded-full box-border" />
          <span className="absolute left-1/2 top-[22px] -ml-0.5 w-1 h-[18px] bg-[#9aa0a6] rounded-sm" />
        </div>
        <h1 className="text-[1.6em] font-normal m-0 mb-4 leading-tight text-[#333]">
          This site can’t be reached
        </h1>
        <p className="m-0 text-[#666] leading-relaxed">
          <strong className="font-medium">{host}</strong>
          ’s DNS address could not be found. Diagnosing the problem.
        </p>
        <ul className="mt-[18px] p-0 list-none text-[#666] leading-relaxed space-y-1.5">
          <li className="pl-[1.1em] relative before:content-['•'] before:absolute before:left-0">
            Checking the connection
          </li>
          <li className="pl-[1.1em] relative before:content-['•'] before:absolute before:left-0">
            Checking the proxy and the firewall
          </li>
          <li className="pl-[1.1em] relative before:content-['•'] before:absolute before:left-0">
            Running Windows Network Diagnostics
          </li>
        </ul>
        <p className="mt-5 text-[#666]">DNS_PROBE_FINISHED_NXDOMAIN</p>
        <a
          href="."
          className="inline-block mt-7 bg-[#1a73e8] hover:bg-[#1765cc] text-white text-[13px] font-medium rounded px-4 py-2 no-underline"
        >
          Reload
        </a>
      </div>
    </div>
  );
}
