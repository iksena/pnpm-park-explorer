import * as React from 'react';
import Link from 'next/link'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ParksApi from '@/lib/axios'

export default async function Page() {
  try {
    const parks = await ParksApi.get('/parks');
    return (
      <React.Fragment>
        {parks.data.map((park: any) => (
          <Card variant="outlined" key={park.id} sx={{ margin: 2 }}>
            <CardContent>
              <Typography variant="h5">{park.name}</Typography>
              <Typography variant="body2">{park.description}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small"><Link href={`/parks/${park.id}`}>View</Link></Button>
            </CardActions>
          </Card>
        ))}
      </React.Fragment>
    );
  } catch (error) {
    console.error('Error fetching parks:', error);
    return <Typography>Error fetching parks</Typography>;
  }
}