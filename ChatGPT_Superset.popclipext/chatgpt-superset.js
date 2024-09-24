"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;

const openai = require("axios").create({
  baseURL: "https://api.openai.com/v1/",
});

const model = "gpt-4o";

// Helper function to send a request to OpenAI API
async function sendOpenAIRequest(input, options, content) {
  openai.defaults.headers.common.Authorization = `Bearer ${options.apikey}`;
  const messages = [{ role: "user", content: content }];
  const { data } = await openai.post("chat/completions", {
    model: model,
    messages,
  });
  return data.choices[0].message.content.trim();
}

// Function to rewrite text for Spanish spelling and grammar correction
async function rewrite(input, options) {
  const content =
    "Quiero que actúes como corrector ortográfico de español, contesta sólo la corrección, las mejoras y nada más, no escribas explicaciones. mejora la siguiente frase usando español de la RAE: \n\n" +
    input.text.trim();
  const response = await sendOpenAIRequest(input, options, content);

  if (popclip.modifiers.shift) {
    popclip.copyText(response);
  } else {
    popclip.pasteText(response);
  }
  return null;
}

// Function to summarize text
async function summarize(input, options) {
  const content =
    "Eres una IA altamente cualificada y entrenada en comprensión y resumen lingüístico. Me gustaría que leyeras el siguiente texto y lo resumieras en un párrafo conciso: \n\n" +
    input.text.trim();
  return await sendOpenAIRequest(input, options, content);
}

// Function to correct and improve French text
async function correctFrench(input, options) {
  const content =
    "Traducir, corrector y mejorador de texto. Sustituiré palabras y frases simples por versiones más refinadas sin cambiar el significado. Corregiré errores gramaticales y ortográficos, haciendo las frases más claras y concisas. Responderé solo con el texto corregido: \n\n" +
    input.text.trim();
  const response = await sendOpenAIRequest(input, options, content);

  if (popclip.modifiers.shift) {
    popclip.copyText(response);
  } else {
    popclip.pasteText(response);
  }
  return null;
}

// Function to improve text explanation
async function improveText(input, options) {
  const content =
    "Quiero que me expliques esto brevemente: \n\n" +
    input.text.trim();
  const response = await sendOpenAIRequest(input, options, content);

  if (popclip.modifiers.shift) {
    popclip.copyText(response);
  } else {
    popclip.pasteText(response);
  }
  return null;
}

// Function to generate improved prompt
async function improvePrompt(input, options) {
  const content =
    "ultra-realistic, high-resolution, lifelike textures, intricate textures, realistic lights and shadows image prompt (only responds with the prompt): \n\n" +
    input.text.trim();
  const response = await sendOpenAIRequest(input, options, content);

  if (popclip.modifiers.shift) {
    popclip.copyText(response);
  } else {
    popclip.pasteText(response);
  }
  return null;
}

// Function to shorten text
async function shortenText(input, options) {
  const content =
    "Acorta esto al máximo: \n\n" +
    input.text.trim();
  const response = await sendOpenAIRequest(input, options, content);

  if (popclip.modifiers.shift) {
    popclip.copyText(response);
  } else {
    popclip.pasteText(response);
  }
  return null;
}

// Function to expand text
async function expandText(input, options) {
  const content =
    "Alarga el siguiente texto añadiendo detalles relevantes, ejemplos y explicaciones sin cambiar el sentido: \n\n" +
    input.text.trim();
  const response = await sendOpenAIRequest(input, options, content);

  if (popclip.modifiers.shift) {
    popclip.copyText(response);
  } else {
    popclip.pasteText(response);
  }
  return null;
}

// Actions configuration for PopClip
exports.actions = [
  {
    title: "1. Corrige la ortografía y sintaxis",
    after: "paste-result",
    code: rewrite,
    icon: "symbol:pencil",
  },
  {
    title: "2. Resume el texto",
    after: "preview-result",
    code: summarize,
    icon: "symbol:pin",
  },
  {
    title: "3. Explícame esto",
    after: "paste-result",
    code: improveText,
    icon: "symbol:info",
  },
  {
    title: "4. Traducir a inglés",
    after: "paste-result",
    code: correctFrench, // Cambiar si esta función es para inglés
    icon: "symbol:globe",
  },
  {
    title: "5. Crear prompt",
    after: "paste-result",
    code: improvePrompt,
    icon: "symbol:lightbulb",
  },
  {
    title: "6. Acortar texto",
    after: "paste-result",
    code: shortenText,
    icon: "symbol:scissors",
  },
  {
    title: "7. Alargar texto",
    after: "paste-result",
    code: expandText,
    icon: "symbol:arrow.up.right",
  },
];
