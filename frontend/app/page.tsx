import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h1>Мое приложение</h1>
      <p>Это моя первая страница на Next.js</p>
      <a
        href="/login"
        className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white"
      >
        Войти
      </a>
    </main>
  );
}
