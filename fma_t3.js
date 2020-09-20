//GLOBAL VARIABLE
var focusPosition = 0; //global variable used to work out different cases where the focus needs to be sent in event of an error.  The values are changed by the displayUserNameError, displayPasswordError and displayRetypedPasswordError functions.



//USERNAME CHECKING
//CHECKING ORDER - Check there is a username, check the characters are allowed, check there is only one @, check the @ is not the first or last symbol, check there is a dot, check the dot is after at symbol, check the dot is not the first symbnol, check the dot is not the last symbol, check that the dot is not second to last, check that there is a character between the dot and the @, check there is a dot in the last five characters, check there are no special characters after the @, check there is not two consecutive dots.
function getUserName(){//function to get the username and send an error message if there is no username.
  let userNameValue = document.getElementById("username").value; //places the value of the input id="username" into variable userNameValue.
  let userNameValueLength = userNameValue.length;
  if (userNameValue === "" ) {// SOURCE https://stackoverflow.com/questions/154059/how-can-i-check-for-an-empty-undefined-null-string-in-javascript - Checks that a username value has been entered.
    let usernameErrorMessage = "The username field is blank";
    displayUserNameError(usernameErrorMessage);  //invokes the function to display the error message letting the user know that there is no username
  }
  else {
    checkCharacters(userNameValue, userNameValueLength); //invokes the function to check that the characters in the username are allowed
  }
}

function checkCharacters (userNameValue, userNameValueLength){//checks that only permissible characters are used
let usernameAllowedCharacters = ("^[a-zA-Z1-9.@!#$%&'*/=?^_+-`{|}~]+$"); //SOURCES https://stackoverflow.com/questions/6017778/c-sharp-regex-checking-for-a-z-and-a-z https://help.salesforce.com/articleView?id=pardot_emails_allowed_characters.htm&type=5 Creates a regular expression for the allowed characters in an email.
let usernameErrorMessage = ""; //Creates a blank variable to contain the error message text.
  if(userNameValue.match(usernameAllowedCharacters)) { //matches the userNameValue against the regular expression for allowed characters in an email.  If the userNameValue only contains the allowed characters...
    checkOnlyOneAt(userNameValue, userNameValueLength); //invokes the function to check that there is only one @ symbol.
  }
  else
  {
    usernameErrorMessage = "The username contains a character that is not permitted."
    displayUserNameError(usernameErrorMessage);  //invoke displayUserNameError with error message above.
  }
}


function checkOnlyOneAt(userNameValue, userNameValueLength){  //function to check that there is only one @ symbol.
  let numberOfAtSymbols = 0; //The numberOfAtSymbols variable will be used as a counter to work out how many at symbols are in the username.
  let usernameErrorMessage = ""; //Creates a blank variable to contain the error message text.
  for (let i = 0; i < userNameValueLength; i++){ //this is a loop that will activate the same number of times that there is are letters in the userNameValue
    let charBeingChecked = userNameValue[i]; //takes the character in the userNameValue currently being checked and places it in a variable called charBeingChecked
    if (charBeingChecked === "@") {
      numberOfAtSymbols = numberOfAtSymbols + 1; //numberOfAtSymbols is a variable used to count the total number of at symbols
    }
	}
  if (numberOfAtSymbols === 0){  //if there are no at symbols
    usernameErrorMessage = "There are no @ symbols in the username."
    displayUserNameError(usernameErrorMessage);  //invoke displayUserNameError with error message above.
  }
  if (numberOfAtSymbols > 1){  //if there are more than one at symbols
    usernameErrorMessage = "There are more than one @ symbols in the username."
    displayUserNameError(usernameErrorMessage);  //invoke displayUserNameError with error message above.
  }
  if (numberOfAtSymbols === 1){  //if there is only one @ symbol (user input is correct), then invoke the function to check the position of the at symbol.
    checkAtPosition(userNameValue, userNameValueLength);
  }
}

function checkAtPosition (userNameValue, userNameValueLength){//function to check the @ position and creates an error message if the @ is the first or last character.
  let finalPos = userNameValueLength -1; //the final position in the string index for the userNameValue is one less than the length of the userNameValueLength.
  let usernameErrorMessage = ""; //Creates a blank variable to contain the error message text.
  if (userNameValue[0] === "@"){//if the character at the first position is an @...
    usernameErrorMessage = "The first character should not be an @ symbol."
    displayUserNameError(usernameErrorMessage); //invoke displayUserNameError with error message above.
  }
  else if (userNameValue[finalPos] === "@"){//if the character at the last position is an @...
    usernameErrorMessage = "The final character should not be an @ symbol."
    displayUserNameError(usernameErrorMessage); //invoke displayUserNameError with error message above.
  }
  else {
    checkDot(userNameValue, userNameValueLength); //invoke the checkDot function passing the userNameValue and userNameValueLength.
  }
}

