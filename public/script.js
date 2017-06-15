(function() {
let arr = [];
const ulItem = document.getElementById("wbList");
const selItem = document.getElementById("wbSelect");


loadData(wreckThePage);

selItem.addEventListener("change", wreckRed);
ulItem.addEventListener("click", function(e) {
  wreckAlert(e);
})

function wreckRed() {
  let list = ulItem.getElementsByTagName("li");
  for (let i = 0; i < list.length; i++) { list[i].style.color = "black" };
  let val = this.selectedOptions[0].value;
  let selected = ulItem.getElementsByClassName("wbItemNo-"+val)[0];
  selected.style.color = "red";
}

function wreckAlert(e) {
  let target = e.target;
  if (target && target.nodeName == "LI") {
    alert(target.innerText);
  }
}

function WreckingBall(num) {
  this.number = parseInt(num);
}

WreckingBall.prototype.toString = function wbToString() {
  let res = "",
      num = this.number;
  if (num % 3 == 0) {
    res += "Wrecking";
  }
  if (num % 5 == 0) {
    res += "Ball";
  }
  if (res == "") {
    res = num.toString();
  }
  return res;
}

function unique(value, index, self) {
	return self.indexOf(value) === index;
}

function loadData(callback) {
  let request = new XMLHttpRequest();

  request.open("GET", "/data", true);
  request.send();

  request.onload = function () {
      if (request.status === 200) {
        callback(request.responseText);
      } else {
        console.log("Error: Request Status " + request.status);
      }
  }  
}

function wreckThePage(response) {
  arrayData(response);
  buildOptions(arr);
  buildList(arr);
}

function arrayData(response) { 
  let data = (JSON.parse(response)).data.split(',');
  data.sort(function(a,b){return a-b});
  data = data.filter(unique);
  for(let i in data) {
    arr.push(new WreckingBall(data[i]));
  }
}

function buildList(array) {
  for(let i in array) {
    let liItem = document.createElement("li");
    liItem.className = "wbItem wbItemNo-" + array[i].number.toString();
    liItem.innerText = array[i].toString();
    ulItem.appendChild(liItem);
  }
}

function buildOptions(array) {
  for(let i in array) {
    let opItem = document.createElement("option");
    opItem.className = "wbOpt-" + array[i].number.toString();
    opItem.innerText = array[i].toString();
    opItem.value = array[i].number;
    selItem.appendChild(opItem);
  }
}

})();