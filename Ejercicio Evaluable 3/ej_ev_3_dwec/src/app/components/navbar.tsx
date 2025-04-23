"use client";
import React from "react";
import Link from "next/link";

const navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Inicio</Link>
        </li>
        <li>
          <Link href="/razas">Lista de Razas</Link>
        </li>
        <li>
          <Link href="/porQueAdoptar">¿Por qué adoptar un perro?</Link>
        </li>
      </ul>
    </nav>
  );
};

export default navbar;
