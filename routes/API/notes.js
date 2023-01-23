const router = require("express").Router();
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const { v4: uuidy4 } = require('uuid');

const getNotes = () => {
  return readFile("db/db.json", "utf-8").then((rawNotes) =>
    [].concat(JSON.parse(rawNotes))
  );
};

router.get("/", (req, res) => {
  getNotes().then((notes) => res.json(notes));
});

router.post("/", (req, res) => {
  const { title, text } = req.body;
  const db = JSON.parse(fs.readFileSync('./db/db.json', (err) => {
    if (err) throw err;
    const item = {
      id: uuidy4(),
      title,
      text,
    }
    db.push(item);
    fs.writeFileSync('./db/db.json', JSON.stringify(db, null, 2));
    }))
  });


router.delete("/", (req, res) => {
  const db = JSON.parse(fs.readFileSync('../db/db.json', (err) => {
    if (err) console.log(err);
    const newDb = db.filter((note) => {
      return note.id !== req.params.id;
    })
    fs.writeFileSync('../db/db.json', JSON.stringify(newDb, null, 2));
    res.json({message: `Deleted ${req.params.id}`})
   }))
  });

module.exports = router;
