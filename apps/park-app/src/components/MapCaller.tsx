'use client';

import dynamic from 'next/dynamic';

const LazyMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

function MapCaller(props) {
  return <LazyMap {...props} />;
}

export default MapCaller;