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
    var post = document.querySelector('#post').value;
    var title = document.getElementById('title').value
    //get image name
    var imageName;
    if (image == null) {
        firebase.firestore().collection("posts").doc().set({
            content: post,
            title: title,
            likes: 0,
            dislikes: 0,
            comments: {
                name: '',
                suggestion: ''
            },
            imageURL: ''
        }).then(function (error) {
            if (error) {
                document.querySelector('.error').innerHTML = 'Error while uploading'
                document.querySelector('.error').style.display = 'block';
                // Hide alert after 3 seconds
                setTimeout(function () {
                    document.querySelector('.error').style.display = 'none';
                }, 3000);
            } else {
                document.querySelector('.alert1').style.display = 'block';
                // Hide alert after 3 seconds
                setTimeout(function () {
                    document.querySelector('.alert1').style.display = 'none';
                }, 3000);
                document.getElementById('post-form').reset();
                getdata();
            }
        });
    } else {
        imageName = image.name;


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
        }, function (error) {
            //handle error here
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
                    comments: [],
                    imageURL: downloadURL
                }).then(function (error) {
                    if (error) {
                        document.querySelector('.error').innerHTML = "Error while uploading";
                        document.querySelector('.error').style.display = 'block';
                        setTimeout(function () {
                            document.querySelector('.error').style.display = 'none';
                        }, 3000);
                    } else {
                        //now reset your form
                        document.querySelector('.alert2').innerHTML = "Successfully uploaded";
                        document.querySelector('.alert2').style.display = 'block';
                        setTimeout(function () {
                            document.querySelector('.alert2').style.display = 'none';
                            document.getElementById('post-form').reset();
                            getdata();
                        }, 3000);

                    }
                });
            });
        });
    }

}
var key1

window.onload = function () {
    this.getdata();
}
function logout() {
    firebase.auth().signOut();
}
function getdata() {
    var head = document.getElementById('head');
    var blog = document.getElementById('blog');
    firebase.auth().onAuthStateChanged(function (user) {
        if (head) {
            if (user) {
                head.innerHTML = "<li><a href='../index.html'><img src='../images/logo.jpg' alt='' srcset=''></a></li>" +
                    "<li><a href='contactPage.html'>About me</a></li>" +
                    "<li><a href='signIn.html' onclick='logout()'>Logout</a></li>";
                blog.innerHTML = "<a href='signIn.html' onclick='logout()'>Logout</a>";
            } else {
                head.innerHTML = "<li><a href='../index.html'><img src='../images/logo.jpg' alt='' srcset=''></a></li>" +
                    "<li><a href='contactPage.html'>About me</a></li>" +
                    "<li><a href='signIn.html'>SignIn</a></li>";
                blog.innerHTML = "<a href='signIn.html' >Login</a>"
            }
        }
    });
    db.collection("posts").get().then(function (snapshot) {
        //get your posts div
        var posts_div = document.getElementById('articles');
        var blogposts = document.getElementById('all');
        //remove all remaining data in that div
        let i = 1;
        let arr = [], arrCopy = [], arr2 = [], obj = {}, j = 1;

        var m, p;
        p = "<h3 >recent Articles</h3>";
        snapshot.forEach(function (doc) {
            var len = 0;
            for (var count in doc.data().comments) {
                len++;
            }
            key1 = doc.id;
            obj = {
                id: doc.id,
                data: doc.data()
            }
            arr.push(obj)

            p += "<h4 id='h4'>" + doc.data().title + "</h4>" +
                "<div class='pimg'>" +
                "<div class='p'>" +
                "<p>" + doc.data().content.split(' ').splice(0, 30).join(' ') + "</p>" +
                "<p>" + doc.data().content.split(' ').splice(31, 45).join(' ') + "</p>" +
                " </div>" +
                "<div class='p' id='blogphoto'>" +
                "<img src='" + doc.data().imageURL + "' alt='' srcset=''>" +
                "</div>" +
                "</div>" +
                "<br>" +
                "<div class='feedbacks'>" +
                "<ul id='botoes1'>" +
                "<li><a onclick='readmore(" + doc.id + ")'>READ MORE</a></li>" +
                "<li><span>comments :" + len + " &nbsp;</span></li>" +
                "<li><span id='" + doc.id + "' onclick='updatelike(" + doc.id + ")'><img class='fimage like' src='../images/like.png' alt='' srcset=''></button></span></li>" +
                "<li>" + doc.data().likes + " &nbsp;</li>" +
                "<li><span onclick='updatedislike(" + doc.id + ")'><img class='fimage dislike' src='../images/dislike.png' alt='' srcset=''></span></li>" +
                "<li>" + doc.data().dislikes + "</li>" +
                "</ul>" +
                "</div>" +
                "</div>" +
                "<br>";
            i++;

        });
        p += "</div>";
        for (i = 0; i < arr.length; i++) {
            arr2.push(arr[i]);
            if (arr2.length == 3) {
                arrCopy.push(arr2);
                arr2 = [];
            } else if (!arr[i + 1]) {
                arrCopy.push(arr2);
            }
        }
        let counter = 1;
        m = "<div class='m' id='m'>";
        for (let i = 0; i < arrCopy.length; i++) {
            let iplus = i + 1;
            m += "<div id='group_" + iplus + "'>";
            m += "<table>";
            for (let j = 0; j < 3; j++) {
                if (arrCopy[i][j]) {
                    let Objdata = arrCopy[i][j];
                    m += "<tr><td>title " + counter + "</td>" +
                        "<td>" + arrCopy[i][j].data.title + "</td>" +
                        "<td><button onclick='update_area(" + arrCopy[i][j].id + ")'>update</button></td>" +
                        "<td><button id='" + arrCopy[i][j].id + "' onclick='delete_post(" + arrCopy[i][j].id + ")'>Delete</button></td></tr>";
                    counter++;

                }


            }
            m += "</table>";
            m += "<button>" + iplus + "</button>";
            m += "</div>"
            m += "</div>";
        }
        if (posts_div) {
            posts_div.innerHTML = m;
        } else if (blogposts) {
            blogposts.innerHTML = p;
        }
    });
    db.collection("contacts").get().then(function (snapshot) {
        //get your posts div
        var contacts_div = document.getElementById('message');
        //remove all remaining data in that div
        var el1;
        let i = 1;
        el1 = "<table>";
        snapshot.forEach(function (doc) {
            el1 += "<tr>" +
                "<td>" + doc.data().fullname + "</td>" +
                "<td>" + doc.data().email + "</td>" +
                "<td>" + doc.data().message + "</td>" +
                "<td>" + doc.data().location + "</td>" +
                "</tr>";

        });
        el1 += "</table>";
        if (contacts_div) {
            contacts_div.innerHTML = el1;
        }

    });

}

