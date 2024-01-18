import ejs from "ejs";
import fs from "fs";
import path from "path";

// Generate email template

const generateEmail = async (data, templateName) => {
  const templatePath = path.join(process.cwd(), "views", templateName);
  const html = fs.readFileSync(templatePath, "utf-8");
  return ejs.compile(html)(data);
};

export default generateEmail;
