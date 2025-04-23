"use client";

import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

const obtenerRazaAleatoria = async (): Promise<string> => {
  const res = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await res.json();
  const razas = Object.keys(data.message);
  const index = Math.floor(Math.random() * razas.length);
  return razas[index];
};

const obtenerImagenRaza = async (raza: string): Promise<string> => {
  const res = await fetch(`https://dog.ceo/api/breed/${raza}/images/random`);
  const data = await res.json();
  return data.message;
};

export default function Destacada() {
  const [raza, setRaza] = useState("");
  const [imagen, setImagen] = useState("");

  useEffect(() => {
    async function cargarRaza() {
      const r = await obtenerRazaAleatoria();
      const img = await obtenerImagenRaza(r);
      setRaza(r);
      setImagen(img);
    }
    cargarRaza();
  }, []);

  if (!raza || !imagen) return <p>Cargando raza destacada...</p>;

  return (
    <div className="text-center mt-4">
      <h2 className="text-xl font-bold mb-2">Raza destacada: {raza}</h2>
      <Link href={`/razas/${raza}`}>
        <img
          src={imagen}
          alt={raza}
          id="imgDestacada"
          className="mx-auto rounded shadow-md w-64 h-64 object-cover raza-img-hover"
        />
      </Link>
    </div>
  );
}
