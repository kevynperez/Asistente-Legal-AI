import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, colors, Box } from '@mui/material'; // Cambié Grid2 por Grid
import { color, styled } from '@mui/system';
import { pruebaBiblioteca } from '../api/request';

const heightNavbar = '65px';
const widthMenuBar = '320px';

const NeomorphicCard = styled(Box)(({ theme }) => ({
  borderRadius: '1rem',
  background: colors.grey[200],
  boxShadow: '10px 10px 20px #bebebe, -10px -10px 20px #ffffff',
  padding: '1rem',
  textAlign: 'center',
  gap: '1rem',
  display: 'flex',
  flexDirection: 'column',
}));

const Prueba = () => {
  
  const [message, setMessage] = useState(''); // Corregido "mesage" a "message"
  const [isMessage, setIsMessage] = useState(false); // Corregido "isMesage" a "isMessage"

  const startPrueba = async () => {
    try {
      const data = await pruebaBiblioteca();
      console.log(data.data);
      setIsMessage(true);
      setMessage(data.data); // Asegúrate de acceder a la propiedad correcta
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsMessage(true);
      setMessage('Error al realizar la petición'); // Manejo de errores
    }
  };

  useEffect(() => {
    // Puedes agregar lógica aquí si es necesario
  }, [isMessage]); // Cambié la dependencia a isMessage para que se ejecute cuando cambie

  return (
    <Box sx={{
        height: `calc(100vh - ${heightNavbar})`,
        //height: '93vh',
        width: `calc(100vw - ${widthMenuBar})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
    }}>
      <NeomorphicCard item container xs={12} sm={6} md={4}>
        <Typography variant="h5" gutterBottom>
          Presione para realizar prueba !!
        </Typography>
        <Button variant="contained" color="primary" onClick={startPrueba}>
          Hacer petición
        </Button>
        {isMessage && 
          <Typography variant="h5" gutterBottom>
            {message}
          </Typography>
        }     
      </NeomorphicCard>
    </Box>
  );
};

export default Prueba;