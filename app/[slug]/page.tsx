import { createFileRoute, Link } from "@tanstack/react-router";
import { Showcase } from "@/components/showcase";

export const Route = createFileRoute("/$slug/")({
  component: BrandPage,
});

function BrandPage() {
  const { slug } = Route.useParams();

  return (
    <div>
      <div className="fixed left-4 top-4 z-50 rounded-full bg-black/60 px-3 py-1 text-xs text-gold backdrop-blur">
        Marca: /{slug}
      </div>
      <Showcase />
      <div className="fixed bottom-4 right-4 z-50">
        <Link
          to="/$slug/agendamentos"
          params={{ slug }}
          className="rounded-full bg-gold px-4 py-2 text-sm font-medium text-black"
        >
          Ver meus agendamentos
        </Link>
      </div>
    </div>
  );
}
