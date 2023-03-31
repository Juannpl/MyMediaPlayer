const video_container = document.querySelector('.video_container');


// ------- VIDEO ------
const video = document.createElement('video');
video.classList.add('clip');
video_container.appendChild(video);
const source = document.createElement('source')
source.setAttribute("src", "../media/zak.mp4");
video.appendChild(source);


// ------- DIV -------
const controls = document.createElement('div');
controls.classList.add('controls');
video_container.appendChild(controls);


// ------ BOUTON PLAY --------
const playBtn = document.createElement('button');
playBtn.classList.add('play');
controls.appendChild(playBtn);
const icoPlay = document.createElement('img');
icoPlay.classList.add('icoPlay');
icoPlay.setAttribute("src", "media/ico/play-regular-36.png");
playBtn.appendChild(icoPlay);

// ------- BOUTON STOP --------
const stopBtn = document.createElement('button');
stopBtn.classList.add('stop');
controls.appendChild(stopBtn);
const stopImg = document.createElement('img');
stopImg.setAttribute("src", "media/ico/stop-regular-36.png");
stopBtn.appendChild(stopImg);

// ----- BOUTTON REVENIR EN ARRIERE -------
const forwardBtn = document.createElement('button');
forwardBtn.classList.add('forward');
controls.appendChild(forwardBtn);
const forwardImg = document.createElement('img');
forwardImg.setAttribute("src", "media/ico/icons8-passé-36.png");
forwardBtn.appendChild(forwardImg);

// ------- DUREE DE LA VIDEO ---------
const sliderBar = document.createElement('input');
sliderBar.classList.add('sliderBar');
sliderBar.setAttribute("type", "range");
sliderBar.setAttribute('min', '0');
sliderBar.setAttribute('max', '100');
sliderBar.setAttribute('value', '0');
sliderBar.setAttribute('step', '1');
controls.appendChild(sliderBar);

// ---------- TIMER ----------
const timeLabel = document.createElement('div');
timeLabel.classList.add('time');
timeLabel.innerText = ' 00:00/00:00 ';
controls.appendChild(timeLabel);

// -------- CONTROLE DE SONS --------
const soundBtn = document.createElement('button');
soundBtn.classList.add('sound');
controls.appendChild(soundBtn);

const fullSoundImg = document.createElement('img');
fullSoundImg.classList.add('fullSoundImg');
fullSoundImg.setAttribute("src", "media/ico/full-sound.png");
soundBtn.appendChild(fullSoundImg);

const soundBar = document.createElement('input');
soundBar.classList.add('soundBar');
soundBar.setAttribute("type", "range");
soundBar.setAttribute('min', '0');
soundBar.setAttribute('max', '100');
soundBar.setAttribute('value', '100');
soundBar.setAttribute('step', '1');
soundBtn.appendChild(soundBar);

// ------- PLEINE ECRAN ---------
const fullBtn = document.createElement('button');
fullBtn.classList.add('fullSoundImg');
controls.appendChild(fullBtn);
const fullScreenImg = document.createElement('img');
fullScreenImg.setAttribute("src", "media/ico/full-screen.png");
fullBtn.appendChild(fullScreenImg);



video.removeAttribute('controls');

// play
video.onclick = function () {
  if (video.paused) {
    video.play();
    icoPlay.setAttribute("src", "media/ico/pause-regular-36.png");

  } else {
    video.pause();
    icoPlay.setAttribute("src", "media/ico/play-regular-36.png");
  }
};


playBtn.onclick = function () {
  if (video.paused) {
    video.play();
    icoPlay.setAttribute("src", "media/ico/pause-regular-36.png");

  } else {
    video.pause();
    icoPlay.setAttribute("src", "media/ico/play-regular-36.png");
  }
};

// stop
stopBtn.onclick = function () {
  video.currentTime = 0
};

// rewind
forwardBtn.onclick = function () {
  video.currentTime -= 15;
};


// sliderBar
sliderBar.onchange = function () {
  var seekto = video.duration * (sliderBar.value / 100);
  video.currentTime = seekto;
}

video.ontimeupdate = function () {
  var nt = video.currentTime * (100 / video.duration);
  sliderBar.value = nt;
}


//  timer
video.ontimeupdate = function () {
  var minutesAll = Math.floor(video.duration / 60);
  var secondsAll = Math.round(video.duration / 10);
  var minutes = "0" + Math.floor(video.currentTime / 60);
  var seconds = Math.floor(video.currentTime - minutes * 60);

  if (seconds < 10) {
    seconds = "0" + Math.floor(video.currentTime - minutes * 60);
  } else {
    seconds = seconds
  }

  mediaTime = minutes + ":" + seconds;
  mediaAll = "0" + minutesAll + ":" + secondsAll;

  timeLabel.textContent = mediaTime + "/" + mediaAll;
};

//sound
soundBtn.onmouseover = function () {
  soundBar.style.display = "block";
  $('soundBar').fadeOut();
  $('soundBar').fadeIn();
}

soundBtn.onmouseleave = function () {
  soundBar.style.display = "none";
}

fullSoundImg.onclick = function () {
  if (video.muted) {
    video.muted = false;
    fullSoundImg.setAttribute("src", "media/ico/full-sound.png");
  } else {
    video.muted = true;
    fullSoundImg.setAttribute("src", "media/ico/mute.png");

  }
};


// soundBar
soundBar.onchange = function () {
  video.volume = soundBar.value / 100;

  if (soundBar.value <= 70) {
    fullSoundImg.setAttribute("src", "media/ico/low-sound.png");
  } else {
    fullSoundImg.setAttribute("src", "media/ico/full-sound.png");
  }
  if (soundBar.value <= 30) {
    fullSoundImg.setAttribute("src", "media/ico/volume.png");
  }
  if (soundBar.value <= 0) {
    fullSoundImg.setAttribute("src", "media/ico/mute.png");
  }
}


// full screen
fullBtn.onclick = function () {
  video.requestFullscreen();
}
