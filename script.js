const video = document.querySelector('.player__video');
const toggleButton = document.querySelector('.player__button.toggle');
const skipButtons = document.querySelectorAll('.player__button.skip');
const volumeSlider = document.querySelector('.player__slider.volume');
const playbackSpeedSlider = document.querySelector('.player__slider.playbackSpeed');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');

// Toggle play/pause
function togglePlay() {
    if (video.paused) {
        video.play();
        toggleButton.textContent = '❚ ❚'; // Change to pause icon
    } else {
        video.pause();
        toggleButton.textContent = '►'; // Change to play icon
    }
}

// Skip forward or backward
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

// Update volume
function handleVolume() {
    video.volume = volumeSlider.value;
}

// Update playback speed
function handlePlaybackSpeed() {
    video.playbackRate = playbackSpeedSlider.value;
}

// Update progress bar
function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = `${percent}%`;
}

// Scrub to a specific time in the video
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
toggleButton.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
volumeSlider.addEventListener('input', handleVolume);
playbackSpeedSlider.addEventListener('input', handlePlaybackSpeed);
video.addEventListener('timeupdate', updateProgress);
progress.addEventListener('click', scrub);

// Handle video load error
video.addEventListener('error', () => {
    alert('Error loading video. Please check the file path or format.');
});