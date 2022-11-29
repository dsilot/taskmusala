import fs from 'fs';

const save = (db) => {
  fs.writeFileSync("./src/database/db.json", JSON.stringify(db, null, 2), {
    encoding: "utf-8",
  });
};

export default save;