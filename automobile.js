// Behnam Saeedi
// Assignment: Higher-order Functions and Objects

function Automobile( year, make, model, type ){
	this.year = year; //integer (ex. 2001, 1995)
	this.make = make; //string (ex. Honda, Ford)
	this.model = model; //string (ex. Accord, Focus)
	this.type = type; //string (ex. Pickup, SUV)
}

Automobile.prototype.logMe = function(cond){
	if(cond){
		var out = this.year+' '+this.make+' '+this.model+' '+this.type;
	}else{
		var out = this.year+' '+this.make+' '+this.model;
	}
	return out;
};

var automobiles = [
	new Automobile(1995, "Honda", "Accord", "Sedan"),
	new Automobile(1990, "Ford", "F-150", "Pickup"),
	new Automobile(2000, "GMC", "Tahoe", "SUV"),
	new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
	new Automobile(2005, "Lotus", "Elise", "Roadster"),
	new Automobile(2008, "Subaru", "Outback", "Wagon")
];

function sortArr( comparator, array ){
	var swapped;
	do {
		swapped = false;
		for (var i=0; i < array.length-1; i++) {
			if (comparator(array[i],array[i+1])) {
				var temp = array[i];
				array[i] = array[i+1];
				array[i+1] = temp;
				swapped = true;
			}
		}
	} while (swapped);
	for (var i=0; i < array.length; i++) {
		console.log(array[i].logMe(comparator==typeComparator));
	}
}

function exComparator( int1, int2){
	if (int1 > int2){
		return true;
	} else {
		return false;
	}
}

function yearComparator( auto1, auto2){
	return (auto1.year < auto2.year);
}

function makeComparator( auto1, auto2){
	return (auto1.make > auto2.make);
}

function typeComparator( auto1, auto2){
	if(auto1.type == auto2.type)
		return(auto1.year < auto2.year);
	var order = ['Roadster', 'Pickup', 'SUV', 'Wagon'];
	var x = 4;
	var y = 4;
	for(var i = 0; i < order.length; i++){
		if(auto1.type == order[i])
			x = i;
		if(auto2.type == order[i])
			y = i;
	}
	return (x>y)
}

console.log("*****");
console.log("The cars sorted by year are:");
sortArr(yearComparator,automobiles);

console.log("\nThe cars sorted by make are:");
sortArr(makeComparator,automobiles);
console.log("\nThe cars sorted by type are:");
sortArr(typeComparator,automobiles);
console.log("*****");
