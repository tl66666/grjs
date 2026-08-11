import fs from "node:fs/promises";
import JSZip from "jszip";

const root = "C:/Users/唐乐/Desktop/个人网站";
const source = `${root}/01 应聘人员信息登记表.xlsx`;
const output = `${root}/01 应聘人员信息登记表-已填写-修复版.xlsx`;
const staged = "C:/Users/唐乐/AppData/Local/Temp/01 应聘人员信息登记表-已填写-修复版.xlsx";
const photo = `${root}/tmp/form-work/resume-photo.jpg`;

const values = {
  B5: "唐乐", E5: "男", G5: "2005-04-24", M5: "汉",
  B6: "共青团员", E6: "未婚", G6: "健康", M6: "173",
  B7: "☑中国  □外籍", E7: "云南昆明", G7: "18064871268", M7: "2061790875@qq.com",
  B8: "上海市", F8: "上海市徐汇区漕宝路121号",
  B9: "□网站      □招聘会      □猎头      ☑内部推荐（推荐人：祝国兴）      □外部推荐（推荐人：                ）",
  B10: "☑无           □有（说明）：",
  G10: "☑无           □有（说明）：",
  B12: "父亲", C12: "唐俊南", D12: "中国", E12: "53",
  F12: "昆明铁路局供电段  昆明市盘龙区龙泉路上林宽境", N12: "18087349126",
  B13: "母亲", C13: "乐丽萍", D13: "中国", E13: "49",
  F13: "昆明重工中学  昆明市盘龙区龙泉路上林宽境", N13: "18087349136",
  D20: "能否提供银行流水/社保证明", F20: "☑是     □否", M20: "2026-08-01",
  B22: "2023-10 至今", D22: "上海应用技术大学", I22: "软件工程", M22: "本科",
  O22: "CET-6；普通话二级乙等\n字节跳动 TRAE AI 大赛：全国前350名、复赛",
  B25: "2026-04", D25: "校党校第 51 期入党积极分子培训班", I25: "入党积极分子", O25: "考试合格，结业",
  B27: "英语 CET-6", E27: "熟练使用 Python、Java、前端及微信小程序开发",
  I27: "☑个人发展   ☑行业吸引力   ☑薪酬\n☑组织气氛   ☑公司品牌     □其他",
  B28: "掌握 Python、Java、C/C++、HTML/CSS/JS；熟悉 Flask、React、TypeScript、Vite、Express、Prisma、SQLite/MySQL 及微信原生小程序、云开发。AI Agent 应用开发经验，可独立完成前后端开发、接口设计、数据持久化、调试测试与项目交付。",
  B32: "唐乐", G32: "2026-07-31",
};

const escapeXml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

function replaceCell(xml, reference, text) {
  const pattern = new RegExp(`<x:c([^>/]*\\br="${reference}"[^>/]*)(?:\\s*/>|>[\\s\\S]*?</x:c>)`);
  const match = xml.match(pattern);
  if (!match) throw new Error(`Template cell ${reference} was not found.`);
  const attrs = match[1].replace(/\s+t="[^"]*"/g, "");
  return xml.replace(pattern, `<x:c${attrs} t="inlineStr"><x:is><x:t xml:space="preserve">${escapeXml(text)}</x:t></x:is></x:c>`);
}

function clearCell(xml, reference) {
  const pattern = new RegExp(`<x:c([^>/]*\\br="${reference}"[^>/]*)(?:\\s*/>|>[\\s\\S]*?</x:c>)`);
  const match = xml.match(pattern);
  if (!match) throw new Error(`Template cell ${reference} was not found.`);
  const attrs = match[1].replace(/\s+t="[^"]*"/g, "");
  return xml.replace(pattern, `<x:c${attrs}/>`);
}

function setRowHeight(xml, row, height) {
  const pattern = new RegExp(`<x:row([^>]*\\br="${row}"[^>]*)>`);
  const match = xml.match(pattern);
  if (!match) throw new Error(`Template row ${row} was not found.`);
  const attrs = match[1]
    .replace(/\s+ht="[^"]*"/g, "")
    .replace(/\s+customHeight="[^"]*"/g, "");
  return xml.replace(pattern, `<x:row${attrs} ht="${height}" customHeight="1">`);
}

