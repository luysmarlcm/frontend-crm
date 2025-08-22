// utils/dataProcessor.js
export const processPingData = (pingString) => {
  if (!pingString || typeof pingString !== 'string') {
    return [];
  }

  // Dividir la cadena en líneas y filtrar las que contienen información de tiempo
  const lines = pingString.split('\n');
  const pingLines = lines.filter(line => line.includes('icmp_seq=') && line.includes('time='));

  // Usar una expresión regular para extraer los valores
  const data = pingLines.map(line => {
    const seqMatch = line.match(/icmp_seq=(\d+)/);
    const timeMatch = line.match(/time=(\d+\.\d+) ms/);

    if (seqMatch && timeMatch) {
      return {
        // icmp_seq para el eje X
        sequence: parseInt(seqMatch[1], 10),
        // time para el eje Y
        time: parseFloat(timeMatch[1]),
      };
    }
    return null;
  }).filter(item => item !== null); // Eliminar cualquier línea que no se pudo parsear

  return data;
};