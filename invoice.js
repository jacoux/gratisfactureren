function addProductLine() {
    const productContainer = document.getElementById('productContainer');
    const productIndex = productContainer.childElementCount + 1;

    const productDiv = document.createElement('div');
    productDiv.classList.add( 'flex-auto-prod', 'grid-cols-1', 'md:grid-cols-5', 'gap-3', 'mb-4');

    productDiv.innerHTML = `
        <div class="col-span-2">
            <label for="productDescription${productIndex}" class="block text-sm font-medium text-gray-700">Beschrijving</label>
            <input type="text" id="productDescription${productIndex}" class="mt-1 block w-full">
        </div>
        <div>
            <label for="productQuantity${productIndex}" class="block text-sm font-medium text-gray-700">Hoeveelheid</label>
            <input type="number" id="productQuantity${productIndex}" class="mt-1 block w-full">
        </div>
        <div>
            <label for="productPrice${productIndex}" class="block text-sm font-medium text-gray-700">Prijs</label>
            <input type="number" id="productPrice${productIndex}" class="mt-1 block w-full">
        </div>
        <div>
            <label for="productTotal${productIndex}" class="block text-sm font-medium text-gray-700">Total</label>
            <p> Wordt automatisch berekend op de factuur </p>
        </div>
    `;

    productContainer.appendChild(productDiv);
}

function readImage(file, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
        callback(event.target.result);
    };
    reader.readAsDataURL(file);
}

function generateInvoice() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
        generatePDFContent(doc);
}

// function generatePDFContent(doc) {
//     const senderCompanyName = document.getElementById('senderCompanyName').value;
//     const senderStreet = document.getElementById('senderStreet').value;
//     const senderPostcode = document.getElementById('senderPostcode').value;
//     const senderCity = document.getElementById('senderCity').value;
//     const senderVatNumber = document.getElementById('senderVatNumber').value;
//     const currency = document.getElementById('currency').value;

//     const clientName = document.getElementById('clientName').value;
//     const clientStreet = document.getElementById('clientStreet').value;
//     const clientPostcode = document.getElementById('clientPostcode').value;
//     const clientCity = document.getElementById('clientCity').value;
//     const clientVatNumber = document.getElementById('clientVatNumber').value;

//     const creationDate = document.getElementById('creationDate').value;
//     const dueDate = document.getElementById('dueDate').value;

//     doc.setFontSize(12);
//     doc.text('Bedrijf:', 10, 70);
//     doc.text(`Bedrijfsnaam: ${senderCompanyName}`, 10, 80);
//     doc.text(`Straat: ${senderStreet}`, 10, 90);
//     doc.text(`Postcode: ${senderPostcode}`, 10, 100);
//     doc.text(`Stad: ${senderCity}`, 10, 110);
//     doc.text(`BTW nummer: ${senderVatNumber}`, 10, 120);

//     doc.text('Klant:', 110, 70);
//     doc.text(`Klant naam: ${clientName}`, 110, 80);
//     doc.text(`Straat + nummer: ${clientStreet}`, 110, 90);
//     doc.text(`Postcode: ${clientPostcode}`, 110, 100);
//     doc.text(`Stad: ${clientCity}`, 110, 110);
//     doc.text(`Btw nummer: ${clientVatNumber}`, 110, 120);

//     doc.text(`Aanmaakdatum: ${creationDate}`, 10, 140);
//     doc.text(`Uiterste betaaldatum: ${dueDate}`, 110, 140);

//     const products = [];
//     const productContainer = document.getElementById('productContainer');
//     for (let i = 0; i < productContainer.childElementCount; i++) {
//         const productIndex = i + 1;
//         const description = document.getElementById(`productDescription${productIndex}`).value;
//         const quantity = parseInt(document.getElementById(`productQuantity${productIndex}`).value);
//         const price = parseFloat(document.getElementById(`productPrice${productIndex}`).value);
//         const total = quantity * price;
//         products.push({ description, quantity, price, total });
//     }

//     doc.text('Products:', 10, 160);
//     let y = 170;
//     products.forEach(product => {
//         doc.text(`Beschrijving: ${product.description}`, 10, y);
//         doc.text(`Hoeveelheid: ${product.quantity}`, 80, y);
//         doc.text(`Prijs: ${currency} ${product.price}`, 110, y);
//         doc.text(`Totaal: ${currency} ${product.total}`, 140, y);
//         y += 10;
//     });

//     const subtotal = products.reduce((sum, product) => sum + product.total, 0);
//     const tax = subtotal * 0.1;
//     const total = subtotal + tax;

