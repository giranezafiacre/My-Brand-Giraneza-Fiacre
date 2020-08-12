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
    var password1 = getInputVal('password');
    signUp(email1, password1)
    document.getElementById('signUpForm').reset();
  }
  document.getElementById('signUpForm').addEventListener('submit', submitForm);

// Submit form


// Function to get get form values
const getInputVal=(id)=> {
    return document.getElementById(id).value;
  }

  const signUp=(userEmail,userPass)=>{
  
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(function() {
      save(userPass,userEmail);
      logout();
      window.location.href = 'signIn.html';
      
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error : " + errorMessage);
      logout();
    //   
    });
    save(userPass,userEmail);
  }
  function save(userPass,userEmail){
    db.collection('users').doc().set({
      password:userPass,
      email:userEmail,
      role:'user'
    }).then(function () {
      alert("Document successfully written!");
    })
    .catch(function (error) {
      alert("Error writing document: ", error);
    });
  }
  
  function logout(){
    firebase.auth().signOut();
  }
  