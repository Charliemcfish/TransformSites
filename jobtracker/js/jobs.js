// Jobs Management System

let jobs = [];
let clients = [];
let editingJobId = null;
let currentJobFilter = 'all';

// Render Jobs Page
function renderJobsPage() {
    return `
        <div class="page-header">
            <h1 class="page-title">Jobs</h1>
            <p class="page-subtitle">Manage your projects and track your work</p>
        </div>

        <!-- Filter Tabs -->
        <div class="tabs">
            <button class="tab active" onclick="filterJobs('all')">All Jobs</button>
            <button class="tab" onclick="filterJobs('in_progress')">In Progress</button>
            <button class="tab" onclick="filterJobs('completed')">Completed</button>
            <button class="tab" onclick="filterJobs('inactive')">Inactive</button>
        </div>

        <div class="content-card">
            <div class="content-card-header">
                <h2 class="content-card-title">Job List</h2>
                <button class="btn btn-primary" onclick="openJobModal()">
                    <i class="fas fa-plus"></i> Add Job
                </button>
            </div>

            <div id="jobsContainer">
                <p style="text-align: center; color: var(--bodyTextColor); padding: 2rem;">
                    Loading jobs...
                </p>
            </div>
        </div>

        <!-- Income Stats -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Total Income</span>
                    <div class="stat-card-icon primary">
                        <i class="fas fa-coins"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="totalJobIncome">£0.00</div>
                <div class="stat-card-description">All time from all jobs</div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Monthly Recurring</span>
                    <div class="stat-card-icon success">
                        <i class="fas fa-redo"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="monthlyRecurring">£0.00</div>
                <div class="stat-card-description">From active monthly jobs</div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">One-Time Income</span>
                    <div class="stat-card-icon secondary">
                        <i class="fas fa-pound-sign"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="oneTimeIncome">£0.00</div>
                <div class="stat-card-description">From one-time payment jobs</div>
            </div>
        </div>

        <!-- Job Modal -->
        <div id="jobModal" class="modal">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2 id="jobModalTitle">Add Job</h2>
                    <button class="modal-close" onclick="closeJobModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="jobForm" class="modal-body">
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label" for="jobName">Job Name *</label>
                            <input type="text" id="jobName" class="form-input" required placeholder="e.g., Website Redesign">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="jobClient">Client *</label>
                            <select id="jobClient" class="form-select" required>
                                <option value="">Select a client</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label" for="jobPaymentType">Payment Type *</label>
                            <select id="jobPaymentType" class="form-select" required onchange="updatePaymentTypeLabel()">
                                <option value="one_time">One-Time Payment</option>
                                <option value="monthly">Monthly Payment</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="jobAmount"><span id="paymentAmountLabel">Amount</span> *</label>
                            <input type="number" id="jobAmount" class="form-input" required placeholder="0.00" step="0.01" min="0">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label" for="jobPackage">Package</label>
                            <select id="jobPackage" class="form-select">
                                <option value="">Select a package</option>
                                <option value="starter">Starter Package</option>
                                <option value="professional">Professional Package</option>
                                <option value="premium">Premium Package</option>
                                <option value="custom">Custom Package</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="jobStatus">Status *</label>
                            <select id="jobStatus" class="form-select" required>
                                <option value="inactive">Inactive</option>
                                <option value="in_progress" selected>In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="jobNotes">Job Notes</label>
                        <textarea id="jobNotes" class="form-textarea" placeholder="Add any notes about this job..."></textarea>
                    </div>

                    <div id="clientInfo" class="client-info-box" style="display: none;"></div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline" onclick="closeJobModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Job</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

// Initialize Jobs Page
function initializeJobsPage() {
    loadJobs();
    loadClientsForDropdown();

    const jobForm = document.getElementById('jobForm');
    if (jobForm) {
        jobForm.addEventListener('submit', handleJobSave);
    }

    const jobClientSelect = document.getElementById('jobClient');
    if (jobClientSelect) {
        jobClientSelect.addEventListener('change', displayClientInfo);
    }
}

// Load all jobs
async function loadJobs() {
    try {
        const snapshot = await jobsCollection.orderBy('createdAt', 'desc').get();
        jobs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        displayJobs();
        updateJobStats();
    } catch (error) {
        console.error('Error loading jobs:', error);
        document.getElementById('jobsContainer').innerHTML = `
            <p style="text-align: center; color: var(--primary); padding: 2rem;">
                Error loading jobs. Please try again.
            </p>
        `;
    }
}

// Load clients for dropdown
async function loadClientsForDropdown() {
    try {
        const snapshot = await clientsCollection.orderBy('name').get();
        clients = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        const select = document.getElementById('jobClient');
        if (select) {
            select.innerHTML = '<option value="">Select a client</option>' +
                clients.map(client => `
                    <option value="${client.id}"
                        data-name="${escapeHtml(client.name)}"
                        data-email="${escapeHtml(client.email)}"
                        data-phone="${escapeHtml(client.phone)}"
                        data-website="${escapeHtml(client.website || '')}">
                        ${escapeHtml(client.name)}
                    </option>
                `).join('');
        }
    } catch (error) {
        console.error('Error loading clients:', error);
    }
}

// Display client info when selected
function displayClientInfo() {
    const select = document.getElementById('jobClient');
    const selectedOption = select.options[select.selectedIndex];
    const clientInfoBox = document.getElementById('clientInfo');

    if (select.value) {
        const name = selectedOption.getAttribute('data-name');
        const email = selectedOption.getAttribute('data-email');
        const phone = selectedOption.getAttribute('data-phone');
        const website = selectedOption.getAttribute('data-website');

        clientInfoBox.innerHTML = `
            <h4><i class="fas fa-user-tie"></i> Client Information</h4>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            ${website ? `<p><strong>Website:</strong> ${website}</p>` : ''}
        `;
        clientInfoBox.style.display = 'block';
    } else {
        clientInfoBox.style.display = 'none';
    }
}

// Update payment type label
function updatePaymentTypeLabel() {
    const paymentType = document.getElementById('jobPaymentType').value;
    const label = document.getElementById('paymentAmountLabel');

    if (paymentType === 'monthly') {
        label.textContent = 'Monthly Amount';
    } else {
        label.textContent = 'Amount';
    }
}

// Display jobs
function displayJobs() {
    const container = document.getElementById('jobsContainer');

    let filteredJobs = jobs;
    if (currentJobFilter !== 'all') {
        filteredJobs = jobs.filter(job => job.status === currentJobFilter);
    }

    if (filteredJobs.length === 0) {
        container.innerHTML = `
            <p style="text-align: center; color: var(--bodyTextColor); padding: 2rem;">
                No jobs found. Click "Add Job" to create your first job.
            </p>
        `;
        return;
    }

    const tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Job Name</th>
                    <th>Client</th>
                    <th>Package</th>
                    <th>Payment Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${filteredJobs.map(job => {
                    const client = clients.find(c => c.id === job.clientId);
                    const statusClass = job.status === 'completed' ? 'success' :
                                       job.status === 'in_progress' ? 'primary' : 'secondary';
                    return `
                        <tr>
                            <td><strong>${escapeHtml(job.name)}</strong></td>
                            <td>${client ? escapeHtml(client.name) : 'Unknown'}</td>
                            <td>${job.package ? escapeHtml(job.package.charAt(0).toUpperCase() + job.package.slice(1)) : '-'}</td>
                            <td>${job.paymentType === 'monthly' ? '💰 Monthly' : '💵 One-Time'}</td>
                            <td><strong>£${parseFloat(job.amount || 0).toFixed(2)}</strong></td>
                            <td><span class="badge badge-${statusClass}">${formatStatus(job.status)}</span></td>
                            <td>
                                <button class="btn-icon btn-secondary" onclick="viewJob('${job.id}')" title="View">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn-icon btn-primary" onclick="editJob('${job.id}')" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn-icon" style="background: #dc3545; color: white;" onclick="deleteJob('${job.id}')" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;

    container.innerHTML = tableHTML;
}

