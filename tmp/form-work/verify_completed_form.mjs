import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const formPath = "C:/Users/唐乐/Desktop/个人网站/01 应聘人员信息登记表-已填写.xlsx";
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(formPath));
const sheet = workbook.worksheets.getItemAt(0);

const key = await workbook.inspect({
  kind: "table,formula",
  range: "A5:R32",
  include: "values,formulas",
  tableMaxRows: 28,
  tableMaxCols: 18,
  maxChars: 12000,
});
const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});
console.log(key.ndjson);
console.log(errors.ndjson);
const preview = await workbook.render({ sheetName: sheet.name, autoCrop: "all", scale: 1.5, format: "png" });
await fs.writeFile("C:/Users/唐乐/Desktop/个人网站/tmp/form-work/final-form-preview.png", new Uint8Array(await preview.arrayBuffer()));
