// Prospects Management System

let prospects = [];
let editingProspectId = null;
let currentProspectTab = 'new';

// Render Prospects Page
function renderProspectsPage() {
    return `
        <div class="page-header">
            <h1 class="page-title">Prospects</h1>
            <p class="page-subtitle">Track and manage potential clients for Transform Sites</p>
        </div>

        <!-- Prospect Stats -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">New Prospects</span>
                    <div class="stat-card-icon primary">
                        <i class="fas fa-user-plus"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="newProspectsCount">0</div>
                <div class="stat-card-description">Ready to contact</div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Active Prospects</span>
                    <div class="stat-card-icon secondary">
                        <i class="fas fa-users"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="activeProspectsCount">0</div>
                <div class="stat-card-description">Already contacted</div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Converted</span>
                    <div class="stat-card-icon success">
                        <i class="fas fa-trophy"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="convertedProspectsCount">0</div>
                <div class="stat-card-description">Now paying clients</div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <span class="stat-card-title">Conversion Rate</span>
                    <div class="stat-card-icon success">
                        <i class="fas fa-percentage"></i>
                    </div>
                </div>
                <div class="stat-card-value" id="conversionRateValue">0%</div>
                <div class="stat-card-description">Success rate</div>
            </div>
        </div>

        <!-- Tabs -->
        <div class="tabs">
            <button class="tab active" onclick="switchProspectTab('new')">
                <i class="fas fa-user-plus"></i> New Prospects
            </button>
            <button class="tab" onclick="switchProspectTab('active')">
                <i class="fas fa-users"></i> Active Prospects
            </button>
            <button class="tab" onclick="switchProspectTab('converted')">
                <i class="fas fa-trophy"></i> Converted
            </button>
        </div>

        <div class="content-card">
            <div class="content-card-header">
                <h2 class="content-card-title" id="prospectListTitle">New Prospects</h2>
                <button class="btn btn-primary" onclick="openProspectModal()">
                    <i class="fas fa-plus"></i> Add Prospect
                </button>
            </div>

            <div id="prospectsContainer">
                <p style="text-align: center; color: var(--bodyTextColor); padding: 2rem;">
                    Loading prospects...
                </p>
            </div>
        </div>

        <!-- Prospect Modal -->
        <div id="prospectModal" class="modal">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2 id="prospectModalTitle">Add Prospect</h2>
                    <button class="modal-close" onclick="closeProspectModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="prospectForm" class="modal-body">
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label" for="prospectName">Name *</label>
                            <input type="text" id="prospectName" class="form-input" required placeholder="Business name">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="prospectArea">Area *</label>
                            <input type="text" id="prospectArea" class="form-input" required placeholder="e.g., Yeovil">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label" for="prospectPhone">Phone Number *</label>
                            <input type="tel" id="prospectPhone" class="form-input" required placeholder="07123 456789">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="prospectEmail">Email *</label>
                            <input type="email" id="prospectEmail" class="form-input" required placeholder="email@example.com">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="prospectWebsite">Website (if applicable)</label>
                        <input type="url" id="prospectWebsite" class="form-input" placeholder="https://example.com">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="prospectNotes">Prospect Notes</label>
                        <textarea id="prospectNotes" class="form-textarea" placeholder="Add notes about this prospect..."></textarea>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline" onclick="closeProspectModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Prospect</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

// Initialize Prospects Page
function initializeProspectsPage() {
    loadProspects();

    const prospectForm = document.getElementById('prospectForm');
    if (prospectForm) {
        prospectForm.addEventListener('submit', handleProspectSave);
    }
}

// Load all prospects
async function loadProspects() {
    try {
        const snapshot = await prospectsCollection.orderBy('createdAt', 'desc').get();
        prospects = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        displayProspects();
        updateProspectStats();
    } catch (error) {
        console.error('Error loading prospects:', error);
        document.getElementById('prospectsContainer').innerHTML = `
            <p style="text-align: center; color: var(--primary); padding: 2rem;">
                Error loading prospects. Please try again.
            </p>
        `;
    }
}

// Display prospects based on current tab
function displayProspects() {
    const container = document.getElementById('prospectsContainer');

    let filteredProspects = prospects.filter(p => p.status === currentProspectTab);

    if (filteredProspects.length === 0) {
        let message = 'No prospects found.';
        if (currentProspectTab === 'new') {
            message = 'No new prospects yet. Click "Add Prospect" to start building your pipeline!';
        } else if (currentProspectTab === 'active') {
            message = 'No active prospects. Contact some new prospects to move them here.';
        } else if (currentProspectTab === 'converted') {
            message = 'No converted prospects yet. Keep hustling, Charlie!';
        }

        container.innerHTML = `
            <p style="text-align: center; color: var(--bodyTextColor); padding: 2rem;">
                ${message}
            </p>
        `;
        return;
    }

    const tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    ${currentProspectTab === 'new' ? '<th width="50">Contact</th>' : ''}
                    <th>Name</th>
                    <th>Area</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Website</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${filteredProspects.map(prospect => `
                    <tr>
                        ${currentProspectTab === 'new' ? `
                            <td>
                                <input type="checkbox" class="prospect-checkbox" onchange="markAsContacted('${prospect.id}')" style="width: 20px; height: 20px; cursor: pointer;">
                            </td>
                        ` : ''}
                        <td><strong>${escapeHtml(prospect.name)}</strong></td>
                        <td>${escapeHtml(prospect.area)}</td>
                        <td><a href="tel:${escapeHtml(prospect.phone)}">${escapeHtml(prospect.phone)}</a></td>
                        <td><a href="mailto:${escapeHtml(prospect.email)}">${escapeHtml(prospect.email)}</a></td>
                        <td>${prospect.website ? `<a href="${escapeHtml(prospect.website)}" target="_blank">View</a>` : '-'}</td>
                        <td>
                            <button class="btn-icon btn-secondary" onclick="viewProspect('${prospect.id}')" title="View">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-icon btn-primary" onclick="editProspect('${prospect.id}')" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            ${currentProspectTab === 'active' ? `
                                <button class="btn-icon" style="background: #28a745; color: white;" onclick="convertProspect('${prospect.id}')" title="Convert to Client">
                                    <i class="fas fa-trophy"></i>
                                </button>
                            ` : ''}
                            <button class="btn-icon" style="background: #dc3545; color: white;" onclick="deleteProspect('${prospect.id}')" title="Delete">
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

// Switch prospect tab
function switchProspectTab(tab) {
    currentProspectTab = tab;

    // Update tab active state
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tabEl, index) => {
        tabEl.classList.remove('active');
        if ((tab === 'new' && index === 0) ||
            (tab === 'active' && index === 1) ||
            (tab === 'converted' && index === 2)) {
            tabEl.classList.add('active');
        }
    });

    // Update title
    const titles = {
        new: 'New Prospects',
        active: 'Active Prospects',
        converted: 'Converted Prospects'
    };
    document.getElementById('prospectListTitle').textContent = titles[tab];

    displayProspects();
}

// Mark prospect as contacted
async function markAsContacted(prospectId) {
    try {
        await prospectsCollection.doc(prospectId).update({
            status: 'active',
            contactedAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        loadProspects();
    } catch (error) {
        console.error('Error updating prospect:', error);
        alert('Error updating prospect. Please try again.');
    }
}

// Convert prospect to client
async function convertProspect(prospectId) {
    const prospect = prospects.find(p => p.id === prospectId);
    if (!prospect) return;

    if (!confirm(`Convert ${prospect.name} to a client? This will create a new client record.`)) {
        return;
    }

    try {
        // Create client from prospect
        await clientsCollection.add({
            name: prospect.name,
            email: prospect.email,
            phone: prospect.phone,
            website: prospect.website || '',
            area: prospect.area,
            notes: `Converted from prospect. Original notes: ${prospect.notes || 'None'}`,
            package: '',
            monthlyPayment: 0,
            passwords: '',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Update prospect status
        await prospectsCollection.doc(prospectId).update({
            status: 'converted',
            convertedAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert(`${prospect.name} has been converted to a client! Check the Clients page.`);
        loadProspects();
    } catch (error) {
        console.error('Error converting prospect:', error);
        alert('Error converting prospect. Please try again.');
    }
}

// Update prospect stats
function updateProspectStats() {
    const newCount = prospects.filter(p => p.status === 'new').length;
    const activeCount = prospects.filter(p => p.status === 'active').length;
    const convertedCount = prospects.filter(p => p.status === 'converted').length;
    const total = prospects.length;

    document.getElementById('newProspectsCount').textContent = newCount;
    document.getElementById('activeProspectsCount').textContent = activeCount;
    document.getElementById('convertedProspectsCount').textContent = convertedCount;

    const conversionRate = total > 0 ? ((convertedCount / total) * 100).toFixed(1) : 0;
    document.getElementById('conversionRateValue').textContent = `${conversionRate}%`;
}

// Open prospect modal
function openProspectModal(prospectId = null) {
    const modal = document.getElementById('prospectModal');
    const modalTitle = document.getElementById('prospectModalTitle');
    const prospectForm = document.getElementById('prospectForm');

    editingProspectId = prospectId;

    if (prospectId) {
        const prospect = prospects.find(p => p.id === prospectId);
        if (prospect) {
            modalTitle.textContent = 'Edit Prospect';
            document.getElementById('prospectName').value = prospect.name;
            document.getElementById('prospectArea').value = prospect.area;
            document.getElementById('prospectPhone').value = prospect.phone;
            document.getElementById('prospectEmail').value = prospect.email;
            document.getElementById('prospectWebsite').value = prospect.website || '';
            document.getElementById('prospectNotes').value = prospect.notes || '';
        }
    } else {
        modalTitle.textContent = 'Add Prospect';
        prospectForm.reset();
    }

    modal.classList.add('active');
}

// Close prospect modal
function closeProspectModal() {
    const modal = document.getElementById('prospectModal');
    modal.classList.remove('active');
    editingProspectId = null;
    document.getElementById('prospectForm').reset();
}

// Handle prospect save
async function handleProspectSave(e) {
    e.preventDefault();

    const prospectData = {
        name: document.getElementById('prospectName').value.trim(),
        area: document.getElementById('prospectArea').value.trim(),
        phone: document.getElementById('prospectPhone').value.trim(),
        email: document.getElementById('prospectEmail').value.trim(),
        website: document.getElementById('prospectWebsite').value.trim(),
        notes: document.getElementById('prospectNotes').value.trim(),
        status: editingProspectId ? prospects.find(p => p.id === editingProspectId).status : 'new'
    };

    if (!prospectData.name || !prospectData.area || !prospectData.phone || !prospectData.email) {
        alert('Please fill in all required fields');
        return;
    }

    try {
        if (editingProspectId) {
            await prospectsCollection.doc(editingProspectId).update({
                ...prospectData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } else {
            await prospectsCollection.add({
                ...prospectData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }

        closeProspectModal();
        loadProspects();
    } catch (error) {
        console.error('Error saving prospect:', error);
        alert('Error saving prospect. Please try again.');
    }
}

// View prospect
function viewProspect(prospectId) {
    const prospect = prospects.find(p => p.id === prospectId);
    if (!prospect) return;

    alert(`
Prospect Details:

Name: ${prospect.name}
Area: ${prospect.area}
Phone: ${prospect.phone}
Email: ${prospect.email}
Website: ${prospect.website || 'N/A'}
Notes: ${prospect.notes || 'No notes'}
Status: ${prospect.status}
    `);
}

// Edit prospect
function editProspect(prospectId) {
    openProspectModal(prospectId);
}

// Delete prospect
async function deleteProspect(prospectId) {
    if (!confirm('Are you sure you want to delete this prospect?')) {
        return;
    }

    try {
        await prospectsCollection.doc(prospectId).delete();
        loadProspects();
    } catch (error) {
        console.error('Error deleting prospect:', error);
        alert('Error deleting prospect. Please try again.');
    }
}

// Helper to get all prospects
async function getAllProspects() {
    try {
        const snapshot = await prospectsCollection.get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting prospects:', error);
        return [];
    }
}
