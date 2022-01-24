
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        const email=user.email;

        console.log(email)

        let name="";

        var docRef2 = db.collection("users").doc(email);

        docRef2.get().then((doc) => {
            if (doc.exists) {
                name=doc.data().first+" "+doc.data().last;
                console.log(name);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        let btn=document.querySelector("button")

        btn.addEventListener('click',e=>{
            let input=document.querySelector("input").files[0];
            console.log(input);
            let caption_t=document.getElementById('caption_txt').value;
            let img_url="";
            var i=0;
            
            if(input==undefined){
                window.alert('Please upload a file');
            }
            else{
                if(input.size<1000000){
                    window.alert("Wait a few seconds...");
                    // Create a root reference
                    let rand_String=makeid(10);
                    var storageRef = firebase.storage().ref();

                    // Create a reference to 'mountains.jpg'
                    var imageRef = storageRef.child(rand_String+""+input.name);

                    // Create a reference to 'images/mountains.jpg'
                    var ImagesRef = storageRef.child('users/images/'+rand_String+""+input.name);

                    // While the file names are the same, the references point to different files
                    imageRef.name === ImagesRef.name;           // true
                    imageRef.fullPath === ImagesRef.fullPath;   // false 

                    // 'file' comes from the Blob or File API
                    ImagesRef.put(input).then((snapshot) => {
                        console.log('Uploaded a blob or file!');
                        
                        i=1;
                        if(i==1){
                            // Create a reference to the file we want to download
                            var starsRef = storageRef.child('users/images/'+rand_String+""+input.name);
                            // Get the download URL
                            starsRef.getDownloadURL()
                            .then((url) => {
                                console.log(url);
                                //img_url=url;

                                /*var docRef = db.collection("users").doc(email);

                                docRef.get().then((doc) => {
                                    if (doc.exists) {
                                        console.log("Document data:", doc.data());
                                    } else {
                                        // doc.data() will be undefined in this case
                                        console.log("No such document!");
                                    }
                                }).catch((error) => {
                                    console.log("Error getting document:", error);
                                });*/
                                
                                

                                db.collection('posts').get().then(snap => {
                                    size = snap.size // will return the collection size
            
                                    db.collection("posts").doc().set({
                                        url:url,
                                        caption:caption_t,
                                        artist: user.email
                                    })
                                    .then(() => {
                                        console.log("Document successfully written!");
                                    })
                                    .catch((error) => {
                                        window.alert("Error writing document: ", error);
                                    });
            
                                });                   
                                window.alert('Uploaded!');

                            // Insert url into an <img> tag to "download"
                            })
                            .catch((error) => {
                            // A full list of error codes is available at
                            // https://firebase.google.com/docs/storage/web/handle-errors
                            switch (error.code) {
                                case 'storage/object-not-found':
                                // File doesn't exist
                                break;
                                case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break;
                                case 'storage/canceled':
                                // User canceled the upload
                                break;

                                // ...

                                case 'storage/unknown':
                                // Unknown error occurred, inspect the server response
                                break;
                            }
                            });    
                        }
                    })
                }
                else{
                    window.alert('File size larger than 1mb :(');
                }
            }            
        })
            // ...
        } else {
            // User is signed out
            location.replace('home.html');
        }
});

function log_out(){
    window.alert("Logged Out")
    firebase.auth().signOut().then(()=>{
        console.log("User logged out"); 
    });
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}