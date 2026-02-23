const express = require('express');
const app = express();
const bookRoutes = require('./src/routes/bookRoutes');

app.use(express.json());
app.use('/api', bookRoutes);
//app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export const mssql = require("mssql");

export const mssqlConfig = {
  user: "cuuser",
  password: "cuuser",
  database: "BOOK_STORE",
  server: "43.72.228.145",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};