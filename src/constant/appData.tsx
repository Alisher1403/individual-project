import { formData, type LangKeys } from "constant";

const lang: LangKeys = "eng";

const titles = {
  skillsRequired: {
    eng: "Required skills",
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

interface iHome {
  vacancy: number;
  resume: number;
  max_salary: number;
  min_salary: number;
}

const home = {
  specialization(args: iHome) {
    const vacancy = {
      eng: `Vacancies`,
      rus: `Вакансий`,
      es: `Vacantes`,
      fr: `Postes vacants`,
    }[lang];

    const resume = {
      eng: `Resumes`,
      rus: `Резюме`,
      es: `Currículums`,
      fr: `CVs`,
    }[lang];

    return (
      <>
        <p>
          {vacancy}: {args.vacancy}
        </p>
        <p>
          {resume}: {args.resume}
        </p>
        <div>{formData.salary.get({ fromSalary: args.min_salary, toSalary: args.max_salary, currency: "dollar" })}</div>
      </>
    );
  },
};

const appData = { buttons, titles, home };
export default appData;
