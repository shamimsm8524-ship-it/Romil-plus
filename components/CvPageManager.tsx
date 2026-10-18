"use client";

import { FilePlus2, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "romilplus-cv-pages";
const MAX_PAGES = 4;

type VisualLayout = "sidebar" | "topbar" | "split" | "minimal";

function pageRange(total: number, pages: number, page: number) {
  if (total <= 0) return [0, 0] as const;
  const safePages = Math.max(1, pages);
  const base = Math.floor(total / safePages);
  const remainder = total % safePages;
  const before = (page - 1) * base + Math.min(page - 1, remainder);
  const size = base + (page <= remainder ? 1 : 0);
  return [before, before + size] as const;
}

function detectVisualLayout(root: HTMLElement): VisualLayout {
  if (root.querySelector(":scope > header.grid")) return "topbar";

  const first = root.firstElementChild as HTMLElement | null;
  const second = root.children.item(1) as HTMLElement | null;

  if (first?.classList.contains("grid") && first.querySelector(":scope > aside")) return "sidebar";
  if (first?.classList.contains("h-3") && second?.classList.contains("grid")) return "split";
  return "minimal";
}

function splitSectionsByVisualColumn(clone: HTMLElement, page: number, pages: number) {
  const sections = Array.from(clone.querySelectorAll<HTMLElement>("section"));
  const groups = new Map<HTMLElement, HTMLElement[]>();

  sections.forEach((section) => {
    const parent = section.parentElement;
    if (!parent) return;
    const group = groups.get(parent) ?? [];
    group.push(section);
    groups.set(parent, group);
  });

  groups.forEach((groupSections, parent) => {
    const [start, end] = pageRange(groupSections.length, pages, page);

    groupSections.forEach((section, index) => {
      if (index < start || index >= end) section.remove();
    });

    const remaining = Array.from(parent.children).some((child) => child.tagName === "SECTION");
    parent.toggleAttribute("data-cv-empty-section-group", !remaining);
  });
}

function createVisualPage(source: HTMLElement, page: number, pages: number) {
  const clone = source.cloneNode(true) as HTMLElement;
  clone.removeAttribute("data-cv-source-preview");
  clone.removeAttribute("data-cv-manual-mode");
  clone.classList.add("cv-manual-page");
  clone.dataset.cvManualPage = String(page);
  clone.dataset.cvTotalPages = String(pages);
  clone.dataset.cvLayout = detectVisualLayout(source);

  if (page > 1) clone.classList.add("cv-continuation-page");

  /*
   * Cada columna visual se reparte de forma independiente. Esto se aplica a
   * todas las familias de plantillas: sidebar, topbar, split y minimal.
   */
  splitSectionsByVisualColumn(clone, page, pages);

  return clone;
}

export function CvPageManager() {
  const [pageCount, setPageCount] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const lastSignature = useRef("");

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(STORAGE_KEY) || "1");
      if (Number.isFinite(saved) && saved >= 1 && saved <= MAX_PAGES) setPageCount(saved);
    } catch {
      // La navegación de páginas funciona aunque el almacenamiento local esté bloqueado.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(pageCount));
    } catch {
      // Guardar la cantidad de páginas es opcional.
    }
  }, [pageCount]);

  const rebuild = useCallback((force = false) => {
    const source = document.querySelector<HTMLElement>("#cv-print-area:not(.cv-manual-page)");
    if (!source) return;

    source.dataset.cvSourcePreview = "true";
    source.dataset.cvLayout = detectVisualLayout(source);
    const parent = source.parentElement;
    if (!parent) return;

    let host = parent.querySelector<HTMLElement>("#cv-manual-pages-host");
    if (!host) {
      host = document.createElement("div");
      host.id = "cv-manual-pages-host";
      source.insertAdjacentElement("afterend", host);
    }

    const signature = `${pageCount}|${activePage}|${source.dataset.cvTemplate || ""}|${source.dataset.cvLayout || ""}|${source.innerHTML}`;
    if (!force && signature === lastSignature.current) return;
    lastSignature.current = signature;

    host.replaceChildren();

    if (pageCount === 1) {
      delete source.dataset.cvManualMode;
      source.style.display = "";
      return;
    }

    source.dataset.cvManualMode = "true";
    source.style.display = "none";

    for (let page = 1; page <= pageCount; page += 1) {
      const visualPage = createVisualPage(source, page, pageCount);
      visualPage.style.display = page === activePage ? "" : "none";
      host.appendChild(visualPage);
    }
  }, [activePage, pageCount]);

  useEffect(() => {
    rebuild(true);
    const interval = window.setInterval(() => rebuild(false), 350);
    const beforePrint = () => rebuild(true);
    window.addEventListener("beforeprint", beforePrint);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("beforeprint", beforePrint);
    };
  }, [rebuild]);

  useEffect(() => {
    if (activePage > pageCount) setActivePage(pageCount);
  }, [activePage, pageCount]);

  const addPage = () => {
    if (pageCount >= MAX_PAGES) return;
    const next = pageCount + 1;
    setPageCount(next);
    setActivePage(next);
  };

  const removePage = () => {
    if (pageCount <= 1) return;
    const next = pageCount - 1;
    setPageCount(next);
    setActivePage((current) => Math.min(current, next));
  };

  return (
    <div className="cv-page-manager cv-no-print" aria-label="Páginas del CV">
      <div className="cv-page-manager-title"><FilePlus2 size={15}/> <span>Páginas</span></div>
      <div className="cv-page-manager-pages">
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => setActivePage(page)}
            className={activePage === page ? "is-active" : ""}
            aria-label={`Ver página ${page}`}
          >
            {page}
          </button>
        ))}
      </div>
      <button type="button" onClick={addPage} disabled={pageCount >= MAX_PAGES} className="cv-page-add">
        <Plus size={15}/> <span>Agregar página</span>
      </button>
      {pageCount > 1 && (
        <button type="button" onClick={removePage} className="cv-page-remove" aria-label="Eliminar última página">
          <Trash2 size={14}/> <span>Eliminar</span>
        </button>
      )}
      <div className="cv-page-counter">Página {activePage} de {pageCount}</div>
    </div>
  );
}