function delete_post(key) {
    var docs1 = key.id.toString();
    db.collection('posts').doc(docs1).delete();
    getdata();

}
var art = document.getElementById("articles1");
var create = document.getElementById("create");
var message1 = document.getElementById("messages");
function update_area(key) {
    document.getElementById('articles').style.display = 'none';
    document.getElementById('qtitle').style.display = 'none';
    document.getElementById('card').style.display = 'block';
    document.getElementById('message').style.display = 'none';
    document.getElementById('post-form').reset();
    var element = document.getElementById('title');
    element.parentNode.removeChild(element);
    var element1 = document.getElementById('post');
    element1.parentNode.removeChild(element1);
    var element2 = document.getElementById('image');
    element2.parentNode.removeChild(element2);
    var element3 = document.getElementById('text-center');
    element3.parentNode.removeChild(element3);
    var posts_div = document.getElementById('post-form');
    var key1 = key.id.toString();
    db.collection("posts").doc(key1).get().then(function (doc) {
        posts_div.innerHTML = "<input type='text' id='title' placeholder='Title' value='" + doc.data().title + "'><br>" +
            "<textarea id='post' placeholder='What's on your mind...'>" + doc.data().content + "</textarea>" +
            "<div id='text-center' class='text-center'>" +
            "<button type='button' class='btn btn-success' onclick='update_post(" + key1 + ")'>Update</button>" +
            "</div>" + posts_div.innerHTML;
    });

}
function update_post(key) {
    var docs1 = key.id.toString();
    db.collection('posts').doc(docs1).update({
        content: document.getElementById('post').value,
        title: document.getElementById('title').value
    }).then(function () {
        document.querySelector('.alert2').style.display = 'block';
        // Hide alert after 3 seconds
        setTimeout(function () {
            document.querySelector('.alert2').style.display = 'none';
            location.reload();
        }, 3000);

    }).catch(function (error) {
        document.querySelector('.error').style.display = 'block';
        setTimeout(function () {
            document.querySelector('.error').style.display = 'none';
            location.reload();
        }, 3000);
    });

}

function updatelike(key) {
    var docs1 = key.id.toString();
    db.collection("posts").doc(docs1).get().then(function (doc) {
        var likes = doc.data().likes;
        db.collection('posts').doc(docs1).update({
            likes: likes + 1
        });
        getdata();
    });


}
function updatedislike(key) {
    var docs1 = key.id.toString();
    db.collection("posts").doc(docs1).get().then(function (doc) {
        var dislikes = doc.data().dislikes;
        db.collection('posts').doc(docs1).update({
            dislikes: firebase.firestore.FieldValue.increment(1)
        });
        getdata();
    });

}

