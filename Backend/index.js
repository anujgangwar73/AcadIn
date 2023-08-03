const app = require('./app');

app.listen(process.env.PORT, () => {
    console.log(`Backend server started on port ${process.env.PORT}`);
});