function checkDot (userNameValue, userNameValueLength) {//Checks that there is a dot in the username.
  let usernameErrorMessage = ""; //Creates a blank variable to contain the error message text.
  let numberOfDots = 0; //a variable used as a counter to count the numbers of . symbols (dots).
  for (let i = 0; i < userNameValueLength; i++){ //this is a loop that will activate the same number of times that there is are letters in the userNameValue
    let charBeingChecked = userNameValue[i]; //takes the character in the userNameValue currently being checked and places it in a variable called charBeingChecked
    if (charBeingChecked === ".") {
      numberOfDots = numberOfDots + 1; //if there is dot, then the value of the numberOfDots variable increments by one.
    }
	}
  if (numberOfDots === 0){ //if there are no dots.
    usernameErrorMessage = "There are no dots."
    displayUserNameError (usernameErrorMessage); //invoke displayUserNameError with error message above.
  } else { //if there is a dot
    checkDotAfterAt(userNameValue, userNameValueLength); //invoke the checkDotAfterAt, to ensure there is a dot after the @, function passing the userNameValue and userNameValueLength.
  }
}

function checkDotAfterAt (userNameValue, userNameValueLength){//checks that there is a dot after the @ symbol.
  let usernameErrorMessage = ""; //Creates a blank variable to contain the error message text.
  let numberOfDotsAfterAt = 0; //variable, set to value 0 initially, that will act as a counter for how many characters that are not dots after the @ symbol.
  let atPosition = userNameValue.indexOf("@");  //https://www.w3schools.com/jsref/jsref_indexof.asp  gives the position of the @ symbol.  If there were no @ symbol this function would not have been called.
  for (let i = atPosition; i < userNameValueLength; i++){ //this is a loop that will activate the same number of times that there is are letters in the userNameValue
    let charBeingChecked = userNameValue[i]; //takes the character in the userNameValue currently being checked and places it in a variable called charBeingChecked
    if (charBeingChecked === ".") {//if the character being checked is a dot...
      numberOfDotsAfterAt = numberOfDotsAfterAt + 1; //then the value of the numberOfDots variable increments by one.
    }
	}
  if (numberOfDotsAfterAt === 0){ //if there are no dots after the @
    usernameErrorMessage = "There is no dot after the @ symbol."
    displayUserNameError(usernameErrorMessage); //invoke displayUserNameError with error message above.
  } else { //if there is a dot after the @
    checkDotNotFirst(userNameValue, userNameValueLength); //invoke the checkDotNotLast function, to ensure that the last character is not a dot, passing the userNameValue and userNameValueLength.
  }
}

function checkDotNotFirst (userNameValue, userNameValueLength){//checks that the dot is not the first character in the username.
  let usernameErrorMessage = ""; //Creates a blank variable to contain the error message text.
  if (userNameValue[0] === "."){//if the last character is a dot.
    usernameErrorMessage = "The first character should not be a dot."
    displayUserNameError(usernameErrorMessage);  //invoke displayUserNameError with error message above.
  }
  else {
    checkDotNotLast (userNameValue, userNameValueLength);
  }
}

function checkDotNotLast (userNameValue, userNameValueLength){//checks that the dot is not the last character in the username.
  let usernameErrorMessage = ""; //Creates a blank variable to contain the error message text.
  let finalPos = userNameValueLength -1; //the final position in the string index for the userNameValue is one less than the length of the userNameValueLength.
  if (userNameValue[finalPos] === "."){//if the dot is the final position...
    usernameErrorMessage = "The final character should not be a dot."
    displayUserNameError(usernameErrorMessage); //invoke displayUserNameError with error message above.
  }
  else {
    checkDotNotSecondToLast(userNameValue, userNameValueLength); //invoke the checkSpaceBetweenAtandDot to ensure that there is another character other than a dot between the @ and . symbol, passing the userNameValue and userNameValueLength.
  }
}

function checkDotNotSecondToLast (userNameValue, userNameValueLength){//checks that there is not a dot in the second to last character.  Top level domains must have at least two characters after the dot.
  let usernameErrorMessage = ""; //Creates a blank variable to contain the error message text.
  let penultimatePos = userNameValueLength -2; //the penultimate position in the string index for the userNameValue is two less than the length of the userNameValueLength.
  if (userNameValue[penultimatePos] === "."){//if the character in the penultimate position is a dot...
    usernameErrorMessage = "The second to last character in the username should not be a dot."
    displayUserNameError(usernameErrorMessage); //invoke displayUserNameError with error message above.
  }
  else {
    checkSpaceBetweenAtandDot(userNameValue, userNameValueLength); //if the character in the penultimate position is not a dot, invoke the checkSpaceBetweenAtandDot to ensure that there is another character other than a dot between the @ and . symbol, passing the userNameValue and userNameValueLength.
  }
}

