document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const button = this.querySelector('button');

    // Disable the button while sending
    button.disabled = true;
    button.textContent = 'Sending...';

    // Clear previous feedback if exists
    const oldFeedback = document.getElementById('formFeedback');
    if (oldFeedback) oldFeedback.remove();

    // Feedback element
    const feedback = document.createElement('div');
    feedback.id = 'formFeedback';
    feedback.style.marginTop = '1rem';
    feedback.style.fontWeight = 'bold';

    fetch('https://your-backend.onrender.com/api/contact', { // ← Replace with your actual backend URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
    })
        .then(response => {
            if (!response.ok) throw new Error('Server error');
            return response.json();
        })
        .then(data => {
            feedback.textContent = '✅ Message sent successfully!';
            feedback.style.color = 'green';
            document.getElementById('contactForm').appendChild(feedback);
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
