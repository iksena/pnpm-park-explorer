import React from 'react';
import ParksApi from '@/lib/axios';
import dynamic from 'next/dynamic';
import MapCaller from '@/components/MapCaller';

export default function Page({
  params,
}: Readonly<{
  params: {
    id: string;
  };
}>) {
    const { id } = React.use(params);

    return <MapCaller id={id} />;
}