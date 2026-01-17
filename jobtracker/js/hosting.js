// Hosting Management System

let hostingPlans = [];
let editingHostingId = null;

// Render Hosting Page
function renderHostingPage() {
    return `
        <div class="page-header">
            <h1 class="page-title">Hosting Management</h1>
            <p class="page-subtitle">Track annual hosting plans and renewal dates</p>
        </div>

        <!-- Hosting Stats -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Active Hosting Plans</span>
                    <div class="stat-card-icon primary">
                        <i class="fas fa-server"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="activeHostingCount">0</div>
                <div class="stat-card-description">Currently active</div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Annual Hosting Revenue</span>
                    <div class="stat-card-icon success">
                        <i class="fas fa-pound-sign"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="hostingRevenue">£0.00</div>
                <div class="stat-card-description">From all hosting plans</div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Renewals Due Soon</span>
                    <div class="stat-card-icon warning">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="renewalsDue">0</div>
                <div class="stat-card-description">Within 14 days</div>
            </div>
        </div>

        <!-- Renewal Warnings -->
        <div id="renewalWarnings"></div>

        <!-- Hosting Plans List -->
        <div class="content-card">
            <div class="content-card-header">
                <h2 class="content-card-title">Hosting Plans</h2>
                <button class="btn btn-primary" onclick="openHostingModal()">
                    <i class="fas fa-plus"></i> Add Hosting Plan
                </button>
            </div>

            <div id="hostingContainer">
                <p style="text-align: center; color: var(--bodyTextColor); padding: 2rem;">
                    Loading hosting plans...
                </p>
            </div>
        </div>

        <!-- Hosting Modal -->
        <div id="hostingModal" class="modal">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2 id="hostingModalTitle">Add Hosting Plan</h2>
                    <button class="modal-close" onclick="closeHostingModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="hostingForm" class="modal-body">
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label" for="hostingClient">Client *</label>
                            <select id="hostingClient" class="form-select" required>
                                <option value="">Select a client</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="hostingPackage">Package Type *</label>
                            <select id="hostingPackage" class="form-select" required onchange="updateHostingCost()">
                                <option value="">Select package</option>
                                <option value="website_starter">Website Starter (£100/year)</option>
                                <option value="website_pro">Website Pro (£125/year)</option>
                                <option value="website_elite">Website Elite (£150/year)</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label" for="hostingCost">Annual Cost (£) *</label>
                            <input type="number" id="hostingCost" class="form-input" required placeholder="0.00" step="0.01" min="0">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="hostingStatus">Status *</label>
                            <select id="hostingStatus" class="form-select" required>
                                <option value="active">Active</option>
                                <option value="expired">Expired</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label" for="hostingStartDate">Start Date *</label>
                            <input type="date" id="hostingStartDate" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="hostingRenewalDate">Renewal Date *</label>
                            <input type="date" id="hostingRenewalDate" class="form-input" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="hostingNotes">Notes</label>
                        <textarea id="hostingNotes" class="form-textarea" placeholder="Add hosting notes..."></textarea>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline" onclick="closeHostingModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Hosting Plan</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

// Initialize Hosting Page
function initializeHostingPage() {
    loadHostingPlans();
    loadClientsForHostingDropdown();

    const hostingForm = document.getElementById('hostingForm');
    if (hostingForm) {
        hostingForm.addEventListener('submit', handleHostingSave);
    }
}

// Load all hosting plans
async function loadHostingPlans() {
    try {
        const snapshot = await hostingPlansCollection.orderBy('renewalDate', 'asc').get();
        hostingPlans = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        displayHostingPlans();
        updateHostingStats();
        displayRenewalWarnings();
    } catch (error) {
        console.error('Error loading hosting plans:', error);
        document.getElementById('hostingContainer').innerHTML = `
            <p style="text-align: center; color: var(--primary); padding: 2rem;">
                Error loading hosting plans. Please try again.
            </p>
        `;
    }
}

// Display hosting plans
function displayHostingPlans() {
    const container = document.getElementById('hostingContainer');

    if (hostingPlans.length === 0) {
        container.innerHTML = `
            <p style="text-align: center; color: var(--bodyTextColor); padding: 2rem;">
                No hosting plans yet. Click "Add Hosting Plan" to create one.
            </p>
        `;
        return;
    }

    const tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Client</th>
                    <th>Package</th>
                    <th>Cost</th>
                    <th>Start Date</th>
                    <th>Renewal Date</th>
                    <th>Days Until Renewal</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${hostingPlans.map(plan => {
                    const renewalDate = plan.renewalDate.toDate();
                    const today = new Date();
                    const daysUntilRenewal = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24));

                    let rowColor = '';
                    if (daysUntilRenewal <= 0) {
                        rowColor = 'background: rgba(220, 53, 69, 0.1);'; // Red - expired
                    } else if (daysUntilRenewal <= HOSTING_RENEWAL_WARNING_DAYS) {
                        rowColor = 'background: rgba(255, 152, 0, 0.1);'; // Orange - warning
                    }

                    const packageInfo = getPackageById(plan.packageType);
                    const packageName = packageInfo ? packageInfo.displayName : plan.packageType;

                    return `
                        <tr style="${rowColor}">
                            <td><strong>${escapeHtml(plan.clientName)}</strong></td>
                            <td>${escapeHtml(packageName)}</td>
                            <td><strong>£${parseFloat(plan.cost).toFixed(2)}</strong></td>
                            <td>${formatDate(plan.startDate)}</td>
                            <td>${formatDate(plan.renewalDate)}</td>
                            <td>
                                ${daysUntilRenewal > 0
                                    ? `<span style="color: ${daysUntilRenewal <= 14 ? '#ff9800' : '#28a745'};">${daysUntilRenewal} days</span>`
                                    : '<span style="color: #dc3545; font-weight: 700;">EXPIRED</span>'
                                }
                            </td>
                            <td><span class="badge badge-${plan.status === 'active' ? 'success' : 'secondary'}">${plan.status.toUpperCase()}</span></td>
                            <td>
                                <button class="btn-icon btn-primary" onclick="editHostingPlan('${plan.id}')" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn-icon btn-success" onclick="renewHostingPlan('${plan.id}')" title="Renew">
                                    <i class="fas fa-redo"></i>
                                </button>
                                <button class="btn-icon" style="background: #dc3545; color: white;" onclick="deleteHostingPlan('${plan.id}')" title="Delete">
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

// Update hosting stats
function updateHostingStats() {
    console.log('updateHostingStats called - Total plans:', hostingPlans.length);

    // Filter active plans (case-insensitive to handle any data inconsistencies)
    const activePlans = hostingPlans.filter(p =>
        p.status && p.status.toLowerCase() === 'active'
    );

    console.log('Active hosting plans:', activePlans.length);
    console.log('Active plans data:', activePlans);

    const activeCountElement = document.getElementById('activeHostingCount');
    if (activeCountElement) {
        activeCountElement.textContent = activePlans.length;
        console.log('Set activeHostingCount to:', activePlans.length);
    } else {
        console.error('activeHostingCount element not found!');
    }

    // Calculate revenue from active plans
    const revenue = activePlans.reduce((sum, plan) => {
        const cost = parseFloat(plan.cost);
        return sum + (isNaN(cost) ? 0 : cost);
    }, 0);

    console.log('Total hosting revenue:', revenue);

    const revenueElement = document.getElementById('hostingRevenue');
    if (revenueElement) {
        revenueElement.textContent = `£${revenue.toFixed(2)}`;
        console.log('Set hostingRevenue to: £' + revenue.toFixed(2));
    } else {
        console.error('hostingRevenue element not found!');
    }

    // Calculate renewals due soon
    const today = new Date();
    const renewalsDue = activePlans.filter(plan => {
        if (!plan.renewalDate) return false;
        try {
            const renewalDate = plan.renewalDate.toDate();
            const daysUntil = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24));
            return daysUntil <= HOSTING_RENEWAL_WARNING_DAYS && daysUntil > 0;
        } catch (error) {
            console.error('Error calculating renewal date for plan:', plan.id, error);
            return false;
        }
    }).length;

    console.log('Renewals due soon:', renewalsDue);

    const renewalsDueElement = document.getElementById('renewalsDue');
    if (renewalsDueElement) {
        renewalsDueElement.textContent = renewalsDue;
        console.log('Set renewalsDue to:', renewalsDue);
    } else {
        console.error('renewalsDue element not found!');
    }

    console.log('Hosting stats updated successfully');
}

