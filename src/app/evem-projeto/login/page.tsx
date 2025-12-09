// src/app/evem-projeto/login/page.tsx

"use client"

import Link from "next/link"

// 1. Importação do CSS (assumindo que o arquivo está em src/app/evem-projeto/src/login.css)
import "../src/login.css"
// OBS: Se você estiver usando Tailwind ou CSS Modules, a forma de importação seria diferente.

export default function LoginPage() {
  // Podemos adicionar estado básico para os inputs, embora não seja estritamente necessário para o JSX
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // **Lógica de Autenticação Real Viria Aqui**
    console.log("Tentativa de login...")

    // Redireciona para a página de eventos (substituindo o window.location.href='events.html')
    // Usamos Next.js Router para navegação programática, ou simplemente um Link como abaixo.

    // Simulação de sucesso: Navega para a rota de eventos
    window.location.href = "/evem-projeto/events"
    // Em um projeto real, você usaria 'useRouter' do next/navigation e router.push('/evem-projeto/events');
  }

  return (
    // O corpo do seu HTML é o conteúdo principal renderizado
    <div className="login-card">
      <h2>Login</h2>

      {/* 2. Conversão da tag <form> para React, usando onSubmit */}
      <form onSubmit={handleSubmit}>
        {/* 3. Input de Email: 'for' alterado para 'htmlFor' */}
        <div className="input-group">
          <label htmlFor="email-input">Email</label>
          <div className="input-wrapper">
            <input
              id="email-input"
              type="email"
              placeholder="seu@email.com"
              required
              // onChange={(e) => setEmail(e.target.value)} // Adicionar se for gerenciar estado
            />
          </div>
        </div>

        {/* 4. Input de Senha: 'for' alterado para 'htmlFor' */}
        <div className="input-group">
          <label htmlFor="password-input">Senha</label>
          <div className="input-wrapper">
            <input
              id="password-input"
              type="password"
              placeholder="******"
              required
              // onChange={(e) => setPassword(e.target.value)} // Adicionar se for gerenciar estado
            />
          </div>
        </div>

        {/* 5. Opções */}
        <div className="options">
          <label htmlFor="remember-me">
            <input type="checkbox" id="remember-me" /> Lembrar de mim
          </label>
          <a href="#" className="forgot-pass">
            Esqueceu a senha?
          </a>
        </div>

        <button type="submit" className="btn-login">
          Login
        </button>

        {/* 6. Links: <a> tags substituídas por <Link> do Next.js */}
        <div className="register-link">
          Não tem uma conta?{" "}
          <Link href="/evem-projeto/signup">Cadastre-se</Link>
        </div>

        <Link href="/evem-projeto" className="back-link">
          ← Voltar para o site
        </Link>
      </form>
    </div>
  )
}
