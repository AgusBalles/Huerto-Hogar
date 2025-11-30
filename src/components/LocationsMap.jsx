import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { locations } from '../data/locations';

// Fix leaflet default icon paths for Vite bundling
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

export default function LocationsMap({ center = [-33.5, -71.5], zoom = 5 }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // initialize map
    mapRef.current = L.map(containerRef.current, {
      center,
      zoom,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapRef.current);

    // Add markers
    locations.forEach(loc => {
      const marker = L.marker([loc.lat, loc.lng]).addTo(mapRef.current);
      marker.bindPopup(`<strong>${loc.name}</strong><div class="small text-muted">${loc.description}</div>`);
    });

    // Fit bounds to markers if available
    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations.map(l => [l.lat, l.lng]));
      mapRef.current.fitBounds(bounds.pad(0.4));
    }

    return () => {
      // Clean up map instance on unmount
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, zoom]);

  return (
    <div style={{ width: '100%', height: '420px', borderRadius: '8px', overflow: 'hidden' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
