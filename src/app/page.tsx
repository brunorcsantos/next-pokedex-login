"use client";

const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem("Bearer");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        className="bg-blue-500 text-white p-6 rounded-lg shadow-lg cursor-pointer"
        onClick={handleLogout}
      >
        Centralizado!
      </button>
    </div>
  );
};

export default Home;
