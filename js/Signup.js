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

  document.getElementById('signUpForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
  e.preventDefault();
  var email1 = getInputVal('email');
  var password1 = getInputVal('password');
  signUp(email1, password1)
  document.getElementById('loginForm').reset();
}

// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
  }
// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
      
//       var user = firebase.auth().currentUser;
  
//       if(user != null){
  
//         var email_id = user.email;
//         console.log('accepted');
  
//       }
  
//     } else {
//       // No user is signed in.
//     console.log("no user Signed in yet");
  
//     }
//   });
  
  function signUp(userEmail,userPass){
  
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(function() {
      window.location.href = 'signIn.html';
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error : " + errorMessage);
    //   
    });
    
  }
  
  function logout(){
    firebase.auth().signOut();
  }
  