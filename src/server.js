const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Заглушка для имитации задержки обработки запроса
app.use((req, res, next) => {
    setTimeout(next, 5000);
});

// Обработчик для поиска в JSON
app.post('/api/search', (req, res) => {
    const { email, number } = req.body;
    const jsonData = [
        {
            email: 'jim@gmail.com',
            number: '221122',
        },
        {
            email: 'jam@gmail.com',
            number: '830347',
        },
        {
            email: 'john@gmail.com',
            number: '221122',
        },
        {
            email: 'jams@gmail.com',
            number: '349425',
        },
        {
            email: 'jams@gmail.com',
            number: '141424',
        },
        {
            email: 'jill@gmail.com',
            number: '822287',
        },
        {
            email: 'jill@gmail.com',
            number: '822286',
        },
    ];

    const filteredData = jsonData.filter((user) => {
        return (
            (email === '' || user.email === email) &&
            (number === '' || user.number === number.replace(/-/g, ''))
        );
    });

    res.json(filteredData);
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});