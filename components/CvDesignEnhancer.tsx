"use client";

import { useEffect } from "react";
import styles from "./CvDesignLayoutFix.module.css";

const templateSlugs: Record<string, string> = {
  "Ejecutivo Azul": "ejecutivo-azul",
  "Corporativo Oro": "corporativo-oro",
  "Navy Moderno": "navy-moderno",
  "Grafito Premium": "grafito-premium",
  "Azul Técnico": "azul-tecnico",
  "Verde Ejecutivo": "verde-ejecutivo",
  "Acero Profesional": "acero-profesional",
  "Índigo Sobrio": "indigo-sobrio",
  "Cobalto Directivo": "cobalto-directivo",
  "Café Ejecutivo": "cafe-ejecutivo",
  "Dorado Elegante": "dorado-elegante",
  "Azul Sereno": "azul-sereno",
  "Rosa Ejecutivo": "rosa-ejecutivo",
  "Arena Premium": "arena-premium",
  "Lavanda Profesional": "lavanda-profesional",
  "Verde Salvia": "verde-salvia",
  "Borgoña Elegante": "borgona-elegante",
  "Celeste Moderno": "celeste-moderno",
  "Malva Ejecutivo": "malva-ejecutivo",
  "Champagne Profesional": "champagne-profesional",
};

function normalize(value?: string | null) {
  return value?.replace(/\s+/g, " ").trim() ?? "";
}

function waitForPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

export function CvDesignEnhancer() {
  useEffect(() => {
    let frame = 0;
    let building = false;
    let disposed = false;

    const markPreview = () => {
      const preview = document.getElementById("cv-print-area");
      if (!preview) return;
      const previewColumn = preview.parentElement;
      const badge = previewColumn?.querySelector<HTMLElement>(".cv-no-print span");
      const slug = templateSlugs[normalize(badge?.textContent)];
      if (slug) preview.dataset.cvTemplate = slug;
    };

    const markCards = () => {
      document.querySelectorAll<HTMLButtonElement>("button").forEach((button) => {
        if (button.dataset.cvTemplateCard) return;
        const slug = templateSlugs[normalize(button.textContent)];
        if (slug) button.dataset.cvTemplateCard = slug;
      });
    };

    const clonePreview = (preview: HTMLElement) => {
      const clone = preview.cloneNode(true) as HTMLElement;
      clone.removeAttribute("id");
      clone.querySelectorAll<HTMLElement>("[id]").forEach((node) => node.removeAttribute("id"));
      clone.classList.add("cv-real-thumbnail-sheet");
      clone.setAttribute("aria-hidden", "true");
      return clone;
    };

    const placeRealThumbnail = (card: HTMLButtonElement, preview: HTMLElement) => {
      const visual = card.firstElementChild as HTMLElement | null;
      if (!visual) return;

      const viewport = document.createElement("div");
      viewport.className = "cv-real-thumbnail";

      const stage = document.createElement("div");
      stage.className = "cv-real-thumbnail-stage";
      stage.appendChild(clonePreview(preview));
      viewport.appendChild(stage);

      visual.replaceChildren(viewport);
      card.dataset.cvRealThumbnail = "true";
    };

    const buildRealThumbnails = async () => {
      if (building || disposed) return;
      markPreview();
      markCards();

      const cards = Array.from(document.querySelectorAll<HTMLButtonElement>("button[data-cv-template-card]"))
        .filter((button) => button.offsetParent !== null);
      const pending = cards.filter((button) => button.dataset.cvRealThumbnail !== "true");
      if (!pending.length) return;

      building = true;
      document.documentElement.classList.add("cv-building-real-thumbnails");

      try {
        const startingPreview = document.getElementById("cv-print-area");
        const originalSlug = startingPreview?.dataset.cvTemplate;
        const originalCard = originalSlug
          ? cards.find((button) => button.dataset.cvTemplateCard === originalSlug)
          : undefined;

        for (const card of pending) {
          if (disposed) return;
          const slug = card.dataset.cvTemplateCard;
          if (!slug) continue;

          markPreview();
          let preview = document.getElementById("cv-print-area");
          if (preview?.dataset.cvTemplate !== slug) {
            card.click();
            await waitForPaint();
            markPreview();
            preview = document.getElementById("cv-print-area");
          }

          if (preview) placeRealThumbnail(card, preview);
        }

        if (originalCard) {
          originalCard.click();
          await waitForPaint();
          markPreview();
        } else if (cards[0]) {
          // Al cambiar Hombre/Mujer, deja seleccionado el primer diseño del grupo
          // en vez de conservar accidentalmente el último usado para generar miniaturas.
          cards[0].click();
          await waitForPaint();
          markPreview();
        }
      } finally {
        building = false;
        document.documentElement.classList.remove("cv-building-real-thumbnails");
      }
    };

    const sync = () => {
      if (building || disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        markPreview();
        markCards();
        void buildRealThumbnails();
      });
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("cv-building-real-thumbnails");
    };
  }, []);

  return <span aria-hidden className={`${styles.enhancer} cv-design-enhancer`} />;
}
