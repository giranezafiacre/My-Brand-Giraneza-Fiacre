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

  document.getElementById('loginForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
  e.preventDefault();
  var email1 = getInputVal('email');
  var password1 = getInputVal('password');
 console.log(login(email1, password1));
  document.getElementById('loginForm').reset();
}

// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
  }
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
        console.log('accepted');
  
      }
  
    } else {
      // No user is signed in.
    console.log("no user Signed in yet");
  
    }
  });
  
  function login(userEmail,userPass){
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function() {
      if(userEmail==='Admin@gmail.com'&&userPass==='123456'){
        logout();
        window.location.href = 'ownerPage.html';
        
      }else{
        logout();
        window.location.href = 'blogPage.html';
        
      }
      
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      document.querySelector('.alert2').style.display = 'block';
  // Hide alert after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert2').style.display = 'none';
  }, 3000);
    //   
    });
    
  }
  
  function logout(){
    firebase.auth().signOut();
  }
  