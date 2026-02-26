let users = JSON.parse(localStorage.getItem("users")||"{}");
let currentUser = JSON.parse(localStorage.getItem("currentUser")||"null");

function showRegister(){ document.getElementById("loginScreen").classList.add("hidden"); document.getElementById("registerScreen").classList.remove("hidden"); }
function showLogin(){ document.getElementById("registerScreen").classList.add("hidden"); document.getElementById("loginScreen").classList.remove("hidden"); }

function register(){ 
  const u=document.getElementById("regUsername").value;
  const p=document.getElementById("regPin").value;
  if(users[u]) return document.getElementById("regMsg").innerText="User exists";
  users[u]={username:u,pin:p,balance:0,cryptoBalance:0,ethWallet:"-",btcWallet:"-",trc20Wallet:"-",history:[]};
  localStorage.setItem("users",JSON.stringify(users));
  document.getElementById("regMsg").innerText="Registered! Login now";
}

function login(){ 
  const u=document.getElementById("loginUsername").value;
  const p=document.getElementById("loginPin").value;
  if(!users[u]) return document.getElementById("loginMsg").innerText="User not found";
  if(users[u].pin!==p) return document.getElementById("loginMsg").innerText="Invalid PIN";
  currentUser=users[u];
  localStorage.setItem("currentUser",JSON.stringify(currentUser));
  loadProfile(); showDashboard();
}

function logout(){
  currentUser=null;
  localStorage.setItem("currentUser","null");
  document.getElementById("dashboardScreen").classList.add("hidden");
  document.getElementById("loginScreen").classList.remove("hidden");
}

function showDashboard(){
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("registerScreen").classList.add("hidden");
  document.getElementById("dashboardScreen").classList.remove("hidden");
}

function loadProfile(){
  if(!currentUser)return;
  document.getElementById("welcome").innerText="Welcome "+currentUser.username;
  document.getElementById("balance").innerText=currentUser.balance;
  document.getElementById("cryptoBalance").innerText=currentUser.cryptoBalance;
  document.getElementById("trcBalance").innerText=currentUser.cryptoBalance;
}

function addMoneyPrompt(){
  const amt=Number(prompt("Enter amount to add:"));
  if(!amt||amt<=0)return alert("Enter valid amount");
  currentUser.balance+=amt;
  users[currentUser.username]=currentUser; localStorage.setItem("users",JSON.stringify(users)); loadProfile();
}

function sendMoneyPrompt(){
  const r=prompt("Receiver username:");
  const a=Number(prompt("Amount:"));
  if(!r||!a)return alert("Fill all fields");
  if(!users[r])return alert("Receiver not found");
  if(currentUser.balance<a)return alert("Insufficient funds");
  currentUser.balance-=a;
  users[r].balance+=a;
  localStorage.setItem("users",JSON.stringify(users)); loadProfile();
}

function generateTRC20Wallet(){
  currentUser.trc20Wallet="T"+Math.random().toString(36).substr(2,8);
  users[currentUser.username]=currentUser; localStorage.setItem("users",JSON.stringify(users)); loadProfile();
  alert("Wallets generated!");
}

function sendTRC20Prompt(){
  const r=prompt("TRC20 receiver:");
  const a=Number(prompt("Amount:"));
  if(!r||!a)return;
  currentUser.cryptoBalance-=a;
  users[r].cryptoBalance+=a;
  localStorage.setItem("users",JSON.stringify(users)); loadProfile();
}

if(currentUser){ loadProfile(); showDashboard(); }
