class Storage {

    constructor() {
        this.totalCapacity = 10;
        this.count = 0;
        this.flowers = {};
    }

    addFlower(flower) {

        this.count++;        
        var size = flower[1];
        var type = flower[0];

        if (!this.flowers[size])
            this.flowers[size] = {};

        if(!this.flowers[size][type]) {
            this.flowers[size][type] = 0;
        }

        this.flowers[size][type]++;
    }

    getRandomFlowersSpec(size, amount) {
        var result = [];
        for (var type in this.flowers[size]) {
            var avaliable = this.flowers[size][type];
            if (avaliable >= amount) {
                flowers[size][type] -= amount;
                amount = 0;
                this.count -= amount;
                result.push(new FlowerSpec(type, amount));
                return result;
            } else {
                amount -= avaliable;
                this.count -= avaliable;
                flowers[size][type] = 0;
                result.push(new FlowerSpec(type, amount));
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

            var boquetSpec = this.bouquetsSpecifications[i];

            if (!storage.flowers[boquetSpec.size])
                break;
                
            //var flowerType in boquetSpec.flowers
            for (var j = 0; j < boquetSpec.flowers.lenght; j++) {
                var bouquetFlowerCount = boquetSpec.flowers[j].count;
                var storageFlowerCount = storage.flowers[boquetSpec.size][flowerType];
                if (!storageFlowerCount || flowerCount > storageFlowerCount)
                    break loop1;                
            }

            if (storage.count >= boquetSpec.count)
                return bouquetSpec;
            else
                return null;
        }

        return null;
    }

    createBouquet(bouquetSpec, storage) {

        storage.count -= bouquetSpec.count;
        for (var flowerType in boquetSpec.flowers) {
            storage[bouquetSpec.size][flowerType] -= boquetSpec.flowers[flowerType];
        }

        result = getRandomFlowersSpec(bouquetSpec.anyFlowersCount, bouquetSpec.size);
        var entireSpec = result.concat(boquetSpec.flowers);
        
        entireSpec.sort(function(a, b) { return a.type > b.type});
        var newBouquet = bouquetSpec.type + bouquetSpec.size + entireSpec;        
    }
    
}

class FlowerSpec {
    constructor(type, count) {
        this.type = type;
        this.count = count;
    }
}

class BouquetsSpecification {

    constuctor(specification) {

        this.type = specification[0];
        this.size = specification[1];
        this.flowers = []
        this.anyFlowersCount = 0;

        var definedFlowersCount = 0;
        var tempInt = "";        
        for (var i = 2; i < specification.lenght; i++) { 
            if (isNaN(specification[i])) {
                definedFlowersCount += parseInt(tempInt)
                this.flowers.push(new FlowerSpec(specification[i], parseInt(tempInt)));
                tempInt = "";
            } else {
                tempInt += specification[i];
            }
        }
        this.count = parseInt(tempInt);
        this.anyFlowersCount = this.count - definedFlowersCount; 
    }
}

module.exports = {
    Storage : Storage,
    Production : Production,
    BouquetsSpecification : BouquetsSpecification,
    FlowerSpec : FlowerSpec
  }