import { useGoogleLogin } from "@react-oauth/google";

export default function SigninGoogle() {
  // const handleGoogleLogin = () => {
  //   // Lógica para fazer login com o Google OAuth
  //   console.log("Login com Google");
  // };
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    onError: () => console.log("Error"),
    flow: "auth-code",
  });
  return (
    <a
      onClick={() => login()}
      className="flex items-center justify-center bg-white text-blue-500 border border-blue-500 rounded-md px-4 py-2 space-x-2 hover:bg-blue-100"
    >
      <img src="google_logo.png" alt="Google Logo" className="w-5 h-5" />
      <span>Login com Google</span>
    </a>
  );
}
