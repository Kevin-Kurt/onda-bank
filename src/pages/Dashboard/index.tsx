import { useEffect, useState } from "react";
import logo from "@/assets/logo.avif";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/transferModal";
import { FormInput } from "@/components/ui/FormInput";
import { useForm } from "react-hook-form";

const mockTransactions = [
  { id: 1, date: "28/03/2026", description: "Depósito", amount: 4300 },
  {
    id: 2,
    date: "27/03/2026",
    description: "Transferência recebida",
    amount: 2000,
  },
  { id: 3, date: "26/03/2026", description: "Pagamento", amount: -1200 },
  { id: 4, date: "25/03/2026", description: "Saque", amount: -1300 },
  {
    id: 5,
    date: "24/03/2026",
    description: "Transferência recebida",
    amount: 2000,
  },
  { id: 6, date: "23/03/2026", description: "Pagamento", amount: -1400 },
  { id: 7, date: "22/03/2026", description: "Saque", amount: -1500 },
];

function saveBalanceToLocalStorage(newBalance: number) {
  localStorage.setItem("saldoDisponivel", newBalance.toString());
}

function saveTransactionsToLocalStorage(transactions: typeof mockTransactions) {
  localStorage.setItem("transacoes", JSON.stringify(transactions));
}

function loadTransactionsFromLocalStorage(): typeof mockTransactions | null {
  const saved = localStorage.getItem("transacoes");
  if (saved) return JSON.parse(saved);
  return null;
}

export default function Dashboard() {
  const [balance, setBalance] = useState(10000);
  const [transactions, setTransactions] = useState(() => loadTransactionsFromLocalStorage() || mockTransactions);
  const [modalOpen, setModalOpen] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setError } = useForm({
    defaultValues: { valor: "", chave: "" },
  });

  useEffect(() => {
    const saved = localStorage.getItem("saldoDisponivel");
    if (saved) setBalance(Number(saved));
  }, []);

  function handleTransferir(data: { valor: string; chave: string }) {
    const valorNumerico = data.valor.replace(/[^\d,\.]/g, "").replace(/\./g, "").replace(",", ".");
    const valor = parseFloat(valorNumerico);
    if (isNaN(valor) || valor <= 0) {
      setError("valor", { message: "Informe um valor válido" });
      return;
    }
    if (valor > balance) {
      setError("valor", { message: "Valor não pode passar o saldo disponível" });
      return;
    }
    const novoSaldo = balance - valor;
    setBalance(novoSaldo);
    saveBalanceToLocalStorage(novoSaldo);
    const novaLista = [
      { id: Date.now(), date: new Date().toLocaleDateString("pt-BR"), description: "Transferência", amount: -valor },
      ...transactions,
    ];
    setTransactions(novaLista);
    saveTransactionsToLocalStorage(novaLista);
    setModalOpen(false);
    reset();
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col items-center w-full md:w-1/3 bg-[#014328] text-white p-8 md:relative z-10 md:z-auto fixed top-0 left-0 right-0 md:static">
        <img
          src={logo}
          alt="Logo"
          className="w-50 h-16 object-contain p-2 mb-2 mt-2 mx-auto"
        />
        <h2 className="text-lg font-semibold mb-2">Saldo disponível</h2>
        <span className="text-2xl md:text-4xl font-bold">
          R$ {balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </span>
        <Button className="mt-6 w-full md:w-auto bg-white text-[#014328] font-bold hover:bg-gray-100" onClick={() => setModalOpen(true)}>
          Transferir
        </Button>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4 text-[#014328] text-center">Transferir</h2>
        <form onSubmit={handleSubmit(handleTransferir)} className="space-y-4">
          <FormInput
            placeholder="Valor a transferir"
            type="text"
            register={register("valor", { required: "Informe o valor" })}
            error={errors.valor}
            mask="currency"
          />
          <FormInput
            placeholder="Chave"
            register={register("chave", { required: "Informe a chave" })}
            error={errors.chave}
          />
          <Button type="submit" className="w-full bg-[#014328] text-white font-bold hover:bg-[#012f1f]">Confirmar transferência</Button>
        </form>
      </Modal>

      <div className="flex-1 bg-white p-8 overflow-auto mt-65 md:mt-0">
        <h2 className="text-lg font-semibold mb-4">Transações recentes</h2>
        <ul className="space-y-4">
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <div className="font-medium">{tx.description}</div>
                <div className="text-xs text-gray-500">{tx.date}</div>
              </div>
              <div
                className={
                  tx.amount >= 0
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }
              >
                {tx.amount >= 0 ? "+" : "-"}R${" "}
                {Math.abs(tx.amount).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
