import type { LangKeys } from "constant";

const lang: LangKeys = "eng";

const experience = {
  title: {
    eng: "Experience",
    rus: "Опыт работы",
    fr: "Expérience",
    es: "Experiencia",
  }[lang],
  data: [
    {
      value: "0",
      label: {
        eng: "Without Experience",
        rus: "Без опыта",
        fr: "Sans expérience",
        es: "Sin experiencia",
      }[lang],
    },
    {
      value: "1-3",
      label: {
        eng: "From 1 to 3 years",
        rus: "От 1 до 3 лет",
        fr: "De 1 à 3 ans",
        es: "De 1 a 3 años",
      }[lang],
    },
    {
      value: "3-6",
      label: {
        eng: "From 3 to 6 years",
        rus: "От 3 до 6 лет",
        fr: "De 3 à 6 ans",
        es: "De 3 a 6 años",
      }[lang],
    },
    {
      value: "6",
      label: {
        eng: "More than 6 years",
        rus: "Более 6 лет",
        fr: "Plus de 6 ans",
        es: "Más de 6 años",
      }[lang],
    },
  ],

  get(data: { experience: string }) {
    const value = data.experience;
    const item = this.data.find((e) => e.value === value);
    return item?.label;
  },
};

const emp_type = {
  title: {
    eng: "Employment type",
    rus: "Вид занятости",
    fr: "Type d'emploi",
    es: "Tipo de empleo",
  }[lang],
  data: [
    {
      value: "full-time",
      label: {
        eng: "Full time",
        rus: "Полная занятость",
        fr: "Temps plein",
        es: "Tiempo completo",
      }[lang],
    },
    {
      value: "part-time",
      label: {
        eng: "Part time",
        rus: "Частичная занятость",
        fr: "Temps partiel",
        es: "Tiempo parcial",
      }[lang],
    },
    {
      value: "remote",
      label: {
        eng: "Remote",
        rus: "Удаленная работа",
        fr: "À distance",
        es: "Trabajo remoto",
      }[lang],
    },
    {
      value: "contract",
      label: {
        eng: "Contract",
        rus: "Контракт",
        fr: "Contrat",
        es: "Contrato",
      }[lang],
    },
    {
      value: "freelance",
      label: {
        eng: "Freelance",
        rus: "Фриланс",
        fr: "Freelance",
        es: "Freelance",
      }[lang],
    },
    {
      value: "internship",
      label: {
        eng: "Internship",
        rus: "Стажировка",
        fr: "Stage",
        es: "Prácticas",
      }[lang],
    },
  ],
  get(data: string) {
    const item = this.data.find((e) => e.value === data);
    return item?.label;
  },
};

const education = {
  title: {
    eng: "Education",
    rus: "Образование",
    fr: "Éducation",
    es: "Educación",
  }[lang],
  data: [
    {
      value: "secondary",
      label: {
        eng: "Secondary school",
        rus: "Среднее школа",
        fr: "École secondaire",
        es: "Escuela secundaria",
      }[lang],
    },
    {
      value: "bachelor",
      label: {
        eng: "Bachelor's degree",
        rus: "Бакалавр",
        fr: "Licence",
        es: "Licenciatura",
      }[lang],
    },
    {
      value: "master",
      label: {
        eng: "Master's degree",
        rus: "Магистр",
        fr: "Master",
        es: "Maestría",
      }[lang],
    },
    {
      value: "doctor",
      label: {
        eng: "Doctor's degree",
        rus: "Доктор",
        fr: "Doctorat",
        es: "Doctorado",
      }[lang],
    },
  ],
};

const salary = {
  title: {
    eng: "Salary",
    rus: "Заработная плата",
    fr: "Salaire",
    es: "Salario",
  }[lang],
  get(data: { fromSalary: number; toSalary: number; currency: string }) {
    const { fromSalary: from, toSalary: to, currency: curr } = data;

    if (from === 0 && to === 0) {
      return null;
    }

    if (from === 0 && to > 0) {
      return `Up to ${to}${currency.get(curr)}`;
    }

    if (from > 0 && to === 0) {
      return `From ${from}${currency.get(curr)}`;
    }

    if (from !== 0 && to !== 0 && from !== to) {
      return `${from}${currency.get(curr)} - ${to}${currency.get(curr)}`;
    }

    if (from === to) {
      return `${to}${currency.get(curr)}`;
    }

    if (from === -1) return "Free";
  },
};

