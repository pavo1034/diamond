import jsPDFInvoiceTemplate from "jspdf-invoice-template";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import emailjs from '@emailjs/browser';

export const BrokerDetailsSummary = ({ selectedIds }) => {
  const [selectedBroker, setSelectedBroker] = useState(null);
  const pdfRef = useRef(null);
  const diamonds = useSelector((store) => store.diamonds.diamonds);


  const brokers = useSelector((store) => store.brokers.brokers);

  const details = selectedBroker || {};

   const totalQuantity = diamonds.reduce((sum, d) => sum + (d.qty ?? 1), 0);
   const totalCarats = diamonds.reduce((sum, d) => sum + d.carat, 0);
   const totalAmount = diamonds.reduce((sum, d) => sum + d.totalAmount, 0);
   const avgDiscount =
     diamonds.reduce((sum, d) => sum + (d.disc ?? 0), 0) / (diamonds.length || 1);

   const selectedDiamonds = diamonds.filter((d) => selectedIds.has(d.id));
   const selectedQty = selectedDiamonds.reduce((sum, d) => sum + (d.qty ?? 1), 0);
   const selectedCarats = selectedDiamonds.reduce((sum, d) => sum + d.carat, 0);
   const selectedAmount = selectedDiamonds.reduce((sum, d) => sum + d.totalAmount, 0);
   const selectedAvgDisc =
     selectedDiamonds.length > 0
       ? selectedDiamonds.reduce((sum, d) => sum + (d.disc ?? 0), 0) /
         selectedDiamonds.length
       : 0;
 

   const totalAmountPerCarat = totalCarats ? totalAmount / totalCarats : 0;
   const selectedAmountPerCarat = selectedCarats ? selectedAmount / selectedCarats : 0;

  const handleChange = (e) => {
    const index = Number(e.target.value);
    setSelectedBroker(brokers[index]);
  };

  const sendEmail = () => {
    if (!pdfRef.current) return alert('Please generate the invoice first.');

  
    const pdfBlob = pdfRef.current.output('blob');

    const formData = new FormData();
    formData.append('file',pdfBlob,  'invoice.pdf');
    formData.append('to_email', selectedBroker.email);
    formData.append('subject', `Invoice for ${selectedBroker.name}`);

    emailjs.sendForm(
      'YOUR_EMAILJS_SERVICE',
      'YOUR_TEMPLATE_ID',
      formData,
      'YOUR_PUBLIC_KEY'
    )
    .then(() => alert('Email sent!'))
    .catch(err => console.error('Email failed:', err));
  };

  const generatePDF = async () => {
    const doc = await jsPDFInvoiceTemplate({
      outputType: jsPDFInvoiceTemplate.OutputType?.Save,
      fileName: `Invoice_${selectedBroker?.name}`,
      business: {
        name: 'My Broker Diamond Co.',
        address: 'Surat, Gujarat, India',
        email: 'info@brokerdiamonds.com',
      },
      contact: {
        label: 'Bill To',
        name: selectedBroker.name,
        email: selectedBroker.email,
      },
      invoice: {
        bank: '',
        invDate: new Date().toLocaleDateString(),
        headerBorder: false,
        tableBodyBorder: false,
        invGenDate: undefined,
      },
      items: selectedDiamonds.map(d => ({
        name: d.stockNo,
        quantity: d.qty ?? 1,
        price: d.totalAmount,
        tax: d.disc,
      })),
    });
    pdfRef.current = doc; 
  };

  return (
    <div className="p-6">
      <div className="flex justify-between gap-4">
        <div>
          <h1 className="font-bold text-[20px]">Broker Details</h1>
          {console.log(selectedBroker)}
          <div className="flex flex-col gap-1">
            {Object.entries(details)
              .filter(([key]) => key !== "id" && key !== "status")
              .map(([key, value]) => (
                <div key={key} style={{ marginBottom: "8px" }}>
                  <strong>{key}:</strong> {value}
                </div>
              ))}
          </div>
        </div>
        <div>
          <h1 className="font-bold text-[20px]">Summary</h1>
          <div className="overflow-x-auto mt-3">
            <table className="min-w-full table-auto bg-white border-1">
              <thead className="border border-gray-400">
                <tr>
                  <th className="px-4 py-2">Summary</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Selected</th>
                  <th className="px-4 py-2">Bill Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y text-center divide-gray-200">
                <tr>
                  <td className="px-4 py-2">Qty</td>
                  <td className="px-4 py-2">{totalQuantity}</td>
                  <td className="px-4 py-2">{selectedQty}</td>
                  <td className="px-4 py-2">
                    ₹{selectedAmount.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Total Cts</td>
                  <td className="px-4 py-2">{totalCarats.toFixed(2)}</td>
                  <td className="px-4 py-2">{selectedCarats.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    ₹{selectedAmountPerCarat.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Avg Dis</td>
                  <td className="px-4 py-2">{avgDiscount.toFixed(2)}</td>
                  <td className="px-4 py-2">{selectedAvgDisc.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    ₹{selectedAmount / selectedCarats}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Total Amount</td>
                  <td className="px-4 py-2">₹{totalAmount.toLocaleString()}</td>
                  <td className="px-4 py-2">
                    ₹{selectedAmount.toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    ₹{selectedAmount.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <div className="flex items-center">
          <span className="pr-2">Broker</span>
          <select defaultValue="" onChange={handleChange}>
            <option value="" disabled className="px-2 py-2 border-1 border-gray-600">
              -- Choose a Broker --
            </option>

            {brokers.map((item, idx) => (
              <option key={item.id ?? idx} value={idx}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-4">
             <button className="bg-blue-900 px-2 rounded text-white" onClick={sendEmail}>Purchse</button>
             <button className="px-3 py-2 text-white rounded  bg-blue-900" onClick={generatePDF}>download</button>
        </div>
      </div>
    </div>
  );
};




