// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

  // Programmatically play the hero background video to bypass browser autoplay blocks and set playback speed
  const heroVideo = document.querySelector('.hero-video-bg');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.playbackRate = 0.5; // Slow down video to 0.5x
    heroVideo.play().catch(err => {
      console.log('Video autoplay prevented by browser. Will attempt play on first user interaction.', err);
      const playVideoBackup = () => {
        heroVideo.playbackRate = 0.5;
        heroVideo.play();
        window.removeEventListener('click', playVideoBackup);
        window.removeEventListener('scroll', playVideoBackup);
      };
      window.addEventListener('click', playVideoBackup);
      window.addEventListener('scroll', playVideoBackup);
    });
  }

  // =========================================================================
  // Mobile Navigation Drawer Toggle
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
    });
  }

  if (drawerCloseBtn && mobileDrawer) {
    drawerCloseBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  }

  // Close drawer when clicking links
  const drawerLinks = mobileDrawer ? mobileDrawer.querySelectorAll('a') : [];
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  });

  // =========================================================================
  // Locations Slider Logic (Working Demonstration)
  // =========================================================================
  const locations = [
    {
      name: "Marietta - Powers Ferry Rd",
      address: "80 Powers Ferry Rd, Marietta, GA 30067",
      phone: "770-570-5201"
    },
    {
      name: "Tampa - Dale Mabry Hwy",
      address: "3802 N Dale Mabry Hwy, Tampa, FL 33607",
      phone: "813-870-1234"
    },
    {
      name: "Atlanta - Peachtree Rd",
      address: "3300 Peachtree Rd NE, Atlanta, GA 30326",
      phone: "404-233-5678"
    }
  ];

  let currentLocIndex = 0;
  const locNameEl = document.querySelector('.location-name');
  const locAddressEl = document.querySelector('.location-address');
  const locPhoneEl = document.querySelector('.location-phone');
  const arrowPrev = document.getElementById('loc-prev-arrow');
  const arrowNext = document.getElementById('loc-next-arrow');

  function updateLocation(index) {
    // Fade out text overlay card
    gsap.to('#location-info-card', {
      opacity: 0,
      y: 10,
      duration: 0.25,
      onComplete: () => {
        // Change text
        if (locNameEl) locNameEl.textContent = locations[index].name;
        if (locAddressEl) locAddressEl.textContent = locations[index].address;
        if (locPhoneEl) {
          locPhoneEl.innerHTML = `<i class="fa-solid fa-phone"></i> ${locations[index].phone}`;
          locPhoneEl.setAttribute('href', `tel:${locations[index].phone.replace(/[^0-9]/g, '')}`);
        }
        
        // Fade in
        gsap.to('#location-info-card', {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power1.out'
        });
      }
    });

    // Subtly animate the salon image container
    gsap.fromTo('.salon-img', 
      { scale: 1.03 },
      { scale: 1, duration: 0.6, ease: 'power1.out' }
    );
  }

  if (arrowPrev && arrowNext) {
    arrowPrev.addEventListener('click', () => {
      currentLocIndex = (currentLocIndex - 1 + locations.length) % locations.length;
      updateLocation(currentLocIndex);
    });

    arrowNext.addEventListener('click', () => {
      currentLocIndex = (currentLocIndex + 1) % locations.length;
      updateLocation(currentLocIndex);
    });
  }



  // =========================================================================
  // Snappy GSAP Animations (Scroll reveals)
  // =========================================================================

  // 1. Hero Load Entry Animation
  const heroTl = gsap.timeline();
  
  heroTl.from('.navbar', {
    y: -60,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  });

  heroTl.from('.hero-tag', {
    y: 15,
    opacity: 0,
    duration: 0.5,
    ease: 'power1.out'
  }, '-=0.3');

  heroTl.from('.hero-title', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.3');

  heroTl.from('.hero-desc', {
    y: 15,
    opacity: 0,
    duration: 0.5,
    ease: 'power1.out'
  }, '-=0.4');

  heroTl.from('.hero-buttons .btn', {
    y: 10,
    opacity: 0,
    stagger: 0.1,
    duration: 0.4,
    ease: 'power1.out'
  }, '-=0.3');

  heroTl.from('#hero-trust-rating', {
    opacity: 0,
    y: 10,
    duration: 0.4
  }, '-=0.2');

  heroTl.from('.hero-video-bg', {
    scale: 1.05,
    opacity: 0,
    duration: 1.2,
    ease: 'power2.out'
  }, '-=0.8');

  heroTl.from('.hero-video-overlay', {
    opacity: 0,
    duration: 0.8
  }, '-=0.8');

  // 2. Services Section Reveal (Fixed Trigger to 95% and Cleaner selector)
  gsap.from('.services-section .section-header', {
    scrollTrigger: {
      trigger: '.services-section',
      start: 'top 95%',
      toggleActions: 'play none none none'
    },
    y: 15,
    duration: 0.5,
    ease: 'power2.out'
  });

  gsap.from('.service-card', {
    scrollTrigger: {
      trigger: '.services-grid',
      start: 'top 95%',
      toggleActions: 'play none none none'
    },
    y: 20,
    stagger: 0.05,
    duration: 0.5,
    ease: 'power2.out'
  });

  // 3. Locations Section Reveal
  gsap.from('.locations-text-col', {
    scrollTrigger: {
      trigger: '.locations-section',
      start: 'top 95%',
      toggleActions: 'play none none none'
    },
    x: -30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  });

  gsap.from('.locations-image-col', {
    scrollTrigger: {
      trigger: '.locations-section',
      start: 'top 95%',
      toggleActions: 'play none none none'
    },
    x: 30,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out'
  });

  // 4. Meet Our Story & Social Impact Section (Founder Portrait Split)
  gsap.from('#story-content-col', {
    scrollTrigger: {
      trigger: '.story-section',
      start: 'top 95%',
      toggleActions: 'play none none none'
    },
    x: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  });

  gsap.from('#story-founder-photo', {
    scrollTrigger: {
      trigger: '.story-section',
      start: 'top 95%',
      toggleActions: 'play none none none'
    },
    x: -30,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out'
  });

  gsap.from('.story-stat-item', {
    scrollTrigger: {
      trigger: '.story-stats-row',
      start: 'top 95%',
      toggleActions: 'play none none none'
    },
    y: 15,
    opacity: 0,
    stagger: 0.08,
    duration: 0.5,
    ease: 'power2.out'
  });

  // 5. App Section
  gsap.from('.app-text-col', {
    scrollTrigger: {
      trigger: '.app-section',
      start: 'top 95%',
      toggleActions: 'play none none none'
    },
    x: -30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  });

  gsap.from('.app-mockup-col', {
    scrollTrigger: {
      trigger: '.app-section',
      start: 'top 95%',
      toggleActions: 'play none none none'
    },
    x: 30,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out'
  });

  // 6. CTA Banner
  gsap.from('.cta-container', {
    scrollTrigger: {
      trigger: '#ready-cta',
      start: 'top 95%',
      toggleActions: 'play none none none'
    },
    scale: 0.98,
    opacity: 0,
    duration: 0.6,
    ease: 'power1.out'
  });

  // 7. Reviews Section
  gsap.from('.reviews-section .section-header', {
    scrollTrigger: {
      trigger: '.reviews-section',
      start: 'top 95%',
      toggleActions: 'play none none none'
    },
    y: 15,
    duration: 0.5,
    ease: 'power2.out'
  });

  gsap.from('.review-card', {
    scrollTrigger: {
      trigger: '.reviews-carousel-wrapper',
      start: 'top 95%',
      toggleActions: 'play none none none'
    },
    y: 20,
    stagger: 0.08,
    duration: 0.5,
    ease: 'power2.out'
  });

  // Testimonials slide transitions (dummy arrow support)
  const arrowTPrev = document.getElementById('rev-prev-arrow');
  const arrowTNext = document.getElementById('rev-next-arrow');
  if (arrowTPrev && arrowTNext) {
    const handleTestimonialTransition = () => {
      gsap.fromTo('.review-card', 
        { scale: 0.98, opacity: 1 },
        { scale: 1, opacity: 1, stagger: 0.05, duration: 0.4, ease: 'power1.out' }
      );
    };

    arrowTPrev.addEventListener('click', handleTestimonialTransition);
    arrowTNext.addEventListener('click', handleTestimonialTransition);
  }

  // =========================================================================
  // Recalculate ScrollTrigger points after page is fully loaded
  // (Fixes markers off-sync when slow images load later and expand layouts)
  // =========================================================================
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

});

