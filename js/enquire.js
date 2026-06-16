// Enquiry form handling
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('enquireForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = form.querySelector('.btn-submit');
    submitBtn.textContent = 'Thank you! We\'ll be in touch soon.';
    submitBtn.disabled = true;
    submitBtn.style.background = 'var(--teal-muted)';
    submitBtn.style.borderColor = 'var(--teal-muted)';

    submitBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('Form submitted:', data);
  });
});
