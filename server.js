const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(routes);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
    