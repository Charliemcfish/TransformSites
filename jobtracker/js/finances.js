// Finances Management System

let financeChart = null;
let currentTimeframe = 'month';

// Render Finances Page
function renderFinancesPage() {
    return `
        <div class="page-header">
            <h1 class="page-title">Finances</h1>
            <p class="page-subtitle">Track your income and watch Transform Sites grow!</p>
        </div>

        <!-- Financial Stats -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Total Income</span>
                    <div class="stat-card-icon primary">
                        <i class="fas fa-coins"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="financesTotalIncome">£0.00</div>
                <div class="stat-card-description">All time earnings</div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Income This Year</span>
                    <div class="stat-card-icon success">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="financesYearlyIncome">£0.00</div>
                <div class="stat-card-description">From Jan 1 to now</div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Average Job Value</span>
                    <div class="stat-card-icon secondary">
                        <i class="fas fa-chart-bar"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="financesAvgJobValue">£0.00</div>
                <div class="stat-card-description">Per job average</div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Completed Jobs</span>
                    <div class="stat-card-icon success">
                        <i class="fas fa-check-circle"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="financesCompletedJobs">0</div>
                <div class="stat-card-description">Successfully delivered</div>
            </div>
        </div>

        <!-- Motivational Income Messages -->
        <div id="incomeMotivation"></div>

        <!-- Chart Section -->
        <div class="content-card">
            <div class="content-card-header">
                <h2 class="content-card-title">Income Over Time</h2>
                <div class="chart-controls">
                    <button class="btn btn-small ${currentTimeframe === 'month' ? 'btn-primary' : 'btn-outline'}" onclick="changeTimeframe('month')">
                        This Month
                    </button>
                    <button class="btn btn-small ${currentTimeframe === 'year' ? 'btn-primary' : 'btn-outline'}" onclick="changeTimeframe('year')">
                        This Year
                    </button>
                    <button class="btn btn-small ${currentTimeframe === 'all' ? 'btn-primary' : 'btn-outline'}" onclick="changeTimeframe('all')">
                        All Time
                    </button>
                </div>
            </div>

            <div style="padding: 2rem; position: relative; height: 400px;">
                <canvas id="financeChart"></canvas>
            </div>
        </div>

        <!-- Income Breakdown -->
        <div class="content-card">
            <div class="content-card-header">
                <h2 class="content-card-title">Income Breakdown</h2>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-card-header">
                        <span class="stat-card-title">Website Builds</span>
                        <div class="stat-card-icon primary">
                            <i class="fas fa-globe"></i>
                        </div>
                    </div>
                    <div class="stat-card-value" id="websiteBuildsIncome">£0.00</div>
                    <div class="stat-card-description" id="websiteBuildsCount">0 projects</div>
                </div>

                <div class="stat-card">
                    <div class="stat-card-header">
                        <span class="stat-card-title">Annual Hosting</span>
                        <div class="stat-card-icon success">
                            <i class="fas fa-server"></i>
                        </div>
                    </div>
                    <div class="stat-card-value" id="hostingIncome">£0.00</div>
                    <div class="stat-card-description" id="hostingCount">0 plans</div>
                </div>

                <div class="stat-card">
                    <div class="stat-card-header">
                        <span class="stat-card-title">Other Revenue</span>
                        <div class="stat-card-icon secondary">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                    </div>
                    <div class="stat-card-value" id="otherIncome">£0.00</div>
                    <div class="stat-card-description" id="otherJobsCount">0 jobs</div>
                </div>
            </div>
        </div>

        <style>
            .chart-controls {
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
            }
            @media (max-width: 768px) {
                .chart-controls {
                    width: 100%;
                    margin-top: 1rem;
                }
                .chart-controls .btn {
                    flex: 1;
                }
            }
        </style>
    `;
}

// Initialize Finances Page
async function initializeFinancesPage() {
    await loadFinancialData();
    initializeFinanceChart();
}

