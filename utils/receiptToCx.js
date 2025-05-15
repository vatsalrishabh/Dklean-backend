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
const receiptToCx = async (to, patientDetails) => {

  console.log(patientDetails);
  
    

 
 
  
  
  const mailOptions = {
    from: process.env.PulseCareEmail, // Sender email address
    to, // string of comma seperated value - ["vatsalrishabh00@gmail.com, rishabh@gmail.com"] 
    bcc:to,
    subject: 'Dklean Health Care Public Charitable Trust (N.G.O.) - Booking Receipt',
    text: `Dear ${patientDetails.bookedBy},

    Thank you for booking an appointment with PulseCare.
    
    Here are your appointment details:
    
    Patient Name: ${patientDetails.bookedBy}
    Doctor Name: ${patientDetails.doctorName}
    Doctor ID: ${patientDetails.doctorId}
    Service: ${patientDetails.serviceFromRedux.name}
    Service ID: ${patientDetails.serviceFromRedux.serviceId}
    Fee: ${patientDetails.serviceFromRedux.price}
    Date: ${patientDetails.date}
    Time: ${patientDetails.time}
    Booking ID: ${patientDetails.bookingId}
    User ID: ${patientDetails.userId}
    
    We look forward to seeing you on your scheduled date and time.
    
    Best regards,  
    PulseCare Team`
,    
  
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
      <h2>PulseCare - Appointment Confirmation</h2>
      <p>Dear <strong>${patientDetails.bookedBy}</strong>,</p>
      <p>Thank you for booking an appointment with PulseCare. Here are your booking details:</p>
      <div class="details">
        <ul>
          <li><strong>Patient Name:</strong> ${patientDetails.bookedBy}</li>
          <li><strong>Doctor Name:</strong> ${patientDetails.doctorName}</li>
          <li><strong>Doctor ID:</strong> ${patientDetails.doctorId}</li>
          <li><strong>Service:</strong> ${patientDetails.serviceFromRedux.name}</li>
          <li><strong>Service ID:</strong> ${patientDetails.serviceFromRedux.serviceId}</li>
          <li><strong>Fee:</strong> ${patientDetails.serviceFromRedux.price}</li>
          <li><strong>Date:</strong> ${patientDetails.date}</li>
          <li><strong>Time:</strong> ${patientDetails.time}</li>
          <li><strong>Booking ID:</strong> ${patientDetails.bookingId}</li>
          <li><strong>User ID:</strong> ${patientDetails.userId}</li>
        </ul>
      </div>
      <div class="footer">
        <p>We look forward to seeing you on your scheduled date and time.</p>
        <p>Best regards,<br>PulseCare Team</p>
        <p>Visit us at <a href="https://pulsecare.in" target="_blank">pulsecare.in</a></p>
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
  receiptToCx,
};
