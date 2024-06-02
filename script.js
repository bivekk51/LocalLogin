
document.addEventListener('DOMContentLoaded', (event) => {
    // Initially hide register and welcome page
    document.querySelector('.register').style.display = 'none';
    document.querySelector('.welcomepage').style.display = 'none';
});

function showLogin() {
    document.querySelector('.login').style.display = 'block';
    document.querySelector('.register').style.display = 'none';
    document.querySelector('.welcomepage').style.display = 'none';
}

function showRegister() {
    document.querySelector('.login').style.display = 'none';
    document.querySelector('.register').style.display = 'block';
    document.querySelector('.welcomepage').style.display = 'none';
}
function showWelcomePage(user) {
    document.querySelector('.login').style.display = 'none';
    document.querySelector('.register').style.display = 'none';
    document.querySelector('.welcomepage').style.display = 'block';

    // Display user details on the welcome page
    document.getElementById('userName').textContent = `Name: ${user.name}`;
    document.getElementById('userEmail').textContent = `Email: ${user.email}`;
    document.getElementById('userGender').textContent = `Gender: ${user.gender}`;
}

function userRegister(){
    const name=document.getElementById('name').value
    const regemail=document.getElementById('regemail').value
    const regpassword=document.getElementById('regpassword').value
    const gender = document.querySelector('input[name="gen"]:checked')?.value;
    if(!validateName(name))
        alert("Please enter valid name")
    else if(!validateEmail(regemail))
        alert("Please enter valid email")
    else if(!validatePassword(regpassword))
        alert("Make sure your password is 8 characters long")
    else if(!gender)
        alert("Please select a gender")
    else{
        const user={
            name:name,
            email:regemail,
            password:regpassword,
            gender:gender
        };
        localStorage.setItem(regemail,JSON.stringify(user))
        console.log(user);
    }
}

function validateName(name){
    var namePattern = /^[a-zA-Z\s-]+$/;
    if(!namePattern.test(name)||!name)
        return false
    else
        return true
}

function validateEmail(regemail){
    var emailPattern=/^[^@]+@\w+(\.\w+)+\w$/
    if(!emailPattern.test(regemail)||!regemail)
        return false
    else
        return true
}
function validatePassword(regpassword){
    if(regpassword.length<8)
        return false
    else 
        return true
}

function userLogin(){
    const email=document.getElementById('email').value
    const password=document.getElementById('password').value
    const userInfo=JSON.parse(localStorage.getItem(email))
    if(userInfo){
        if(userInfo.password==password){
            alert("login succesful")
            showWelcomePage(userInfo);
        }
    }
    else
        alert("Please enter valid Email")
}

function logout(){
    showLogin()
    alert("You have been logged out")
}