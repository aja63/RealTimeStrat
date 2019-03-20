var txt = document.getElementById('text');


var isUnitSelected = false;
var altControl = false;
var unitCount = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var unitCounter = 4;


document.addEventListener("keypress", pressed)
document.addEventListener("keyup", unpressed)
function pressed() {
	altControl = true;
	test = altControl.toString();
	txt.innerHTML = test;
}
function unpressed() {
	altControl = false;
	test = altControl.toString();
	txt.innerHTML = test;
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
			unit.style.left = mouseXstr;
			unit.style.top = mouseYstr;
		
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
	

document.getElementById('creator').addEventListener("click", buildUnit);

function buildUnit() {
	var newUnit = document.createElement("div");
	newUnit.classList.add('ally');
	newUnit.style.top = "50px";
	newUnit.style.left = "50px";
	txt.innerHTML += unitCount;
	newUnit.id = "playerUnit" + unitCount[unitCounter];
	unitCounter = unitCounter + 1;
	document.body.appendChild(newUnit);
}
	
	
	
