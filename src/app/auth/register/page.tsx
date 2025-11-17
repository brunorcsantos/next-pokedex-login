"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { redirect, RedirectType, useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPokemon() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("❌ The passwords don't match!");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      toast.success("✔️ Account created successfully!");

      setTimeout(() => {
        router.push("/pokedex");
      }, 1000);
    } catch (error: any) {
      toast.error("❌ Erro ao criar conta: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-blue-50 flex sm:items-center sm:justify-center sm:p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md sm:rounded-2xl shadow-2xl sm:border-2 sm:border-gray-100 overflow-hidden">
        {/* Header com estampa PokéBall + título */}
        <header className="flex items-center gap-4 px-8 py-6 bg-gradient-to-r from-red-500  to-blue-600">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/20 border-2 border-white/40">
            {/* Poké Ball simplificada */}
            <svg viewBox="0 0 100 100" className="w-10 h-10">
              <circle cx="50" cy="50" r="44" fill="#fff" />
              <path d="M6 50a44 44 0 0 0 88 0" fill="#fff" />
              <path d="M6 50a44 44 0 0 1 88 0" fill="#ee3b3b" />
              <circle
                cx="50"
                cy="50"
                r="16"
                fill="#fff"
                stroke="#333"
                strokeWidth="4"
              />
              <circle cx="50" cy="50" r="8" fill="#333" />
            </svg>
          </div>

          <div>
            <h1 className="text-white text-2xl font-extrabold tracking-tight">
              Pokémon Trainer
            </h1>
            <p className="text-white/90 text-sm">Entrar na sua conta</p>
          </div>
        </header>

        <section className="px-8 py-8">
          <form
            action="#"
            className="space-y-6"
            onSubmit={handleLogin}
            method="POST"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuário
              </label>
              <input
                name="username"
                placeholder="ex: ash.ketchum"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition"
                onChange={(e: any) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
                onChange={(e: any) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirme sua Senha
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
                onChange={(e: any) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-green-500 rounded"
                />
                <span className="text-gray-600">Lembre-se de mim</span>
              </label>

              <a
                href="#"
                className="text-sm font-medium text-indigo-600 hover:underline"
              >
                Esqueceu a senha?
              </a>
            </div> */}

            <div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold shadow-md bg-gradient-to-r from-red-500 to-yellow-400 text-white hover:scale-[1.01] transform transition"
              >
                Register
              </button>
            </div>
          </form>

          {/* <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white">ou entrar com</span>
              </div>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-3">
              <a href="#" className="flex items-center justify-center gap-2 py-2 rounded-lg border-2 border-gray-200 bg-white hover:shadow-sm">
              <span className="w-6 h-6 rounded-full flex items-center justify-center bg-red-100 text-red-600 font-bold">F</span>
              <span className="text-xs font-medium">Fire</span>
              </a>
              
              <a href="#" className="flex items-center justify-center gap-2 py-2 rounded-lg border-2 border-gray-200 bg-white hover:shadow-sm">
              <span className="w-6 h-6 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold">W</span>
              <span className="text-xs font-medium">Water</span>
              </a>
              
              <a href="#" className="flex items-center justify-center gap-2 py-2 rounded-lg border-2 border-gray-200 bg-white hover:shadow-sm">
              <span className="w-6 h-6 rounded-full flex items-center justify-center bg-green-100 text-green-600 font-bold">G</span>
              <span className="text-xs font-medium">Grass</span>
              </a>
              </div>
              </div> */}

          <p className="mt-6 text-center text-sm text-gray-500">
            Have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-purple-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </section>

        {/* <footer className="px-8 py-4 border-t border-gray-100 bg-gradient-to-r from-white/40 to-white/10">
          <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Versão Trainer • 1.0</span>
          <span>© Pokémon</span>
          </div>
          </footer> */}
      </div>
      <ToastContainer />
    </div>
  );
}
