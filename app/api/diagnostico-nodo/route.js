// app/api/diagnostico-nodo/route.js

import { NextResponse } from 'next/server';
import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false
});

export async function GET(request) {
  try {
     const { searchParams } = new URL(request.url);
     const cedula = searchParams.get('cedula');
    const pkConexionSeleccionado = searchParams.get('pk');

     if (!cedula) {
       return NextResponse.json({ error: 'Falta el parámetro cedula' }, { status: 400 });
     }
    const USERNAME_815 = process.env.BASIC_AUTH_USERNAME;
     const PASSWORD_815 = process.env.BASIC_AUTH_PASSWORD_G1;
     const basicAuthToken = Buffer.from(`${USERNAME_815}:${PASSWORD_815}`).toString('base64');

    // Si ya se recibió un PK, se salta el paso de búsqueda de clientes
    if (pkConexionSeleccionado) {
        console.log(`--- Realizando diagnóstico para PK: ${pkConexionSeleccionado} ---`);
        const diagnosticoResponse = await axios.get(
            `https://g1arcofer.815d.net:815/gateway/integracion/hardware/nodored/diagnosticar_multiapi/?pk_conexion=${pkConexionSeleccionado}&json`,
            {
                httpsAgent: agent,
                headers: { 'Authorization': `Basic ${basicAuthToken}` },
            }
        );
        return NextResponse.json(diagnosticoResponse.data, { status: 200 });
    }

     
   

     // --- PASO 1: OBTENER PK_CONEXION DEL SERVICIO DE CLIENTES ---
     console.log(`--- Buscando cliente con cédula: ${cedula} ---`);
     const clientesResponse = await axios.get(
     `https://g1arcofer.815d.net:815/gateway/integracion/clientes/cuentasimple/listar?&json&extra_1=${cedula}`,
     {
          httpsAgent: agent,
            headers: { 'Authorization': `Basic ${basicAuthToken}` },
          }
     );

    const clienteData = clientesResponse.data;
    console.log(`✅ Cliente encontrado: ${clienteData.length} registros.`);

     if (!clienteData || clienteData.length === 0) {
     return NextResponse.json(
       { error: 'No se encontró un cliente o pk_conexion para la cédula proporcionada' },
        { status: 404 }
     );
    }

    // --- LÓGICA AGREGADA ---
    // Si hay múltiples conexiones, devuelve la lista para que el frontend elija
    if (clienteData.length > 1) {
        console.log(`❕ Se encontraron múltiples conexiones. Devolviendo lista para selección.`);
        return NextResponse.json({
            status: 'multiple_connections',
            data: clienteData
        }, { status: 200 });
    }

   // Si solo hay una conexión, continúa con el diagnóstico como antes
    const pkConexion = clienteData[0].pk;
    if (!pkConexion) {
        return NextResponse.json(
            { error: 'No se encontró un pk_conexion para la cédula proporcionada' },
            { status: 404 }
        );
    }
  console.log(`✅ PK de conexión encontrado: ${pkConexion}`);

      console.log(`--- Realizando diagnóstico para PK: ${pkConexion} ---`);
     
       const diagnosticoResponse = await axios.get(
       `https://g1arcofer.815d.net:815/gateway/integracion/hardware/nodored/diagnosticar_multiapi/?pk_conexion=${pkConexion}&json`,
          {
          httpsAgent: agent,
            headers: { 'Authorization': `Basic ${basicAuthToken}` },
          }
          );
     
     // Devolver el resultado del diagnóstico
      return NextResponse.json(diagnosticoResponse.data, { status: 200 });

   } catch (error) {
     console.error('❌ Error en el proceso de diagnóstico.');
     console.error('Mensaje de error:', error.message);

     // Manejo de errores detallado
     if (error.response) {
      console.error('Detalles del error HTTP:', error.response.status, error.response.data);
        return NextResponse.json(
         { error: `Error en la operación: ${error.response.data.message || 'Error desconocido'}` },
          { status: error.response.status }
     );
     }
    return NextResponse.json(
     { error: `Error desconocido: ${error.message}` },
     { status: 500 }
 );
 }
}