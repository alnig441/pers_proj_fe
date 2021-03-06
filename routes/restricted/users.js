const express = require('express'),
    router = express.Router();
const passport = require('passport');

const { Client } = require('pg'),
    connectionString = process.env.MYDB;

const bcrypt = require('bcrypt'),
    saltRounds = 10,
    defaultPassword = 'jacn2014';

router.get('/', (req, res, next) => {
    const client = new Client({
        connectionString: connectionString || process.env.MYDB 
    })

    client.connect();

    return client.query('SELECT * FROM users as a INNER JOIN accounts as b ON a.account_type::uuid = b.account_id')
        .then(result => {
            res.send(result.rows);
            client.end();
        })
        .catch(error => {
            console.log('error from query: ', error);
            client.end();
        })
})

router.post('/', (req, res, next) => {
    const client = new Client({
        connectionString: connectionString || process.env.MYDB
    })
    client.connect();

    bcrypt.hash(req.body.password || defaultPassword, saltRounds)
        .then((hash, err) => {
            if(err){
                return Promise.reject({ status: err.statusCode, message: err.message})
            }
            else {
                return client.query(`INSERT INTO users VALUES( ${req.body.user_id}, '${req.body.account_type}', '${req.body.user_name}', '${hash}')`)
                    .then((result) => {
                        res.status(200).send({message: `${result.command} SUCCESS`});
                        client.end();
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(400).send({message: error.detail});
                        client.end();
                    })
            }
        })
})

router.param('user_id', (req, res, next, user_id) => {
  console.log('next: ', next)
    req.user = {id: user_id, language: req.body.language, type: req.body.account_type }
    next();
})

router.route('/:user_id?')
    .all((req, res, next) => {
        next();
    })
    .get((req, res, next) => {
        console.log('fetching user: ', req.user )
    })
    .put((req, res, next) =>{      
        const client = new Client({
            connectionString: connectionString || process.env.MYDB 
        })

        client.connect();

        return client.query(`UPDATE users SET (account_type, language) = ('${req.user.type}', '${req.user.language}') WHERE user_id = '${req.user.id}'`)
            .then((result) => {
                res.status(200).send({message: `${result.command} SUCCESS`});
                client.end();
            })
            .catch(error => {
                console.log(error);
                res.status(400).send({message: error.detail});
                client.end();
            })

    })
    .delete((req, res, next) => {
        const client = new Client({
            connectionString: connectionString || process.env.MYDB 
        })

        client.connect();

        return client.query(`DELETE FROM USERS WHERE user_id = '${req.user.id}'`)
            .then((result) => {
                res.status(200).send({message: `${result.command} SUCCESS`});
                client.end();
            })
            .catch(error => {
                res.status(400).send({message: error.detail});
                client.end();
            })
    })


module.exports = router;