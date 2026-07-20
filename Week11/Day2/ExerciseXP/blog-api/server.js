const express = require('express');
const postRoutes = require('./server/routes/postRoutes');

const app = express();
const PORT = 3000; // Порт задан напрямую

// Парсер JSON для обработки тела запросов
app.use(express.json());

// Маршруты API
app.use('/posts', postRoutes);

// Обработка несуществующих маршрутов (404 Not Found)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Централизованная обработка ошибок сервера (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Старт сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});