const experience = {
  title: {
    eng: "Experience",
    rus: "Опыт работы",
    fr: "Expérience",
    es: "Experiencia",
  },
  data: new Map([
    [undefined, { eng: "All", rus: "Не имеет значения", fr: "Tous", es: "Todos" }],
    ["0", { eng: "Without Experience", rus: "Без опыта", fr: "Sans expérience", es: "Sin experiencia" }],
    ["1-3", { eng: "From 1 to 3 years", rus: "От 1 до 3 лет", fr: "De 1 à 3 ans", es: "De 1 a 3 años" }],
    ["3-6", { eng: "From 3 to 6 years", rus: "От 3 до 6 лет", fr: "De 3 à 6 ans", es: "De 3 a 6 años" }],
    ["6", { eng: "More than 6 years", rus: "Более 6 лет", fr: "Plus de 6 ans", es: "Más de 6 años" }],
  ]),
};

const emp_type = {
  title: {
    eng: "Employment type",
    rus: "Вид занятости",
    fr: "Type d'emploi",
    es: "Tipo de empleo",
  },
  data: new Map([
    ["full-time", { eng: "Full-time", rus: "Полная занятость", fr: "Temps plein", es: "Tiempo completo" }],
    ["part-time", { eng: "Part-time", rus: "Частичная занятость", fr: "Temps partiel", es: "Tiempo parcial" }],
    ["remote", { eng: "Remote", rus: "Удаленная работа", fr: "À distance", es: "Trabajo remoto" }],
    ["contract", { eng: "Contract", rus: "Контракт", fr: "Contrat", es: "Contrato" }],
    ["freelance", { eng: "Freelance", rus: "Фриланс", fr: "Freelance", es: "Freelance" }],
    ["internship", { eng: "Internship", rus: "Стажировка", fr: "Stage", es: "Prácticas" }],
  ]),
};

const education = {
  title: {
    eng: "Education",
    rus: "Образование",
    fr: "Éducation",
    es: "Educación",
  },
  data: new Map([
    ["secondary", { eng: "Secondary school", rus: "Среднее школа", fr: "École secondaire", es: "Escuela secundaria" }],
    ["bachelor", { eng: "Bachelor's degree", rus: "Бакалавр", fr: "Licence", es: "Licenciatura" }],
    ["master", { eng: "Master's degree", rus: "Магистр", fr: "Master", es: "Maestría" }],
    ["doctor", { eng: "Doctor's degree", rus: "Доктор", fr: "Doctorat", es: "Doctorado" }],
  ]),
};

const salary = {
  title: {
    eng: "Salary",
    rus: "Заработная плата",
    fr: "Salaire",
    es: "Salario",
  },
  data: new Map([
    ["entryLevel", { eng: "Entry-level", rus: "Начальный уровень", fr: "Débutant", es: "Nivel de entrada" }],
    ["midLevel", { eng: "Mid-level", rus: "Средний уровень", fr: "Intermédiaire", es: "Nivel intermedio" }],
    ["seniorLevel", { eng: "Senior level", rus: "Старший уровень", fr: "Sénior", es: "Nivel senior" }],
  ]),
};

const currency = {
  dollar: "$",
  soum: "сум",
  euro: "€",
  rouble: "₽",
  pound: "£",
};

export const formData = {
  experience,
  emp_type,
  education,
  salary,
  currency,
};
