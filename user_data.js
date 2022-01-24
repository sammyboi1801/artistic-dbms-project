let i=0;
let arr=[];
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
          var user_name_display='<a class="user_name_display" id="user_name_display" href="user_profile.html" style="overflow:hidden">'+name+'</a>';
          document.getElementById("user_name_display").insertAdjacentHTML("afterend",user_name_display);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        }).catch((error) => {
          console.log("Error getting document:", error);
      });
      i=0;
      db.collection("posts").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().artist);
            
            if(doc.data().artist==user.email){
                arr[i]=doc.id;
                insert_data(doc.data().url,doc.data().artist,doc.data().caption);               
            }

        });
        console.log(arr);
      });
      
      // ...
    } else {
      // User is signed out
      location.replace('home.html');
    }
  });

(function (){
  
    
})();

function insert_data(url,email,caption){
    
    var all_element='<div class="xl:w-1/4 md:w-1/2 p-4">'+
                        '<div class="bg-white-100 p-6 rounded-lg">'+
                            '<img class="h-40 rounded w-full object-cover object-center mb-6" src='+url+' alt="content">'+
                            '<h2 class="text-lg text-white-900 font-medium title-font mb-4">'+caption+'</h2>'+
                            '<button class="bg-green-500 hover:bg-green-400 text-white font-bold py-0.5 px-1 rounded" onclick="delete_file(\''+arr[i]+'\')" id="del_but'+i+'"">'+
                                '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">'+
                                    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />'+
                                '</svg>'
                            '</button>'+
                        '</div>'+
                    '</div>'
                    
                    
    document.getElementById('elements_all').insertAdjacentHTML("afterend",all_element);
    i++;
}

function log_out(){
  window.alert("Logged Out")
  firebase.auth().signOut().then(()=>{
      console.log("User logged out"); 
  });
}

function delete_file(file_name){
   
  document.addEventListener("click",function(){
    console.log(file_name);
    window.alert("Deleting your post...");
    db.collection("posts").doc(file_name+"").delete().then(() => {
        console.log("Document successfully deleted!");
        window.alert("File deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    })
    console.log('hey'); 
}

