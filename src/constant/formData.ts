type LangKeys = "eng" | "rus" | "fr" | "es";

const experience = {
  title: {
    eng: "Experience",
    rus: "Опыт работы",
    fr: "Expérience",
    es: "Experiencia",
  },
  data(lang: LangKeys) {
    return [
      {
        value: undefined,
        label: { eng: "All", rus: "Не имеет значения", fr: "Tous", es: "Todos" }[lang],
      },
      {
        value: "0",
        label: { eng: "Without Experience", rus: "Без опыта", fr: "Sans expérience", es: "Sin experiencia" }[lang],
      },
      {
        value: "1-3",
        label: { eng: "From 1 to 3 years", rus: "От 1 до 3 лет", fr: "De 1 à 3 ans", es: "De 1 a 3 años" }[lang],
      },
      {
        value: "3-6",
        label: { eng: "From 3 to 6 years", rus: "От 3 до 6 лет", fr: "De 3 à 6 ans", es: "De 3 a 6 años" }[lang],
      },
      {
        value: "6",
        label: { eng: "More than 6 years", rus: "Более 6 лет", fr: "Plus de 6 ans", es: "Más de 6 años" }[lang],
      },
    ];
  },
};

const emp_type = {
  title: {
    eng: "Employment type",
    rus: "Вид занятости",
    fr: "Type d'emploi",
    es: "Tipo de empleo",
  },
  data(lang: LangKeys) {
    return [
      {
        value: "full-time",
        label: { eng: "Full-time", rus: "Полная занятость", fr: "Temps plein", es: "Tiempo completo" }[lang],
      },
      {
        value: "part-time",
        label: { eng: "Part-time", rus: "Частичная занятость", fr: "Temps partiel", es: "Tiempo parcial" }[lang],
      },
      {
        value: "remote",
        label: { eng: "Remote", rus: "Удаленная работа", fr: "À distance", es: "Trabajo remoto" }[lang],
      },
      {
        value: "contract",
        label: { eng: "Contract", rus: "Контракт", fr: "Contrat", es: "Contrato" }[lang],
      },
      {
        value: "freelance",
        label: { eng: "Freelance", rus: "Фриланс", fr: "Freelance", es: "Freelance" }[lang],
      },
      {
        value: "internship",
        label: { eng: "Internship", rus: "Стажировка", fr: "Stage", es: "Prácticas" }[lang],
      },
    ];
  },
};

const education = {
  title: {
    eng: "Education",
    rus: "Образование",
    fr: "Éducation",
    es: "Educación",
  },
  data(lang: LangKeys) {
    return [
      {
        value: "secondary",
        label: { eng: "Secondary school", rus: "Среднее школа", fr: "École secondaire", es: "Escuela secundaria" }[
          lang
        ],
      },
      {
        value: "bachelor",
        label: { eng: "Bachelor's degree", rus: "Бакалавр", fr: "Licence", es: "Licenciatura" }[lang],
      },
      {
        value: "master",
        label: { eng: "Master's degree", rus: "Магистр", fr: "Master", es: "Maestría" }[lang],
      },
      {
        value: "doctor",
        label: { eng: "Doctor's degree", rus: "Доктор", fr: "Doctorat", es: "Doctorado" }[lang],
      },
    ];
  },
};

const salary = {
  title: {
    eng: "Salary",
    rus: "Заработная плата",
    fr: "Salaire",
    es: "Salario",
  },
  data(lang: LangKeys) {
    return [
      {
        value: "entryLevel",
        label: { eng: "Entry-level", rus: "Начальный уровень", fr: "Débutant", es: "Nivel de entrada" }[lang],
      },
      {
        value: "midLevel",
        label: { eng: "Mid-level", rus: "Средний уровень", fr: "Intermédiaire", es: "Nivel intermedio" }[lang],
      },
      {
        value: "seniorLevel",
        label: { eng: "Senior level", rus: "Старший уровень", fr: "Sénior", es: "Nivel senior" }[lang],
      },
    ];
  },
};

const currency = {
  data: [
    { value: undefined, label: "$" },
    { value: "soum", label: "сум" },
    { value: "euro", label: "€" },
    { value: "rouble", label: "₽" },
    { value: "pound", label: "£" },
  ],
};

export const formData = {
  experience,
  emp_type,
  education,
  salary,
  currency,
};
