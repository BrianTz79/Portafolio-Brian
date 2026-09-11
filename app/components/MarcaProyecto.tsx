import { trazosDe, VIEWBOX } from "@/lib/marcaProyecto";
import type { Proyecto } from "@/lib/proyectos";

/**
 * Dibujo generado para los proyectos sin captura. Es decorativo: el nombre y el
 * resumen del proyecto ya van en texto al lado, asi que va oculto al lector de
 * pantalla en vez de duplicar esa informacion.
 */
export default function MarcaProyecto({
  proyecto,
  className = "",
}: {
  proyecto: Proyecto;
  className?: string;
}) {
  return (
    <svg
      viewBox={VIEWBOX}
      aria-hidden="true"
      focusable="false"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        dangerouslySetInnerHTML={{ __html: trazosDe(proyecto) }}
      />
    </svg>
  );
}
