// ===== FALLING HEARTS =====
const heartsContainer = document.getElementById('falling-hearts');
const heartEmojis = ['💕', '💗', '💖', '💘', '❤️', '🩷', '💝', '🌸', '✨', '💫'];

function createFallingHeart() {
    const heart = document.createElement('span');
    heart.className = 'falling-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (1 + Math.random() * 2) + 'rem';
    heart.style.animationDuration = (4 + Math.random() * 6) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 12000);
}

// Initial burst
for (let i = 0; i < 15; i++) setTimeout(createFallingHeart, i * 200);
setInterval(createFallingHeart, 600);

// ===== BUTTON LOGIC =====
const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');

function handleAnswer() {
    // Sembunyikan tombol dan counter
    const buttonsContainer = document.querySelector('.buttons-container');
    if (buttonsContainer) buttonsContainer.style.display = 'none';
    const noCounter = document.getElementById('no-counter');
    if (noCounter) noCounter.style.display = 'none';
    
    // Tampilkan pesan WA
    const waMessage = document.getElementById('wa-message');
    if (waMessage) waMessage.style.display = 'block';
    
    // Ubah text judul
    const proposalTitle = document.querySelector('.proposal-title');
    if (proposalTitle) proposalTitle.innerHTML = 'Menunggu <span class="highlight">Jawabanmu</span>... ✨';
    const proposalSubtitle = document.querySelector('.proposal-subtitle');
    if (proposalSubtitle) proposalSubtitle.style.display = 'none';
}

btnYes.addEventListener('click', handleAnswer);
btnNo.addEventListener('click', handleAnswer);
