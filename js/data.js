const firebaseConfig = {
    apiKey: "AIzaSyBZlfK5v-dXqmctwnI2lUH0ulwtTrkMYhw",
    authDomain: "healthcare-website-4d926.firebaseapp.com",
    projectId: "healthcare-website-4d926",
    storageBucket: "healthcare-website-4d926.appspot.com",
    messagingSenderId: "434415782444",
    appId: "1:434415782444:web:4ee1d481e0c06805b15f89",
    measurementId: "G-TRET5CT5BR"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // initialize variables
  const auth = firebase.auth();
  const database = firebase.database();

  //setup register function
  function register () {
    // get all input fields
    
    full_name = document.getElementById('full_name').value
    email = document.getElementById('email').value
    password = document.getElementById('password').value

  // validate input field
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
  }
  if (validate_field(full_name) == false || validate_field(full_name) == false || validate_field(full_name) == false) {
  alert('One or More Extra Field is Outta Line!!')
  return
  }

  // move on with auth
  auth.createUserwithEmailAndPassword(email, password)
  .then(function() {
    // declare user variable

    var user = auth.currentUser

    // add this user to firebase database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
        email : email,
        full_name : full_name,
        last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).set(user_data)






    alert('User Created!!')

  })
  .catch(function(error) {
    // firebase use this to alert
    var error_code = error.error_code
    var error_message = error.message

    alert(error_message)
  })

  }


  function validate_email(email){
    expression = /[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/
    if (expression.test(email) == true) {
        return true
    } else {
        return false
    }
  }

  function validate_password(password) {
    // firebase only accept length greater than 6
    if (password < 6) {
        return false
    } else {
        return true
    }
  }

  function validate_field(field) {  
    if (field == null) {
        return false
    }
    if (field.length <= 0) {
        return false
    } else {
        return true
    }
  }