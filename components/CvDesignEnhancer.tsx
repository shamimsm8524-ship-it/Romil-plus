"use client";

import { useEffect } from "react";

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

export function CvDesignEnhancer() {
  useEffect(() => {
    let frame = 0;

    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const preview = document.getElementById("cv-print-area");
        if (preview) {
          const previewColumn = preview.parentElement;
          const badge = previewColumn?.querySelector<HTMLElement>(".cv-no-print span");
          const slug = templateSlugs[normalize(badge?.textContent)];
          if (slug) preview.dataset.cvTemplate = slug;
        }

        document.querySelectorAll<HTMLButtonElement>("button").forEach((button) => {
          const slug = templateSlugs[normalize(button.textContent)];
          if (slug) button.dataset.cvTemplateCard = slug;
        });
      });
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return <span aria-hidden className="cv-design-enhancer" />;
}
