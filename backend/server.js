const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// !ERROR HANDLING
//uncaught exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server shut down due to uncaught error`);
  process.exit(1);
});

// configration
dotenv.config({ path: 'backend/config/config.env' });

///connection o db
connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

//promise rejection error handling
process.on('unhandledRejection', (err) => {
  console.log(`ERROR:${err.message}`);
  console.log(`Server is shut down because of unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
