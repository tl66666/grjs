import fs from "node:fs/promises";
import JSZip from "jszip";

const zip = await JSZip.loadAsync(await fs.readFile("C:/Users/唐乐/Desktop/个人网站/01 应聘人员信息登记表.xlsx"));
const xml = await zip.file("xl/worksheets/sheet1.xml").async("string");
const pattern = new RegExp(`<x:c([^>]*\\br="C12"[^>]*)(?:/>|>[\\s\\S]*?</x:c>)`);
console.log(pattern, pattern.test(xml));
