import type { LangKeys } from "constant";

const lang: LangKeys = "eng";

const titles = {
  skillsRequired: {
    eng: "Skills required",
    rus: "Требуемые навыки",
    fr: "Compétences requises",
    es: "Habilidades requeridas",
  }[lang],
  similarVacancies: {
    eng: "Similar Vacancies",
    rus: "Похожие вакансии",
    fr: "Offres similaires",
    es: "Ofertas similares",
  }[lang],
  description: {
    eng: "Description",
    rus: "Описание",
    fr: "Description",
    es: "Descripción",
  }[lang],
};

const buttons = {
  apply: {
    eng: "apply",
    rus: "подать заявку",
    es: "aplicar",
    fr: "postuler",
  }[lang],
};

export const appData = { buttons, titles };
