import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: 'http://localhost:5173', // Allow only your frontend origin
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.options('*', cors());
app.use(express.json());

// Endpoint to update the usernames.json file
app.post('/update-usernames', (req, res) => {
  const data = { u_name_list: req.body.usernames };

  const filePath = path.join(__dirname, 'usernames.json');

  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).json({ message: 'Error saving file' });
    }
    console.log('File saved successfully to', filePath);
    res.status(200).json({ message: 'File saved successfully' });
  });
});

// Endpoint to get the usernames list
app.get('/usernames', (req, res) => {
  const filePath = path.join(__dirname, 'usernames.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Error reading file' });
    }
    const usernames = JSON.parse(data);
    res.status(200).json(usernames);
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
