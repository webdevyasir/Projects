// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBUcvFFLPCKXHtFFuju9cFIZ62PI9736pw",
authDomain: "yasirdev09.firebaseapp.com",
databaseURL: "https://yasirdev09-default-rtdb.firebaseio.com",
projectId: "yasirdev09",
storageBucket: "yasirdev09.appspot.com",
messagingSenderId: "632479649861",
appId: "1:632479649861:web:83aa3926d385b0c89e932c",
measurementId: "G-HWJ49EG2LD"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

function signup() {
  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          userCredential.user.sendEmailVerification()
              .then(() => {
                
            document.getElementById("success").style.display ="flex";
            document.getElementById("success-title").innerHTML = "Verification email sent. Please check your email.";
            setTimeout(function() {
                document.getElementById("success").style.display = "none";
            }, 3000);

              })
              .catch((error) => {
                document.getElementById("error").style.display ="flex";
                document.getElementById("error-title").innerHTML = "Error sending email verificaton.";
                setTimeout(function() {
                    document.getElementById("error").style.display = "none";
                }, 3000);
                });
          db.ref("users/" + userCredential.user.uid).set({
              username: username,
              email: email
          });
         
      })
      .catch((error) => {
        document.getElementById("error").style.display ="flex";
        document.getElementById("error-title").innerHTML = "Invalid Email type or Password at least 6 digit.";
        setTimeout(function() {
            document.getElementById("error").style.display = "none";
        }, 3000);
      });
  }

function signin() {
  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;

  auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
          if (userCredential.user.emailVerified) {
            document.getElementById("success").style.display ="flex";
            document.getElementById("success-title").innerHTML = "Successfully Login.";
            setTimeout(function() {
                document.getElementById("success").style.display = "none";
            }, 3000);
          } else {
              document.getElementById("error").style.display ="flex";
              document.getElementById("error-title").innerHTML = "Verify your email before login.";
              setTimeout(function() {
                document.getElementById("error").style.display = "none";
            }, 3000);
              auth.signOut();
          }
      })
      .catch((error) => {
        document.getElementById("error").style.display ="flex";
        document.getElementById("error-title").innerHTML = "Invalid Email Or Password.";
        setTimeout(function() {
            document.getElementById("error").style.display = "none";
        }, 3000);
      });
}

function resetPassword() {
  const email = document.getElementById("forgot-email").value;

  auth.sendPasswordResetEmail(email)
      .then(() => {
        document.getElementById("success").style.display ="flex";
        document.getElementById("success-title").innerHTML = "Password reset email sent. Please check your email.";
        setTimeout(function() {
            document.getElementById("success").style.display = "none";
        }, 3000);
      })
      .catch((error) => {
        document.getElementById("error").style.display ="flex";
        document.getElementById("error-title").innerHTML = "Error sending password reset email ";
        setTimeout(function() {
            document.getElementById("error").style.display = "none";
        }, 3000);
      });
}


function closeError(){
    document.getElementById("error").style.display ="none";
}

function closeSuccess(){
    document.getElementById("success").style.display ="none";
}

