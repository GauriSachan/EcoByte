// Tabs
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const switchToLogin = document.getElementById('switchToLogin');

loginTab.addEventListener('click', () => {
  loginTab.classList.add('active');
  signupTab.classList.remove('active');
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
});
signupTab.addEventListener('click', () => {
  signupTab.classList.add('active');
  loginTab.classList.remove('active');
  signupForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
});
switchToLogin.addEventListener('click', (e) => {
  e.preventDefault();
  loginTab.click();
});

// Password Toggle
document.querySelectorAll('.toggle-pass').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    if(target.type === 'password') target.type = 'text';
    else target.type = 'password';
  });
});

// Particle Background
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const colors = ['#00b894','#55efc4','#ffeaa7','#6c5ce7'];

function random(min,max){ return Math.random()*(max-min)+min; }

class Particle {
  constructor(){
    this.x = random(0,canvas.width);
    this.y = random(0,canvas.height);
    this.size = random(2,5);
    this.speedX = random(-1,1);
    this.speedY = random(-1,1);
    this.color = colors[Math.floor(random(0,colors.length))];
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x < 0 || this.x>canvas.width) this.speedX*=-1;
    if(this.y < 0 || this.y>canvas.height) this.speedY*=-1;
  }
  draw(){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}

function initParticles(){
  particles = [];
  for(let i=0;i<150;i++) particles.push(new Particle());
}
initParticles();

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});
