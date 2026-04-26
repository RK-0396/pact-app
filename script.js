document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
    // ==========================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // ==========================================
    // 2. START BUTTON LOGIC
    // ==========================================
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {
        document.getElementById('job-desc').scrollIntoView({ behavior: 'smooth' });
        playMusic();
    });

    // ==========================================
    // 3. AUDIO / MUSIC CONTROLS
    // ==========================================
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    let isPlaying = false;

    bgMusic.volume = 0.4; // Soft background volume

    function playMusic() {
        if (!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            }).catch(e => {
                console.log("Audio play failed, requires user interaction:", e);
            });
        }
    }

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        } else {
            bgMusic.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }
        isPlaying = !isPlaying;
    });

    // ==========================================
    // 4. NEGOTIATE BUTTON (Playful interaction)
    // ==========================================
    const negotiateBtn = document.getElementById('negotiate-btn');
    
    negotiateBtn.addEventListener('click', () => {
        // Using SweetAlert2 for a cute, soft popup
        Swal.fire({
            title: 'Haha, deal! ☕',
            text: 'Coffee is on me. Let me know when and where we are discussing these terms!',
            icon: 'success',
            confirmButtonText: 'Sounds good!',
            confirmButtonColor: '#ff8fa3',
            background: '#fffef0',
            backdrop: `rgba(0,0,0,0.4)`
        });
    });

    // ==========================================
    // 5. ACCEPT BUTTON & CERTIFICATE MODAL
    // ==========================================
    const acceptBtn = document.getElementById('accept-btn');
    const certModal = document.getElementById('certificate-modal');
    const closeCertBtn = document.getElementById('close-cert');
    const closeCertIcon = document.getElementById('close-cert-icon');

    acceptBtn.addEventListener('click', () => {
        certModal.classList.add('active');
        fireConfetti();
    });

    closeCertBtn.addEventListener('click', () => {
        const certElement = document.querySelector('.certificate-content');
        
        // Hide buttons temporarily so they don't appear in the certificate screenshot
        const closeIcon = document.getElementById('close-cert-icon');
        closeCertBtn.style.display = 'none';
        if (closeIcon) closeIcon.style.display = 'none';
        
        // Use html2canvas to capture the certificate
        html2canvas(certElement, {
            backgroundColor: null,
            scale: 2 // Higher resolution
        }).then(canvas => {
            // Restore buttons
            closeCertBtn.style.display = '';
            if (closeIcon) closeIcon.style.display = '';
            
            // Download the image
            const link = document.createElement('a');
            link.download = 'Love_Agreement_Certificate.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            // Close modal and show welcome message
            certModal.classList.remove('active');
            Swal.fire({
                title: 'Welcome Aboard! 🎉',
                text: 'Your certificate has been downloaded! I cannot wait for this lifetime partnership.',
                confirmButtonColor: '#a7c957',
                background: '#fffef0'
            });
        });
    });

    if (closeCertIcon) {
        closeCertIcon.addEventListener('click', () => {
            certModal.classList.remove('active');
        });
    }

    // Optional: Close modal if clicked outside
    certModal.addEventListener('click', (e) => {
        if (e.target === certModal) {
            certModal.classList.remove('active');
        }
    });

    // ==========================================
    // 6. CONFETTI EFFECT
    // ==========================================
    function fireConfetti() {
        const colors = ['#ff8fa3', '#ffb3c6', '#a7c957', '#ffe6a7', '#ffffff'];
        const confettiCount = window.innerWidth < 768 ? 50 : 100;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti-piece');
            
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            const size = Math.random() * 8 + 6; 
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }

            const duration = Math.random() * 3 + 2; 
            confetti.style.animationDuration = duration + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            
            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, (duration + 1) * 1000);
        }
    }
});
