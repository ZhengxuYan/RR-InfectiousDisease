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

async function fetchAndDisplayJSON() {
  try {
    const team_dict = {
      "Public Health, Social Sciences, and Humanities": "team1_results.json",
      "Medical Sciences": "team2_results.json",
      "Biological & Chemical Sciences | Physical Sciences & Engineering": "team3_results.json"
    };
    const response = await fetch("tables/" + team_dict[selectedOptionText]);
    let jsonData = await response.json(); // Parse the response as JSON

    // Get the number of rows the user wants to display
    const numberOfRows = parseInt(document.getElementById("numberInput").value, 10);
    // If the input is a number, slice the jsonData to that length
    if (!isNaN(numberOfRows)) {
      jsonData = jsonData.slice(0, numberOfRows);
    }

    generateTableFromJSON(jsonData); // Use a modified function to generate table from JSON
  } catch (error) {
    console.error("Failed to fetch JSON:", error);
  }
}

function generateTableFromJSON(data) {
  const input = document.getElementById("passwordInput").value;
  if (input !== correctPassword) {
    alert("Please enter the correct password first.");
    return;
  }
  const table = document.createElement("table");
  table.setAttribute("class", "data-table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.style.marginTop = "20px";

  // Assuming the first object's keys can be headers
  if (data.length > 0) {
    const headers = Object.keys(data[0]);
    generateTableRow(table, headers, true); // Generate the header row
  }

  // Generate table rows from JSON data
  data.forEach((item) => {
    const row = Object.values(item);
    generateTableRow(table, row, false);
  });

  const output = document.getElementById("outputTable");
  output.innerHTML = ""; // Clear previous content
  output.appendChild(table);
  output.classList.remove("hidden");
}

function generateTableRow(table, rowData, isHeader) {
  const tr = document.createElement("tr");
  rowData.forEach((cell, index) => {
    const cellElement = document.createElement(isHeader ? "th" : "td");
    cellElement.textContent = cell;
    // Apply styling as needed, similar to the original function
    tr.appendChild(cellElement);
  });
  table.appendChild(tr);
}
