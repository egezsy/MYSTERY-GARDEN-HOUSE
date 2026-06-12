"use client";

import dynamic from "next/dynamic";

/**
 * react-leaflet touches `window` on import, so the actual map is loaded
 * dynamically with SSR disabled to avoid hydration / "blue screen" errors.
 */
const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-stone" />,
});

export function LocationMap({
  lat = 35.12575,
  lng = 33.94025,
  zoom = 17,
  label = "Mystery Garden House",
  className = "h-96 w-full",
}: {
  lat?: number;
  lng?: number;
  zoom?: number;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`relative isolate ${className}`}>
      <LeafletMap lat={lat} lng={lng} zoom={zoom} label={label} />
    </div>
  );
}
