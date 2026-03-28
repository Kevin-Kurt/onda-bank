import { useState } from "react";

export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
}

export function useDashboardLogic(initialBalance: number, initialTransactions: Transaction[]) {
  const [balance, setBalance] = useState(initialBalance);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [modalOpen, setModalOpen] = useState(false);

  function transferir(valor: number, chave: string) {
    setBalance((prev) => prev - valor);
    setTransactions((prev) => [
      { id: Date.now(), date: new Date().toLocaleDateString("pt-BR"), description: "Transferência", amount: -valor },
      ...prev,
    ]);
    setModalOpen(false);
  }

  return {
    balance,
    setBalance,
    transactions,
    setTransactions,
    modalOpen,
    setModalOpen,
    transferir,
  };
}
