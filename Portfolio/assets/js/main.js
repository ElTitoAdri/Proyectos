// Translations Data
const translations = {
    es: {
        nav: {
            home: "Inicio",
            about: "Sobre Mí",
            skills: "Habilidades",
            projects: "Proyectos",
            contact: "Contacto"
        },
        hero: {
            greeting: "Hola, soy",
            role: "Estudiante de Desarrollo Web",
            description: "Transformando ideas en realidad digital."
        },
        about: {
            title: "Sobre Mí",
            text: "Soy un estudiante apasionado por el desarrollo de software, fascinado por la capacidad de crear soluciones innovadoras desde cero. Actualmente, curso el segundo año del Grado Superior en Desarrollo de Aplicaciones Web (DAW) en el Instituto FOC. Me motiva el desafío constante de aprender nuevas tecnologías y transformar ideas abstractas en código funcional y eficiente."
        },
        education: {
            title: "Estudios",
            degree: "Grado Superior en Desarrollo de Aplicaciones Web (DAW)",
            school: "Instituto FOC, Maracena",
            status: "Actualmente cursando el segundo año"
        },
        skills: {
            title: "Habilidades",
            languages: "Lenguajes",
            frameworks: "Frameworks y Librerías",
            tools: "Herramientas",
            databases: "Base de Datos",
            os: "Sistemas Operativos"
        },
        projects: {
            title: "Proyectos",
            status: "En Construcción",
            desc: "Pronto verás aquí mis mejores trabajos."
        },
        contact: {
            title: "Contacto",
            text: "¿Tienes un proyecto en mente o quieres charlar? ¡Contáctame!",
            name: "Nombre",
            email: "Correo Electrónico",
            message: "Mensaje",
            send: "Enviar Mensaje",
            namePlaceholder: "Ej: Juan Pérez",
            emailPlaceholder: "tucorreo@ejemplo.com (para responderte)",
            msgPlaceholder: "Cuéntame tu idea..."
        }
    },
    en: {
        nav: {
            home: "Home",
            about: "About Me",
            skills: "Skills",
            projects: "Projects",
            contact: "Contact"
        },
        hero: {
            greeting: "Hello, I'm",
            role: "Web Development Student",
            description: "Turning ideas into digital reality."
        },
        about: {
            title: "About Me",
            text: "I am a student passionate about software development, fascinated by the ability to create innovative solutions from scratch. I am currently studying my second year of the Higher Degree in Web Application Development (DAW) at Instituto FOC. I am driven by the constant challenge of learning new technologies and transforming abstract ideas into functional and efficient code."
        },
        education: {
            title: "Education",
            degree: "Higher Degree in Web Application Development (DAW)",
            school: "Instituto FOC, Maracena",
            status: "Currently studying the second year"
        },
        skills: {
            title: "Skills",
            languages: "Languages",
            frameworks: "Frameworks & Libraries",
            tools: "Tools",
            databases: "Databases",
            os: "Operating Systems"
        },
        projects: {
            title: "Projects",
            status: "Under Construction",
            desc: "Soon you will see my best work here."
        },
        contact: {
            title: "Contact",
            text: "Have a project in mind or just want to chat? Get in touch!",
            name: "Name",
            email: "Email",
            message: "Message",
            send: "Send Message",
            namePlaceholder: "Ex: John Doe",
            emailPlaceholder: "youremail@example.com (to reply back)",
            msgPlaceholder: "Tell me about your idea..."
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check local storage for theme
    let currentTheme = 'dark-mode'; // Default
    try {
        currentTheme = localStorage.getItem('theme') || '';
    } catch (e) {
        console.warn('LocalStorage access denied or failed', e);
    }

    if (currentTheme) {
        body.classList.add(currentTheme);
        updateThemeIcon(currentTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const theme = body.classList.contains('light-mode') ? 'light-mode' : '';
            try {
                localStorage.setItem('theme', theme);
            } catch (e) { console.warn('LocalStorage failed', e); }
            updateThemeIcon(theme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'light-mode') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // Language Toggle
    const langToggleBtn = document.getElementById('lang-toggle');
    let currentLang = 'es';
    try {
        currentLang = localStorage.getItem('lang') || 'es';
    } catch (e) { console.warn('LocalStorage failed', e); }

    setLanguage(currentLang);

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            try {
                localStorage.setItem('lang', currentLang);
            } catch (e) { console.warn('LocalStorage failed', e); }
            setLanguage(currentLang);
        });
    }

    function setLanguage(lang) {
        if (langToggleBtn) langToggleBtn.textContent = lang === 'es' ? 'EN' : 'ES'; // Show button to switch TO the other lang

        // Translate text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const keys = element.getAttribute('data-i18n').split('.');
            let value = translations[lang];
            keys.forEach(key => {
                if (value) value = value[key];
            });
            if (value) element.textContent = value;
        });

        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const keys = element.getAttribute('data-i18n-placeholder').split('.');
            let value = translations[lang];
            keys.forEach(key => {
                if (value) value = value[key];
            });
            if (value) element.placeholder = value;
        });
    }

    // Intersection Observer for Fade-in animations
    // Safe fallback: if IntersectionObserver not supported, just show everything
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1 // Lower threshold to trigger earlier
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stop observing once visible to save resources
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for very old browsers
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }
});
