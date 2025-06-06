document.addEventListener('DOMContentLoaded', () => {
    updateDateTime();
    
    setInterval(updateDateTime, 100000);
    
    function updateDateTime() {
        const now = new Date();
        const day = now.getDay();
        const date = now.getDate();
        const month = now.getMonth();
        const year = now.getFullYear().toString().slice(-2);
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let dayName;
        switch (day) {
            case 0: dayName = 'SUNDAY'; break;
            case 1: dayName = 'MONDAY'; break;
            case 2: dayName = 'TUESDAY'; break;
            case 3: dayName = 'WEDNESDAY'; break;
            case 4: dayName = 'THURSDAY'; break;
            case 5: dayName = 'FRIDAY'; break;
            case 6: dayName = 'SATURDAY'; break;
        }

        const monthNumber = (month + 1).toString().padStart(2, '0');

        document.querySelector('.data-day').innerHTML = dayName;
        document.querySelector('.data-date').innerHTML = `${date} / ${monthNumber} / ${year}`;
        document.querySelector('.data-time').innerHTML = time;
        
        const greeting = document.querySelector('.intro-heading');
        const hour = now.getHours();
        
        // Theme basierend auf Uhrzeit wechseln
        switchMode(hour);

        // Using hour number is more reliable than comparing time strings
        if (hour >= 6 && hour < 12) {
            greeting.innerHTML = 'Good Morning!';
        } else if (hour >= 12 && hour < 18) {
            greeting.innerHTML = 'Good Afternoon!';
        } else if (hour >= 18 && hour < 24) {
            greeting.innerHTML = 'Good Evening!';
        } else {
            greeting.innerHTML = 'Good Night!';
        }
    }

    const advisorButton = document.querySelector('.advisor-button');

    if(advisorButton){
        const advisor = document.querySelector('.advisor-banner');
        if(localStorage.getItem('advisorDismissed') === 'true'){
            advisor.style.display = 'none';
        }
        else {
            advisorButton.addEventListener('click', () => {
                localStorage.setItem('advisorDismissed', 'true');
                advisor.style.animation = 'drop-down 2s forwards';

                advisor.addEventListener('animationend', () => {
                    advisor.style.display = 'none';
                }, { once: true })
            })
        }
    }
});

function switchMode(hour) {

    const themes = {
        default: {
            '--background-color': '#E5E0CE',
            '--text-color': '#D38D51',
            '--chapter-color': '#ded2ba',
            '--menu-entry-color': '#dcb78f'
        },
        night: {
            '--background-color': '#394770',
            '--text-color': '#808CB1',
            '--chapter-color': '#5f6a8b',
            '--menu-entry-color': '#9ca3b7'
        }
    };
    
    let selectedTheme;
    
    if (hour >= 18 || hour < 6) {
        selectedTheme = themes.night;
        const entries = document.querySelectorAll('.menu-entry a')
        entries.forEach(entry => {
            entry.addEventListener('mouseenter', () => {
                entry.style.color = 'white';
            });
            entry.addEventListener('mouseleave', () => {
                entry.style.color = '';
            });
        });
    } else {
        selectedTheme = themes.default;
    }
    
    // Theme anwenden
    const root = document.documentElement;
    Object.entries(selectedTheme).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });
}