const skills = {
  title: {
    eng: "Skills",
    rus: "Навыки",
    fr: "Compétences",
    es: "Habilidades",
  }[lang],
};

const created_at = {
  get(data: { created_at: string }) {
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

    const timeString = `${addZero(day)} ${
      months[lang][month - 1]
    } ${year} - ${addZero(hour)}:${addZero(minute)}`;

    const keys = {
      eng: "Posted at",
      rus: "Опубликовано",
      fr: "Publié à",
      es: "Publicado en",
    }[lang];
    return `${keys} ${timeString}`;
  },
};

function timeAgo(ts: string): string {
  const postedDate: Date = new Date(ts);
  const currentDate: Date = new Date();

  const timeDifference: number = Math.abs(
    Math.round((currentDate.getTime() - postedDate.getTime()) / 1000)
  );

  const minute: number = 60;
  const hour: number = 60 * minute;
  const day: number = 24 * hour;
  const week: number = 7 * day;
  const month: number = 30.44 * day;

  const returnString = {
    seconds() {
      return {
        eng: `${timeDifference} seconds ago`,
        rus: `${timeDifference} секунд назад`,
        es: `${timeDifference} segundos atrás`,
        fr: `${timeDifference} secondes auparavant`,
      }[lang];
    },
    minutes() {
      const minutes: number = Math.floor(timeDifference / minute);
      const isOne = minutes === 1;
      return {
        eng: `${minutes} ${isOne ? "minute" : "minutes"} ago`,
        rus: `${minutes} ${isOne ? "минута" : "минут"} назад`,
        es: `${minutes} ${isOne ? "minuto" : "minutos"} atrás`,
        fr: `${minutes} ${isOne ? "minute" : "minutes"} auparavant`,
      }[lang];
    },
    hours() {
      const hours: number = Math.floor(timeDifference / hour);
      const isOne = hours === 1;
      return {
        eng: `${hours} ${isOne ? "hour" : "hours"} ago`,
        rus: `${hours} ${isOne ? "час" : "часов"} назад`,
        es: `${hours} ${isOne ? "hora" : "horas"} atrás`,
        fr: `${hours} ${isOne ? "heure" : "heures"} auparavant`,
      }[lang];
    },
    days() {
      const days: number = Math.floor(timeDifference / day);
      const isOne = days === 1;
      return {
        eng: `${days} ${isOne ? "day" : "days"} ago`,
        rus: `${days} ${isOne ? "день" : "дней"} назад`,
        es: `${days} ${isOne ? "día" : "días"} atrás`,
        fr: `${days} ${isOne ? "jour" : "jours"} auparavant`,
      }[lang];
    },
    weeks() {
      const weeks: number = Math.floor(timeDifference / week);
      const isOne = weeks === 1;
      return {
        eng: `${weeks} ${isOne ? "week" : "weeks"} ago`,
        rus: `${weeks} ${isOne ? "неделя" : "недель"} назад`,
        es: `${weeks} ${isOne ? "semana" : "semanas"} atrás`,
        fr: `${weeks} ${isOne ? "semaine" : "semaines"} auparavant`,
      }[lang];
    },
    months() {
      const months: number = Math.floor(timeDifference / month);
      const isOne = months === 1;
      return {
        eng: `${months} ${isOne ? "month" : "months"} ago`,
        rus: `${months} ${isOne ? "месяц" : "месяцев"} назад`,
        es: `${months} ${isOne ? "mes" : "meses"} atrás`,
        fr: `${months} ${isOne ? "mois" : "mois"} auparavant`,
      }[lang];
    },
  };

  if (timeDifference < minute) {
    return returnString.seconds();
  } else if (timeDifference < hour) {
    return returnString.minutes();
  } else if (timeDifference < day) {
    return returnString.hours();
  } else if (timeDifference < week) {
    return returnString.days();
  } else if (timeDifference < month) {
    return returnString.weeks();
  } else {
    return returnString.months();
  }
}

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
    { value: "dollar", label: "$" },
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

