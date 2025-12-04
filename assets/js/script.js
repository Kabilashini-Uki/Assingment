

document.addEventListener("DOMContentLoaded", function () {

    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';


    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon();

    
            document.body.style.transition = 'background 0.5s ease, color 0.5s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 500);
        });
    }

    function updateThemeIcon() {
        if (themeToggle) {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const themeIcon = themeToggle.querySelector('.theme-icon');
            if (themeIcon) {
                themeIcon.src = currentTheme === 'light' ? 'assets/images/moon.svg' : 'assets/images/sun.svg';
            }
        }
    }


    const askBtn = document.getElementById("askBtn");
    const travelInput = document.getElementById("travelInput");
    const aiResponse = document.getElementById("aiResponse");

    const suggestions = {
        Paris: " Visit the Eiffel Tower at sunset, explore the Louvre Museum's masterpieces, and enjoy a romantic Seine River cruise. Don't miss trying authentic croissants and escargot!",
        Japan: "Explore Tokyo's bustling Shibuya Crossing, visit ancient Kyoto temples, savor fresh sushi experiences, and witness Mount Fuji's majestic views. Try ramen and matcha!",
        Beach: " Relax on pristine white sandy beaches, enjoy thrilling water sports, watch breathtaking sunsets, and indulge in fresh seafood at beachside restaurants.",
        "New York": " Visit the Statue of Liberty, explore Times Square's bright lights, walk across Brooklyn Bridge, and enjoy Broadway shows. Try New York-style pizza!",
        Thailand: " Discover Bangkok's temples, relax on Phuket's beaches, explore Chiang Mai's night markets, and enjoy street food adventures. Don't miss the elephant sanctuaries!",
        Italy: " Wander Rome's ancient Colosseum, throw a coin in Trevi Fountain, explore Venice's canals, and enjoy authentic pasta and gelato in Florence.",
        "Australia": " Visit the Sydney Opera House, explore the Great Barrier Reef, see kangaroos in the wild, and enjoy beach life in Bondi. Try Vegemite!",
        default: " Explore amazing destinations worldwide! Whether you're seeking adventure, relaxation, culture, or cuisine, there's a perfect trip waiting for you. What type of experience interests you most?"
    };


    function typeWriter(text, element, speed = 30) {
        element.textContent = '';
        element.style.opacity = '0.7';
        let i = 0;

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.style.opacity = '1';
            }
        }
        type();
    }

    if (askBtn && travelInput && aiResponse) {
        
        travelInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                askBtn.click();
            }
        });

        askBtn.addEventListener("click", function () {
            const userInput = travelInput.value.trim();

            if (userInput === "") {
                typeWriter("Please type a destination or travel idea to get personalized AI suggestions! ", aiResponse);
                return;
            }

        
            aiResponse.textContent = "Thinking...";
            aiResponse.style.opacity = '0.7';

            
            setTimeout(() => {
                const key = Object.keys(suggestions).find(k =>
                    userInput.toLowerCase().includes(k.toLowerCase())
                );
                const response = suggestions[key] || suggestions.default;
                typeWriter(response, aiResponse);
            }, 800);
        });
    }


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.15)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.25)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });
    }

    
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            
            const eyeIcon = this.querySelector('.input-icon');
            if (eyeIcon) {
                eyeIcon.src = type === 'password' ? 'assets/images/eye.svg' : 'assets/images/eye-off.svg';
            }
        });
    }

    
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('#email');
            const password = this.querySelector('#password');

            if (!email.value || !password.value) {
                alert('Please fill in all fields');
                return;
            }

        
            alert('Login successful! Welcome to TravelAI ');
            
        });
    }

    
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    
    document.querySelectorAll('.card, .ai-suggestion, .about').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});