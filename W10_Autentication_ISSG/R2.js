const crypto = require('crypto');

// Target MD5 hash
const targetHash = "5531a5834816222280f20d1ef9e95f69";

// Function to brute force the 4-digit PIN
function bruteForcePin() {
    for (let pin = 0; pin <= 9999; pin++) {
        let pinStr = pin.toString().padStart(4, '0'); // Ensure 4 digits
        let hash = crypto.createHash('md5').update(pinStr).digest('hex');
        if (hash === targetHash) {
            console.log(`PIN found: ${pinStr}`);
            return pinStr;
        }
    }
    console.log("PIN not found.");
    return null;
}

// Run the brute force
bruteForcePin();