// Filter jobs
function filterJobs(filter) {
    currentJobFilter = filter;

    // Update tab active state
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab, index) => {
        tab.classList.remove('active');
        if ((filter === 'all' && index === 0) ||
            (filter === 'in_progress' && index === 1) ||
            (filter === 'completed' && index === 2) ||
            (filter === 'inactive' && index === 3)) {
            tab.classList.add('active');
        }
    });

    displayJobs();
}

// Update job stats
function updateJobStats() {
    // Total income from all jobs
    const totalIncome = jobs.reduce((sum, job) => sum + (parseFloat(job.amount) || 0), 0);
    document.getElementById('totalJobIncome').textContent = `£${totalIncome.toFixed(2)}`;

    // Monthly recurring (only from active monthly jobs)
    const monthlyRecurring = jobs
        .filter(job => job.paymentType === 'monthly' && job.status !== 'completed' && job.status !== 'inactive')
        .reduce((sum, job) => sum + (parseFloat(job.amount) || 0), 0);
    document.getElementById('monthlyRecurring').textContent = `£${monthlyRecurring.toFixed(2)}`;

    // One-time income
    const oneTimeIncome = jobs
        .filter(job => job.paymentType === 'one_time')
        .reduce((sum, job) => sum + (parseFloat(job.amount) || 0), 0);
    document.getElementById('oneTimeIncome').textContent = `£${oneTimeIncome.toFixed(2)}`;
}

