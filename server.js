// social-form-handler.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('social-form');
    const message = document.getElementById('form-message');

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const instagram = document.getElementById('instagram').value.trim();
        const snapchat = document.getElementById('snapchat').value.trim();

        // Basic validation
        if (!instagram || !snapchat) {
            showMessage('Please fill in both fields.', 'error');
            return;
        }

        // Optional: Validate formats (e.g., Instagram starts with @)
        if (!instagram.startsWith('@')) {
            showMessage('Instagram handle should start with @.', 'error');
            return;
        }

        // Prepare data object
        const formData = {
            instagram: instagram,
            snapchat: snapchat,
            timestamp: new Date().toISOString() // Add timestamp for records
        };

        try {
            // Send data to backend (replace '/api/store-social' with your endpoint)
            const response = await fetch('/api/store-social', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                showMessage('Thanks! Your social details have been saved.', 'success');
                form.reset(); // Clear the form
            } else {
                throw new Error('Failed to save data');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Sorry, there was an issue saving your details. Please try again.', 'error');
        }
    });

    function showMessage(text, type) {
        message.textContent = text;
        message.className = `message ${type}`;
        // Clear message after 5 seconds
        setTimeout(() => {
            message.textContent = '';
            message.className = 'message';
        }, 5000);
    }
});