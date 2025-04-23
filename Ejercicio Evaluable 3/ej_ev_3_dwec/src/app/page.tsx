import Destacada from "./components/razaDestacada";

export default function Home() {
  return (
    <div>
      <main className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold mt-6">
          BarkAlley, tu enciclopedia perruna
        </h1>
        <p className="mt-2 text-lg">
          Explora diferentes razas y encuentra a tu amigo peludo favorito 🐶
        </p>
        <Destacada />
      </main>
    </div>
  );
}
