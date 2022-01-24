

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      
      var uid = user.uid; 
      // ...
    }
  });


function login(){
    var user_email=document.getElementById('user_emaill').value;
    var user_pass=document.getElementById('user_passs').value;

    firebase.auth().signInWithEmailAndPassword(user_email, user_pass)
    .then((userCredential) => {
        // Signed in
          var user = userCredential.user;
        
          location.replace('user1.html');
            // ...
        })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(errorMessage);
    });
}

function logout(){
  firebase.auth().signOut().then(() => {
    window.alert('Sign-Out');
    location.replace('home.html');
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

function signup(){
  var user_email=document.getElementById('user_emaill').value;
  var user_pass=document.getElementById('user_passs').value;
  var first_name=document.getElementById('first_name').value;
  var last_name=document.getElementById('last_name').value;

  firebase.auth().createUserWithEmailAndPassword(user_email, user_pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    user_uid=user.uid+"";
    // Add a new document in collection "cities"
    

    location.replace('user1.html');
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert(errorMessage);
    // ..
  });

  db.collection("users").doc(user_email).set({
    first: first_name,
    last: last_name
  })
  .then(() => {
    console.log("Document successfully written!");
  })
  .catch((error) => {
    window.alert("Error writing document: ", error);
  });

}

function set_user_db(user,user_uid){
  console.log(user.uid);
  
  window.alert('nice');
}