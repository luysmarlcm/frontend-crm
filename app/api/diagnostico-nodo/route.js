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
    const pkConexion = searchParams.get('pk_conexion');

    if (!pkConexion) {
      return NextResponse.json({ error: 'Falta el parámetro pk_conexion' }, { status: 400 });
    }
    
    // Credenciales y URL de la API
    const USERNAME_815 = process.env.BASIC_AUTH_USERNAME;
    const PASSWORD_815 = process.env.BASIC_AUTH_PASSWORD_G1;
    const API_URL_815 = process.env.URL_TOKEN;
    const basicAuthToken = Buffer.from(`${USERNAME_815}:${PASSWORD_815}`).toString('base64');
    
    console.log(`--- Realizando diagnóstico para PK: ${pkConexion} ---`);

    const response = await axios.get(
      `https://g1arcofer.815d.net:815/gateway/integracion/hardware/nodored/diagnosticar_multiapi/?pk_conexion=${pkConexion}&json`,
      {
        httpsAgent: agent,
        headers: { 'Authorization': `Basic ${basicAuthToken}` },
      }
    );
    
    return NextResponse.json(response.data, { status: 200 });

  } catch (error) {
    console.error('❌ Error en el diagnóstico del nodo.');
    console.error('Mensaje de error:', error.message);
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