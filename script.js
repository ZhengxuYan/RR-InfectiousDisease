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
    // Adjust the dictionary to point to JSON files instead of CSV
    const team_dict = {
      "Public Health, Social Sciences, and Humanities": "team1_results.json",
      "Medical Sciences": "team2_results.json",
      "Biological & Chemical Sciences | Physical Sciences & Engineering": "team3_results.json"
    };
    const response = await fetch("tables/" + team_dict[selectedOptionText]);
    const jsonData = await response.json(); // Parse the response as JSON
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

async function fetchAndDisplayJSON() {
    try {
      // Adjust the dictionary to point to JSON files instead of CSV
      const team_dict = {
        "Public Health, Social Sciences, and Humanities": "team1_results.json",
        "Medical Sciences": "team2_results.json",
        "Biological & Chemical Sciences | Physical Sciences & Engineering": "team3_results.json"
      };
      const response = await fetch("tables/" + team_dict[selectedOptionText]);
      const jsonData = await response.json(); // Parse the response as JSON
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
  

// async function fetchAndDisplayCSV() {
//   try {
//     // const response = await fetch("tables/arxiv_results.csv");
//     team_dict = {
//         "Public Health, Social Sciences, and Humanities": "team1_results.csv",
//         "Medical Sciences": "team2_results.csv",
//         "Biological & Chemical Sciences | Physical Sciences & Engineering": "team3_results.csv"
//     }
//     const response = await fetch("tables/" + team_dict[selectedOptionText]);
//     const csvText = await response.text();
//     const data = parseCSV(csvText);
//     generateTable(data); // Use the previously discussed generateTable function
//   } catch (error) {
//     console.error("Failed to fetch CSV:", error);
//   }
// }

// // function parseCSV(text) {
// //   const lines = text
// //     .split("\n")
// //     .map((line) => line.trim())
// //     .filter((line) => line);
// //   return lines.map((line) => line.split(","));
// // }

// function generateTable(data) {
//   const input = document.getElementById("passwordInput").value;
//   if (input !== correctPassword) {
//     alert("Please enter the correct password first.");
//     return;
//   }
//   const table = document.createElement("table");
//   table.setAttribute("class", "data-table"); // Class for external styling if needed
//   table.style.width = "100%";
//   table.style.borderCollapse = "collapse";
//   table.style.marginTop = "20px";

//   data.forEach((row, index) => {
//     const tr = document.createElement("tr");
//     if (index % 2 === 0) {
//       tr.style.backgroundColor = "#f9f9f9"; // Lighter gray for even rows
//     } else {
//       tr.style.backgroundColor = "#e9e9e9"; // Darker gray for odd rows
//     }

//     row.forEach((cell) => {
//       const cellElement = document.createElement(index === 0 ? "th" : "td");
//       cellElement.textContent = cell;
//       cellElement.style.padding = "10px";
//       cellElement.style.border = "1px solid #ddd";
//       cellElement.style.borderBottom = "2px solid #ccc"; // Slightly darker border for the bottom
//       if (index === 0) {
//         cellElement.style.backgroundColor = "#4CAF50"; // Header background color
//         cellElement.style.color = "white"; // Header text color
//         cellElement.style.fontWeight = "bold";
//       }
//       tr.appendChild(cellElement);
//     });
//     table.appendChild(tr);
//   });

//   const output = document.getElementById("outputTable");
//   output.innerHTML = ""; // Clear previous content
//   output.appendChild(table);
//   output.classList.remove("hidden");
// }
