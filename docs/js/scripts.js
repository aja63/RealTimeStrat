var txt = document.getElementById('text');


var isUnitSelected = false;
var altControl = false;
var buildControl = false;
var unitCount = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
var creatorCount = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
var unitCounter = 4;
var creatorCounter = 1;
var resourceCount = 50;
txt.innerHTML = resourceCount;

document.addEventListener("keypress", moveAlt)
document.addEventListener("keypress", buildAlt)
document.addEventListener("keyup", unpressed)
function moveAlt() {
	if(event.keyCode == 115){
		altControl = true;
	};
}

function buildAlt(){
 	if(event.keyCode == 98){
		buildControl = true;
		txt.innerHTML =  buildControl.toString();
	}; 
}
function unpressed() {
	altControl = false;
	buildControl = false;
	test = altControl.toString();
	txt.innerHTML = test;
}


document.addEventListener("click", move);

function move(){ if (altControl == false){
	if (isUnitSelected == true){
		var mouseY = event.clientY - 25;
		var mouseX = event.clientX - 25;
		var mouseYstr = mouseY.toString()+'px';
		var mouseXstr = mouseX.toString()+'px';
		var unitList = document.getElementsByClassName('selected');
		for (unitCheck = 0; unitCheck < unitList.length; unitCheck++) {
			var unitID = unitList[unitCheck].id;
			var unit = document.getElementById(unitID);
			var cooldown = unit.classList.contains("cooldown");
			if (cooldown == false){
			unit.style.left = mouseXstr;
			unit.style.top = mouseYstr;
			unit.classList.add("cooldown");}	
			setTimeout(function(){
				var stuckUnits = document.getElementsByClassName("cooldown");
				for (unitCheck = 0; unitCheck < stuckUnits.length; unitCheck++){document.getElementById(stuckUnits[unitCheck].id).classList.remove("cooldown");}
				},3000);
			}
		}
	}
}




document.addEventListener("click", selectUnit);

function selectUnit(){ if (altControl == false){
	var mouseY = event.clientY;
	var mouseX = event.clientX;
	var unitList = document.getElementsByClassName('ally');
	for (unitCheck = 0; unitCheck < unitList.length; unitCheck++) {
		var unitID = unitList[unitCheck].id;
		var unit = document.getElementById(unitID);
		if (parseInt(unit.style.left) < mouseX && parseInt(unit.style.left)+50 > mouseX && parseInt(unit.style.top) < mouseY && parseInt(unit.style.top)+50 > mouseY){
			unit.classList.add("selected");
			isUnitSelected = true;
			}
		}
	}	
} 


document.addEventListener("click", deselectUnit);

function deselectUnit(){if (altControl == true){
	if (isUnitSelected == true){
		var mouseY = event.clientY;
		var mouseX = event.clientX;
		var unitList = document.getElementsByClassName('ally');
		for (unitCheck = 0; unitCheck < unitList.length; unitCheck++) {
			var unitID = unitList[unitCheck].id;
			var unit = document.getElementById(unitID);
			if (parseInt(unit.style.left) < mouseX && parseInt(unit.style.left)+50 > mouseX && parseInt(unit.style.top) < mouseY && parseInt(unit.style.top)+50 > mouseY){
				unit.classList.remove("selected");
				isUnitSelected = true;
			}
		}
	}	
}
}	
	


document.addEventListener("click", getResource);

function getResource(){
	var resource = document.getElementById('resourceHolder');
	var unitList = document.getElementsByClassName('selected');
	for (unitCheck = 0; unitCheck < unitList.length; unitCheck++){
		var unitID = unitList[unitCheck].id;
		var unit = document.getElementById(unitID);
		if (parseInt(unit.style.left) > parseInt(resource.style.left) && parseInt(unit.style.left)+50 < parseInt(resource.style.left)+250 && parseInt(unit.style.top) > parseInt(resource.style.top) && parseInt(unit.style.top)+50 < parseInt(resource.style.top)+250){ 
			unit.classList.add('gathering');}
			else{unit.classList.remove('gathering');}
}
}

function resourceGathering(){
	setInterval(function(){var unitsGathering = document.getElementsByClassName('gathering').length; resourceCount = resourceCount + unitsGathering*50; txt.innerHTML = resourceCount;}, 5000);
}


setInterval(function(){
var creatorList = document.getElementsByClassName('creator');
for (x = 0; x<creatorList.length; x++){
document.getElementById(creatorList[x].id).addEventListener("click", buildUnit);}
} , 100);

var creatorList = document.getElementsByClassName('creator');
for (x = 0; x<creatorList.length; x++){
document.getElementById(creatorList[x].id).addEventListener("click", buildUnit);}

function buildUnit() { if (resourceCount >= 100){
	var BuildLocationX = document.getElementById(this.id).style.left;
	var BuildLocationY = document.getElementById(this.id).style.top;
	txt.innerHTML = BuildLocationX, BuildLocationY
	resourceCount = resourceCount - 100;
	var newUnit = document.createElement("div");
	newUnit.classList.add('ally');
	newUnit.style.top = BuildLocationY;
	newUnit.style.left = BuildLocationX;
	newUnit.id = "playerUnit" + unitCount[unitCounter];
	unitCounter = unitCounter + 1;
	document.body.appendChild(newUnit);
}
}


document.addEventListener("click", build);

function build(){if (buildControl == true && resourceCount >= 500){
	var mouseY = event.clientY;
	var mouseX = event.clientX;
	var mouseYstr = mouseY.toString()+'px';
	var mouseXstr = mouseX.toString()+'px';
	var newCreator = document.createElement("div");
	newCreator.classList.add('creator');
	newCreator.style.top = mouseYstr;
	newCreator.style.left = mouseXstr;
	newCreator.id = "creator" + creatorCount[creatorCounter];
	creatorCounter++;
	document.body.appendChild(newCreator);
}
}

