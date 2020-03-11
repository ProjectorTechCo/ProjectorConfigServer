const config = {
    "dev": {
        "entityQuerier": "http://localhost:5000",
        "postgres": {
            host: "localhost",
            port: 5432,
            user: 'postgres',
            database: 'postgres'
        },
        "app": "http://localhost:9000"
    }, "prod": {}
};

const relevantConfig = {
    "entityQuerier": ["postgres", "app"],
    "app": ["entityQuerier"]
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