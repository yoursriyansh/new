document.addEventListener("DOMContentLoaded", function () {
    // Your script here


    const lines = document.querySelectorAll('.line1, .line2, .line3, .line4, .line5, .line6, .line7, .line8, .line9, .line10, .left-line1, .left-line2, .left-line3, .left-line4, .left-line5, .left-line6, .left-line7, .left-line8, .left-line9, .left-line10');

    window.addEventListener('scroll', function() {
        // Get the scroll position
        const scrollPosition = window.scrollY;

        // Calculate the additional rotation based on the scroll position
        const rotation = scrollPosition / 50;

        // Apply rotation to all the lines, preserving their initial rotation
        lines.forEach(function(line) {
            // Right side lines: increase rotation negatively
            if (line.classList.contains('line1') || line.classList.contains('line2') || line.classList.contains('line3') || line.classList.contains('line4') || line.classList.contains('line5') || line.classList.contains('line6') || line.classList.contains('line7') || line.classList.contains('line8') || line.classList.contains('line9') || line.classList.contains('line10')) {
                const initialRotation = 10; // Default rotation for right lines (opposite direction)
                line.style.transform = `rotate(${initialRotation - rotation}deg)`;
            }
            // Left side lines: increase rotation positively
            else if (line.classList.contains('left-line1') || line.classList.contains('left-line2') || line.classList.contains('left-line3') || line.classList.contains('left-line4') || line.classList.contains('left-line5') || line.classList.contains('left-line6') || line.classList.contains('left-line7') || line.classList.contains('left-line8') || line.classList.contains('left-line9') || line.classList.contains('left-line10')) {
                const initialRotation = -10; // Default rotation for left lines (opposite direction)
                line.style.transform = `rotate(${initialRotation + rotation}deg)`;
            }
        });
    });

});

document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // Entry Animation - Moves Into View Smoothly
    gsap.from(".container-about", {
        y: -200, // Starts slightly lower
        duration: 8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".container-about",
            start: "top 100%",
            end: "bottom 100%",
            scrub: true,
        }
    });

    // Exit Animation - Moves Down WITHOUT Upward Bounce
    gsap.fromTo(".container-about",
        { y: 0 }, // Start at neutral position (no bounce upwards)
        { 
            y: 200, opacity: 0, ease: "power3.out",
            scrollTrigger: {
                trigger: ".container-about",
                start: "bottom 50%", // Start exit animation earlier
                end: "bottom -20%", // Fully disappears when bottom moves out
                scrub: true,
                onEnterBack: (self) => gsap.to(".container-about", { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }),
            }
        }
    );
});










document.addEventListener("DOMContentLoaded", function () {
const rocket = document.querySelector('.rocket');
                        const flame = document.querySelector('.flame');

                        document.querySelector('.ci-cd.right').addEventListener('mouseenter', function() {
                            // Show flame effect & grow
                            gsap.to(flame, { opacity: 1, scaleY: 2, duration: 0.3 });

                            // Move both rocket & flame upwards together
                            gsap.to([rocket, flame], {
                                duration: 3,
                                ease: "power4.out",
                                y: -300 // Moves rocket straight up
                            });
                        });

                        document.querySelector('.ci-cd.right').addEventListener('mouseleave', function() {
                            // Hide flame effect
                            gsap.to(flame, { opacity: 0, duration: 0.5 });
                            gsap.to(rocket, { opacity: 1, duration: 0.5 });

                            // Reset rocket & flame to original position
                            gsap.to([rocket, flame], {
                                duration: 2,
                                y: 0,
                                ease: "power2.out"
                            });
                        });
});

