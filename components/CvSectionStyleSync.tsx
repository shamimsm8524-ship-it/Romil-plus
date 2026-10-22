"use client";

import { useEffect } from "react";

const lightSidebarTemplates = new Set(["dorado-elegante", "lavanda-profesional"]);

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

function syncSection(section: HTMLElement, root: HTMLElement) {
  const layout = root.dataset.cvLayout;
  const column = section.dataset.cvColumn;
  const template = root.dataset.cvTemplate ?? "";
  const accent = templateAccents[template] ?? "#0a2d5a";
  const darkSurface = layout === "sidebar" && column === "left" && !lightSidebarTemplates.has(template);

  section.dataset.cvSurface = darkSurface ? "dark" : "light";
  setImportant(section, "visibility", "visible");
  setImportant(section, "opacity", "1");

  const heading = section.querySelector<HTMLElement>("h3");
  if (heading) {
    setImportant(heading, "display", "block");
    setImportant(heading, "visibility", "visible");
    setImportant(heading, "opacity", "1");
    setImportant(heading, "color", darkSurface ? "#ffffff" : accent);
    setImportant(heading, "border-color", darkSurface ? "rgba(255,255,255,.28)" : "#dce4ed");
  }

  section.querySelectorAll<HTMLElement>("p, span, strong, a").forEach((node) => {
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
      attributeFilter: ["data-cv-column", "data-cv-layout", "data-cv-template"],
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
