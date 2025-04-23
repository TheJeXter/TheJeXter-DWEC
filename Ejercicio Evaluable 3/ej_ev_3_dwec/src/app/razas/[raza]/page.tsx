"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

async function obtenerImagenesDeRaza(raza: string): Promise<string[]> {
  const res = await fetch(`https://dog.ceo/api/breed/${raza}/images`);
  const data = await res.json();
  return data.message;
}

export default function DetalleRaza() {
  const params = useParams();
  const raza = params.raza as string;
  const [imagenes, setImagenes] = useState<string[]>([]);

  useEffect(() => {
    async function cargarImagenes() {
      const imgs = await obtenerImagenesDeRaza(raza);
      //He limitado la cantidad de imágenes que se cargan a 12 para no saturar la carga
      setImagenes(imgs.slice(0, 12));
    }
    cargarImagenes();
  }, [raza]);

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-capitalize">Raza: {raza}</h1>
      <div className="d-flex gap-2 mb-4">
        <Link href="/razas" className="btn btn-secondary">
          Volver a la lista
        </Link>
        <Link href="/" className="btn btn-secondary">
          Volver al inicio
        </Link>
      </div>

      <div className="row">
        {imagenes.map((img, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">
              <img
                src={img}
                alt={`Imagen de ${raza}`}
                id="imgDetalleRaza"
                className="card-img-top"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
