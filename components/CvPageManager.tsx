"use client";

import { FilePlus2, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "romilplus-cv-pages";
const MAX_PAGES = 4;

function pageRange(total: number, pages: number, page: number) {
  if (total <= 0) return [0, 0] as const;
  const safePages = Math.max(1, pages);
  const base = Math.floor(total / safePages);
  const remainder = total % safePages;
  const before = (page - 1) * base + Math.min(page - 1, remainder);
  const size = base + (page <= remainder ? 1 : 0);
  return [before, before + size] as const;
}

function createVisualPage(source: HTMLElement, page: number, pages: number) {
  const clone = source.cloneNode(true) as HTMLElement;
  clone.removeAttribute("data-cv-source-preview");
  clone.classList.add("cv-manual-page");
  clone.dataset.cvManualPage = String(page);
  clone.dataset.cvTotalPages = String(pages);

  if (page > 1) clone.classList.add("cv-continuation-page");

  const sections = Array.from(clone.querySelectorAll<HTMLElement>("section"));
  const [start, end] = pageRange(sections.length, pages, page);

  sections.forEach((section, index) => {
    if (index < start || index >= end) section.remove();
  });

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
    const parent = source.parentElement;
    if (!parent) return;

    let host = parent.querySelector<HTMLElement>("#cv-manual-pages-host");
    if (!host) {
      host = document.createElement("div");
      host.id = "cv-manual-pages-host";
      source.insertAdjacentElement("afterend", host);
    }

    const signature = `${pageCount}|${activePage}|${source.dataset.cvTemplate || ""}|${source.innerHTML}`;
    if (!force && signature === lastSignature.current) return;
    lastSignature.current = signature;

    host.replaceChildren();

    if (pageCount === 1) {
      source.style.display = "";
      return;
    }

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
