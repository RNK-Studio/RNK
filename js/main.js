document.addEventListener("DOMContentLoaded", () => {
    // 1. Current Year in Footer
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Navbar shrink effect on scroll
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 3. Intersection Observer for Scroll Animations (Fade In & Slide Up)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("appear");
                observer.unobserve(entry.target); // only animate once
            }
        });
    }, observerOptions);

    // Grab elements to animate
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 4. Enhanced Cursor Follower (Blob + Dot + Ring)
    const cursorBlob = document.querySelector(".blob-cursor");
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorRing = document.querySelector(".cursor-ring");
    
    let mouseX = 0, mouseY = 0;
    let blobX = 0, blobY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let isTracking = false;

    window.addEventListener("mousemove", (e) => {
        if (!isTracking) {
            cursorBlob.classList.add("active");
            document.body.classList.add("cursor-active");
            isTracking = true;
            blobX = dotX = ringX = e.clientX;
            blobY = dotY = ringY = e.clientY;
        }
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursors() {
        // Different factors for multi-layered effect
        blobX += (mouseX - blobX) * 0.15;
        blobY += (mouseY - blobY) * 0.15;
        
        dotX += (mouseX - dotX) * 0.4; // Very Snappy
        dotY += (mouseY - dotY) * 0.4;
        
        ringX += (mouseX - ringX) * 0.25; // Balanced
        ringY += (mouseY - ringY) * 0.25;
        
        // Render
        cursorBlob.style.transform = `translate(${blobX - 300}px, ${blobY - 300}px)`; // 600px size / 2
        cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`; // 8px size / 2
        cursorRing.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`; // 40px size / 2
        
        requestAnimationFrame(animateCursors);
    }

    animateCursors();
});
