import { api } from "@/lib/api";
import { request } from "http";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { FormEvent, useState } from "react";

export default function FormRegister() {
  const router = useRouter();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const retorno = await api.post("/usuario/register", {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (retorno.data == "nonexistent") {
      alert("Usuário Inexistente");
    }
    const { token } = retorno.data;
    router.push(`/api/auth/login?token=${token}`);
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-6 grid grid-rows-3 gap-2">
        <div className="grid grid-cols-2 gap-5">
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Primeiro Nome"
          />
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Último Nome"
          />
        </div>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="Email"
        />
        <input
          type="password"
          id="password"
          name="password"
          className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="Senha"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-[#312ECB] px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
      >
        Cadastrar
      </button>
    </form>
  );
}
