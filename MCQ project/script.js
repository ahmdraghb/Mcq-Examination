let fname = document.querySelector("[name='firstname']");
let feedback = document.getElementById("feedback");

let lname = document.querySelector("[name='lname']");
let feedback2 = document.getElementById("feedback2");

let mail = document.getElementById("email");
feedbackMail = document.getElementById("feedbackMail");
var pattern =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

console.log(mail);
var pass = document.getElementById("pass");
console.log(pass);
let feedbackpass = document.getElementById("feedbackpass");
let repass = document.getElementById("repass");
let feedbackpass1 = document.getElementById("feedbackpass1");

function validate() {
  if (fname.value == "" || !isNaN(fname.value)) {
    feedback.style.visibility = "visible";
    return false;
  } else {
    localStorage.setItem("name", fname.value);
  }

  if (lname.value == "" || !isNaN(lname.value)) {
    feedback2.style.visibility = "visible";
    return false;
  }

  if (pass.value.length < 8) {
    feedbackpass.style.visibility = "visible";
    return false;
  } else {
    localStorage.setItem("pass", pass.value);
  }

  if (repass.value != pass.value) {
    feedbackpass1.style.visibility = "visible";
    return false;
  }

  if (mail.value.match(pattern)) {
    // alert("hiii");
    localStorage.setItem("mail", mail.value);
    return true;
  } else {
    feedbackMail.style.visibility = "visible";
    return false;
  }
}

// let mail = document.getElementById("mail");
// feedbackMail = document.getElementById("feedbackMail");
// console.log(mail);
//   var pattern =
//     /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

//   if (mail.value.match(pattern)) {
//     // alert("hiii");
//     return true;
//   } else {
//     feedbackMail.style.visibility = "visible";
//     return false;
//   }

// function email(){

//     let mail = document.querySelector("[name='email']");
//     var feedbackMail = document.getElementById("feedbackMail");
//     let pattern =
//       /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

//     if (pattern.test(mail.value)) {
//       return true
//     }  else
//     feedbackMail.style.visibility = "visible";
//     return false

//     }
//     email()

// document.forms[0].onsubmit = function(e){
//     let pass = document.querySelector("[name='password']")
// console.log(pass)
// if (pass.length <=8){
//     console.log("fffff")
// }
// }
