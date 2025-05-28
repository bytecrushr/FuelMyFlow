import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const SendOnboardingEmail = async (to, username) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Fuel my work <noreply@fuelmyflow.space>',
            to,
            subject: 'Welcome to Fuel my work.',
            html: `<!DOCTYPE html>
<html>

<body style="font-family: Arial, sans-serif; padding: 20px; margin: 0; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: auto; background-color: #f9f9f9; border-radius: 10px; overflow: hidden;">
        <div
            style="background-color: #4f46e5; color: white; padding: 15px; text-align: center; border-radius: 10px 10px 0 0;">
            <img width="50" src="https://www.fuelmyflow.space/logo.png" alt="">
            <h2 style="margin: 10px 0;">Welcome to Fuel My Flow</h2>
        </div>

        <div
            style="background-color: white; padding: 20px; border-radius: 0 0 10px 10px; line-height: 1.6; color: #333333;">
            <p style="color: #333333;">Hi ${username},</p>
            <p style="color: #333333;">
                Thank you for signing up with <strong>Fuel My Flow</strong> — where we help creators like you get real
                support and appreciation from your fans.
            </p>
            <p style="color: #333333;">
                Every "fuel" you receive is a real sign of encouragement — and a step toward doing what you love,
                full-time.
            </p>
            <p style="color: #333333;">
                Ready to get started?
            </p>

            <a href="https://www.fuelmyflow.space/auth/login"
                style="display: inline-block; margin-top: 20px; padding: 10px 20px; border: 1px solid #4f46e5; background-color: #ffffff; color: #4f46e5; text-decoration: none; border-radius: 5px;">
                Click here to Login
            </a>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ccc;" />
        <h4 style="color: #333333 ">Cheers,<br>Team Fuel my work<br>Fuel Your Passion. Fund Your Work.<br>www.fuelmyflow.space</h4>
            <p style="margin-top: 30px; font-size: 12px; color: #888888; text-align: center;">
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