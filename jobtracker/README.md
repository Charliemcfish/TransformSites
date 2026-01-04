# Transform Sites Job Tracker 🚀

A powerful, motivational job tracking dashboard designed specifically for Transform Sites agency to manage clients, prospects, jobs, and finances.

## ✨ Features

### 📊 **Dashboard**
- Real-time overview of your entire agency
- Motivational messages to keep you grinding
- Quick stats: Total clients, active jobs, prospects, and monthly income

### 📝 **Notes**
- Create, edit, and delete notes
- Centralized area for important information
- Copy-paste support for quick note-taking

### 💼 **Jobs**
- Create and manage projects/jobs
- Assign clients to jobs with auto-populated details
- Track one-time and monthly payment jobs
- Filter by status: All, In Progress, Completed, Inactive
- Real-time income calculations
- Monthly recurring revenue tracking

### 👥 **Prospects**
- **New Prospects Tab:** Add prospects ready to contact
- **Active Prospects Tab:** Prospects you've already contacted
- **Converted Tab:** Successfully converted clients
- Quick tickbox system to move prospects through pipeline
- Trophy button to convert prospects to clients
- Track conversion rates and success metrics

### 👔 **Clients**
- Store complete client information
- Contact details, website links, and credentials
- Package and payment tracking
- Deletion protection (prevents deleting clients with active jobs)
- Password and login storage for client accounts

### 💰 **Finances**
- Total income tracking across all jobs
- Monthly recurring revenue from retainer clients
- Interactive graphs with multiple timeframes (Month, Year, All Time)
- Income breakdown by payment type
- Projected annual income calculator
- Motivational income milestones

### 📈 **Statistics**
- Prospect growth over time
- Conversion funnel visualization
- Job status distribution charts
- AI-generated growth insights
- Success rate and completion tracking

## 🎨 Design

Built with the Transform Sites brand identity:
- **Primary Color:** #EA435D (Vibrant Red)
- **Secondary Color:** #361D49 (Dark Purple)
- **Font:** Poppins (Google Fonts)
- WordPress-inspired sidebar navigation
- Clean, minimalistic, user-friendly interface

## 🔐 Security

- PIN-based authentication (31430600)
- PIN stored securely as Netlify environment variable
- Session persistence with localStorage
- Firebase backend for data storage
- HTTPS enforced on custom domain

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Firebase Firestore
- **Authentication:** Netlify Functions
- **Charts:** Chart.js
- **Hosting:** Netlify
- **Domain:** jobtracker.transformsites.com

## 📂 Project Structure

```
jobtracker/
├── login.html                    # PIN authentication page
├── dashboard.html                # Main dashboard
├── css/
│   ├── login.css                # Login page styles
│   └── dashboard.css            # Dashboard and component styles
├── js/
│   ├── firebase-config.js       # Firebase configuration
│   ├── auth.js                  # Authentication logic
│   ├── dashboard.js             # Main dashboard controller
│   ├── motivational-messages.js # Motivational message generator
│   ├── notes.js                 # Notes management
│   ├── jobs.js                  # Jobs management
│   ├── prospects.js             # Prospects management
│   ├── clients.js               # Clients management
│   ├── finances.js              # Financial tracking & graphs
│   └── statistics.js            # Statistics & insights
├── netlify/
│   └── functions/
│       └── verify-pin.js        # PIN verification serverless function
├── SETUP_INSTRUCTIONS.md        # Detailed setup guide
└── README.md                    # This file
```

## 🚀 Quick Start

See [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) for detailed setup steps.

### Quick Steps:

1. **Set up Firebase:**
   - Create Firebase project
   - Enable Firestore Database
   - Copy config to `js/firebase-config.js`

2. **Configure Netlify:**
   - Add environment variable: `JOB_TRACKER_PIN` = `31430600`
   - Deploy to Netlify

3. **Set up subdomain:**
   - Add CNAME record: `jobtracker` → your-netlify-site.netlify.app
   - Enable HTTPS

4. **Access:**
   - Visit: https://jobtracker.transformsites.com/jobtracker/login.html
   - Enter PIN: 31430600

## 💡 Usage Tips

### Managing Prospects
1. Add new prospects to the "New Prospects" tab
2. Tick the checkbox when you contact them (moves to "Active")
3. Click the trophy icon when they become clients (moves to "Converted")

### Tracking Jobs
- Use "Monthly Payment" for retainer clients (shows in recurring revenue)
- Use "One-Time Payment" for project-based work
- Assign clients to auto-populate their information

### Financial Tracking
- All job amounts automatically contribute to total income
- Only active monthly jobs count toward recurring revenue
- Use graphs to visualize growth over different timeframes

### Best Practices
- Update job statuses regularly for accurate statistics
- Add notes immediately so you don't forget important details
- Review Statistics page for insights on your growth
- Use the motivational messages as daily inspiration!

## 🎯 Workflow

**For New Prospects:**
1. Find prospects (e.g., plumbers in Yeovil)
2. Add to "New Prospects" tab with all details
3. Send text/email
4. Tick checkbox to move to "Active Prospects"
5. When they convert, click trophy to create client
6. Create job for the new client

**For Existing Clients:**
1. Go to Jobs section
2. Create new job
3. Assign client (details auto-populate)
4. Set payment type and amount
5. Track progress and update status

## 📊 Data Structure

### Collections in Firebase:

- `notes` - All notes
- `jobs` - All jobs/projects
- `prospects` - All prospects (new, active, converted)
- `clients` - All paying clients
- `finances` - Financial records (auto-calculated from jobs)

## 🔧 Customization

Want to modify the job tracker?

- **Add fields:** Edit the respective JS file (e.g., `jobs.js` to add job fields)
- **Change colors:** Edit `css/dashboard.css` CSS variables
- **Add sections:** Create new nav item and page renderer
- **Modify PIN:** Change `JOB_TRACKER_PIN` in Netlify environment variables

## 🆘 Support

Check the [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) troubleshooting section for common issues.

## 📱 Mobile Responsive

The job tracker is fully responsive and works on:
- Desktop (optimized)
- Tablet (collapsible sidebar)
- Mobile (full mobile menu)

## 🎉 Motivational Messages

Get pumped every time you log in with messages like:
- "Get this bread, Charlie!"
- "Chase the money, Charlie!"
- "Time to stack that paper!"
- "Let's crush it today, Charlie!"
- ...and 16 more!

## 📈 Growth Tracking

The job tracker helps you:
- Track conversion rates from prospects to clients
- Monitor monthly recurring revenue growth
- Visualize income trends over time
- Analyze job completion rates
- Get AI-generated insights on your performance

---

**Built for Transform Sites by Charlie**

*Let's scale this thing!* 🚀💰

---

## License

Private use for Transform Sites only.