function checkSpaceBetweenAtandDot(userNameValue, userNameValueLength){//function to check that that there is a character that is not a dot between the at and the dot.  The mail server must have at least one letter.
  let usernameErrorMessage = ""; //Creates a blank variable to contain the error message text.
  let atPosition = userNameValue.indexOf("@"); //determins the where in the string the @ symbol.
  atPosition = atPosition + 1; //gives the position of the next character in the sting.
  if (userNameValue.charAt(atPosition) === "."){ //SOURCE https://www.w3schools.com/jsref/jsref_charat.asp if the next character in the in string is a dot.
    usernameErrorMessage = "There should be another character between the @ symbol and the dot."
    displayUserNameError(usernameErrorMessage); //invoke displayUserNameError with error message above.
  }
  else {
    checkDotInLastFiveCharacters (userNameValue, userNameValueLength);//if there is a space between the last five characters and the dot then
  }
}

function checkDotInLastFiveCharacters (userNameValue, userNameValueLength){//function to check that there is a dot in the last five characters.  The top level domain must consist of four alphanumeric symbols.
  let fifthFromLast = userNameValueLength - 5; //the fifth character from last equals the username -5.
  let usernameErrorMessage = ""; //Creates a blank variable to contain the error message text
  let dotPresence = false; //boolean, initially set to false, used to record if there is a dot in the last five characters.
  for (let i = fifthFromLast; i < userNameValueLength; i++){ //this is a loop that will check the characters between the fifth from last position and the final position.
    let charBeingChecked = userNameValue[i]; //takes the character in the userNameValue currently being checked and places it in a variable called charBeingChecked
    if (charBeingChecked === ".") { //if the character being checked is a dot.
      dotPresence = true; //the dotPresence is true (indicating that a dot is present).
    }
  }
  if (dotPresence === true){//if there is a dot.
      checkNoSpecialCharactersAfterAt(userNameValue, userNameValueLength);//invokes the function to check that there are not two consecutive dots.
  }
  else {
      usernameErrorMessage = "There must be a dot in the last five characters of the username";
      displayUserNameError(usernameErrorMessage); //invoke displayUserNameError with error message above.
  }
}

function checkNoSpecialCharactersAfterAt (userNameValue, userNameValueLength) { //function to check that there are no special characters apart from . and - after the @
  let usernameErrorMessage = ""; //Creates a blank variable to contain the error message text
  let afterAtPosition = userNameValue.indexOf("@") + 1; //determins the where in the string the first character after the @ symbol.
  let charactersAfterAt = userNameValue.slice(afterAtPosition, userNameValueLength); //SOURCE https://www.w3schools.com/jsref/jsref_slice_string.asp
  let domainAllowedCharacters = ("^[a-zA-Z1-9.-]+$"); //SOURCES https://stackoverflow.com/questions/6017778/c-sharp-regex-checking-for-a-z-and-a-z https://www.saveonhosting.com/scripts/index.php?rp=/knowledgebase/52/What-are-the-valid-characters-for-a-domain-name-and-how-long-can-a-domain-name-be.html a regular expression of the allowed characters in a domain name.
  if(charactersAfterAt.match(domainAllowedCharacters)) { //matches the characters after at symbol against the allowed characters in the regular expression. If the characters after the at function are allowed characters...
    checkNotTwoConsecutiveDots(userNameValue, userNameValueLength); //invokes the function to check that there are not two consecutive dots.
  }
  else //if in the characters after the @ symbol there is a character that is not allowed...
  {
    usernameErrorMessage = "The username contains a special character after the @ symbol that is not permitted.";
    displayUserNameError(usernameErrorMessage); //invoke displayUserNameError with error message above.
  }
}

function checkNotTwoConsecutiveDots(userNameValue, userNameValueLength) { //checks that there are not two consecutive dots.
  let usernameErrorMessage = ""; //Creates a blank variable to contain the error message text.
  for (let i = 0; i < userNameValueLength; i++){ //this is a loop that will activate the same number of times that there is are letters in the userNameValue
    let charBeingChecked = userNameValue[i]; //takes the character in the userNameValue currently being checked and places it in a variable called charBeingChecked
    if (charBeingChecked === ".") { //if the character being checked is a dot
      let nextCharacterPosition = i + 1; //calculates the index position of the next character in the userNameValue string.
      let nextCharacter = userNameValue[nextCharacterPosition];//creates a string with the value of the next character after the dot.
      if (nextCharacter === ".") {//if the next character after the dot is also a dot.
          usernameErrorMessage = "There are two consecutive dots."
          displayUserNameError(usernameErrorMessage); //invoke displayUserNameError with error message above.
      } else {
        usernameSuccess(); //invokes the userNameSuccess function.
      }
    }
	}
}
//END OF USERNAME CHECKING



