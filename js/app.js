const musicSelector = document.querySelectorAll('.src-area'); 
const music = document.querySelector('audio');
const playIcon = document.querySelector('.play-icon');
const volumeCard = document.querySelector('.volume-range');
const volume = document.querySelector('.volume-deg');
const playBtns = document.querySelectorAll('.play-button ');
const titlesMusic = document.querySelectorAll('.Title-music ');
const titleForm = document.querySelector('.title-form ');
const artistForm = document.querySelector('.singer-form ');
const volumeBtn = document.querySelector('.volume');
const soundMusicBar = document.querySelector('.second-music');
const musicRange = document.querySelector('.music-range');

let lastVolume= 1;
volumeCard.addEventListener('click',function (event) {
   music.volume = event.offsetX/100;
   lastVolume=music.volume;
   volume.style.width = `${event.offsetX}px`;
   volumeBtn.classList.add("fa-volume-high");
   volumeBtn.classList.remove("fa-volume-xmark");
});
musicSelector.forEach(function (item) {
    item.addEventListener('click',function(event){
      lastVolume=music.volume;
      const mainMusicSrc = event.target.dataset.src;
     const playOrPauseBtn = event.target.parentElement;
      music.setAttribute("src", mainMusicSrc);
      playBtns.forEach(btn => {
         btn.classList.add("fa-play");
         btn.classList.remove("fa-pause");
      });
       const valueMusic =event.target.parentElement.parentElement.parentElement.parentElement.lastElementChild.innerHTML;
       const [title,artist]=valueMusic.split("-")
       titleForm.innerHTML=title;
       artistForm.innerHTML=artist;
      if(playIcon.className.includes("fa-play")){
         music.play();
         playIcon.classList.remove("fa-play");
         playIcon.classList.add("fa-pause");
         playOrPauseBtn.classList.remove("fa-play");
         playOrPauseBtn.classList.add("fa-pause");
    
      }else{
         music.pause();
         playIcon.classList.add("fa-play");
         playIcon.classList.remove("fa-pause");
         playOrPauseBtn.classList.add("fa-play");
         playOrPauseBtn.classList.remove("fa-pause");
      }
    })
    });
playIcon.addEventListener('click',function(event){
   if(playIcon.className.includes("fa-play")){
      music.play();
      playIcon.classList.remove("fa-play");
      playIcon.classList.add("fa-pause");
   }else{
      music.pause();
      playIcon.classList.add("fa-play");
      playIcon.classList.remove("fa-pause");
      playBtns.forEach(btn => {
         btn.classList.add("fa-play");
         btn.classList.remove("fa-pause");
      });
   }
});
music.addEventListener('timeupdate',function () {
 const percentage= (music.currentTime/music.duration)*100;
 soundMusicBar.style.width=`${percentage}%` 
});
musicRange.addEventListener('click', (event) => {
   const rect=musicRange.getBoundingClientRect();
   const clickX = event.clientX - rect.left;
   const width = rect.width;
   const percentage = clickX/width;
   music.currentTime=percentage*music.duration;
});

volumeBtn.addEventListener('click',function (event) {
  if(volumeBtn.className.includes("fa-volume-high")){
   volumeBtn.classList.remove("fa-volume-high");
   volumeBtn.classList.add("fa-volume-xmark");
   music.volume = 0
  }else{
   volumeBtn.classList.add("fa-volume-high");
   volumeBtn.classList.remove("fa-volume-xmark");
   music.volume =  lastVolume;
  }
});