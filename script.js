document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // LOADING SCREEN - HIGH-DENSITY LOGO POP
    // ============================================
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const counterElement = document.getElementById('counter');
    const progressBar = document.getElementById('progress-bar');
    const techLogos = document.querySelector('.tech-logos');
    const randomLogosLayer = document.getElementById('random-logos-layer');

    // Create tech logos with FontAwesome icons
    const logos = [
        { icon: 'fab fa-html5', delay: 0 },
        { icon: 'fab fa-css3-alt', delay: 0.2 },
        { icon: 'fab fa-js', delay: 0.4 },
        { icon: 'fab fa-python', delay: 0.6 },
        { icon: 'fab fa-git-alt', delay: 0.8 },
        { icon: 'fas fa-code', delay: 1.0 },
        { icon: 'fab fa-github', delay: 1.2 },
        { icon: 'fas fa-brain', delay: 1.4 },
        { icon: 'fab fa-react', delay: 0.15 },
        { icon: 'fab fa-node-js', delay: 0.35 },
        { icon: 'fab fa-npm', delay: 0.55 },
        { icon: 'fas fa-database', delay: 0.75 },
        { icon: 'fab fa-docker', delay: 0.95 },
        { icon: 'fas fa-terminal', delay: 1.15 },
        { icon: 'fab fa-linux', delay: 1.35 },
        { icon: 'fas fa-laptop-code', delay: 1.55 },
        { icon: 'fab fa-html5', delay: 0.1 },
        { icon: 'fab fa-css3-alt', delay: 0.3 },
        { icon: 'fab fa-js', delay: 0.5 },
        { icon: 'fab fa-python', delay: 0.7 },
        { icon: 'fab fa-git-alt', delay: 0.9 },
        { icon: 'fas fa-code', delay: 1.1 },
        { icon: 'fab fa-github', delay: 1.3 },
        { icon: 'fas fa-brain', delay: 1.5 },
        { icon: 'fab fa-react', delay: 0.25 },
        { icon: 'fab fa-node-js', delay: 0.45 },
        { icon: 'fab fa-npm', delay: 0.65 },
        { icon: 'fas fa-database', delay: 0.85 },
        { icon: 'fab fa-docker', delay: 1.05 },
        { icon: 'fas fa-terminal', delay: 1.25 },
        { icon: 'fab fa-linux', delay: 1.45 },
        { icon: 'fas fa-laptop-code', delay: 1.65 }
    ];

    logos.forEach((logo, index) => {
        const logoElement = document.createElement('i');
        logoElement.className = `tech-logo ${logo.icon}`;

        const left = 5 + (index % 8) * 12;
        const top = 5 + Math.floor(index / 8) * 25;

        logoElement.style.left = `${left}%`;
        logoElement.style.top = `${top}%`;

        techLogos.appendChild(logoElement);

        setInterval(() => {
            logoElement.classList.add('active');
            setTimeout(() => {
                logoElement.classList.remove('active');
            }, 1200);
        }, 1800 + logo.delay * 1000);

        setTimeout(() => {
            logoElement.classList.add('active');
        }, 200 + logo.delay * 1000);
    });

    // High-Density Random Logo Pop - Tied to Loading Progress
    const iconsList = [
        'fab fa-html5', 'fab fa-css3-alt', 'fab fa-js', 'fab fa-python',
        'fab fa-git-alt', 'fas fa-code', 'fab fa-github', 'fas fa-brain',
        'fab fa-react', 'fab fa-node-js', 'fab fa-npm', 'fas fa-database',
        'fab fa-docker', 'fas fa-terminal', 'fab fa-linux', 'fas fa-laptop-code'
    ];

    let totalLogosSpawned = 0;
    const TARGET_LOGOS = 150;
    let progress = 0;

    function spawnRandomLogo() {
        if (progress >= 100 || totalLogosSpawned >= TARGET_LOGOS) return;

        const randomIcon = iconsList[Math.floor(Math.random() * iconsList.length)];
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;

        const randomLogo = document.createElement('i');
        randomLogo.className = `random-logo ${randomIcon}`;
        randomLogo.style.left = `${randomX}%`;
        randomLogo.style.top = `${randomY}%`;
        randomLogo.style.fontSize = `${1.5 + Math.random() * 2}rem`;

        randomLogo.classList.add('pop');
        randomLogosLayer.appendChild(randomLogo);
        totalLogosSpawned++;

        setTimeout(() => {
            randomLogo.remove();
        }, 800);
    }

    function updateLoading() {
        if (progress >= 100) {
            // Fade out logos
            document.querySelectorAll('.tech-logo').forEach(logo => {
                logo.style.opacity = '0';
                logo.style.transition = 'opacity 0.5s ease';
            });

            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    mainContent.classList.add('visible');
                    
                    startPuzzleSnake();
                    startPacmanGame();
                    initScrollReveal();
                    initCoinFlip();
                }, 500);
            }, 800);
            return;
        }

        progress += 0.7;
        if (progress > 100) progress = 100;

        counterElement.textContent = `${Math.floor(progress)}%`;
        progressBar.style.width = `${progress}%`;

        // Spawn logos based on progress (150 total logos as progress reaches 100%)
        const logosToSpawn = Math.floor((progress / 100) * TARGET_LOGOS) - totalLogosSpawned;
        for (let i = 0; i < logosToSpawn; i++) {
            setTimeout(() => spawnRandomLogo(), i * 20);
        }

        requestAnimationFrame(updateLoading);
    }

    setTimeout(() => {
        requestAnimationFrame(updateLoading);
    }, 300);

    // ============================================
    // NAVIGATION
    // ============================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const bars = document.querySelectorAll('.menu-bar');
        bars.forEach(bar => bar.classList.toggle('active'));
    });

    navLinksItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.classList.remove('active');

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
    // ENHANCED COIN FLIP - SCATTERED SNIPPETS
    // ============================================
    let coinClickCount = 0;
    let isSpinning = false;

    const codeSnippets = [
        'console.log("Hello");',
        '#include <stdio.h>',
        'int main() {}',
        'def hello(): pass',
        'fn main() {}',
        'func main() {}',
        'public static void main(){}',
        'print("Hello")',
        'echo "Hello";',
        'go run main.go',
        'rustc main.rs',
        'javac Main.java',
        'gcc main.c',
        'g++ main.cpp',
        'python script.py',
        'var x = 0;',
        'let y = 1;',
        'const z = 2;'
    ];

    function initCoinFlip() {
        const coin = document.getElementById('flip-coin');
        const coinLabel = document.querySelector('.coin-label');
        const coinContainer = document.querySelector('.coin-container');

        if (!coin) return;

        coin.addEventListener('click', function() {
            if (isSpinning) return;

            isSpinning = true;
            coinClickCount++;

            coin.classList.add('spinning');
            showScatteredSnippets(coinContainer);

            const isHeads = coinClickCount % 2 === 1;
            const finalRotation = isHeads ? 0 : 180;

            setTimeout(() => {
                coin.classList.remove('spinning');
                coin.style.transform = `rotateY(${finalRotation}deg)`;
                
                if (isHeads) {
                    coinLabel.textContent = 'Python - Click again';
                } else {
                    coinLabel.textContent = 'ChatGPT - Click again';
                }

                setTimeout(() => {
                    isSpinning = false;
                }, 400);
            }, 600);
        });

        coin.addEventListener('mouseenter', function() {
            coinLabel.style.opacity = '1';
        });

        coin.addEventListener('mouseleave', function() {
            if (!coin.matches(':active')) {
                coinLabel.style.opacity = '0.7';
            }
        });
    }

    function showScatteredSnippets(coinContainer) {
        const container = document.getElementById('coin-snippets-container');
        container.innerHTML = '';

        const snippetCount = 15 + Math.floor(Math.random() * 10);
        const containerRect = coinContainer.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        for (let i = 0; i < snippetCount; i++) {
            const snippet = document.createElement('div');
            snippet.className = 'coin-snippet';

            const randomCode = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            snippet.textContent = randomCode;

            // Generate position with minimum distance from coin center
            let validPosition = false;
            let x, y;

            while (!validPosition) {
                x = Math.random() * 100;
                y = Math.random() * 100;

                // Calculate distance from center (50%, 50%)
                const centerX = 50;
                const centerY = 50;
                const distX = Math.abs(x - centerX);
                const distY = Math.abs(y - centerY);
                const distance = Math.sqrt(distX * distX + distY * distY);

                // Ensure minimum distance from coin
                if (distance > 25) {
                    validPosition = true;
                }
            }

            snippet.style.left = `${x}%`;
            snippet.style.top = `${y}%`;
            snippet.style.animationDelay = `${i * 0.05}s`;

            container.appendChild(snippet);

            setTimeout(() => {
                snippet.classList.add('active');
            }, 10);
        }

        setTimeout(() => {
            const snippets = container.querySelectorAll('.coin-snippet');
            snippets.forEach(s => {
                s.style.opacity = '0';
                s.style.transition = 'opacity 0.3s ease';
            });
        }, 800);
    }

    // ============================================
    // IMPROVED PROGRESSIVE SNAKE ANIMATION WITH TEXT
    // ============================================
    let puzzleSnakeAnimationId = null;
    let snakeSegments = [];
    let containerWidth = 0;
    let containerHeight = 0;
    let snakeHeadPosition = -100;
    const SEGMENT_COUNT = 20;
    const SEGMENT_SPACING = 30;
    const SNAKE_SPEED = 2;
    const TOTAL_SNAKE_LENGTH = SEGMENT_COUNT * SEGMENT_SPACING;
    const TEXT_DELAY = 0.33; // Text appears after 1/3 of snake enters

    function createPuzzleSnake() {
        const container = document.querySelector('.puzzle-snake-container');
        const segmentsContainer = document.getElementById('snake-segments');

        if (!container || !segmentsContainer) return;

        containerWidth = container.offsetWidth;
        containerHeight = container.offsetHeight;

        segmentsContainer.innerHTML = '';
        snakeSegments = [];

        for (let i = 0; i < SEGMENT_COUNT; i++) {
            const segment = document.createElement('div');
            segment.className = 'snake-segment';
            segmentsContainer.appendChild(segment);
            snakeSegments.push({
                element: segment,
                index: i,
                pulseDelay: i * 0.08
            });
        }
    }

    function updatePuzzleSnake() {
        if (!snakeSegments.length) return;

        snakeHeadPosition += SNAKE_SPEED;

        // Update segment positions - progressive follow
        snakeSegments.forEach((segment, index) => {
            const segmentTargetX = snakeHeadPosition - (index * SEGMENT_SPACING);
            const segmentY = containerHeight / 2;

            segment.element.style.left = `${segmentTargetX}px`;
            segment.element.style.top = `${segmentY}px`;

            // Pulsing animation
            const pulseTime = (Date.now() * 0.003 + segment.pulseDelay) % (Math.PI * 2);
            const pulseScale = 0.9 + Math.sin(pulseTime) * 0.1;
            segment.element.style.transform = `translate(-50%, -50%) scale(${pulseScale})`;
        });

        // Text follows snake body - appears after 1/3 of snake enters
        const textContainer = document.getElementById('snake-text-container');
        const snakeBodyEnteredLength = Math.min(snakeHeadPosition, TOTAL_SNAKE_LENGTH);
        const textTriggerPoint = TOTAL_SNAKE_LENGTH * TEXT_DELAY;

        if (snakeBodyEnteredLength >= textTriggerPoint) {
            // Position text on the snake body (around middle of snake)
            const middleSegmentIndex = Math.floor(SEGMENT_COUNT / 2);
            const textX = snakeHeadPosition - (middleSegmentIndex * SEGMENT_SPACING);
            const textY = containerHeight / 2;
            
            textContainer.style.left = `${textX}px`;
            textContainer.style.top = `${textY}px`;
            textContainer.style.transform = 'translate(-50%, -50%)';
            textContainer.style.opacity = '1';
        } else {
            textContainer.style.opacity = '0';
        }

        // Reset when snake completely exits screen
        if (snakeHeadPosition > containerWidth + TOTAL_SNAKE_LENGTH) {
            snakeHeadPosition = -TOTAL_SNAKE_LENGTH - 100;
        }

        puzzleSnakeAnimationId = requestAnimationFrame(updatePuzzleSnake);
    }

    function startPuzzleSnake() {
        createPuzzleSnake();

        if (puzzleSnakeAnimationId) {
            cancelAnimationFrame(puzzleSnakeAnimationId);
        }

        snakeHeadPosition = -100;
        updatePuzzleSnake();
    }

    // ============================================
    // PAC-MAN GAME
    // ============================================
    const pacmanElement = document.getElementById('pacman');
    const techBalls = document.querySelectorAll('.tech-ball');
    const techSection = document.getElementById('tech');
    const pacmanInstruction = document.querySelector('.pacman-instruction');

    let pacmanPosition = -40;
    let currentBallIndex = 0;
    let gameActive = false;
    let animationId = null;
    let previousBallIndex = -1;

    function startPacmanGame() {
        if (gameActive) return;

        gameActive = true;
        pacmanPosition = -40;
        currentBallIndex = 0;
        previousBallIndex = -1;

        techBalls.forEach(ball => {
            ball.classList.remove('hidden');
            ball.classList.add('visible');
        });

        movePacman();
    }

    function movePacman() {
        if (!gameActive) return;

        pacmanPosition += 3;
        pacmanElement.style.left = `${pacmanPosition}px`;

        if (previousBallIndex >= 0 && previousBallIndex !== currentBallIndex) {
            const previousBall = techBalls[previousBallIndex];
            const prevBallRect = previousBall.getBoundingClientRect();
            const sectionRect = techSection.getBoundingClientRect();
            const prevBallLeft = prevBallRect.left - sectionRect.left + prevBallRect.width / 2;
            
            if (Math.abs(pacmanPosition - prevBallLeft) > 100) {
                previousBall.classList.remove('hidden');
                previousBall.classList.add('visible');
            }
        }

        if (currentBallIndex < techBalls.length) {
            const currentBall = techBalls[currentBallIndex];
            const ballRect = currentBall.getBoundingClientRect();
            const sectionRect = techSection.getBoundingClientRect();
            const ballLeft = ballRect.left - sectionRect.left + ballRect.width / 2;
            
            if (Math.abs(pacmanPosition - ballLeft) < 50) {
                currentBall.classList.remove('visible');
                currentBall.classList.add('hidden');
                
                previousBallIndex = currentBallIndex;
                currentBallIndex = (currentBallIndex + 1) % techBalls.length;
            }
        }

        if (pacmanPosition < techSection.offsetWidth + 40) {
            animationId = requestAnimationFrame(movePacman);
        } else {
            gameActive = false;
            
            techBalls.forEach(ball => {
                ball.classList.remove('hidden');
                ball.classList.add('visible');
            });
            
            setTimeout(() => {
                startPacmanGame();
            }, 1000);
        }
    }

    function restartPacmanGame() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }

        gameActive = false;
        pacmanPosition = -40;
        currentBallIndex = 0;
        previousBallIndex = -1;

        techBalls.forEach(ball => {
            ball.classList.remove('hidden');
            ball.classList.add('visible');
        });

        setTimeout(() => {
            startPacmanGame();
        }, 500);
    }

    techSection.addEventListener('click', restartPacmanGame);
    pacmanInstruction.addEventListener('click', function(e) {
        e.stopPropagation();
        restartPacmanGame();
    });

    // ============================================
    // SCROLL REVEAL
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
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.scroll-reveal');
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

    window.addEventListener('scroll', updateActiveNavLink);

    // ============================================
    // WINDOW RESIZE HANDLER
    // ============================================
    window.addEventListener('resize', function() {
        if (mainContent.classList.contains('visible')) {
            startPuzzleSnake();
        }
    });

    // ============================================
    // INITIALIZE ON LOAD
    // ============================================
    updateActiveNavLink();
});