const specialization = {
  data: [
    { value: "it", label: { eng: "IT", rus: "IT", es: "IT", fr: "IT" }[lang] },
    {
      value: "marketing",
      label: {
        eng: "Marketing",
        rus: "Маркетинг",
        es: "Marketing",
        fr: "Marketing",
      }[lang],
    },
    {
      value: "finance",
      label: { eng: "Finance", rus: "Финансы", es: "Finanzas", fr: "Finance" }[
        lang
      ],
    },
    {
      value: "design",
      label: { eng: "Design", rus: "Дизайн", es: "Diseño", fr: "Design" }[lang],
    },
    {
      value: "healthcare",
      label: {
        eng: "Healthcare",
        rus: "Здравоохранение",
        es: "Cuidado de la salud",
        fr: "Soin de santé",
      }[lang],
    },
    {
      value: "education",
      label: {
        eng: "Education",
        rus: "Образование",
        es: "Educación",
        fr: "Éducation",
      }[lang],
    },
    {
      value: "sales",
      label: { eng: "Sales", rus: "Продажи", es: "Ventas", fr: "Ventes" }[lang],
    },
    {
      value: "hospitality",
      label: {
        eng: "Hospitality",
        rus: "Гостеприимство",
        es: "Hospitalidad",
        fr: "Hospitalité",
      }[lang],
    },
    {
      value: "law",
      label: { eng: "Law", rus: "Право", es: "Derecho", fr: "Droit" }[lang],
    },
    {
      value: "media",
      label: {
        eng: "Media",
        rus: "Медиа",
        es: "Medios de comunicación",
        fr: "Médias",
      }[lang],
    },
    {
      value: "engineering",
      label: {
        eng: "Engineering",
        rus: "Инженерия",
        es: "Ingeniería",
        fr: "Ingénierie",
      }[lang],
    },
    {
      value: "manufacturing",
      label: {
        eng: "Manufacturing",
        rus: "Производство",
        es: "Manufactura",
        fr: "Fabrication",
      }[lang],
    },
    {
      value: "consulting",
      label: {
        eng: "Consulting",
        rus: "Консалтинг",
        es: "Consultoría",
        fr: "Conseil",
      }[lang],
    },
    {
      value: "research",
      label: {
        eng: "Research",
        rus: "Исследования",
        es: "Investigación",
        fr: "Recherche",
      }[lang],
    },
    {
      value: "pharmaceuticals",
      label: {
        eng: "Pharmaceuticals",
        rus: "Фармацевтика",
        es: "Farmacéuticos",
        fr: "Pharmaceutiques",
      }[lang],
    },
    {
      value: "energy",
      label: { eng: "Energy", rus: "Энергетика", es: "Energía", fr: "Énergie" }[
        lang
      ],
    },
    {
      value: "telecommunications",
      label: {
        eng: "Telecommunications",
        rus: "Телекоммуникации",
        es: "Telecomunicaciones",
        fr: "Télécommunications",
      }[lang],
    },
    {
      value: "logistics",
      label: {
        eng: "Logistics",
        rus: "Логистика",
        es: "Logística",
        fr: "Logistique",
      }[lang],
    },
    {
      value: "aviation",
      label: {
        eng: "Aviation",
        rus: "Авиация",
        es: "Aviación",
        fr: "Aviation",
      }[lang],
    },
    {
      value: "fashion",
      label: { eng: "Fashion", rus: "Мода", es: "Moda", fr: "Mode" }[lang],
    },
    {
      value: "real estate",
      label: {
        eng: "Real Estate",
        rus: "Недвижимость",
        es: "Bienes raíces",
        fr: "Immobilier",
      }[lang],
    },
    {
      value: "automotive",
      label: {
        eng: "Automotive",
        rus: "Автомобильная промышленность",
        es: "Automotriz",
        fr: "Automobile",
      }[lang],
    },
    {
      value: "business",
      label: {
        eng: "Business",
        rus: "Бизнес",
        es: "Negocio",
        fr: "Entreprise",
      }[lang],
    },
  ],
  get(value: string) {
    const item = this.data.find((e) => e.value === value);
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
  skills,
  timeAgo,
  specialization,
};
