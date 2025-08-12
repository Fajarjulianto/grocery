"use client";
import React, { JSX } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

// Components
import DraggableMarker from "./DragableMarker";
import LocationButton from "./CurrentLocation";

export default function LeafletMap(): JSX.Element {
  const center = { lat: -5.4400196, lng: 105.2622609 };

  return (
    <div className="w-full h-full">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker />
        <LocationButton />
      </MapContainer>
    </div>
  );
}
