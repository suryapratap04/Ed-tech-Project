const passwordUpdateEmail = (username) => {
  return `
        <html>
            <head>
                <style>
                    /* Add your custom CSS styles here */
                </style>
            </head>
            <body>
                <h1>Password Update</h1>
                <p>Hello ${username},</p>
                <p>Your password has been successfully updated.</p>
                <p>If you did not initiate this change, please contact our support team immediately.</p>
                <p>Thank you,</p>
                <p>The Team</p>
            </body>
        </html>
    `;
};

module.exports = passwordUpdateEmail;
