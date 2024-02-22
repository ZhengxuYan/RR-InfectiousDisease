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

function selectOption(option) {
    // Placeholder for option selection handling
    console.log("Option selected:", option);
    document.getElementById("numberInput").classList.remove("hidden");
    document.getElementById("submitButton").classList.remove("hidden");
}

async function fetchAndDisplayCSV() {
    try {
        // Adjust the path to where your CSV file is located relative to the root of your website
        const response = await fetch('tables/arxiv_results.csv');
        const csvText = await response.text();
        const data = parseCSV(csvText);
        generateTable(data); // Use the previously discussed generateTable function
    } catch (error) {
        console.error("Failed to fetch CSV:", error);
    }
}

function parseCSV(text) {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    return lines.map(line => line.split(','));
}

function generateTable(data) {
    const table = document.createElement("table");
    data.forEach((row, index) => {
        const tr = document.createElement("tr");
        row.forEach(cell => {
            const td = document.createElement(index === 0 ? "th" : "td");
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    const output = document.getElementById("outputTable");
    output.innerHTML = ""; // Clear previous content
    output.appendChild(table);
    output.classList.remove("hidden");
}
