"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

async function obtenerImagenesAleatorias(): Promise<string[]> {
  const res = await fetch("https://dog.ceo/api/breeds/image/random/3");
  const data = await res.json();
  return data.message;
}

export default function PorQueAdoptar() {
  const [imagenes, setImagenes] = useState<string[]>([]);

  useEffect(() => {
    async function cargarImagenes() {
      const imgs = await obtenerImagenesAleatorias();
      setImagenes(imgs);
    }
    cargarImagenes();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">¿Por qué adoptar un perro?</h1>

      <div className="row mb-4">
        {imagenes.map((img, i) => (
          <div className="col-md-4 mb-3" key={i}>
            <div className="card h-100">
              <img
                src={img}
                alt="imgAdoptar"
                id="imgAdoptar"
                className="card-img-top"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="accordion mb-4" id="beneficiosPerro">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingUno">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseUno"
              aria-expanded="true"
              aria-controls="collapseUno"
            >
              <strong>Compañía y soledad</strong>
            </button>
          </h2>
          <div
            id="collapseUno"
            className="accordion-collapse collapse show"
            aria-labelledby="headingUno"
            data-bs-parent="#beneficiosPerro"
          >
            <div className="accordion-body">
              Los perros ofrecen compañía constante y ayudan a reducir la
              sensación de soledad, especialmente en personas mayores o que
              viven solas. Su presencia puede aportar un sentido de propósito
              diario, 1además de mejorar el humor!
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingDos">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseDos"
              aria-expanded="false"
              aria-controls="collapseDos"
            >
              <strong>Fomento de la actividad física</strong>
            </button>
          </h2>
          <div
            id="collapseDos"
            className="accordion-collapse collapse"
            aria-labelledby="headingDos"
            data-bs-parent="#beneficiosPerro"
          >
            <div className="accordion-body">
              Sacar al perro a pasear diariamente promueve el ejercicio regular,
              ayudando a mantener una vida activa. Incluso pequeños paseos
              benefician la salud física y mental.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTres">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTres"
              aria-expanded="false"
              aria-controls="collapseTres"
            >
              <strong>Mejora del estado de ánimo</strong>
            </button>
          </h2>
          <div
            id="collapseTres"
            className="accordion-collapse collapse"
            aria-labelledby="headingTres"
            data-bs-parent="#beneficiosPerro"
          >
            <div className="accordion-body">
              El cariño incondicional de un perro puede reducir el estrés y la
              ansiedad. Acariciar a un perro, jugar con él o simplemente estar
              cerca del mismo, libera oxitocina, la hormona de la felicidad, ¡y
              a él también le haces feliz!
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingCuatro">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseCuatro"
              aria-expanded="false"
              aria-controls="collapseCuatro"
            >
              <strong>Responsabilidad para niños y adultos</strong>
            </button>
          </h2>
          <div
            id="collapseCuatro"
            className="accordion-collapse collapse"
            aria-labelledby="headingCuatro"
            data-bs-parent="#beneficiosPerro"
          >
            <div className="accordion-body">
              Tener un perro implica rutinas y cuidados diarios. Es ideal para
              enseñar a los niños la importancia de la responsabilidad y también
              ayuda a los adultos a estructurar mejor su tiempo. Además, también
              mantiene entretenidos a los más pequeños de casa.
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="https://www.aibamadrid.com/"
          target="_blank"
          className="btn btn-success"
        >
          Ver una protectora en Madrid
        </Link>
      </div>
    </div>
  );
}
