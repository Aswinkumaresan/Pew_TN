// Shared offences selector used across Source Reports, Accused Profiles, and CIU Initiated forms

export const OFFENCE_LIST = [
  "F.Wash",
  "ID Arrack",
  "Pondy Arrack",
  "AP ID Arrack",
  "Rectified Spirit",
  "Spurious Liquor",
  "Pondy IMFL",
  "KA IMFL",
  "TN IMFL",
  "Foreign Liquor",
  "Military Liquor",
  "Toddy",
  "Ganja",
  "Illegal Bar",
  "Violation of FL-1 Bar",
  "Violation of FL-2 Bar",
  "Violation of FL-3 Bar",
] as const;

interface OffencesSelectorProps {
  selected: string[];
  onChange: (offences: string[]) => void;
}

export function OffencesSelector({ selected, onChange }: OffencesSelectorProps) {
  const toggle = (offence: string) => {
    onChange(
      selected.includes(offence)
        ? selected.filter((o) => o !== offence)
        : [...selected, offence]
    );
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {OFFENCE_LIST.map((offence) => {
          const active = selected.includes(offence);
          return (
            <button
              key={offence}
              type="button"
              onClick={() => toggle(offence)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
              style={{
                background: active ? "hsl(var(--primary))" : "transparent",
                color: active ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                borderColor: active ? "hsl(var(--primary))" : "hsl(var(--border))",
              }}
            >
              {active && (
                <svg className="h-3 w-3 shrink-0" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {offence}
            </button>
          );
        })}
      </div>
      {selected.length > 0 && (
        <p className="text-xs text-muted-foreground mt-2">
          {selected.length} offence{selected.length > 1 ? "s" : ""} selected:{" "}
          <span className="font-semibold text-foreground">{selected.join(", ")}</span>
        </p>
      )}
    </div>
  );
}
