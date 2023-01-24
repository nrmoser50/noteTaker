const router = require("express").Router();
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const { v4:uuidv4 } = require("uuid")


const getNotes = () => {
  return readFile("db/db.json", "utf-8").then((rawNotes) =>
    [].concat(JSON.parse(rawNotes))
  );
};

router.get("/", (req, res) => {
  getNotes().then((notes) => res.json(notes)).catch(err => res.status(500).json(err));
});

router.post("/", (req, res) => {
  const { title, text } = req.body;
  console.log(title, text)
  getNotes().then(oldNotes => {
    const newNote = { title, text, id: uuidv4()};
    var newNotes = [...oldNotes, newNote];
    writeFile("db/db.json", JSON.stringify(newNotes)).then(() => res.json({msg: "Okay"})).catch(err => res.status(500).json(err));
  })
});


router.delete("/:id", (req, res) => {
  getNotes().then((notes) => {
    const noteId = req.params.id;
    console.log(notes)
    console.log(noteId)
    filteredNotes = notes.filter(note => note.id!== noteId)
    console.log(filteredNotes)
    writeFile("db/db.json", JSON.stringify(filteredNotes)).then(() => res.json({msg: "Okay"})).catch(err => res.status(500).json(err));
  

  })

});

module.exports = router;
