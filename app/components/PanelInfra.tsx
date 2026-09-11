"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import type { EstadoInfra } from "@/lib/infraestructura";

export default function PanelInfra({ estado }: { estado: EstadoInfra }) {
  const { t, locale } = useTranslation();
  const [encendidos, setEncendidos] = useState(0);

  useEffect(() => {
    const prefiereQuieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefiereQuieto) {
      setEncendidos(estado.servicios.length);
      return;
    }
    const temporizadores = estado.servicios.map((_, i) =>
      setTimeout(() => setEncendidos((n) => Math.max(n, i + 1)), 120 + i * 40)
    );
    return () => temporizadores.forEach(clearTimeout);
  }, [estado.servicios.length, estado.servicios]);

  const activos = estado.servicios.filter((s) => s.estado === "activo").length;
  const fecha = new Date(estado.verificadoEn).toLocaleDateString(
    locale === "en" ? "en-US" : "es-MX",
    { day: "numeric", month: "short", year: "numeric" }
  );

  return (
    <div className="w-full rounded-lg border border-[var(--line)] bg-[var(--surface)] font-mono text-sm">
      <div className="border-b border-[var(--line)] px-4 py-3">
        <p className="font-medium text-[var(--text)]">{t.infra.titulo}</p>
        <p className="mt-1 text-xs text-[var(--dim)]">{t.infra.specs}</p>
      </div>

      <ul className="px-4 py-3">
        {estado.servicios.map((servicio, i) => {
          const visible = i < encendidos;
          const activo = servicio.estado === "activo";
          return (
            <li
              key={servicio.nombre}
              className="flex items-center gap-3 py-1.5 transition-opacity duration-300"
              style={{ opacity: visible ? 1 : 0 }}
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: activo ? "var(--live)" : "var(--dim)" }}
              />
              <span className="text-[var(--text)]">{servicio.nombre}</span>
              <span className="ml-auto text-xs text-[var(--dim)]">
                {activo ? t.infra.activo : t.infra.inactivo}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-[var(--line)] px-4 py-3 text-xs text-[var(--dim)]">
        <p>
          <span className="text-[var(--signal)]">{activos}</span>/{estado.servicios.length}{" "}
          {t.infra.activos}
        </p>
        <p className="mt-1">{t.infra.verificado} · {fecha}</p>
      </div>
    </div>
  );
}
