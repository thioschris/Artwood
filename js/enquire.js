// Enquiry form handling
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('enquireForm');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // In a real implementation, you would:
    // 1. Validate the form
    // 2. Send data to a backend/email service (e.g. Formspree, Netlify Forms, custom API)
    // 3. Show success/error message

    // For now, show a simple confirmation
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Thank you! We\'ll be in touch soon.';
    submitBtn.disabled = true;
    submitBtn.style.background = 'var(--teal-muted)';
    submitBtn.style.borderColor = 'var(--teal-muted)';

    // Scroll to show the message
    submitBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Optional: Log form data for debugging (remove in production)
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('Form submitted:', data);

    // To integrate with a service like Formspree, add:
    // fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   body: formData,
    //   headers: { 'Accept': 'application/json' }
    // }).then(response => { ... });
  });
});
