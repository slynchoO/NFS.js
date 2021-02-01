function needForSpeed(input) {
    let carsToObtain = Number(input.shift());

    let garage = {};
    
    while(carsToObtain > 0) {
        //{car}|{mileage}|{fuel}
        let [car, mileage, fuel] = input.shift().split('|');

        mileage = Number(mileage);
        fuel = Number(fuel);

        if(!garage.hasOwnProperty(car)) {
            garage[car] = {
                mileage: mileage,
                fuel: fuel
            };
        }

        carsToObtain--;
    }

    let command = input.shift();

    while(command !== 'Stop') {
        let [action, car, arg1, arg2] = command.split(' : ');

        switch(action) {
            case 'Drive':
                arg1 = Number(arg1); // mileage
                arg2 = Number(arg2); // fuel

                if(garage[car].fuel < arg2) {
                    console.log(`Not enough fuel to make that ride`);
                } else {
                    garage[car].fuel -= arg2;
                    garage[car].mileage += arg1;

                    console.log(`${car} driven for ${arg1} kilometers. ${arg2} liters of fuel consumed.`);
                }

                if(garage[car].mileage >= 100000) {
                    console.log(`Time to sell the ${car}!`);

                    delete garage[car];
                }
            break;

            case 'Refuel':
                arg1 = Number(arg1); // fuel

                if(garage[car].fuel + arg1 > 75) {
                    let refuel = 75 - garage[car].fuel;
                    garage[car].fuel = 75;
                    console.log(`${car} refueled with ${refuel} liters`);
                } else {
                    garage[car].fuel += arg1;
                    console.log(`${car} refueled with ${arg1} liters`);
                }
               
            break;

            case 'Revert':
                arg1 = Number(arg1); // mileage

                garage[car].mileage -= arg1;

                if(garage[car].mileage > 10000) {
                    console.log(`${car} mileage decreased by ${arg1} kilometers`);
                } else {
                    garage[car].mileage = 10000;
                }
            break;
        }


        command = input.shift();
    }

    

    let sorted = Object.entries(garage)
    .sort((a, b) => {
        if(a[1].mileage == b[1].mileage) {
           return a[0].localeCompare(b[0]);
        } else {
            return b[1].mileage - a[1].mileage;
        }
    });

    

    for(let x of sorted) {
        console.log(`${x[0]} -> Mileage: ${x[1].mileage} kms, Fuel in the tank: ${x[1].fuel} lt.`);
    }
}

needForSpeed([
    '4',
    'Lamborghini Veneno|11111|74',
    'Bugatti Veyron|12345|67',
    'Koenigsegg CCXR|67890|12',
    'Aston Martin Valkryie|99900|50',
    'Drive : Koenigsegg CCXR : 382 : 82',
    'Drive : Aston Martin Valkryie : 99 : 23',
    'Drive : Aston Martin Valkryie : 2 : 1',
    'Refuel : Lamborghini Veneno : 40',
    'Revert : Bugatti Veyron : 2000',
    'Stop'
  ]);