// Load financial data
async function loadFinancialData() {
    try {
        const allJobs = await getAllJobs();

        // Calculate total income (all jobs, all time)
        const totalIncome = allJobs.reduce((sum, job) => sum + (parseFloat(job.amount) || 0), 0);
        document.getElementById('financesTotalIncome').textContent = `£${totalIncome.toFixed(2)}`;

        // Calculate income for current year
        const currentYear = new Date().getFullYear();
        const yearlyIncome = allJobs
            .filter(job => {
                if (!job.createdAt) return false;
                const jobDate = job.createdAt.toDate();
                return jobDate.getFullYear() === currentYear;
            })
            .reduce((sum, job) => sum + (parseFloat(job.amount) || 0), 0);
        document.getElementById('financesYearlyIncome').textContent = `£${yearlyIncome.toFixed(2)}`;

        // Calculate average job value
        const avgJobValue = allJobs.length > 0 ? totalIncome / allJobs.length : 0;
        document.getElementById('financesAvgJobValue').textContent = `£${avgJobValue.toFixed(2)}`;

        // Count completed jobs
        const completedJobs = allJobs.filter(job => job.status === 'completed').length;
        document.getElementById('financesCompletedJobs').textContent = completedJobs;

        // Income breakdown by payment type

        // Website builds (one-time payments)
        const websiteBuilds = allJobs.filter(job => job.paymentType === PAYMENT_TYPES.ONE_TIME);
        const websiteIncome = websiteBuilds.reduce((sum, job) => sum + (parseFloat(job.amount) || 0), 0);
        document.getElementById('websiteBuildsIncome').textContent = `£${websiteIncome.toFixed(2)}`;
        document.getElementById('websiteBuildsCount').textContent = `${websiteBuilds.length} projects`;

        // Annual hosting
        const hostingJobs = allJobs.filter(job => job.paymentType === PAYMENT_TYPES.ANNUAL_HOSTING);
        const hostingIncome = hostingJobs.reduce((sum, job) => sum + (parseFloat(job.amount) || 0), 0);
        document.getElementById('hostingIncome').textContent = `£${hostingIncome.toFixed(2)}`;
        document.getElementById('hostingCount').textContent = `${hostingJobs.length} plans`;

        // Other revenue (monthly contracts, custom jobs)
        const otherJobs = allJobs.filter(job =>
            job.paymentType !== PAYMENT_TYPES.ONE_TIME &&
            job.paymentType !== PAYMENT_TYPES.ANNUAL_HOSTING
        );
        const otherIncome = otherJobs.reduce((sum, job) => sum + (parseFloat(job.amount) || 0), 0);
        document.getElementById('otherIncome').textContent = `£${otherIncome.toFixed(2)}`;
        document.getElementById('otherJobsCount').textContent = `${otherJobs.length} jobs`;

        // Show motivational message based on yearly income
        displayIncomeMotivation(totalIncome, yearlyIncome);

    } catch (error) {
        console.error('Error loading financial data:', error);
    }
}

// Display motivational message based on income
function displayIncomeMotivation(totalIncome, yearlyIncome) {
    const container = document.getElementById('incomeMotivation');

    let message = '';
    let icon = '';

    // Base motivation on yearly income
    if (yearlyIncome >= 50000) {
        message = "You're smashing it, Charlie! £50K+ this year is phenomenal!";
        icon = '🚀';
    } else if (yearlyIncome >= 30000) {
        message = "Incredible progress! £30K+ this year - keep it up!";
        icon = '💰';
    } else if (yearlyIncome >= 15000) {
        message = "Great work! £15K+ this year - you're building something real!";
        icon = '📈';
    } else if (yearlyIncome >= 5000) {
        message = "You're on the board! £5K+ this year - momentum is building!";
        icon = '💪';
    } else if (yearlyIncome > 0) {
        message = "Every journey starts somewhere! Keep adding those clients!";
        icon = '🎯';
    } else {
        message = "Time to get those first projects, Charlie! Your empire awaits!";
        icon = '🔥';
    }

    if (totalIncome > 0) {
        container.innerHTML = `
            <div class="motivational-message">
                <h2>${icon} ${message}</h2>
                <p>All-time income: £${totalIncome.toFixed(2)} | This year: £${yearlyIncome.toFixed(2)}</p>
            </div>
        `;
    }
}

