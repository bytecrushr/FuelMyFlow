import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const LoginAlertEmail = async (to, username) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Fuel my work <noreply@fuelmyflow.space>',
            to,
            subject: 'Login Alert - my work.',
            html: `<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; padding: 20px; margin: 0; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
      <div style="background-color: #4f46e5; color: white; padding: 15px; text-align: center;">
        <img width="50" src="https://www.fuelmyflow.space/logo.png" alt="Fuel My Flow Logo" style="display: block; margin: auto;">
        <h2 style="margin: 10px 0;">Fuel My Flow</h2>
        <h3 style="margin: 10px 0 0 0;">Login Alert</h3>
      </div>
      <div style="padding: 20px; color: #333333; line-height: 1.6;">
        <p style="color: #333333">Hi ${username},</p>
        <p style="color: #333333">
          We noticed a login to your <strong>Fuel My Flow</strong> account.
        </p>
        <p style="color: #333333">
          If this was you, no further action is needed. If you don’t recognize this login, please reset your password immediately.
        </p>
        <a href="https://www.fuelmyflow.space/auth/forgotpassword" 
           style="display: inline-block; margin-top: 20px; padding: 10px 20px; border: 1px solid #4f46e5; background-color: #ffffff; color: #4f46e5; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ccc;" />
        <h4 style="color: #333333 ">Cheers,<br>Team Fuel my work<br>Fuel Your Passion. Fund Your Work.<br>www.fuelmyflow.space</h4>
        <p style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
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