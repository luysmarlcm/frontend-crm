// app/api/clientes/route.js

import { NextResponse } from 'next/server';
import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false
});

export async function GET() {
  try {
    // --- 1. Credenciales y configuración ---
    const USERNAME_815 = process.env.BASIC_AUTH_USERNAME;
    const PASSWORD_815 = process.env.BASIC_AUTH_PASSWORD;
    const API_URL_815 = process.env.URL_TOKEN;
    const apiKey = process.env.WISPHUB_API_KEY;
    const apiUrl = process.env.API_URL;
    const basicAuthToken = Buffer.from(`${USERNAME_815}:${PASSWORD_815}`).toString('base64');

    console.log('--- Iniciando llamadas a las APIs de 815 ---');

    // --- 2. Llamadas a las APIs de 815 en paralelo ---
    const [
      responseClientes,
      responseCiudades,
      responseEquipos,
      responseIPs,
      responseNodos
    ] = await Promise.all([
      axios.get(`${API_URL_815}/gateway/integracion/clientes/cuentasimple/listar?&json`, {
        httpsAgent: agent,
        headers: { 'Authorization': `Basic ${basicAuthToken}` },
      }),
      axios.get(`${API_URL_815}/gateway/integracion/geografico/ciudad/listar?&json`, {
        httpsAgent: agent,
        headers: { 'Authorization': `Basic ${basicAuthToken}` },
      }),
      axios.get(`${API_URL_815}/gateway/integracion/hardware/equipocliente/listar?json`, {
        httpsAgent: agent,
        headers: { 'Authorization': `Basic ${basicAuthToken}` },
      }),
      axios.get(`${API_URL_815}/gateway/integracion/red/direccionip/listar?&json`, {
        httpsAgent: agent,
        headers: { 'Authorization': `Basic ${basicAuthToken}` },
      }),
      axios.get(`${API_URL_815}/gateway/integracion/hardware/nodored/listar?activo=True&admite_clientes=True&json`, {
        httpsAgent: agent,
        headers: { 'Authorization': `Basic ${basicAuthToken}` },
      }),
    ]);
    console.log('✅ Datos de 815 y sus dependencias obtenidos.');

    // --- 3. Crear mapas para búsqueda rápida ---
    const mapaCiudades = {};
    if (Array.isArray(responseCiudades.data)) {
      responseCiudades.data.forEach(item => mapaCiudades[item.pk] = item.fields.nombre);
    }

    const mapaEquipos = {};
    if (Array.isArray(responseEquipos.data)) {
      responseEquipos.data.forEach(item => mapaEquipos[item.pk] = item.fields);
    }

    const mapaIPs = {};
    if (Array.isArray(responseIPs.data)) {
      responseIPs.data.forEach(item => mapaIPs[item.pk] = item.fields);
    }

    const mapaNodos = {};
    if (Array.isArray(responseNodos.data)) {
      responseNodos.data.forEach(item => mapaNodos[item.pk] = item.fields);
    }
    console.log('--- Mapas de 815 creados. ---');

    // --- 4. Enriquecer los datos de los clientes de 815 ---
    const datos815 = responseClientes.data.map(item => {
    const cliente = { ...item.fields, pk: item.pk, model: item.model };
      
      // Añadir datos de la ciudad
      cliente.ciudad_815 = mapaCiudades[cliente.ciudad] || 'Desconocida';
      
      // Añadir datos del equipo
      const equipo = mapaEquipos[cliente.equipo_cliente];
      cliente.equipo_cliente = equipo?.nombre || 'Desconocido';
      // cliente.mac_equipo = equipo?.mac || 'Desconocida';
      
      // Añadir la dirección IP
      cliente.direccion_ip_815 = mapaIPs[cliente.direccion_ip] || 'Desconocida';
    

      const nodo = mapaNodos[cliente.nodo_de_red];
      cliente.nodo_de_red_815 = nodo?.nombre || 'Desconocido';
      
      return cliente;
    });
    console.log('✅ Datos de 815 enriquecidos. Cantidad de registros:', datos815.length);

    // --- 5. Llama a la API de WispHub con paginación ---
    let allWispHubClients = [];
    let offset = 0;
    const limit = 300; 

    console.log('--- Iniciando llamadas a la API de WispHub con paginación ---');
    while (true) {
      console.log(`Buscando clientes desde el registro ${offset}...`);
      const response = await axios.get(`${apiUrl}/api/clientes/?limit=${limit}&offset=${offset}`, {
        headers: {
          'Authorization': `Api-Key ${apiKey}`,
          'Accept': 'application/json'
        }
      });

      const { results, next } = response.data;
      if (!results || results.length === 0) {
        break;
      }
      
      allWispHubClients = allWispHubClients.concat(results);
      console.log(`✅ ${results.length} registros obtenidos. Total actual: ${allWispHubClients.length}`);

      if (!next) {
        break;
      }
      offset += limit;
    }
    console.log('--- Paginación de WispHub finalizada. Cantidad total de registros:', allWispHubClients.length);

    // --- 6. Unir los datos de 815 y WispHub ---
    const mapaWispHub = {};
    if (Array.isArray(allWispHubClients)) {
      allWispHubClients.forEach(cliente => {
        if (cliente.id_servicio) {
          mapaWispHub[cliente.id_servicio] = cliente;
        }
      });
    }
    console.log('--- Mapa de WispHub creado. Cantidad de entradas:', Object.keys(mapaWispHub).length);

    const clientesUnidos = [];
    if (Array.isArray(datos815)) {
      datos815.forEach(cliente815 => {
        const idConector = cliente815.conector; 
        const clienteWispHub = mapaWispHub[idConector];

        if (clienteWispHub) {
          const objetoUnido = {
            ...cliente815,
            ...clienteWispHub
          };
          clientesUnidos.push(objetoUnido);
        }
      });
    }
    
    // --- 7. Retornar el resultado final ---
    console.log('--- Proceso de unión finalizado. Total de clientes unidos:', clientesUnidos.length);
    
    if (clientesUnidos.length === 0) {
      console.log('⚠️ No se encontraron coincidencias para unir los datos.');
      return NextResponse.json({ 
        message: 'No hay datos para unir. Las bases de datos están vacías o los conectores no coinciden.' 
      }, { status: 200 });
    }

    console.log('--- Vista previa del JSON final (primer registro unido):', clientesUnidos[0]);
    
    return NextResponse.json(clientesUnidos, { status: 200 });

  } catch (error) {
    console.error('❌ Error al unir los datos de las APIs.');
    console.error('Mensaje de error:', error.message);
    if (error.response) {
      console.error('Detalles del error HTTP:', error.response.status, error.response.data);
    }
    const errorMessage = error.response?.data?.message || 'Error desconocido';
    const errorStatus = error.response?.status || 500;

    return NextResponse.json(
      { error: `Error en la operación: ${errorMessage}` },
      { status: errorStatus }
    );
  }
}