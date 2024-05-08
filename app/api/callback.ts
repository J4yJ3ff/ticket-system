// pages/api/example.js

// pages/api/stkPushCallback.js

export default function handler(req: any, res: any) {
  if (req.method === "POST") {
    const data = req.body;
    // Process the callback data or perform any necessary actions

    console.log("Data from Safaricom API:", data);
    res.status(200).json({ message: "Callback processed successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
