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
                    <span class="stat-card-title">Monthly Recurring</span>
                    <div class="stat-card-icon success">
                        <i class="fas fa-redo"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="financesMonthlyIncome">£0.00</div>
                <div class="stat-card-description">Monthly retainer income</div>
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
                        <span class="stat-card-title">One-Time Jobs</span>
                        <div class="stat-card-icon primary">
                            <i class="fas fa-pound-sign"></i>
                        </div>
                    </div>
                    <div class="stat-card-value" id="oneTimeJobsIncome">£0.00</div>
                    <div class="stat-card-description" id="oneTimeJobsCount">0 jobs</div>
                </div>

                <div class="stat-card">
                    <div class="stat-card-header">
                        <span class="stat-card-title">Monthly Contracts</span>
                        <div class="stat-card-icon success">
                            <i class="fas fa-calendar-alt"></i>
                        </div>
                    </div>
                    <div class="stat-card-value" id="monthlyJobsIncome">£0.00</div>
                    <div class="stat-card-description" id="monthlyJobsCount">0 active contracts</div>
                </div>

                <div class="stat-card">
                    <div class="stat-card-header">
                        <span class="stat-card-title">Projected Annual</span>
                        <div class="stat-card-icon secondary">
                            <i class="fas fa-calculator"></i>
                        </div>
                    </div>
                    <div class="stat-card-value" id="projectedAnnual">£0.00</div>
                    <div class="stat-card-description">Based on current monthly</div>
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

        // Calculate total income
        const totalIncome = allJobs.reduce((sum, job) => sum + (parseFloat(job.amount) || 0), 0);
        document.getElementById('financesTotalIncome').textContent = `£${totalIncome.toFixed(2)}`;

        // Calculate monthly recurring income
        const monthlyIncome = allJobs
            .filter(job => job.paymentType === 'monthly' && job.status !== 'completed' && job.status !== 'inactive')
            .reduce((sum, job) => sum + (parseFloat(job.amount) || 0), 0);
        document.getElementById('financesMonthlyIncome').textContent = `£${monthlyIncome.toFixed(2)}`;

        // Calculate average job value
        const avgJobValue = allJobs.length > 0 ? totalIncome / allJobs.length : 0;
        document.getElementById('financesAvgJobValue').textContent = `£${avgJobValue.toFixed(2)}`;

        // Count completed jobs
        const completedJobs = allJobs.filter(job => job.status === 'completed').length;
        document.getElementById('financesCompletedJobs').textContent = completedJobs;

        // Income breakdown
        const oneTimeJobs = allJobs.filter(job => job.paymentType === 'one_time');
        const oneTimeIncome = oneTimeJobs.reduce((sum, job) => sum + (parseFloat(job.amount) || 0), 0);
        document.getElementById('oneTimeJobsIncome').textContent = `£${oneTimeIncome.toFixed(2)}`;
        document.getElementById('oneTimeJobsCount').textContent = `${oneTimeJobs.length} jobs`;

        const monthlyJobs = allJobs.filter(job => job.paymentType === 'monthly' && job.status !== 'completed' && job.status !== 'inactive');
        document.getElementById('monthlyJobsIncome').textContent = `£${monthlyIncome.toFixed(2)}`;
        document.getElementById('monthlyJobsCount').textContent = `${monthlyJobs.length} active contracts`;

        // Projected annual income
        const projectedAnnual = monthlyIncome * 12;
        document.getElementById('projectedAnnual').textContent = `£${projectedAnnual.toFixed(2)}`;

        // Show motivational message
        displayIncomeMotivation(totalIncome, monthlyIncome);

    } catch (error) {
        console.error('Error loading financial data:', error);
    }
}

// Display motivational message based on income
function displayIncomeMotivation(totalIncome, monthlyIncome) {
    const container = document.getElementById('incomeMotivation');

    let message = '';
    let icon = '';

    if (monthlyIncome >= 5000) {
        message = "You're making serious moves, Charlie! £5K+ monthly is incredible!";
        icon = '🚀';
    } else if (monthlyIncome >= 3000) {
        message = "Crushing it! £3K+ monthly - keep scaling up!";
        icon = '💰';
    } else if (monthlyIncome >= 1000) {
        message = "Great progress! £1K+ monthly - you're building something real!";
        icon = '📈';
    } else if (monthlyIncome > 0) {
        message = "You're on the board! Keep adding those monthly contracts!";
        icon = '💪';
    } else {
        message = "Time to get those first monthly contracts, Charlie! Your empire awaits!";
        icon = '🎯';
    }

    if (totalIncome > 0) {
        container.innerHTML = `
            <div class="motivational-message">
                <h2>${icon} ${message}</h2>
                <p>Total income: £${totalIncome.toFixed(2)} | Monthly recurring: £${monthlyIncome.toFixed(2)}</p>
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
