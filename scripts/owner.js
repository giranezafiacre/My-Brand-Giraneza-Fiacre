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
var db = firebase.firestore();
function upload() {
    //get your image
    var image = document.getElementById('image').files[0];
    //get your blog text
    var post = document.getElementById('post').value;
    var title = document.getElementById('title').value
    //get image name
    var imageName;
    if(image==null){
        alert('upload an image related to a content');
        window.location.href='ownerPage.html';
    }else{
        imageName= image.name;
    }
    
    //firebase storage reference
    //it is the path where your image will be stored
    var storageRef = firebase.storage().ref().child('images/' + imageName);
    //upload image to selected storage reference
    //make sure you pass image here
    var uploadTask = storageRef.put(image);
    //to get the state of image uploading....
    uploadTask.on('state_changed', function (snapshot) {
        //get task progress by following code
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is " + progress + " done");
    }, function (error) {
        //handle error here
        console.log(error.message);
    }, function () {
        //handle successfull upload here..
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            //get your image download url here and upload it to databse
            //our path where data is stored ...push is used so that every post have unique id

            firebase.firestore().collection("posts").doc().set({
                content: post,
                title: title,
                likes: 0,
                dislikes: 0,
                comments: {
                    name: '',
                    suggestion: ''
                },
                imageURL: downloadURL
            }).then(function (error) {
                if (error) {
                    alert("Error while uploading");
                } else {
                    alert("Successfully uploaded");
                    //now reset your form
                    document.getElementById('post-form').reset();
                    getdata();
                }
            });
        });
    });

}

window.onload = function () {
    this.getdata();
}


function getdata() {
    db.collection("posts").get().then(function (snapshot) {
        //get your posts div
        var posts_div = document.getElementById('articles');
        //remove all remaining data in that div
        let i=1;
        var m;
        m="<div class='m'><table>";
        snapshot.forEach(function (doc) {
            m += "<tr><td>title " + i + "</td>"+
            "<td>" + doc.data().title + "</td>"+
            "<td><button><a href=''>update</a></button></td>" +
                "<td><button id='"+doc.id+"'onclick='delete_post("+doc.id+")'>Delete</button></td></tr>";
                    i++;

        });
        m+="</table></div>" 
        posts_div.innerHTML=m;
    });
    db.collection("contacts").get().then(function (snapshot) {
        //get your posts div
        var contacts_div = document.getElementById('message');
        //remove all remaining data in that div
        var el1;
        let i=1;
        el1 = "<table>";
        snapshot.forEach(function (doc) {
            el1 += "<tr>"+
                "<td>"+doc.data().fullname+"</td>"+
                "<td>"+doc.data().email+"</td>"+
                "<td>"+doc.data().message+"</td>"+
                "<td>"+doc.data().location+"</td>"+
            "</tr>";

        });
        el1+="</table>"; 
        contacts_div.innerHTML=el1;
    });
    
}

function delete_post(key) {
var docs1=key.id.toString();
console.log(key.id);
    db.collection('posts').doc(docs1).delete();
    getdata();

}