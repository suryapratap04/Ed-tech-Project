exports.courseEnrollmentEmail = (studentName, courseName) => {
  return `
        <html>
            <head>
                <style>
                    /* Add your custom CSS styles here */
                </style>
            </head>
            <body>
                <h1>Course Enrollment Confirmation</h1>
                <p>Dear ${studentName},</p>
                <p>Thank you for enrolling in the ${courseName} course. We are excited to have you as a student!</p>
                <p>Please find below the details of your enrollment:</p>
                <ul>
                    <li>Course Name: ${courseName}</li>
                    <li>Enrollment Date: ${new Date().toLocaleDateString()}</li>
                    <!-- Add more details as needed -->
                </ul>
                <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
                <p>Best regards,</p>
                <p>Your Course Enrollment Team</p>
            </body>
        </html>
    `;
};
