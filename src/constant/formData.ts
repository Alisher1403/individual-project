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
  get(data: { experience: string }, lang: LangKeys) {
    const value = data.experience;
    const item = this.data(lang).find((e) => e.value === value);
    return item?.label;
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
  get(data: { emp_type: string }, lang: LangKeys) {
    const value = data.emp_type;
    const item = this.data(lang).find((e) => e.value === value);
    return item?.label;
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
  get(data: { fromSalary: number; toSalary: number; currency: string }, lang: LangKeys) {
    const { fromSalary: from, toSalary: to, currency: curr } = data;

    if (from === 0 && to === 0) {
      return {
        eng: "Free",
        rus: "Бесплатно",
        fr: "Gratuit",
        es: "Gratis",
      }[lang];
    }

    if (from === 0 && to > 0) {
      return (
        {
          eng: "Up to",
          rus: "До",
          fr: "Jusqu'à",
          es: "Hasta",
        }[lang] + ` ${to}${currency.get(curr)}`
      );
    }

    if (from > 0 && to === 0) {
      return (
        {
          eng: "From",
          rus: "От",
          fr: "De",
          es: "Desde",
        }[lang] + ` ${from}${currency.get(curr)}`
      );
    }

    if (from !== 0 && to !== 0 && from !== to) {
      return (
        {
          eng: `From ${from} to ${to}`,
          rus: `От ${from} до ${to}`,
          fr: `De ${from} à ${to}`,
          es: `De ${from} a ${to}`,
        }[lang] + currency.get(curr)
      );
    }

    if (from === to) {
      return `${to}${currency.get(curr)}`;
    }

    if (from === -1) return null;
  },
};

const created_at = {
  get(data: { created_at: string }, lang: LangKeys) {
    const value = data.created_at;
    const date = new Date(value);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    function addZero(num: number): string | number {
      if (num < 10) return "0" + num;
      return num;
    }

    const timeString = `${addZero(day)} ${months[lang][month - 1]} ${year} - ${addZero(hour)}:${addZero(minute)}`;

    const keys = { eng: "Posted at", rus: "Опубликовано", fr: "Publié à", es: "Publicado en" }[lang];
    return `${keys} ${timeString}`;
  },
};

const months = {
  eng: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  rus: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  fr: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  es: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
};

const currency = {
  data: [
    { value: undefined, label: "$" },
    { value: "soum", label: "сум" },
    { value: "euro", label: "€" },
    { value: "rouble", label: "₽" },
    { value: "pound", label: "£" },
  ],
  get(value: string) {
    const item = this.data.find((e) => e.value === value);
    if (value === "dollar") return "$";
    return item?.label;
  },
};

export const formData = {
  experience,
  emp_type,
  education,
  salary,
  currency,
  created_at,
  months,
};
