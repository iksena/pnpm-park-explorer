'use client';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import { Typography, Box } from '@mui/material';
import ParksApi from '@/lib/axios';
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet-draw/dist/leaflet.draw-src.css'

function Map({ park }) {
  return (
    <MapContainer center={park?.geometry?.coordinates?.[0]?.[0]} zoom={13} scrollWheelZoom={false} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon pathOptions={{ color: 'purple' }} positions={park?.geometry?.coordinates?.[0]} />
    </MapContainer>
  );
}

export default Map;