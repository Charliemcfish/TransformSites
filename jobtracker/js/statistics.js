// Statistics Management System

let prospectsChart = null;
let clientsChart = null;
let jobsChart = null;
let conversionChart = null;

// Render Statistics Page
function renderStatisticsPage() {
    return `
        <div class="page-header">
            <h1 class="page-title">Statistics</h1>
            <p class="page-subtitle">Analyze your agency's growth and performance</p>
        </div>

        <!-- Key Metrics -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Total Prospects</span>
                    <div class="stat-card-icon primary">
                        <i class="fas fa-users"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="statsTotalProspects">0</div>
                <div class="stat-card-description">All time prospects added</div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Active Pipeline</span>
                    <div class="stat-card-icon secondary">
                        <i class="fas fa-user-clock"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="statsActivePipeline">0</div>
                <div class="stat-card-description">Currently being pursued</div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Success Rate</span>
                    <div class="stat-card-icon success">
                        <i class="fas fa-trophy"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="statsSuccessRate">0%</div>
                <div class="stat-card-description">Prospects to clients</div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Job Completion</span>
                    <div class="stat-card-icon success">
                        <i class="fas fa-check-double"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="statsJobCompletion">0%</div>
                <div class="stat-card-description">Jobs completed rate</div>
            </div>
        </div>

        <!-- Prospects Growth Chart -->
        <div class="content-card">
            <div class="content-card-header">
                <h2 class="content-card-title"><i class="fas fa-chart-line"></i> Prospects Over Time</h2>
            </div>
            <div style="padding: 2rem; position: relative; height: 350px;">
                <canvas id="prospectsChart"></canvas>
            </div>
        </div>

        <!-- Two Column Charts -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
            <!-- Conversion Funnel -->
            <div class="content-card">
                <div class="content-card-header">
                    <h2 class="content-card-title"><i class="fas fa-filter"></i> Conversion Funnel</h2>
                </div>
                <div style="padding: 2rem; position: relative; height: 350px;">
                    <canvas id="conversionChart"></canvas>
                </div>
            </div>

            <!-- Jobs Status Distribution -->
            <div class="content-card">
                <div class="content-card-header">
                    <h2 class="content-card-title"><i class="fas fa-briefcase"></i> Jobs Status</h2>
                </div>
                <div style="padding: 2rem; position: relative; height: 350px;">
                    <canvas id="jobsChart"></canvas>
                </div>
            </div>
        </div>

        <!-- Growth Insights -->
        <div class="content-card">
            <div class="content-card-header">
                <h2 class="content-card-title"><i class="fas fa-lightbulb"></i> Growth Insights</h2>
            </div>
            <div id="growthInsights" style="padding: 2rem;">
                <p style="text-align: center; color: var(--bodyTextColor);">Loading insights...</p>
            </div>
        </div>
    `;
}

// Initialize Statistics Page
async function initializeStatisticsPage() {
    await loadStatistics();
    initializeCharts();
}

