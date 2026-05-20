   export default async function handler(req, res) {
     const BASE_API_URL = "https://api.testnet.fairblock.network/v1";

     if (req.method === 'GET') {
       const { address } = req.query;
       try {
         const response = await fetch(`${BASE_API_URL}/stabletrust/balance?address=${address}`);
         const data = await response.json();
         return res.status(response.status).json(data);
       } catch (err) {
         return res.status(500).json({ success: false, message: err.message });
       }
     }

     if (req.method === 'POST') {
       try {
         const response = await fetch(`${BASE_API_URL}/stabletrust/transfer`, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Bearer YOUR_FAIRBLOCK_API_KEY'
           },
           body: JSON.stringify(req.body)
         });
         const data = await response.json();
         return res.status(response.status).json(data);
       } catch (err) {
         return res.status(500).json({ success: false, message: err.message });
       }
     }

     return res.status(405).json({ message: "Method not allowed" });
   }
