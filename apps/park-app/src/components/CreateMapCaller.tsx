'use client';

import dynamic from 'next/dynamic';

const LazyCreateMap = dynamic(() => import("@/components/CreateMap"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

function CreateMapCaller(props) {
  return <LazyCreateMap {...props} />;
}

export default CreateMapCaller;