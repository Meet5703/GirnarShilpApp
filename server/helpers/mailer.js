// const nodemailer = require("nodemailer");
// const uuid = require("uuid");

// const sendEmail = async user => {
//   try {
//     const userId = user._id;
//     // Generate reset token using UUID
//     const resetToken = uuid.v4();
//     const resetLink = `http://localhost:8080/api/v1/auth/resetpassword?token=${resetToken}`;

//     // Update user document with reset token and expiry
//     user.forgotPasswordToken = resetToken;
//     user.forgotPasswordExpiry = Date.now() + 3600000; // 1 hour expiry

//     await user.save();

//     // Replace placeholders in the template with actual values
//     const emailContent = `<p>Click <a href=${resetLink}>here</a> to reset your password.</p> <p>copy paste below link in your browser <a>${resetLink}</a></p>`;

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       host: "smtp.gmail.com",
//       port: 587,
//       auth: {
//         user: "sureshkhetani1111@gmail.com",
//         pass: "xgad daqn kiwr tsda"
//       }
//     });

//     const mailOptions = {
//       from: "dataskillshub@gmail.com",
//       to: user.email,
//       subject: "Password Reset",
//       html: emailContent
//     };

//     const mail = await transporter.sendMail(mailOptions);
//     return mail;
//   } catch (error) {
//     throw new Error("Error sending email: " + error.message);
//   }
// };

// module.exports = sendEmail;
