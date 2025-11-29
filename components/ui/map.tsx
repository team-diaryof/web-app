// components/ui/map.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { renderToString } from "react-dom/server";
import { MapPinIcon } from "@phosphor-icons/react";

interface LocationMapProps {
  position: [number, number];
  title?: string;
  description?: string;
  zoom?: number;
}

export default function LocationMap({
  position,
  title = "Location",
  description = "",
  zoom = 13
}: LocationMapProps) {

  const iconMarkup = renderToString(
    <MapPinIcon size={32} weight="fill" />
  );

  const customIcon = L.divIcon({
    html: iconMarkup,
    className: "custom-marker-icon",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });

  return (
    <div className="pb-8">
      <MapContainer
        center={position}
        zoom={zoom}
        className="h-[400px] z-0 w-full rounded-lg"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position} icon={customIcon}>
          <Popup>
            <div className="text-center">
              <strong>{title}</strong>
              <br />
              {description}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
