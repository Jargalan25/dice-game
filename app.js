// Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0, 2-р тоглогчийг 1 гэж тэмдэглэе.
var activePlayer = 0;

// Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
var scores = [0, 0];

// Тоглогчийн ээлжиндээ цуглуулсан оноо
var roundScore = 0;

// Шооны аль талаараа буусныг хадгалах хувьсагч, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө.
var diceNumber = Math.floor(Math.random() * 6) + 1;

// <div class="player-score" id="score-0">43</div>
// document.querySelector("#score-0").textContent = dice;

// document.querySelector("#score-1").innerHTML = "<em>Yes!</em>";
// Программ эхлэхэд бэлтгэе
document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";
var diceDom = document.querySelector(".dice");
diceDom.style.display = "none";

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
  });
