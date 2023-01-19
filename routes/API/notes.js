const router = require("express").Router();
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const getNotes = () => {
  return readFile("db/db.json", "utf-8").then((rawNotes) =>
    [].concat(JSON.parse(rawNotes))
  );
};

router.get("/", (req, res) => {
  getNotes().then((notes) => res.json(notes));
});

module.exports = router;