//PASSWORD CHECKING
//LOGIC ORDER, check that there is a password, check that it is at least 8 characters long, check that the password has the right characters, check that the retyped password matches the original.
function getPassword(){ //function to get the password value, and check that the user has typed something into the password box.
  let passwordValue = document.getElementById("password").value;  //places the value of the input id="password" into variable userNameValue.
  if (passwordValue === "" ) {// SOURCE https://stackoverflow.com/questions/154059/how-can-i-check-for-an-empty-undefined-null-string-in-javascript - checks that the user has entered a password.
    let passwordErrorMessage = "No password has been entered.";
    displayPasswordError(passwordErrorMessage);  //invokes the function to display the error message with the error message above.
  }
  else {
    checkPasswordLength(passwordValue); //invokes the function to check the password length.
  }
}

function checkPasswordLength (passwordValue){ //function to check the password length, receiving the password from the calling function.
  let passwordLength = passwordValue.length; //checks the password (passwordValue), to ensure that it is 8 characters in length.
  if (passwordLength < 8){ //if the password is less than 8 characters in in length.
    let passwordErrorMessage = "The password must be at least 8 characters.";  //creates a variable called passwordErrorMessage
    displayPasswordError(passwordErrorMessage);  //invokes the function to display the error message with the error message above.
  } else { //if the password is 8 characters or more in length.
  checkPasswordCharacters(passwordValue); //invoke the function to check that the characters in the password are acceptable, passing the passwordValue into the receiving funtion
  }
}

function checkPasswordCharacters (passwordValue){ //function to check that there are upper and lower case characters and numbers.
  let passwordRequiredCharacters=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;  //SOURCE https://www.w3resource.com/javascript/form/password-validation.php - regular expression denoting the required characters, one numeric digit, one upper case and one lower case.
  if(passwordValue.match(passwordRequiredCharacters)) { //matches the passwordValue against the regular expression.  If the password has the required character combination...
    checkRetypedPassword(passwordValue);//invokes the function to check that the password and retyped password are the same value, passing the passwordValue to the checkRetypedPassword
  }
  else
  {
    let passwordErrorMessage = "Password must contain a mixture of letters and numbers, and at least one upper case character."; //Creates a blank variable to contain the error message text.
    displayPasswordError (passwordErrorMessage); //invokes the function to display the error message with the error message above.
  }
}

function checkRetypedPassword(passwordValue) {//function to check that the retyped password value macthes the password value (checking that the two passwords are the same).
  retypedPasswordValue = document.getElementById("retypedpassword").value;
  if (passwordValue === retypedPasswordValue){ //if the two password values match...
    passwordSuccess(); //invoke the passwordSuccess function.
    document.getElementById("retypedpassword").setAttribute("aria-invalid", "false");//sets the aria-invalid to false for the retypedpassword, indicating that the username is valid to screen reader users
    document.getElementById("retypedpassword").removeAttribute("aria-describedby");//removes the adia describedby from the retypedpassword label - so that old error messages are not read aloud to screen reader users
  } else {
    displayRetypedPasswordError();
  }
}
//END OF PASSWORD CHECKING.



//TOGGLE PASSWORD VISIBILITY
function togglePasswordVisibility(){ //function that toggles the password visibility
  let passwordInputType = document.getElementById("password");  //SOURCE https://www.w3schools.com/howto/howto_js_toggle_password.asp - gets the password input and creates a 'hook' so that the type can be manipulated.
  if (passwordInputType.type === "password") { //if the password is input type password.
      passwordInputType.type = "text";//make the password into a text field (which makes the characters visible.)
  } else {  //if the password input type is not a password (characters are currently visible).
      passwordInputType.type = "password"; //make the password input into a password again (characters become invisible).
  }
  let retypedPasswordInputType = document.getElementById("retypedpassword");  //SOURCE https://www.w3schools.com/howto/howto_js_toggle_password.asp - gets the password input and creates a 'hook' so that the type can be manipulated.
  if (retypedPasswordInputType.type === "password") { //if the retype your password input is input type password.
       retypedPasswordInputType.type = "text";//make the retype your password into a text field (which makes the characters visible.)
  } else {  //if the retype your password input type is not a password (characters are currently visible).
        retypedPasswordInputType.type = "password"; //make the retype your password input into a password again (characters become invisible).
  }
}
//END OF TOGGLING PASSWORD VISIBILITY.