// Display renewal warnings
function displayRenewalWarnings() {
    const container = document.getElementById('renewalWarnings');
    if (!container) return;

    const today = new Date();

    const warnings = hostingPlans.filter(plan => {
        if (!plan.status || plan.status.toLowerCase() !== 'active') return false;
        if (!plan.renewalDate) return false;
        try {
            const renewalDate = plan.renewalDate.toDate();
            const daysUntil = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24));
            return daysUntil <= HOSTING_RENEWAL_WARNING_DAYS && daysUntil > 0;
        } catch (error) {
            console.error('Error calculating renewal date for warning:', plan.id, error);
            return false;
        }
    });

    if (warnings.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = `
        <div class="content-card" style="background: rgba(255, 152, 0, 0.1); border-left: 4px solid #ff9800;">
            <div class="content-card-header">
                <h2 class="content-card-title">
                    <i class="fas fa-exclamation-triangle" style="color: #ff9800;"></i>
                    Hosting Renewals Due Soon
                </h2>
            </div>
            <div style="padding: 1.5rem;">
                ${warnings.map(plan => {
                    const renewalDate = plan.renewalDate.toDate();
                    const daysUntil = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24));
                    return `
                        <div style="padding: 1rem; margin-bottom: 0.5rem; background: white; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong>${escapeHtml(plan.clientName)}</strong> -
                                ${getPackageById(plan.packageType)?.displayName || plan.packageType}
                                <br>
                                <small style="color: #ff9800;">
                                    <i class="fas fa-clock"></i> Renewal due in ${daysUntil} days (${renewalDate.toLocaleDateString('en-GB')})
                                </small>
                            </div>
                            <button class="btn btn-primary" onclick="renewHostingPlan('${plan.id}')">
                                <i class="fas fa-redo"></i> Renew Now
                            </button>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

// Load clients for hosting dropdown
async function loadClientsForHostingDropdown() {
    try {
        const snapshot = await clientsCollection.orderBy('name').get();
        const clients = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        const select = document.getElementById('hostingClient');
        if (select) {
            select.innerHTML = '<option value="">Select a client</option>' +
                clients.map(client => `
                    <option value="${client.id}" data-name="${escapeHtml(client.name)}">
                        ${escapeHtml(client.name)}
                    </option>
                `).join('');
        }
    } catch (error) {
        console.error('Error loading clients:', error);
    }
}

// Update hosting cost based on package selection
function updateHostingCost() {
    const packageType = document.getElementById('hostingPackage').value;
    const costInput = document.getElementById('hostingCost');

    const packageInfo = getPackageById(packageType);
    if (packageInfo && packageInfo.hostingPrice !== null) {
        costInput.value = packageInfo.hostingPrice;
    }
}

// Handle hosting plan save
async function handleHostingSave(e) {
    e.preventDefault();

    const clientId = document.getElementById('hostingClient').value;
    const select = document.getElementById('hostingClient');
    const selectedOption = select.options[select.selectedIndex];
    const clientName = selectedOption.getAttribute('data-name');

    const hostingData = {
        clientId: clientId,
        clientName: clientName,
        packageType: document.getElementById('hostingPackage').value,
        cost: parseFloat(document.getElementById('hostingCost').value),
        startDate: firebase.firestore.Timestamp.fromDate(new Date(document.getElementById('hostingStartDate').value)),
        renewalDate: firebase.firestore.Timestamp.fromDate(new Date(document.getElementById('hostingRenewalDate').value)),
        status: document.getElementById('hostingStatus').value,
        notes: document.getElementById('hostingNotes').value.trim()
    };

    try {
        if (editingHostingId) {
            await hostingPlansCollection.doc(editingHostingId).update({
                ...hostingData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } else {
            await hostingPlansCollection.add({
                ...hostingData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }

        closeHostingModal();
        loadHostingPlans();
    } catch (error) {
        console.error('Error saving hosting plan:', error);
        alert('Error saving hosting plan. Please try again.');
    }
}

// Open hosting modal
function openHostingModal(hostingId = null) {
    const modal = document.getElementById('hostingModal');
    const modalTitle = document.getElementById('hostingModalTitle');
    const form = document.getElementById('hostingForm');

    editingHostingId = hostingId;

    if (hostingId) {
        const plan = hostingPlans.find(p => p.id === hostingId);
        if (plan) {
            modalTitle.textContent = 'Edit Hosting Plan';
            document.getElementById('hostingClient').value = plan.clientId;
            document.getElementById('hostingPackage').value = plan.packageType;
            document.getElementById('hostingCost').value = plan.cost;
            document.getElementById('hostingStartDate').value = plan.startDate.toDate().toISOString().split('T')[0];
            document.getElementById('hostingRenewalDate').value = plan.renewalDate.toDate().toISOString().split('T')[0];
            document.getElementById('hostingStatus').value = plan.status;
            document.getElementById('hostingNotes').value = plan.notes || '';
        }
    } else {
        modalTitle.textContent = 'Add Hosting Plan';
        form.reset();
        // Set default dates
        const today = new Date();
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        document.getElementById('hostingStartDate').value = today.toISOString().split('T')[0];
        document.getElementById('hostingRenewalDate').value = oneYearFromNow.toISOString().split('T')[0];
    }

    modal.classList.add('active');
}

// Close hosting modal
function closeHostingModal() {
    const modal = document.getElementById('hostingModal');
    modal.classList.remove('active');
    editingHostingId = null;
    document.getElementById('hostingForm').reset();
}

// Edit hosting plan
function editHostingPlan(hostingId) {
    openHostingModal(hostingId);
}

// Renew hosting plan
async function renewHostingPlan(hostingId) {
    const plan = hostingPlans.find(p => p.id === hostingId);
    if (!plan) return;

    if (!confirm(`Renew hosting for ${plan.clientName}?\n\nThis will extend the renewal date by 1 year and create a new hosting job.`)) {
        return;
    }

    try {
        // Calculate new renewal date (1 year from current renewal date)
        const currentRenewal = plan.renewalDate.toDate();
        const newRenewal = new Date(currentRenewal);
        newRenewal.setFullYear(newRenewal.getFullYear() + 1);

        // Update hosting plan
        await hostingPlansCollection.doc(hostingId).update({
            renewalDate: firebase.firestore.Timestamp.fromDate(newRenewal),
            status: 'active',
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Create new hosting job for the renewal
        await jobsCollection.add({
            name: `${getPackageById(plan.packageType)?.displayName || plan.packageType} - Annual Hosting Renewal`,
            clientId: plan.clientId,
            paymentType: PAYMENT_TYPES.ANNUAL_HOSTING,
            amount: plan.cost,
            package: plan.packageType,
            status: 'in_progress',
            notes: `Hosting renewal for ${plan.clientName}. Next renewal: ${newRenewal.toLocaleDateString('en-GB')}`,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert(`Hosting renewed successfully! New renewal date: ${newRenewal.toLocaleDateString('en-GB')}`);
        loadHostingPlans();
    } catch (error) {
        console.error('Error renewing hosting:', error);
        alert('Error renewing hosting. Please try again.');
    }
}

// Delete hosting plan
async function deleteHostingPlan(hostingId) {
    const plan = hostingPlans.find(p => p.id === hostingId);
    if (!plan) return;

    if (!confirm(`Delete hosting plan for ${plan.clientName}?\n\nThis will NOT delete the associated job.`)) {
        return;
    }

    try {
        await hostingPlansCollection.doc(hostingId).delete();
        loadHostingPlans();
    } catch (error) {
        console.error('Error deleting hosting plan:', error);
        alert('Error deleting hosting. Please try again.');
    }
}

// Helper function to escape HTML
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
