"use client";

import { ChevronDown, ChevronUp, FilePlus2, Plus, Settings2, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "romilplus-cv-pages";
const LAYOUT_STORAGE_KEY = "romilplus-cv-section-layout";
const ORDER_STORAGE_KEY = "romilplus-cv-section-order";
const MAX_PAGES = 4;

type VisualLayout = "sidebar" | "topbar" | "split" | "minimal";
type SectionKey = "perfil" | "experiencia" | "educacion" | "certificaciones" | "habilidades" | "idiomas" | "referencias";
type SectionColumn = "left" | "right";
type SectionPlacement = { page: number; column: SectionColumn };
type PlacementMap = Record<SectionKey, SectionPlacement>;

const sectionLabels: Record<SectionKey, string> = {
  perfil: "Perfil profesional",
  experiencia: "Experiencia",
  educacion: "Educación",
  certificaciones: "Cursos y certificaciones",
  habilidades: "Habilidades",
  idiomas: "Idiomas",
  referencias: "Referencias",
};

const defaultOrder: SectionKey[] = ["perfil", "experiencia", "educacion", "certificaciones", "habilidades", "idiomas", "referencias"];
const defaultPlacements: PlacementMap = {
  perfil: { page: 1, column: "right" },
  experiencia: { page: 1, column: "right" },
  educacion: { page: 1, column: "right" },
  certificaciones: { page: 1, column: "left" },
  habilidades: { page: 1, column: "left" },
  idiomas: { page: 1, column: "left" },
  referencias: { page: 1, column: "left" },
};

const normalize = (value?: string | null) => value?.replace(/\s+/g, " ").trim().toLocaleLowerCase("es") ?? "";
const labelToKey = new Map(Object.entries(sectionLabels).map(([key, label]) => [normalize(label), key as SectionKey]));

function safePage(value: unknown) {
  const page = Number(value);
  return Number.isFinite(page) ? Math.min(MAX_PAGES, Math.max(1, Math.round(page))) : 1;
}

function loadSavedPlacements(): PlacementMap | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LAYOUT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Record<SectionKey, Partial<SectionPlacement>>>;
    const next = { ...defaultPlacements } as PlacementMap;
    defaultOrder.forEach((key) => {
      const item = parsed[key];
      if (!item) return;
      next[key] = {
        page: safePage(item.page),
        column: item.column === "right" ? "right" : "left",
      };
    });
    return next;
  } catch {
    return null;
  }
}

function loadSavedOrder(): SectionKey[] {
  if (typeof window === "undefined") return defaultOrder;
  try {
    const direct = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || "null");
    if (Array.isArray(direct)) {
      const valid = direct.filter((key): key is SectionKey => defaultOrder.includes(key));
      if (valid.length === defaultOrder.length) return valid;
    }

    const draft = JSON.parse(localStorage.getItem("romilplus-cv-draft") || "null");
    if (Array.isArray(draft?.order)) {
      const valid = draft.order.filter((key: unknown): key is SectionKey => typeof key === "string" && defaultOrder.includes(key as SectionKey));
      if (valid.length === defaultOrder.length) return valid;
    }
  } catch {
    // Si el borrador está dañado, usamos el orden inicial.
  }
  return defaultOrder;
}

function detectVisualLayout(root: HTMLElement): VisualLayout {
  if (root.querySelector(":scope > header.grid")) return "topbar";

  const first = root.firstElementChild as HTMLElement | null;
  const second = root.children.item(1) as HTMLElement | null;

  if (first?.classList.contains("grid") && first.querySelector(":scope > aside")) return "sidebar";
  if (first?.classList.contains("h-3") && second?.classList.contains("grid")) return "split";
  return "minimal";
}

function sectionKeyOf(section: HTMLElement): SectionKey | null {
  const heading = section.querySelector("h3")?.textContent;
  return labelToKey.get(normalize(heading)) ?? null;
}

function sectionContainerWithin(root: HTMLElement | null) {
  if (!root) return null;
  const candidates: HTMLElement[] = [root, ...Array.from(root.querySelectorAll<HTMLElement>("div"))];
  return candidates.find((candidate) => Array.from(candidate.children).some((child) => child.tagName === "SECTION")) ?? null;
}

