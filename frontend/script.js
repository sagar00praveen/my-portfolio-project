document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const button = this.querySelector('button');
    button.disabled = true;
    button.textContent = 'Sending...';

    const feedback = document.createElement('div');
    feedback.style.marginTop = '1rem';
    feedback.style.fontWeight = 'bold';
    feedback.style.color = '#0f172a';

    fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
    })
        .then(response => response.json())
        .then(data => {
            feedback.textContent = '✅ Message sent successfully!';
            feedback.style.color = 'green';
            document.getElementById('contactForm').appendChild(feedback);

            // Reset form fields
            document.getElementById('contactForm').reset();
        })
        .catch(error => {
            feedback.textContent = '❌ Failed to send message. Please try again.';
            feedback.style.color = 'red';
            document.getElementById('contactForm').appendChild(feedback);
            console.error(error);
        })
        .finally(() => {
            button.disabled = false;
            button.textContent = 'Send Message';
        });
});
