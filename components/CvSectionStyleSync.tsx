"use client";

import { useEffect } from "react";

/*
 * Solo estos modelos tienen una barra lateral realmente OSCURA.
 * El resto de diseños —incluidos Azul Técnico, Dorado, Lavanda y todos los
 * modelos minimal/split/topbar— deben conservar texto oscuro aunque una
 * sección se coloque manualmente en la columna izquierda.
 *
 * Basarnos en el nombre del modelo, y no únicamente en data-cv-layout, evita
 * que un cambio de plantilla o una reconstrucción del organizador deje texto
 * blanco heredado sobre fondos claros.
 */
const darkSidebarTemplates = new Set([
  "ejecutivo-azul",
  "cobalto-directivo",
  "malva-ejecutivo",
]);

const sectionLabels: Record<string, string> = {
  perfil: "Perfil profesional",
  experiencia: "Experiencia",
  educacion: "Educación",
  certificaciones: "Cursos y certificaciones",
  habilidades: "Habilidades",
  idiomas: "Idiomas",
  referencias: "Referencias",
};

const templateAccents: Record<string, string> = {
  "ejecutivo-azul": "#0a2d5a",
  "corporativo-oro": "#9b6a00",
  "navy-moderno": "#17365d",
  "grafito-premium": "#343a40",
  "azul-tecnico": "#0866d8",
  "verde-ejecutivo": "#23664d",
  "acero-profesional": "#495867",
  "indigo-sobrio": "#384a8a",
  "cobalto-directivo": "#124e78",
  "cafe-ejecutivo": "#6b4f3b",
  "dorado-elegante": "#b78314",
  "azul-sereno": "#315d8c",
  "rosa-ejecutivo": "#a24f68",
  "arena-premium": "#8b7355",
  "lavanda-profesional": "#6a5b8f",
  "verde-salvia": "#5f7658",
  "borgona-elegante": "#7e3342",
  "celeste-moderno": "#367c91",
  "malva-ejecutivo": "#75596d",
  "champagne-profesional": "#9d7b47",
};

function setImportant(node: HTMLElement, property: string, value: string) {
  if (node.style.getPropertyValue(property) === value && node.style.getPropertyPriority(property) === "important") return;
  node.style.setProperty(property, value, "important");
}

function ensureManualHeading(section: HTMLElement) {
  const key = section.dataset.cvSection ?? "";
  const label = sectionLabels[key];
  if (!label) return null;

  const originalHeading = section.querySelector<HTMLElement>("h3");
  if (originalHeading) setImportant(originalHeading, "display", "none");

  let heading = section.querySelector<HTMLElement>(":scope > [data-cv-manual-heading]");
  if (!heading) {
    heading = document.createElement("div");
    heading.dataset.cvManualHeading = "true";
    section.prepend(heading);
  }

  heading.textContent = label;
  return heading;
}

function styleManualHeading(heading: HTMLElement, color: string, darkSurface: boolean) {
  setImportant(heading, "display", "block");
  setImportant(heading, "visibility", "visible");
  setImportant(heading, "opacity", "1");
  setImportant(heading, "position", "relative");
  setImportant(heading, "z-index", "2");
  setImportant(heading, "width", "100%");
  setImportant(heading, "height", "auto");
  setImportant(heading, "min-height", "20px");
  setImportant(heading, "margin", "0 0 12px 0");
  setImportant(heading, "padding", "0 0 6px 0");
  setImportant(heading, "border-bottom-style", "solid");
  setImportant(heading, "border-bottom-width", "1px");
  setImportant(heading, "border-color", darkSurface ? "rgba(255,255,255,.28)" : "#dce4ed");
  setImportant(heading, "color", darkSurface ? "#ffffff" : color);
  setImportant(heading, "background", "transparent");
  setImportant(heading, "font-size", "11px");
  setImportant(heading, "line-height", "1.35");
  setImportant(heading, "font-family", "inherit");
  setImportant(heading, "font-weight", "900");
  setImportant(heading, "text-transform", "uppercase");
  setImportant(heading, "letter-spacing", ".13em");
  setImportant(heading, "white-space", "normal");
  setImportant(heading, "overflow", "visible");
}

function syncSection(section: HTMLElement, root: HTMLElement) {
  const column = section.dataset.cvColumn;
  const template = root.dataset.cvTemplate ?? "";
  const accent = templateAccents[template] ?? "#0a2d5a";
  const darkSurface = column === "left" && darkSidebarTemplates.has(template);

  section.dataset.cvSurface = darkSurface ? "dark" : "light";
  setImportant(section, "display", "block");
  setImportant(section, "visibility", "visible");
  setImportant(section, "opacity", "1");
  setImportant(section, "color", darkSurface ? "#ffffff" : "#4b5563");

  const heading = ensureManualHeading(section);
  if (heading) styleManualHeading(heading, accent, darkSurface);

  section.querySelectorAll<HTMLElement>("p, span, strong, a, li, em, small").forEach((node) => {
    const isPill = node.tagName === "SPAN" && node.classList.contains("rounded-full");
    const isStrong = node.tagName === "STRONG" || node.classList.contains("font-black") || node.classList.contains("font-bold");

    setImportant(node, "visibility", "visible");
    setImportant(node, "opacity", "1");

    if (darkSurface) {
      setImportant(node, "color", isStrong || isPill ? "#ffffff" : "rgba(255,255,255,.86)");
      if (isPill) setImportant(node, "background-color", "rgba(255,255,255,.12)");
      return;
    }

    setImportant(node, "color", isStrong ? "#202a3a" : "#4b5563");
    if (isPill) {
      setImportant(node, "color", "#334155");
      setImportant(node, "background-color", "rgba(10,45,90,.07)");
    }
  });
}

function syncAllSections() {
  document.querySelectorAll<HTMLElement>("#cv-manual-pages-host > .cv-manual-page").forEach((root) => {
    root.querySelectorAll<HTMLElement>("section[data-cv-column]").forEach((section) => syncSection(section, root));
  });
}

export function CvSectionStyleSync() {
  useEffect(() => {
    let frame = 0;

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncAllSections);
    };

    schedule();

    const observer = new MutationObserver(schedule);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-cv-column", "data-cv-layout", "data-cv-template", "data-cv-section"],
    });

    window.addEventListener("beforeprint", syncAllSections);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("beforeprint", syncAllSections);
    };
  }, []);

  return null;
}
