const { exec: execOnCallbacks } = require("child_process");
const util = require("util");
const fs = require("fs/promises");
const path = require("path");

const exec = util.promisify(execOnCallbacks);

async function monitorProcess() {
  setInterval(async () => {
    const { pid } = process;

    const { stdout } = await exec( // создаём дочерний процесс
      'ls -lh', (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`); // ошибка и причина сбоя
          return `error: ${error.message}`;
        } 
        if (stderr) {
          console.error(`stderr: ${stderr}`); // данные стандартного потока ошибок
          return `stderr: ${stderr}`;
        }
        console.log(`stdout:\n${stdout}`); // данные стандартного потока вывода
        return `stdout:\n${stdout}`;
      }
      // `ps -p ${pid} -o pid,vsz=MEMORY,pcpu -o comm,args=ARGS` // Linux and MacOS
    );

    const log = `${new Date()}\n${stdout}`;

    await fs.writeFile(path.resolve( __dirname, "../cpu-memory.log" ), log, {
      flag: "a",
    })
  }, 5000);
}

module.exports = { monitorProcess };