function lastDirectGrid(root: HTMLElement) {
  const grids = Array.from(root.children).filter((child): child is HTMLElement => child instanceof HTMLElement && child.tagName === "DIV" && child.classList.contains("grid"));
  return grids.at(-1) ?? null;
}

function getColumnContainers(root: HTMLElement, layout: VisualLayout) {
  if (layout === "sidebar") {
    const outer = Array.from(root.children).find((child): child is HTMLElement => child instanceof HTMLElement && child.classList.contains("grid"));
    const leftArea = outer?.children.item(0) as HTMLElement | null;
    const rightArea = outer?.children.item(1) as HTMLElement | null;
    return { left: sectionContainerWithin(leftArea), right: sectionContainerWithin(rightArea), shared: false };
  }

  const content = lastDirectGrid(root);
  if (!content) return { left: null, right: null, shared: false };

  if (layout === "minimal") return { left: content, right: content, shared: true };

  return {
    left: sectionContainerWithin(content.children.item(0) as HTMLElement | null),
    right: sectionContainerWithin(content.children.item(1) as HTMLElement | null),
    shared: false,
  };
}

function derivePlacements(source: HTMLElement): PlacementMap {
  const layout = detectVisualLayout(source);
  const columns = getColumnContainers(source, layout);
  const next = { ...defaultPlacements } as PlacementMap;
  let minimalIndex = 0;

  source.querySelectorAll<HTMLElement>("section").forEach((section) => {
    const key = sectionKeyOf(section);
    if (!key) return;

    let column: SectionColumn = "left";
    if (columns.shared) {
      column = minimalIndex % 2 === 0 ? "left" : "right";
      minimalIndex += 1;
    } else if (columns.right?.contains(section)) {
      column = "right";
    }

    next[key] = { page: 1, column };
  });

  return next;
}

function createVisualPage(source: HTMLElement, page: number, pages: number, placements: PlacementMap, order: SectionKey[]) {
  const clone = source.cloneNode(true) as HTMLElement;
  clone.removeAttribute("data-cv-source-preview");
  clone.removeAttribute("data-cv-manual-mode");
  clone.classList.add("cv-manual-page");
  clone.dataset.cvManualPage = String(page);
  clone.dataset.cvTotalPages = String(pages);
  const layout = detectVisualLayout(source);
  clone.dataset.cvLayout = layout;

  if (page > 1) clone.classList.add("cv-continuation-page");

  const columns = getColumnContainers(clone, layout);
  const sectionMap = new Map<SectionKey, HTMLElement>();

  clone.querySelectorAll<HTMLElement>("section").forEach((section) => {
    const key = sectionKeyOf(section);
    if (!key) return;
    sectionMap.set(key, section);
    section.remove();
  });

  order.forEach((key) => {
    const section = sectionMap.get(key);
    const placement = placements[key] ?? defaultPlacements[key];
    if (!section || placement.page !== page) return;

    section.dataset.cvSection = key;
    section.dataset.cvColumn = placement.column;
    section.dataset.cvPage = String(placement.page);

    if (columns.shared) {
      section.style.gridColumn = placement.column === "left" ? "1" : "2";
      columns.left?.appendChild(section);
      return;
    }

    section.style.removeProperty("grid-column");
    (placement.column === "left" ? columns.left : columns.right)?.appendChild(section);
  });

  if (!columns.shared) {
    columns.left?.toggleAttribute("data-cv-empty-section-group", !columns.left.querySelector(":scope > section"));
    columns.right?.toggleAttribute("data-cv-empty-section-group", !columns.right.querySelector(":scope > section"));
  }

  return clone;
}

function decorateLegacyVisibilityPanel() {
  const heading = Array.from(document.querySelectorAll<HTMLParagraphElement>("p")).find((item) => normalize(item.textContent) === "orden y visibilidad");
  if (!heading) return;
  heading.textContent = "Visibilidad";
  const panel = heading.parentElement;
  if (!panel) return;
  panel.classList.add("cv-legacy-visibility-panel");
  panel.querySelectorAll<HTMLElement>(".mt-3.grid.gap-2 > div").forEach((row) => {
    const buttons = row.querySelectorAll<HTMLButtonElement>("button");
    if (buttons.length >= 3) {
      buttons[buttons.length - 2].classList.add("cv-legacy-order-button");
      buttons[buttons.length - 1].classList.add("cv-legacy-order-button");
    }
  });
}

