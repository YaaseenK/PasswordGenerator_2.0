// Assignment Code
var generateBtn = document.querySelector("#generate");
const characterCodes = Array.from(Array(26)).map( (_,i) => i + 97);

let passwordOptions = { 
  numbers: [0,1,2,3,4,5,6,7,8,9],
  symbols: ['!', '@', '#', '$', '^', '&', '*', '”' , '%', "'", '(', ')' , '+', '-' , '.', '/', ':', ';' , '<' , '=' , '>' , '?' , '~' ],
  lowerCaseLetters: characterCodes.map(code => String.fromCharCode(code)),
  upperCaseLetters: characterCodes.map(code => String.fromCharCode(code).toUpperCase())
}

/* 
    Fisher-Yates shuffle using cryptographically secure random numbers.
    Randomly rearranges elements of an array in place so every premutation is equally likely.
  */

function shuffle(userChoice){
  // start at the end of the array and swap each element with a random earlier element.
  for (let i = userChoice.length - 1; i > 0; i--){
    // Get a secure random integer j where 0 < j <  i 
    // (i + 1) ensures the upper bound is exclusive  since secureInt returns [0, maxExclusive]
    const j = secureInt(i + 1);

    // swap arr[i] with arr[j], using destructuring assigment.
    [userChoice[i], userChoice[j]] = [userChoice[j], userChoice[i]];
    // print which random index was chosen (for debuggiing / illustation)
    // console.log('Swapped index', i, 'with', j);
  }
  return userChoice;
}

/**
 * secureInt(maxExclusive)
 * Returns a uniformly distributed random integer between 0 (inclusive)
 * and maxExclusive (exclusive).
 * Uses Web Crypto API for secure randomness when available,
 * otherwise falls back to Math.random().
 */
function secureInt(maxExclusive) {
  // If the environment provides the Web Crypto API (modern browsers, Deno, etc.)
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    // Compute an upper limit multiple of maxExclusive to avoid modulo bias.
    // 0x100000000 = 2^32 = 4,294,967,296, the range of a 32-bit unsigned integer.
    const limit = Math.floor(0x100000000 / maxExclusive) * maxExclusive;

    // Create a 1-element typed array to hold a 32-bit unsigned random value.
    const buf = new Uint32Array(1);

    let x;
    do {
      // Fill buf[0] with a random 32-bit unsigned integer.
        crypto.getRandomValues(buf);
        x = buf[0];
      // Repeat if the number is outside the limit range (to remove bias).
    } while (x >= limit);

    // Map the random 32-bit number into the desired range [0, maxExclusive).
  return x % maxExclusive;
    }

  // Fallback if crypto is unavailable (e.g., some Node versions or old browsers)
  // Note: Math.random() is NOT cryptographically secure, but okay as a backup.
  return Math.floor(Math.random() * maxExclusive);
}

/* helper function to pick one element from an array*/
function pick(arr){
  return arr[secureInt(arr.length)];
}


function generatePassword() {
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
  
  // 2) Criteria 
  const containLowercase = confirm('Should the password contain lower case letters? (a-z)');
  const containCaptial =  confirm('Should the password contain captial letters? (A-Z)');
  const containNumbers = confirm('Should the password contain numbers? (0-9)'); 
  const containSpecialChracters= confirm('Should the password contain special characters? (e.g., !@#$...)?'); 

  // console.log(containLowercase);
  // console.log(containCaptial);
  // console.log(containNumbers);
  // console.log(containSpecialChracters);

  // 3) Build selected pools

  const pools = [];

  if (!containLowercase && !containCaptial && !containNumbers && !containSpecialChracters){
    alert('Password must contain at least one character type. Try again');
    location.reload();
    return '';
  }
  if (containLowercase) pools.push(passwordOptions.lowerCaseLetters);
  if (containCaptial) pools.push(passwordOptions.upperCaseLetters);
  if (containNumbers) pools.push(passwordOptions.numbers);
  if (containSpecialChracters) pools.push(passwordOptions.symbols);

// 4) Build the password: ensure at least one from each, then fill rest

  const result = [];
  
  // seed one from each chosen type 
  for (const p of pools) result.push(pick(p));

  // fill the rest from the combined pool
  const all = pools.flat()
  while (result.length < length){
    result.push(pick(all));
  }

  return shuffle(result).join('')
  
}


// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

