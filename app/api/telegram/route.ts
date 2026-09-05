import { NextRequest, NextResponse } from "next/server";
import { categories, products } from "@/lib/products";

export const dynamic = "force-dynamic";

const TELEGRAM_API = "https://api.telegram.org";
const STORE_URL = process.env.TELEGRAM_STORE_URL || "https://romilplus.me";
const PAGE_SIZE = 6;

type ButtonStyle = "danger" | "success" | "primary";

type InlineButton = {
  text: string;
  callback_data?: string;
  url?: string;
  style?: ButtonStyle;
};

type InlineKeyboard = {
  inline_keyboard: InlineButton[][];
};

type TelegramMessage = {
  message_id: number;
  chat: { id: number };
  text?: string;
};

type TelegramCallbackQuery = {
  id: string;
  message?: TelegramMessage;
  data?: string;
};

type TelegramUpdate = {
  message?: TelegramMessage;
  callback_query?: TelegramCallbackQuery;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function penPerUsd() {
  const configured = Number(process.env.TELEGRAM_PEN_PER_USD || "3.75");
  return Number.isFinite(configured) && configured > 0 ? configured : 3.75;
}

function usdValue(pen: number) {
  return pen / penPerUsd();
}

function priceLine(pen: number) {
  if (pen <= 0) return "Consultar precio";
  return `S/ ${pen.toFixed(2)} (≈ $${usdValue(pen).toFixed(2)} USD)`;
}

function priceButton(pen: number) {
  if (pen <= 0) return "Consultar";
  return `$${usdValue(pen).toFixed(2)} USD`;
}

async function telegramCall(method: string, body: Record<string, unknown>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN is not configured");

  const response = await fetch(`${TELEGRAM_API}/bot${token}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const payload = (await response.json()) as { ok?: boolean; description?: string };
  if (!response.ok || payload.ok === false) {
    throw new Error(payload.description || `Telegram API error ${response.status}`);
  }
  return payload;
}

async function sendText(chatId: number, text: string, replyMarkup?: InlineKeyboard) {
  return telegramCall("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    ...(replyMarkup ? { reply_markup: replyMarkup } : {}),
  });
}

async function editText(chatId: number, messageId: number, text: string, replyMarkup?: InlineKeyboard) {
  return telegramCall("editMessageText", {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    ...(replyMarkup ? { reply_markup: replyMarkup } : {}),
  });
}

async function answerCallback(callbackQueryId: string) {
  return telegramCall("answerCallbackQuery", { callback_query_id: callbackQueryId });
}

async function render(
  chatId: number,
  text: string,
  keyboard: InlineKeyboard,
  messageId?: number,
) {
  if (messageId) return editText(chatId, messageId, text, keyboard);
  return sendText(chatId, text, keyboard);
}

function homeKeyboard(): InlineKeyboard {
  return {
    inline_keyboard: [
      [{ text: "📂 Ver catálogo", callback_data: "catalog", style: "primary" }],
      [
        { text: "💳 Formas de pago", callback_data: "payments", style: "primary" },
        { text: "🌐 RomilPlus.me", url: STORE_URL, style: "success" },
      ],
      [
        { text: "📦 Mis pedidos", url: `${STORE_URL}/mis-compras` },
        { text: "🎧 Soporte", url: `${STORE_URL}/soporte` },
      ],
      [{ text: "🔄 Actualizar", callback_data: "home", style: "success" }],
    ],
  };
}

async function showHome(chatId: number, messageId?: number) {
  const text = [
    "<b>🛍️ ROMIL PLUS STORE</b>",
    "",
    "Accesos, suscripciones digitales, software y servicios online.",
    "",
    "💵 Los productos muestran su precio en soles y su equivalente aproximado en dólares.",
    "🌐 Sitio oficial: <b>romilplus.me</b>",
    "",
    "Elige una opción:",
  ].join("\n");

  return render(chatId, text, homeKeyboard(), messageId);
}

async function showCatalog(chatId: number, messageId?: number) {
  const rows: InlineButton[][] = categories.map((category, index) => [
    {
      text: `📁 ${category}`,
      callback_data: `cat:${index}:0`,
      style: "primary",
    },
  ]);

  rows.push([{ text: "🏠 Inicio", callback_data: "home" }]);

  const text = [
    "<b>📂 Catálogo Romil Plus</b>",
    "",
    "Selecciona una categoría para ver productos y precios en USD.",
  ].join("\n");

  return render(chatId, text, { inline_keyboard: rows }, messageId);
}

async function showCategory(chatId: number, categoryIndex: number, page: number, messageId?: number) {
  const category = categories[categoryIndex];
  if (!category) return showCatalog(chatId, messageId);

  const entries = products
    .map((product, productIndex) => ({ product, productIndex }))
    .filter(({ product }) => product.category === category);

  const pages = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(page, 0), pages - 1);
  const visible = entries.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const rows: InlineButton[][] = visible.map(({ product, productIndex }) => [
    {
      text: `🛍️ ${product.name} · ${priceButton(product.price)}`,
      callback_data: `prod:${productIndex}:${categoryIndex}:${safePage}`,
      style: product.price > 0 ? "success" : "primary",
    },
  ]);

  if (pages > 1) {
    const navigation: InlineButton[] = [];
    if (safePage > 0) {
      navigation.push({ text: "◀️ Anterior", callback_data: `cat:${categoryIndex}:${safePage - 1}` });
    }
    if (safePage < pages - 1) {
      navigation.push({ text: "Siguiente ▶️", callback_data: `cat:${categoryIndex}:${safePage + 1}` });
    }
    rows.push(navigation);
  }

  rows.push([
    { text: "⬅️ Categorías", callback_data: "catalog" },
    { text: "🏠 Inicio", callback_data: "home" },
  ]);

  const text = [
    `<b>📁 ${escapeHtml(category)}</b>`,
    "",
    entries.length ? "Toca un producto para ver sus detalles." : "Aún no hay productos en esta categoría.",
    pages > 1 ? `Página ${safePage + 1}/${pages}` : "",
  ].filter(Boolean).join("\n");

  return render(chatId, text, { inline_keyboard: rows }, messageId);
}

async function showProduct(
  chatId: number,
  productIndex: number,
  categoryIndex: number,
  page: number,
  messageId?: number,
) {
  const product = products[productIndex];
  if (!product) return showCatalog(chatId, messageId);

  const rows: InlineButton[][] = [];

  if (product.variants?.length) {
    product.variants.forEach((variant) => {
      rows.push([
        {
          text: `${variant.label} · ${priceButton(variant.price)}`,
          url: `${STORE_URL}/producto/${encodeURIComponent(product.id)}`,
          style: "success",
        },
      ]);
    });
  } else {
    rows.push([
      {
        text: "🌐 Ver producto en Romil Plus",
        url: `${STORE_URL}/producto/${encodeURIComponent(product.id)}`,
        style: "success",
      },
    ]);
  }

  rows.push([
    { text: "⬅️ Volver", callback_data: `cat:${categoryIndex}:${page}` },
    { text: "🏠 Inicio", callback_data: "home" },
  ]);

  const variantText = product.variants?.length
    ? ["", "<b>Opciones:</b>", ...product.variants.map((variant) => `• ${escapeHtml(variant.label)} — ${priceLine(variant.price)}`)]
    : [];

  const text = [
    `<b>🛍️ ${escapeHtml(product.name)}</b>`,
    "",
    escapeHtml(product.description),
    "",
    `⏳ Duración: ${escapeHtml(product.duration)}`,
    product.guarantee ? `🛡️ Garantía: ${escapeHtml(product.guarantee)}` : "",
    `💵 Precio: ${priceLine(product.price)}`,
    ...variantText,
  ].filter(Boolean).join("\n");

  return render(chatId, text, { inline_keyboard: rows }, messageId);
}

async function showPayments(chatId: number, messageId?: number) {
  const text = [
    "<b>💳 Formas de pago</b>",
    "",
    "⭐ <b>Dentro de Telegram:</b> las compras de productos digitales deben realizarse con Telegram Stars.",
    "",
    "🌐 <b>En RomilPlus.me:</b> puedes consultar las opciones disponibles de Yape, Plin, BCP, Interbank y PayPal.",
    "",
    "Por seguridad, los datos bancarios y códigos QR se muestran únicamente durante el proceso de compra en la web.",
  ].join("\n");

  const keyboard: InlineKeyboard = {
    inline_keyboard: [
      [{ text: "🌐 Abrir RomilPlus.me", url: STORE_URL, style: "success" }],
      [{ text: "🏠 Inicio", callback_data: "home" }],
    ],
  };

  return render(chatId, text, keyboard, messageId);
}

async function showOrders(chatId: number) {
  return sendText(
    chatId,
    "<b>📦 Mis pedidos</b>\n\nConsulta tus compras y su estado desde tu cuenta de Romil Plus.",
    {
      inline_keyboard: [
        [{ text: "📦 Abrir mis pedidos", url: `${STORE_URL}/mis-compras`, style: "primary" }],
        [{ text: "🏠 Ir a Romil Plus", url: STORE_URL }],
      ],
    },
  );
}

async function showSupport(chatId: number) {
  return sendText(
    chatId,
    "<b>🎧 Soporte Romil Plus</b>\n\nSi tienes un inconveniente con una compra o un pago, usa nuestro centro de atención.",
    {
      inline_keyboard: [
        [{ text: "🎧 Abrir soporte", url: `${STORE_URL}/soporte`, style: "primary" }],
        [{ text: "🌐 RomilPlus.me", url: STORE_URL }],
      ],
    },
  );
}

async function handleMessage(message: TelegramMessage) {
  const chatId = message.chat.id;
  const command = (message.text || "").trim().split(/\s+/)[0].toLowerCase().split("@")[0];

  switch (command) {
    case "/catalogo":
      return showCatalog(chatId);
    case "/pedidos":
      return showOrders(chatId);
    case "/soporte":
    case "/paysupport":
      return showSupport(chatId);
    case "/start":
    case "/ayuda":
    default:
      return showHome(chatId);
  }
}

async function handleCallback(query: TelegramCallbackQuery) {
  await answerCallback(query.id);
  const message = query.message;
  if (!message) return;

  const chatId = message.chat.id;
  const messageId = message.message_id;
  const data = query.data || "home";

  if (data === "home") return showHome(chatId, messageId);
  if (data === "catalog") return showCatalog(chatId, messageId);
  if (data === "payments") return showPayments(chatId, messageId);

  if (data.startsWith("cat:")) {
    const [, categoryIndexRaw, pageRaw] = data.split(":");
    return showCategory(chatId, Number(categoryIndexRaw), Number(pageRaw), messageId);
  }

  if (data.startsWith("prod:")) {
    const [, productIndexRaw, categoryIndexRaw, pageRaw] = data.split(":");
    return showProduct(
      chatId,
      Number(productIndexRaw),
      Number(categoryIndexRaw),
      Number(pageRaw),
      messageId,
    );
  }

  return showHome(chatId, messageId);
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "romil-plus-telegram-bot",
    configured: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_WEBHOOK_SECRET),
  });
}

export async function POST(request: NextRequest) {
  const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!expectedSecret) {
    return NextResponse.json({ ok: false, error: "Telegram webhook is not configured" }, { status: 500 });
  }

  const receivedSecret = request.headers.get("x-telegram-bot-api-secret-token");
  if (receivedSecret !== expectedSecret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const update = (await request.json()) as TelegramUpdate;

    if (update.callback_query) {
      await handleCallback(update.callback_query);
    } else if (update.message) {
      await handleMessage(update.message);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
