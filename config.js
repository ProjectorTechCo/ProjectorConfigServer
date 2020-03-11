const schema =  require("./schema");
const config = {
    "dev": {
        "entityQuerier": "http://localhost:5000/",
        "postgres": {
            host: "localhost",
            port: 5432,
            user: 'postgres',
            database: 'postgres'
        },
        "app": "http://localhost:9000/",
        schema
    }, "prod": {}
};

console.log(config.dev.schema.projects);

const relevantConfig = {
    "entityQuerier": ["postgres", "app", "schema"],
    "app": ["entityQuerier", "schema"]
};

const getConfig = (service, env) => {
    if (!service)
        throw Error("No service");
    if (!config["dev"][service])
        throw Error("Service do not exists");
    let envConfig = config[env || "dev"];
    return relevantConfig[service].reduce((obj, item) =>
        Object.assign(obj, {[item]: envConfig[item]}), {});
};

module.exports = {
    getConfig
};