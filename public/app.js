document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("askBtn");
  const input = document.getElementById("question");
  const output = document.getElementById("answer");
  const loading = document.getElementById("loading");

  async function ask() {
    const question = input.value.trim();

    if (!question) {
      output.innerHTML = "<p class='text-red-600'>Please ask something.</p>";
      return;
    }

    // === UI: loading state ===
    btn.disabled = true;
    btn.classList.add("opacity-50", "cursor-not-allowed");
    loading.classList.remove("hidden");
    output.innerHTML = "";

    try {
      const res = await fetch("/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();

      // Render markdown -> HTML
      output.innerHTML = marked.parse(data.answer);
    } catch (err) {
      output.innerHTML = `
        <p class="text-red-600">
          Failed to get response. Please try again.
        </p>
      `;
      console.error(err);
    } finally {
      // === UI: reset ===
      btn.disabled = false;
      btn.classList.remove("opacity-50", "cursor-not-allowed");
      loading.classList.add("hidden");
    }
  }

  // Button click
  btn.addEventListener("click", ask);

  // Optional UX: Enter to submit (Shift+Enter for newline)
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      ask();
    }
  });
});
