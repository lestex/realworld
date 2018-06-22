module.exports = {
    secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'dev_secret',
    dbUrl: process.env.DB_URL ? process.env.DB_URL : 'mongodb://localhost/realworld_test',
    port: process.env.PORT ? process.env.PORT : 3000,
};