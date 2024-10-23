export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      Server is running at{" "}
      <a
        href="http://localhost:4000"
        className="text-cyan-200 ml-1 hover:border-b hover:border-cyan-100"
      >
        http://localhost:4000
      </a>
    </div>
  );
}
