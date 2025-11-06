import nodemailer from 'nodemailer';

// Create reusable transporter
export const createEmailTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT) || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Send welcome email to new users
export const sendWelcomeEmail = async (email, name) => {
    // Skip email if credentials not configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('Email credentials not configured. Skipping welcome email.');
        return;
    }
    
    const transporter = createEmailTransporter();
    
    const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to FoodShare Connect Community!',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: #ffffff;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .content {
              padding: 30px;
              color: #333333;
            }
            .content h2 {
              color: #667eea;
              margin-top: 0;
            }
            .content p {
              line-height: 1.6;
              margin: 15px 0;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              margin: 20px 0;
              background-color: #667eea;
              color: #ffffff !important;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              color: #6c757d;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🍽️ Welcome to FoodShare Connect!</h1>
            </div>
            <div class="content">
              <h2>Hello ${name}!</h2>
              <p>Thank you for joining our community dedicated to reducing food waste and helping those in need.</p>
              <p>FoodShare Connect bridges the gap between surplus food providers and communities facing food insecurity. Together, we can make a real difference!</p>
              <p><strong>What you can do:</strong></p>
              <ul>
                <li>🤝 Volunteer to distribute surplus food</li>
                <li>🏨 Create food donation drives</li>
                <li>📊 Track your impact on the leaderboard</li>
                <li>💬 Engage with the community forum</li>
                <li>📝 Share your experiences and reviews</li>
              </ul>
              <p>Ready to get started?</p>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" class="button">Go to Dashboard</a>
              <p>If you have any questions, feel free to reach out to our support team.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} FoodShare Connect. All rights reserved.</p>
              <p>Making a difference, one meal at a time. 🌟</p>
            </div>
          </div>
        </body>
        </html>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to ${email}`);
        return { success: true };
    } catch (error) {
        console.error('Error sending welcome email:', error);
        return { success: false, error: error.message };
    }
};

export default {
    createEmailTransporter,
    sendWelcomeEmail
};