// Load statistics data
async function loadStatistics() {
    try {
        const allProspects = await getAllProspects();
        const allClients = await getAllClients();
        const allJobs = await getAllJobs();

        // Update key metrics
        document.getElementById('statsTotalProspects').textContent = allProspects.length;

        const activePipeline = allProspects.filter(p => p.status === 'new' || p.status === 'active').length;
        document.getElementById('statsActivePipeline').textContent = activePipeline;

        const convertedCount = allProspects.filter(p => p.status === 'converted').length;
        const successRate = allProspects.length > 0 ? ((convertedCount / allProspects.length) * 100).toFixed(1) : 0;
        document.getElementById('statsSuccessRate').textContent = `${successRate}%`;

        const completedJobs = allJobs.filter(j => j.status === 'completed').length;
        const jobCompletionRate = allJobs.length > 0 ? ((completedJobs / allJobs.length) * 100).toFixed(1) : 0;
        document.getElementById('statsJobCompletion').textContent = `${jobCompletionRate}%`;

        // Generate insights
        generateGrowthInsights(allProspects, allClients, allJobs);

    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

// Initialize all charts
async function initializeCharts() {
    await initializeProspectsChart();
    await initializeConversionChart();
    await initializeJobsChart();
}

// Prospects Over Time Chart
async function initializeProspectsChart() {
    try {
        const allProspects = await getAllProspects();

        // Group prospects by month
        const monthlyData = {};
        const cumulativeData = {};

        allProspects.forEach(prospect => {
            if (!prospect.createdAt) return;
            const date = prospect.createdAt.toDate();
            const key = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0');

            if (!monthlyData[key]) {
                monthlyData[key] = 0;
            }
            monthlyData[key]++;
        });

        // Sort and create labels
        const sortedKeys = Object.keys(monthlyData).sort();
        const labels = [];
        const data = [];
        const cumulative = [];
        let total = 0;

        sortedKeys.forEach(key => {
            const [year, month] = key.split('-');
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            labels.push(months[parseInt(month) - 1] + ' ' + year.substr(2));
            data.push(monthlyData[key]);
            total += monthlyData[key];
            cumulative.push(total);
        });

        const ctx = document.getElementById('prospectsChart').getContext('2d');
        prospectsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'New Prospects',
                    data: data,
                    borderColor: '#EA435D',
                    backgroundColor: 'rgba(234, 67, 93, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Total Prospects',
                    data: cumulative,
                    borderColor: '#361D49',
                    backgroundColor: 'rgba(54, 29, 73, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: getChartOptions('Prospects')
        });
    } catch (error) {
        console.error('Error creating prospects chart:', error);
    }
}

