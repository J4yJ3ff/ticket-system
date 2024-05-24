import nodemailer from "nodemailer";
import qr from "qrcode";

const page = () => {
  const phone = "0797919705";
  const userEmail = "gaspergvj@gmail.com";
  const userName = "J4y J3ff";

  const payload = {
    phoneNumber: phone,
    email: userEmail,
    name: userName,
  };
  const jsonString = JSON.stringify(payload);
  // const encoded_data = btoa(jsonString);

  //////////////////////QR CODE/////////////////////////////////

  qr.toDataURL(jsonString, { errorCorrectionLevel: "H" }, async (err, url) => {
    if (err) {
      console.log(err);
      return;
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
      },
    });

    let mailOptions = {
      from: {
        name: "Thought Be Things",
        address: "info@nohoaxx.com",
      },
      to: userEmail,
      subject: "QR Code",
      text: "Thank you for purchasing the ticket. The attached qr will be used for you verification at the entrance",
      attachments: [
        {
          filename: "qrcode.png",
          content: url.split("base64,")[1],
          encoding: "base64",
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("Email sent: " + info.response);
    });
  });
};

export default page;
