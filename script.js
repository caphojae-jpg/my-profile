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
