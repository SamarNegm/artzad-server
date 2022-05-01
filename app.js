const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const toursRouter = require('./routes/v1/tours');
const usersRouter = require('./routes/v1/users');
const authRouter = require('./routes/v1/auth');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

const corsOptions = {
    origin: 'https://mongoosejs.com',
};
app.use(cors(corsOptions));

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1', authRouter);

app.all('*', (req, res) => {
    res.json({
        status: 'failure',
        message: 'wrong url',
    });
});

app.use((err, req, res, next) => {
    console.log('global err handler');
    res.json(err);
});

module.exports = app;
