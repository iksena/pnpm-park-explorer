import React from 'react';
import ParksApi from '@/lib/axios';
import MapCaller from '@/components/MapCaller';

export default async function Page({
  params,
}: Readonly<{
  params: {
    id: string;
  };
}>) {
  try {
    const { id } = await params;
    const response = await ParksApi.get(`/parks/${id}`);
    return <MapCaller park={response.data} />;
  } catch (error) {
    console.error('Error fetching park:', error);
    return <p>Error fetching park.</p>;
  }
}