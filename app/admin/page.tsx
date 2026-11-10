import { createFileRoute, Link } from "@tanstack/react-router";
import { RedirectToSignIn, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/admin/")({
  component: AdminGeral,
});

function AdminGeral() {
  const { user, isPending } = useCurrentUserState();

  if (isPending) return <main className="grid min-h-dvh place-items-center">Carregando…</main>;
  if (!user) return <RedirectToSignIn />;

  const isMaster = user.email === "tarcisiodiasdarocha@gmail.com";

  return (
    <main className="min-h-dvh bg-bg px-4 py-8 text-fg">
      <header className="mx-auto flex max-w-5xl items-center justify-between">
        <div>
          <Link to="/" className="text-xs tracking-widest text-gold uppercase">← Apresentação</Link>
          <h1 className="font-display text-4xl">Admin Geral</h1>
          <p className="text-sm text-muted">Gestão de usuários, políticas e LGPD</p>
        </div>
        <UserButton />
      </header>

      {!isMaster ? (
        <p className="mx-auto mt-12 max-w-5xl text-gold">Acesso restrito ao administrador master.</p>
      ) : (
        <div className="mx-auto mt-8 max-w-5xl space-y-6">
          <section className="rounded-3xl border border-line bg-surface p-6">
            <h2 className="text-xl font-semibold">Usuários e marcas</h2>
            <p className="mt-2 text-sm text-muted">
              Cada AdminCliente possui um slug único (<code>/{'{slug}'}</code>). 
              Aqui você pode revogar acessos e ver todas as marcas.
            </p>
            <div className="mt-4 rounded-2xl bg-bg p-4 text-sm">
              Master: <strong>tarcisiodiasdarocha@gmail.com</strong> · slug: <strong>tarcisio</strong>
            </div>
          </section>

          <section className="rounded-3xl border border-line bg-surface p-6">
            <h2 className="text-xl font-semibold">Políticas</h2>
            <ul className="mt-2 list-inside list-disc text-sm text-muted">
              <li>Cookies e LGPD: consentimento obrigatório no primeiro acesso</li>
              <li>Isolamento total por owner_email</li>
              <li>Slugs únicos verificados na tabela brands</li>
            </ul>
          </section>
        </div>
      )}
    </main>
  );
}
