export function Header() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4">
      <h1
        className="text-xl text-gray-500 cursor-pointer"
        onClick={handleReload}
      >
        Inflation Narrative
      </h1>
    </header>
  );
}
