// Clients Management System

let allClients = [];
let editingClientId = null;

// Render Clients Page
function renderClientsPage() {
    return `
        <div class="page-header">
            <h1 class="page-title">Clients</h1>
            <p class="page-subtitle">Manage your paying clients and their information</p>
        </div>

        <!-- Client Stats -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Total Clients</span>
                    <div class="stat-card-icon primary">
                        <i class="fas fa-user-tie"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="totalClientsCount">0</div>
                <div class="stat-card-description">Active clients</div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Total Revenue</span>
                    <div class="stat-card-icon success">
                        <i class="fas fa-pound-sign"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="clientTotalRevenue">£0.00</div>
                <div class="stat-card-description">From all their jobs</div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Avg. Client Value</span>
                    <div class="stat-card-icon secondary">
                        <i class="fas fa-chart-bar"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="avgClientValue">£0.00</div>
                <div class="stat-card-description">Total revenue / clients</div>
            </div>
        </div>

        <div class="content-card">
            <div class="content-card-header">
                <h2 class="content-card-title">Client List</h2>
                <button class="btn btn-primary" onclick="openClientModal()">
                    <i class="fas fa-plus"></i> Add Client
                </button>
            </div>

            <div id="clientsContainer">
                <p style="text-align: center; color: var(--bodyTextColor); padding: 2rem;">
                    Loading clients...
                </p>
            </div>
        </div>

        <!-- Clients Growth Chart -->
        <div class="content-card">
            <div class="content-card-header">
                <h2 class="content-card-title">Clients Added Over Time</h2>
                <div class="chart-controls">
                    <button class="btn btn-small btn-primary" onclick="changeClientsTimeframe('week')">
                        Weekly
                    </button>
                    <button class="btn btn-small btn-outline" onclick="changeClientsTimeframe('month')">
                        Monthly
                    </button>
                    <button class="btn btn-small btn-outline" onclick="changeClientsTimeframe('year')">
                        Yearly
                    </button>
                </div>
            </div>
            <div style="padding: 2rem; position: relative; height: 350px;">
                <canvas id="clientsGrowthChart"></canvas>
            </div>
        </div>

        <!-- Client Modal -->
        <div id="clientModal" class="modal">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2 id="clientModalTitle">Add Client</h2>
                    <button class="modal-close" onclick="closeClientModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="clientForm" class="modal-body">
                    <h3 style="margin-bottom: 1rem; color: var(--headerColor);">
                        <i class="fas fa-user"></i> Contact Information
                    </h3>

                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label" for="clientName">Client Name *</label>
                            <input type="text" id="clientName" class="form-input" required placeholder="Business or person name">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="clientArea">Area</label>
                            <input type="text" id="clientArea" class="form-input" placeholder="e.g., Yeovil">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label" for="clientPhone">Phone Number *</label>
                            <input type="tel" id="clientPhone" class="form-input" required placeholder="07123 456789">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="clientEmail">Email *</label>
                            <input type="email" id="clientEmail" class="form-input" required placeholder="email@example.com">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="clientWebsite">Website Link</label>
                        <input type="url" id="clientWebsite" class="form-input" placeholder="https://example.com">
                    </div>

                    <hr style="margin: 2rem 0; border: none; border-top: 2px solid #f0f0f0;">

                    <h3 style="margin-bottom: 1rem; color: var(--headerColor);">
                        <i class="fas fa-box"></i> Package Information
                    </h3>

                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label" for="clientPackage">Package</label>
                            <select id="clientPackage" class="form-select">
                                <option value="">Select a package</option>
                                <option value="website_starter">Website Starter</option>
                                <option value="website_pro">Website Pro</option>
                                <option value="website_elite">Website Elite</option>
                                <option value="custom">Custom Package</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="clientMonthlyPayment">Legacy Monthly Payment (deprecated)</label>
                            <input type="number" id="clientMonthlyPayment" class="form-input" placeholder="0.00" step="0.01" min="0">
                            <small style="color: #6c757d; display: block; margin-top: 0.5rem;">
                                <i class="fas fa-info-circle"></i> For existing monthly clients only. New pricing uses hosting plans.
                            </small>
                        </div>
                    </div>

                    <hr style="margin: 2rem 0; border: none; border-top: 2px solid #f0f0f0;">

                    <h3 style="margin-bottom: 1rem; color: var(--headerColor);">
                        <i class="fas fa-key"></i> Access & Credentials
                    </h3>

                    <div class="form-group">
                        <label class="form-label" for="clientPasswords">Passwords & Login Info</label>
                        <textarea id="clientPasswords" class="form-textarea" placeholder="Store website login, hosting passwords, etc. (Encrypted in Firebase)"></textarea>
                        <small style="color: var(--bodyTextColor); display: block; margin-top: 0.5rem;">
                            <i class="fas fa-info-circle"></i> Store all passwords and login credentials here
                        </small>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="clientNotes">Notes</label>
                        <textarea id="clientNotes" class="form-textarea" placeholder="Add any notes about this client..."></textarea>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline" onclick="closeClientModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Client</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

// Initialize Clients Page
function initializeClientsPage() {
    loadClients();

    const clientForm = document.getElementById('clientForm');
    if (clientForm) {
        clientForm.addEventListener('submit', handleClientSave);
    }

    // Initialize clients growth chart
    initializeClientsGrowthChart();
}

// Load all clients
async function loadClients() {
    try {
        const snapshot = await clientsCollection.orderBy('name').get();
        allClients = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        displayClients();
        updateClientStats();
    } catch (error) {
        console.error('Error loading clients:', error);
        document.getElementById('clientsContainer').innerHTML = `
            <p style="text-align: center; color: var(--primary); padding: 2rem;">
                Error loading clients. Please try again.
            </p>
        `;
    }
}

// Display clients
function displayClients() {
    const container = document.getElementById('clientsContainer');

    if (allClients.length === 0) {
        container.innerHTML = `
            <p style="text-align: center; color: var(--bodyTextColor); padding: 2rem;">
                No clients yet. Convert some prospects or click "Add Client" to get started!
            </p>
        `;
        return;
    }

    const tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Website</th>
                    <th>Package</th>
                    <th>Monthly Payment</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${allClients.map(client => `
                    <tr>
                        <td><strong>${escapeHtml(client.name)}</strong></td>
                        <td>
                            <a href="tel:${escapeHtml(client.phone)}">${escapeHtml(client.phone)}</a><br>
                            <a href="mailto:${escapeHtml(client.email)}">${escapeHtml(client.email)}</a>
                        </td>
                        <td>${client.website ? `<a href="${escapeHtml(client.website)}" target="_blank">View Site</a>` : '-'}</td>
                        <td>${client.package ? escapeHtml(getPackageDisplayName(client.package)) : '-'}</td>
                        <td>${client.monthlyPayment ? `£${parseFloat(client.monthlyPayment).toFixed(2)}` : '-'}</td>
                        <td>
                            <button class="btn-icon btn-secondary" onclick="viewClient('${client.id}')" title="View Details">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-icon btn-primary" onclick="editClient('${client.id}')" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon" style="background: #dc3545; color: white;" onclick="deleteClient('${client.id}')" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    container.innerHTML = tableHTML;
}

