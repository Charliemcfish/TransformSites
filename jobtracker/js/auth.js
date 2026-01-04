// Authentication Handler
// This uses Netlify Environment Variables for secure PIN storage

// Check if already logged in
if (localStorage.getItem('jobTrackerAuth') === 'authenticated') {
    if (window.location.pathname.includes('login.html')) {
        window.location.href = 'dashboard.html';
    }
}

// Login form handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const pinInput = document.getElementById('pinInput');
        const errorMessage = document.getElementById('errorMessage');
        const enteredPin = pinInput.value;

        // Clear previous error
        errorMessage.textContent = '';

        try {
            // Call Netlify function to verify PIN
            const response = await fetch('/.netlify/functions/verify-pin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pin: enteredPin })
            });

            const data = await response.json();

            if (data.authenticated) {
                // Store authentication state
                localStorage.setItem('jobTrackerAuth', 'authenticated');
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                errorMessage.textContent = 'Incorrect PIN. Please try again.';
                pinInput.value = '';
                pinInput.focus();
            }
        } catch (error) {
            console.error('Authentication error:', error);
            errorMessage.textContent = 'An error occurred. Please try again.';
        }
    });
}

// Logout function
function logout() {
    localStorage.removeItem('jobTrackerAuth');
    window.location.href = 'login.html';
}

// Check authentication on dashboard pages
function checkAuth() {
    if (localStorage.getItem('jobTrackerAuth') !== 'authenticated') {
        window.location.href = 'login.html';
    }
}
