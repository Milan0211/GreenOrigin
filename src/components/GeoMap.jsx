import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const GeoMap = ({ events = [], className = "" }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || events.length === 0) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5); // Center on India
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Create custom icons for different roles
    const createCustomIcon = (role, color) => {
      return L.divIcon({
        className: "custom-div-icon",
        html: `
          <div style="
            background-color: ${color};
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: white;
            font-weight: bold;
          ">
            ${getRoleInitial(role)}
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
    };

    const getRoleInitial = (role) => {
      switch (role.toLowerCase()) {
        case "farmer":
          return "F";
        case "processor":
          return "P";
        case "lab":
          return "L";
        case "distributor":
          return "D";
        default:
          return "?";
      }
    };

    const getRoleColor = (role) => {
      switch (role.toLowerCase()) {
        case "farmer":
          return "#10b981"; // emerald-500
        case "processor":
          return "#3b82f6"; // blue-500
        case "lab":
          return "#8b5cf6"; // purple-500
        case "distributor":
          return "#f59e0b"; // amber-500
        default:
          return "#6b7280"; // gray-500
      }
    };

    // Add markers for each event
    const markers = [];
    events.forEach((event) => {
      if (event.lat && event.lng) {
        const marker = L.marker([event.lat, event.lng], {
          icon: createCustomIcon(event.role, getRoleColor(event.role)),
        }).addTo(map);

        // Add popup with event details
        const popupContent = `
          <div class="p-2">
            <div class="font-semibold text-sm mb-1">${event.role}</div>
            <div class="text-xs text-gray-600 mb-1">${event.locationName}</div>
            <div class="text-xs text-gray-500">${new Date(
              event.date
            ).toLocaleDateString()}</div>
            ${
              event.description
                ? `<div class="text-xs text-gray-700 mt-1">${event.description}</div>`
                : ""
            }
          </div>
        `;
        marker.bindPopup(popupContent);
        markers.push(marker);
      }
    });

    // Fit map to show all markers
    if (markers.length > 0) {
      const group = new L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.1));
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [events]);

  if (!events || events.length === 0) {
    return (
      <div
        className={`bg-earth-100 rounded-lg flex items-center justify-center h-64 ${className}`}
      >
        <div className="text-center">
          <MapPin className="h-8 w-8 text-earth-400 mx-auto mb-2" />
          <p className="text-earth-600">No location data available</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg overflow-hidden border border-earth-200 ${className}`}
    >
      <div ref={mapRef} className="w-full h-64" />
    </div>
  );
};

export default GeoMap;
