import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  districtHQs,
  tamilNaduBoundary,
  districtBoundaries,
  blackSpotVillages,
  pewBoundaryZones,
  checkpostLocations,
  pewUnitLocations,
  policeStations,
} from "@/data/gisData";
import { X } from "lucide-react";

type LayerKey =
  | "districtBoundary"
  | "policeStationBoundary"
  | "policeStationPoints"
  | "blackSpotVillages"
  | "pewBoundary"
  | "checkPost"
  | "office"
  | "tnMapImage";

type BaseMap = "osm" | "carto" | "satellite" | "hybrid" | "terrain" | "traffic";

const baseMaps: Record<
  BaseMap,
  { url: string; attribution: string; label: string }
> = {
  osm: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "©OpenStreetMap contributors",
    label: "OSM Standard",
  },
  carto: {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: "©OpenStreetMap ©CARTO",
    label: "Carto Light",
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "©Esri",
    label: "Satellite",
  },
  hybrid: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "©Esri",
    label: "Hybrid",
  },
  terrain: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: "©OpenTopoMap",
    label: "Terrain",
  },
  traffic: {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution: "©CARTO",
    label: "Traffic",
  },
};

export function GISPage() {
  const mapRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const layerGroupsRef = useRef<Record<string, any>>({});
  const [showExternal, setShowExternal] = useState(false);
  const [activeBaseMap, setActiveBaseMap] = useState<BaseMap>("osm");
  const [layers, setLayers] = useState<Record<LayerKey, boolean>>({
    policeStationBoundary: true,
    policeStationPoints: true,
    blackSpotVillages: true,
    pewBoundary: true,
    checkPost: true,
    office: true,
    tnMapImage: true,
    districtBoundary: true,
  });

  const toggleLayer = (key: LayerKey) =>
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));

  // ── Initialize map ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [11.0, 78.5],
        zoom: 7,
        zoomControl: true,
      });

      const tile = L.tileLayer(baseMaps.osm.url, {
        attribution: baseMaps.osm.attribution,
        maxZoom: 19,
      }).addTo(map);
      tileLayerRef.current = tile;

      // ── 1. State boundary (Police Station Boundary) ──────────────────────
      const boundaryGroup = L.layerGroup();
      L.polygon(tamilNaduBoundary, {
        color: "#2563eb",
        weight: 2.5,
        fillColor: "#2563eb",
        fillOpacity: 0.04,
        dashArray: "",
      }).addTo(boundaryGroup);
      boundaryGroup.addTo(map);
      layerGroupsRef.current.policeStationBoundary = boundaryGroup;

      // ── 2. District Boundaries ────────────────────────────────────────────
      const districtGroup = L.layerGroup();
      districtBoundaries.forEach((d) => {
        L.polygon(d.boundary, {
          color: "#7c3aed",
          weight: 1.2,
          fillColor: "#7c3aed",
          fillOpacity: 0.04,
          dashArray: "4 3",
        })
          .bindTooltip(`<b>${d.name} District</b>`, {
            className: "leaflet-tooltip-dark",
            sticky: true,
          })
          .addTo(districtGroup);
      });
      districtGroup.addTo(map);
      layerGroupsRef.current.districtBoundary = districtGroup;

      // ── 3. Police Stations (policeStationPoints layer) ────────────────────
      const hqGroup = L.layerGroup();
      // District HQs (commissionerate in gray, district in red)
      districtHQs.forEach((hq) => {
        const color = hq.type === "commissionerate" ? "#6b7280" : "#dc2626";
        const radius = hq.type === "commissionerate" ? 8 : 6;
        L.circleMarker([hq.lat, hq.lng], {
          radius,
          fillColor: color,
          color: "#1f2937",
          weight: 1.5,
          fillOpacity: 0.85,
        })
          .bindTooltip(
            `<b>${hq.name}</b><br/>${hq.type === "commissionerate" ? "Commissionerate HQ" : "District HQ"}`,
            { className: "leaflet-tooltip-dark" },
          )
          .addTo(hqGroup);
      });
      // Individual police stations (dark navy squares)
      policeStations.forEach((ps) => {
        L.marker([ps.lat, ps.lng], {
          icon: L.divIcon({
            className: "",
            html: `<div style="background:#1e3a5f;border:1.5px solid #60a5fa;width:9px;height:9px;border-radius:2px;"></div>`,
            iconSize: [9, 9],
            iconAnchor: [5, 5],
          }),
        })
          .bindTooltip(`<b>${ps.name}</b><br/>${ps.district}`, {
            className: "leaflet-tooltip-dark",
          })
          .addTo(hqGroup);
      });
      hqGroup.addTo(map);
      layerGroupsRef.current.policeStationPoints = hqGroup;

      // ── 4. Black Spot Villages ────────────────────────────────────────────
      const blackSpotGroup = L.layerGroup();
      blackSpotVillages.forEach((v) => {
        L.circleMarker([v.lat, v.lng], {
          radius: 5,
          fillColor: "#dc2626",
          color: "#dc2626",
          weight: 1,
          fillOpacity: 0.9,
        })
          .bindTooltip(
            `<b>${v.name}</b><br/>${v.district}${v.ps ? " — " + v.ps : ""}`,
            { className: "leaflet-tooltip-dark" },
          )
          .addTo(blackSpotGroup);
      });
      blackSpotGroup.addTo(map);
      layerGroupsRef.current.blackSpotVillages = blackSpotGroup;

      // ── 5. PEW Boundary zones ─────────────────────────────────────────────
      const pewGroup = L.layerGroup();
      pewBoundaryZones.forEach((zone) => {
        L.circle(zone.center, {
          radius: zone.radius,
          color: "#2563eb",
          weight: 2,
          fillColor: "#2563eb",
          fillOpacity: 0.06,
          dashArray: "8 4",
        })
          .bindTooltip(`<b>${zone.name}</b>`, {
            className: "leaflet-tooltip-dark",
          })
          .addTo(pewGroup);
      });
      pewGroup.addTo(map);
      layerGroupsRef.current.pewBoundary = pewGroup;

      // ── 6. Check Posts ────────────────────────────────────────────────────
      const checkpostGroup = L.layerGroup();
      checkpostLocations.forEach((cp) => {
        L.marker([cp.lat, cp.lng], {
          icon: L.divIcon({
            className: "",
            html: `<div style="background:#f59e0b;border:2px solid #92400e;width:11px;height:11px;border-radius:2px;transform:rotate(45deg);"></div>`,
            iconSize: [11, 11],
            iconAnchor: [6, 6],
          }),
        })
          .bindTooltip(`<b>${cp.name}</b><br/>Checkpost — ${cp.district}`, {
            className: "leaflet-tooltip-dark",
          })
          .addTo(checkpostGroup);
      });
      checkpostGroup.addTo(map);
      layerGroupsRef.current.checkPost = checkpostGroup;

      // ── 7. PEW Unit Offices ───────────────────────────────────────────────
      const caseGroup = L.layerGroup();
      pewUnitLocations.forEach((unit) => {
        L.circleMarker([unit.lat, unit.lng], {
          radius: 6,
          fillColor: "#2563eb",
          color: "#1e3a5f",
          weight: 1.5,
          fillOpacity: 0.85,
        })
          .bindTooltip(`<b>${unit.name}</b><br/>PEW Office`, {
            className: "leaflet-tooltip-dark",
          })
          .addTo(caseGroup);
      });
      caseGroup.addTo(map);
      layerGroupsRef.current.office = caseGroup;

      // ── 8. Tamil Nadu State Shape (fills precisely to TN boundary polygon) ──
      const tnStateGroup = L.layerGroup();

      // Outer filled shape — warm land color clipped exactly to TN boundary
      L.polygon(tamilNaduBoundary, {
        color: "#b45309", // amber border
        weight: 2,
        fillColor: "#fef3c7", // light warm amber (land)
        fillOpacity: 0.45,
        dashArray: "",
        interactive: false,
      }).addTo(tnStateGroup);

      // Inner pattern layer — subtle crosshatch-like effect via lower-opacity overlay
      L.polygon(tamilNaduBoundary, {
        color: "transparent",
        weight: 0,
        fillColor: "#f59e0b",
        fillOpacity: 0.08,
        interactive: false,
      }).addTo(tnStateGroup);

      tnStateGroup.addTo(map);
      layerGroupsRef.current.tnMapImage = tnStateGroup;

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // ── Toggle layers on/off ────────────────────────────────────────────────────
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    Object.entries(layers).forEach(([key, visible]) => {
      const group = layerGroupsRef.current[key];
      if (!group) return;
      if (visible && !map.hasLayer(group)) map.addLayer(group);
      if (!visible && map.hasLayer(group)) map.removeLayer(group);
    });
  }, [layers]);

  // ── Switch base map ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!tileLayerRef.current || !mapInstanceRef.current) return;
    tileLayerRef.current.setUrl(baseMaps[activeBaseMap].url);
  }, [activeBaseMap]);

  const layerCheckboxes: { key: LayerKey; label: string; color: string }[] = [
    { key: "tnMapImage", label: "TN Map Image", color: "#64748b" },
    { key: "policeStationBoundary", label: "State Boundary", color: "#dc2626" },
    { key: "districtBoundary", label: "District Boundaries", color: "#7c3aed" },
    { key: "policeStationPoints", label: "Police Stations", color: "#1e3a5f" },
    {
      key: "blackSpotVillages",
      label: "Black Spot Villages",
      color: "#dc2626",
    },
    { key: "pewBoundary", label: "PEW Zones", color: "#2563eb" },
    { key: "checkPost", label: "Check Posts", color: "#f59e0b" },
    { key: "office", label: "PEW Offices", color: "#2563eb" },
  ];

  return (
    <div className="relative flex-1 flex overflow-hidden">
      {/* Map Container */}
      <div
        ref={mapRef}
        className="flex-1 h-full"
        style={{ background: "#e8f0fe" }}
      />

      {/* Right Legend Panel */}
      <div
        className="absolute right-3 top-16 w-60 rounded-lg shadow-lg p-4 space-y-3 z-[1000]"
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
        }}
      >
        {/* Base map radios */}
        <p
          className="text-[10px] uppercase font-semibold tracking-wider"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          Base Map
        </p>
        <div className="space-y-1.5">
          {(
            Object.entries(baseMaps) as [BaseMap, (typeof baseMaps)[BaseMap]][]
          ).map(([key, cfg]) => (
            <label
              key={key}
              className="flex items-center gap-2 cursor-pointer text-xs"
            >
              <input
                type="radio"
                name="basemap"
                checked={activeBaseMap === key}
                onChange={() => setActiveBaseMap(key)}
                className="accent-[hsl(var(--primary))]"
              />
              <span>{cfg.label}</span>
            </label>
          ))}
        </div>

        <div
          className="border-t"
          style={{ borderColor: "hsl(var(--border))" }}
        />

        {/* Overlay checkboxes */}
        <p
          className="text-[10px] uppercase font-semibold tracking-wider"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          Layers
        </p>
        <div className="space-y-1.5">
          {layerCheckboxes.map((lc) => (
            <label
              key={lc.key}
              className="flex items-center gap-2 cursor-pointer text-xs"
            >
              <input
                type="checkbox"
                checked={layers[lc.key]}
                onChange={() => toggleLayer(lc.key)}
                className="accent-[hsl(var(--primary))] rounded"
              />
              <span
                className="w-2.5 h-2.5 rounded-sm shrink-0"
                style={{ background: lc.color, opacity: 0.85 }}
              />
              <span>{lc.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="gis-control-panel absolute bottom-4 left-4 right-4 flex items-center justify-between z-[1000]">
        <div className="flex gap-4 flex-wrap">
          {[
            { label: "Districts", value: districtBoundaries.length },
            {
              label: "Police Stn.",
              value: districtHQs.length + policeStations.length,
            },
            { label: "Black Spots", value: blackSpotVillages.length },
            { label: "Checkposts", value: checkpostLocations.length },
            { label: "PEW Offices", value: pewUnitLocations.length },
          ].map(({ label, value }) => (
            <div key={label} className="text-xs">
              <span style={{ color: "hsl(var(--muted-foreground))" }}>
                {label}
              </span>
              <span className="ml-1.5 font-bold">{value}</span>
            </div>
          ))}
        </div>
        <div
          className="text-[10px]"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          Last updated: {new Date().toLocaleTimeString()} IST
        </div>
      </div>
    </div>
  );
}
