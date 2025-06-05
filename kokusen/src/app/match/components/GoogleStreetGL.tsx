'use client';

import { memo } from 'react';

import {
  GoogleMap,
  StreetViewPanorama,
  useJsApiLoader,
} from '@react-google-maps/api';

interface GoogleStreetGLProps {
  lat: number;
  long: number;
  style?: { [key: string]: string | number };
}

const GoogleStreetGL = (props: GoogleStreetGLProps) => {
  const { style, lat, long } = props;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_ACCESS_KEY || '',
  });
  const center = {
    lat,
    lng: long,
  };
  return isLoaded ? (
    <GoogleMap mapContainerStyle={style} zoom={3} center={center}>
      <StreetViewPanorama
        options={{
          position: center,
          visible: true,
          addressControl: false,
          clickToGo: false,
          fullscreenControl: false,
          linksControl: false,
          showRoadLabels: false,
          zoomControl: false,
        }}
      />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default memo(GoogleStreetGL);
