"use client";

import { useEffect, useState } from "react";
import RazaCard from "../components/razaCard";

type RazaResponse = {
  message: Record<string, string[]>;
  status: string;
};

export default function ListaRazas() {
  const [razas, setRazas] = useState<string[]>([]);
  //Creamos un buscador para filtrar las raza que queramos
  const [busqueda, setBusqueda] = useState<string>("");

  useEffect(() => {
    async function obtenerRazas() {
      const res = await fetch("https://dog.ceo/api/breeds/list/all");
      const data: RazaResponse = await res.json();

      if (data.status === "success") {
        const razasLista = Object.keys(data.message);
        setRazas(razasLista);
      }
    }

    obtenerRazas();
  }, []);

  const razasFiltradas = razas.filter((raza) =>
    raza.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Lista de Razas</h1>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar raza..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="row">
        {razasFiltradas.map((raza, i) => (
          <RazaCard key={i} raza={raza} />
        ))}
      </div>
    </div>
  );
}
