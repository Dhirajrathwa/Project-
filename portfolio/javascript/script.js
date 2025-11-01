  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('successMsg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get input values
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    let isValid = true;

    // Reset previous messages
    document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
    successMsg.textContent = '';

    // Validate Name
    if (name.value.trim() === '') {
      showError(name, 'Please enter your name.');
      isValid = false;
    }

    // Validate Email
    if (email.value.trim() === '') {
      showError(email, 'Please enter your email.');
      isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
      showError(email, 'Please enter a valid email.');
      isValid = false;
    }

    // Validate Message
    if (message.value.trim() === '') {
      showError(message, 'Please enter your message.');
      isValid = false;
    }

    // If all valid
    if (isValid) {
      successMsg.textContent  = alert('✅ Message sent successfully!');
      form.reset();
    }
  });

  function showError(input, message) {
    const errorEl = input.parentElement.querySelector('.error-msg');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }

  function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
