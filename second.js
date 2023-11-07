 const music = document.querySelector('#music')
 const currentTime = document.querySelector('.current-time')
 const totalTime = document.querySelector('.total-time')
 const playBtn = document.querySelector('.main-button')
 const progressLine = document.querySelector('.progress-line')
const line = document.querySelector('.progress-line')
const progressBar = document.querySelector('.progress-bar')

let second = 0;
let totalSecond = 139;
let isPlaying = false
let interval;


 function playAudio(){
   
    playBtn.src = "svg/Stop_and_play_fill_reverse.svg"
    isPlaying = true
     interval = setInterval(function() {
    if(isPlaying){
        second++
        let percentage = (music.currentTime / music.duration) * 100
        progressLine.style.width = `${percentage}%`;
        

    }
    if(second < totalSecond){
        updateTime()
      } else{
        
        pauseAudio(interval)      
       } 
    
}, 1000)
    music.play()
 }

 function pauseAudio(){
    isPlaying = false
    clearInterval(interval)
    music.pause()
    playBtn.src = "svg/Play_fill.svg"
 }


 playBtn.addEventListener("click", function(){
    if(music.paused){
       playAudio()
    } else{
       pauseAudio()
    }
 })


 function updateTime(){
   let currentSeconds = Math.floor(music.currentTime);
   let minutes = Math.floor(currentSeconds / 60);
   let remainingSeconds = currentSeconds % 60;
   let formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
   let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
   currentTime.textContent = `${formattedMinutes}:${formattedSeconds}`;
}


/*
 const intervals = setInterval(function() {
    second++
    
}, 1000)*/

const updater = document.querySelector('.animation')


let position = 0

function update(){
   position += -104
   updater.style.transform = `translateX(${position}%)`;
}

let mousedown = false;

window.addEventListener('mouseup', () => {
   mousedown = false;
});

progressBar.addEventListener('mousedown', (e) => {
    mousedown = true;
    // Calculate the new time for the music
    let clickPositionInPage = e.pageX;
    let progressBarPosition = this.getBoundingClientRect().left;
    let progressBarWidth = this.offsetWidth;
    let clickPositionInProgressBar = clickPositionInPage - progressBarPosition;
    let timePerPixel = music.duration / progressBarWidth;
    let newTime = timePerPixel * clickPositionInProgressBar;

    // Update the music time and progress line width
    music.currentTime = newTime;
    let percentage = (music.currentTime / music.duration) * 100;
    progressLine.style.width = `${percentage}%`;
    updateTime();
});

progressBar.addEventListener('mousemove', (e) => {
    if (!mousedown) return;
    // Calculate the new time for the music
    let clickPositionInPage = e.pageX;
    let progressBarPosition = this.getBoundingClientRect().left;
    let progressBarWidth = this.offsetWidth;
    let clickPositionInProgressBar = clickPositionInPage - progressBarPosition;
    let timePerPixel = music.duration / progressBarWidth;
    let newTime = timePerPixel * clickPositionInProgressBar;

    // Update the music time and progress line width
    music.currentTime = newTime;
    let percentage = (music.currentTime / music.duration) * 100;
    progressLine.style})



progressBar.addEventListener('mousedown', () => {
    mousedown = true;
});

progressBar.addEventListener('mouseup', () => {
    mousedown = false;
});

progressBar.addEventListener('mousemove', (e) => {
   if(mousedown) {
       let x = e.offsetX;
       let totalWidth = progressBar.clientWidth;
       let progress = x / totalWidth;
       let duration = music.duration;
       music.currentTime = duration * progress;
       let percentage = (music.currentTime / music.duration) * 100;
       progressLine.style.width = `${percentage}%`; // update the progress line width
       updateTime();
   }
});


