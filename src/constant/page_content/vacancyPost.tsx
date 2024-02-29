import { type LangKeys } from "constant";

const lang: LangKeys = "eng";

export const vacancy = () => {
  return {
    loading() {
      return {
        eng: `Vacancies`,
        rus: `Вакансий`,
        es: `Vacantes`,
        fr: `Postes vacants`,
      }[lang];
    },
  };
};
