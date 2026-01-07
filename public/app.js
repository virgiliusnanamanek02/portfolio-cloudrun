document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("askBtn");
  const input = document.getElementById("question");
  const output = document.getElementById("answer");

  btn.addEventListener("click", async () => {
    const question = input.value.trim();

    if (!question) {
      output.textContent = "Please ask something.";
      return;
    }

    const res = await fetch("/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    output.textContent = data.answer;
  });
});