// Initialize finance chart
function initializeFinanceChart() {
    const ctx = document.getElementById('financeChart');
    if (!ctx) return;

    updateFinanceChart();
}

// Update finance chart based on timeframe
async function updateFinanceChart() {
    try {
        const allJobs = await getAllJobs();

        // Prepare data based on timeframe
        let labels = [];
        let data = [];

        if (currentTimeframe === 'month') {
            // Show last 30 days
            const today = new Date();
            for (let i = 29; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                labels.push(date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }));

                // Calculate income for this day
                const dayIncome = allJobs
                    .filter(job => {
                        if (!job.createdAt) return false;
                        const jobDate = job.createdAt.toDate();
                        return jobDate.toDateString() === date.toDateString();
                    })
                    .reduce((sum, job) => sum + (parseFloat(job.amount) || 0), 0);

                data.push(dayIncome);
            }
        } else if (currentTimeframe === 'year') {
            // Show last 12 months
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const today = new Date();

            for (let i = 11; i >= 0; i--) {
                const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
                labels.push(months[date.getMonth()] + ' ' + date.getFullYear().toString().substr(2));

                // Calculate income for this month
                const monthIncome = allJobs
                    .filter(job => {
                        if (!job.createdAt) return false;
                        const jobDate = job.createdAt.toDate();
                        return jobDate.getMonth() === date.getMonth() && jobDate.getFullYear() === date.getFullYear();
                    })
                    .reduce((sum, job) => sum + (parseFloat(job.amount) || 0), 0);

                data.push(monthIncome);
            }
        } else {
            // All time - group by month
            const monthlyData = {};

            allJobs.forEach(job => {
                if (!job.createdAt) return;
                const jobDate = job.createdAt.toDate();
                const key = jobDate.getFullYear() + '-' + String(jobDate.getMonth() + 1).padStart(2, '0');

                if (!monthlyData[key]) {
                    monthlyData[key] = 0;
                }
                monthlyData[key] += parseFloat(job.amount) || 0;
            });

            // Sort by date and prepare data
            const sortedKeys = Object.keys(monthlyData).sort();
            sortedKeys.forEach(key => {
                const [year, month] = key.split('-');
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                labels.push(months[parseInt(month) - 1] + ' ' + year.substr(2));
                data.push(monthlyData[key]);
            });
        }

        // Calculate cumulative data
        const cumulativeData = [];
        let cumulative = 0;
        data.forEach(value => {
            cumulative += value;
            cumulativeData.push(cumulative);
        });

        // Destroy existing chart if it exists
        if (financeChart) {
            financeChart.destroy();
        }

        // Create new chart
        const ctx = document.getElementById('financeChart').getContext('2d');
        financeChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Income',
                    data: data,
                    borderColor: '#EA435D',
                    backgroundColor: 'rgba(234, 67, 93, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Cumulative',
                    data: cumulativeData,
                    borderColor: '#361D49',
                    backgroundColor: 'rgba(54, 29, 73, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: {
                                family: 'Poppins',
                                size: 14,
                                weight: '600'
                            },
                            padding: 15,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            family: 'Poppins',
                            size: 14,
                            weight: '600'
                        },
                        bodyFont: {
                            family: 'Poppins',
                            size: 13
                        },
                        padding: 12,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': £' + context.parsed.y.toFixed(2);
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                family: 'Poppins',
                                size: 12
                            },
                            callback: function(value) {
                                return '£' + value;
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                family: 'Poppins',
                                size: 11
                            },
                            maxRotation: 45,
                            minRotation: 45
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.error('Error updating finance chart:', error);
    }
}

// Change timeframe
function changeTimeframe(timeframe) {
    currentTimeframe = timeframe;

    // Update button states
    const buttons = document.querySelectorAll('.chart-controls .btn');
    buttons.forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline');
    });

    if (timeframe === 'month') {
        buttons[0].classList.add('btn-primary');
        buttons[0].classList.remove('btn-outline');
    } else if (timeframe === 'year') {
        buttons[1].classList.add('btn-primary');
        buttons[1].classList.remove('btn-outline');
    } else {
        buttons[2].classList.add('btn-primary');
        buttons[2].classList.remove('btn-outline');
    }

    updateFinanceChart();
}
