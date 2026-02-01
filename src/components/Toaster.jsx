import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-4 right-4 z-9999 flex flex-col gap-3 w-[360px] max-w-[calc(100vw-2rem)]">
      {toasts.map((t) => {
        if (t.open === false) return null;

        return (
          <div
            key={t.id}
            className={`rounded-lg border bg-background shadow-lg p-4 ${
              t.variant === "destructive" ? "border-red-500/40" : "border-border"
            }`}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                {t.title ? <div className="font-semibold">{t.title}</div> : null}
                {t.description ? (
                  <div className="text-sm text-muted-foreground mt-1">
                    {t.description}
                  </div>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() => dismiss(t.id)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
