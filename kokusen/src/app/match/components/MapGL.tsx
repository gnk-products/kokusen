'use client';

import { ReactNode, memo } from 'react';
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  TooltipProps,
} from 'react-leaflet';

import _ from 'lodash';

interface MapGLProps {
  zoom?: number;
  style?: { [key: string]: string | number };
  markerConfigs: {
    position: [number, number];
    tooltip?: string | null | ReactNode;
    tooltipProps?: TooltipProps;
  }[];
}

const MapGL = (props: MapGLProps) => {
  const { zoom, style, markerConfigs } = props;
  const markerPositions = markerConfigs.map((config) => config.position);
  const centerPosition =
    markerPositions.length >= 1
      ? ([
          _.meanBy(markerPositions, (position) => position[0]),
          _.meanBy(markerPositions, (position) => position[1]),
        ] as [number, number])
      : undefined;
  return (
    <MapContainer
      center={centerPosition}
      zoom={zoom || 3}
      scrollWheelZoom={true}
      style={{ height: 400, ...style }}
    >
      <TileLayer
        attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
      />
      {markerConfigs.map(({ position, tooltip, tooltipProps }) => {
        const [lat, long] = position;
        return (
          <Marker
            key={`${lat}-${long}`}
            position={position}
            eventHandlers={{
              click: () => {
                const url = `https://www.google.co.jp/maps/search/?api=1&query=${lat},${long}`;
                window.open(url);
              },
            }}
          >
            <Tooltip {...tooltipProps}>{tooltip || 'Open google map'}</Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default memo(MapGL);
