export type Servicio = {
  nombre: string;
  url: string;
  estado: "activo" | "inactivo";
};

export type EstadoInfra = {
  /** Fecha ISO del momento del build en que se verificó */
  verificadoEn: string;
  servicios: Servicio[];
};

/** Dominios a verificar. El orden es el de aparición en el panel. */
export const DOMINIOS: { nombre: string; url: string }[] = [
  { nombre: "notecore", url: "https://notecore.ourocore.net" },
  { nombre: "wander", url: "https://wander.ourocore.net" },
  { nombre: "shokan", url: "https://shokan.ourocore.net" },
  { nombre: "koko", url: "https://koko.ourocore.net" },
  { nombre: "ourocore", url: "https://www.ourocore.net" },
  { nombre: "zaga", url: "https://www.zagadistribuciones.com" },
  { nombre: "goons", url: "https://goonsandgooners.stellarbanana.com" },
  { nombre: "portafolio", url: "https://briantellez.ourocore.net" },
];
