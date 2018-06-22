module.exports = {
    secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'dev_secret',
    dbName: process.env.NODE_ENV === 'production' ? 'realworld' : 'realworld_test',
    port: process.env.PORT ? process.env.PORT : 3000,
};