document.addEventListener('DOMContentLoaded', () => {
    const eyes = document.querySelectorAll('.pupil');
    document.addEventListener('mousemove', (event) => {
        const bounds = document.querySelector('svg').getBoundingClientRect();
        const maxOffset = 6;
        
        eyes.forEach(pupil => {
            const eyeX = parseFloat(pupil.getAttribute('data-x'));
            const eyeY = parseFloat(pupil.getAttribute('data-y'));
            const dx = event.clientX - (bounds.left + eyeX);
            const dy = event.clientY - (bounds.top + eyeY);
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);
            
            const offsetX = Math.cos(angle) * Math.min(maxOffset, distance * 0.1);
            const offsetY = Math.sin(angle) * Math.min(maxOffset, distance * 0.1);
            
            pupil.style.transition = 'transform 0.1s ease-out';
            pupil.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const windows = document.querySelectorAll('.window');
    let activeWindow = null;
    let initialX, initialY;
    let currentX, currentY;
    let isDragging = false;

    // Initialize random positions
    windows.forEach(window => {
        const container = document.querySelector('.projects');
        const maxX = container.clientWidth - window.offsetWidth;
        const maxY = container.clientHeight - window.offsetHeight;
        
        // Ensure initial positions are within bounds
        window.style.left = Math.max(0, Math.min(Math.random() * maxX, maxX)) + 'px';
        window.style.top = Math.max(0, Math.min(Math.random() * maxY, maxY)) + 'px';

        // Window controls
        const controls = window.querySelector('.controls');
        const minimize = controls.querySelector('.minimize');
        const maximize = controls.querySelector('.maximize');
        const close = controls.querySelector('.close');

        minimize.onclick = () => window.style.width = '500px';
        maximize.onclick = () => window.style.width = '700px';
        close.onclick = () => window.style.display = 'none';

        // Bring to front on click
        window.addEventListener('mousedown', () => {
            windows.forEach(w => w.classList.remove('active'));
            window.classList.add('active');
        });

        // Start dragging
        const header = window.querySelector('.window-header');
        header.addEventListener('mousedown', (e) => {
            if (e.target.closest('.controls')) return;
            
            isDragging = true;
            activeWindow = window;
            header.classList.add('grabbing');
            
            const rect = window.getBoundingClientRect();
            initialX = e.clientX - rect.left;
            initialY = e.clientY - rect.top;
        });
    });

    // Handle dragging
    document.addEventListener('mousemove', (e) => {
        if (!activeWindow || !isDragging) return;

        e.preventDefault();
        
        const container = document.querySelector('.projects');
        const containerRect = container.getBoundingClientRect();
        
        // Calculate new position
        currentX = e.clientX - containerRect.left - initialX;
        currentY = e.clientY - containerRect.top - initialY;

        // Get container and window dimensions
        const maxX = container.clientWidth - activeWindow.offsetWidth;
        const maxY = container.clientHeight - activeWindow.offsetHeight;

        // Constrain to container bounds
        currentX = Math.max(0, Math.min(currentX, maxX));
        currentY = Math.max(0, Math.min(currentY, maxY));

        // Update position
        activeWindow.style.left = `${currentX}px`;
        activeWindow.style.top = `${currentY}px`;
    });

    // End dragging
    document.addEventListener('mouseup', () => {
        if (!activeWindow) return;
        
        isDragging = false;
        activeWindow.querySelector('.window-header').classList.remove('grabbing');
        activeWindow = null;
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        windows.forEach(window => {
            const container = document.querySelector('.projects');
            const maxX = container.clientWidth - window.offsetWidth;
            const maxY = container.clientHeight - window.offsetHeight;
            
            // Keep windows in bounds after resize
            const currentLeft = parseInt(window.style.left);
            const currentTop = parseInt(window.style.top);
            
            window.style.left = Math.max(0, Math.min(currentLeft, maxX)) + 'px';
            window.style.top = Math.max(0, Math.min(currentTop, maxY)) + 'px';
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    // Get scroll value
    lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
        console.log({ scroll, limit, velocity, direction, progress });
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    // Integrate with GSAP
    function connectToGSAP() {
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
    }

    // Start the animation
    requestAnimationFrame(raf);
    connectToGSAP();

    // Add smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll('.about-me, .work, .contact');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            let targetId;
            if (link.classList.contains('about-me')) {
                targetId = '.container-about';
            } else if (link.classList.contains('work')) {
                targetId = '.projects';
            } else if (link.classList.contains('contact')) {
                targetId = '.contact';
            }
            
            const target = document.querySelector(targetId);
            if (target) {
                lenis.scrollTo(target, {
                    offset: 0,
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {

class AWaves extends HTMLElement {
    connectedCallback() {
        this.canvas = this.querySelector(".js-canvas");
        this.ctx = this.canvas.getContext("2d");

        this.mouse = { x: -10, y: 0, sx: 0, sy: 0, set: false, v: 0, vs: 0, a: 0 };
        this.lines = [];
        this.noise = new Noise(Math.random());

        this.setSize();
        this.setLines();
        this.bindEvents();

        requestAnimationFrame(this.tick.bind(this));
    }

    bindEvents() {
        window.addEventListener("resize", this.onResize.bind(this));
        window.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.addEventListener("touchmove", this.onTouchMove.bind(this));
    }

    onResize() {
        this.setSize();
        this.setLines();
    }

    onMouseMove(e) {
        this.updateMousePosition(e.pageX, e.pageY);
    }

    onTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this.updateMousePosition(touch.clientX, touch.clientY);
    }

    updateMousePosition(x, y) {
        const { mouse } = this;
        mouse.x = x - this.bounding.left;
        mouse.y = y - this.bounding.top + window.scrollY;
        if (!mouse.set) {
            mouse.sx = mouse.x;
            mouse.sy = mouse.y;
            mouse.set = true;
        }
    }

    setSize() {
        this.bounding = this.getBoundingClientRect();
        this.canvas.width = this.bounding.width;
        this.canvas.height = this.bounding.height;
    }

    setLines() {
        const { width, height } = this.bounding;
        this.lines = [];
        const xGap = 10, yGap = 32;
        const totalLines = Math.ceil((width + 200) / xGap);
        const totalPoints = Math.ceil((height + 30) / yGap);

        for (let i = 0; i <= totalLines; i++) {
            const points = [];
            for (let j = 0; j <= totalPoints; j++) {
                points.push({ x: xGap * i, y: yGap * j, wave: { x: 0, y: 0 }, cursor: { x: 0, y: 0 } });
            }
            this.lines.push(points);
        }
    }

    movePoints(time) {
        const { lines, mouse, noise } = this;
        lines.forEach(points => {
            points.forEach(p => {
                p.wave.x = Math.cos(noise.perlin2((p.x + time * 0.0125) * 0.002, (p.y + time * 0.005) * 0.0015)) * 32;
                p.wave.y = Math.sin(noise.perlin2((p.x + time * 0.0125) * 0.002, (p.y + time * 0.005) * 0.0015)) * 16;

                const dx = p.x - mouse.sx, dy = p.y - mouse.sy, d = Math.hypot(dx, dy), l = Math.max(175, mouse.vs);
                if (d < l) {
                    const s = 1 - d / l, f = Math.cos(d * 0.001) * s;
                    p.cursor.x += Math.cos(mouse.a) * f * l * mouse.vs * 0.00065;
                    p.cursor.y += Math.sin(mouse.a) * f * l * mouse.vs * 0.00065;
                }
            });
        });
    }

    drawLines() {
        const { lines, ctx, bounding } = this;
        ctx.clearRect(0, 0, bounding.width, bounding.height);
        ctx.beginPath();
        ctx.strokeStyle = "black";

        lines.forEach(points => {
            let p1 = this.moved(points[0]);
            ctx.moveTo(p1.x, p1.y);
            points.forEach(p => {
                let p2 = this.moved(p);
                ctx.lineTo(p2.x, p2.y);
            });
        });

        ctx.stroke();
    }

    moved(point) {
        return { x: point.x + point.wave.x + point.cursor.x, y: point.y + point.wave.y + point.cursor.y };
    }

    tick(time) {
        const { mouse } = this;
        mouse.sx += (mouse.x - mouse.sx) * 0.1;
        mouse.sy += (mouse.y - mouse.sy) * 0.1;

        const dx = mouse.x - mouse.sx, dy = mouse.y - mouse.sy;
        mouse.vs += (Math.hypot(dx, dy) - mouse.vs) * 0.1;
        mouse.vs = Math.min(100, mouse.vs);
        mouse.a = Math.atan2(dy, dx);

        this.style.setProperty("--x", `${mouse.sx}px`);
        this.style.setProperty("--y", `${mouse.sy}px`);

        this.movePoints(time);
        this.drawLines();

        requestAnimationFrame(this.tick.bind(this));
    }
}

customElements.define("a-waves", AWaves);

});
