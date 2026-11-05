const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Dito ay nakalagay na ang iyong buong API Key na galing sa iyong setting
const PI_API_KEY = "xlnuu2hjhvxrxrmnf15iq7lovds5duzeao3wrzeoywbdvricg"; 

// 1. Endpoint para sa Server Approval
app.post('/api/approve', async (req, res) => {
    const { paymentId } = req.body;
    try {
        const response = await axios.post(
            `https://minepi.com{paymentId}/approve`,
            {},
            { headers: { Authorization: `Key ${PI_API_KEY}` } }
        );
        res.json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 2. Endpoint para sa Server Completion
app.post('/api/complete', async (req, res) => {
    const { paymentId, txid } = req.body;
    try {
        const response = await axios.post(
            `https://minepi.com{paymentId}/complete`,
            { txid: txid },
            { headers: { Authorization: `Key ${PI_API_KEY}` } }
        );
        res.json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
