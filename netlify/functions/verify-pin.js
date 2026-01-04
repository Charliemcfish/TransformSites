// Netlify Function to verify PIN
// This keeps the PIN secure by storing it in environment variables

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { pin } = JSON.parse(event.body);

        // Get PIN from Netlify environment variable
        const correctPin = process.env.JOB_TRACKER_PIN;

        // Verify PIN
        const authenticated = pin === correctPin;

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ authenticated })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error', authenticated: false })
        };
    }
};