//     doc.text(`Subtotaal: ${currency} ${subtotal.toFixed(2)}`, 10, y + 20);
//     doc.text(`BTW (21%): ${tax.toFixed(2)}`, 10, y + 30);
//     doc.text(`Totaal: ${currency} ${total.toFixed(2)}`, 10, y + 40);

//     doc.save('invoice.pdf');
// }

function generatePDFContent(doc) {
     const invoiceNumber = document.getElementById('invoiceNumber').value;
     const invoiceRef= document.getElementById('invoiceRef').value;
    const senderCompanyName = document.getElementById('senderCompanyName').value;
    const senderStreet = document.getElementById('senderStreet').value;
    const senderPostcode = document.getElementById('senderPostcode').value;
    const senderCity = document.getElementById('senderCity').value;
    const senderVatNumber = document.getElementById('senderVatNumber').value;
    const currency = document.getElementById('currency').value;

    const clientName = document.getElementById('clientName').value;
    const clientStreet = document.getElementById('clientStreet').value;
    const clientPostcode = document.getElementById('clientPostcode').value;
    const clientCity = document.getElementById('clientCity').value;
    const clientVatNumber = document.getElementById('clientVatNumber').value;

    const creationDate = document.getElementById('creationDate').value;
    const dueDate = document.getElementById('dueDate').value;

    // Add background color
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');

    // Set font and colors
    doc.setFontSize(10);
    doc.setTextColor(40);

    // Sender and Client details in 2 columns
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text(`factuur nummer: ${invoiceNumber}`, 10, 10);
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text(senderCompanyName, 10, 20);
    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.text(`${senderStreet}`, 10, 26);
    doc.text(`${senderPostcode} ${senderCity}`, 10, 32);
    doc.text(`BTW nummer: ${senderVatNumber}`, 10, 38);

   doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text(`${invoiceRef}`, 110, 10);
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text('Klant:', 110, 20);
    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.text(clientName, 110, 26);
    doc.text(`${clientStreet}`, 110, 32);
    doc.text(`${clientPostcode} ${clientCity}`, 110, 38);
    doc.text(`Btw nummer: ${clientVatNumber}`, 110, 44);

    // Dates
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Aanmaakdatum:', 10, 60);
    doc.setTextColor(50);
    doc.text(creationDate, 50, 60);
    doc.setTextColor(0);
    doc.text('Uiterste betaaldatum:', 110, 60);
    doc.setTextColor(50);
    doc.text(dueDate, 160, 60);

    // Products table
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Producten', 10, 80);

    const tableColumn = ["Beschrijving", "Hoeveelheid", "Prijs", "Totaal"];
    const tableRows = [];

    const products = [];
    const productContainer = document.getElementById('productContainer');
    for (let i = 0; i < productContainer.childElementCount; i++) {
        const productIndex = i + 1;
        const description = document.getElementById(`productDescription${productIndex}`).value;
        const quantity = parseInt(document.getElementById(`productQuantity${productIndex}`).value);
        const price = parseFloat(document.getElementById(`productPrice${productIndex}`).value);
        const total = quantity * price;
        products.push({ description, quantity, price, total });
    }

    products.forEach(product => {
        const productData = [
            product.description,
            product.quantity.toString(),
            `${currency} ${product.price.toFixed(2)}`,
            `${currency} ${product.total.toFixed(2)}`
        ];
        tableRows.push(productData);
    });

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 90,
        theme: 'striped',
        headStyles: {
            fillColor: [22, 160, 133],
            textColor: 255,
            fontSize: 12
        },
        styles: {
            fontSize: 10
        },
        footStyles: {
            fillColor: [22, 160, 133],
            textColor: 255,
            fontSize: 12
        }
    });

    const finalY = doc.previousAutoTable.finalY + 10;

    const subtotal = products.reduce((sum, product) => sum + product.total, 0);
    const tax = subtotal * 0.21; // 21% tax
    const total = subtotal + tax;

    // Totals
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Subtotaal:`, 10, finalY);
    doc.setTextColor(50);
    doc.text(`${currency} ${subtotal.toFixed(2)}`, 50, finalY);

    doc.setTextColor(0);
    doc.text(`BTW (21%):`, 10, finalY + 6);
    doc.setTextColor(50);
    doc.text(`${currency} ${tax.toFixed(2)}`, 50, finalY + 6);

    doc.setTextColor(0);
    doc.text(`Totaal:`, 10, finalY + 12);
    doc.setTextColor(50);
    doc.text(`${currency} ${total.toFixed(2)}`, 50, finalY + 12);

    doc.save('invoice.pdf');
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generateInvoice').addEventListener('click', generateInvoice);
    document.getElementById('addProduct').addEventListener('click', addProductLine);
});
