import dotenv from 'dotenv';
dotenv.config();

const PORT = String(process.env.PORT);
const NAMES_URI = String(process.env.NAMES_URI);

export {
  PORT,
  NAMES_URI
};
