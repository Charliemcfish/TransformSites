// Motivational Messages for Dashboard
const motivationalMessages = [
    {
        title: "Get this bread, Charlie!",
        subtitle: "Another day, another opportunity to grow Transform Sites"
    },
    {
        title: "Chase the money, Charlie!",
        subtitle: "Your clients are waiting for your magic touch"
    },
    {
        title: "Time to stack that paper!",
        subtitle: "Let's turn those prospects into paying clients"
    },
    {
        title: "Let's crush it today, Charlie!",
        subtitle: "Every website you build changes a business"
    },
    {
        title: "Show them what Transform Sites can do!",
        subtitle: "You're building more than websites - you're building dreams"
    },
    {
        title: "Money moves only, Charlie!",
        subtitle: "Those prospects won't convert themselves"
    },
    {
        title: "Build that empire!",
        subtitle: "From freelancer to agency owner - you're on your way"
    },
    {
        title: "Hustle hard, Charlie!",
        subtitle: "Success doesn't sleep, and neither do you"
    },
    {
        title: "Secure the bag!",
        subtitle: "Every email sent is a step closer to your next client"
    },
    {
        title: "Let's make it rain!",
        subtitle: "Time to turn those leads into revenue"
    },
    {
        title: "You're on fire, Charlie!",
        subtitle: "Keep this energy going and watch Transform Sites soar"
    },
    {
        title: "Get after it!",
        subtitle: "Your future self will thank you for today's grind"
    },
    {
        title: "Make today count!",
        subtitle: "Every client added is one step closer to your goals"
    },
    {
        title: "Time to boss up!",
        subtitle: "You didn't start Transform Sites to stay small"
    },
    {
        title: "Let's scale this thing!",
        subtitle: "From Yeovil to the world - let's grow"
    },
    {
        title: "Cash flow incoming!",
        subtitle: "Those monthly retainers are calling your name"
    },
    {
        title: "No days off!",
        subtitle: "While others sleep, you're building an empire"
    },
    {
        title: "Keep grinding, Charlie!",
        subtitle: "Transform Sites isn't going to build itself"
    },
    {
        title: "You've got this!",
        subtitle: "Every successful agency started exactly where you are"
    },
    {
        title: "Let's get it!",
        subtitle: "Time to turn those prospects into success stories"
    }
];

// Get a random motivational message
function getMotivationalMessage() {
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    return motivationalMessages[randomIndex];
}

// Display motivational message on dashboard home
function displayMotivationalMessage() {
    const message = getMotivationalMessage();
    return `
        <div class="motivational-message">
            <h2>${message.title}</h2>
            <p>${message.subtitle}</p>
        </div>
    `;
}
