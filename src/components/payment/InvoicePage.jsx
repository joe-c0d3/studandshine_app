import React, { useEffect, useState, useContext } from "react";
import html2canvas from "html2canvas";
import emailjs from 'emailjs-com';
// jsPDF is no longer needed as we are generating PNG
// import jsPDF from "jspdf";
import { useParams } from "react-router-dom";
// Assuming Spinner, api, BASE_URL are defined elsewhere and still needed
import Spinner from "../ui/Spinner"; // Uncomment if you are using Spinner
import api, { BASE_URL } from "../../api" // Ensure these imports are correct for your project
import { AuthContext } from '../../context/AuthContext'



const InvoicePage = () => {
  const { invoice_ref } = useParams(); // Extract invoiceRef from URL
  console.log("Invoice ref:", invoice_ref); // Check the value before the request
  const [invoice, setInvoice] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, username, setIsAuthenticated, get_username, logout } = useContext(AuthContext)


  // === EmailJS Configuration ===
  // IMPORTANT: Replace with your actual EmailJS Service ID, Template ID, and Public Key
  const EMAILJS_SERVICE_ID = 'service_xawzmur';
  const EMAILJS_TEMPLATE_ID_CONFIRMATION = 'template_q4zt12r'; // Template for payment confirmation
  const EMAILJS_TEMPLATE_ID_CANCELLATION = 'template_nb6el8e'; // Template for invoice cancellation
  const EMAILJS_PUBLIC_KEY = '4TigMEpD2FtEcZjKQ'; 
  // =============================

  const token = localStorage.getItem("access"); // Retrieve token
  const cart_code = localStorage.getItem("cart_code"); // Retrieve token


  useEffect(() => {
    fetchInvoice();
  }, []);

  useEffect(() => {
    if (invoice) { // Only log if invoice is not null
      console.log("Updated invoice:", invoice);
    }
  }, [invoice]); // This useEffect runs whenever 'invoice' state changes


  const fetchInvoice = async () => {
    setLoading(true); // Indicate loading for fetching invoice too
    try {
        const response = await fetch(`${BASE_URL}/get_invoice/${invoice_ref}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access")}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch invoice");
        }

        const data = await response.json();
        setInvoice(data);
        setIsPaid(data.status === "paid"); // <--- Crucial: Update isPaid from fetched data
    } catch (error) {
        console.error("Error fetching invoice:", error);
        // Consider setting an error state to show an error message to the user
    } finally {
        setLoading(false); // Stop loading after fetch
    }
};

  if (loading) {
    return <Spinner Loading={loading} />;
  }

  // Function to send email using EmailJS
  const sendEmail = async (templateId, templateParams) => {
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, templateId, templateParams, EMAILJS_PUBLIC_KEY);
      console.log('Email successfully sent!', templateId, templateParams);
    } catch (error) {
      console.error('Failed to send email. Error:', error);
      // In a real app, you might want to display a user-friendly message
    }
  };

  const confirmPayment = async () => {
    setLoading(true); // Indicate loading state for payment confirmation
    try {
      const response = await fetch(`${BASE_URL}/confirm_payment/`, {
          method: "POST",
          headers: {
              "Authorization": `Bearer ${token}`, // Attach token for authentication
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ invoice_ref, cart_code }), // Send payment data
      });

      if (!response.ok) {
        throw new Error("Payment confirmation failed");
      }

      const data = await response.json();
      console.log("Response from confirm_payment API:", data);

      // --- CRUCIAL FIX HERE ---
      // Update the invoice state with the new data received from the API call
      // This ensures the 'invoice' object now reflects the 'paid' status.
      setInvoice(prevInvoice => ({
        ...prevInvoice, // Keep existing invoice details
        status: data.status, // Update only the status
        // You might also want to update total_amount, etc., if they can change post-payment
      }));
      // Also update isPaid
      setIsPaid(data.status === "paid");

      // === Send payment confirmation email ===
      if (data) { // Use the 'data' from the successful confirm_payment response
        const itemsString = invoice ? invoice.details.map(item =>
          `${item.product} (Qty: ${item.quantity}, Price: ${item.unit_price} NGN)`
        ).join("\n") : ''; // Handle case where invoice might not be fully loaded yet for details

        const templateParams = {
          invoice_ref: data.ref, // Use data.ref from the response
          total_amount: invoice ? invoice.total_amount : 'N/A', // Still rely on existing invoice or add to API response
          payment_status: data.status, // THIS IS THE KEY CHANGE: Use the 'status' from the *current* API response
          invoice_items: itemsString,
          tax: invoice ? invoice.tax : 'N/A',
          delivery_fee: invoice ? invoice.delivery_fee : 'N/A',
          to_name: username, // Assuming customer name is available
        };
        await sendEmail(EMAILJS_TEMPLATE_ID_CONFIRMATION, templateParams);
      }    
      // =====================================
   
    localStorage.removeItem("cart_code");
    window.location.href = `/completed_page/?ref=${data.ref}&status=${data.status}`; // Redirect upon successful confirmation
    } catch (error) {
        console.error("Error confirming payment:", error);
        alert("Error confirming payment. Please try again."); // Use a custom modal in a real app
    } finally {
        setLoading(false); // Stop loading after request completion
    }
  };

  const cancelInvoice = async () => {
    setLoading(true); // Indicate loading state for payment confirmation
    if (loading){
      return <Spinner Loading={loading} />
  }
    try {
      const response = await fetch(`${BASE_URL}/cancel_invoice/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, // Attach token for authentication
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invoice_ref, cart_code }),
      
      });

      if (!response.ok) {
        throw new Error("Payment cancellation failed");
    }
      const data = await response.json();
      console.log("Response from cancel_invoice API:", data);

      // Update the invoice state with the new data received from the API call
      setInvoice(prevInvoice => ({
        ...prevInvoice,
        status: data.status, // Should be 'cancelled' from your backend
      }));
      setIsPaid(data.status === "paid"); // This will now be false if status is 'cancelled'

      // === Send invoice cancellation email ===
      if (data && invoice) { // Ensure both API data and initial invoice details are available
        const itemsString = invoice.details.map(item =>
          `${item.product} (Qty: ${item.quantity}, Price: ${item.unit_price} NGN)`
        ).join("\n");

        const templateParams = {
          invoice_ref: data.ref, // Use data.ref from the response
          total_amount: invoice.total_amount, // Use the current invoice state's total_amount
          payment_status: data.status, // THIS IS THE KEY CHANGE: Use the status from the *current* API response
          invoice_items: itemsString,
          tax: invoice.tax,
          delivery_fee: invoice.delivery_fee,
          customer_email: invoice.customer.email, // Assuming customer email is available
          to_name: username, // Assuming customer name is available
          // Add any other specific parameters for your cancellation template
        };
        await sendEmail(EMAILJS_TEMPLATE_ID_CANCELLATION, templateParams);
      }
      // =====================================

      window.location.href = `/cancelled_page/?ref=${data.ref}&status=${data.status}`; // Redirect upon successful cancelling
    } catch (error) {
      console.error("Error cancelling invoice:", error);
      alert("Error cancelling invoice. Please try again."); // Use a custom modal in a real app
    }

      finally {
      setLoading(false); // Stop loading after request completion
    }
  };

  // Function to download the invoice as a PNG image
  const downloadPNG = () => {
    setLoading(true); // Indicate loading state for payment confirmation
    if (loading){
      return <Spinner Loading={loading} />
  }
    const element = document.getElementById("invoice-container");
    if (!element) {
      console.error("Invoice container not found.");
      // In a real app, display a user-friendly message, e.g., using a custom modal
      return;
    }

    html2canvas(element).then((canvas) => {
      // Convert canvas to a PNG data URL
      const imgData = canvas.toDataURL("image/png");

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `invoice-${invoice_ref || 'receipt'}.png`; // Suggest a filename for the download

      // Programmatically click the link to trigger the download
      document.body.appendChild(link); // Append to body to ensure it's clickable
      link.click();
      document.body.removeChild(link); // Clean up the temporary link element from the DOM
    }).catch(error => {
      console.error("Error generating PNG:", error);
      // In a real app, display a user-friendly message, e.g., using a custom modal
      // alert("Failed to generate image. Please try again.");
    });
  };

  return (
    // Spinner component (if available) can be rendered conditionally based on `loading` state
    <div style={{ padding: "10px", maxWidth: "300px", margin: "auto", fontFamily: "monospace, monospace", fontSize: "14px", lineHeight: "1.4" }}>
      {invoice ? (
        <div id="invoice-container" style={{ background: "#fff", padding: "15px", border: "1px dashed #333" }}>
          <h2 style={{ textAlign: "center", marginBottom: "10px", textTransform: "uppercase", fontSize: "16px" }}>STUD & SHINE ACCESSORIES</h2>
          <p style={{ textAlign: "center", marginBottom: "15px", paddingBottom: "15px", borderBottom: "1px dashed #eee" }}>
            Thank you for your purchase!
          </p>

          <div style={{ marginBottom: "10px" }}>
            <p><strong>Invoice Ref:</strong> {invoice.invoice_ref}</p>
            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
          </div>

          <div style={{ marginBottom: "15px", paddingTop: "15px", borderTop: "1px dashed #eee" }}>
            <h4 style={{ marginBottom: "8px" }}>Items:</h4>
            <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
              {invoice.details.map((item, index) => (
                <li key={index} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span>{item.product} ({item.quantity} x {item.unit_price} NGN)</span>
                  <span>{(item.quantity * item.unit_price).toFixed(2)} NGN</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ borderTop: "1px dashed #eee", paddingTop: "10px", marginTop: "10px" }}>
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <span><strong>Subtotal:</strong></span>
              <span>{invoice.subtotal} NGN</span>
            </p>
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <span><strong>Tax:</strong></span>
              <span>{invoice.tax} NGN</span>
            </p>
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <span><strong>Delivery Fee:</strong></span>
              <span>{invoice.delivery_fee} NGN</span>
            </p>
            <p style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "bold", borderTop: "1px dashed #333", paddingTop: "8px", marginTop: "8px" }}>
              <span>Total:</span>
              <span>{invoice.total_amount} NGN</span>
            </p>
          </div>

          <p style={{ display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center", fontSize: "16px", fontWeight: "bold", borderTop: "1px dashed #333", paddingTop: "8px", marginTop: "8px" }}>
            <span>Please pay to:</span>
            <span>1716911613</span>
            <span>STUD & SHINE ACCESSORIES LTD.</span>
            <span>ACCESS BANK PLC</span>
          </p>

          {/* Checkbox for Payment Confirmation */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <input type="checkbox" checked={isPaid} onChange={confirmPayment} disabled={isPaid} style={{ marginRight: "5px" }} />
            <label>I have made the payment</label>
          </div>


        </div>
      ) : (
        <p style={{ textAlign: "center" }}>Loading invoice...</p>
      )}
      {/* Cancel Invoice Button */}
      <button
        onClick={cancelInvoice}
        style={{ marginTop: "15px", padding: "8px 15px", border: "none", background: "#ff4d4d", color: "#fff", cursor: "pointer", width: "100%", fontSize: "14px" }}
      >
        Cancel Invoice
      </button>
      {/* Changed onClick to call downloadPNG */}
      <button onClick={downloadPNG} style={{ marginTop: "15px", padding: "10px", border: "none", background: "#007bff", color: "#fff", cursor: "pointer", width: "100%", fontSize: "14px" }}>
        Download PNG
      </button>
    </div>
  );
};

export default InvoicePage;
