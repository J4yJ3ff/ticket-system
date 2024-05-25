import { SendMail } from "@/lib/actions/ticket.action";

const page = () => {
  const userEmail = "gaspergvj@gmail.com";
  const userName = "J4y J3ff";

  const extractUserData = (callbackData: any) => {
    const body = callbackData.Body.stkCallback.CallbackMetadata;
    const phoneObj = body.Item.find((obj: any) => obj.Name === "PhoneNumber");
    const phone = phoneObj?.Value.toString(); // Convert to string if needed

    return { phone };
  };

  // Usage
  const callbackData = {
    Body: {
      stkCallback: {
        CallbackMetadata: {
          Item: [
            { Name: "Amount", Value: 1 },
            { Name: "MpesaReceiptNumber", Value: "SEP5B3R6MB" },
            { Name: "Balance" },
            { Name: "TransactionDate", Value: 20240525030755 },
            { Name: "PhoneNumber", Value: 254797919705 },
          ],
        },
      },
    },
  };

  const { phone } = extractUserData(callbackData);

  SendMail({ phone, userName, userEmail });
};

export default page;
