const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
const PORT = 4000; 

// Utility Functions
const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const processInput = (data) => {
    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = null;
    let isPrimeFound = false;

    data.forEach((item) => {
        if (!isNaN(item)) {
            numbers.push(item);
            if (isPrime(parseInt(item))) isPrimeFound = true;
        } else if (typeof item === 'string') {
            alphabets.push(item);
            if (item === item.toLowerCase() && (highestLowercaseAlphabet === null || item > highestLowercaseAlphabet)) {
                highestLowercaseAlphabet = item;
            }
        }
    });

    return { numbers, alphabets, highestLowercaseAlphabet, isPrimeFound };
};

// Routes
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Invalid data format' });
    }

    const userId = "AVINASH_RAI_17091999"; 
    const email = "rai008754@gmail.com"; // Replace with actual email
    const rollNumber = "0101CS211036"; // Replace with actual roll number 

    const { numbers, alphabets, highestLowercaseAlphabet, isPrimeFound } = processInput(data);

    const fileValid = !!file_b64; // Simplified file validation
    const fileMimeType = fileValid ? "application/octet-stream" : null;
    const fileSizeKb = fileValid ? Buffer.byteLength(file_b64, 'base64') / 1024 : null;

    res.json({
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber, 
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [], 
        is_prime_found: isPrimeFound,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKb
    });
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});


app.listen(PORT, () => {
   
    console.log(`Server running at http://localhost:${PORT}`);
});
