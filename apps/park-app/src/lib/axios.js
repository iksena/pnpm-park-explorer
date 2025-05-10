import axios from 'axios';

const ParkAPI = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:3001',
    timeout: 1000,
});

export default ParkAPI;