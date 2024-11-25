const crypto = require('crypto');
const https = require('https');

// Target MD5 hash
const targetHash = "578ed5a4eecf5a15803abdc49f6152d6";

// GitHub link to the dictionary file
const dictionaryUrl = 'https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/500-worst-passwords.txt';

function fetchDictionaryAndAttack() {
    https.get(dictionaryUrl, (response) => {
        let data = '';

        // Collect data chunks
        response.on('data', (chunk) => {
            data += chunk;
        });

        // Once data is fully received
        response.on('end', () => {
            const words = data.split('\n'); // Split dictionary into lines
            for (let word of words) {
                word = word.trim(); // Remove whitespace
                let hash = crypto.createHash('md5').update(word).digest('hex');
                if (hash === targetHash) {
                    console.log(`Password found: ${word}`);
                    return;
                }
            }
            console.log("Password not found in dictionary.");
        });
    }).on('error', (err) => {
        console.error("Error fetching dictionary:", err.message);
    });
}
// Run the dictionary attack
fetchDictionaryAndAttack();
