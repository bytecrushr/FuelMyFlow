import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const SendOtp = async (to,OTP_CODE) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Fuel my work <noreply@fuelmyflow.space>',
            to,
            subject: 'Forgot Password - OTP.',
            html: `<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
      <div style="background-color: #4f46e5; color: white; padding: 15px; text-align: center;">
        <img width="50" src="https://www.fuelmyflow.space/logo.png" alt="">
        <h2 style="margin: 10px 0;">Welcome to Fuel My Flow</h2>
      </div>
      <div style="padding: 20px; color: #333333; line-height: 1.6;">
        <p style="color: #333333">Hi,</p>
        <p style="color: #333333">We received a request to verify your email or reset your password. Use the OTP below:</p>
        <p style="font-size: 15px; font-weight: bold;">${OTP_CODE}</p>
        <p style="color: #333333">This OTP is valid for the next <strong>10 minutes</strong>.</p>
        <p style="color: #333333">If you didn’t request this, you can safely ignore this email.</p>
        <br />
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ccc;" />
        <h4 style="color: #333333 ">Cheers,<br>Team Fuel my work<br>Fuel Your Passion. Fund Your Work.<br>www.fuelmyflow.space</h4>
        <p style="font-size: 12px; color: #888888; text-align: center; margin-top: 30px;">
          If you have any questions or feedback, feel free to contact at dev.rahulx222@gamil.com
        </p>
      </div>
    </div>
  </body>
</html>`,
        });

        if (error) {
            console.error('Resend Error:', error);
            return false;
        }

        return true;
    } catch (err) {
        console.error('Send OTP Failed:', err);
        return false;
    }
};