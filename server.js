const express = require('express');
const app = express();
const validator = require('validator');
app.listen(3000);

// task 1.
app.get('/greetings/:username', (req, res) => {
    res.send(`Hello there, ${req.params.username}!`);
});

// task 2.
app.get('/roll/:number', (req, res) => {
    if(validator.isNumeric(req.params.number) === true) {
        res.send(`You rolled a ${Math.round(Math.random()*(req.params.number - 0))}.`);
    } else {
        res.send("You must specify a number.");
    };
});

// task 3.
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
    if(collectibles[req.params.index] === 'undefined') {
        res.send("This item is not yet in stock. Check back soon!");
    } else {
        res.send(`So, you want the ${collectibles[req.params.index].name}? For ${collectibles[req.params.index].price}, it can be yours!`)
    };
});

// task 4.
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    if(Object.keys(req.query).length === 0) {
        res.send(shoes);
    } else if (Object.keys(req.query).length === 3) {
        const triQueriedShoes = [];
        shoes.forEach((shoe) => {
            if(shoe.type === req.query.type && shoe.price <= req.query['max-price'] && shoe.price >= req.query['min-price']) {
                triQueriedShoes.push(shoe);
            };
        });
        res.send(triQueriedShoes);
    } else if (Object.keys(req.query).length === 2) {
        if(req.query.type && req.query['max-price']) {
            const biQueriedShoes1 = [];
            shoes.forEach((shoe) => {
                if(shoe.type === req.query.type && shoe.price <= req.query['max-price']) {
                    biQueriedShoes1.push(shoe);
                };
            });
            res.send(biQueriedShoes1);
        } else if(req.query.type && req.query['min-price']) {
            const biQueriedShoes2 = [];
            shoes.forEach((shoe) => {
                if(shoe.type === req.query.type && shoe.price >= req.query['min-price']) {
                    biQueriedShoes2.push(shoe);
                };
            });
            res.send(biQueriedShoes2);
        } else if(req.query['max-price'] && req.query['min-price']) {
            const biQueriedShoes3 = [];
            shoes.forEach((shoe) => {
                if(shoe.price <= req.query['max-price'] && shoe.price >= req.query['min-price']) {
                    biQueriedShoes3.push(shoe);
                };
            });
            res.send(biQueriedShoes3);
        };
    } else if (Object.keys(req.query).length === 1) {
        if (req.query.type) {
            const uniQueriedShoes1 = [];
            shoes.forEach((shoe) => {
                if(shoe.type === req.query.type) {
                    uniQueriedShoes1.push(shoe);
                };
            });
            res.send(uniQueriedShoes1);
        } else if (req.query['max-price']) {
            const uniQueriedShoes2 = [];
            shoes.forEach((shoe) => {
                if(shoe.price <= req.query['max-price']) {
                    uniQueriedShoes2.push(shoe);
                };
            });
            res.send(uniQueriedShoes2);
        } else if (req.query['min-price']) {
            const uniQueriedShoes3 = [];
            shoes.forEach((shoe) => {
                if(shoe.price >= req.query['min-price']) {
                    uniQueriedShoes3.push(shoe);
                };
            });
            res.send(uniQueriedShoes3);
        };
    };
});