const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./logger");
const config = require("./config");

const app = express();
const PORT = process.env.PORT || 7200;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(logger);

app.get('/config', (req, res) => {
    try {
        let { env, service } = req.query;
        res.status(200).json(config.getConfig(service, env));
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
