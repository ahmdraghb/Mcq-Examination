let currentIndex = 0;
let rangeDiv = document.getElementById("range");
let sliderDiv = document.getElementById("slider");
let bg = document.querySelector(".bg");
let leftSide = document.querySelector(".leftSide");
let rightSide = document.querySelector(".rightSide");
let questionDiv = document.querySelector(".question");
let radioDiv = document.querySelector(".radio");
let submit = document.querySelector(".submit");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let mark = document.querySelector(".mark");
let markedDiv = document.querySelector(".markedDiv");
let theResult = document.querySelector(".theResult");
let page = document.getElementById("page");
page.innerHTML = `${currentIndex + 1}`;
let score = 0;

function getQues() {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionObj = JSON.parse(this.responseText);
      let quesCount = questionObj.length;

      addQuestion(questionObj[currentIndex], quesCount);

      submit.onclick = () => {
        let rightAnswerr = questionObj[currentIndex].rightAnswer;
        calc(questionObj);
      };
      let percent = 0;
      let timer = setInterval(() => {
        if (percent == 90) {
          clearInterval(timer);
          calc(questionObj);
          // alert('zzz') // result
        }
        sliderDiv.style.width = `${percent}%`;
        percent += 0.5;
      }, 1000);

      function calc(questionObj) {
        sessionStorage.removeItem("IsThisFirstTime_Log_From_LiveServer");
        for (var i = 0; i < sessionStorage.length; i++) {
          if (sessionStorage.getItem(i) == questionObj[i].rightAnswer) {
            score += 25;
            console.log(score);
          }
        }
        result();
      }

      next.onclick = function () {
        if (currentIndex < quesCount - 1) {
          currentIndex++;
          questionDiv.innerHTML = "";
          radioDiv.innerHTML = "";
          page.innerHTML = `${currentIndex + 1}`;
          addQuestion(questionObj[currentIndex], quesCount);
          var y = sessionStorage.getItem(currentIndex);
          var x = document.querySelectorAll("#Answer");
          var arr = Array.from(x);
          for (var i = 0; i < arr.length; i++) {
            if (y == arr[i].value) {
              arr[i].checked = true;
            }
          }
        }
      };

      prev.onclick = function () {
        if (currentIndex > 0) {
          currentIndex--;
          questionDiv.innerHTML = "";
          radioDiv.innerHTML = "";
          console.log(radioDiv);
          addQuestion(questionObj[currentIndex], quesCount);
          page.innerHTML = `${currentIndex + 1}`;
          var y = sessionStorage.getItem(currentIndex);
          var x = document.querySelectorAll("#Answer");
          // console.log(y);
          var arr = Array.from(x);
          for (var i = 0; i < arr.length; i++) {
            if (y == arr[i].value) {
              arr[i].checked = true;
            }
          }
        }
      };
      mark.onclick = function () {
        var marked = document.createElement("button");
        marked.className = "marked";
        markedDiv.appendChild(marked);
        marked.innerHTML = `question ${currentIndex + 1}`;
        marked.onclick = function () {
          console.log(marked.innerText);
          var position = marked.innerText[9];
          questionDiv.innerHTML = "";
          radioDiv.innerHTML = "";
          addQuestion(questionObj[position - 1]);
          marked.removeChild(currentIndex, questionObj[position]);
        };
      };
    }
  };

  function addQuestion(obj, count) {
    let question = document.createElement("p");
    let questionText = document.createTextNode(obj.question);
    question.appendChild(questionText);
    questionDiv.appendChild(question);

    for (let i = 1; i <= 4; i++) {
      // div
      let mainDiv = document.createElement("div");
      mainDiv.className = "box";
      //input
      let radioInput = document.createElement("input");
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `Answer${i}`;
      // radioInput.checked = `Answer2`;
      // console.log(radioInput.checked);
      radioInput.value = obj[`Answer${i}`];
      radioInput.addEventListener("click", (x) => {
        sessionStorage.setItem(`${currentIndex}`, `${radioInput.value}`);
        var y = sessionStorage.getItem(currentIndex);

        // if (y == radioInput.value) {
        //   console.log(radioInput.value);
        //   // radioInput.checked = true;
        //   var o = getInputsByValue(y);
        //   // var q = o.slice(4);
        //   // console.log(q);
        // }
        // var f = sessionStorage.getItem(`checked question ${currentIndex}`);
        // o[0].checked = f;
        // console.log(o[0].checked);

        // var mas = document.querySelector("input[value=14 times]");
        // console.log(mas);
        // function getInputsByValue(value) {
        //   var allInputs = document.getElementsByTagName("input");
        //   var results = [];
        //   for (var x = 0; x < allInputs.length; x++)
        //     if (allInputs[x].value == value) results.push(allInputs[x]);
        //   return results;
        // }

        // sessionStorage.setItem(
        //   `checked question ${currentIndex}`,
        //   `${radioInput.checked}`
        // );
        // console.log(radioInput.value);
      });
      //label

      let label = document.createElement("label");
      label.htmlFor = `Answer${i}`;
      // label.id = `Answer`;
      let labelText = document.createTextNode(obj[`Answer${i}`]);
      label.appendChild(labelText);
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(label);
      radioDiv.appendChild(mainDiv);
    }
  }
  request.open("get", "./question.json", true);
  request.send();
}
getQues();

function result() {
  let theResults;
  radioDiv.remove();
  questionDiv.remove();
  next.remove();
  prev.remove();
  mark.remove();
  submit.remove();
  rightSide.remove();
  leftSide.remove();
  rightSide.remove();
  rangeDiv.remove();
  bg.remove();
  var fname = localStorage.getItem("name");
  theResults = document.createElement("div");
  theResults.className = "result";
  theResults.innerHTML = `<span class="res"> Hello ${fname} , your Score is ${score}%</span>`;
  theResult.append(theResults);
}
