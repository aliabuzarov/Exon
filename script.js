/**
 * MASTER ESTETİK KLİNİKA - INTERACTIVE JAVASCRIPT
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

  let queryText = 'Mütəxəssis və prosedur təyin edildi.';
  if (doctorType || specialist) {
    const parts = [];
    if (doctorType) parts.push(`Həkim: ${doctorType}`);
    if (specialist) parts.push(`Xidmət: ${specialist}`);
    queryText = `${parts.join(' | ')} üzrə qəbul üçün vaxt təyin edilir...`;
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

  if (tag.includes('Eltəkin') && doctorSelect) {
    doctorSelect.value = 'Dr. Eltəkin Səfərəliyev';
  } else if (tag.includes('Gülnar') && doctorSelect) {
    doctorSelect.value = 'Dr. Gülnar Səfərəliyeva';
  } else if (tag.includes('Gülnur') && doctorSelect) {
    doctorSelect.value = 'Dr. Gülnur Rüstəmova';
  }

  if (tag.includes('Tipplastika') && deptSelect) {
    deptSelect.value = 'Tipplastika & Estetik Burun';
  } else if (tag.includes('Rentgen') && deptSelect) {
    deptSelect.value = '3D Stomatoloji Rentgen';
  } else if (tag.includes('Dermatologiya') && deptSelect) {
    deptSelect.value = 'Dermatologiya & Dəri Qulluğu';
  }

  showToast(`Seçildi: ${tag}`);
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
 * Booking Modal Handling & Direct WhatsApp Integration
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
  showToast(`Təşəkkür edirik ${name}! WhatsApp vasitəsilə sorğunuz yönləndirilir...`);

  // WhatsApp Message String
  const waMessage = `Salam Master Estetik Klinika,%0A%0AQəbula yazılmaq istəyirəm:%0A👤 Pasient: ${encodeURIComponent(name)}%0A📞 Nömrə: ${encodeURIComponent(phone)}%0A👨‍⚕️ Həkim: ${encodeURIComponent(doctor)}%0A🩺 Xidmət: ${encodeURIComponent(dept)}%0A📅 Tarix: ${encodeURIComponent(date)}`;

  // Redirect to official WhatsApp number
  setTimeout(() => {
    window.open(`https://wa.me/994505883338?text=${waMessage}`, '_blank');
  }, 1000);

  document.getElementById('appointment-form').reset();
}

/* ---------------------------------------------------------
 * Service Modal Handling
 * --------------------------------------------------------- */
const serviceDescriptions = {
  'Tipplastika və Estetik Prosedurlar': 'Tipplastika burun ucunun estetik və zərif formaya salınması əməliyyatıdır. Həmçinin klinika daxilində dodaq dolğusu, biorevitalizasiya, botulinoterapiya və digər qabaqcıl estetik prosedurlar tətbiq olunur.',
  'Stomatoloji Xidmətlər və Rentgen': 'Dişlərin bərpası, estetik zirkonium vinirlər, müasir implantasiya, ağardılma və klinika daxili yüksək dəqiqlikli stomatoloji rentgen diaqnostikası.',
  'Dermatologiya və Tibbi Qulluq': 'Akne, piqmentasiya, yaşlanma əleyhinə tibbi pilinqlər, mezoterapiya, plazmaterapiya və fərdi dəri qulluq proqramları.'
};

function openServiceModal(serviceTitle) {
  const modal = document.getElementById('service-modal');
  const titleEl = document.getElementById('service-modal-title');
  const descEl = document.getElementById('service-modal-desc');

  if (modal && titleEl && descEl) {
    titleEl.textContent = serviceTitle;
    descEl.textContent = serviceDescriptions[serviceTitle] || 'Master Estetik Klinikada ən müasir texnologiyalar ilə xidmətinizdəyik.';
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