//START OF DISPLAING ERROR MESSAGES
function hideErrors (){ //hides all of the error messages.  Invoked on load and when register button is used.  This gets rid of old error messages which may not be valid if user has changed input values.
  document.getElementById("usernameerror").style.display = "none";  //SOURCE https://www.w3schools.com/css/tryit.asp?filename=trycss_display  Removes error messages from username from the display.
  document.getElementById("passworderror").style.display = "none"; //Removes error messages from password from the display.
  document.getElementById("passwordmatcherror").style.display = "none"; //Removes error messages from retypepassword from the display.
  document.getElementById("success").innerHTML = ""; //display = none didn't work here so removed the content
  document.getElementById("success").style.backgroundColor = "transparent"; //display = none didn't work here so removed the backgroundColor
}

function displayRetypedPasswordError(){//function that displays the retyped password error messsage.
  let completeErrorMessage = "Passwords do not match. Please retype your password.";
  let errorPositionId = "passwordmatcherror"; //creates a variable called errorPositionId which contains the id for the place where the error message is needed.
  let errorFieldId = "retypedpassword"; //creates a variable called error field and assigns the name of the field with the error so the aria invalid can be set.
  focusPosition = focusPosition + 4; //adds four to the focusPosition global variable
  showMessage(completeErrorMessage, errorPositionId, errorFieldId); //invokes the show error message function with the complete error message and the errorPositionId and errorFieldId.
}



function displayPasswordError (passwordErrorMessage){//function that displays the password error message.
  let completeErrorMessage = passwordErrorMessage + " Please enter a valid password."; //adds a generic message  " Please enter a valid password.", to the specific message designated by an earlier function.
  let errorPositionId = "passworderror"; //creates a variable called errorPositionId which contains the id for the place where the error message is needed.
  let errorFieldId = "password"; //creates a variable called error field and assigns the name of the field with the error so the aria invalid can be set.
  focusPosition = focusPosition + 3; //adds three to the focusPosition global variable
  showMessage(completeErrorMessage, errorPositionId, errorFieldId); //invokes the show error message function with the complete error message and the errorPositionId and errorFieldId.
}

function displayUserNameError (usernameErrorMessage){//function that displays the username error message.
  let completeErrorMessage = usernameErrorMessage + " Please enter a valid email address."; //adds a generic message  " Please enter a valid email address.", to the specific message designated by an earlier function.
  let errorPositionId = "usernameerror"; //creates a variable called errorPositionId which contains the id for the place where the error message is needed.
  let errorFieldId = "username"; //creates a variable called error field and assigns the name of the field with the error so the aria invalid can be set.
  focusPosition = + 2; //adds two to the focusPosition global variable
  showMessage(completeErrorMessage, errorPositionId, errorFieldId); //invokes the show error message function with the complete error message and the errorPositionId and errorPositionId.
}

function showMessage(completeErrorMessage, errorPositionId, errorFieldId){ //displays the error message on the page.
  document.getElementById(errorPositionId).style.display = "block"; //makes the error messages visible once more.
  document.getElementById(errorPositionId).innerHTML = completeErrorMessage; //places the error message into the specified error input container (span ID).
  document.getElementById(errorFieldId).setAttribute("aria-invalid", "true"); //sets the value to aria invalid in the fields with an error
  document.getElementById(errorFieldId).setAttribute("aria-describedby", errorPositionId); //sets the describedby attribute for the error message.  Using JavaScript to do this means that the describedby can also been turned off, otherwise there is a tendency for old described by messages to be read aloud when no longer valid.
}


//END OF DISPLAYING ERROR MESSAGES

//MOVE FOCUS
function moveFocus(){
  //Cases, 2 = username, 3 = password, 4 = retyped password, 5 = username and password (reached by adding 2 + 3), 7 = password and retyped password (reached by adding 3+4), 9 = all three (reached by adding 2+3+4).
  if (focusPosition === 2){
  document.getElementById("username").focus();//places the focus onto the part of the form where the error message is being displayed.
  }
  if (focusPosition === 3){
  document.getElementById("password").focus();//places the focus onto the part of the form where the error message is being displayed.
  }
  if (focusPosition === 4){
  document.getElementById("retypedpassword").focus();//places the focus onto the part of the form where the error message is being displayed.
  }
  if (focusPosition === 5){
  document.getElementById("username").focus();//places the focus onto the part of the form where the error message is being displayed.
  }
  if (focusPosition === 7){
  document.getElementById("password").focus();//places the focus onto the part of the form where the error message is being displayed.
  }
  if (focusPosition === 9){
  document.getElementById("username").focus();//places the focus onto the part of the form where the error message is being displayed.
  }
}

//SUCCESS FUNCTIONS
function clearSuccess (){ //Clears the success variables, so that each input requires success verification before submission
 var userNameSuccess = false; //creates a global variable for userNameSuccess.  Default value is false.  Only once checked does it become true.
 var passwordSuccess = false; //creates a global variable for passwordSuccess.  Default value is false.  Only once checked does it become true.
}

