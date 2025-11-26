import { useEffect, useRef, useState } from "react";
import "./SelectedDataBox.css";

export default function SelectedDataBox({ data }) {
  const [openRow, setOpenRow] = useState(null);
  const [estacionesData, setEstacionesData] = useState([]);
  const isFirstRender = useRef(true);
  const [estacionesAPIData, setEstacionesAPIData] = useState({});

  


  const toggleRow = (index) => {
    setOpenRow(openRow === index ? null : index);
  };


  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; 
      return;
    }

    if (data.length > 0) {
      setEstacionesData(data);
    }
  }, [data]);

  



  
useEffect(() => { 
  async function fetchEstacion(estacion) {
    try {
      const body = {
        "id_estaciones": [estacion.codigoestacion],
        "columnas": "*",
        "fecha_inicio": "2023-01-01T00:00:00.0",
        "fecha_fin": "2025-10-30T00:00:00.0"
      };

      const response = await fetch("http://127.0.0.1:8000/ideam/s54a-sgyg/dataview/", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const json = await response.json();
      console.log(json.length);
      return json;
    } catch (error) {
      console.error("Error al obtener estación:", error);
      return null;
    }
  }


  data.forEach(async (estacion) => {
    const estacionData = await fetchEstacion(estacion);

    setEstacionesAPIData(prev => ({
      ...prev,
      [estacion.codigoestacion]: estacionData
    }));
  });

}, [data]);
  
 


  if (data.length === 0) return;
  return (

    

    <div className="selected-data-box">
      <h3>Datos Seleccionados</h3>

      <table className="estaciones-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ver gráfica</th>
          </tr>
        </thead>

        <tbody>
          {estacionesData.map((estacion, index) => (
            <>
              <tr key={index}>
                <td>{estacion.nombreestacion}</td>

                <td>
                  <button onClick={() => toggleRow(index)}>
                    {openRow === index ? "Cerrar" : "Abrir"}
                  </button>
                </td>
              </tr>

              {openRow === index && (
                <tr className="dropdown-row">
                  <td colSpan="2">
                    <div className="dropdown-content">
                      <p>codigoestacion: {estacion.codigoestacion}...</p>
                      <pre>
                          {JSON.stringify(estacionesAPIData[estacion.codigoestacion], null, 2)}
                      </pre>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
