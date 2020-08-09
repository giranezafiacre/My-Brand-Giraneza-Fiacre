
var db = firebase.firestore();

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm = (e) => {
  e.preventDefault();

  // Get values
  var fullname1 = getInputVal('fullname');
  var email1 = getInputVal('email');
  var phone1 = getInputVal('phone');
  var message1=getInputVal('message');

  // Save message
  saveMessage(fullname1, email1, phone1,message1);

  // Show alert
  document.querySelector('.alert').style.display = 'block';
  document.querySelector('.dont').style.display = 'none';
  // Hide alert after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').style.display = 'none';
    document.querySelector('.dont').style.display = 'inline';
  }, 3000);

  // Clear form
  document.getElementById('contactForm').reset();
});


// Function to get get form values
const getInputVal = (id) => {
  return document.getElementById(id).value;
}
let userLocation;
// Save message to firebase
const saveMessage = (fullname, email, phone,message) => {
  db.collection("contacts").doc().set({
    fullname: fullname,
    email: email,
    phone: phone,
    message:message,
    location: userLocation
  })
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
}
// /////////////////////


const successCallback = () => {
fetch(
  `http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`
)
.then((response) => response.json())
.then((response) => {
  userLocation = response.countryCode+' '+response.timezone;
});

};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successCallback, console.log);
} else {
  alert("Geolocation is not supported");
}

// Listen for form submit
document.getElementById('contactForm2').addEventListener('submit', submitForm2);

// Submit form
function submitForm2(e) {
  e.preventDefault();

  // Get values
  var fullname2 = getInputVal('fullname2');
  var email2 = getInputVal('email2');
  var phone2 = getInputVal('phone2');
  var message2=getInputVal('message2')

  // Save message
  saveMessage(fullname2, email2, phone2,message2);

  // Show alert
  document.querySelector('.alert2').style.display = 'block';
  // Hide alert after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert2').style.display = 'none';
  }, 3000);

  // Clear form
  document.getElementById('contactForm2').reset();
}