function usernameSuccess(){ //This function is called after all of the username checking routines are successfully completed.
  userNameSuccess = true; //sets the userNameSuccess to true.
  document.getElementById("username").setAttribute("aria-invalid", "false");//sets the aria-invalid to false for the username, indicating that the username is valid to screen reader users
  document.getElementById("username").removeAttribute("aria-describedby");//removes the adia describedby from the username label - so that old error messages are not read aloud to screen reader users
  allSuccess(); //invokes the function to check if both username and password are correct.
}

function passwordSuccess(){ //This function is called after all of the username checking routines are successfully completed.
  passwordSuccess = true; //sets the passwordSuccess to true.
  document.getElementById("password").setAttribute("aria-invalid", "false");//sets the aria-invalid to false for the password, indicating that the username is valid to screen reader users
  document.getElementById("password").removeAttribute("aria-describedby");//removes the adia describedby from the username label - so that old error messages are not read aloud to screen reader users
  allSuccess(); //invokes the function to check if both username and password are correct.
}

function allSuccess(successInput) { //invoked by either the usernameSuccess or the passwordSuccess
  if (userNameSuccess === true){ //if the usernameSucess is true...
    if (passwordSuccess === true){//and the passwordSuccess is true...
      //location.replace("fma_t3confirm.html"); //SOURCE https://www.w3schools.com/howto/howto_js_redirect_webpage.asp go to submit page...
      document.getElementById("success").style.backgroundColor = "green"; //makes the error messages visible once more.
      document.getElementById("success").innerHTML = "All information correctly entered.  Thank you for registering.";
    }
  }
}
//END OF SUCCESS FUNCTIONS.


//MEGA MENU DROP DOWN Toggle
function toggleMenu() {

	let menuHeader = document.getElementById("menuTop");
	let menuState =  menuHeader.getAttribute("aria-expanded");
	if (menuState === "false"){
		openMenu();
	}
	if (menuState === "true") {
		closeMenu();
	}
}

function openMenu(){
	let reveal = document.getElementById("subMenu");
	reveal.classList.remove("hidden");
	document.getElementById("menuTop").setAttribute("aria-expanded", "true");

}

function closeMenu(){
	let hide = document.getElementById("subMenu");
	hide.classList.add("hidden");
	document.getElementById("menuTop").setAttribute("aria-expanded", "false");
}
//END OF MEGA MENU DROP DOWN TOGGLE


//TOOLTIP start
function revealTooltip() {
 let reveal = document.getElementById("tooltipContent");
 reveal.classList.remove("hidden");
}

function hideTooltip() {
	let hide = document.getElementById("tooltipContent");
  hide.classList.add("hidden");
}

//TOOLTIP END

//CAROUSEL START
function showPizzaSlide() {


  document.getElementById("carouselImage").src = "images/Pizza_Resized.jpg";
  let pizzaText = "Pizza"
  document.getElementById("carouselText").innerHTML = pizzaText;
  document.getElementById("slideContainer").setAttribute("aria-label", "2 of 3");
  }

function showFrittataSlide() {

  document.getElementById("carouselImage").src = "images/Frittata_Resized.jpg";
  let frittataText = "Frittata"
  document.getElementById("carouselText").innerHTML = frittataText;
  document.getElementById("slideContainer").setAttribute("aria-label", "1 of 3");
}

function showQuicheSlide (){

  document.getElementById("carouselImage").src = "images/Quiche_Resized.jpg";
  let quicheText = "Quiche"
  document.getElementById("carouselText").innerHTML = quicheText;
  document.getElementById("slideContainer").setAttribute("aria-label", "3 of 3");
}

var slideCounter = 1;

function nextClicked() {
  if(slideCounter === 3) {
    slideCounter = 0;
  }
  slideCounter = slideCounter + 1;
  selectSlide();
  playState = "playing";
}

function previousClicked() {
  if(slideCounter === 1) {
    slideCounter = 4;
  }
  slideCounter = slideCounter - 1;
  selectSlide();
  playState = "playing";
}

function nextSlide() {
  if(slideCounter === 3) {
    slideCounter = 0;
  }
  slideCounter = slideCounter + 1;
  selectSlide();
}

playState = "paused";
var playCount = 0;
function playPauseClicked() {
if (playState === "paused") {
  playCount = 1;
  nextSlide()
  playCarousel()
} else {
  }
}

function playCarousel () {
  setTimeout(function(){ playPauseClicked(); }, 3000);
}


function selectSlide() {
  if (slideCounter === 1) {
    showFrittataSlide();
  }
  if (slideCounter === 2) {
    showPizzaSlide();

  }
  if (slideCounter  === 3) {
    showQuicheSlide();
  }
}

function pauseClicked (){
  playState = "playing";
  playCount = 0;
}


//CAROUSEL END

