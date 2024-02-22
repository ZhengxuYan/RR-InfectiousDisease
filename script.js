const correctPassword = "123456"; // Set your password here

function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  if (input === correctPassword) {
    document.getElementById("passwordScreen").classList.add("hidden");
    document.getElementById("mainContent").classList.remove("hidden");
  } else {
    alert("Incorrect password, please try again.");
  }
}

let selectedOptionText = ""; // Variable to hold the selected option's text

function selectOption(optionNumber) {
    // Assuming your options are buttons as shown in your HTML
    const option = document.querySelector(`.option-button:nth-child(${optionNumber})`);
    selectedOptionText = option.textContent; // Get the text content of the selected option
    document.getElementById("numberInput").classList.remove("hidden");
    document.getElementById("submitButton").classList.remove("hidden");

    // Display the selected option
    const selectedOptionDisplay = document.getElementById("selectedOption");
    selectedOptionDisplay.textContent = "Selected Category: " + selectedOptionText;
    selectedOptionDisplay.classList.remove("hidden");
}

async function fetchAndDisplayCSV() {
  try {
    // Adjust the path to where your CSV file is located relative to the root of your website
    const response = await fetch("tables/arxiv_results.csv");
    const csvText = await response.text();
    const data = parseCSV(csvText);
    generateTable(data); // Use the previously discussed generateTable function
  } catch (error) {
    console.error("Failed to fetch CSV:", error);
  }
}

function parseCSV(text) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  return lines.map((line) => line.split(","));
}

function generateTable(data) {
  const input = document.getElementById("passwordInput").value;
  if (input !== correctPassword) {
    alert("Please enter the correct password first.");
    return;
  }
  const table = document.createElement("table");
  table.setAttribute("class", "data-table"); // Class for external styling if needed
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.style.marginTop = "20px";

  data.forEach((row, index) => {
    const tr = document.createElement("tr");
    if (index % 2 === 0) {
      tr.style.backgroundColor = "#f9f9f9"; // Lighter gray for even rows
    } else {
      tr.style.backgroundColor = "#e9e9e9"; // Darker gray for odd rows
    }

    row.forEach((cell) => {
      const cellElement = document.createElement(index === 0 ? "th" : "td");
      cellElement.textContent = cell;
      cellElement.style.padding = "10px";
      cellElement.style.border = "1px solid #ddd";
      cellElement.style.borderBottom = "2px solid #ccc"; // Slightly darker border for the bottom
      if (index === 0) {
        cellElement.style.backgroundColor = "#4CAF50"; // Header background color
        cellElement.style.color = "white"; // Header text color
        cellElement.style.fontWeight = "bold";
      }
      tr.appendChild(cellElement);
    });
    table.appendChild(tr);
  });

  const output = document.getElementById("outputTable");
  output.innerHTML = ""; // Clear previous content
  output.appendChild(table);
  output.classList.remove("hidden");
}
