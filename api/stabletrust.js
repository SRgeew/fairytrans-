export default async function handler(req, res) {
    // Mengizinkan komunikasi antar domain (CORS)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { method } = req;

    // JALUR 1: MENGAMBIL DATA / SINKRONISASI (GET)
    if (method === 'GET') {
        const { address } = req.query;
        if (!address) {
            return res.status(400).json({ success: false, message: "Parameter address wajib diisi." });
        }
        
        // Response formal untuk sinkronisasi state awal dompet
        return res.status(200).json({
            success: true,
            address: address,
            balance: "1457.56",
            asset: "cUSDC",
            network: "arc-testnet"
        });
    }

    // JALUR 2: EKSEKUSI TRANSFER RAHASIA (POST)
    if (method === 'POST') {
        try {
            const { sender, recipient, amount } = req.body;

            if (!sender || !recipient || !amount) {
                return res.status(400).json({ success: false, message: "Parameter payload tidak lengkap." });
            }

            // Membuat nomor hash transaksi acak biner yang meniru keluaran sistem blockchain
            const mockTxHash = "0x" + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");

            // Mengembalikan status sukses ke frontend
            return res.status(200).json({
                success: true,
                message: "Transaksi IBE Fairblock berhasil diproses oleh relay proxy.",
                txHash: mockTxHash,
                details: {
                    sender: sender,
                    recipient: recipient,
                    shieldedAmount: amount,
                    status: "Mempool_Confirmed"
                }
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    // Jika metode HTTP tidak diizinkan
    return res.status(405).json({ success: false, message: "Method tidak diizinkan." });
}
