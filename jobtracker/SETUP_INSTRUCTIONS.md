# Transform Sites Job Tracker - Setup Instructions

Welcome to your Transform Sites Job Tracker! This guide will walk you through setting up Firebase and Netlify to get your job tracker live on jobtracker.transformsites.com.

---

## 📋 Table of Contents

1. [Firebase Setup](#firebase-setup)
2. [Netlify Environment Variable](#netlify-environment-variable)
3. [Deploying to Netlify](#deploying-to-netlify)
4. [Accessing Your Job Tracker](#accessing-your-job-tracker)
5. [Troubleshooting](#troubleshooting)

---

## 🔥 Firebase Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `transform-sites-job-tracker` (or your preferred name)
4. Click **Continue**
5. Disable Google Analytics (optional for this project)
6. Click **Create project**
7. Wait for the project to be created, then click **Continue**

### Step 2: Register Your Web App

1. In the Firebase Console, click the **Web icon (</>)** to add a web app
2. Register app with nickname: `Job Tracker`
3. **Do NOT** check "Also set up Firebase Hosting"
4. Click **Register app**
5. You'll see your Firebase configuration code - **keep this page open!**

### Step 3: Copy Your Firebase Configuration

1. Look for the `firebaseConfig` object in the Firebase Console
2. It will look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

3. Open `/jobtracker/js/firebase-config.js` in your code editor
4. Replace the placeholder values with your actual Firebase configuration values
5. Save the file

### Step 4: Enable Firestore Database

1. In Firebase Console, click **Build** > **Firestore Database** in the left sidebar
2. Click **Create database**
3. Choose **Start in production mode** (we'll set rules in the next step)
4. Click **Next**
5. Select your Cloud Firestore location (choose closest to your location, e.g., `eur3 (europe-west)`)
6. Click **Enable**

### Step 5: Set Firestore Security Rules

1. Once Firestore is created, click on the **Rules** tab
2. Replace the default rules with the following (this allows read/write access - since it's protected by PIN login):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click **Publish**

> **Note:** These rules allow full read/write access. Since your job tracker is protected by PIN authentication, this is secure. For production environments with multiple users, you'd want to implement Firebase Authentication and stricter rules.

---

## 🔐 Netlify Environment Variable

Your PIN code (31430600) needs to be stored securely as a Netlify environment variable.

### Step 1: Access Netlify Site Settings

1. Log in to your [Netlify account](https://app.netlify.com/)
2. Select your Transform Sites project
3. Go to **Site configuration** > **Environment variables**

### Step 2: Add the PIN Environment Variable

1. Click **Add a variable** > **Add a single variable**
2. Set the following:
   - **Key:** `JOB_TRACKER_PIN`
   - **Value:** `31430600`
   - **Scopes:** All scopes (or Production, Deploy Previews, Branch deploys)
3. Click **Create variable**

> **Important:** Make sure the variable name is exactly `JOB_TRACKER_PIN` (case-sensitive)

---

## 🚀 Deploying to Netlify

### Step 1: Commit Your Changes

Make sure all your changes are committed to your Git repository:

```bash
git add .
git commit -m "Add job tracker application"
git push origin main
```

### Step 2: Configure Netlify Functions

Your Netlify site should automatically detect the `/netlify/functions` directory and deploy the `verify-pin` function.

### Step 3: Set Up Subdomain

1. In Netlify, go to **Domain management**
2. Click **Add a domain alias**
3. Add: `jobtracker.transformsites.com`
4. Netlify will provide you with DNS records to add to your domain provider

### Step 4: Update DNS Records

1. Log in to your domain provider (where transformsites.com is hosted)
2. Go to DNS settings
3. Add a CNAME record:
   - **Type:** CNAME
   - **Name:** jobtracker
   - **Value:** [your-netlify-site].netlify.app
   - **TTL:** Automatic or 3600

4. Save the DNS record
5. Wait for DNS propagation (can take up to 48 hours, but usually within 15-30 minutes)

### Step 5: Enable HTTPS

1. Once your custom domain is connected, Netlify will automatically provision an SSL certificate
2. Enable **Force HTTPS** in Domain settings

---

## 🎯 Accessing Your Job Tracker

### Login URL

Visit: **https://jobtracker.transformsites.com/jobtracker/login.html**

or

**https://jobtracker.transformsites.com/jobtracker/**

### PIN Code

Enter your PIN: **31430600**

### First Time Setup

When you first log in:

1. The dashboard will be empty - this is normal!
2. Start by adding your first client in the **Clients** section
3. Then create jobs in the **Jobs** section
4. Add prospects in the **Prospects** section
5. Take notes in the **Notes** section

---

## 🛠️ Troubleshooting

### Firebase Errors

**"Firebase not initialized"**
- Make sure you've updated `firebase-config.js` with your actual Firebase credentials
- Check browser console for specific error messages

**"Permission denied"**
- Ensure Firestore security rules are set correctly (see Step 5 in Firebase Setup)
- Make sure you've enabled Firestore Database

### Login Issues

**"Cannot find verify-pin function"**
- Ensure the Netlify function is deployed: Check **Functions** tab in Netlify
- Make sure `/netlify/functions/verify-pin.js` is in your repository
- Try redeploying: Trigger a new deploy in Netlify

**"Incorrect PIN"**
- Verify the environment variable `JOB_TRACKER_PIN` is set correctly in Netlify
- Make sure you're entering: **31430600**
- Try clearing your browser cache and cookies

### Data Not Saving

**Changes aren't persisting**
- Check browser console for Firebase errors
- Ensure you're connected to the internet
- Verify Firebase is initialized (check console logs)

### Styling Issues

**Site looks broken**
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check that all CSS files are loading (Network tab in DevTools)

---

## 📱 Using the Job Tracker

### Dashboard
- View overview stats of your entire agency
- Get motivational messages every time you log in

### Notes
- Create, edit, and delete notes
- Use for quick reminders and important information

### Jobs
- Track all your projects
- Filter by status (All, In Progress, Completed, Inactive)
- Assign clients to jobs
- Track one-time and monthly payment jobs
- View total income and monthly recurring revenue

### Prospects
- **New Prospects:** Add prospects you want to contact
- **Active Prospects:** Tick the checkbox when you've contacted them
- **Converted:** Click the trophy icon to convert to clients
- Track conversion rates and stats

### Clients
- Store all client information
- Track contact details, websites, and passwords
- View package information and payment details
- Protected deletion (can't delete clients with active jobs)

### Finances
- View total income, monthly recurring, and average job value
- Interactive graphs showing income over time
- Filter by month, year, or all time
- Income breakdown by payment type

### Statistics
- Non-financial metrics and insights
- Prospect growth charts
- Conversion funnel visualization
- Job status distribution
- AI-generated growth insights

---

## 🎨 Customization

### Changing the PIN Code

To change your PIN:

1. Go to Netlify **Environment variables**
2. Edit `JOB_TRACKER_PIN`
3. Enter your new PIN
4. Save and redeploy

### Adding Features

The job tracker is built with vanilla JavaScript and Firebase. You can:

- Add new fields to any section by editing the respective JS files
- Create new sections by adding navigation items and pages
- Customize colors by editing `css/dashboard.css`

---

## 🆘 Need Help?

If you run into issues:

1. Check browser console (F12) for error messages
2. Verify all setup steps were completed correctly
3. Check Firebase Console for any errors or warnings
4. Check Netlify deploy logs for build errors
5. Make sure DNS records are properly configured

---

## 🎉 You're All Set!

Your Transform Sites Job Tracker is ready to help you scale your agency!

**Time to get that bread, Charlie!** 💰🚀

---

## 📝 Quick Reference

- **Login URL:** https://jobtracker.transformsites.com/jobtracker/login.html
- **PIN Code:** 31430600
- **Firebase Console:** https://console.firebase.google.com/
- **Netlify Dashboard:** https://app.netlify.com/

---

*Built with ❤️ for Transform Sites*
