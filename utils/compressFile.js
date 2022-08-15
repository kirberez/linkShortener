const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

function compressFile(
  inputFilePath, // что сжать
  outputFolder, // куда поместить
  resultFileName // как назвать
) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(inputFilePath); // Файл по частям читаем

    stream
      .pipe(zlib.createGzip()) // Прочитанное сжимаем
      .pipe(
        fs.createWriteStream(path.resolve(outputFolder, `${Date.now()}_${resultFileName}.gz`), {
          flags: "a", // Сжатое записываем
        })
      )
      .on("error", reject)
      .on("finish", resolve);
  });
}

module.exports = { compressFile };