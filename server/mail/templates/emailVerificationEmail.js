const emailVerficationEmail = (verificationLink) => {
  return `
        <html>
            <head>
                <title>Email Verification</title>
            </head>
            <body>
                <h1>Email Verification</h1>
                <p>Click the link below to verify your email address:</p>
                <a href="${verificationLink}">${verificationLink}</a>
            </body>
        </html>
    `;
};

module.exports = emailVerficationEmail;
