const fs = require("fs");
const path = require("path");
require("dotenv").config();

const languages = process.env.REACT_APP_SUPPORTED_LANGUAGES.split(",");

languages.forEach((lang) => {
  const dirPath = path.join(__dirname, "src", "locales", lang.toLocaleLowerCase());
  const filePath = path.join(dirPath, "translation.json");

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "{}");
  }
});
