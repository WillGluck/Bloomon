class Storage {

    constructor() {
        this.totalCapacity = 256;
        this.count = 0;
        this.flowers = {};
    }

    addFlower(flower) {

        this.count++;        
        var size = flower[1];
        var type = flower[0];

        if (!this.flowers[size]) {
            this.flowers[size] = {};
        }
        

        if(!this.flowers[size][type]) {
            this.flowers[size][type] = 0;
        }

        this.flowers[size][type]++;
    }

    getRandomFlowersSpec(amount, size) {
        var result = [];
        for (var type in this.flowers[size]) {  
            var avaliable = this.flowers[size][type];
            if (avaliable >= amount) {
                this.flowers[size][type] -= amount;                
                this.count -= amount;
                result.push(new FlowerSpec(type, amount));
                return result;
            } else if (avaliable != 0) {
                amount -= avaliable;
                this.count -= avaliable;
                this.flowers[size][type] = 0;
                result.push(new FlowerSpec(type, avaliable));
            }            
        }        
    }

    isFull() {
        return this.count == this.totalCapacity;
    }

}

class Production {

    constructor() {
        this.bouquetsSpecifications = []
    }

    addBoquetSpecification(bouquetSpecification) {
        this.bouquetsSpecifications.push(bouquetSpecification);
    }

    getAvaliableBouquetSpec(storage) { 

        loop1:
        for (var i = 0; i <  this.bouquetsSpecifications.length; i++) {

            var bouquetSpec = this.bouquetsSpecifications[i];

            if (!storage.flowers[bouquetSpec.size]) {
                break;
            }
                
            //var flowerType in boquetSpec.flowers
            for (var j = 0; j < bouquetSpec.flowers.length; j++) {
                var flowerSpec = bouquetSpec.flowers[j];
                var bouquetFlowerCount = flowerSpec.count;
                var storageFlowerCount = storage.flowers[bouquetSpec.size][flowerSpec.type];
                if (!storageFlowerCount || bouquetFlowerCount > storageFlowerCount) {
                    break loop1;                
                }
            }

            if (storage.count >= bouquetSpec.count) {
                return bouquetSpec;
            } else  {
                return null;
            }
        }

        return null;
    }

    createBouquet(bouquetSpec, storage) {

        storage.count -= bouquetSpec.count;
        //for (var flowerType in bouquetSpec.flowers) {
        for (var i = 0; i < bouquetSpec.flowers.length; i++) {
            var flowerSpec = bouquetSpec.flowers[i];
            storage.flowers[bouquetSpec.size][flowerSpec.type] -= flowerSpec.count;
        }

        var result = []
        if (0 < bouquetSpec.anyFlowersCount) {
            result = storage.getRandomFlowersSpec(bouquetSpec.anyFlowersCount, bouquetSpec.size);
        }        
        var entireSpec = result.concat(bouquetSpec.flowers);        
        entireSpec.sort(function(a, b) { return a.type > b.type});

        var newBouquet = bouquetSpec.type + bouquetSpec.size + entireSpec.map(function(item) { return item.count + item.type}).join("");        
        return newBouquet;
    }
    
}

class FlowerSpec {
    constructor(type, count) {
        this.type = type;
        this.count = count;
    }
}

function BouquetsSpecification(specification) {

    //constuctor(specification) {

        this.type = specification[0];
        this.size = specification[1];
        this.flowers = [];

        var definedFlowersCount = 0;
        var tempInt = "";

        for (var i = 2; i < specification.length; i++) { 
            if (isNaN(specification[i])) {
                definedFlowersCount += parseInt(tempInt);
                this.flowers.push(new FlowerSpec(specification[i], parseInt(tempInt)));
                tempInt = "";
            } else {
                tempInt += specification[i];
            }
        }
        this.count = parseInt(tempInt);
        this.anyFlowersCount = this.count - definedFlowersCount; 
    //}
}

module.exports = {
    Storage : Storage,
    Production : Production,
    BouquetsSpecification: BouquetsSpecification,
    FlowerSpec : FlowerSpec
  }