"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  raza: string;
}

export default function RazaCard({ raza }: Props) {
  const [imagen, setImagen] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImagen() {
      try {
        const res = await fetch(
          `https://dog.ceo/api/breed/${raza}/images/random`
        );
        const data = await res.json();
        setImagen(data.message);
      } catch (error) {
        console.error("Error al cargar la imagen", error);
      }
    }

    fetchImagen();
  }, [raza]);

  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100">
        {imagen && (
          <img src={imagen} alt={raza} id="imgRaza" className="card-img-top" />
        )}
        <div className="card-body text-center">
          <h5 className="card-title text-capitalize">{raza}</h5>
          <Link href={`/razas/${raza}`} className="btn btn-primary mt-2">
            Ver imágenes
          </Link>
        </div>
      </div>
    </div>
  );
}
