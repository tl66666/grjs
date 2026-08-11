import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const formPath = "C:/Users/唐乐/Desktop/个人网站/01 应聘人员信息登记表-已填写.xlsx";
const outputDir = "C:/Users/唐乐/Desktop/个人网站/tmp/form-work";
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(formPath));
const sheet = workbook.worksheets.getItem("应聘人员信息登记表");

// Explicit user-confirmed checkboxes.
sheet.getRange("G10").values = [["☑无           □有（说明）："]];
sheet.getRange("F20").values = [["☑是     □否"]];
sheet.getRange("I27").values = [["☑个人发展   ☑行业吸引力   ☑薪酬\n☑组织气氛   ☑公司品牌     □其他"]];

// The form's dates were entered correctly but inherited Excel's abbreviated English date display.
sheet.getRange("G5:I5").format.numberFormat = "yyyy-mm-dd";
sheet.getRange("M20:R20").format.numberFormat = "yyyy-mm-dd";
sheet.getRange("B25:C25").format.numberFormat = "yyyy-mm";
sheet.getRange("G32:R32").format.numberFormat = "yyyy-mm-dd";

// The original 18-digit ID was converted to a number and lost precision; leave it for the applicant to re-enter exactly.
sheet.getRange("M8").values = [[null]];
sheet.getRange("M8:R8").format.numberFormat = "@";

// The ByteDance competition belongs with certificates and awards.
sheet.getRange("O22").values = [["CET-6；普通话二级乙等\n字节跳动 TRAE AI 创造力大赛：全国前 350 名、复赛"]];
sheet.getRange("O22:R22").format.wrapText = true;
sheet.getRange("O22:R22").format.font = { size: 8 };
sheet.getRange("B22:R22").format.rowHeight = 58;

const verification = await workbook.inspect({
  kind: "table,formula",
  range: "应聘人员信息登记表!A5:R32",
  include: "values,formulas",
  tableMaxRows: 28,
  tableMaxCols: 18,
  maxChars: 15000,
});
await fs.writeFile(`${outputDir}/updated-form-inspection.txt`, verification.ndjson, "utf8");

const preview = await workbook.render({
  sheetName: "应聘人员信息登记表",
  autoCrop: "all",
  scale: 1.5,
  format: "png",
});
await fs.writeFile(`${outputDir}/updated-form-preview.png`, new Uint8Array(await preview.arrayBuffer()));

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(formPath);
console.log("Updated form saved.");