const fromBase64 = (value) => Buffer.from(value, "base64").toString("utf8");
Object.assign(values, {
  B9: fromBase64("4pah572R56uZICDilqHmi5vogZjkvJogIOKWoeeMjuWktCAg4piR5YaF6YOo5o6o6I2Q77yI56Wd5Zu95YW077yJICDilqHlpJbpg6jmjqjojZDvvIggICAgICAgICAg77yJ"),
  O22: fromBase64("Q0VULTbvvJvmma7pgJror53kuoznuqfkuZnnrYk="),
  O23: fromBase64("5a2X6IqC6Lez5YqoIFRSQUUgQUkg5aSn6LWb77ya5YmNMzUw5ZCN44CB5aSN6LWb"),
  B28: fromBase64("5o6M5o+hIFB5dGhvbuOAgUphdmHjgIFDL0MrK+OAgUhUTUwvQ1NTL0pT77yb54af5oKJIEZsYXNr44CBUmVhY3TjgIFUeXBlU2NyaXB044CBVml0ZeOAgUV4cHJlc3PjgIFQcmlzbWHjgIFTUUxpdGUvTXlTUUzjgIHlvq7kv6HlsI/nqIvluo/kuI7kupHlvIDlj5HjgIIK5YW35aSHIEFJIEFnZW50IOW6lOeUqOW8gOWPkee7j+mqjO+8jOiDveeLrOeri+WujOaIkOWJjeWQjuerr+W8gOWPkeOAgeaOpeWPo+iuvuiuoeOAgeaVsOaNruaMgeS5heWMluOAgeiwg+ivlea1i+ivleS4jumhueebruS6pOS7mOOAgg=="),
});

const zip = await JSZip.loadAsync(await fs.readFile(source));
let sheet = await zip.file("xl/worksheets/sheet1.xml").async("string");
for (const [reference, text] of Object.entries(values)) sheet = replaceCell(sheet, reference, text);

// The original 18-digit ID was saved as a number and lost precision, so this is intentionally left blank.
sheet = clearCell(sheet, "M8");
sheet = setRowHeight(sheet, "23", 36);
sheet = setRowHeight(sheet, "28", 48);

if (!sheet.includes('<x:drawing r:id="rId2"')) {
  sheet = sheet.replace('<x:picture r:id="rId1" />', '<x:drawing r:id="rId2" /><x:picture r:id="rId1" />');
}
zip.file("xl/worksheets/sheet1.xml", sheet);

let sheetRels = await zip.file("xl/worksheets/_rels/sheet1.xml.rels").async("string");
if (!sheetRels.includes('Id="rId2"')) {
  sheetRels = sheetRels.replace(
    "</Relationships>",
    '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing" Target="../drawings/drawing1.xml"/></Relationships>',
  );
}
zip.file("xl/worksheets/_rels/sheet1.xml.rels", sheetRels);

let contentTypes = await zip.file("[Content_Types].xml").async("string");
if (!contentTypes.includes('Extension="jpg"')) {
  contentTypes = contentTypes.replace("</Types>", '<Default Extension="jpg" ContentType="image/jpeg"/></Types>');
}
if (!contentTypes.includes('PartName="/xl/drawings/drawing1.xml"')) {
  contentTypes = contentTypes.replace(
    "</Types>",
    '<Override PartName="/xl/drawings/drawing1.xml" ContentType="application/vnd.openxmlformats-officedocument.drawing+xml"/></Types>',
  );
}
zip.file("[Content_Types].xml", contentTypes);

zip.file("xl/media/resume-photo.jpg", await fs.readFile(photo));
zip.file(
  "xl/drawings/drawing1.xml",
  '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><xdr:wsDr xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><xdr:oneCellAnchor><xdr:from><xdr:col>14</xdr:col><xdr:colOff>0</xdr:colOff><xdr:row>4</xdr:row><xdr:rowOff>0</xdr:rowOff></xdr:from><xdr:ext cx="1175000" cy="1480000"/><xdr:pic><xdr:nvPicPr><xdr:cNvPr id="1" name="Resume photo"/><xdr:cNvPicPr><a:picLocks noChangeAspect="1"/></xdr:cNvPicPr></xdr:nvPicPr><xdr:blipFill><a:blip r:embed="rId1"/><a:stretch><a:fillRect/></a:stretch></xdr:blipFill><xdr:spPr><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></xdr:spPr></xdr:pic><xdr:clientData/></xdr:oneCellAnchor></xdr:wsDr>',
);
zip.file(
  "xl/drawings/_rels/drawing1.xml.rels",
  '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/resume-photo.jpg"/></Relationships>',
);

await fs.writeFile(staged, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE", compressionOptions: { level: 6 } }));
await fs.copyFile(staged, output);
console.log(`Rebuilt form saved: ${output}`);
