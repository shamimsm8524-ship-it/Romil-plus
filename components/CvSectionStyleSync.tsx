"use client";

import { useEffect } from "react";

const lightSidebarTemplates = new Set(["dorado-elegante", "lavanda-profesional"]);

function findAccent(root: HTMLElement) {
  const styledHeading = Array.from(root.querySelectorAll<HTMLElement>("h3")).find((heading) => heading.style.color);
  if (styledHeading?.style.color) return styledHeading.style.color;

  const styledProfession = Array.from(root.querySelectorAll<HTMLElement>("p")).find((item) => item.style.color);
  if (styledProfession?.style.color) return styledProfession.style.color;

  return "#0a2d5a";
}

function setImportant(node: HTMLElement, property: string, value: string) {
  node.style.setProperty(property, value, "important");
}

function syncSection(section: HTMLElement, root: HTMLElement) {
  const layout = root.dataset.cvLayout;
  const column = section.dataset.cvColumn;
  const template = root.dataset.cvTemplate ?? "";
  const accent = findAccent(root);

  const darkSurface = layout === "sidebar" && column === "left" && !lightSidebarTemplates.has(template);
  section.dataset.cvSurface = darkSurface ? "dark" : "light";

  const heading = section.querySelector<HTMLElement>("h3");
  if (heading) {
    setImportant(heading, "color", darkSurface ? "#ffffff" : accent);
    setImportant(heading, "border-color", darkSurface ? "rgba(255,255,255,.28)" : "#dce4ed");
  }

  section.querySelectorAll<HTMLElement>("p, span").forEach((node) => {
    const isPill = node.tagName === "SPAN" && node.classList.contains("rounded-full");
    const isStrong = node.classList.contains("font-black") || node.classList.contains("font-bold");

    if (darkSurface) {
      setImportant(node, "color", isStrong || isPill ? "#ffffff" : "rgba(255,255,255,.82)");
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
      attributeFilter: ["data-cv-column", "data-cv-layout", "data-cv-template", "style"],
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
