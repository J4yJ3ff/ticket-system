// pages/api/example.js

export default function handler(req: any, res: any) {
  if (req.method === "POST") {
    // This is a POST request
    console.log(req.body);
  }
}
