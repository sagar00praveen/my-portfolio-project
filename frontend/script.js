// Theme toggle
const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// Scroll animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.animate').forEach(section => {
  observer.observe(section);
});

// Contact form (with Resend-compatible backend)
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const feedback = document.getElementById("feedback");

  feedback.textContent = "Sending...";

  try {
    const res = await fetch("https://my-portfolio-project-w8q9.onrender.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    if (data.success) {
      feedback.textContent = "✅ Message sent!";
      feedback.style.color = "green";
      document.getElementById("contactForm").reset();
    } else {
      throw new Error("Send failed");
    }
  } catch (err) {
    feedback.textContent = "❌ Failed to send. Try again.";
    feedback.style.color = "red";
  }
});
