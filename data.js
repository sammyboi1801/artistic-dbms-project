firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      let name="";
      var docRef2 = db.collection("users").doc(user.email);

      docRef2.get().then((doc) => {
          if (doc.exists) {
          name=doc.data().first+" "+doc.data().last;
          console.log(name);
          var user_name_display='<a class="user_name_display" title="Your Posts" id="user_name_display" href="user_profile.html" style="overflow:hidden">'+name+'</a>';
          document.getElementById("user_name_display").insertAdjacentHTML("afterend",user_name_display);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        }).catch((error) => {
          console.log("Error getting document:", error);
      });

      var name_id='<p>'+name+'</p>';
      document.getElementById('user_name').insertAdjacentHTML("afterend",name_id);
      // ...
    } else {
      // User is signed out
      location.replace('home.html');
    }
  });

(function (){
  db.collection("posts").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data().artist);
        insert_data(doc.data().url,doc.data().artist,doc.data().caption);
    });
  });
    
})();

function insert_data(url,email,caption){

  var all_element='<div class="xl:w-1/4 md:w-1/2 p-4">'+
                        '<div class="bg-white-100 p-6 rounded-lg">'+
                            '<img class="h-40 rounded w-full object-cover object-center mb-6" src='+url+' alt="content">'+
                            '<h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">'+email+'</h3>'+
                            '<h2 class="text-lg text-white-900 font-medium title-font mb-4">'+caption+'</h2>'+
                        '</div>'+
                    '</div>'
                    
                    
    document.getElementById('elements_all').insertAdjacentHTML("afterend",all_element);
}

function log_out(){
  window.alert("Logged Out")
  firebase.auth().signOut().then(()=>{
      console.log("User logged out"); 
  });
}