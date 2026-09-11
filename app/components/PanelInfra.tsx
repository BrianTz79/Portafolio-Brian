"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useTranslation } from "@/lib/i18n";
import type { EstadoInfra, Servicio } from "@/lib/infraestructura";

/** Arranque del reporte, encadenado con la secuencia de entrada del hero. */
const RETARDO_BASE = 560;
const PASO = 70;

/* Periodos primos (en segundos) para el latido continuo: al no tener divisores
   comunes, los ocho puntos nunca se sincronizan y el panel no "parpadea" a la
   vez. Es la senal de que los servicios siguen corriendo mientras alguien lee. */
const PERIODOS = [4.3, 5.1, 3.7, 6.1, 4.7, 5.9, 3.1, 6.7];

/** Los servicios mas lentos entran despues: el retardo es el dato, no adorno. */
function retardoDe(servicios: Servicio[], i: number): number {
  const propio = servicios[i].ms;
  const medidos = servicios.map((s) => s.ms).filter((v): v is number => typeof v === "number");
  if (typeof propio !== "number" || medidos.length < 2) {
    return RETARDO_BASE + i * PASO;
  }
  const minimo = Math.min(...medidos);
  const maximo = Math.max(...medidos);
  const rango = maximo - minimo;
  // Sin dispersion apreciable, el orden del array manda.
  if (rango < 1) return RETARDO_BASE + i * PASO;
  const proporcion = (propio - minimo) / rango;
  return Math.round(RETARDO_BASE + proporcion * PASO * (servicios.length - 1));
}

export default function PanelInfra({ estado }: { estado: EstadoInfra }) {
  const { t, locale } = useTranslation();
  const [reportando, setReportando] = useState(false);
  const contenedor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodo = contenedor.current;
    if (!nodo) return;
    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas[0].isIntersecting) {
          setReportando(true);
          observador.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  const activos = estado.servicios.filter((s) => s.estado === "activo").length;
  const fecha = new Date(estado.verificadoEn).toLocaleDateString(
    locale === "en" ? "en-US" : "es-MX",
    { day: "numeric", month: "short", year: "numeric" }
  );

  const retardos = estado.servicios.map((_, i) => retardoDe(estado.servicios, i));
  const retardoPie = Math.max(...retardos, RETARDO_BASE) + 200;

  return (
    <div
      ref={contenedor}
      data-reportando={reportando ? "" : undefined}
      className="panel-infra w-full rounded-lg border border-[var(--line)] bg-[var(--surface)] font-mono text-sm"
    >
      <div className="border-b border-[var(--line)] px-4 py-3">
        <p className="font-medium text-[var(--text)]">{t.infra.titulo}</p>
        <p className="mt-1 text-xs text-[var(--dim)]">{t.infra.specs}</p>
      </div>

      <ul className="px-4 py-3">
        {estado.servicios.map((servicio, i) => {
          const activo = servicio.estado === "activo";
          return (
            <li
              key={servicio.nombre}
              className="fila-servicio flex items-center gap-3 py-1.5"
              style={
                {
                  "--d": `${retardos[i]}ms`,
                  "--periodo": `${PERIODOS[i % PERIODOS.length]}s`,
                } as CSSProperties
              }
            >
              <span
                aria-hidden="true"
                className="punto-estado h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: activo ? "var(--live)" : "var(--dim)" }}
              />
              <span className="text-[var(--text)]">{servicio.nombre}</span>
              <span className="veredicto ml-auto flex items-center gap-2 text-xs text-[var(--dim)]">
                {typeof servicio.ms === "number" && (
                  <span className="tabular-nums opacity-70">{servicio.ms}&nbsp;ms</span>
                )}
                {activo ? t.infra.activo : t.infra.inactivo}
              </span>
            </li>
          );
        })}
      </ul>

      <div
        className="pie-panel border-t border-[var(--line)] px-4 py-3 text-xs text-[var(--dim)]"
        style={{ "--d": `${retardoPie}ms` } as CSSProperties}
      >
        <p>
          <span className="text-[var(--signal-sur)]">{activos}</span>/{estado.servicios.length}{" "}
          {t.infra.activos}
        </p>
        <p className="mt-1">{t.infra.verificado} · {fecha}</p>
      </div>
    </div>
  );
}
