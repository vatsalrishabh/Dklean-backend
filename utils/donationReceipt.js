const nodemailer = require('nodemailer');

// Configure the transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other email services if needed
  auth: {
    user: process.env.PulseCareEmail, // Your PulseCare email address
    pass: process.env.EmailPassword,  // Your email password (preferably stored securely in environment variables)
  },
});

// Function to send receipt email
const sendReceiptToCx = async (to, patientDetails) => {

  console.log(patientDetails+"donation receiopt");
  
    

 
 
  
  
  const mailOptions = {
    from: process.env.PulseCareEmail, // Sender email address
    to, // string of comma seperated value - ["vatsalrishabh00@gmail.com, rishabh@gmail.com"] 
    bcc:to,
    subject: 'Dklean Health Care Public Charitable Trust (N.G.O.) - Donation Receipt',
    text: `Dear ${patientDetails.anonymous ? 'Donor' : patientDetails.donorName},\n\nThank you for your generous donation to Dklean Health Care Public Charitable Trust (N.G.O.).\n\nHere are the details:\n\nDonor Name: ${patientDetails.anonymous ? 'Anonymous' : patientDetails.donorName}\nEmail: ${patientDetails.donorEmail}\nMobile: ${patientDetails.mobile}\nPAN Card: ${patientDetails.panCard || 'Not Provided'}\nAmount: ₹${patientDetails.donationAmount}\nDate: ${new Date(patientDetails.donationDate).toLocaleString('en-IN')}\nTransaction ID: ${patientDetails.transactionId}\nRazorpay Order ID: ${patientDetails.razorpayId}\nStatus: ${patientDetails.paymentStatus}\nMessage: ${patientDetails.donationMessage || 'N/A'}\n\nLocation: ${patientDetails.pincode}, ${patientDetails.city}, ${patientDetails.state}, ${patientDetails.country}\n\nThank you again for supporting our cause!\n\nBest regards,\nDklean Health Care Public Charitable Trust Team`,
  
    html: `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f9f9f9; }
          .container {
            max-width: 650px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          h2 { color: #4CAF50; text-align: center; }
          .details ul {
            list-style: none;
            padding: 0;
          }
          .details li {
            border-bottom: 1px solid #eee;
            padding: 8px 0;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 14px;
            color: #777;
          }
          .footer a {
            color: #4CAF50;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Dklean Health Care Public Charitable Trust (N.G.O.)</h2>
          <p>Dear <strong>${patientDetails.anonymous ? 'Donor' : patientDetails.donorName}</strong>,</p>
          <p>Thank you for your generous contribution. Here are your donation details:</p>
          <div class="details">
            <ul>
              <li><strong>Donor Name:</strong> ${patientDetails.anonymous ? 'Anonymous' : patientDetails.donorName}</li>
              <li><strong>Email:</strong> ${patientDetails.donorEmail}</li>
              <li><strong>Mobile:</strong> ${patientDetails.mobile}</li>
              <li><strong>PAN Card:</strong> ${patientDetails.panCard || 'Not Provided'}</li>
              <li><strong>Amount:</strong> ₹${patientDetails.donationAmount}</li>
              <li><strong>Date:</strong> ${new Date(patientDetails.donationDate).toLocaleString('en-IN')}</li>
              <li><strong>Transaction ID:</strong> ${patientDetails.transactionId}</li>
              <li><strong>Razorpay Order ID:</strong> ${patientDetails.razorpayId}</li>
              <li><strong>Payment Status:</strong> ${patientDetails.paymentStatus}</li>
              <li><strong>Message:</strong> ${patientDetails.donationMessage || 'N/A'}</li>
              <li><strong>Location:</strong> ${patientDetails.pincode}, ${patientDetails.city}, ${patientDetails.state}, ${patientDetails.country}</li>
            </ul>
          </div>
          <div class="footer">
            <p>Thank you for supporting our mission.</p>
            <p>Best regards,<br>Dklean Health Care Public Charitable Trust (N.G.O.)</p>
            <p>Visit us at <a href="https://dkleanhealthcare.org" target="_blank">dkleanhealthcare.org</a></p>
          </div>
        </div>
      </body>
    </html>
    `
  };

  try {
    // Send the email using async/await
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info; // Return info for further use if needed
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email'); // Throwing the error to be caught at a higher level
  }
};


module.exports = {
  sendReceiptToCx,
};
