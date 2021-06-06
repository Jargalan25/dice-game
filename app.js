// Тоглоомын бүх газар ашиглагдах глобал хувьсагч
var activePlayer, score, roundScore, diceNumber;

// Шооны зургийг үзүүлэх элементийг DOM-оос хайж олоод энд хадгалё

var diceDom = document.querySelector(".dice");
// Тоглоомыг эхлүүлнэ.
initGame();
//Тоглоомыг шинээр эхлэхэд бэлтгэнэ.
function initGame() {
  // Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0, 2-р тоглогчийг 1 гэж тэмдэглэе.
  activePlayer = 0;

  // Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
  scores = [0, 0];

  // Тоглогчийн ээлжиндээ цуглуулсан оноо
  roundScore = 0;

  // Шооны аль талаараа буусныг хадгалах хувьсагч, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө.
  diceNumber = Math.floor(Math.random() * 6) + 1;

  // <div class="player-score" id="score-0">43</div>
  // document.querySelector("#score-0").textContent = dice;

  //document.querySelector("#score-1").innerHTML = "<em>Yes!</em>";
  // Программ эхлэхэд бэлтгэе
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //Тоглогчдын нэрийг буцааж гаргах

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.add("active");

  diceDom.style.display = "none";
}

//Шоог шидэх эвент листенер
document
  .querySelector(".btn-roll")
  .addEventListener("click", function shooShid() {
    // 1-6 доторх санамсаргүй нэг тоо гаргаж авна.
    var diceNumber = Math.floor(Math.random() * 6) + 1;
    //Шооны зургийг веб дээр гаргаж ирэх
    diceDom.style.display = "block";
    // Буусан санамсаргүй тоонд харгалзах шооны зургийг веб дээр гаргаж ирнэ.
    diceDom.src = "dice-" + diceNumber + ".png";

    // Буусан тоо нь 1-ээс ялгаатай бол идэвхтэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ.
    if (diceNumber !== 1) {
      //1-ээс ялгаатай тоо буулаа. Буусан тоог тоглогчид нэмж өгнө.
      roundScore = roundScore + diceNumber;
      document.getElementById("current-" + activePlayer).textContent =
        roundScore;
    } else {
      //1 буусан тул тоглогчийн ээлжийг солино.

      //Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно.
      switchToNextPlayer();
    }
  });
// HOLD товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function () {
  // Уг тоглогчийн цуглуулсан ээлжийн оноог глобал оноон дээр нэмж өгөх

  scores[activePlayer] = scores[activePlayer] + roundScore;

  //Дэлгэц дээр оноог нь өөрчилнө.
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];

  // Уг тоглогч хожсон эсэхийг (оноо 100-аас их байх) шалгах
  if (scores[activePlayer] >= 10) {
    // Ялагч гэсэн текстийг нэрнийх нь оронд гаргана.
    document.getElementById("name-" + activePlayer).textContent = "WINNER!";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
  } else {
    // Тоглогчийн ээлжийг солих
    //Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно.
    switchToNextPlayer();
  }
});

// Энэ функц нь тоглох ээлжийг дараачийн тоглогч руу шилжүүлдэг.
function switchToNextPlayer() {
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;
  //Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ.
  //Хэрэв идэвхтэй тоглогч 0 байвал идэвхтэй тоглогчийг 1 болго. Үгүй бол идэвхтэй тоглогчийг 0 болго.
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  //Улаан цэгийг шилжүүлэх код
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //Солигдох үед шоог түр алга болгох
  diceDom.style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", initGame);
