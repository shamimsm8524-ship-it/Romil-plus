"use client";

import {
  Check,
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  EyeOff,
  FileText,
  ImagePlus,
  Palette,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Audience = "Hombre" | "Mujer";
type Layout = "sidebar" | "topbar" | "minimal" | "split";
type SectionKey = "perfil" | "experiencia" | "educacion" | "certificaciones" | "habilidades" | "idiomas" | "referencias";

type Template = {
  id: string;
  name: string;
  audience: Audience;
  accent: string;
  layout: Layout;
  soft: string;
  radius: "soft" | "square";
};

type Experience = { id: string; role: string; company: string; period: string; description: string };
type Education = { id: string; degree: string; school: string; period: string };
type Certification = { id: string; title: string; issuer: string };
type Language = { id: string; name: string; level: string };
type Reference = { id: string; name: string; relation: string; contact: string };

type CvData = {
  fullName: string;
  profession: string;
  email: string;
  phone: string;
  city: string;
  linkedin: string;
  profile: string;
  skills: string;
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  languages: Language[];
  references: Reference[];
};

const templates: Template[] = [
  { id: "h1", name: "Ejecutivo Azul", audience: "Hombre", accent: "#0a2d5a", soft: "#eaf2fb", layout: "sidebar", radius: "soft" },
  { id: "h2", name: "Corporativo Oro", audience: "Hombre", accent: "#9b6a00", soft: "#fff7df", layout: "topbar", radius: "square" },
  { id: "h3", name: "Navy Moderno", audience: "Hombre", accent: "#17365d", soft: "#eef4fa", layout: "split", radius: "soft" },
  { id: "h4", name: "Grafito Premium", audience: "Hombre", accent: "#343a40", soft: "#f1f3f5", layout: "minimal", radius: "square" },
  { id: "h5", name: "Azul Técnico", audience: "Hombre", accent: "#0866d8", soft: "#eaf3ff", layout: "sidebar", radius: "square" },
  { id: "h6", name: "Verde Ejecutivo", audience: "Hombre", accent: "#23664d", soft: "#edf7f2", layout: "topbar", radius: "soft" },
  { id: "h7", name: "Acero Profesional", audience: "Hombre", accent: "#495867", soft: "#f0f3f5", layout: "split", radius: "square" },
  { id: "h8", name: "Índigo Sobrio", audience: "Hombre", accent: "#384a8a", soft: "#eef0fb", layout: "minimal", radius: "soft" },
  { id: "h9", name: "Cobalto Directivo", audience: "Hombre", accent: "#124e78", soft: "#eaf5fb", layout: "sidebar", radius: "soft" },
  { id: "h10", name: "Café Ejecutivo", audience: "Hombre", accent: "#6b4f3b", soft: "#f7f1ec", layout: "topbar", radius: "square" },
  { id: "m1", name: "Dorado Elegante", audience: "Mujer", accent: "#b78314", soft: "#fff8e8", layout: "sidebar", radius: "soft" },
  { id: "m2", name: "Azul Sereno", audience: "Mujer", accent: "#315d8c", soft: "#edf4fb", layout: "topbar", radius: "soft" },
  { id: "m3", name: "Rosa Ejecutivo", audience: "Mujer", accent: "#a24f68", soft: "#fbf0f3", layout: "split", radius: "soft" },
  { id: "m4", name: "Arena Premium", audience: "Mujer", accent: "#8b7355", soft: "#f8f4ef", layout: "minimal", radius: "square" },
  { id: "m5", name: "Lavanda Profesional", audience: "Mujer", accent: "#6a5b8f", soft: "#f2eff8", layout: "sidebar", radius: "soft" },
  { id: "m6", name: "Verde Salvia", audience: "Mujer", accent: "#5f7658", soft: "#f0f5ed", layout: "topbar", radius: "soft" },
  { id: "m7", name: "Borgoña Elegante", audience: "Mujer", accent: "#7e3342", soft: "#f9eef0", layout: "split", radius: "square" },
  { id: "m8", name: "Celeste Moderno", audience: "Mujer", accent: "#367c91", soft: "#edf7fa", layout: "minimal", radius: "soft" },
  { id: "m9", name: "Malva Ejecutivo", audience: "Mujer", accent: "#75596d", soft: "#f5f0f4", layout: "sidebar", radius: "soft" },
  { id: "m10", name: "Champagne Profesional", audience: "Mujer", accent: "#9d7b47", soft: "#faf5ec", layout: "topbar", radius: "square" },
];

const sectionLabels: Record<SectionKey, string> = {
  perfil: "Perfil profesional",
  experiencia: "Experiencia",
  educacion: "Educación",
  certificaciones: "Cursos y certificaciones",
  habilidades: "Habilidades",
  idiomas: "Idiomas",
  referencias: "Referencias",
};

const initialData: CvData = {
  fullName: "Andrea Ramírez",
  profession: "Administradora de Empresas",
  email: "andrea@email.com",
  phone: "+51 999 999 999",
  city: "Lima, Perú",
  linkedin: "linkedin.com/in/andrea",
  profile: "Profesional organizada, orientada a resultados y con experiencia en coordinación administrativa, atención al cliente y mejora de procesos.",
  skills: "Gestión administrativa, Excel, Comunicación, Organización, Trabajo en equipo",
  experiences: [
    { id: "e1", role: "Asistente administrativa", company: "Empresa Ejemplo", period: "2024 - Actualidad", description: "Coordinación de documentos, seguimiento de solicitudes, elaboración de reportes y soporte a distintas áreas." },
  ],
  education: [
    { id: "ed1", degree: "Administración de Empresas", school: "Universidad / Instituto", period: "2019 - 2023" },
  ],
  certifications: [
    { id: "c1", title: "Excel Intermedio", issuer: "Centro de capacitación" },
  ],
  languages: [
    { id: "l1", name: "Español", level: "Nativo" },
    { id: "l2", name: "Inglés", level: "Intermedio" },
  ],
  references: [
    { id: "r1", name: "María López", relation: "Supervisora", contact: "+51 999 888 777" },
  ],
};

const initialOrder: SectionKey[] = ["perfil", "experiencia", "educacion", "certificaciones", "habilidades", "idiomas", "referencias"];
const newId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export function CvBuilder() {
  const [audience, setAudience] = useState<Audience>("Hombre");
  const [templateId, setTemplateId] = useState("h1");
  const [accent, setAccent] = useState("#0a2d5a");
  const [photo, setPhoto] = useState<string>("");
  const [data, setData] = useState<CvData>(initialData);
  const [order, setOrder] = useState<SectionKey[]>(initialOrder);
  const [hidden, setHidden] = useState<SectionKey[]>([]);
  const [activeEditor, setActiveEditor] = useState<SectionKey | "datos">("datos");
  const [saved, setSaved] = useState(false);

  const selectedTemplate = useMemo(() => templates.find((item) => item.id === templateId) ?? templates[0], [templateId]);
  const filteredTemplates = useMemo(() => templates.filter((item) => item.audience === audience), [audience]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("romilplus-cv-draft");
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (draft.data) setData(draft.data);
      if (draft.templateId && templates.some((item) => item.id === draft.templateId)) {
        setTemplateId(draft.templateId);
        const found = templates.find((item) => item.id === draft.templateId);
        if (found) setAudience(found.audience);
      }
      if (draft.accent) setAccent(draft.accent);
      if (draft.order) setOrder(draft.order);
      if (draft.hidden) setHidden(draft.hidden);
    } catch {
      // El borrador es opcional. Si está dañado, el editor inicia limpio.
    }
  }, []);

  const saveDraft = () => {
    localStorage.setItem("romilplus-cv-draft", JSON.stringify({ data, templateId, accent, order, hidden }));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  const chooseTemplate = (template: Template) => {
    setTemplateId(template.id);
    setAccent(template.accent);
  };

  const handlePhoto = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(typeof reader.result === "string" ? reader.result : "");
    reader.readAsDataURL(file);
  };

  const moveSection = (key: SectionKey, direction: -1 | 1) => {
    setOrder((current) => {
      const index = current.indexOf(key);
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) return current;
      const copy = [...current];
      [copy[index], copy[nextIndex]] = [copy[nextIndex], copy[index]];
      return copy;
    });
  };

  const toggleSection = (key: SectionKey) => setHidden((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);

  const reset = () => {
    if (!window.confirm("¿Quieres limpiar el CV y volver al ejemplo inicial?")) return;
    setData(initialData);
    setPhoto("");
    setOrder(initialOrder);
    setHidden([]);
    chooseTemplate(templates[0]);
    setAudience("Hombre");
    localStorage.removeItem("romilplus-cv-draft");
  };

  const downloadPdf = () => {
    const previous = document.title;
    document.title = `${data.fullName || "CV"} - CV`;
    window.print();
    window.setTimeout(() => { document.title = previous; }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-[#0a2d5a]">
      <section className="border-b border-[#dbe5f1] bg-white">
        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-4 px-4 py-7 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#fff5d9] px-3 py-1.5 text-xs font-black uppercase tracking-[.12em] text-[#8a6100]">
              <FileText size={15} /> Creador de CV
            </div>
            <h1 className="mt-3 text-3xl font-black tracking-[-.03em] text-[#0a2d5a] sm:text-4xl">Crea un CV profesional y elegante</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#5f7084] sm:text-base">Elige entre 20 modelos, completa tus datos, personaliza el color y guarda tu currículum en PDF. Tu borrador se guarda solo en este dispositivo.</p>
          </div>
          <div className="flex flex-wrap gap-2 cv-no-print">
            <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#dbe5f1] bg-white px-4 text-sm font-black text-[#52677f] hover:bg-[#f7f9fc]"><RotateCcw size={17}/> Limpiar</button>
            <button type="button" onClick={saveDraft} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#c8d8ea] bg-white px-4 text-sm font-black text-[#0a2d5a] hover:bg-[#eef5ff]">{saved ? <Check size={17}/> : <Save size={17}/>} {saved ? "Guardado" : "Guardar"}</button>
            <button type="button" onClick={downloadPdf} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0a2d5a] px-5 text-sm font-black text-white shadow-sm hover:bg-[#123e72]"><Download size={18}/> Descargar PDF</button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1500px] gap-5 px-4 py-5 sm:px-6 xl:grid-cols-[360px_minmax(0,1fr)_290px]">
        <aside className="cv-no-print order-1 rounded-[24px] border border-[#dbe5f1] bg-white p-4 shadow-sm xl:sticky xl:top-[88px] xl:h-[calc(100vh-110px)] xl:overflow-y-auto">
          <h2 className="text-lg font-black text-[#0a2d5a]">Editar contenido</h2>
          <p className="mt-1 text-xs leading-5 text-[#718096]">Selecciona una sección y completa tus datos.</p>
          <div className="mt-4 grid gap-2">
            <EditorTab label="Datos personales" active={activeEditor === "datos"} onClick={() => setActiveEditor("datos")} />
            {order.map((key) => <EditorTab key={key} label={sectionLabels[key]} active={activeEditor === key} onClick={() => setActiveEditor(key)} />)}
          </div>
          <div className="mt-5 border-t border-[#e3eaf2] pt-5">
            {activeEditor === "datos" && <PersonalEditor data={data} setData={setData} photo={photo} onPhoto={handlePhoto} />}
            {activeEditor === "perfil" && <TextArea label="Resumen profesional" value={data.profile} onChange={(value) => setData({ ...data, profile: value })} rows={6} />}
            {activeEditor === "experiencia" && <ExperienceEditor data={data} setData={setData} />}
            {activeEditor === "educacion" && <EducationEditor data={data} setData={setData} />}
            {activeEditor === "certificaciones" && <CertificationEditor data={data} setData={setData} />}
            {activeEditor === "habilidades" && <TextArea label="Habilidades separadas por comas" value={data.skills} onChange={(value) => setData({ ...data, skills: value })} rows={6} />}
            {activeEditor === "idiomas" && <LanguageEditor data={data} setData={setData} />}
            {activeEditor === "referencias" && <ReferenceEditor data={data} setData={setData} />}
          </div>
        </aside>

        <div className="order-2 min-w-0">
          <div className="cv-no-print mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black text-[#0a2d5a]">Vista previa</p>
              <p className="text-xs text-[#718096]">Se adapta a A4 al imprimir o guardar como PDF.</p>
            </div>
            <span className="rounded-full border border-[#dbe5f1] bg-white px-3 py-1 text-xs font-bold text-[#5f7084]">{selectedTemplate.name}</span>
          </div>
          <CvPreview template={selectedTemplate} accent={accent} photo={photo} data={data} order={order} hidden={hidden} />
        </div>

        <aside className="cv-no-print order-3 rounded-[24px] border border-[#dbe5f1] bg-white p-4 shadow-sm xl:sticky xl:top-[88px] xl:h-[calc(100vh-110px)] xl:overflow-y-auto">
          <div className="flex items-center gap-2"><Palette size={18} className="text-[#d89b09]"/><h2 className="text-lg font-black">Diseño</h2></div>
          <p className="mt-1 text-xs leading-5 text-[#718096]">Todos los modelos pueden usarse libremente; los grupos solo ayudan a explorar estilos.</p>

          <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-[#f4f7fb] p-1.5">
            {(["Hombre", "Mujer"] as Audience[]).map((item) => <button key={item} type="button" onClick={() => setAudience(item)} className={`rounded-xl px-3 py-2 text-sm font-black transition ${audience === item ? "bg-white text-[#0a2d5a] shadow-sm" : "text-[#718096]"}`}>{item}</button>)}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {filteredTemplates.map((template) => <TemplateCard key={template.id} template={template} selected={template.id === templateId} onClick={() => chooseTemplate(template)} />)}
          </div>

          <div className="mt-5 border-t border-[#e3eaf2] pt-5">
            <label className="text-xs font-black uppercase tracking-[.1em] text-[#60758d]">Color principal</label>
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#dbe5f1] p-2.5">
              <input aria-label="Elegir color principal" type="color" value={accent} onChange={(event) => setAccent(event.target.value)} className="h-10 w-12 cursor-pointer rounded-lg border-0 bg-transparent p-0" />
              <div><p className="text-sm font-black">Personalizar</p><p className="text-xs text-[#718096]">{accent.toUpperCase()}</p></div>
            </div>
          </div>

          <div className="mt-5 border-t border-[#e3eaf2] pt-5">
            <p className="text-xs font-black uppercase tracking-[.1em] text-[#60758d]">Orden y visibilidad</p>
            <div className="mt-3 grid gap-2">
              {order.map((key, index) => {
                const isHidden = hidden.includes(key);
                return <div key={key} className="flex items-center gap-1 rounded-xl border border-[#e3eaf2] bg-[#fbfcfe] p-2">
                  <button type="button" onClick={() => toggleSection(key)} className="grid h-8 w-8 place-items-center rounded-lg text-[#52677f] hover:bg-white" aria-label={isHidden ? "Mostrar sección" : "Ocultar sección"}>{isHidden ? <EyeOff size={16}/> : <Eye size={16}/>}</button>
                  <span className={`min-w-0 flex-1 truncate text-xs font-bold ${isHidden ? "text-[#9aa8b8] line-through" : "text-[#41566e]"}`}>{sectionLabels[key]}</span>
                  <button type="button" disabled={index === 0} onClick={() => moveSection(key, -1)} className="grid h-8 w-8 place-items-center rounded-lg text-[#60758d] disabled:opacity-25"><ChevronUp size={16}/></button>
                  <button type="button" disabled={index === order.length - 1} onClick={() => moveSection(key, 1)} className="grid h-8 w-8 place-items-center rounded-lg text-[#60758d] disabled:opacity-25"><ChevronDown size={16}/></button>
                </div>;
              })}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function EditorTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`rounded-xl px-3 py-2.5 text-left text-sm font-black transition ${active ? "bg-[#eef5ff] text-[#0758ad] ring-1 ring-inset ring-[#c5dcf5]" : "text-[#52677f] hover:bg-[#f7f9fc]"}`}>{label}</button>;
}

function Field({ label, value, onChange, placeholder = "" }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className="grid gap-1.5"><span className="text-xs font-black text-[#52677f]">{label}</span><input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="min-h-11 rounded-xl border border-[#dbe5f1] bg-white px-3 text-sm text-[#17365d] outline-none transition placeholder:text-[#a0adbb] focus:border-[#7eafe5] focus:ring-2 focus:ring-[#dbeafe]" /></label>;
}

function TextArea({ label, value, onChange, rows = 4 }: { label: string; value: string; onChange: (value: string) => void; rows?: number }) {
  return <label className="grid gap-1.5"><span className="text-xs font-black text-[#52677f]">{label}</span><textarea value={value} rows={rows} onChange={(event) => onChange(event.target.value)} className="resize-y rounded-xl border border-[#dbe5f1] bg-white px-3 py-2.5 text-sm leading-5 text-[#17365d] outline-none focus:border-[#7eafe5] focus:ring-2 focus:ring-[#dbeafe]" /></label>;
}

function PersonalEditor({ data, setData, photo, onPhoto }: { data: CvData; setData: (value: CvData) => void; photo: string; onPhoto: (file?: File) => void }) {
  return <div className="grid gap-3">
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[#b9cce1] bg-[#f8fbff] p-3">
      <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-[#eaf2fb] text-[#0a2d5a]">{photo ? <img src={photo} alt="Foto del CV" className="h-full w-full object-cover"/> : <ImagePlus size={20}/>}</span>
      <span><span className="block text-sm font-black text-[#17365d]">Foto opcional</span><span className="text-xs text-[#718096]">JPG o PNG desde tu dispositivo</span></span>
      <input type="file" accept="image/*" onChange={(event) => onPhoto(event.target.files?.[0])} className="hidden" />
    </label>
    <Field label="Nombres y apellidos" value={data.fullName} onChange={(value) => setData({ ...data, fullName: value })} />
    <Field label="Profesión o cargo" value={data.profession} onChange={(value) => setData({ ...data, profession: value })} />
    <Field label="Correo" value={data.email} onChange={(value) => setData({ ...data, email: value })} />
    <Field label="Teléfono" value={data.phone} onChange={(value) => setData({ ...data, phone: value })} />
    <Field label="Ciudad" value={data.city} onChange={(value) => setData({ ...data, city: value })} />
    <Field label="LinkedIn / portafolio" value={data.linkedin} onChange={(value) => setData({ ...data, linkedin: value })} />
  </div>;
}

function ExperienceEditor({ data, setData }: { data: CvData; setData: (value: CvData) => void }) {
  const update = (id: string, patch: Partial<Experience>) => setData({ ...data, experiences: data.experiences.map((item) => item.id === id ? { ...item, ...patch } : item) });
  return <ListEditor title="experiencia" onAdd={() => setData({ ...data, experiences: [...data.experiences, { id: newId(), role: "", company: "", period: "", description: "" }] })}>
    {data.experiences.map((item, index) => <EditorCard key={item.id} title={`Experiencia ${index + 1}`} onDelete={() => setData({ ...data, experiences: data.experiences.filter((value) => value.id !== item.id) })}>
      <Field label="Puesto" value={item.role} onChange={(value) => update(item.id, { role: value })}/><Field label="Empresa" value={item.company} onChange={(value) => update(item.id, { company: value })}/><Field label="Periodo" value={item.period} onChange={(value) => update(item.id, { period: value })}/><TextArea label="Funciones / logros" value={item.description} onChange={(value) => update(item.id, { description: value })}/>
    </EditorCard>)}
  </ListEditor>;
}

function EducationEditor({ data, setData }: { data: CvData; setData: (value: CvData) => void }) {
  const update = (id: string, patch: Partial<Education>) => setData({ ...data, education: data.education.map((item) => item.id === id ? { ...item, ...patch } : item) });
  return <ListEditor title="estudio" onAdd={() => setData({ ...data, education: [...data.education, { id: newId(), degree: "", school: "", period: "" }] })}>
    {data.education.map((item, index) => <EditorCard key={item.id} title={`Estudio ${index + 1}`} onDelete={() => setData({ ...data, education: data.education.filter((value) => value.id !== item.id) })}><Field label="Carrera / grado" value={item.degree} onChange={(value) => update(item.id, { degree: value })}/><Field label="Institución" value={item.school} onChange={(value) => update(item.id, { school: value })}/><Field label="Periodo" value={item.period} onChange={(value) => update(item.id, { period: value })}/></EditorCard>)}
  </ListEditor>;
}

function CertificationEditor({ data, setData }: { data: CvData; setData: (value: CvData) => void }) {
  const update = (id: string, patch: Partial<Certification>) => setData({ ...data, certifications: data.certifications.map((item) => item.id === id ? { ...item, ...patch } : item) });
  return <ListEditor title="certificación" onAdd={() => setData({ ...data, certifications: [...data.certifications, { id: newId(), title: "", issuer: "" }] })}>
    {data.certifications.map((item, index) => <EditorCard key={item.id} title={`Certificación ${index + 1}`} onDelete={() => setData({ ...data, certifications: data.certifications.filter((value) => value.id !== item.id) })}><Field label="Curso / certificación" value={item.title} onChange={(value) => update(item.id, { title: value })}/><Field label="Institución" value={item.issuer} onChange={(value) => update(item.id, { issuer: value })}/></EditorCard>)}
  </ListEditor>;
}

function LanguageEditor({ data, setData }: { data: CvData; setData: (value: CvData) => void }) {
  const update = (id: string, patch: Partial<Language>) => setData({ ...data, languages: data.languages.map((item) => item.id === id ? { ...item, ...patch } : item) });
  return <ListEditor title="idioma" onAdd={() => setData({ ...data, languages: [...data.languages, { id: newId(), name: "", level: "" }] })}>
    {data.languages.map((item, index) => <EditorCard key={item.id} title={`Idioma ${index + 1}`} onDelete={() => setData({ ...data, languages: data.languages.filter((value) => value.id !== item.id) })}><Field label="Idioma" value={item.name} onChange={(value) => update(item.id, { name: value })}/><Field label="Nivel" value={item.level} onChange={(value) => update(item.id, { level: value })}/></EditorCard>)}
  </ListEditor>;
}

function ReferenceEditor({ data, setData }: { data: CvData; setData: (value: CvData) => void }) {
  const update = (id: string, patch: Partial<Reference>) => setData({ ...data, references: data.references.map((item) => item.id === id ? { ...item, ...patch } : item) });
  return <ListEditor title="referencia" onAdd={() => setData({ ...data, references: [...data.references, { id: newId(), name: "", relation: "", contact: "" }] })}>
    {data.references.map((item, index) => <EditorCard key={item.id} title={`Referencia ${index + 1}`} onDelete={() => setData({ ...data, references: data.references.filter((value) => value.id !== item.id) })}><Field label="Nombre" value={item.name} onChange={(value) => update(item.id, { name: value })}/><Field label="Cargo / relación" value={item.relation} onChange={(value) => update(item.id, { relation: value })}/><Field label="Contacto" value={item.contact} onChange={(value) => update(item.id, { contact: value })}/></EditorCard>)}
  </ListEditor>;
}

function ListEditor({ title, onAdd, children }: { title: string; onAdd: () => void; children: React.ReactNode }) {
  return <div className="grid gap-3">{children}<button type="button" onClick={onAdd} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-dashed border-[#9cbce0] bg-[#f8fbff] px-3 text-sm font-black text-[#0758ad]"><Plus size={16}/> Agregar {title}</button></div>;
}

function EditorCard({ title, onDelete, children }: { title: string; onDelete: () => void; children: React.ReactNode }) {
  return <div className="rounded-2xl border border-[#e0e8f1] bg-[#fbfcfe] p-3"><div className="mb-3 flex items-center justify-between"><p className="text-xs font-black uppercase tracking-[.08em] text-[#60758d]">{title}</p><button type="button" onClick={onDelete} className="grid h-8 w-8 place-items-center rounded-lg text-[#a55252] hover:bg-[#fff0f0]" aria-label="Eliminar"><Trash2 size={15}/></button></div><div className="grid gap-3">{children}</div></div>;
}

function TemplateCard({ template, selected, onClick }: { template: Template; selected: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`overflow-hidden rounded-xl border bg-white text-left transition ${selected ? "border-[#e6aa16] ring-2 ring-[#ffe8a6]" : "border-[#dbe5f1] hover:border-[#9db9d9]"}`}>
    <div className="h-20 p-2" style={{ background: template.soft }}>
      <div className={`h-full overflow-hidden bg-white shadow-sm ${template.radius === "soft" ? "rounded-lg" : "rounded-sm"}`}>
        <div className="h-3" style={{ background: template.accent }}/>
        <div className="grid grid-cols-[26%_1fr] gap-1 p-1.5"><div className="h-10" style={{ background: template.soft }}/><div className="space-y-1"><div className="h-1.5 w-3/4" style={{ background: template.accent }}/><div className="h-1 w-full bg-[#dfe5ec]"/><div className="h-1 w-5/6 bg-[#e7ecf1]"/><div className="h-1 w-4/6 bg-[#e7ecf1]"/></div></div>
      </div>
    </div>
    <div className="border-t border-[#edf1f5] px-2 py-2"><p className="truncate text-[11px] font-black text-[#41566e]">{template.name}</p></div>
  </button>;
}

function CvPreview({ template, accent, photo, data, order, hidden }: { template: Template; accent: string; photo: string; data: CvData; order: SectionKey[]; hidden: SectionKey[] }) {
  const visibleOrder = order.filter((key) => !hidden.includes(key));
  const sideKeys: SectionKey[] = ["habilidades", "idiomas", "certificaciones", "referencias"];
  const mainKeys = visibleOrder.filter((key) => !sideKeys.includes(key));
  const asideKeys = visibleOrder.filter((key) => sideKeys.includes(key));
  const rounded = template.radius === "soft" ? "rounded-[6px]" : "rounded-none";

  if (template.layout === "sidebar") {
    return <div id="cv-print-area" className={`cv-page mx-auto overflow-hidden bg-white shadow-[0_18px_60px_rgba(10,45,90,.16)] ${rounded}`}>
      <div className="grid min-h-[1122px] grid-cols-[31%_69%]">
        <aside className="p-7 text-white" style={{ background: accent }}>
          <Avatar photo={photo} soft={template.soft} />
          <div className="mt-7 text-[11px] leading-5 text-white/85"><Contact data={data} light /></div>
          <div className="mt-6 space-y-6">{asideKeys.map((key) => <PreviewSection key={key} section={key} data={data} accent="#ffffff" light />)}</div>
        </aside>
        <div className="p-9">
          <CvHeader data={data} accent={accent}/>
          <div className="mt-8 space-y-7">{mainKeys.map((key) => <PreviewSection key={key} section={key} data={data} accent={accent} />)}</div>
        </div>
      </div>
    </div>;
  }

  if (template.layout === "topbar") {
    return <div id="cv-print-area" className={`cv-page mx-auto overflow-hidden bg-white shadow-[0_18px_60px_rgba(10,45,90,.16)] ${rounded}`}>
      <header className="grid grid-cols-[1fr_auto] items-center gap-6 p-9 text-white" style={{ background: accent }}><div><h2 className="text-[34px] font-black leading-none tracking-[-.03em]">{data.fullName || "Tu nombre"}</h2><p className="mt-2 text-[14px] font-bold text-white/80">{data.profession}</p><div className="mt-4 text-[10px] leading-5 text-white/80"><Contact data={data} light /></div></div><Avatar photo={photo} soft={template.soft} /></header>
      <div className="grid grid-cols-[1fr_34%] gap-8 p-9"><div className="space-y-7">{mainKeys.map((key) => <PreviewSection key={key} section={key} data={data} accent={accent} />)}</div><aside className="space-y-6 border-l border-[#e4e9ef] pl-6">{asideKeys.map((key) => <PreviewSection key={key} section={key} data={data} accent={accent} />)}</aside></div>
    </div>;
  }

  if (template.layout === "split") {
    return <div id="cv-print-area" className={`cv-page mx-auto overflow-hidden bg-white shadow-[0_18px_60px_rgba(10,45,90,.16)] ${rounded}`}>
      <div className="h-3" style={{ background: accent }}/><div className="grid grid-cols-[auto_1fr] items-center gap-6 px-9 py-8"><Avatar photo={photo} soft={template.soft}/><CvHeader data={data} accent={accent}/></div><div className="mx-9 h-px" style={{ background: `${accent}33` }}/>
      <div className="grid grid-cols-[1fr_1fr] gap-9 p-9"><div className="space-y-7">{visibleOrder.filter((_, index) => index % 2 === 0).map((key) => <PreviewSection key={key} section={key} data={data} accent={accent}/>)}</div><div className="space-y-7">{visibleOrder.filter((_, index) => index % 2 === 1).map((key) => <PreviewSection key={key} section={key} data={data} accent={accent}/>)}</div></div>
    </div>;
  }

  return <div id="cv-print-area" className={`cv-page mx-auto overflow-hidden bg-white p-10 shadow-[0_18px_60px_rgba(10,45,90,.16)] ${rounded}`}>
    <div className="flex items-start justify-between gap-8"><CvHeader data={data} accent={accent}/><Avatar photo={photo} soft={template.soft}/></div><div className="mt-5 border-y border-[#e4e9ef] py-3 text-[10px] text-[#64748b]"><Contact data={data}/></div><div className="mt-8 grid grid-cols-2 gap-x-10 gap-y-7">{visibleOrder.map((key) => <PreviewSection key={key} section={key} data={data} accent={accent}/>)}</div>
  </div>;
}

function Avatar({ photo, soft }: { photo: string; soft: string }) {
  return <div className="grid h-[104px] w-[104px] shrink-0 place-items-center overflow-hidden rounded-full border-4 border-white/70 shadow-sm" style={{ background: soft }}>{photo ? <img src={photo} alt="Foto" className="h-full w-full object-cover"/> : <span className="text-[11px] font-black uppercase tracking-[.08em] text-[#718096]">Foto</span>}</div>;
}

function CvHeader({ data, accent }: { data: CvData; accent: string }) {
  return <div><h2 className="text-[34px] font-black leading-[1.02] tracking-[-.04em] text-[#172033]">{data.fullName || "Tu nombre"}</h2><p className="mt-2 text-[14px] font-black uppercase tracking-[.08em]" style={{ color: accent }}>{data.profession || "Profesión o cargo"}</p></div>;
}

function Contact({ data, light = false }: { data: CvData; light?: boolean }) {
  const values = [data.email, data.phone, data.city, data.linkedin].filter(Boolean);
  return <div className={`flex flex-wrap gap-x-3 gap-y-1 ${light ? "text-white/85" : "text-[#64748b]"}`}>{values.map((value, index) => <span key={`${value}-${index}`}>{value}</span>)}</div>;
}

function PreviewSection({ section, data, accent, light = false }: { section: SectionKey; data: CvData; accent: string; light?: boolean }) {
  const heading = <h3 className={`mb-3 border-b pb-1.5 text-[11px] font-black uppercase tracking-[.13em] ${light ? "border-white/25 text-white" : "border-[#dce4ed]"}`} style={light ? undefined : { color: accent }}>{sectionLabels[section]}</h3>;
  const textClass = light ? "text-white/78" : "text-[#4b5563]";
  if (section === "perfil") return <section>{heading}<p className={`text-[10.5px] leading-[1.65] ${textClass}`}>{data.profile}</p></section>;
  if (section === "experiencia") return <section>{heading}<div className="space-y-4">{data.experiences.map((item) => <div key={item.id}><div className="flex items-start justify-between gap-3"><div><p className={`text-[11px] font-black ${light ? "text-white" : "text-[#202a3a]"}`}>{item.role}</p><p className={`mt-0.5 text-[10px] font-bold ${textClass}`}>{item.company}</p></div><span className={`shrink-0 text-[9px] font-bold ${textClass}`}>{item.period}</span></div><p className={`mt-1.5 text-[10px] leading-[1.55] ${textClass}`}>{item.description}</p></div>)}</div></section>;
  if (section === "educacion") return <section>{heading}<div className="space-y-3">{data.education.map((item) => <div key={item.id}><p className={`text-[11px] font-black ${light ? "text-white" : "text-[#202a3a]"}`}>{item.degree}</p><p className={`mt-0.5 text-[10px] ${textClass}`}>{item.school}</p><p className={`text-[9px] font-bold ${textClass}`}>{item.period}</p></div>)}</div></section>;
  if (section === "certificaciones") return <section>{heading}<div className="space-y-2">{data.certifications.map((item) => <div key={item.id}><p className={`text-[10.5px] font-black ${light ? "text-white" : "text-[#202a3a]"}`}>{item.title}</p><p className={`text-[9.5px] ${textClass}`}>{item.issuer}</p></div>)}</div></section>;
  if (section === "habilidades") return <section>{heading}<div className="flex flex-wrap gap-1.5">{data.skills.split(",").map((skill) => skill.trim()).filter(Boolean).map((skill) => <span key={skill} className={`rounded-full px-2 py-1 text-[9px] font-bold ${light ? "bg-white/12 text-white" : "text-[#334155]"}`} style={light ? undefined : { background: `${accent}12` }}>{skill}</span>)}</div></section>;
  if (section === "idiomas") return <section>{heading}<div className="space-y-1.5">{data.languages.map((item) => <div key={item.id} className={`flex justify-between gap-3 text-[10px] ${textClass}`}><span className={light ? "font-bold text-white" : "font-bold text-[#202a3a]"}>{item.name}</span><span>{item.level}</span></div>)}</div></section>;
  return <section>{heading}<div className="space-y-2">{data.references.map((item) => <div key={item.id}><p className={`text-[10.5px] font-black ${light ? "text-white" : "text-[#202a3a]"}`}>{item.name}</p><p className={`text-[9.5px] ${textClass}`}>{item.relation}</p><p className={`text-[9.5px] ${textClass}`}>{item.contact}</p></div>)}</div></section>;
}
