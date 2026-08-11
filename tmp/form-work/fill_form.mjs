import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "C:/Users/唐乐/Desktop/个人网站/01 应聘人员信息登记表.xlsx";
const outputPath = "C:/Users/唐乐/Desktop/个人网站/01 应聘人员信息登记表-已填写.xlsx";
const qaImagePath = "C:/Users/唐乐/Desktop/个人网站/tmp/form-work/form-after.png";
const photoPath = "C:/Users/唐乐/Desktop/个人网站/tmp/form-work/resume-photo.jpg";

const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);
const sheet = workbook.worksheets.getItem("应聘人员信息登记表");
const photoDataUrl = `data:image/jpeg;base64,${(await fs.readFile(photoPath)).toString("base64")}`;

// Basic identity and contact details stated directly in the resume.
sheet.getRange("B5").values = [["唐乐"]];
sheet.getRange("E5").values = [["男"]];
sheet.getRange("B6").values = [["共青团员"]];
sheet.getRange("B7").values = [["☑中国  □外籍"]];
sheet.getRange("G7").values = [["18064871268"]];
sheet.getRange("M7").values = [["2061790875@qq.com"]];
sheet.getRange("B9").values = [["□网站      □招聘会      □猎头      ☑内部推荐（推荐人：                ）      □外部推荐（推荐人：                ）"]];
sheet.getRange("B10").values = [["☑无           □有（说明）："]];

// Education and verified awards/certificates.
sheet.getRange("B22").values = [["2023-10 至今"]];
sheet.getRange("D22").values = [["上海应用技术大学"]];
sheet.getRange("I22").values = [["软件工程"]];
sheet.getRange("M22").values = [["本科"]];
sheet.getRange("O22").values = [["CET-6；普通话二级乙等"]];

// Training stated in the resume. The date and motivation remain blank because they are not provided.
sheet.getRange("D25").values = [["校党校第 51 期入党积极分子培训班"]];
sheet.getRange("O25").values = [["考试合格，结业"]];

// Technical and language fields are concise summaries of the resume's skills section.
sheet.getRange("B27").values = [["英语 CET-6"]];
sheet.getRange("E27").values = [["熟练使用 Python、Java、前端及微信小程序开发"]];
sheet.getRange("B28").values = [["掌握 Python、Java、C/C++、HTML/CSS/JS；熟悉 Flask、React、TypeScript、Vite、Express、Prisma、SQLite/MySQL 及微信原生小程序、云开发。具备 AI Agent 应用开发经验，可独立完成前后端开发、接口设计、数据持久化、调试测试与项目交付。"]];

sheet.getRange("O22:R22").format.wrapText = true;
sheet.getRange("D25:H25").format.wrapText = true;
sheet.getRange("O25:R25").format.wrapText = true;
sheet.getRange("B27:C27").format.wrapText = true;
sheet.getRange("E27:F27").format.wrapText = true;
sheet.getRange("B28:R28").format.wrapText = true;
sheet.getRange("B9:R9").format.font = { size: 9 };
sheet.getRange("M7:N7").format.font = { size: 9 };
sheet.getRange("O22:R22").format.font = { size: 9 };
sheet.getRange("B22:R22").format.rowHeight = 40;
sheet.getRange("B25:R25").format.rowHeight = 40;
sheet.getRange("B27:R27").format.rowHeight = 42;
sheet.getRange("B28:R28").format.rowHeight = 58;

// O5:R7 is the template's reserved photo frame.
sheet.images.add({
  dataUrl: photoDataUrl,
  anchor: {
    from: { row: 4, col: 14, rowOffsetPx: 4, colOffsetPx: 4 },
    extent: { widthPx: 108, heightPx: 146 },
  },
});

const verification = await workbook.inspect({
  kind: "table",
  range: "应聘人员信息登记表!A4:R28",
  include: "values,formulas",
  tableMaxRows: 28,
  tableMaxCols: 18,
  maxChars: 12000,
});
await fs.writeFile("C:/Users/唐乐/Desktop/个人网站/tmp/form-work/form-after-inspection.txt", verification.ndjson, "utf8");

const preview = await workbook.render({
  sheetName: "应聘人员信息登记表",
  autoCrop: "all",
  scale: 1.5,
  format: "png",
});
await fs.writeFile(qaImagePath, new Uint8Array(await preview.arrayBuffer()));

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(JSON.stringify({ outputPath, qaImagePath }));
