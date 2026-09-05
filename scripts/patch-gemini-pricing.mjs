import fs from "node:fs";

const file = "components/ProductCard.tsx";
let source = fs.readFileSync(file, "utf8");

source = source.replace(
  "const geminiUnitPrice = geminiQuantity === 1 ? 20 : geminiQuantity === 2 ? 17 : geminiQuantity === 3 ? 14 : 10;",
  "const geminiUnitPrice = geminiQuantity === 1 ? 15 : geminiQuantity === 2 ? 13 : 10;",
);

source = source.replace(
  "(q===1?20:q===2?17:q===3?14:10).toFixed(2)",
  "(q===1?15:q===2?13:10).toFixed(2)",
);

fs.writeFileSync(file, source);
console.log("Gemini pricing applied: 1=S/15, 2=S/13 c/u, 3+=S/10 c/u");
