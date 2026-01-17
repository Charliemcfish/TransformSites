// Dashboard Main Controller
let currentPage = 'home';

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    loadPage('home');
    initializeMobileMenu();
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
            updateDashboardStats();
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
        case 'hosting':
            contentWrapper.innerHTML = renderHostingPage();
            initializeHostingPage();
            break;
        case 'statistics':
            contentWrapper.innerHTML = renderStatisticsPage();
            initializeStatisticsPage();
            break;
        default:
            contentWrapper.innerHTML = renderHomePage();
            updateDashboardStats();
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
                    <span class="stat-card-title">Total Jobs</span>
                    <div class="stat-card-icon secondary">
                        <i class="fas fa-briefcase"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="activeJobs">0</div>
                <div class="stat-card-description">In progress + completed</div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Total Prospects</span>
                    <div class="stat-card-icon success">
                        <i class="fas fa-users"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="totalProspects">0</div>
                <div class="stat-card-description">All prospects added</div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Income This Year</span>
                    <div class="stat-card-icon primary">
                        <i class="fas fa-pound-sign"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="yearlyIncome">£0</div>
                <div class="stat-card-description">All jobs from Jan 1</div>
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

        // Total jobs (in progress + completed)
        const totalJobs = jobs.filter(job => job.status === 'in_progress' || job.status === 'completed').length;
        document.getElementById('activeJobs').textContent = totalJobs;

        document.getElementById('totalProspects').textContent = prospects.length;

        // Calculate income for this year (all jobs from Jan 1 to now, any status)
        const currentYear = new Date().getFullYear();
        const yearlyIncome = jobs
            .filter(job => {
                if (!job.createdAt) return false;
                const jobDate = job.createdAt.toDate();
                return jobDate.getFullYear() === currentYear;
            })
            .reduce((sum, job) => sum + (parseFloat(job.amount) || 0), 0);
        document.getElementById('yearlyIncome').textContent = `£${yearlyIncome.toFixed(2)}`;

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

// Check for hosting renewals and display warning badge
async function checkHostingRenewals() {
    try {
        const snapshot = await hostingPlansCollection.where('status', '==', 'active').get();
        const plans = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const today = new Date();
        const warningCount = plans.filter(plan => {
            const renewalDate = plan.renewalDate.toDate();
            const daysUntil = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24));
            return daysUntil <= HOSTING_RENEWAL_WARNING_DAYS && daysUntil > 0;
        }).length;

        if (warningCount > 0) {
            const hostingNavItem = document.querySelector('[data-page="hosting"]');
            if (hostingNavItem && !hostingNavItem.querySelector('.warning-badge')) {
                const badge = document.createElement('span');
                badge.className = 'warning-badge';
                badge.textContent = warningCount;
                badge.style.cssText = 'position: absolute; top: 8px; right: 8px; background: #ff9800; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;';
                hostingNavItem.style.position = 'relative';
                hostingNavItem.appendChild(badge);
            }
        }
    } catch (error) {
        console.error('Error checking hosting renewals:', error);
    }
}

// Check hosting renewals on page load and refresh every 5 minutes
setTimeout(checkHostingRenewals, 1000);
setInterval(checkHostingRenewals, 5 * 60 * 1000);

// Mobile Menu Functions
function toggleMobileMenu() {
    console.log('toggleMobileMenu called - window width:', window.innerWidth);
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
        console.log('Sidebar active state:', sidebar.classList.contains('active'));
    } else {
        console.error('Sidebar element not found!');
    }
}

function initializeMobileMenu() {
    console.log('initializeMobileMenu called');

    // Close sidebar when clicking on a nav item on mobile
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                const sidebar = document.querySelector('.sidebar');
                if (sidebar) {
                    sidebar.classList.remove('active');
                }
            }
        });
    });

    // Close sidebar when clicking outside of it
    document.addEventListener('click', (e) => {
        const sidebar = document.querySelector('.sidebar');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');

        if (window.innerWidth <= 768 &&
            sidebar && sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            mobileMenuToggle && !mobileMenuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });

    console.log('Mobile menu initialized successfully');
}
