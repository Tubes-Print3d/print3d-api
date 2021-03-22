const fs = require("fs");
const { promisify } = require("util");
const path = require("path");

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function reqdir(dir) {
  return Promise.all(
    (await readdir(dir)).map(async (f) => {
      const p = path.join(dir, f);
      if (fs.lstatSync(p).isDirectory()) {
        return reqdir(p);
      } else if (/\w*\.model\.js/.test(f)) {
        require(p);
      }
    })
  );
}

module.exports = reqdir;
