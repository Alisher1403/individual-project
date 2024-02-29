import { formData, type LangKeys } from "constant";

const lang: LangKeys = "eng";

interface iHome {
  vacancy: number;
  max_salary: number;
  min_salary: number;
}

export const home = () => {
  return {
    specialization(args: iHome) {
      const vacancy = {
        eng: `Vacancies`,
        rus: `Вакансий`,
        es: `Vacantes`,
        fr: `Postes vacants`,
      }[lang];

      return (
        <>
          <p>
            {vacancy}: {args.vacancy}
          </p>
          <div>
            {formData.salary.get({ fromSalary: args.min_salary, toSalary: args.max_salary, currency: "dollar" })}
          </div>
        </>
      );
    },
  };
};
