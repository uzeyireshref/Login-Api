
let signUp=document.querySelector('#signup')
let login=document.querySelector('#login')
let error=document.querySelector('#error')
let registerPage=document.querySelector('.register')
let loginPage=document.querySelector('.login');
let mainPage=document.querySelector('.main-page')
let signIn=document.querySelector('#sign-in');
let darkButton=document.querySelector('#nightmode');
let inputs=document.querySelectorAll('.input')
let container=document.querySelector('.container');
let container2=document.querySelector('.container2')
 let postContainer=document.querySelector('.post-container');
let submits=document.querySelectorAll('.submit')
let signupBtn=document.querySelector('.signup-btn');
let loginBtn=document.querySelector('.loginBtn')
let logOut=document.querySelector('#logOut');
let activeUser=JSON.parse(localStorage.getItem('loginData'))||false
let newUser=JSON.parse(localStorage.getItem('userData'))||false;
const isNightModeOn=JSON.parse(localStorage.getItem('darkMode'))||false
if(isNightModeOn){
    container.classList.add('dark')
    applyDarkMode()
}
if(activeUser){
    mainPage.style.display='block';
    loginPage.style.display = 'none';
  
    container.style.overflowY='scroll'
container.style.width='60rem'
let welcome=document.createElement('h3');
welcome.textContent = `Welcome, ${activeUser.username}!`;
mainPage.insertBefore(welcome, postContainer);
logOut.style.display='block';
}else {
    logOut.style.display='none'
    mainPage.style.display='none'
}
let userData = (username, password, email) => ({
    username: username,
    password: password,
    email: email
});



signupBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    loginPage.style.display='none';
    registerPage.style.display='block';
})
loginBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    loginPage.style.display='block';
    registerPage.style.display='none';
})

//darkmode//////////////////

darkButton.addEventListener('click',()=>{

    container.classList.toggle('dark')
    applyDarkMode();
})
function applyDarkMode(){
    const isDarkMode=container.classList.contains('dark');
    if(isDarkMode){
container.classList.add('dark');

document.body.style.backgroundImage='url(images/Dark-Neon-Floral-closeup-1200x822.jpg)';
submits.forEach((submit)=>{
    submit.style.backgroundColor='white';
submit.style.color='black'
})
inputs.forEach((item,index)=>{
item.classList.add('dark');
})
}else{
   
    document.body.style.backgroundImage=' url(images/7842.png)';
submits.forEach((submit)=>{
    submit.style.backgroundColor='black';
submit.style.color='white'
})
inputs.forEach((item,index)=>{
item.classList.remove('dark');
})
}
localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
}

//////////////////////

//signup
signUp.addEventListener('click',(e)=>{
    let userName=document.querySelector('#username').value;
    let password=document.querySelector('#password').value;
    let password2=document.querySelector('#password2').value;
    let email=document.querySelector('#email').value;
    

    let userReg=/^([^0-9]*)$/;
   let passLimit=/^[a-zA-Z0-9-]{6,}\b$/





    e.preventDefault()
    if(userName===''||password===''||password2===''||email===''){
     error.textContent='Fields can not be empthy!';
     return false
    }else if(!(password===password2)){
        error.textContent='Passwords must be match!';
     return false
    }else if(!(userReg.test(userName))){
        error.textContent="There can't be a number in username!";
return false
    }else if(!(passLimit.test(password))){
        error.textContent="Password must be at least 6 characters";
return false
    }else if(newUser.email===email){
        error.textContent="This account already exits!";
return false;
    }

    localStorage.setItem('userData',JSON.stringify(userData(userName,password,email)));
    registerPage.style.display='none';
    
    document.querySelector('#congrulation').textContent='Congrulations!Your account succsessfully created!'
    signIn.style.display='block'

    return true;
});

//login

login.addEventListener('click',(e)=>{

    let userName=document.querySelector('#logUsername').value;
    let password=document.querySelector('#logPassword').value;

e.preventDefault();
let registered=JSON.parse(localStorage.getItem('userData'));

if(userName===''||password===''){
   document.querySelector('#errorlog').textContent='Fields can not be empthy!';
    return false
}else if(!(registered&&userName===registered.username&&password===registered.password)){
    document.querySelector('#errorlog').textContent='Invalid passwords or username!'
    return false
}
    localStorage.setItem('loginData',JSON.stringify(userData(userName,password)));
     alert('Login succsessful!')
     loginPage.style.display='none';
     logOut.style.display='block';
     mainPage.style.display='block';
        
return true

});

logOut.addEventListener('click',()=>{
    localStorage.removeItem('loginData');
    logOut.style.display='none';
    mainPage.style.display='none';
    loginPage.style.display='block';
});

fetch('https://jsonplaceholder.typicode.com/posts ')
.then((res) =>
res.json()
).then((data)=>{
let posts=data;
showPosts(posts);
})
.catch((err)=>
    console.log(err)
)

function showPosts(posts){
 
  

    posts.forEach(post=>{

        let postElement = document.createElement('div');
        postElement.classList.add('post'); 
        
        
        postElement.innerHTML = `<div>
            <h1>${post.id}</h1>
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <div class="icons">
                <i  class="fa-regular fa-heart"></i>
                <i class="fa-regular fa-comment"></i>
             <i class="fa-solid fa-share"></i>
            </div> `;
        

        postContainer.appendChild(postElement);
    })

}
