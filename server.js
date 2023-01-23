const express = require("express");
const app = express();
const PORT = 3001;
const routes = require("./routes");
const fs = require("fs");
const { randomUUID } = require("crypto");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(routes);

app.get('/notes', (res, req) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (res, req) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api/notes', (res, req) => {

    fs.readFile('db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        parsedNotes = JSON.parse(data);
        res.json(parsedNotes);
    })
})

// app.post('/api/notes', (req, res) => {
//     const { title, text } = req.body;
//     const db = JSON.parse(fs.readFileSync('./db/notes.json', (err) => {
//         if (err) throw err;
    
//     const newNote = {
//         title,
//         text,
//         id: randomUUID()
//     }
//     db.push(newNote);
// }))
// })

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
    