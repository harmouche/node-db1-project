const express = require('express');

const db = require('./data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    db.select('*')
    .from('accounts')
    .then( (accountsArray) => res.status(200).json({ data: accountsArray}))
    .catch( (error) => console.log(error))
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
     .where({ id })
     .then(account => res.status(200).json({ data: account}))
     .catch( (error) => console.log("Can't find the assigned id", error))
});

router.post('/', (req, res) => {
    const accountData = req.body;
    db('accounts')
     .insert(accountData)
     .then(id => res.status(201).json({ data: id}))
     .catch( (error) => console.log("Can't post a new account", error))
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db('accounts')
    .where({ id })
    .update(changes)
    .then( count => {
        if(count > 0) {
            res.status(200).json({ data : count})
        } else {
            res.status(404).json({ message: "There's no record to update"})
        }
    })
    .catch((error) => console.log("Error updating an account", error))
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
    .where({ id })
    .del()
    .then( count => {
        if(count > 0) {
            res.status(200).json({ data: count})
        } else {
            res.status(404).json({ message: "there was no record to delete" })
        }
    })
    .catch( (error) => console.log("Error deleting a record", error))
});



module.exports = router;