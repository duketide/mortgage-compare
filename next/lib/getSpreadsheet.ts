import * as XLSX from "xlsx-js-style";
import createSpreadsheet from "./createSpreadsheet";
import { Mortgage } from "./db";

export default function getSpreadsheet(mortgages: readonly Mortgage[]) {
  const sheet = createSpreadsheet(mortgages);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, "Mortgages");
  XLSX.writeFile(workbook, "Mortgages.xlsx");
}