//TAB PANEL START
function showPizza() {
  document.getElementById("Pizza").style.borderBottom = "none";
  document.getElementById("Frittata").style.borderBottom = "solid";
  document.getElementById("Quiche").style.borderBottom = "solid";
  document.getElementById("Pizza").style.borderLeft = "solid";
  document.getElementById("TabImage").src = "images/Pizza_Resized.jpg";
  let pizzaText = "Pizza is an Italian dish with a round base of dough topped with cheese and tomato and a range of other ingredients such as ham, anchovies, and onion."
  document.getElementById("TabText").innerHTML = pizzaText;
  document.getElementById("Pizza").setAttribute('tabindex', '0');
  document.getElementById("Frittata").setAttribute('tabindex', '-1');
  document.getElementById("Quiche").setAttribute('tabindex', '-1');
  document.getElementById("Pizza").focus();
  document.getElementById("TabImage").setAttribute('alt', 'Pizza');
  document.getElementById("Pizza").setAttribute('aria-selected', 'true');
  document.getElementById("Frittata").setAttribute('aria-selected', 'false');
  document.getElementById("Quiche").setAttribute('aria-selected', 'false');
}

function showFrittata() {
  document.getElementById("Frittata").style.borderBottom = "none";
  document.getElementById("Pizza").style.borderBottom = "solid";
  document.getElementById("Quiche").style.borderBottom = "solid";
  document.getElementById("Quiche").style.borderLeft = "none";
  document.getElementById("TabImage").src = "images/Frittata_Resized.jpg"
  let fritattaText = "Frittata is an Italian dish similar to an omlette or quiche.  It is egg based and contains potatoes and does not have a crust."
  document.getElementById("TabText").innerHTML = fritattaText;
  document.getElementById("Frittata").setAttribute('tabindex', '0');
  document.getElementById("Pizza").setAttribute('tabindex', '-1');
  document.getElementById("Quiche").setAttribute('tabindex', '-1');
  document.getElementById("Frittata").focus();
  document.getElementById("TabImage").setAttribute('alt', 'Frittata');
  document.getElementById("Pizza").setAttribute('aria-selected', 'false');
  document.getElementById("Frittata").setAttribute('aria-selected', 'true');
  document.getElementById("Quiche").setAttribute('aria-selected', 'false');
}

function showQuiche (){
  document.getElementById("Quiche").style.borderBottom = "none";
  document.getElementById("Frittata").style.borderBottom = "solid";
  document.getElementById("Pizza").style.borderBottom = "solid";
  document.getElementById("Quiche").style.borderLeft = "solid";
  document.getElementById("Pizza").style.borderLeft = "none";
  document.getElementById("TabImage").src = "images/Quiche_Resized.jpg"
  let quicheText = "Quiche is a French dish with a pastry crust filled with milk or cream, eggs and a variety of ingredients such as ham, onion, mushrooms and tomatoes."
  document.getElementById("TabText").innerHTML = quicheText;
  document.getElementById("Quiche").setAttribute('tabindex', '0');
  document.getElementById("TabMain").setAttribute('tabindex', '0');
  document.getElementById("Frittata").setAttribute('tabindex', '-1');
  document.getElementById("Pizza").setAttribute('tabindex', '-1');
  document.getElementById("Quiche").focus();
  document.getElementById("TabImage").setAttribute('alt', 'Quiche');
  document.getElementById("Pizza").setAttribute('aria-selected', 'false');
  document.getElementById("Frittata").setAttribute('aria-selected', 'false');
  document.getElementById("Quiche").setAttribute('aria-selected', 'true');
}



//TAB PANEL END




