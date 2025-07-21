export async function sendVerificationEmail(email: string, token: string): Promise<object> {
   const verificationLink = `http://localhost:${process.env.PORT}/api/auth/verify-email?token=${token}`; // Supposedly the verification page
   console.log(`📧 Sending verification email to ${email}:`);
   console.log(`🔗 ${verificationLink}`);
   return { link: verificationLink };
}

export async function sendPasswordResetEmail(email: string, token: string): Promise<object> {
   const resetLink = `http://localhost:${process.env.PORT}/reset-password?token=${token}`; // Supposedly the reset password page
   console.log(`📧 Sending password reset email to ${email}:`);
   console.log(`🔗 ${resetLink}`);
   return { link: resetLink };
}
