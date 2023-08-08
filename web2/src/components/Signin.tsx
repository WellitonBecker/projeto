"use client";
import React, { useState } from "react";
import SigninGoogle from "./SigninGoogle";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import {
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { env } from "process";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const clientId = '1054944506097-m2qg8evnp40lnbgr8tnibcasf7k62tmd.apps.googleusercontent.com'

  return (
    <GoogleOAuthProvider clientId={clientId} >
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="w-full max-w-xl bg-slate-50 p-8 rounded-3xl border border-gray-100">
          <h2 className="text-2xl font-bold mb-1">
            {isLogin ? "Bem vindo de volta" : "Criar uma conta"}
          </h2>
          <h4 className="mb-4">
            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
            <a
              className="text-[#312ECB] cursor-pointer"
              onClick={() => {
                setIsLogin(!isLogin);
              }}
            >
              {isLogin ? " Registre-se" : " Login"}
            </a>
          </h4>
          {isLogin ? <FormLogin /> : <FormRegister />}
          <div className="flex items-center justify-center my-5">
            <div className="border-b-2 border-gray-200 w-full"></div>
            <div className="mx-2 text-black text-base bg-white px-2">Ou</div>
            <div className="border-b-2 border-gray-200 w-full"></div>
          </div>
          <SigninGoogle />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