// Update client stats
async function updateClientStats() {
    try {
        // Total clients
        document.getElementById('totalClientsCount').textContent = allClients.length;

        // Get all jobs to calculate total revenue
        const allJobs = await getAllJobs();

        // Calculate total revenue from all jobs for all clients
        const totalRevenue = allJobs.reduce((sum, job) => sum + (parseFloat(job.amount) || 0), 0);
        document.getElementById('clientTotalRevenue').textContent = `£${totalRevenue.toFixed(2)}`;

        // Calculate average client value (total revenue / number of clients)
        const avgValue = allClients.length > 0 ? totalRevenue / allClients.length : 0;
        document.getElementById('avgClientValue').textContent = `£${avgValue.toFixed(2)}`;

    } catch (error) {
        console.error('Error updating client stats:', error);
    }
}

// Open client modal
function openClientModal(clientId = null) {
    const modal = document.getElementById('clientModal');
    const modalTitle = document.getElementById('clientModalTitle');
    const clientForm = document.getElementById('clientForm');

    editingClientId = clientId;

    if (clientId) {
        const client = allClients.find(c => c.id === clientId);
        if (client) {
            modalTitle.textContent = 'Edit Client';
            document.getElementById('clientName').value = client.name;
            document.getElementById('clientArea').value = client.area || '';
            document.getElementById('clientPhone').value = client.phone;
            document.getElementById('clientEmail').value = client.email;
            document.getElementById('clientWebsite').value = client.website || '';
            document.getElementById('clientPackage').value = client.package || '';
            document.getElementById('clientMonthlyPayment').value = client.monthlyPayment || '';
            document.getElementById('clientPasswords').value = client.passwords || '';
            document.getElementById('clientNotes').value = client.notes || '';
        }
    } else {
        modalTitle.textContent = 'Add Client';
        clientForm.reset();
    }

    modal.classList.add('active');
}

// Close client modal
function closeClientModal() {
    const modal = document.getElementById('clientModal');
    modal.classList.remove('active');
    editingClientId = null;
    document.getElementById('clientForm').reset();
}

