// Assignment Code
var generateBtn = document.querySelector("#generate");
const characterCodes = Array.from(Array(26)).map( (_,i) => i + 97);
let passwordlength;
let userChoice = [];

let passwordOptions = { 
  numbers: [0,1,2,3,4,5,6,7,8,9],
  symbols: ['!', '@', '#', '$', '^', '&', '*', '”' , '%', "'", '(', ')' , '+', '-' , '.', '/', ':', ';' , '<' , '=' , '>' , '?' , '~' ],

  lowerCaseLetters: characterCodes.map(code => String.fromCharCode(code)),
  upperCaseLetters: characterCodes.map(code => String.fromCharCode(code).toUpperCase())
}
console.log(passwordOptions.lowerCaseLetters[1]);
console.log(passwordOptions.upperCaseLetters[1]);



// create an array of 26 elements and populate it with ASCII codes for the lowercase chracters
// let characterCodes = Array.from(Array(26)).map( (_,i) => i + 97);
// convert the ASCII codes to actual letters
let lowerCaseLetters = characterCodes.map(code => String.fromCharCode(code));
// convert lowercase letters to uppercase letters
let upperCaseLetters = lowerCaseLetters.map(letter => letter.toUpperCase());

// Get password len:
function passwordLen(){
  let length = null;
  while(true){
    const input = prompt('Enter password length (8-128):')
    if (input === null) {
      alert("Canceled. No password generated.");
      location.reload();
      return '';
    }
    const n = Number(input.trim());
    if (Number.isInteger(n) && n >= 8 && n <= 128) {
      length = n;
      break;
    }
    alert('Please enter a whole number between 8 and 128.');
  }
}

function passwordContains(){
  const containLowercase = confirm('Should the password contain lower case letters? (a-z)');
  const containCaptial =  confirm('Should the password contain captial letters? (A-Z)');
  const containNumbers = confirm('Should the password contain numbers? (0-9)'); 
  const containSpecialChracters= confirm('Should the password contain special characters? (e.g., !@#$...)?'); 

  console.log(containLowercase);
  console.log(containCaptial);
  console.log(containNumbers);
  console.log(containSpecialChracters);

  if (!containLowercase && !containCaptial && !containNumbers && !containSpecialChracters){
    alert('Password must contain at least one character type.');
  }
  if (containLowercase) userChoice.push(passwordOptions.lowerCaseLetters);
  if (containCaptial) userChoice.push(passwordOptions.upperCaseLetters);
  if (containNumbers) userChoice.push(passwordOptions.numbers);
  if (containSpecialChracters) userChoice.push(passwordOptions.symbols);

  console.log(userChoice)
}

function generatePassword() {
  passwordLen();




}


// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

