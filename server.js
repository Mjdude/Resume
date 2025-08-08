const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to serve the PDF file
app.get('/Prashanth_A_Resume.pdf', (req, res) => {
    const filePath = path.join(__dirname, 'Prashanth_A_Resume.pdf');
    
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('PDF file not found:', filePath);
            return res.status(404).send('Resume not found');
        }
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="Prashanth_A_Resume.pdf"');
        
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
