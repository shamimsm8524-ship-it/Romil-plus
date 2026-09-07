import { privatePageMetadata } from "@/lib/seo";

export const metadata = privatePageMetadata;

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="admin-color-shell">
    <style>{`
      .admin-color-shell{min-height:100vh;position:relative;isolation:isolate;overflow-x:hidden;background:#030308;color:#fff}
      .admin-color-shell:before{content:"";position:fixed;inset:0;z-index:-2;pointer-events:none;background:radial-gradient(circle at 8% 8%,rgba(35,211,255,.16),transparent 27%),radial-gradient(circle at 92% 10%,rgba(220,70,255,.16),transparent 28%),radial-gradient(circle at 50% 95%,rgba(99,102,241,.14),transparent 36%)}
      .admin-color-shell:after{content:"";position:fixed;left:0;right:0;top:0;height:1px;z-index:20;pointer-events:none;background:linear-gradient(90deg,transparent,#4bdcff,#9b6cff,#ff5fc7,#ffd15c,transparent)}
      .admin-color-shell main{position:relative;z-index:1}
      .admin-color-shell main>div:first-child h1{background:linear-gradient(90deg,#fff,#75e8ff,#bd8bff,#ff82d2,#ffe47d);-webkit-background-clip:text;background-clip:text;color:transparent}
      .admin-color-shell article{border-color:rgba(114,138,255,.22)!important;background:radial-gradient(circle at 0% 0%,rgba(45,204,255,.10),transparent 35%),radial-gradient(circle at 100% 100%,rgba(222,65,255,.10),transparent 38%),rgba(8,9,17,.88)!important;box-shadow:0 18px 50px rgba(0,0,0,.34),0 0 30px rgba(82,135,255,.06)}
      .admin-color-shell article>div[class*="border-[#e3b64f]"]{border-color:rgba(81,220,255,.22)!important;background:linear-gradient(90deg,rgba(34,211,238,.08),rgba(168,85,247,.07))!important}
      .admin-color-shell article>div[class*="border-violet"]{border-color:rgba(225,83,255,.25)!important;background:linear-gradient(90deg,rgba(168,85,247,.10),rgba(236,72,153,.08))!important}
      .admin-color-shell section{box-shadow:inset 0 1px 0 rgba(255,255,255,.015)}
      .admin-color-shell input,.admin-color-shell textarea,.admin-color-shell select{border-color:rgba(100,220,255,.16)!important;background:rgba(2,4,12,.72)!important;color:white!important;transition:border-color .2s ease,box-shadow .2s ease,background .2s ease}
      .admin-color-shell input:focus,.admin-color-shell textarea:focus,.admin-color-shell select:focus{outline:none!important;border-color:rgba(102,225,255,.65)!important;box-shadow:0 0 0 3px rgba(50,205,255,.07),0 0 25px rgba(153,88,255,.10)}
      .admin-color-shell button,.admin-color-shell a{transition:transform .18s ease,filter .18s ease,box-shadow .18s ease,border-color .18s ease}
      .admin-color-shell button:not(:disabled):hover,.admin-color-shell a:hover{filter:brightness(1.08)}
      .admin-color-shell button:not(:disabled):active,.admin-color-shell a:active{transform:scale(.98)}
      .admin-color-shell button[class*="bg-emerald"]{box-shadow:0 0 24px rgba(16,185,129,.15)}
      .admin-color-shell button[class*="bg-amber"]{box-shadow:0 0 24px rgba(251,191,36,.13)}
      .admin-color-shell button[class*="bg-red"]{box-shadow:0 0 24px rgba(239,68,68,.12)}
      .admin-color-shell button[class*="bg-violet"]{box-shadow:0 0 26px rgba(168,85,247,.18)}
      .admin-color-shell [class*="border-amber-400"]{box-shadow:0 0 26px rgba(251,191,36,.08)}
      .admin-color-shell [class*="border-violet-400"]{box-shadow:0 0 26px rgba(168,85,247,.08)}
      .admin-color-shell [class*="border-emerald-400"]{box-shadow:0 0 26px rgba(16,185,129,.07)}
      .admin-color-shell [class*="border-red-400"]{box-shadow:0 0 26px rgba(239,68,68,.06)}
      @media(prefers-reduced-motion:reduce){.admin-color-shell button,.admin-color-shell a,.admin-color-shell input,.admin-color-shell textarea,.admin-color-shell select{transition:none!important}}
    `}</style>
    {children}
  </div>;
}
