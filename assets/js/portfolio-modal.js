// ============================================
//     Portfolio Modal Case Study System
// ============================================

// Case Study Data
const caseStudies = {
    'mythirdplace': {
        title: 'MyThirdPlace',
        image: 'assets/images/mythirdplaceportfolio.webp',
        challenge: 'Josh needed a mobile-first platform to connect people with "third places" - community spaces beyond home and work. The challenge was creating an intuitive app that allowed users to discover, share, and engage with local communities while building a thriving social network.',
        solution: 'We developed a comprehensive React Native mobile application with Firebase backend, featuring user authentication, location-based search functionality, community posting capabilities, and social features like user profiles and regular check-ins. The platform includes a blog system and allows users to both discover and contribute their own third places.',
        results: [
            { number: 'Active', label: 'User Community Since Launch' },
            { number: 'iOS & Android', label: 'Cross-Platform Support' },
            { number: '1 Year+', label: 'Growing Strong' }
        ],
        technologies: ['React Native', 'Firebase', 'User Authentication', 'Location Services', 'Social Features'],
        testimonial: {
            text: 'Transform Sites brought my vision to life! The app is intuitive, beautiful, and our community is thriving. They understood the social aspect perfectly and built features that keep users engaged.',
            author: 'Josh',
            role: 'Founder, MyThirdPlace'
        },
        url: 'https://mythirdplace.net'
    },
    'binkind': {
        title: 'BinKind',
        image: 'assets/images/binkindportfolio.webp',
        challenge: 'Kieran needed a professional booking platform for his bin cleaning service that could handle both one-off and recurring monthly bookings. The key challenge was integrating a seamless payment system that handled direct debits automatically without requiring manual intervention.',
        solution: 'We built a custom booking system using our bespoke site builder, featuring calendar integration for date/time slot selection, bin type selection, and full GoCardless payment integration. The system automatically processes direct debits for recurring customers and manages all payment operations hands-free.',
        results: [
            { number: 'Automated', label: 'Payment Processing' },
            { number: '100%', label: 'Hands-Free Operations' },
            { number: 'Recurring', label: 'Subscription Support' }
        ],
        technologies: ['Custom Site Builder', 'GoCardless Integration', 'Calendar System', 'Booking Management', 'Direct Debit'],
        testimonial: {
            text: 'The booking system is incredible! I don\'t have to touch payments anymore - everything is automated. My customers love how easy it is to book, and I can focus on growing the business.',
            author: 'Kieran',
            role: 'Owner, BinKind'
        },
        url: 'https://binkind.co.uk'
    },
    'monumental': {
        title: 'Monumental',
        image: 'assets/images/monumentalportfolio.webp',
        challenge: 'Pete had an existing website but needed a complete rebrand and redesign that better reflected his premium coaching services for successful men. The site needed to convert visitors into high-value clients through strategic design and compelling messaging.',
        solution: 'We executed a full website redesign and rebrand using WordPress and Elementor, creating a conversion-focused design that strategically funnels visitors toward becoming clients. The new site showcases Pete\'s expertise with professional aesthetics that appeal to his target audience of successful professionals.',
        results: [
            { number: 'Complete', label: 'Brand Transformation' },
            { number: 'Conversion', label: 'Focused Funnel' },
            { number: 'Premium', label: 'Professional Image' }
        ],
        technologies: ['WordPress', 'Elementor', 'Brand Strategy', 'Conversion Optimization'],
        testimonial: {
            text: 'The rebrand completely elevated my business. Transform Sites understood my audience perfectly and created a site that converts visitors into clients. The investment has paid for itself many times over.',
            author: 'Pete',
            role: 'Founder, Monumental'
        },
        url: 'https://monumental.global'
    },
    'dyers': {
        title: 'Dyers Heating & Plumbing',
        image: 'assets/images/dyersportfolio.webp',
        challenge: 'Chris had a website that wasn\'t converting visitors into customers. He needed a modern, professional site with functionality that helped potential customers see what services fit their budget and made it easy to get in touch immediately.',
        solution: 'We built a brand new WordPress website with a bespoke booking system that allows customers to input their budget and see available services in their price range. Added live chat functionality for instant customer support and questions. The conversion-focused design makes it easy for visitors to become paying customers.',
        results: [
            { number: 'Significant', label: 'Increase in Enquiries' },
            { number: 'Live Chat', label: 'Instant Support' },
            { number: 'Budget', label: 'Based Service Finder' }
        ],
        technologies: ['WordPress', 'Custom Booking System', 'Live Chat Integration', 'Budget Calculator'],
        testimonial: {
            text: 'Since launching the new site, I\'ve been receiving a lot more enquiries and business! The budget calculator helps customers see exactly what I can offer them, and the live chat means I can answer questions right away.',
            author: 'Chris',
            role: 'Owner, Dyers Heating & Plumbing'
        },
        url: 'https://dyersplumbingheating.com/'
    },
    'westofcenter': {
        title: 'West Of Center Apartments',
        image: 'assets/images/westofcenterportfolio.webp',
        challenge: 'Joe needed a stunning website to promote his newly built apartments in the competitive US rental market. The challenge was creating a site that would convert viewers into tenants quickly through engaging visuals and virtual tour functionality.',
        solution: 'We created a beautiful WordPress website focused on visual storytelling with high-quality imagery showcasing the apartments. Integrated virtual tour functionality allowing prospective tenants to explore remotely, and added live chat for immediate enquiries. The design emphasizes the property\'s unique features and location.',
        results: [
            { number: '100%', label: 'Leased in 2 Months' },
            { number: 'Virtual', label: 'Tour Functionality' },
            { number: 'Live Chat', label: 'Instant Enquiries' }
        ],
        technologies: ['WordPress', 'Virtual Tour Integration', 'Live Chat', 'Image Optimization', 'Property Showcase'],
        testimonial: {
            text: 'The website exceeded expectations! All apartments were leased within 2 months of launching. The virtual tours and beautiful design really showcased the property perfectly.',
            author: 'Joe',
            role: 'Property Owner, West Of Center Apartments'
        },
        url: 'https://westofcenterapartments.com/'
    },
    'charles': {
        title: 'Charles Stoughton Apartments',
        image: 'assets/images/charlesportfolio.webp',
        challenge: 'Joe needed another high-end apartment rental website for his Charles Stoughton property, requiring the same premium presentation and conversion-focused design that successfully leased his West Of Center apartments.',
        solution: 'We developed a premium WordPress website with stunning visual presentation, virtual tour capabilities, and live chat functionality. The site emphasizes the property\'s luxury features and prime location through strategic imagery and engaging content that converts viewers into qualified leads.',
        results: [
            { number: 'Premium', label: 'Visual Design' },
            { number: 'Virtual', label: 'Tours Integrated' },
            { number: 'High', label: 'Conversion Rate' }
        ],
        technologies: ['WordPress', 'Virtual Tour Integration', 'Live Chat', 'Premium Design', 'Property Marketing'],
        testimonial: {
            text: 'After the success of West Of Center, I knew Transform Sites was the right choice for Charles Stoughton. Once again, they delivered a website that perfectly showcases the property and drives quality enquiries.',
            author: 'Joe',
            role: 'Property Owner, Charles Stoughton Apartments'
        },
        url: 'https://charlesstoughton.com/'
    },
    'scotts': {
        title: 'Scotts Group',
        image: 'assets/images/scottsgroupportfolio.webp',
        challenge: 'Scotts Group needed a professional website to establish their online presence in the competitive plumbing and heating industry. They required a site that built trust with potential customers and made it easy to learn about their services and get in touch.',
        solution: 'We built a clean, professional WordPress brochure website that showcases their services, expertise, and professionalism. The conversion-focused design guides visitors toward making contact, with clear calls-to-action and service information that builds confidence in their capabilities.',
        results: [
            { number: 'Professional', label: 'Online Presence' },
            { number: 'Increased', label: 'Customer Enquiries' },
            { number: 'Trust', label: 'Building Design' }
        ],
        technologies: ['WordPress', 'Service Showcase', 'Contact Forms', 'Mobile Responsive'],
        testimonial: {
            text: 'Transform Sites created a professional website that perfectly represents our business. We\'ve seen an increase in customer enquiries and the site has helped establish us as a trusted local service provider.',
            author: 'Scotts Group Team',
            role: 'Scotts Group'
        },
        url: 'https://scottsgroup.uk/'
    },
    'superclean': {
        title: 'SuperClean Car Wash',
        image: 'assets/images/supercleanportfolio.webp',
        challenge: 'Joe needed a modern website to promote his automated car wash service in Massachusetts that integrated with his existing car wash app and on-site machines, while also providing booking functionality for customers.',
        solution: 'We designed and built a beautiful, modern website with integrated booking functionality that connects seamlessly with their car wash app and automated washing machines at the location. The site makes it easy for customers to book washes, learn about services, and access their accounts.',
        results: [
            { number: 'Seamless', label: 'App Integration' },
            { number: 'Automated', label: 'Booking System' },
            { number: 'Modern', label: 'User Experience' }
        ],
        technologies: ['WordPress', 'Booking Integration', 'App Connectivity', 'Machine Integration', 'Payment Processing'],
        testimonial: {
            text: 'The website integration with our car wash system is flawless! Customers can easily book washes online, and everything syncs perfectly with our machines and app. Professional job from start to finish.',
            author: 'Joe',
            role: 'Owner, SuperClean Car Wash'
        },
        url: 'https://supercleancw.com/'
    }
};

