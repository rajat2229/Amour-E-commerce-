import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Send email using AWS SES

const sendEmail = async (options) => {
  const sesClient = new SESClient();

  const params = {
    Destination: {
      ToAddresses: [options.email],
    },
    Message: {
      Body: {
        Html: {
          Data: options.message,
        },
      },
      Subject: {
        Data: options.subject,
      },
    },
    Source: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
  };

  const command = new SendEmailCommand(params);

  await sesClient.send(command);
};

export default sendEmail;
