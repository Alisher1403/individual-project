import parse from "html-react-parser";
import { icons } from "icons";
import { currencySymbol } from "../constant/currency";

//* =================================================================== EXPERIENCE =================================================================== *//

function getExperience(experience: string) {
  function defineExperience() {
    switch (experience) {
      case "0":
        return "Without experience";
      case "1-3":
        return "From 1 to 3 years";
      case "3-6":
        return "From 3 to 6 years";
      case "6":
        return "More than 6 years";
      default:
        return "";
    }
  }
  if (!experience || experience === "") return;
  return defineExperience();
}

//* =============================================================== EXPERIENCE END =============================================================== *//

//* =================================================================== SALARY =================================================================== *//

function getSalary(element: any) {
  const from = element.fromSalary;
  const to = element.toSalary;
  const currency = element.currency;

  function defineSalary() {
    if (from === 0 && to === 0) {
      return <span>Free</span>;
    }

    if (from === 0 && +to > 0) {
      return (
        <>
          <span>Up to</span> &nbsp;
          <span>{`${to} ${currencySymbol[currency]}`}</span>
        </>
      );
    }

    if (+from > 0 && to === 0 && to !== -1) {
      return (
        <>
          <span>From</span> &nbsp;
          <span>{`${from} ${currencySymbol[currency]}`}</span>
        </>
      );
    }

    if (from !== 0 && to !== 0 && from !== to) {
      return (
        <>
          <span>{`${from} ${currencySymbol[currency]}`}</span>
          &nbsp;&nbsp;─&nbsp;&nbsp;
          <span>{`${to} ${currencySymbol[currency]}`}</span>
        </>
      );
    }

    if (from === to) {
      return <span>{`${to} ${currencySymbol[currency]}`}</span>;
    }
  }

  if (from === -1) return null;

  return (
    <div className="inline">
      <div className="vc-icon">{parse(icons["coin"])}</div>&nbsp;
      {defineSalary()}
    </div>
  );
}

//* =================================================================== SALARY END =================================================================== *//

function getTimeStamp(time: string): string {
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  function addZero(num: number): string | number {
    if (num < 10) return "0" + num;
    return num;
  }

  const timeString = `${addZero(day)}.${addZero(month)}.${year} - ${addZero(hour)}:${addZero(minute)}`;

  return timeString;
}

export { getExperience, getSalary, getTimeStamp };