// Modal HTML Template
function createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'case-study-modal';
    modal.innerHTML = `
        <div class="modal-container">
            <button class="modal-close" aria-label="Close modal">&times;</button>
            <div class="modal-header">
                <img src="" alt="" id="modal-image">
                <h2 class="modal-title" id="modal-title"></h2>
            </div>
            <div class="modal-content">
                <div class="modal-section">
                    <h3>The Challenge</h3>
                    <p id="modal-challenge"></p>
                </div>
                <div class="modal-section">
                    <h3>Our Solution</h3>
                    <p id="modal-solution"></p>
                </div>
                <div class="modal-section">
                    <h3>The Results</h3>
                    <div class="modal-stats" id="modal-stats"></div>
                </div>
                <div class="modal-section">
                    <h3>Technologies Used</h3>
                    <div class="modal-tags" id="modal-technologies"></div>
                </div>
                <div class="modal-testimonial">
                    <p class="modal-testimonial-text" id="modal-testimonial-text"></p>
                    <div class="modal-testimonial-author" id="modal-testimonial-author"></div>
                    <div class="modal-testimonial-role" id="modal-testimonial-role"></div>
                </div>
                <a href="#" class="modal-cta" id="modal-cta" target="_blank">Visit Live Website →</a>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

// Populate Modal with Case Study Data
function populateModal(caseStudyId) {
    const caseStudy = caseStudies[caseStudyId];
    if (!caseStudy) return;

    document.getElementById('modal-title').textContent = caseStudy.title;
    document.getElementById('modal-image').src = caseStudy.image;
    document.getElementById('modal-image').alt = caseStudy.title;
    document.getElementById('modal-challenge').textContent = caseStudy.challenge;
    document.getElementById('modal-solution').textContent = caseStudy.solution;

    // Populate stats
    const statsContainer = document.getElementById('modal-stats');
    statsContainer.innerHTML = caseStudy.results.map(stat => `
        <div class="modal-stat">
            <span class="modal-stat-number">${stat.number}</span>
            <span class="modal-stat-label">${stat.label}</span>
        </div>
    `).join('');

    // Populate technologies
    const techContainer = document.getElementById('modal-technologies');
    techContainer.innerHTML = caseStudy.technologies.map(tech => `
        <span class="modal-tag">${tech}</span>
    `).join('');

    // Populate testimonial
    document.getElementById('modal-testimonial-text').textContent = caseStudy.testimonial.text;
    document.getElementById('modal-testimonial-author').textContent = caseStudy.testimonial.author;
    document.getElementById('modal-testimonial-role').textContent = caseStudy.testimonial.role;

    // Set CTA link
    document.getElementById('modal-cta').href = caseStudy.url;
}

// Open Modal
function openModal(caseStudyId) {
    const modal = document.getElementById('case-study-modal');
    populateModal(caseStudyId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('case-study-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Initialize Modal System
document.addEventListener('DOMContentLoaded', function() {
    // Create modal
    createModal();

    // Add click handlers to portfolio items
    const portfolioItems = document.querySelectorAll('[data-case-study]');
    portfolioItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const caseStudyId = this.getAttribute('data-case-study');
            openModal(caseStudyId);
        });
    });

    // Close modal on close button click
    document.querySelector('.modal-close').addEventListener('click', closeModal);

    // Close modal on overlay click (but not on modal content click)
    document.getElementById('case-study-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});
