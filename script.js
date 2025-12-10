document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        cursorBlur.style.left = e.clientX + 'px';
        cursorBlur.style.top = e.clientY + 'px';
    });

    // Hover effects for cursor
    const hoverElements = document.querySelectorAll('a, button, .member-card, .goal-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursor.style.backgroundColor = 'rgba(0, 243, 255, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
        });
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animation
    gsap.from('.hero-content h1', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: 'power4.out',
        delay: 0.5
    });

    gsap.from('.hero-content .subtitle', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.8
    });

    gsap.from('.cta-btn', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 1.1
    });

    // Scroll Animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1
        });
    });

    gsap.utils.toArray('.goal-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.2
        });
    });

    gsap.from('.team-grid', {
        scrollTrigger: {
            trigger: '.team-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.9,
        opacity: 0,
        duration: 1
    });

    // Text Scramble Effect (Simple implementation)
    const title = document.querySelector('.glitch');
    const originalText = title.getAttribute('data-text');
    const chars = '!<>-_\\/[]{}—=+*^?#________';

    let iterations = 0;

    const scramble = () => {
        title.innerText = title.innerText
            .split('')
            .map((letter, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        if (iterations >= originalText.length) {
            clearInterval(interval);
        }

        iterations += 1 / 3;
    }

    const interval = setInterval(scramble, 30);

    // Generate Particles
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';

        particlesContainer.appendChild(particle);
    }

    // Floating elements interaction
    const floatingElements = document.querySelectorAll('.float-item');
    floatingElements.forEach(element => {
        element.addEventListener('click', function () {
            gsap.to(this, {
                rotation: '+=360',
                scale: 1.5,
                duration: 0.5,
                ease: 'back.out',
                yoyo: true,
                repeat: 1
            });
        });
    });

    // Event Tabs Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding content
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    // Chatbot Functionality
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const quickBtns = document.querySelectorAll('.quick-btn');

    // Toggle chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });

    // AI Response Database
    const responses = {
        'what does the hardware club do?': 'The Hardware Club focuses on innovation in embedded systems, IoT, robotics, and hardware development. We provide hands-on experience with cutting-edge technology and organize workshops, hackathons, and projects!',
        'how can i join?': 'Great! To join the Hardware Club, please email us at iedchardwareclub@sahrdaya.ac.in or contact our Club Lead Yash Sanjay Kurup at yash123737@sahrdaya.ac.in. We welcome all passionate students!',
        'what events do you organize?': 'We organize technical workshops, hardware hackathons, IoT bootcamps, robotics competitions, and guest lectures from industry experts. Follow us for upcoming events!',
        'contact information': 'You can reach us at:\n📧 Main: iedchardwareclub@sahrdaya.ac.in\n👤 Club Lead: Yash Sanjay Kurup (yash123737@sahrdaya.ac.in)\n👤 Vice Chair: Devika KV (devika224450@sahrdaya.ac.in)',
        'default': "I'm here to help! You can ask me about:\n• What the Hardware Club does\n• How to join\n• Our events\n• Contact information\n\nOr feel free to ask anything else!"
    };

    // Add message to chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;

        messageDiv.appendChild(contentDiv);
        chatbotMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Get AI response
    function getResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase().trim();

        // Check for exact matches
        if (responses[lowerMessage]) {
            return responses[lowerMessage];
        }

        // Check for keyword matches
        if (lowerMessage.includes('join') || lowerMessage.includes('member')) {
            return responses['how can i join?'];
        }
        if (lowerMessage.includes('event') || lowerMessage.includes('workshop') || lowerMessage.includes('hackathon')) {
            return responses['what events do you organize?'];
        }
        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
            return responses['contact information'];
        }
        if (lowerMessage.includes('about') || lowerMessage.includes('what') || lowerMessage.includes('do')) {
            return responses['what does the hardware club do?'];
        }
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! 👋 Welcome to the Hardware Club. How can I assist you today?";
        }
        if (lowerMessage.includes('thank')) {
            return "You're welcome! Feel free to ask if you have any other questions. 😊";
        }

        return responses['default'];
    }

    // Handle send message
    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, true);
        userInput.value = '';

        // Simulate typing delay
        setTimeout(() => {
            const response = getResponse(message);
            addMessage(response, false);
        }, 500);
    }

    // Send button click
    sendBtn.addEventListener('click', sendMessage);

    // Enter key press
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Quick action buttons
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            addMessage(question, true);

            setTimeout(() => {
                const response = getResponse(question);
                addMessage(response, false);
            }, 500);
        });
    });
});
