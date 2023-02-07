import { Router } from 'express';
import passport from 'passport';
import { fork } from 'child_process';
import calculate from '../calculate.js';
import compression from 'compression';
import os from 'os';
import logger from '../loggers/log4.js';

const apiRoutes = Router();

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login')
    }
};

apiRoutes.get('/', isAuth, (req, res) => {
    const { url, method } = req;
    
    logger.info(`Redirecting to ${url} with method ${method}.`)

    res.redirect('/datos');
});

apiRoutes.get('/register', (req, res) => {
    const { url, method } = req;

    logger.info(`Redirecting to ${url} with method ${method}.`);

    res.sendFile('register.html', {root: 'views'});
});

apiRoutes.post('/register', passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/' })
);

apiRoutes.get('/failregister', (req, res) => {
    const { url, method } = req;

    logger.info(`Redirecting to ${url} with method ${method}.`);

    res.sendFile('register-error.html', {root: 'views'});
});

apiRoutes.get('/login', (req, res) => {
    const { url, method } = req;

    logger.info(`Redirecting to ${url} with method ${method}.`);

    res.sendFile('login.html', {root: 'views'});
});

apiRoutes.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/datos' })
);

apiRoutes.get('/faillogin', (req, res) => {
    const { url, method } = req;

    logger.info(`Redirecting to ${url} with method ${method}.`);

    res.sendFile('login-error.html', {root: 'views'});
})

apiRoutes.get('/logout', (req, res) => {
    const { url, method } = req;

    logger.info(`Redirecting to ${url} with method ${method}.`);

    req.logout();
    res.redirect('/');
});

apiRoutes.get('/info', (req, res) => {
    const { url, method } = req;

    logger.info(`Redirecting to ${url} with method ${method}.`);

    const directory = process.cwd();
    
    const id = process.pid;

    const nodeVersion = process.version;

    const memory = process.memoryUsage();

    const platform = process.platform;

    const inputArgs = process.argv.slice(2).length == 0
        ? 'No argument inputs'
        : process.argv.slice(2);

    const numProcessors = os.cpus().length;

    const processVariables = {directory, id, nodeVersion, memory, platform, inputArgs, numProcessors};

    res.json(processVariables);
});

apiRoutes.get('/info/compression', compression(), (req, res) => {
    const { url, method } = req;

    logger.info(`Redirecting to ${url} with method ${method}.`);

    const directory = process.cwd();
    
    const id = process.pid;

    const nodeVersion = process.version;

    const memory = process.memoryUsage();

    const platform = process.platform;

    const inputArgs = process.argv.slice(2).length == 0
        ? 'No argument inputs'
        : process.argv.slice(2);

    const numProcessors = os.cpus().length;

    const processVariables = {directory, id, nodeVersion, memory, platform, inputArgs, numProcessors};

    res.json(processVariables);
});

apiRoutes.get('/api/randoms/:number', (req, res) => {

    const { url, method } = req;

    logger.info(`Redirecting to ${url} with method ${method}.`);

    const reqNumber = Number(req.params.number);

    const calculation = calculate(reqNumber);

    console.log(calculation);
    
    //! CONSIGNA : DESACTIVAR CHILD_PROCESS DE RUTA RANDOMS
    // const forkCalculate = fork('/Users/bpont/Documents/Coderhouse/M4-Backend/LoggersGZIP-BrunoPontiz/calculate.js');

    // forkCalculate.send('start');

    // forkCalculate.on('message', obj => {
    //     res.send("Obj: ", obj);
    // })

});

apiRoutes.get('*', (req, res) => {

    const { url, method } = req;

    logger.warn(`Cannot redirect to ${url} with method ${method} because is not implemented.`);

    res.status(404).send(`<b>404 ERROR</b> - Could not find ${url} resource.`);

});

export default apiRoutes;