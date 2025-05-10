'use client';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import { Typography, Box } from '@mui/material';
import ParksApi from '@/lib/axios';
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet-draw/dist/leaflet.draw-src.css'

function Map({ id }) {
  const [park, setPark] = React.useState({});
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
      const fetchPark = async () => {
          try {
              const response = await ParksApi.get(`/parks/${id}`);
              console.log('Park:', response.data);
              setPark(response.data);
          } catch (error) {
              console.error('Error fetching park:', error);
              setError(error);
          } finally {
              setLoading(false);
          }
      };

      fetchPark();
  }, [id]);

  if(loading) {
    return <Typography>Loading...</Typography>
  }

  console.log('Park:', park);

  // return (
  //   <Box>

  //   <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '500px', width: '100%' }} >
  //     <TileLayer
  //       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //       />
  //     <Marker position={[51.505, -0.09]}>
  //       <Popup>
  //         A pretty CSS3 popup. <br /> Easily customizable.
  //       </Popup>
  //     </Marker>
  //   </MapContainer>
  //   </Box>
  // )

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon pathOptions={{ color: 'purple' }} positions={park?.geometry?.coordinates?.[0]} />
    </MapContainer>
  );
}

export default Map;