export function CvPageManager() {
  const [pageCount, setPageCount] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [organizerOpen, setOrganizerOpen] = useState(false);
  const [placements, setPlacements] = useState<PlacementMap | null>(() => loadSavedPlacements());
  const [order, setOrder] = useState<SectionKey[]>(() => loadSavedOrder());
  const lastSignature = useRef("");

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(STORAGE_KEY) || "1");
      if (Number.isFinite(saved) && saved >= 1 && saved <= MAX_PAGES) setPageCount(saved);
    } catch {
      // La navegación funciona aunque el almacenamiento local esté bloqueado.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(pageCount));
    } catch {
      // Guardar la cantidad de páginas es opcional.
    }
  }, [pageCount]);

  useEffect(() => {
    if (!placements) return;
    try {
      localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(placements));
    } catch {
      // La distribución seguirá funcionando durante la sesión.
    }
  }, [placements]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
    } catch {
      // El orden seguirá funcionando durante la sesión.
    }
  }, [order]);

  const rebuild = useCallback((force = false) => {
    const source = document.querySelector<HTMLElement>("#cv-print-area:not(.cv-manual-page)");
    if (!source) return;

    decorateLegacyVisibilityPanel();
    source.dataset.cvSourcePreview = "true";
    source.dataset.cvLayout = detectVisualLayout(source);
    const parent = source.parentElement;
    if (!parent) return;

    const effectivePlacements = placements ?? derivePlacements(source);
    if (!placements) setPlacements(effectivePlacements);

    const requiredPages = Math.max(1, ...defaultOrder.map((key) => effectivePlacements[key]?.page ?? 1));
    const effectivePageCount = Math.min(MAX_PAGES, Math.max(pageCount, requiredPages));
    if (effectivePageCount !== pageCount) setPageCount(effectivePageCount);

    let host = parent.querySelector<HTMLElement>("#cv-manual-pages-host");
    if (!host) {
      host = document.createElement("div");
      host.id = "cv-manual-pages-host";
      source.insertAdjacentElement("afterend", host);
    }

    const signature = `${effectivePageCount}|${activePage}|${source.dataset.cvTemplate || ""}|${source.dataset.cvLayout || ""}|${JSON.stringify(effectivePlacements)}|${order.join(",")}|${source.innerHTML}`;
    if (!force && signature === lastSignature.current) return;
    lastSignature.current = signature;

    host.replaceChildren();
    source.dataset.cvManualMode = "true";
    source.style.display = "none";

    for (let page = 1; page <= effectivePageCount; page += 1) {
      const visualPage = createVisualPage(source, page, effectivePageCount, effectivePlacements, order);
      visualPage.style.display = page === activePage ? "" : "none";
      host.appendChild(visualPage);
    }
  }, [activePage, order, pageCount, placements]);

  useEffect(() => {
    rebuild(true);
    const interval = window.setInterval(() => rebuild(false), 300);
    const beforePrint = () => rebuild(true);
    window.addEventListener("beforeprint", beforePrint);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("beforeprint", beforePrint);
      const source = document.querySelector<HTMLElement>("#cv-print-area:not(.cv-manual-page)");
      if (source) source.style.display = "";
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
    setPlacements((current) => {
      if (!current) return current;
      const copy = { ...current } as PlacementMap;
      defaultOrder.forEach((key) => {
        const item = current[key];
        copy[key] = item.page > next ? { ...item, page: next } : item;
      });
      return copy;
    });
  };

  const updatePlacement = (key: SectionKey, patch: Partial<SectionPlacement>) => {
    setPlacements((current) => {
      const base = current ?? defaultPlacements;
      const nextItem = { ...base[key], ...patch };
      const nextPage = safePage(nextItem.page);
      if (nextPage > pageCount) setPageCount(nextPage);
      setActivePage(nextPage);
      return {
        ...base,
        [key]: { page: nextPage, column: nextItem.column === "right" ? "right" : "left" },
      } as PlacementMap;
    });
  };

  const moveSection = (key: SectionKey, direction: -1 | 1) => {
    if (!placements) return;
    const placement = placements[key];
    const group = order.filter((item) => placements[item].page === placement.page && placements[item].column === placement.column);
    const groupIndex = group.indexOf(key);
    const neighbor = group[groupIndex + direction];
    if (!neighbor) return;

    setOrder((current) => {
      const copy = [...current];
      const currentIndex = copy.indexOf(key);
      const neighborIndex = copy.indexOf(neighbor);
      [copy[currentIndex], copy[neighborIndex]] = [copy[neighborIndex], copy[currentIndex]];
      return copy;
    });
  };

  const resetDistribution = () => {
    const source = document.querySelector<HTMLElement>("#cv-print-area:not(.cv-manual-page)");
    const next = source ? derivePlacements(source) : defaultPlacements;
    setPlacements(next);
    setOrder(loadSavedOrder());
    setPageCount(1);
    setActivePage(1);
    try {
      localStorage.removeItem(LAYOUT_STORAGE_KEY);
      localStorage.removeItem(ORDER_STORAGE_KEY);
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Restablecer funciona aunque no se pueda guardar localmente.
    }
  };

  const effectivePlacements = placements ?? defaultPlacements;

  return (
    <>
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
        <button type="button" onClick={() => setOrganizerOpen((value) => !value)} className={`cv-page-organize ${organizerOpen ? "is-active" : ""}`}>
          <Settings2 size={15}/> <span>Organizar</span>
        </button>
        <div className="cv-page-counter">Página {activePage} de {pageCount}</div>
      </div>

      {organizerOpen && (
        <aside className="cv-section-organizer cv-no-print" aria-label="Organizar secciones del CV">
          <div className="cv-section-organizer-head">
            <div>
              <p>Organizar secciones</p>
              <span>Elige página, columna y orden. Agregar una página no mueve nada automáticamente.</span>
            </div>
            <button type="button" onClick={() => setOrganizerOpen(false)} aria-label="Cerrar organizador"><X size={18}/></button>
          </div>

          <div className="cv-section-organizer-list">
            {order.map((key) => {
              const placement = effectivePlacements[key];
              const group = order.filter((item) => effectivePlacements[item].page === placement.page && effectivePlacements[item].column === placement.column);
              const groupIndex = group.indexOf(key);
              return (
                <div key={key} className="cv-section-organizer-row">
                  <div className="cv-section-organizer-row-title">
                    <strong>{sectionLabels[key]}</strong>
                    <div>
                      <button type="button" disabled={groupIndex <= 0} onClick={() => moveSection(key, -1)} aria-label={`Subir ${sectionLabels[key]}`}><ChevronUp size={15}/></button>
                      <button type="button" disabled={groupIndex < 0 || groupIndex >= group.length - 1} onClick={() => moveSection(key, 1)} aria-label={`Bajar ${sectionLabels[key]}`}><ChevronDown size={15}/></button>
                    </div>
                  </div>
                  <div className="cv-section-organizer-controls">
                    <label>
                      <span>Página</span>
                      <select value={placement.page} onChange={(event) => updatePlacement(key, { page: Number(event.target.value) })}>
                        {Array.from({ length: MAX_PAGES }, (_, index) => index + 1).map((page) => <option key={page} value={page}>{page}</option>)}
                      </select>
                    </label>
                    <div className="cv-column-picker" aria-label={`Columna de ${sectionLabels[key]}`}>
                      <span>Columna</span>
                      <div>
                        <button type="button" className={placement.column === "left" ? "is-active" : ""} onClick={() => updatePlacement(key, { column: "left" })}>Izquierda</button>
                        <button type="button" className={placement.column === "right" ? "is-active" : ""} onClick={() => updatePlacement(key, { column: "right" })}>Derecha</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button type="button" onClick={resetDistribution} className="cv-section-organizer-reset">Restablecer distribución del modelo</button>
        </aside>
      )}
    </>
  );
}
