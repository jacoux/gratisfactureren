// script.js
document.addEventListener('DOMContentLoaded', () => {
    const invoiceIdInput = document.getElementById('invoiceId');
    const dateIssueInput = document.getElementById('dateIssue');
    const dueDateInput = document.getElementById('dueDate');
    const senderNameInput = document.getElementById('senderName');
    const senderAddressInput = document.getElementById('senderAddress');
    const senderEmailInput = document.getElementById('senderEmail');
    const clientNameInput = document.getElementById('clientName');
    const clientAddressInput = document.getElementById('clientAddress');
    const clientEmailInput = document.getElementById('clientEmail');
    const notesInput = document.getElementById('notes');
    const tasksContainer = document.getElementById('tasks');
    const invoicePreview = document.getElementById('invoicePreview');
    const addTaskButton = document.getElementById('addTask');
    const generateInvoiceButton = document.getElementById('generateInvoice');

    function updatePreview() {
        const invoiceId = invoiceIdInput.value;
        const dateIssue = dateIssueInput.value;
        const dueDate = dueDateInput.value;
        const senderName = senderNameInput.value;
        const senderAddress = senderAddressInput.value;
        const senderEmail = senderEmailInput.value;
        const clientName = clientNameInput.value;
        const clientAddress = clientAddressInput.value;
        const clientEmail = clientEmailInput.value;
        const notes = notesInput.value;

        let tasksHTML = '';
        const tasks = tasksContainer.getElementsByClassName('task');
        let totalAmount = 0;
        Array.from(tasks).forEach(task => {
            const description = task.getElementsByClassName('taskDescription')[0].value;
            const hours = task.getElementsByClassName('taskHours')[0].value;
            const rate = task.getElementsByClassName('taskRate')[0].value;
            const total = hours * rate;
            totalAmount += total;
            tasksHTML += `
                <div class="task">
                    <div>${description}</div>
                    <div>${hours} hours</div>
                    <div>$${rate}</div>
                    <div>$${total.toFixed(2)}</div>
                </div>
            `;
        });

        invoicePreview.innerHTML = `
            <div class="invoice-header">
                <div>
                    <strong>From:</strong>
                    <p>${senderName}</p>
                    <p>${senderAddress}</p>
                    <p>${senderEmail}</p>
                </div>
                <div>
                    <strong>To:</strong>
                    <p>${clientName}</p>
                    <p>${clientAddress}</p>
                    <p>${clientEmail}</p>
                </div>
            </div>
            <div>
                <strong>Invoice ID:</strong> ${invoiceId}<br>
                <strong>Date Issue:</strong> ${dateIssue}<br>
                <strong>Due Date:</strong> ${dueDate}
            </div>
            <div class="invoice-body">
                ${tasksHTML}
            </div>
            <div class="invoice-footer">
                <strong>Total Amount:</strong> $${totalAmount.toFixed(2)}
            </div>
            <div>
                <strong>Notes:</strong>
                <p>${notes}</p>
            </div>
        `;
    }

    invoiceIdInput.addEventListener('input', updatePreview);
    dateIssueInput.addEventListener('input', updatePreview);
    dueDateInput.addEventListener('input', updatePreview);
    senderNameInput.addEventListener('input', updatePreview);
    senderAddressInput.addEventListener('input', updatePreview);
    senderEmailInput.addEventListener('input', updatePreview);
    clientNameInput.addEventListener('input', updatePreview);
    clientAddressInput.addEventListener('input', updatePreview);
    clientEmailInput.addEventListener('input', updatePreview);
    notesInput.addEventListener('input', updatePreview);
    tasksContainer.addEventListener('input', updatePreview);

    addTaskButton.addEventListener('click', () => {
        const newTask = document.createElement('div');
        newTask.className = 'task';
        newTask.innerHTML = `
            <input type="text" placeholder="Input your task" class="taskDescription">
            <input type="number" placeholder="0" class="taskHours">
            <input type="number" placeholder="0" class="taskRate">
        `;
        tasksContainer.appendChild(newTask);
        updatePreview();
    });

    generateInvoiceButton.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.html(invoicePreview, {
            callback: function (doc) {
                doc.save('invoice.pdf');
            },
            x: 10,
            y: 10
        });
    });

    updatePreview();
});
