document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const response = await fetch("https://YOUR_BACKEND_URL/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    }),
  });

  const data = await response.json();
  alert(data.message || "Message Sent");
});
