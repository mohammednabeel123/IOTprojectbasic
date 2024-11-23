const toggleButton = document.getElementById("toggleButton");

toggleButton.addEventListener("click", () => {
  // Disable the button while waiting for the response
  toggleButton.disabled = true;

  const command = toggleButton.innerText.includes("ON") ? "ON" : "OFF";

  fetch(`http://localhost:3000/${command}`) // Send the command to the server
    .then((response) => response.text())
    .then((data) => {
      console.log(data); // Log the response from the server

      // Toggle button text based on the current state
      if (command === "ON") {
        toggleButton.innerText = "Turn LED OFF";
      } else {
        toggleButton.innerText = "Turn LED ON";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      // Re-enable the button after a brief delay (to prevent quick re-clicks)
      setTimeout(() => {
        toggleButton.disabled = false;
      }, 500); // 500 ms delay
    });
});
