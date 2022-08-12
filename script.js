  // Player
  function createPlayer(className) {
    const playerMainBlock = document.querySelector(className);
    const player = playerMainBlock.querySelector('.player');
    const playerTime = player.querySelector('.player-time');
    const audio = player.querySelector('.audio');
    const tabs = document.querySelectorAll('.tp-tab');
    const playBtn = player.querySelector('.play-button');
    const playBtnSvg = player.querySelector('.play-button svg');
    const progress = player.querySelector('.player-progress');
    const progressLine = player.querySelector('.player-progress-line');
    let intervalTimeSong = '';

    function replaceTimeSong() {
      const timeRemaining = audio.duration - audio.currentTime;
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = Math.floor(timeRemaining % 60);
      const minutesWithLeadingZero = minutes < 10 ? `0${minutes}` : minutes;
      const secondsWithLeadingZero = seconds < 10 ? `0${seconds}` : seconds;

      playerTime.textContent = `${minutesWithLeadingZero}:${secondsWithLeadingZero}`;
    }

    function addAudioTime() {
      audio.onloadedmetadata = function () {
        replaceTimeSong();
      };
    }
    addAudioTime();

    function playSong() {
      player.classList.add('play');
      audio.play();
      intervalTimeSong = setInterval(function () {
        replaceTimeSong();
      }, 500);
    }

    function pauseSong() {
      player.classList.remove('play');
      audio.pause();
      clearInterval(intervalTimeSong);
    }

    function stopSong() {
      player.classList.remove('play');
      audio.pause();
      audio.currentTime = 0;
      playBtnSvg.setAttribute('color', '#000');
      clearInterval(intervalTimeSong);
      replaceTimeSong();
    }
    playBtn.addEventListener('click', function () {
      const isPlaying = player.classList.contains('play');
      if (isPlaying) {
        playBtnSvg.setAttribute('color', '#000');
        pauseSong();
      } else {
        playBtnSvg.setAttribute('color', '#33B49D');
        playSong();
      }
    });

    function updateProgress(event) {
      const { duration, currentTime } = event.srcElement;
      const progressPercent = (currentTime / duration) * 100;
      progressLine.setAttribute('style', `width: ${progressPercent}%`);
    }
    audio.addEventListener('timeupdate', updateProgress);

    function setProgress(event) {
      const width = this.clientWidth;
      const currentWidth = event.offsetX;
      const duration = audio.duration;
      audio.currentTime = (currentWidth / width) * duration;
      replaceTimeSong();
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', stopSong);
    });
    progress.addEventListener('click', setProgress);
    audio.addEventListener('ended', stopSong);
  }
  createPlayer('.player-01');
  createPlayer('.player-02');
  createPlayer('.player-03');
  createPlayer('.player-04');
  createPlayer('.player-05');