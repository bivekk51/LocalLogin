
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('.register').style.display = 'none';
    document.querySelector('.welcomepage').style.display = 'none';
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    if (loggedInUserEmail) {
        const storedUser = localStorage.getItem(loggedInUserEmail);
        if (storedUser) {
            const user = JSON.parse(storedUser);
            showWelcomePage(user);
        }
    } else {
        showLogin();
    }
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

    document.getElementById('userName').textContent = `Name: ${user.name}`;
    document.getElementById('userEmail').textContent = `Email: ${user.email}`;
    document.getElementById('userGender').textContent = `Gender: ${user.gender}`;
}

async function userRegister(){
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
        const hashedPassword = await hashPassword(regpassword);
        const user = {
            name: name,
            email: regemail,
            password: hashedPassword,
            gender: gender
        };
        localStorage.setItem(regemail,JSON.stringify(user))
        alert("You are succesfully registered")
        showWelcomePage(user)
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

async function userLogin(){
    const email=document.getElementById('email').value
    const password=document.getElementById('password').value
    const userInfo=JSON.parse(localStorage.getItem(email))
    if(userInfo){
         const hashedPassword = await hashPassword(password);
        if(userInfo.password==hashedPassword){
            alert("login succesful")
            localStorage.setItem('loggedInUser', email);
            showWelcomePage(userInfo);
        }
        else{
            alert("Wrong password")
        }
    }
    else
        alert("Please enter valid Email")
}

function logout(){
    localStorage.removeItem('loggedInUser');
    showLogin()
}
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
