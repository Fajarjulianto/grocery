// components/DraggableMarker.tsx
"use client";
import React from "react";
import { Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet";
import L from "leaflet";

import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

// context
import { useMapContext } from "@/app/context/mapContext";

const customIcon = new L.Icon({
  iconUrl: markerIconUrl.src,
  shadowUrl: markerShadowUrl.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function DraggableMarker() {
  const map = useMap();

  // context
  const { position, updatePosition, resultPosition, updateResultPosition } =
    useMapContext();

  // const [position, setPosition] = React.useState<Center>(defaultCenter);
  const markerRef = React.useRef<L.Marker>(null);

  React.useEffect(() => {
    function updateMapView() {
      const latitude = resultPosition.lat as number;
      const longtitude = resultPosition.lng as number;
      updatePosition({
        lat: latitude,
        lng: longtitude,
      });

      if (resultPosition.lat !== null || resultPosition.lng !== null) {
        map.setView([latitude, longtitude], 15);
      }
    }

    updateMapView();
  }, [resultPosition]);

  const eventHandlers = React.useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          updatePosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  return (
    <Marker
      icon={customIcon}
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    ></Marker>
  );
}
