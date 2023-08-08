import { useState } from "react";

export default function FormRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();
    // Lógica para fazer login com o e-mail e senha
    console.log("Login com e-mail e senha:", email, password);
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-6 grid grid-rows-3 gap-2">
        <div className="grid grid-cols-2 gap-5">
          <input
            type="text"
            id="firstName"
            className="w-full px-4 py-2 mt-2 rounded-md border border-gray-300 focus:ring focus:ring-opacity-50 focus:ring-blue-500 focus:outline-none"
            placeholder="Primeiro Nome"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            id="lastName"
            className="w-full px-4 py-2 mt-2 rounded-md border border-gray-300 focus:ring focus:ring-opacity-50 focus:ring-blue-500 focus:outline-none"
            placeholder="Último Nome"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 mt-2 rounded-md border border-gray-300 focus:ring focus:ring-opacity-50 focus:ring-blue-500 focus:outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 mt-2 rounded-md border border-gray-300 focus:ring focus:ring-opacity-50 focus:ring-blue-500 focus:outline-none"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-[#312ECB] text-white rounded-md hover:bg-blue-600 transition duration-300"
      >
        Entrar
      </button>
    </form>
  );
}
