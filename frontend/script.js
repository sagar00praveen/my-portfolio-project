document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const statusMessage = document.getElementById('statusMessage');

  statusMessage.textContent = 'Sending...';
  statusMessage.style.color = 'lightblue';

  fetch('https://my-portfolio-project-w8q9.onrender.com/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  })
    .then(response => response.json())
    .then(data => {
      statusMessage.textContent = '✅ Message sent!';
      statusMessage.style.color = 'green';
      document.getElementById('contactForm').reset();
    })
    .catch(error => {
      console.error(error);
      statusMessage.textContent = '❌ Failed to send. Try again.';
      statusMessage.style.color = 'red';
    });
});
