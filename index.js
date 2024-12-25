// Caesar Cipher Function
function caesarCipher() {
    const text = document.getElementById('inputText').value.trim();
    const shift = parseInt(document.getElementById('shift').value, 10);

    // Validation: Ensure the text is not empty and contains only letters (a-z, A-Z) and spaces
    if (!text || !/^[a-zA-Z\s]*$/.test(text)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Text can only contain letters and spaces.',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Validation: Ensure the shift is a number
    if (isNaN(shift)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Shift must be a number.',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Ensure the shift is within the desired range (e.g., between -25 and 25)
    const validShift = (shift >= -25 && shift <= 25);
    if (!validShift) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Shift must be between -25 and 25.',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Performing the Caesar Cipher
    const result = text.split('').map(char => {
        if (char.match(/[a-zA-Z]/)) {
            const charCode = char.charCodeAt(0);
            const base = char >= 'a' ? 97 : 65; // Using ASCII codes for 'a' or 'A'
            return String.fromCharCode(((charCode - base + shift) % 26 + 26) % 26 + base); // Handle negative shifts
        }
        return char;
    }).join('');

    document.getElementById('outputText').innerText = result;
}

// Function to copy text to clipboard
function copyToClipboard() {
    const outputText = document.getElementById('outputText').innerText;
    if (outputText) {
        navigator.clipboard.writeText(outputText).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Successfully Copied',
                text: 'Text has been copied to the clipboard.',
                confirmButtonText: 'OK'
            });
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Copy Failed',
                text: 'An error occurred while copying the text.',
                confirmButtonText: 'OK'
            });
        });
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'No Text',
            text: 'There is no text to copy.',
            confirmButtonText: 'OK'
        });
    }
}