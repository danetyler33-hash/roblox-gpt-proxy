const express = require('express');
const app = express();
app.use(express.json());

const API_KEY = process.env.OPENAI_API_KEY;

app.get('/ping', (req, res) => {
    res.json({ status: 'alive' });
});

app.post('/gpt', async (req, res) => {
    if (!API_KEY) return res.status(500).json({ error: 'No API key set' });
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(process.env.PORT || 3000, () => console.log('Proxy running'));
