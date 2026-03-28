import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/FormInput";
import logo from "../../assets/logo.avif";
import { useLoginLogic } from "./login";

export default function Login() {
  const { register, handleSubmit, errors, onSubmit, showTooltip } =
    useLoginLogic();

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      <div className="order-2 md:order-1 flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-4"
        >
          <h1 className="text-xl font-bold text-center">Login</h1>

          <div>
            <FormInput
              placeholder="Email"
              register={register("email", {
                required: "Email obrigatório",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email inválido",
                },
              })}
              error={errors.email}
            />
          </div>

          <div>
            <FormInput
              placeholder="Senha"
              type="password"
              register={register("password", {
                required: "Senha obrigatória",
              })}
              error={errors.password}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#014328] text-white hover:bg-[#012f1f]"
          >
            Entrar
          </Button>

          {showTooltip && (
            <p className="text-red-500 text-sm text-center">Email inválido</p>
          )}
        </form>
      </div>

      <div className="order-1 md:order-2 flex flex-col items-center justify-start w-full md:w-1/2 bg-[#014328] p-10">
        <img
          src={logo}
          alt="Logo"
          className="w-90 md:w-130 object-contain p-4 md:mt-10"
        />
        <span className="text-white text-sm md:text-lg font-medium text-center">
          Soluções financeiras que acompanham você
        </span>
      </div>
    </div>
  );
}