function readmore(key) {
    var key1;
    if (typeof key === 'string') {
        key1 = key;
    } else {
        key1 = key.id.toString();
    }
    if (document.querySelector('#all')) {
        document.querySelector('#all').style.display = 'none';
    }

    var art_div = document.getElementById('few');
    if (key1) {
        db.collection("posts").doc(key1).get().then(function (doc) {
            var comments = doc.data().comments;
            var m = "<h1>" + doc.data().title + "</h1>" +
                "<div class='pimg9'>" +
                "<div class='p9'>" +
                "<img src='" + doc.data().imageURL + "' alt='' srcset=''>" +
                "</div>" +
                "</div>" +

                "<div id='p'></div>" +
                "<br><div id='other9' class='other9'>" +
                "<span>is there any suggestion,comment or question you have?</span><br>" +
                "<div class='comment9'>" +
                "<div class='alert1'>Successfully uploaded</div>" +
                "<div class='alert2'>Successfully updated</div>" +
                "<div class='error'>error accured</div>" +
                "<textarea name='' id='text1' cols='70' rows='10'></textarea><br>" +
                "<button id='" + key1 + "' onclick='saveComment(" + key1 + ")'>comment:</button>" +
                "</div> </div>" +
                "<br>" +
                "<div id='prev' class='other9'>" +
                "<div class='qtitle9'><span>previous comments</span></div>";

            for (let i = 0; i < comments.length; i++) {
                m += "<ul id='botoes9'>" +
                    "<li>" +
                    "<h5>" + comments[i].name + ":</h5>" +
                    "</li>" +
                    " <li>" + comments[i].suggestion + "</li>" +
                    "</ul>";
            }


            m += "</div></div>";
            art_div.innerHTML = m;
            let content = doc.data().content;
            document.querySelector('#p').innerHTML = content;
        });
    } else {
        window.location.href = 'blogPage.html';
    }
}
function saveComment(k) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            var user1 = firebase.auth().currentUser;
            if (user1 != null) {
                db.collection("users").where("email", "==", user1.email)
                    .get()
                    .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                            let key1 = k.id.toString();
                            let uname = doc.data().username;
                            db.collection("posts").doc(key1).get().then(function (doc) {
                                var m = [];
                                m = doc.data().comments;
                                var com = {
                                    name: uname,
                                    suggestion: document.getElementById('text1').value
                                };
                                readmore(key1);
                                m.push(com);
                                db.collection('posts').doc(k.id.toString()).update({
                                    comments: m
                                });
                            });
                        });
                    }).catch(function (error) {
                    });


            } else {
                document.querySelector('.error').innerHTML = "not authorized";
                document.querySelector('.error').style.display = 'block';
                setTimeout(function () {
                    document.querySelector('.error').style.display = 'none';
                    getdata();
                }, 3000);
            }
        } else {
            document.querySelector('.error').innerHTML = "not authorized";
            document.querySelector('.error').style.display = 'block';
            setTimeout(function () {
                document.querySelector('.error').style.display = 'none';
                getdata();
            }, 3000);
        }

    });
}


art.addEventListener('click', () => {
    create.style.color = 'black';
    art.style.color = 'rgb(223, 25, 223)';
    message1.style.color = 'black';
    document.getElementById('articles').style.display = 'block';
    document.getElementById('qtitle').style.display = 'none';
    document.getElementById('card').style.display = 'none';
    document.getElementById('message').style.display = 'none';
});

create.addEventListener('click', () => {
    create.style.color = 'rgb(223, 25, 223)';
    art.style.color = 'black';
    message1.style.color = 'black';
    document.getElementById('articles').style.display = 'none';
    document.getElementById('qtitle').style.display = 'none';
    document.getElementById('card').style.display = 'block';
    document.getElementById('message').style.display = 'none';
});

message1.addEventListener('click', () => {
    create.style.color = 'black';
    art.style.color = 'black';
    message1.style.color = 'rgb(223, 25, 223)';
    document.getElementById('articles').style.display = 'none';
    document.getElementById('qtitle').style.display = 'none';
    document.getElementById('card').style.display = 'none';
    document.getElementById('message').style.display = 'block';
});
art.addEventListener('mouseenter', () => {
    art.style.color = 'white';
    create.style.color = 'black';
    message1.style.color = 'black';
    art.style.backgroundColor = 'green';
    create.style.backgroundColor = 'rgb(184, 184, 184)';
    message1.style.backgroundColor = 'rgb(184, 184, 184)';
});

create.addEventListener('mouseenter', () => {
    create.style.color = 'white';
    art.style.color = 'black';
    message1.style.color = 'black';
    create.style.backgroundColor = 'green';
    art.style.backgroundColor = 'rgb(184, 184, 184)';
    message1.style.backgroundColor = 'rgb(184, 184, 184)';
});

message1.addEventListener('mouseenter', () => {
    message1.style.color = 'white';
    art.style.color = 'black';
    create.style.color = 'black';
    message1.style.backgroundColor = 'green';
    art.style.backgroundColor = 'rgb(184, 184, 184)';
    create.style.backgroundColor = 'rgb(184, 184, 184)';
});


