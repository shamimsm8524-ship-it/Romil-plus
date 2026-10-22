"use client";

import { useEffect } from "react";

const contactLabels = ["correo", "teléfono", "ciudad", "linkedin / portafolio"];

function normalize(value?: string | null) {
  return value?.replace(/\s+/g, " ").trim().toLocaleLowerCase("es") ?? "";
}

function nativeContactRow(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>("div")).find((node) =>
    node.classList.contains("flex") &&
    node.classList.contains("flex-wrap") &&
    node.classList.contains("gap-x-3") &&
    node.classList.contains("gap-y-1") &&
    !node.hasAttribute("data-cv-contact-sync") &&
    node.querySelectorAll(":scope > span").length > 0
  ) ?? null;
}

function readContactFromEditor() {
  const values: string[] = [];
  const labels = Array.from(document.querySelectorAll<HTMLLabelElement>("label"));

  contactLabels.forEach((wanted) => {
    const label = labels.find((item) => normalize(item.querySelector(":scope > span")?.textContent) === wanted);
    const input = label?.querySelector<HTMLInputElement>("input");
    const value = input?.value.trim();
    if (value) values.push(value);
  });

  return values;
}

function splitHeaderInfo(root: HTMLElement) {
  const first = root.firstElementChild as HTMLElement | null;
  const second = root.children.item(1) as HTMLElement | null;
  if (!first?.classList.contains("h-3") || !second?.classList.contains("grid")) return null;
  return second.children.item(1) as HTMLElement | null;
}

function renderContact(info: HTMLElement, values: string[]) {
  let row = info.querySelector<HTMLElement>(":scope > [data-cv-contact-sync]");
  if (!row) {
    row = document.createElement("div");
    row.dataset.cvContactSync = "true";
    row.className = "mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10px] leading-5";
    row.style.setProperty("color", "#475569", "important");
    info.appendChild(row);
  }

  const signature = values.join("\u0001");
  if (row.dataset.cvContactSignature === signature) return;
  row.dataset.cvContactSignature = signature;
  row.replaceChildren();

  values.forEach((value) => {
    const span = document.createElement("span");
    span.textContent = value;
    span.style.setProperty("color", "#475569", "important");
    span.style.setProperty("visibility", "visible", "important");
    span.style.setProperty("opacity", "1", "important");
    row?.appendChild(span);
  });
}

export function CvContactSync() {
  useEffect(() => {
    let frame = 0;
    let cachedValues: string[] = [];

    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const source = document.querySelector<HTMLElement>("#cv-print-area:not(.cv-manual-page)");
        if (!source) return;

        const native = nativeContactRow(source);
        if (native) {
          const values = Array.from(native.querySelectorAll<HTMLElement>(":scope > span"))
            .map((span) => span.textContent?.trim() ?? "")
            .filter(Boolean);
          if (values.length) cachedValues = values;
          return;
        }

        const editorValues = readContactFromEditor();
        if (editorValues.length) cachedValues = editorValues;
        if (!cachedValues.length) return;

        const info = splitHeaderInfo(source);
        if (info) renderContact(info, cachedValues);
      });
    };

    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    document.addEventListener("input", sync, true);
    window.addEventListener("beforeprint", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("input", sync, true);
      window.removeEventListener("beforeprint", sync);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