//ONLOAD function to clear old data, and set the behavious for the submit button and the show passwords check.
window.onload = function () { //anonymous function to invoke the button event listener.
  hideErrors(); //hides the spans that contain the error messages.
  let submitButton = document.getElementById("registerButton");  //places the 'hook' for the currency select into a variable
  submitButton.onclick = function () { //function that determins what happens when the submit button is pressed
    event.preventDefault(); //SOURCE https://www.w3schools.com/jsref/event_preventdefault.asp prevents the submit button from opening the "fma_t3confirm.html" page
    hideErrors(); //hideErrors function is invoked to clear old error messages when the submit button is pressed
    clearSuccess();  //invokes the function to clear the success global variables.
    focusPosition = 0; //clears the value in the focus position so that the focus can be sent afresh to the right place.
    getUserName(); //getUserName function is invoked
    getPassword(); //getPassword function is invoked
    moveFocus(); //invokes the function to move the focus.
  }
  let seePassword = document.getElementById("showpasswords"); //creates a variable called seePasswords to act as a 'hook'.
  showpasswords.onclick = function() { //function that determines what happens with the password button is clicked
    togglePasswordVisibility(); //togglePasswordVisibility function is invoked.
  }
  let menuHeader = document.getElementById("menuTop");//creates a variable which is used to store the identity of the top of the mega menu
	menuHeader.addEventListener("click", toggleMenu, false);//adds an event listener for the megamenu list
  let tooltipTrigger = document.getElementById("email"); //creates a variable which is used to store the identity of the top of the mega menu
	tooltipTrigger.addEventListener("mouseover", revealTooltip, false); //triggers the revealTooltip function on mouse over
	tooltipTrigger.addEventListener("mouseout", hideTooltip, false);//triggers the hideTooltip function on mouseout
	tooltipTrigger.addEventListener("focus", revealTooltip, false);//triggers the reveal Tooltip function on focus.
	tooltipTrigger.addEventListener("blur", hideTooltip, false);//triggers the hideTooltip function when focus is moved to next focusable element
  tooltipTrigger.addEventListener('keydown', function(event){///triggers the hideTooltip function if the Escape key is pressed.
	   if(event.key === "Escape"){
		     hideTooltip();
	      }
      });

        let nextClick = document.getElementById("nextButton");
          nextClick.onclick = function(){
          nextClicked();
          }

        let previousClick = document.getElementById("previousButton");
          previousClick.onclick = function(){
          previousClicked();
          }
        let playPauseClick = document.getElementById("playPauseButton");
          playPauseClick = document.getElementById("playPauseButton");
          playPauseClick.onclick = function(){
            if (playCount  === 0) {
              playState = "paused";
              playPauseClicked();
            }

          }
          let pauseClick = document.getElementById("pauseButton");
            pauseClick.onclick = function(){
            pauseClicked();
            }


          let previousButton = document.getElementById("previousButton");
          previousButton.addEventListener('keydown', function(event){
           if(event.keyCode == '39' ){
             document.getElementById("playPauseButton").focus();

              }
              if(event.keyCode == '40' ){
                document.getElementById("playPauseButton").focus();

                 }

            });

            let playButton = document.getElementById("playPauseButton");
            playButton.addEventListener('keydown', function(event){
             if(event.keyCode == '39' ){
               document.getElementById("pauseButton").focus();

                }
                if(event.keyCode == '40' ){
                  document.getElementById("pauseButton").focus();

                   }

                   if(event.keyCode == '37' ){
                     document.getElementById("previousButton").focus();

                      }
                      if(event.keyCode == '38' ){
                        document.getElementById("previousButton").focus();

                         }


              });

           let pauseButton = document.getElementById("pauseButton");
              pauseButton.addEventListener('keydown', function(event){
               if(event.keyCode == '39' ){
                 document.getElementById("nextButton").focus();

                  }
                  if(event.keyCode == '40' ){
                    document.getElementById("nextButton").focus();

                     }

                     if(event.keyCode == '37' ){
                       document.getElementById("playPauseButton").focus();

                        }
                        if(event.keyCode == '38' ){
                          document.getElementById("playPauseButton").focus();

                           }


                });

                let nextButton = document.getElementById("nextButton");
                nextButton.addEventListener('keydown', function(event){


                       if(event.keyCode == '37' ){
                         document.getElementById("pauseButton").focus();

                          }
                          if(event.keyCode == '38' ){
                            document.getElementById("pauseButton").focus();

                             }


                 });
                 let pizzaTab = document.getElementById("Pizza");
                 pizzaTab.onclick = function (){
                   showPizza();
                 }
                 pizzaTab.addEventListener('keydown', function(event){
                    if(event.keyCode == '39' ){
                        showQuiche();
                       }
                     if(event.keyCode == '37' ){
                         showFrittata();
                         }
                         if(event.keyCode == '32' ){

                                 showPizza();
                             }
                             if(event.keyCode == '13' ){
                                     showPizza();
                                 }

                     });




                 let frittataTab = document.getElementById("Frittata");
                 frittataTab.onclick = function (){
                   showFrittata();
                 }
                 frittataTab.addEventListener('keydown', function(event){
               	   if(event.keyCode == '39' ){
                        showPizza();
               	      }
                     if(event.keyCode == '37' ){
                         showQuiche();
                  	      }
                         if(event.keyCode == '32' ){
                                 showFrittata();

                             }
                             if(event.keyCode == '13' ){
                                     showFrittata();
                                 }

                     });




                 let quicheTab = document.getElementById("Quiche");
                 quicheTab.onclick = function (){
                   showQuiche ();
                 }
                 quicheTab.addEventListener('keydown', function(event){
                    if(event.keyCode == '39' ){
                        showFrittata();
                       }
                     if(event.keyCode == '37' ){
                         showPizza();
                         }
                         if(event.keyCode == '13' ){
                                 showQuiche();
                             }
                     });







}



document.onkeydown = function(evt) { //Triggers the escape key event
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        hideTooltip();
    }
};
