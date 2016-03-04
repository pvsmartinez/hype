var config = {};

//db config
config.db = {};
config.db.name = 'hype';
config.db.user = process.env.HYPE_DB_USER || 'root';
config.db.password=  process.env.HYPE_DB_PASSWORD || 'root';
config.db.host = process.env.HYPE_DB_HOST || 'localhost';
config.db.port = process.env.HYPE_DB_PORT || 3306;

//web config
config.web = {};
config.web.port = process.env.WEB_PORT || 8080;

module.exports = config;