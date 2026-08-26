/**
 * HEALTHCARE DIGITAL PLATFORM - INTERACTIVE JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initTestimonialSlider();
  initScrollSpy();
});

/* ---------------------------------------------------------
 * Mobile Navigation Drawer Toggle
 * --------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const closeBtn = document.getElementById('mobile-close-btn');
  const overlay = document.getElementById('mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-book-btn');

  if (toggleBtn && overlay) {
    toggleBtn.addEventListener('click', () => {
      overlay.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
      overlay.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeMenu();
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }
}

/* ---------------------------------------------------------
 * Testimonial Slider
 * --------------------------------------------------------- */
function initTestimonialSlider() {
  const prevBtn = document.getElementById('t-prev');
  const nextBtn = document.getElementById('t-next');
  const cards = [
    document.getElementById('t-card-1'),
    document.getElementById('t-card-2')
  ].filter(Boolean);

  let currentIndex = 0;

  function showSlide(index) {
    cards.forEach((card, idx) => {
      if (idx === index) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  if (prevBtn && nextBtn && cards.length > 1) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === 0) ? cards.length - 1 : currentIndex - 1;
      showSlide(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === cards.length - 1) ? 0 : currentIndex + 1;
      showSlide(currentIndex);
    });
  }
}

/* ---------------------------------------------------------
 * Doctor & Procedure Search Form & Quick Filters
 * --------------------------------------------------------- */
function handleDoctorSearch() {
  const doctorType = document.getElementById('search-doctor-type').value;
  const specialist = document.getElementById('search-specialist').value;
  const location = document.getElementById('search-location').value;

  let queryText = 'Searching for all available medical specialists...';
  if (doctorType || specialist || location) {
    const parts = [];
    if (doctorType) parts.push(`Doctor: ${doctorType}`);
    if (specialist) parts.push(`Specialty: ${specialist}`);
    if (location) parts.push(`Location: ${location}`);
    queryText = `Found matching specialists for: ${parts.join(' | ')}`;
  }

  showToast(queryText);

  setTimeout(() => {
    openBookingModal();
    const doctorSelect = document.getElementById('patient-doctor');
    const deptSelect = document.getElementById('patient-dept');
    if (doctorType && doctorSelect) doctorSelect.value = doctorType;
    if (specialist && deptSelect) deptSelect.value = specialist;
  }, 500);
}

function quickFilter(tag) {
  const doctorSelect = document.getElementById('patient-doctor');
  const deptSelect = document.getElementById('patient-dept');

  if (tag.includes('Dentist') || tag.includes('Dental')) {
    if (deptSelect) deptSelect.value = 'Dental Wellness & Implants';
    if (doctorSelect) doctorSelect.value = 'Dr. David Vance';
  } else if (tag.includes('Aesthetic') || tag.includes('Surgery')) {
    if (deptSelect) deptSelect.value = 'Aesthetic & Plastic Care';
    if (doctorSelect) doctorSelect.value = 'Dr. Amanda Smith';
  } else if (tag.includes('Dermatology')) {
    if (deptSelect) deptSelect.value = 'Clinical Dermatology';
    if (doctorSelect) doctorSelect.value = 'Dr. Sarah Johnson';
  } else if (tag.includes('Checkup') || tag.includes('Cardiology')) {
    if (deptSelect) deptSelect.value = 'General Health Checkup';
    if (doctorSelect) doctorSelect.value = 'General Consultation';
  }

  showToast(`Filter applied: ${tag}`);
  openBookingModal();
}

function bookWithDoctor(doctorName) {
  openBookingModal();
  const doctorSelect = document.getElementById('patient-doctor');
  if (doctorSelect) {
    doctorSelect.value = doctorName;
  }
}

/* ---------------------------------------------------------
 * Booking Modal Handling
 * --------------------------------------------------------- */
function openBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Default tomorrow date
    const dateInput = document.getElementById('patient-date');
    if (dateInput && !dateInput.value) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.value = tomorrow.toISOString().split('T')[0];
    }
  }
}

function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function submitAppointment() {
  const name = document.getElementById('patient-name').value;
  const phone = document.getElementById('patient-phone').value;
  const doctor = document.getElementById('patient-doctor').value;
  const dept = document.getElementById('patient-dept').value;
  const date = document.getElementById('patient-date').value;

  closeBookingModal();
  showToast(`✅ Appointment confirmed for ${name} with ${doctor} on ${date}.`);
  document.getElementById('appointment-form').reset();
}

/* ---------------------------------------------------------
 * Service Modal Handling
 * --------------------------------------------------------- */
const serviceDescriptions = {
  'Ophthalmology & Aesthetics': 'Comprehensive vision care, corrective surgical consultations, aesthetic non-invasive treatments, and eye health diagnostics.',
  'Pathology & Dental Care': 'Advanced diagnostic laboratory testing, cosmetic dentistry, ceramic veneers, implants, and digital 3D dental imaging.',
  'Pulmonology & Dermatology': 'Clinical respiratory evaluations, allergy management, preventative dermatological therapies, and personalized skincare programs.'
};

function openServiceModal(serviceTitle) {
  const modal = document.getElementById('service-modal');
  const titleEl = document.getElementById('service-modal-title');
  const descEl = document.getElementById('service-modal-desc');

  if (modal && titleEl && descEl) {
    titleEl.textContent = serviceTitle;
    descEl.textContent = serviceDescriptions[serviceTitle] || 'Our medical center provides high-quality diagnostic and therapeutic care with certified specialists.';
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeServiceModal() {
  const modal = document.getElementById('service-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/* ---------------------------------------------------------
 * Toast Notification Utility
 * --------------------------------------------------------- */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add('show');

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ---------------------------------------------------------
 * Active Scroll Navigation (ScrollSpy)
 * --------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeBookingModal();
    closeServiceModal();
  }
});
