var list = document.getElementById('List');
var numCount = 10;
var punishRate = 1.5;
var numLim;
var listArr;
var curIndex;
var roundMax = 5;
var round;
var roundScores;

var errorRateField = document.getElementById('ErrorRate');
var roundField = document.getElementById('Round');
var picksList = document.getElementById('PicksList');


var pickBtn = document.getElementById("Pick");
var passBtn = document.getElementById("Pass");
var resetBtn = document.getElementById("Reset");

round = 1;
roundScores = [];
resetBtn.disabled = true;

function setup() {
  curIndex = 0;
  listArr = [];

  for (var i = 0; i < numCount; i++) {
    var numLimP1 = Math.floor(Math.random()*99 + 1);
    listArr.push(Math.floor(Math.random()*numLimP1));
  }
  roundField.innerHTML = round;
}


function reset() {
  list.innerHTML = "";
  errorRateField.innerHTML = "";

  resetBtn.disabled = true;
  roundField.innerHTML = round;
  setup();
  getNext();
}

function getNext(){
      var li = document.createElement('li');
      li.innerHTML = listArr[curIndex] + " (" +(numCount - curIndex - 1) + " left." + ")";
      list.appendChild(li);
      curIndex++;
}

function showTheBest(){
  var maxInList = Math.max(...listArr);
  var chosen = listArr[curIndex-1];

  var errorRate = Math.floor(Math.abs(maxInList - chosen) / Math.max(maxInList, chosen)*100);
  var punish = curIndex * punishRate;
  roundScores.push(errorRate + punish);

  var li = document.createElement('li');
  li.innerHTML = chosen + "/" + maxInList;
  picksList.appendChild(li);

}

passBtn.addEventListener("click", function(){
    if ( curIndex !== numCount && round <= roundMax) {
      getNext();
    }
});

pickBtn.addEventListener("click", function () {
  if (round < roundMax) {
    showTheBest();
    reset();
    round++;
    roundField.innerHTML = round;

  } else if(round ===roundMax){
    showTheBest();
    reset();
    roundField.innerHTML = "end";
    var totalScore = 0;
    roundScores.forEach((score)=>{
      totalScore += score;
    });
    totalScore /= roundMax;
    var intuitionPower = 100 - totalScore;
    errorRateField.innerHTML = Math.floor(intuitionPower);
    resetBtn.disabled = false;
    round++;
  }
})

resetBtn.addEventListener("click", function () {
  if (round >= roundMax) {
    picksList.innerHTML = "";
    round = 1;
    roundScores = [];
    reset();
  }
})


setup();
getNext();
