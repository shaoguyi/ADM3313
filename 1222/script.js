document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskName = document.getElementById('taskName').value;
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const duration = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1; // Calculate duration in days

    addTaskToTable(taskName, startDate, endDate, duration);
    sortTableByEndDate();
});

function addTaskToTable(taskName, startDate, endDate, duration) {
    const tableBody = document.getElementById('scheduleTable').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow(tableBody.rows.length);

    newRow.insertCell(0).textContent = taskName;
    newRow.insertCell(1).textContent = startDate.toISOString().split('T')[0];
    newRow.insertCell(2).textContent = endDate.toISOString().split('T')[0];
    newRow.insertCell(3).textContent = duration;
}

function sortTableByEndDate() {
    const table = document.getElementById('scheduleTable');
    const rows = Array.from(table.rows).slice(1); // Get all rows except the header
    rows.sort((a, b) => {
        const endDateA = new Date(a.cells[2].textContent);
        const endDateB = new Date(b.cells[2].textContent);
        return endDateA - endDateB;
    });

    // Reinsert sorted rows
    for (let i = 0; i < rows.length; i++) {
        table.tBodies[0].appendChild(rows[i]);
    }
}
