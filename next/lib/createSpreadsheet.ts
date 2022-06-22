import { Mortgage } from "./db";
import { WorkSheet } from "xlsx-js-style/types";

const limit31Char = (string: string) => {
  if (string.length > 31) {
    return string.slice(0, 31);
  }
  return string;
};

const border = { color: { rgb: "000000" }, style: "thin" };
const allBorders = {
  top: border,
  bottom: border,
  right: border,
  left: border,
};
const bottomLeft = { bottom: border, left: border };
const topRight = { top: border, right: border };
const bottomRight = { bottom: border, right: border };
const topLeft = { top: border, left: border };

const currencyFmt = "$#,##0.00;[RED]($#,##0.00)";

const blue = "C5D9F1";
const red = "E6B8B7";
const gold = "DDD9C4";

//I wanted to derive A_CODE programmatically, i.e., as "A".codePointAt(0),
//but TypeScript thought that might be undefined.

const A_CODE = 65;

const colMap = new Map<number, string>();

for (let i = 0; i < 52; i++) {
  if (i < 26) {
    colMap.set(i, String.fromCodePoint(A_CODE + i));
  } else {
    colMap.set(i, String.fromCodePoint(A_CODE, A_CODE + (i % 26)));
  }
}

//This row map is a little silly because I'm just adding one,
//but I found it simpler to do this. Going to 450 is also overkill.
const rowMap = new Map<number, number>();

for (let i = 0; i < 450; i++) {
  rowMap.set(i, i + 1);
}

export default function createSpreadsheet(rows: readonly Mortgage[]) {
  const sortedRows = [...rows].sort(
    (a, b) => (b.monthlyPandI || 0) - (a.monthlyPandI || 0)
  );

  const topLevelStyle = {
    fill: { fgColor: { rgb: "D3D3D3" } },
    font: { bold: true },
    border: allBorders,
  };
  const sheet: WorkSheet = {
    "!ref": "A1:ZZ500",
    A1: { t: "s", v: "Discount Rate", s: topLevelStyle },
    B1: { t: "n", v: 0.05, s: { ...topLevelStyle, numFmt: "0.000%" } },
    A2: { t: "s", v: "Lender", s: topLevelStyle },
    A3: { t: "s", v: "Interest Rate", s: topLevelStyle },
    A4: { t: "s", v: "Monthly Payment", s: topLevelStyle },
    A5: { t: "s", v: "Delta", s: topLevelStyle },
    A6: { t: "s", v: "Discount Point Cost", s: topLevelStyle },
    A7: { t: "s", v: "Other Costs", s: topLevelStyle },
    A8: { t: "s", v: "Upfront Credits", s: topLevelStyle },

    A10: { t: "s", v: "Month #", s: topLevelStyle },
  };

  for (let i = 11; i < 372; i++) {
    sheet[`A${i}`] = { t: "n", v: i - 11, s: topLevelStyle };
  }

  sortedRows.forEach((row, index) => {
    const col = colMap.get(index + 1);
    const basicInfoStyle = {
      fill: {
        fgColor: { rgb: index % 3 === 0 ? blue : index % 3 === 1 ? red : gold },
      },
      border: allBorders,
    };
    sheet[`${col}2`] = {
      t: "s",
      v: row.lender,
      s: { font: { bold: true }, ...basicInfoStyle },
    };
    sheet[`${col}3`] = {
      t: "n",
      v: row.interestRate ? row.interestRate / 100 : 0,
      s: { numFmt: "0.000%", ...basicInfoStyle },
    };
    sheet[`${col}4`] = {
      t: "n",
      v: row.monthlyPandI || 0,
      s: { numFmt: currencyFmt, ...basicInfoStyle },
    };
    sheet[`${col}5`] =
      index === 0
        ? { t: "n", v: 0, s: basicInfoStyle }
        : {
            t: "n",
            f: `=$B$4-${col}4`,
            s: { numFmt: currencyFmt, ...basicInfoStyle },
          };
    sheet[`${col}6`] = {
      t: "n",
      v: row.discountPointPayment || 0,
      s: { numFmt: currencyFmt, ...basicInfoStyle },
    };
    sheet[`${col}7`] = {
      t: "n",
      v: row.otherUpfrontCosts || 0,
      s: { numFmt: currencyFmt, ...basicInfoStyle },
    };
    sheet[`${col}8`] = {
      t: "n",
      v: row.upfrontCredits || 0,
      s: { numFmt: currencyFmt, ...basicInfoStyle },
    };

    sheet[`${col}11`] = {
      t: "n",
      f: `=${col}$8 - (${col}$7 + ${col}$6)`,
      s: { numFmt: currencyFmt },
    };

    for (let i = 12; i < 372; i++) {
      sheet[`${col}${i}`] = {
        t: "n",
        f: `=${col}$5/((1+$B$1)^($A${i}/12)) +${col}${i - 1}`,
        s: { numFmt: currencyFmt },
      };
    }
    sheet["!cols"] = [];
    for (let col = 0; col <= rows.length; col++) {
      sheet["!cols"][col] = { wch: col === 0 ? 18 : 15 };
    }
  });

  return sheet;
}
