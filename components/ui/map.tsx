"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { renderToString } from "react-dom/server";
import { MapPinIcon } from "@phosphor-icons/react";

export default function Map() {
    const position: [number, number] = [25.58, 85.09];

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
        <div className="bg-gray-50 pb-8">
            <MapContainer
                center={position}
                zoom={13}
                className="h-[400px] w-full rounded-lg"
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={customIcon}>
                    <Popup>
                        <div className="text-center">
                            <strong>Alinagar, Patna</strong>
                            <br />
                            Bihar, India
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
