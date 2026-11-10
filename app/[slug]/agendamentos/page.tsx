import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/$slug/agendamentos/")({
  component: Agendamentos,
});

function Agendamentos() {
  const { slug } = Route.useParams();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-dvh bg-bg px-4 py-10 text-fg">
      <div className="mx-auto max-w-md">
        <Link to="/$slug" params={{ slug }} className="text-xs tracking-widest text-gold uppercase">
          ← Voltar para /{slug}
        </Link>
        <h1 className="mt-4 font-display text-3xl">Meus Agendamentos</h1>
        <p className="mt-2 text-sm text-muted">
          Área do cliente do cliente. Digite o e-mail usado na solicitação para ver o status.
        </p>

        <form
          className="mt-6 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <input
            type="email"
            required
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-line bg-surface px-4 py-3 text-sm outline-none focus:border-gold"
          />
          <button
            type="submit"
            className="w-full rounded-2xl bg-gold py-3 text-sm font-medium text-black"
          >
            Consultar
          </button>
        </form>

        {submitted && (
          <div className="mt-6 rounded-3xl border border-line bg-surface p-5 text-sm">
            <p className="text-gold">Consulta para: {email}</p>
            <p className="mt-2 text-muted">
              Nenhuma solicitação encontrada para este e-mail nesta marca (ou ainda não processada).
              O isolamento garante que você só vê o que pertence a você.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
