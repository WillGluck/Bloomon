#! /usr/bin/env node
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const Model =  require('./models.js');

const storage = new Model.Storage();
const production = new Model.Production();


var bouquetSpecsFinished = false

process.stdout.write("Inform Bouquet Specs\n")

rl.on('line', (input) => { // raised every time a new input happens

    if (!input.trim()) {
        bouquetSpecsFinished = true;
        process.stdout.write("Bouquet Specs finished, inform flowers\n")
        return;
    }

    if (storage.isFull()) {
        process.stdout.write("Storage is Full\n")
        process.exit(1);
    }

    if (bouquetSpecsFinished) {
        storage.addFlower(input);
        // process.stdout.write(JSON.stringify(storage.flowers) + "\n");
        // process.stdout.write(JSON.stringify(production.bouquetsSpecifications[0]) + "\n");
        
        var bouquetSpecAvaliable = production.getAvaliableBouquetSpec(storage);
        process.stdout.write("Flower added\n")
        if (bouquetSpecAvaliable) {
            process.stdout.write("A new bouquet is avaliable\n")
            // process.stdout.write(bouquetSpecAvaliable.size + "\n")
            process.stdout.write(JSON.stringify(production.createBouquet(bouquetSpecAvaliable, storage)) + "\n\n");
        }        
    } else {
        var bouquetSpec = new Model.BouquetsSpecification(input);
        // process.stdout.write(JSON.stringify(bouquetSpec.size) + "\n");
        // bouquetSpec.size = input[1];
        // process.stdout.write(JSON.stringify(bouquetSpec.size) + "\n");
        production.addBoquetSpecification(bouquetSpec);        
        process.stdout.write("Bouquet Specfication Added\n")
    }
    
});

