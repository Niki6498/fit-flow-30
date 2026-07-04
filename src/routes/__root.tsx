import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <div className="glass max-w-sm rounded-3xl p-8 text-center">
        <h1 className="gradient-text text-6xl font-bold">404</h1>
        <p className="mt-3 text-sm text-muted-foreground">Diese Seite existiert nicht.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-2xl gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground glow-primary"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <div className="glass max-w-sm rounded-3xl p-8 text-center">
        <h1 className="text-lg font-semibold">Etwas ist schiefgelaufen</h1>
        <p className="mt-2 text-sm text-muted-foreground">Bitte versuche es erneut.</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 inline-flex items-center justify-center rounded-2xl gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground glow-primary"
        >
          Neu laden
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Pulse — Fitness Tracker" },
      { name: "description", content: "Tracke Läufe, Radtouren, HIIT und mehr. Live-Metriken, Gesundheitsdaten und Ziele in einer modernen App." },
      { property: "og:title", content: "Pulse — Fitness Tracker" },
      { property: "og:description", content: "Moderne Fitness-App mit Live-Tracking, Gesundheitsdaten und Community." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
