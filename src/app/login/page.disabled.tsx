"use client";

import { useState } from "react";
import { showToast } from "nextjs-toast-notify";
import { useRouter } from "next/navigation";

const loginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast.error(data?.message || "Login falhou.", {
          duration: 4000,
          position: "top-left",
          progress: false,
          transition: "swingInverted",
        });
        return;
      }
      console.log("Post created:", data);

      setEmail("");
      setPassword("");
      showToast.success("Login succesfull", {
        duration: 3000,
        progress: false,
        position: "top-left",
        transition: "popUp",
        icon: "",
        sound: false,
      });

      localStorage.setItem("Bearer", data.token);

      router.push("/")
    } catch (error: any) {
      showToast.error("Erro de conexão. Tente novamente.", {
        duration: 4000,
        position: "top-left",
        progress: false,
        transition: "swingInverted",
      });
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex justify-center items-center flex-col w-[40%] gap-2 h-screen"
    >
      <label>E-mail</label>
      <input
        type="text"
        className="border rounded p-1"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Senha</label>
      <input
        type="password"
        className="border rounded p-1"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="border rounded-md px-4 py-1 bg-sky-500 mt-10">
        Login
      </button>
    </form>
  );
};

export default loginPage;
