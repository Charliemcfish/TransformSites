// Notes Management System

let notes = [];
let editingNoteId = null;

// Render Notes Page
function renderNotesPage() {
    return `
        <div class="page-header">
            <h1 class="page-title">Notes</h1>
            <p class="page-subtitle">Keep track of important information about Transform Sites</p>
        </div>

        <div class="content-card">
            <div class="content-card-header">
                <h2 class="content-card-title">My Notes</h2>
                <button class="btn btn-primary" onclick="openNoteModal()">
                    <i class="fas fa-plus"></i> Add Note
                </button>
            </div>

            <div id="notesContainer">
                <p style="text-align: center; color: var(--bodyTextColor); padding: 2rem;">
                    Loading notes...
                </p>
            </div>
        </div>

        <!-- Note Modal -->
        <div id="noteModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="noteModalTitle">Add Note</h2>
                    <button class="modal-close" onclick="closeNoteModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="noteForm" class="modal-body">
                    <div class="form-group">
                        <label class="form-label" for="noteTitle">Title</label>
                        <input type="text" id="noteTitle" class="form-input" required placeholder="Enter note title">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="noteContent">Content</label>
                        <textarea id="noteContent" class="form-textarea" required placeholder="Enter note content"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline" onclick="closeNoteModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Note</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

// Initialize Notes Page
function initializeNotesPage() {
    loadNotes();

    // Setup form submission
    const noteForm = document.getElementById('noteForm');
    if (noteForm) {
        noteForm.addEventListener('submit', handleNoteSave);
    }
}

// Load all notes
async function loadNotes() {
    try {
        const snapshot = await notesCollection.orderBy('createdAt', 'desc').get();
        notes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        displayNotes();
    } catch (error) {
        console.error('Error loading notes:', error);
        document.getElementById('notesContainer').innerHTML = `
            <p style="text-align: center; color: var(--primary); padding: 2rem;">
                Error loading notes. Please try again.
            </p>
        `;
    }
}

// Display notes
function displayNotes() {
    const container = document.getElementById('notesContainer');

    if (notes.length === 0) {
        container.innerHTML = `
            <p style="text-align: center; color: var(--bodyTextColor); padding: 2rem;">
                No notes yet. Click "Add Note" to create your first note.
            </p>
        `;
        return;
    }

    const notesHTML = notes.map(note => `
        <div class="note-item">
            <div class="note-header">
                <h3 class="note-title">${escapeHtml(note.title)}</h3>
                <div class="note-actions">
                    <button class="btn-icon btn-secondary" onclick="editNote('${note.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-primary" onclick="deleteNote('${note.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="note-content">${escapeHtml(note.content).replace(/\n/g, '<br>')}</div>
            <div class="note-footer">
                <small>${formatDate(note.createdAt)}</small>
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="notes-grid">
            ${notesHTML}
        </div>
        <style>
            .notes-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 1.5rem;
                margin-top: 1.5rem;
            }
            .note-item {
                background: #f8f9fa;
                border-radius: 10px;
                padding: 1.5rem;
                border-left: 4px solid var(--primary);
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            .note-item:hover {
                transform: translateY(-4px);
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
            }
            .note-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 1rem;
            }
            .note-title {
                font-size: 1.25rem;
                font-weight: 700;
                color: var(--headerColor);
                margin: 0;
                flex: 1;
            }
            .note-actions {
                display: flex;
                gap: 0.5rem;
            }
            .note-content {
                color: var(--bodyTextColor);
                line-height: 1.6;
                margin-bottom: 1rem;
                word-wrap: break-word;
            }
            .note-footer {
                color: #999;
                font-size: 0.875rem;
            }
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 10000;
                align-items: center;
                justify-content: center;
            }
            .modal.active {
                display: flex;
            }
            .modal-content {
                background: white;
                border-radius: 12px;
                width: 90%;
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 2px solid #f0f0f0;
            }
            .modal-header h2 {
                margin: 0;
                font-size: 1.5rem;
                color: var(--headerColor);
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--bodyTextColor);
                cursor: pointer;
                padding: 0.5rem;
            }
            .modal-body {
                padding: 1.5rem;
            }
            .modal-footer {
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
                padding-top: 1rem;
            }
        </style>
    `;
}

// Open note modal
function openNoteModal(noteId = null) {
    const modal = document.getElementById('noteModal');
    const modalTitle = document.getElementById('noteModalTitle');
    const noteForm = document.getElementById('noteForm');

    editingNoteId = noteId;

    if (noteId) {
        // Edit mode
        const note = notes.find(n => n.id === noteId);
        if (note) {
            modalTitle.textContent = 'Edit Note';
            document.getElementById('noteTitle').value = note.title;
            document.getElementById('noteContent').value = note.content;
        }
    } else {
        // Add mode
        modalTitle.textContent = 'Add Note';
        noteForm.reset();
    }

    modal.classList.add('active');
}

// Close note modal
function closeNoteModal() {
    const modal = document.getElementById('noteModal');
    modal.classList.remove('active');
    editingNoteId = null;
    document.getElementById('noteForm').reset();
}

// Handle note save
async function handleNoteSave(e) {
    e.preventDefault();

    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();

    if (!title || !content) {
        alert('Please fill in all fields');
        return;
    }

    try {
        if (editingNoteId) {
            // Update existing note
            await notesCollection.doc(editingNoteId).update({
                title,
                content,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } else {
            // Add new note
            await notesCollection.add({
                title,
                content,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }

        closeNoteModal();
        loadNotes();
    } catch (error) {
        console.error('Error saving note:', error);
        alert('Error saving note. Please try again.');
    }
}

// Edit note
function editNote(noteId) {
    openNoteModal(noteId);
}

// Delete note
async function deleteNote(noteId) {
    if (!confirm('Are you sure you want to delete this note?')) {
        return;
    }

    try {
        await notesCollection.doc(noteId).delete();
        loadNotes();
    } catch (error) {
        console.error('Error deleting note:', error);
        alert('Error deleting note. Please try again.');
    }
}

// HTML escape function
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