// Conversion Funnel Chart
async function initializeConversionChart() {
    try {
        const allProspects = await getAllProspects();

        const newProspects = allProspects.filter(p => p.status === 'new').length;
        const activeProspects = allProspects.filter(p => p.status === 'active').length;
        const convertedProspects = allProspects.filter(p => p.status === 'converted').length;

        const ctx = document.getElementById('conversionChart').getContext('2d');
        conversionChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['New Prospects', 'Active Prospects', 'Converted Clients'],
                datasets: [{
                    data: [newProspects, activeProspects, convertedProspects],
                    backgroundColor: [
                        'rgba(234, 67, 93, 0.8)',
                        'rgba(54, 29, 73, 0.8)',
                        'rgba(40, 167, 69, 0.8)'
                    ],
                    borderColor: [
                        '#EA435D',
                        '#361D49',
                        '#28a745'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'Poppins',
                                size: 13,
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
                        padding: 12
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating conversion chart:', error);
    }
}

// Jobs Status Chart
async function initializeJobsChart() {
    try {
        const allJobs = await getAllJobs();

        const inactiveJobs = allJobs.filter(j => j.status === 'inactive').length;
        const inProgressJobs = allJobs.filter(j => j.status === 'in_progress').length;
        const completedJobs = allJobs.filter(j => j.status === 'completed').length;

        const ctx = document.getElementById('jobsChart').getContext('2d');
        jobsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Inactive', 'In Progress', 'Completed'],
                datasets: [{
                    label: 'Jobs',
                    data: [inactiveJobs, inProgressJobs, completedJobs],
                    backgroundColor: [
                        'rgba(108, 117, 125, 0.8)',
                        'rgba(234, 67, 93, 0.8)',
                        'rgba(40, 167, 69, 0.8)'
                    ],
                    borderColor: [
                        '#6c757d',
                        '#EA435D',
                        '#28a745'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
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
                        padding: 12
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
                            stepSize: 1
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                family: 'Poppins',
                                size: 13,
                                weight: '600'
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating jobs chart:', error);
    }
}

// Generate growth insights
function generateGrowthInsights(prospects, clients, jobs) {
    const container = document.getElementById('growthInsights');

    const insights = [];

    // Conversion rate insight
    const convertedCount = prospects.filter(p => p.status === 'converted').length;
    const conversionRate = prospects.length > 0 ? ((convertedCount / prospects.length) * 100).toFixed(1) : 0;

    if (conversionRate >= 20) {
        insights.push({
            icon: '🎯',
            title: 'Excellent Conversion Rate',
            description: `You're converting ${conversionRate}% of your prospects! That's outstanding performance.`,
            type: 'success'
        });
    } else if (conversionRate >= 10) {
        insights.push({
            icon: '📈',
            title: 'Good Conversion Rate',
            description: `${conversionRate}% conversion rate is solid. Keep refining your sales process to push even higher!`,
            type: 'primary'
        });
    } else if (prospects.length > 0) {
        insights.push({
            icon: '💪',
            title: 'Room for Improvement',
            description: `Your ${conversionRate}% conversion rate has room to grow. Focus on follow-ups and improving your pitch!`,
            type: 'secondary'
        });
    }

    // Pipeline insight
    const activeProspects = prospects.filter(p => p.status === 'active').length;
    if (activeProspects > 10) {
        insights.push({
            icon: '🔥',
            title: 'Hot Pipeline',
            description: `You have ${activeProspects} active prospects in your pipeline. Stay on top of follow-ups!`,
            type: 'primary'
        });
    } else if (activeProspects > 0) {
        insights.push({
            icon: '📞',
            title: 'Active Prospects',
            description: `${activeProspects} prospects are in play. Keep the momentum going with consistent outreach!`,
            type: 'secondary'
        });
    }

    // Jobs completion insight
    const completedJobs = jobs.filter(j => j.status === 'completed').length;
    const completionRate = jobs.length > 0 ? ((completedJobs / jobs.length) * 100).toFixed(1) : 0;

    if (completedJobs > 0) {
        insights.push({
            icon: '✅',
            title: 'Delivery Excellence',
            description: `You've completed ${completedJobs} jobs with a ${completionRate}% completion rate. Keep delivering quality work!`,
            type: 'success'
        });
    }

    // Client growth insight
    if (clients.length >= 10) {
        insights.push({
            icon: '🚀',
            title: 'Scaling Up',
            description: `${clients.length} active clients! You're building a real agency here, Charlie!`,
            type: 'success'
        });
    } else if (clients.length > 0) {
        insights.push({
            icon: '🌱',
            title: 'Growing Client Base',
            description: `${clients.length} clients and counting. Every client is a step toward your agency goals!`,
            type: 'primary'
        });
    }

    // New prospects insight
    const newProspects = prospects.filter(p => p.status === 'new').length;
    if (newProspects > 20) {
        insights.push({
            icon: '💰',
            title: 'Massive Pipeline',
            description: `${newProspects} new prospects waiting for outreach! Time to convert them into paying clients!`,
            type: 'primary'
        });
    }

    // Render insights
    if (insights.length === 0) {
        container.innerHTML = `
            <div class="insight-card secondary">
                <div class="insight-icon">🎯</div>
                <div class="insight-content">
                    <h3>Get Started</h3>
                    <p>Start adding prospects to see insights about your agency's growth!</p>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = insights.map(insight => `
            <div class="insight-card ${insight.type}">
                <div class="insight-icon">${insight.icon}</div>
                <div class="insight-content">
                    <h3>${insight.title}</h3>
                    <p>${insight.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .insight-card {
            display: flex;
            align-items: flex-start;
            gap: 1.5rem;
            padding: 1.5rem;
            background: #f8f9fa;
            border-radius: 10px;
            margin-bottom: 1rem;
            border-left: 4px solid var(--primary);
        }
        .insight-card.success { border-left-color: #28a745; }
        .insight-card.primary { border-left-color: #EA435D; }
        .insight-card.secondary { border-left-color: #361D49; }
        .insight-icon {
            font-size: 2rem;
            flex-shrink: 0;
        }
        .insight-content h3 {
            margin: 0 0 0.5rem 0;
            font-size: 1.1rem;
            color: var(--headerColor);
        }
        .insight-content p {
            margin: 0;
            color: var(--bodyTextColor);
            line-height: 1.6;
        }
    `;
    document.head.appendChild(style);
}

// Common chart options
function getChartOptions(label) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    font: {
                        family: 'Poppins',
                        size: 13,
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
                displayColors: true
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
                    stepSize: 1
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
    };
}
