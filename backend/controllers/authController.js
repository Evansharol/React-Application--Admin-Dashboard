// Handles authentication logic (send OTP, verify OTP, reset password)

const { sendOtpEmail } = require('../utils/mailer');
const { generateOtp, otpStore } = require('../utils/otp');

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  const otp = generateOtp();
  otpStore[email] = { otp, expires: Date.now() + 10 * 60 * 1000 };
  try {
    await sendOtpEmail(email, otp);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email' });
  }
};

exports.verifyOtp = (req, res) => {
  const { email, otp, newPassword } = req.body;
  const record = otpStore[email];
  if (!record || record.otp !== otp || Date.now() > record.expires) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }
  // TODO: Update password in your user database here
  delete otpStore[email];
  res.json({ success: true });
};
