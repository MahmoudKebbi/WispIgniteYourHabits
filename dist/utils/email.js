"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = sendVerificationEmail;
exports.sendPasswordResetEmail = sendPasswordResetEmail;
async function sendVerificationEmail(email, token) {
    const verificationLink = `http://localhost:${process.env.PORT}/api/auth/verify-email?token=${token}`; // Supposedly the verification page
    console.log(`📧 Sending verification email to ${email}:`);
    console.log(`🔗 ${verificationLink}`);
}
async function sendPasswordResetEmail(email, token) {
    const resetLink = `http://localhost:${process.env.PORT}/reset-password?token=${token}`; // Supposedly the reset password page
    console.log(`📧 Sending password reset email to ${email}:`);
    console.log(`🔗 ${resetLink}`);
}
//# sourceMappingURL=email.js.map