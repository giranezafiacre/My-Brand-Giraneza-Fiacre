var firebaseConfig = {
    apiKey: "AIzaSyB1EP4V7vfQbBAV5okPq4K8J9fEhR_zqkU",
    authDomain: "contactform-11c23.firebaseapp.com",
    databaseURL: "https://contactform-11c23.firebaseio.com",
    projectId: "contactform-11c23",
    storageBucket: "contactform-11c23.appspot.com",
    messagingSenderId: "902006572724",
    appId: "1:902006572724:web:47f0378bd4eb43984b79e1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db=firebase.firestore();

  const submitForm=(e)=> {
    e.preventDefault();
    var email1 = getInputVal('email');
    var email2=email1.toLowerCase();
    var username1=getInputVal('username');
    var password1 = getInputVal('password');
    var confirmPassword=getInputVal('confirmPassword');
    if(validationInput(username1,email2,confirmPassword,password1)){
      signUp(email2,password1);
    }else{
    }
    
    document.getElementById('signUpForm').reset();
  }
  document.getElementById('signUpForm').addEventListener('submit', submitForm);
  
  function validationInput(username,email,confirmPassword,password) 
  { 
  var passw=  /^[A-Za-z0-9!@#$%^&*]\w{5,14}$/;
  var usernameCondition=/^[A-Za-z]\w{3,14}$/;
  if(!password.match(passw)) 
  { 
    document.querySelector('#error').innerHTML="password must have atleast 6 characters: ";
    document.getElementById('error').style.backgroundColor='red';
    document.querySelector('#error').style.display = 'block';
    setTimeout(function () {
                  document.querySelector('#error').style.display = 'none';
              }, 3000);
  return false;
  }
  if(password!==confirmPassword)
  { 
    document.querySelector('#error').innerHTML="password must match: ";
    document.getElementById('error').style.backgroundColor='red';
    document.querySelector('#error').style.display = 'block';
    setTimeout(function () {
                  document.querySelector('#error').style.display = 'none';
              }, 3000);
  return false;
  }
  if(!username.match(usernameCondition)){
    document.querySelector('#error').innerHTML="username must be letters only with atleast 3 letters: ";
    document.getElementById('error').style.backgroundColor='red';
    document.querySelector('#error').style.display = 'block';
    setTimeout(function () {
                  document.querySelector('#error').style.display = 'none';
              }, 3000);
  return false;
  }
  return true;
  }
 
const getInputVal=(id)=> {
    return document.getElementById(id).value;
  }

  const signUp=(userEmail,userPass)=>{
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(function() {
      document.querySelector('#error').innerHTML='signUp successfully';
    document.getElementById('error').style.backgroundColor='green';
    document.querySelector('#error').style.display = 'block';
    setTimeout(function () {
                  document.querySelector('#error').style.display = 'none';
                  window.location.href='signIn.html';
              }, 3000);
      
      logout();
    }).catch(function(error) {
      document.querySelector('#error').innerHTML=error;
    document.getElementById('error').style.backgroundColor='red';
    document.querySelector('#error').style.display = 'block';
    setTimeout(function () {
                  document.querySelector('#error').style.display = 'none';
              }, 3000);
      logout();
    });
    save(userEmail,userPass);
  }
  function save(userEmail,userPass){
    db.collection('users').doc().set({
      password:userPass,
      email:userEmail,
      username:getInputVal('username'),
      role:'user'
    }).then(function () {
      console.log('successful');
    })
    .catch(function (error) {
      console.log('error ',error)
    });
  }
  
  function logout(){
    firebase.auth().signOut();
  }
  