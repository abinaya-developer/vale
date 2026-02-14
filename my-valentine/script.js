
  /* ===== SCROLL REVEAL ===== */
const chapters = document.querySelectorAll(".chapter");

function revealOnScroll(){
  const trigger = window.innerHeight * 0.85;

  chapters.forEach(ch=>{
    const top = ch.getBoundingClientRect().top;
    if(top < trigger){
      ch.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* ===== POPUP + SLIDESHOW ===== */
let currentIndex = 0;
let allImages = [];
let slideInterval;

function openPopup(src){
  allImages = Array.from(document.querySelectorAll(".photo-grid img"))
                   .map(img => img.src);

  currentIndex = allImages.indexOf(src);

  document.getElementById("popup").style.display="flex";
  document.getElementById("popupImg").src = src;

  startSlideshow();
}

function closePopup(){
  document.getElementById("popup").style.display="none";
  clearInterval(slideInterval);
}

function startSlideshow(){
  clearInterval(slideInterval);

  slideInterval = setInterval(()=>{
    currentIndex = (currentIndex + 1) % allImages.length;
    document.getElementById("popupImg").src = allImages[currentIndex];
  },3000);
}

/* ===== SWIPE SUPPORT ===== */
let startX = 0;

document.getElementById("popup").addEventListener("touchstart", e=>{
  startX = e.touches[0].clientX;
});

document.getElementById("popup").addEventListener("touchend", e=>{
  let endX = e.changedTouches[0].clientX;

  if(startX - endX > 50){
    nextSlide();
  }
  if(endX - startX > 50){
    prevSlide();
  }
});

function nextSlide(){
  currentIndex = (currentIndex + 1) % allImages.length;
  document.getElementById("popupImg").src = allImages[currentIndex];
}

function prevSlide(){
  currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
  document.getElementById("popupImg").src = allImages[currentIndex];
}


function nextPage(id){

  const current = document.querySelector(".page.active");
  const next = document.getElementById(id);

  if(current){
    current.classList.remove("active");
    current.classList.add("slide-left");

    setTimeout(()=>{
      current.classList.remove("slide-left");
    },600);
  }

  next.classList.add("active");

  window.scrollTo(0,0);
}

/* page switch */
function nextPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0,0);
}

/* nickname */
function saveName(){
  let name=document.getElementById("nickname").value || "My Love";
  document.getElementById("nameText").innerText=name+", this is for you ❤️";
  nextPage("valentine");
}

/* moving NO button */
const noBtn=document.getElementById("noBtn");
if(noBtn){
  noBtn.addEventListener("mouseover",()=>{
    const card=document.querySelector(".valentine-card");
    const maxX=card.clientWidth-noBtn.offsetWidth-20;
    const maxY=card.clientHeight-noBtn.offsetHeight-20;
    noBtn.style.left=Math.random()*maxX+"px";
    noBtn.style.top=Math.random()*maxY+"px";
  });
}

/* popup */
function openPopup(src){
  document.getElementById("popup").style.display="flex";
  document.getElementById("popupImg").src=src;
}
function closePopup(){
  document.getElementById("popup").style.display="none";
}

/* floating hearts */
const container=document.querySelector(".floating-hearts");
for(let i=0;i<40;i++){
  const h=document.createElement("div");
  h.className="heart";
  h.innerHTML="❤";
  h.style.left=Math.random()*100+"vw";
  h.style.fontSize=(10+Math.random()*20)+"px";
  h.style.animationDuration=(6+Math.random()*8)+"s";
  h.style.animationDelay=Math.random()*5+"s";
  container.appendChild(h);
}

/* ---------- CINEMATIC ENDING ---------- */

function showEnding(){

  nextPage("ending");

  const endingEl = document.getElementById("endingText");
  endingEl.innerHTML = "";

  const firstText = "Love You Forever ❤️";
  let i = 0;

  function typeFirst(){
    if(i < firstText.length){
      endingEl.innerHTML += firstText.charAt(i);
      i++;
      setTimeout(typeFirst,120);
    } else {
      setTimeout(changeFinalText, 3000);
    }
  }

  function changeFinalText(){
    endingEl.style.opacity = 0;

    setTimeout(()=>{
      endingEl.innerHTML =
        "The End… or just the beginning of love ❤️";
      endingEl.style.opacity = 1;
    },800);
  }

  typeFirst();

  /* music start */
  const music = document.getElementById("bgMusic");
  music.volume = 0.4;
  music.play();

  /* floating hearts */
  for(let i=0;i<25;i++){
    const h = document.createElement("div");
    h.className = "ending-heart";
    h.innerHTML = "❤";
    h.style.left = Math.random()*100 + "vw";
    h.style.fontSize = (15+Math.random()*20)+"px";
    h.style.animationDuration = (4+Math.random()*4)+"s";
    document.getElementById("ending").appendChild(h);
  }
}




