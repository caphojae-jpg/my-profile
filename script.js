// 갤러리 슬라이더: 화살표 · 점 클릭으로 이미지 전환
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('imageSlider');
  if (!slider) {
    return;
  }

  const track = slider.querySelector('.slider-track');
  const slides = slider.querySelectorAll('.slide');
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');
  const dots = slider.querySelectorAll('.slider-dot');
  let current = 0;

  const goTo = (index) => {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  };

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
});

// 관심사 카드: 스크롤로 화면에 들어올 때 하나씩 나타나는 효과
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.interest-card');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    cards.forEach((card) => card.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
  );

  cards.forEach((card) => observer.observe(card));
});

// 연락처 팝업: 상자를 클릭하면 열리고, Close 버튼 · 배경 클릭 · Esc 키로 닫힘
document.addEventListener('DOMContentLoaded', () => {
  const contactTrigger = document.getElementById('contactTrigger');
  const contactModal = document.getElementById('contactModal');
  const modalClose = document.getElementById('modalClose');

  if (!contactTrigger || !contactModal || !modalClose) {
    return;
  }

  const openModal = () => {
    contactModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    contactModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  contactTrigger.addEventListener('click', openModal);
  modalClose.addEventListener('click', closeModal);

  contactModal.addEventListener('click', (event) => {
    if (event.target === contactModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && contactModal.classList.contains('active')) {
      closeModal();
    }
  });
});
