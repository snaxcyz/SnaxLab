document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio-player");
  const playBtn = document.getElementById("play-btn");
  const seekBar = document.getElementById("seek-bar");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");

  // 1. Play/Pause tugmasi
  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playBtn.textContent = "⏸️";
    } else {
      audio.pause();
      playBtn.textContent = "▶️";
    }
  });

  // 2. Audio metadata yuklanganda duration ko‘rsatish
  audio.addEventListener("loadedmetadata", () => {
    if (!isNaN(audio.duration)) {
      seekBar.max = audio.duration;
      durationEl.textContent = formatTime(audio.duration);
    } else {
      durationEl.textContent = "00:00";
    }
  });

  // 3. Audio davomida currentTime ni yangilash
  audio.addEventListener("timeupdate", () => {
    seekBar.value = audio.currentTime;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });

  // 4. Qo‘lda vaqtni o‘zgartirish
  seekBar.addEventListener("input", () => {
    audio.currentTime = seekBar.value;
  });

  // 5. Formatlash: mm:ss
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  // 6. Agar metadata event o‘tmay qolsa, majburan tekshir
  setTimeout(() => {
    if (audio.readyState >= 1 && !isNaN(audio.duration)) {
      seekBar.max = audio.duration;
      durationEl.textContent = formatTime(audio.duration);
    }
  }, 1000); // 1 soniyadan keyin tekshir
});