// Open job modal
function openJobModal(jobId = null) {
    const modal = document.getElementById('jobModal');
    const modalTitle = document.getElementById('jobModalTitle');
    const jobForm = document.getElementById('jobForm');

    editingJobId = jobId;

    if (jobId) {
        const job = jobs.find(j => j.id === jobId);
        if (job) {
            modalTitle.textContent = 'Edit Job';
            document.getElementById('jobName').value = job.name;
            document.getElementById('jobClient').value = job.clientId;
            document.getElementById('jobPaymentType').value = job.paymentType;
            document.getElementById('jobAmount').value = job.amount;
            document.getElementById('jobPackage').value = job.package || '';
            document.getElementById('jobStatus').value = job.status;
            document.getElementById('jobNotes').value = job.notes || '';
            displayClientInfo();
            updatePaymentTypeLabel();
        }
    } else {
        modalTitle.textContent = 'Add Job';
        jobForm.reset();
        document.getElementById('clientInfo').style.display = 'none';
    }

    modal.classList.add('active');
}

// Close job modal
function closeJobModal() {
    const modal = document.getElementById('jobModal');
    modal.classList.remove('active');
    editingJobId = null;
    document.getElementById('jobForm').reset();
}

// Handle job save
async function handleJobSave(e) {
    e.preventDefault();

    const jobData = {
        name: document.getElementById('jobName').value.trim(),
        clientId: document.getElementById('jobClient').value,
        paymentType: document.getElementById('jobPaymentType').value,
        amount: parseFloat(document.getElementById('jobAmount').value),
        package: document.getElementById('jobPackage').value,
        status: document.getElementById('jobStatus').value,
        notes: document.getElementById('jobNotes').value.trim()
    };

    if (!jobData.name || !jobData.clientId) {
        alert('Please fill in all required fields');
        return;
    }

    try {
        if (editingJobId) {
            await jobsCollection.doc(editingJobId).update({
                ...jobData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } else {
            await jobsCollection.add({
                ...jobData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }

        closeJobModal();
        loadJobs();
    } catch (error) {
        console.error('Error saving job:', error);
        alert('Error saving job. Please try again.');
    }
}

// View job
function viewJob(jobId) {
    editJob(jobId);
}

// Edit job
function editJob(jobId) {
    openJobModal(jobId);
}

// Delete job
async function deleteJob(jobId) {
    if (!confirm('Are you sure you want to delete this job?')) {
        return;
    }

    try {
        await jobsCollection.doc(jobId).delete();
        loadJobs();
    } catch (error) {
        console.error('Error deleting job:', error);
        alert('Error deleting job. Please try again.');
    }
}

// Format status
function formatStatus(status) {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Helper to get all jobs
async function getAllJobs() {
    try {
        const snapshot = await jobsCollection.get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting jobs:', error);
        return [];
    }
}
