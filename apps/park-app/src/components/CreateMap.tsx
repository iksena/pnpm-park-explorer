'use client';
import React, { useCallback, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, FeatureGroup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw';
import { Typography, Box, Container, TextField, Button, Stack } from '@mui/material';
import { GeoJSON } from 'leaflet';
import ParksApi from '@/lib/axios';
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet-draw/dist/leaflet.draw-src.css'
import { polygon } from 'leaflet';
import { useRouter } from 'next/navigation';

function CreateMap() {
  const featureGroupRef = useRef(null);
  const editControlRef = useRef(null);
  const router = useRouter();
  const [createdPolygon, setPolygon] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onChange = useCallback(() => {
    if (featureGroupRef.current) {
      const geoJson = featureGroupRef.current.toGeoJSON();
      const features = geoJson?.features ?? [];
      const geometry = features[features.length - 1]?.geometry ?? {};
      if (geometry.type === 'Polygon') {
        const coordinates = geometry.coordinates[0].map((coord) => [coord[1], coord[0]]);
        setPolygon([coordinates]);
      }
    }
  }, [featureGroupRef, setPolygon]);

  const onSubmit = useCallback(async () => {
    const newPark = {
      name,
      description,
      geometry: {
        type: 'Polygon',
        coordinates: createdPolygon
      }
    }
    if(!newPark.name || newPark.geometry.coordinates.length === 0){
      return;
    }

    try{
      await ParksApi.post('/parks', newPark);
      router.push('/');
    } catch (error) {
      alert('Error creating park', error);
      console.log(error);
    }
  }, [name, description, createdPolygon])

  return (
    <Container>
      <Box
        m={2}
        component="form"
        noValidate
        autoComplete="off"
      >
        <Stack spacing={5}>
          <TextField 
            required
            id="name" 
            label="Name" 
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            />
          <TextField
            id="description"
            label="Description"
            multiline
            onChange={(e) => setDescription(e.target.value)}
            />
          <TextField
            id="polygon"
            label="Polygon"
            required
            multiline
            value={JSON.stringify(createdPolygon)}
            onChange={(e) => setPolygon(JSON.parse(e.target.value))}
            />
          <Button variant="outlined" onClick={onSubmit}>Create</Button>
        </Stack>
      </Box>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: '500px', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FeatureGroup ref={featureGroupRef}>
            <EditControl 
              ref={editControlRef}
              onCreated={() => onChange()} 
              onEdited={() => onChange()} 
              onDeleted={() => onChange()}
              position="topright" 
              />
          </FeatureGroup>
      </MapContainer>
    </Container>
  );
}

export default CreateMap;