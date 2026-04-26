"use client";
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import emailjs from '@emailjs/browser';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [certVisible, setCertVisible] = useState(false);
  const audioRef = useRef(null);
  const certRef = useRef(null);
  const [downloadTime, setDownloadTime] = useState("");

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

    // Set audio volume
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log(e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleStart = () => {
    document.getElementById('job-desc').scrollIntoView({ behavior: 'smooth' });
    if (!isPlaying && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log(e));
    }
  };

  const handleNegotiate = () => {
    Swal.fire({
      title: 'Haha, deal! ☕',
      text: 'Coffee is on me. Let me know when and where we are discussing these terms!',
      icon: 'success',
      confirmButtonText: 'Sounds good!',
      confirmButtonColor: '#ff8fa3',
      background: '#fffef0',
      backdrop: `rgba(0,0,0,0.4)`
    });
  };

  const fireConfetti = () => {
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

      if (Math.random() > 0.5) confetti.style.borderRadius = '50%';

      const duration = Math.random() * 3 + 2;
      confetti.style.animationDuration = duration + 's';
      confetti.style.animationDelay = Math.random() * 0.5 + 's';

      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), (duration + 1) * 1000);
    }
  };

  const handleAccept = () => {
    // Generate the formatted timestamp when accepted
    const now = new Date();
    const formattedTime = now.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    setDownloadTime(formattedTime);

    setCertVisible(true);
    fireConfetti();
  };

  const downloadCertificate = () => {
    if (!certRef.current) return;
    const certElement = certRef.current;

    // Temporarily hide buttons for the screenshot
    const buttons = certElement.querySelectorAll('.hide-on-print');
    buttons.forEach(btn => btn.style.display = 'none');

    const originalMaxHeight = certElement.style.maxHeight;
    const originalOverflowY = certElement.style.overflowY;
    certElement.style.maxHeight = 'none';
    certElement.style.overflowY = 'visible';

    html2canvas(certElement, {
      backgroundColor: null,
      scale: 2
    }).then(canvas => {
      // Restore styles
      buttons.forEach(btn => btn.style.display = '');
      certElement.style.maxHeight = originalMaxHeight;
      certElement.style.overflowY = originalOverflowY;

      // Send the text notification via EmailJS quietly in the background
      const templateParams = {
        to_email: 'secondarypg@gmail.com',
        timestamp: downloadTime,
        message: 'She said YES! Shraddha has officially accepted the position.'
      };

      emailjs.send("service_qgjcm1a", "template_9lkbmpl", templateParams, {
        publicKey: "PQz8AdNu1C9HbK3nG",
      })
        .then((response) => console.log("EmailJS Success:", response.status, response.text))
        .catch((err) => {
          console.error("EmailJS Failed:");
          if (err?.text) console.error("Reason:", err.text);
          else console.error(err);
        });

      canvas.toBlob(blob => {
        const file = new File([blob], 'Love_Agreement_Certificate.png', { type: 'image/png' });

        const showSuccess = (msg) => {
          setCertVisible(false);
          Swal.fire({
            title: 'Welcome Aboard! 🎉',
            text: msg + ' I cannot wait for this lifetime partnership.',
            confirmButtonColor: '#a7c957',
            background: '#fffef0'
          });
        };

        const executeDownload = (blobData) => {
          const link = document.createElement('a');
          link.download = 'Love_Agreement_Certificate.png';
          link.href = URL.createObjectURL(blobData);
          link.click();
          showSuccess('Certificate downloaded successfully!');
        };

        executeDownload(blob);
      }, 'image/png');
    });
  };

  return (
    <>
      <button onClick={toggleMusic} className="music-btn" aria-label="Toggle Music">
        {!isPlaying ? (
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        )}
      </button>
      <audio ref={audioRef} loop>
        <source src="/assets/music.m4a" type="audio/mpeg" />
      </audio>

      <section id="hero" className="hero-section">
        <div className="hero-content fade-in-on-load">
          <div className="envelope-icon">💌</div>
          <h1>A Very Important Life Proposal</h1>
          <p className="subtitle">“Dear <strong>Shraddha</strong>, you’ve been shortlisted for a lifetime position… details below 😄”</p>
          <button onClick={handleStart} className="btn-primary pulse">Review Application 👇</button>
        </div>
      </section>

      <section id="job-desc" className="job-section">
        <div className="job-card reveal-on-scroll">
          <h2>📋 The "Job" Description</h2>
          <ul className="job-details">
            <li><span className="icon">💼</span> <strong>Position:</strong> My Favorite Person Forever</li>
            <li><span className="icon">📍</span> <strong>Location:</strong> Wherever we both are ❤️</li>
            <li><span className="icon">⏱️</span> <strong>Working Hours:</strong> Flexible (especially for naps & coffee dates ☕)</li>
            <li><span className="icon">🏖️</span> <strong>Leaves:</strong> Unlimited… but missing me is compulsory 😉</li>
          </ul>

          <div className="perks-section">
            <h3>✨ Perks Included:</h3>
            <div className="perks-grid">
              <div className="perk-card">😂 Unlimited laughter</div>
              <div className="perk-card">🍫 Random treats</div>
              <div className="perk-card">🎭 Occasional drama 😄</div>
              <div className="perk-card">🤝 Lifetime partnership</div>
            </div>
          </div>
        </div>
      </section>

      <section id="question" className="question-section">
        <div className="question-container reveal-on-scroll">
          <h2>❓ The Big Question</h2>
          <p className="big-ask">“Would you consider relocating… <br />to a life full of fun, chaos, and a little bit of me? 😌”</p>

          <div className="action-buttons">
            <button onClick={handleAccept} className="btn-accept">💚 Accept the Offer</button>
            <button onClick={handleNegotiate} className="btn-negotiate">😄 Let’s Negotiate (coffee first?)</button>
          </div>

          <p className="hr-note">“Don’t worry… HR (our parents 😄) will only be involved after mutual approval.”</p>
        </div>
      </section>

      <div className={`certificate-modal ${certVisible ? 'active' : ''}`}>
        <div className="certificate-content" ref={certRef}>
          <span className="close-cert-icon hide-on-print" onClick={() => setCertVisible(false)}>&times;</span>
          <h1 className="cert-title">🏆 Official Love Agreement Certificate 🏆</h1>
          <p className="cert-subtitle">This certifies that</p>
          <h2 className="cert-name">Shraddha</h2>
          <p className="cert-subtitle">has officially agreed to:</p>

          <ul className="cert-list">
            <li>💕 Be my favorite human</li>
            <li>😊 Share smiles, jokes, and memories</li>
            <li>😄 Handle my nonsense with patience</li>
          </ul>

          <p className="cert-subtitle">In return, I promise:</p>
          <ul className="cert-list">
            <li>🛡️ To always respect, support, and care</li>
            <li>🎉 To keep things fun and real</li>
            <li>🛑 To never make this feel like a “job”</li>
          </ul>

          <div className="cert-footer">
            <div>
              <p><strong>Effective from:</strong> The moment you smiled reading this</p>
              {downloadTime && <p style={{ fontSize: '0.8rem', marginTop: '5px', color: '#888' }}><strong>Accepted On:</strong> {downloadTime}</p>}
            </div>
            <p className="signature">💖 Signed,<br />Someone who clearly likes you a lot</p>
          </div>

          <button onClick={downloadCertificate} className="btn-primary hide-on-print" style={{ marginTop: '30px' }}>Claim Position!</button>
        </div>
      </div>
    </>
  );
}
