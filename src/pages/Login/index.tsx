import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "../../assets/logo.avif";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const email = watch("email");
  const password = watch("password");

  function onSubmit(data: FormData) {
    console.log(data);
  }

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000); 
      return;
    }

    if (!password || password.trim() === "") {
      alert("A senha não pode ser vazia.");
      return;
    }

    navigate("/dashboard"); // Navega para a tela de Dashboard
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      <div className="order-2 md:order-1 flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-6 mt-1 md:mt-0 md:mb-20 md:min-h-[80vh]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-4"
        >
          <h1 className="text-xl font-bold text-center">Login</h1>

          <div>
            <Input
              placeholder="Email"
              {...register("email", {
                required: "Email obrigatório",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email inválido",
                },
              })}
              className={errors.email ? "border-red-500" : ""}
            />

            {errors.email?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Senha"
              type="password"
              {...register("password", {
                required: "Senha obrigatória",
              })}
              className={errors.password ? "border-red-500" : ""}
            />

            {errors.password?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button className="w-full bg-[#014328] text-white hover:bg-[#012f1f]" onClick={handleLogin}>
            Entrar
          </Button>
        </form>
      </div>

      <div className="order-1 md:order-2 flex flex-col items-center justify-start w-full md:w-1/2 bg-[#014328] p-10 pt-10 md:pt-6">
        <img
          src={logo}
          alt="Logo"
          className="w-90 md:w-130 object-contain p-4 mt-0 md:mt-28"
        />
        <span className="text-white text-sm md:text-lg font-medium text-center">
          Soluções financeiras que acompanham você
        </span>
      </div>
    </div>
  );
}
