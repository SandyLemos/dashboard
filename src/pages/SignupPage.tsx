import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type Step = "selection" | "participant" | "organizer";

export default function SignupPage() {
  const [step, setStep] = useState<Step>("selection");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de cadastro
    console.log("Cadastro realizado!");
    navigate("/events");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1a0b2e] bg-[url('/img/fundo-hero.png')] bg-cover bg-center p-4">
      
      {/* Container do Card com animação suave */}
      <div className="w-full max-w-[500px] p-8 rounded-2xl border border-white/10 bg-[#1e0a32]/70 backdrop-blur-xl shadow-2xl text-center text-white transition-all duration-300">
        
        <h2 className="text-3xl font-bold mb-2">Cadastro</h2>
        
        {/* --- PASSO 1: SELEÇÃO --- */}
        {step === "selection" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <p className="text-gray-300 mb-8">Selecione o tipo de usuário</p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <button 
                onClick={() => setStep("participant")}
                className="px-8 py-3 rounded-full border border-[#d62f98] text-white font-bold hover:bg-[#d62f98] hover:shadow-[0_0_15px_#d62f98] transition-all"
              >
                Participante
              </button>
              <button 
                onClick={() => setStep("organizer")}
                className="px-8 py-3 rounded-full border border-[#d62f98] text-white font-bold hover:bg-[#d62f98] hover:shadow-[0_0_15px_#d62f98] transition-all"
              >
                Organizador
              </button>
            </div>

            <div className="text-sm text-gray-400">
              Já tem uma conta? <Link to="/login" className="text-[#eebb58] font-bold hover:underline">Login</Link>
            </div>
          </div>
        )}

        {/* --- PASSO 2: FORMULÁRIO PARTICIPANTE --- */}
        {step === "participant" && (
          <form onSubmit={handleSubmit} className="text-left animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="inline-block px-4 py-1 rounded-full border border-[#d62f98] bg-[#d62f98]/20 text-xs font-bold mb-6 mx-auto">
              Participante
            </div>

            <div className="space-y-4">
              <InputGroup label="Nome" id="p_name" type="text" />
              <InputGroup label="Email" id="p_email" type="email" />
              <div className="grid grid-cols-2 gap-4">
                <InputGroup label="Senha" id="p_password" type="password" />
                <InputGroup label="Confirmar Senha" id="p_confirm" type="password" />
              </div>
            </div>

            <button type="submit" className="w-full mt-8 bg-[#1a0b2e] border border-white/20 hover:border-[#d62f98] hover:bg-[#d62f98] text-white font-bold py-3 rounded-lg transition-all shadow-lg">
              Cadastrar
            </button>
            
            <button type="button" onClick={() => setStep("selection")} className="w-full mt-4 text-sm text-gray-400 hover:text-white underline">
              Voltar
            </button>
          </form>
        )}

        {/* --- PASSO 3: FORMULÁRIO ORGANIZADOR --- */}
        {step === "organizer" && (
          <form onSubmit={handleSubmit} className="text-left animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="inline-block px-4 py-1 rounded-full border border-[#d62f98] bg-[#d62f98]/20 text-xs font-bold mb-6">
              Organizador
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <InputGroup label="Nome da Empresa" id="o_company" type="text" />
              <div className="grid grid-cols-2 gap-4">
                <InputGroup label="CNPJ / CPF" id="o_doc" type="text" />
                <InputGroup label="Telefone" id="o_phone" type="text" />
              </div>
              <InputGroup label="Email Corporativo" id="o_email" type="email" />
              
              <div className="pt-4 border-t border-white/10">
                <span className="text-[#eebb58] text-sm font-bold bg-[#2a1540] px-2">Endereço</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2"><InputGroup label="Cidade" id="o_city" type="text" /></div>
                <InputGroup label="CEP" id="o_cep" type="text" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputGroup label="Rua" id="o_street" type="text" />
                <InputGroup label="Bairro" id="o_district" type="text" />
              </div>
            </div>

            <button type="submit" className="w-full mt-6 bg-[#1a0b2e] border border-white/20 hover:border-[#d62f98] hover:bg-[#d62f98] text-white font-bold py-3 rounded-lg transition-all shadow-lg">
              Cadastrar
            </button>
            
            <button type="button" onClick={() => setStep("selection")} className="w-full mt-4 text-sm text-gray-400 hover:text-white underline">
              Voltar
            </button>
          </form>
        )}

        {/* Link Voltar para Home (Sempre visível se não estiver nos forms) */}
        {step === "selection" && (
          <Link to="/" className="block mt-6 text-sm text-gray-500 hover:text-white transition flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Voltar para o site
          </Link>
        )}
      </div>
    </div>
  );
}

// Componente auxiliar para Input (estilo linha apenas embaixo)
const InputGroup = ({ label, id, type }: { label: string, id: string, type: string }) => (
  <div className="relative group">
    <label htmlFor={id} className="block text-xs font-bold text-gray-300 mb-1 group-focus-within:text-[#d62f98] transition-colors">
      {label}
    </label>
    <input
      id={id}
      type={type}
      required
      className="w-full bg-transparent border-b border-white/30 py-2 text-white outline-none focus:border-[#d62f98] transition-colors placeholder-transparent"
    />
  </div>
);