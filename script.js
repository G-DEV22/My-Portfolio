document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // CUSTOM CURSOR (Shows alongside default cursor)
    // ============================================
    const customCursor = document.createElement('div');
    customCursor.className = 'custom-cursor';
    document.body.appendChild(customCursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;
    
    // Show custom cursors after loading
    setTimeout(() => {
        customCursor.style.display = 'block';
        cursorDot.style.display = 'block';
    }, 500);

    // ============================================
    // STAR BACKGROUND MOVEMENT WITH CURSOR (FIXED)
    // ============================================
    let starParallaxEnabled = false;
    const starLayers = [];
    
    // Store original star positions
    const starBasePositions = [];

    function initializeStars() {
        const stars = document.querySelectorAll('.stars');
        starLayers.length = 0;
        starBasePositions.length = 0;
        
        stars.forEach((starLayer, index) => {
            // Save reference to each layer
            starLayers.push({
                element: starLayer,
                depth: (index + 1) * 0.3, // Different sensitivity for each layer
                originalTransform: getComputedStyle(starLayer).transform
            });
            
            // Store base animation position
            starBasePositions[index] = {
                x: 0,
                y: 0,
                animationOffset: index * 1000 // Different start for each layer
            };
        });
        
        starParallaxEnabled = true;
        console.log(`Initialized ${starLayers.length} star layers for parallax`);
    }

    let lastStarUpdate = 0;
    const starUpdateInterval = 16; // Update stars every ~16ms (60fps max)
    
    function updateStarPositions() {
        if (!starParallaxEnabled || starLayers.length === 0) return;
        
        const now = Date.now();
        if (now - lastStarUpdate < starUpdateInterval) return;
        lastStarUpdate = now;
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Calculate normalized mouse position (-1 to 1)
        const mousePercentX = (mouseX - centerX) / centerX;
        const mousePercentY = (mouseY - centerY) / centerY;
        
        // Calculate rotation angle based on mouse position (reduced for performance)
        const rotationAngle = mousePercentX * 10; // Reduced from 15 to 10 degrees
        
        // Cache time calculation
        const time = now / 1000;
        
        // Update each star layer with optimized transform
        starLayers.forEach((layer, index) => {
            const basePos = starBasePositions[index];
            
            // Calculate parallax movement (reduced for performance)
            const parallaxX = mousePercentX * 40 * layer.depth; // Reduced from 60 to 40
            const parallaxY = mousePercentY * 40 * layer.depth;
            
            // Simplified wave animation
            const waveX = Math.sin(time * 0.1 + basePos.animationOffset) * 3;
            const waveY = Math.cos(time * 0.15 + basePos.animationOffset) * 3;
            
            // Simplified drift
            const drift = (time * 10) % 200;
            
            // Calculate rotation for this layer
            const layerRotation = rotationAngle * layer.depth;
            
            // Apply transform using translate3d for hardware acceleration
            const translateX = parallaxX + waveX;
            const translateY = parallaxY + waveY - drift;
            
            layer.element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate(${layerRotation}deg)`;
        });
    }

    // Track mouse movement with throttling
    let lastMouseUpdate = 0;
    const mouseUpdateInterval = 16; // Throttle to ~60fps
    
    document.addEventListener('mousemove', function(e) {
        const now = Date.now();
        if (now - lastMouseUpdate < mouseUpdateInterval) return;
        lastMouseUpdate = now;
        
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Reduced comet creation frequency for performance
        if (Math.random() > 0.9995) { // Changed from 0.998 to 0.9995
            createComet(e.clientX, e.clientY);
        }
    });

    // Create comet trail effect
    function createComet(x, y) {
        const comet = document.createElement('div');
        comet.className = 'comet';
        comet.style.left = `${x}px`;
        comet.style.top = `${y}px`;
        comet.style.width = '3px';
        comet.style.height = '3px';
        document.querySelector('.cosmic-background').appendChild(comet);
        
        // Animate comet
        const animation = comet.animate([
            { 
                transform: 'translate(0, 0) scale(1)', 
                opacity: 0,
                boxShadow: '0 0 5px var(--pulsar-cyan)'
            },
            { 
                transform: 'translate(0, 0) scale(2)', 
                opacity: 1,
                boxShadow: '0 0 15px var(--pulsar-cyan)'
            },
            { 
                transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.5)`, 
                opacity: 0,
                boxShadow: '0 0 5px var(--pulsar-cyan)'
            }
        ], {
            duration: 1500 + Math.random() * 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        animation.onfinish = () => comet.remove();
    }

    // Smooth cursor animation
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        customCursor.style.left = `${cursorX}px`;
        customCursor.style.top = `${cursorY}px`;
        
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        
        // Update stars continuously for smooth animation
        if (starParallaxEnabled) {
            updateStarPositions();
        }
        
        requestAnimationFrame(animateCursor);
    }
    
    // Start cursor animation
    animateCursor();

    // Change cursor style on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .cosmic-element, .cosmic-node, .nav-link');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            customCursor.style.transform = 'scale(1.5)';
            customCursor.style.borderColor = 'var(--supernova-red)';
            customCursor.style.borderWidth = '3px';
            
            cursorDot.style.backgroundColor = 'var(--supernova-red)';
            cursorDot.style.transform = 'scale(2)';
        });
        
        element.addEventListener('mouseleave', () => {
            customCursor.style.borderColor = 'var(--pulsar-cyan)';
            customCursor.style.borderWidth = '2px';
            customCursor.style.transform = 'scale(1)';
            
            cursorDot.style.backgroundColor = 'var(--pulsar-cyan)';
            cursorDot.style.transform = 'scale(1)';
        });
    });

    // ============================================
    // COSMIC ELEMENT HOVER EFFECTS WITH PARTICLES
    // ============================================
    const cosmicElements = document.querySelectorAll('.cosmic-element');
    
    cosmicElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            // Create fewer particles for better performance
            for (let i = 0; i < 4; i++) { // Reduced from 8 to 4
                createParticle(e.currentTarget);
            }
            
            // Add pulsing animation
            this.style.animation = 'pulse 1s ease-in-out infinite';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
        
        // Throttled mouse move effect for 3D tilt
        let lastTiltUpdate = 0;
        element.addEventListener('mousemove', function(e) {
            const now = Date.now();
            if (now - lastTiltUpdate < 50) return; // Throttle to 20fps
            lastTiltUpdate = now;
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.05)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    function createParticle(parent) {
        const particle = document.createElement('div');
        particle.className = 'tech-particle';
        
        const colors = ['#00f5d4', '#7b2cbf', '#ffd166', '#ef476f', '#00b4d8'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.position = 'absolute';
        particle.style.width = '3px'; // Reduced from 4px
        particle.style.height = '3px';
        particle.style.background = randomColor;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.boxShadow = `0 0 8px ${randomColor}`; // Reduced glow
        
        const rect = parent.getBoundingClientRect();
        particle.style.left = `${rect.width / 2}px`;
        particle.style.top = `${rect.height / 2}px`;
        
        parent.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 40 + Math.random() * 40; // Reduced from 50+50
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            { 
                transform: `translate(${tx}px, ${ty}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 600 + Math.random() * 300, // Reduced duration
            easing: 'cubic-bezier(0, 0.55, 0.45, 1)'
        }).onfinish = () => particle.remove();
    }

    // ============================================
    // LOADING SCREEN WITH PROGRAMMING LANGUAGE LOGOS
    // ============================================
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const counterElement = document.getElementById('counter');
    const progressBar = document.getElementById('progress-bar');
    const terminalOutput = document.getElementById('terminal-output');
    const logosLayer = document.getElementById('logos-layer');

    const bootMessages = [
        "> Booting Cosmic Developer Interface...",
        "> Initializing Neural Networks...",
        "> Loading AI Core Modules...",
        "> Mounting Educational Databases...",
        "> Starting StudentStack Service...",
        "> Launching StudMaster AI...",
        "> Connecting to GitHub Nebula...",
        "> Loading Project Galaxies...",
        "> System Integrity: STABLE",
        "> Memory Allocation: 16GB ✓",
        "> GPU Acceleration: ENABLED ✓",
        "> Welcome to Cosmic Dev Environment",
        "> All Systems: OPERATIONAL"
    ];

    const programmingLogos = [
        'fab fa-python', 'fab fa-js', 'fab fa-java', 'fab fa-html5',
        'fab fa-css3-alt', 'fab fa-react', 'fab fa-node-js', 'fab fa-git-alt',
        'fab fa-github', 'fab fa-npm', 'fab fa-docker', 'fab fa-linux',
        'fab fa-windows', 'fab fa-apple', 'fas fa-database', 'fas fa-code',
        'fas fa-terminal', 'fas fa-cogs', 'fas fa-microchip', 'fas fa-robot',
        'fas fa-brain', 'fas fa-network-wired', 'fas fa-server', 'fas fa-cloud',
        'fab fa-aws', 'fab fa-google', 'fab fa-microsoft', 'fab fa-ubuntu'
    ];

    let progress = 0;
    let currentLine = 0;
    let logosPopped = 0;
    const TOTAL_LOGOS = 50;

    function popProgrammingLogo() {
        if (logosPopped >= TOTAL_LOGOS) return;
        
        const randomIcon = programmingLogos[Math.floor(Math.random() * programmingLogos.length)];
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomSize = 2 + Math.random() * 3;
        
        const logo = document.createElement('i');
        logo.className = `programming-logo ${randomIcon}`;
        logo.style.left = `${randomX}%`;
        logo.style.top = `${randomY}%`;
        logo.style.fontSize = `${randomSize}rem`;
        
        const colors = ['#00f5d4', '#7b2cbf', '#00b4d8', '#ffd166', '#ef476f'];
        logo.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        logo.classList.add('pop');
        logosLayer.appendChild(logo);
        logosPopped++;
        
        setTimeout(() => logo.remove(), 1500);
    }

    function typeWriter(text, element, callback) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 40);
            } else if (callback) {
                setTimeout(callback, 300);
            }
        }
        type();
    }

    function addTerminalLine(message, delay = 0) {
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            terminalOutput.appendChild(line);
            typeWriter(message, line);
            
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }, delay);
    }

    function simulateBoot() {
        bootMessages.forEach((message, index) => {
            addTerminalLine(message, index * 400);
        });

        const bootProgress = setInterval(() => {
            progress += 2;
            if (progress > 100) {
                progress = 100;
                clearInterval(bootProgress);
                
                addTerminalLine("> System Ready. Launching Interface...", 800);
                
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    loadingScreen.style.transition = 'opacity 0.8s ease';
                    
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        mainContent.classList.add('visible');
                        
                        // Initialize star movement
                        initializeStars();
                        updateStarPositions();
                        
                        // Initialize main content features
                        initScrollReveal();
                        initOrbitAnimation();
                        initTerminalAnimation();
                        updateActiveNavLink();
                        
                        console.log('Stars initialized with cursor tracking');
                    }, 800);
                }, 1500);
            }
            
            counterElement.textContent = `${progress}%`;
            progressBar.style.width = `${progress}%`;
            
            const logosToPop = Math.floor((progress / 100) * TOTAL_LOGOS) - logosPopped;
            for (let i = 0; i < logosToPop; i++) {
                setTimeout(() => popProgrammingLogo(), i * 20);
            }
        }, 80);
    }

    // Start boot sequence
    setTimeout(simulateBoot, 500);

    // ============================================
    // NAVIGATION
    // ============================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    const menuBars = document.querySelectorAll('.menu-bar');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuBars.forEach(bar => bar.classList.toggle('active'));
    });

    navLinksItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.classList.remove('active');
            menuBars.forEach(bar => bar.classList.remove('active'));

            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    navLinksItems.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // ORBIT ANIMATION
    // ============================================
    function initOrbitAnimation() {
        const orbitRings = document.querySelectorAll('.orbit-ring');
        orbitRings.forEach((ring, index) => {
            ring.style.animationDuration = `${15 + index * 5}s`;
        });
    }

    // ============================================
    // DYNAMIC TERMINAL ANIMATION
    // ============================================
    function initTerminalAnimation() {
        const terminalContent = document.querySelector('.terminal-content');
        if (!terminalContent) return;

        const commands = [
            "> Analyzing learning patterns...",
            "> Generating AI recommendations...",
            "> Updating neural networks...",
            "> Processing educational data...",
            "> Optimizing student paths...",
            "> System Status: OPTIMAL"
        ];

        let commandIndex = 0;
        
        function typeCommand() {
            const cursor = terminalContent.querySelector('.terminal-cursor');
            const newLine = document.createElement('div');
            newLine.className = 'terminal-line';
            newLine.textContent = commands[commandIndex];
            
            const lines = terminalContent.querySelectorAll('.terminal-line');
            if (lines.length > 8) {
                lines[0].remove();
            }
            
            terminalContent.insertBefore(newLine, cursor);
            terminalContent.scrollTop = terminalContent.scrollHeight;
            
            commandIndex = (commandIndex + 1) % commands.length;
        }
        
        setInterval(typeCommand, 5000);
    }

    // ============================================
    // SCROLL REVEAL EFFECTS
    // ============================================
    function initScrollReveal() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    if (entry.target.classList.contains('project-card') || 
                        entry.target.classList.contains('cosmic-element') ||
                        entry.target.classList.contains('cosmic-node')) {
                        const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.1;
                        entry.target.style.transitionDelay = `${delay}s`;
                    }
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-scale, .scroll-slide-left, .scroll-slide-right');
        revealElements.forEach(element => {
            observer.observe(element);
        });
    }

    // ============================================
    // UPDATE ACTIVE NAV LINK ON SCROLL
    // ============================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;

        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = sectionId;
            }
        });

        if (currentSectionId) {
            navLinksItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    // ============================================
    // HANDLE WINDOW RESIZE
    // ============================================
    window.addEventListener('resize', () => {
        if (starParallaxEnabled) {
            updateStarPositions();
        }
    });

    // ============================================
    // DEMONSTRATE STAR MOVEMENT (Test Function)
    // ============================================
    function testStarMovement() {
        console.log("Testing star movement... Move your cursor!");
        console.log(`Mouse position: ${mouseX}, ${mouseY}`);
        console.log(`Star layers: ${starLayers.length}`);
    }

    // Expose test function to console
    window.testStars = testStarMovement;

    // ============================================
    // INITIALIZE EVERYTHING
    // ============================================
    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('load', () => {
        initTerminalAnimation();
        updateActiveNavLink();
        
        // Add test button for debugging (remove in production)
        const testBtn = document.createElement('button');
        testBtn.textContent = 'Test Star Movement';
        testBtn.style.position = 'fixed';
        testBtn.style.bottom = '20px';
        testBtn.style.right = '20px';
        testBtn.style.zIndex = '10000';
        testBtn.style.padding = '10px';
        testBtn.style.background = 'var(--supernova-red)';
        testBtn.style.color = 'white';
        testBtn.style.border = 'none';
        testBtn.style.borderRadius = '5px';
        testBtn.style.cursor = 'pointer';
        testBtn.style.display = 'none'; // Hidden by default
        testBtn.onclick = testStarMovement;
        document.body.appendChild(testBtn);
        
        // Show test button in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            testBtn.style.display = 'block';
        }
    });

    // Add CSS for terminal cursor
    const style = document.createElement('style');
    style.textContent = `
        .terminal-cursor {
            display: inline-block;
            width: 8px;
            height: 1.2em;
            background-color: var(--pulsar-cyan);
            margin-left: 2px;
            animation: blink 1s infinite;
            vertical-align: middle;
        }
        
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});
