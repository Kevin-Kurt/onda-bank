import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { saveSession, getSession } from "@/lib/session";

type FormData = {
  email: string;
  password: string;
};

export function useLoginLogic() {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  function onSubmit(data: FormData) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email)) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    }

    if (!data.password || data.password.trim() === "") {
      alert("A senha não pode ser vazia.");
      return;
    }

    const fakeToken = "exampleToken123";
    saveSession(fakeToken);
    navigate("/dashboard");
  }

  useEffect(() => {
    const session = getSession();
    if (session) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showTooltip,
  };
}