// Handle client save
async function handleClientSave(e) {
    e.preventDefault();

    const clientData = {
        name: document.getElementById('clientName').value.trim(),
        area: document.getElementById('clientArea').value.trim(),
        phone: document.getElementById('clientPhone').value.trim(),
        email: document.getElementById('clientEmail').value.trim(),
        website: document.getElementById('clientWebsite').value.trim(),
        package: document.getElementById('clientPackage').value,
        monthlyPayment: parseFloat(document.getElementById('clientMonthlyPayment').value) || 0,
        passwords: document.getElementById('clientPasswords').value.trim(),
        notes: document.getElementById('clientNotes').value.trim()
    };

    if (!clientData.name || !clientData.phone || !clientData.email) {
        alert('Please fill in all required fields');
        return;
    }

    try {
        if (editingClientId) {
            await clientsCollection.doc(editingClientId).update({
                ...clientData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } else {
            await clientsCollection.add({
                ...clientData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }

        closeClientModal();
        loadClients();
    } catch (error) {
        console.error('Error saving client:', error);
        alert('Error saving client. Please try again.');
    }
}

// View client details
function viewClient(clientId) {
    const client = allClients.find(c => c.id === clientId);
    if (!client) return;

    const details = `
Client Details:

Name: ${client.name}
Area: ${client.area || 'N/A'}
Phone: ${client.phone}
Email: ${client.email}
Website: ${client.website || 'N/A'}
Package: ${client.package || 'N/A'}
Monthly Payment: £${parseFloat(client.monthlyPayment || 0).toFixed(2)}
Notes: ${client.notes || 'No notes'}

Passwords/Credentials:
${client.passwords || 'No passwords stored'}
    `;

    alert(details);
}

// Edit client
function editClient(clientId) {
    openClientModal(clientId);
}

// Delete client with protection
async function deleteClient(clientId) {
    const client = allClients.find(c => c.id === clientId);
    if (!client) return;

    try {
        // Check if client has any jobs
        const jobsSnapshot = await jobsCollection.where('clientId', '==', clientId).get();

        if (!jobsSnapshot.empty) {
            alert(`Cannot delete ${client.name} because they have ${jobsSnapshot.size} job(s) assigned to them.\n\nPlease delete or reassign the jobs first.`);
            return;
        }

        if (!confirm(`Are you sure you want to delete ${client.name}? This action cannot be undone.`)) {
            return;
        }

        await clientsCollection.doc(clientId).delete();
        loadClients();
    } catch (error) {
        console.error('Error deleting client:', error);
        alert('Error deleting client. Please try again.');
    }
}

// Helper to get all clients
async function getAllClients() {
    try {
        const snapshot = await clientsCollection.get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting clients:', error);
        return [];
    }
}

// Clients Growth Chart
let clientsGrowthChart = null;
let currentClientsTimeframe = 'week';

async function initializeClientsGrowthChart() {
    const ctx = document.getElementById('clientsGrowthChart');
    if (!ctx) return;

    await updateClientsGrowthChart();
}

async function updateClientsGrowthChart() {
    try {
        const allClientsData = await getAllClients();

        let labels = [];
        let data = [];
        const today = new Date();

        if (currentClientsTimeframe === 'week') {
            // Last 7 days
            for (let i = 6; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                labels.push(date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' }));

                const dayCount = allClientsData.filter(c => {
                    if (!c.createdAt) return false;
                    const cDate = c.createdAt.toDate();
                    return cDate.toDateString() === date.toDateString();
                }).length;

                data.push(dayCount);
            }
        } else if (currentClientsTimeframe === 'month') {
            // Last 30 days
            for (let i = 29; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                labels.push(date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }));

                const dayCount = allClientsData.filter(c => {
                    if (!c.createdAt) return false;
                    const cDate = c.createdAt.toDate();
                    return cDate.toDateString() === date.toDateString();
                }).length;

                data.push(dayCount);
            }
        } else {
            // Last 12 months
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            for (let i = 11; i >= 0; i--) {
                const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
                labels.push(months[date.getMonth()] + ' ' + date.getFullYear().toString().substr(2));

                const monthCount = allClientsData.filter(c => {
                    if (!c.createdAt) return false;
                    const cDate = c.createdAt.toDate();
                    return cDate.getMonth() === date.getMonth() && cDate.getFullYear() === date.getFullYear();
                }).length;

                data.push(monthCount);
            }
        }

        // Destroy existing chart
        if (clientsGrowthChart) {
            clientsGrowthChart.destroy();
        }

        // Create new chart
        const ctx = document.getElementById('clientsGrowthChart').getContext('2d');
        clientsGrowthChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'New Clients',
                    data: data,
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
        console.error('Error creating clients growth chart:', error);
    }
}

function changeClientsTimeframe(timeframe) {
    currentClientsTimeframe = timeframe;

    // Update button states
    const buttons = document.querySelectorAll('.chart-controls .btn');
    buttons.forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline');
    });

    if (timeframe === 'week') {
        buttons[0].classList.add('btn-primary');
        buttons[0].classList.remove('btn-outline');
    } else if (timeframe === 'month') {
        buttons[1].classList.add('btn-primary');
        buttons[1].classList.remove('btn-outline');
    } else {
        buttons[2].classList.add('btn-primary');
        buttons[2].classList.remove('btn-outline');
    }

    updateClientsGrowthChart();
}
