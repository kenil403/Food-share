import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import {VolunteerReview} from "../models/volunteerReviewSchema.js"
import {User} from "../models/userSchema.js";
import {ContactUs} from "../models/contactUsSchema.js";
import { createEmailTransporter } from "../utils/emailService.js";
import { blogPost } from "../models/blogPostSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const getFeed = catchAsyncError(async (req, res, next) => {
    const review = await VolunteerReview.find({}).sort({ timestamps: -1 });
    res.status(200).json({
        success: true,
        message: "Fetched successfully",
        review
    });
});
// {user: id},'_id title description target cnt lastUpdated'
export const getUsers = catchAsyncError(async (req, res, next) => {
    const user = await User.find({role:"volunteer"},"name city badge ndrive").sort({ ndrive : -1 });
    res.status(200).json({
        success: true,
        message: "Users fetched successfully!",
        user,
    });
});

export const postContact = catchAsyncError(async(req, res, next) => {
    const { email, queries, fname, lname, mobile, company } = req.body;
    if(!email || !queries || !fname || !lname || !mobile){
        return next(new ErrorHandler("Please fill all required fields!"));
    }
    const contactUs = await ContactUs.create({
        email, queries, fname, lname, mobile, company
    });
    
    // Send notification email to admin (non-blocking)
    const transporter = createEmailTransporter();
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    
    const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: adminEmail,
        subject: 'New User Inquiry - FoodShare Connect',
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
            .message-container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            }
            p {
              color: #333;
              line-height: 1.6;
            }
            .info {
              background-color: #f8f9fa;
              padding: 15px;
              border-radius: 5px;
              margin: 15px 0;
            }
            .highlight {
              font-weight: bold;
              color: #667eea;
            }
          </style>
        </head>
        <body>
          <div class="message-container">
            <h2>New Contact Form Submission</h2>
            <p>A user has reached out with queries regarding FoodShare Connect.</p>
            <div class="info">
              <p><span class="highlight">Name:</span> ${fname} ${lname}</p>
              <p><span class="highlight">Email:</span> ${email}</p>
              <p><span class="highlight">Mobile:</span> ${mobile}</p>
              ${company ? `<p><span class="highlight">Company:</span> ${company}</p>` : ''}
              <p><span class="highlight">Query:</span></p>
              <p>${queries}</p>
            </div>
            <p>Please respond to their inquiry at your earliest convenience.</p>
            <p>Best regards,<br>FoodShare Connect System</p>
          </div>
        </body>
        </html>`
    };

    transporter.sendMail(mailOptions).catch(error => {
        console.error('Failed to send notification email:', error);
        // Don't fail the request if email fails
    });
    
    res.status(200).json({
        success: true,
        message: "We will contact you shortly",
        contactUs
    });
});

export const get_blog_post = catchAsyncError(async (req, res, next) => {
  const allBlogs = await blogPost.find({}).sort({ timestamps: -1 });;
  res.status(200).json({
      success: true,
      message: "Fetched successfully",
      allBlogs
  });
});