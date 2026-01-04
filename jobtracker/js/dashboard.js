// Dashboard Main Controller
let currentPage = 'home';

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    loadPage('home');
});

// Initialize sidebar navigation
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Load page
            const page = item.getAttribute('data-page');
            loadPage(page);
        });
    });
}

// Load page content
function loadPage(page) {
    currentPage = page;
    const contentWrapper = document.getElementById('contentWrapper');

    switch (page) {
        case 'home':
            contentWrapper.innerHTML = renderHomePage();
            break;
        case 'notes':
            contentWrapper.innerHTML = renderNotesPage();
            initializeNotesPage();
            break;
        case 'jobs':
            contentWrapper.innerHTML = renderJobsPage();
            initializeJobsPage();
            break;
        case 'prospects':
            contentWrapper.innerHTML = renderProspectsPage();
            initializeProspectsPage();
            break;
        case 'clients':
            contentWrapper.innerHTML = renderClientsPage();
            initializeClientsPage();
            break;
        case 'finances':
            contentWrapper.innerHTML = renderFinancesPage();
            initializeFinancesPage();
            break;
        case 'statistics':
            contentWrapper.innerHTML = renderStatisticsPage();
            initializeStatisticsPage();
            break;
        default:
            contentWrapper.innerHTML = renderHomePage();
    }
}

// Render Home Page
function renderHomePage() {
    return `
        ${displayMotivationalMessage()}

        <div class="page-header">
            <h1 class="page-title">Dashboard Overview</h1>
            <p class="page-subtitle">Welcome back! Here's what's happening with Transform Sites</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Total Clients</span>
                    <div class="stat-card-icon primary">
                        <i class="fas fa-user-tie"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="totalClients">0</div>
                <div class="stat-card-description">Active paying clients</div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Active Jobs</span>
                    <div class="stat-card-icon secondary">
                        <i class="fas fa-briefcase"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="activeJobs">0</div>
                <div class="stat-card-description">Jobs in progress</div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Total Prospects</span>
                    <div class="stat-card-icon success">
                        <i class="fas fa-users"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="totalProspects">0</div>
                <div class="stat-card-description">Potential clients</div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Monthly Income</span>
                    <div class="stat-card-icon primary">
                        <i class="fas fa-pound-sign"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="monthlyIncome">£0</div>
                <div class="stat-card-description">Recurring revenue</div>
            </div>
        </div>

        <div class="content-card">
            <div class="content-card-header">
                <h2 class="content-card-title">Quick Stats</h2>
            </div>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-card-header">
                        <span class="stat-card-title">Conversion Rate</span>
                        <div class="stat-card-icon success">
                            <i class="fas fa-chart-line"></i>
                        </div>
                    </div>
                    <div class="stat-card-value" id="conversionRate">0%</div>
                    <div class="stat-card-description">Prospects to clients</div>
                </div>

                <div class="stat-card">
                    <div class="stat-card-header">
                        <span class="stat-card-title">New Prospects</span>
                        <div class="stat-card-icon secondary">
                            <i class="fas fa-user-plus"></i>
                        </div>
                    </div>
                    <div class="stat-card-value" id="newProspects">0</div>
                    <div class="stat-card-description">Ready to contact</div>
                </div>

                <div class="stat-card">
                    <div class="stat-card-header">
                        <span class="stat-card-title">Total Income</span>
                        <div class="stat-card-icon primary">
                            <i class="fas fa-coins"></i>
                        </div>
                    </div>
                    <div class="stat-card-value" id="totalIncome">£0</div>
                    <div class="stat-card-description">All time earnings</div>
                </div>
            </div>
        </div>
    `;
}

// Update dashboard stats
async function updateDashboardStats() {
    try {
        // Get all data
        const clients = await getAllClients();
        const jobs = await getAllJobs();
        const prospects = await getAllProspects();

        // Update stats
        document.getElementById('totalClients').textContent = clients.length;

        const activeJobs = jobs.filter(job => job.status === 'in_progress').length;
        document.getElementById('activeJobs').textContent = activeJobs;

        document.getElementById('totalProspects').textContent = prospects.length;

        // Calculate monthly income
        const monthlyIncome = jobs
            .filter(job => job.paymentType === 'monthly' && job.status !== 'completed')
            .reduce((sum, job) => sum + (parseFloat(job.amount) || 0), 0);
        document.getElementById('monthlyIncome').textContent = `£${monthlyIncome.toFixed(2)}`;

        // Calculate total income
        const totalIncome = jobs
            .reduce((sum, job) => sum + (parseFloat(job.amount) || 0), 0);
        document.getElementById('totalIncome').textContent = `£${totalIncome.toFixed(2)}`;

        // Calculate conversion rate
        const convertedProspects = prospects.filter(p => p.status === 'converted').length;
        const conversionRate = prospects.length > 0 ? (convertedProspects / prospects.length * 100).toFixed(1) : 0;
        document.getElementById('conversionRate').textContent = `${conversionRate}%`;

        // New prospects
        const newProspects = prospects.filter(p => p.status === 'new').length;
        document.getElementById('newProspects').textContent = newProspects;

    } catch (error) {
        console.error('Error updating dashboard stats:', error);
    }
}

// Helper function to format currency
function formatCurrency(amount) {
    return `£${parseFloat(amount).toFixed(2)}`;
}

// Helper function to format date
function formatDate(timestamp) {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-GB');
}

// Call update stats when on home page
if (currentPage === 'home') {
    setTimeout(updateDashboardStats, 500);
}
