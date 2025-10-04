document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        dayCounter: document.getElementById('day-counter'),
        moneyCounter: document.getElementById('money-counter'),
        applicantCounter: document.getElementById('applicant-counter'),
        rulesList: document.getElementById('rules-list'),
        timerBar: document.getElementById('timer-bar'),
        applicantDataContainer: document.getElementById('applicant-data-container'),
        applicantName: document.getElementById('applicant-name'),
        applicantCountry: document.getElementById('applicant-country'),
        applicantId: document.getElementById('applicant-id'),
        applicantReason: document.getElementById('applicant-reason'),
        applicantBalance: document.getElementById('applicant-balance'),
        approveBtn: document.getElementById('approve-btn'),
        denyBtn: document.getElementById('deny-btn'),
        hackBtn: document.getElementById('hack-btn'),
        feedbackOverlayContainer: document.getElementById('feedback-overlay-container'),
        feedbackOverlay: document.getElementById('feedback-overlay'),
        commsLog: document.getElementById('comms-log'),
        gameContainer: document.querySelector('.game-container'),
        decisionBar: document.querySelector('.decision-bar'),
        hackMinigame: document.getElementById('hack-minigame'),
        hackSequence: document.getElementById('hack-sequence'),
        hackInput: document.getElementById('hack-input'),
        hackTimer: document.getElementById('hack-timer'),
        dailyBriefingOverlay: document.getElementById('daily-briefing-overlay'),
        briefingTitle: document.getElementById('briefing-title'),
        dailyBriefingNews: document.getElementById('daily-briefing-news'),
        startDayBtn: document.getElementById('start-day-btn'),
        endOfDayOverlay: document.getElementById('end-of-day-overlay'),
        billsSection: document.getElementById('bills-section'),
        shopSection: document.getElementById('shop-section'),
        billsList: document.getElementById('bills-list'),
        billsTotal: document.getElementById('bills-total'),
        payBillsBtn: document.getElementById('pay-bills-btn'),
        shopItems: document.getElementById('shop-items'),
        shopMoneyDisplay: document.getElementById('shop-money-display'),
        showLoreBtn: document.getElementById('show-lore-btn'),
        nextDayBtn: document.getElementById('next-day-btn'),
        tutorialOverlay: document.getElementById('tutorial-overlay'),
        tutorialHighlighter: document.getElementById('tutorial-highlighter'),
        tutorialText: document.getElementById('tutorial-text'),
        tutorialNextBtn: document.getElementById('tutorial-next-btn'),
        bootOverlay: document.getElementById('boot-overlay'),
        bootText: document.getElementById('boot-text'),
        passwordMinigameContainer: document.getElementById('password-minigame-container'),
        passwordGrid: document.getElementById('password-grid'),
        passwordInput: document.getElementById('password-input'),
        passwordError: document.getElementById('password-error'),
        loreOverlay: document.getElementById('lore-overlay'),
        loreText: document.getElementById('lore-text')
    };

    let slotId, gameSave, settings, currentApplicant, dayRules, mainTimerInterval, hackTimerInterval;
    let timeLeft, dailyPassword;
    let applicantsProcessed = 0;
    let specialApplicantGenerated = false;
    let tutorialStep = 0;

    const dailyGoal = 5;
    const finalDay = 5;
    const baseTimePerApplicant = 20;

    const names = ["Alejandro Díaz", "Sofía García", "Javier Rodríguez", "Camila Martínez", "Mateo Hernández", "Valentina Pérez"];
    const countries = ["Cuba", "EE.UU.", "Rusia", "España", "México", "Canadá"];
    const reasons = ["Intercambio Cultural", "Negocios", "Turismo", "Investigación Académica", "Contacto Familiar"];

    const newsData = {
        'es': {
            1: { title: "BOLETÍN DÍA 1", items: ["El Estado anuncia una nueva alianza estratégica con Cuba.", "La vigilancia es nuestra primera línea de defensa."] },
            2: { title: "BOLETÍN DÍA 2", items: ["Acuerdo comercial con Rusia abre nuevas oportunidades.", "Denegar el acceso a toda actividad comercial sospechosa."] },
            3: { title: "BOLETÍN DÍA 3", items: ["Tensiones diplomáticas con EE.UU. en su punto más alto.", "**MÁXIMA ALERTA**: Se busca a Javier Rodríguez, agente de desinformación de EE.UU."] },
            4: { title: "BOLETÍN DÍA 4", items: ["Anuncio del 'Proyecto Quásar', una iniciativa científica nacional.", "Cualquier solicitud que no sea de 'Investigación Académica' debe ser bloqueada."] },
            5: { title: "BOLETÍN DÍA 5", items: ["**ALERTA ROJA: PROTOCOLO DE AISLAMIENTO ACTIVADO.**", "Se prohíbe el acceso por motivos de 'Negocios' o 'Turismo' hasta nuevo aviso."] }
        },
        'en': {
            1: { title: "BRIEFING DAY 1", items: ["The State announces a new strategic alliance with Cuba.", "Vigilance is our first line of defense."] },
            2: { title: "BRIEFING DAY 2", items: ["Trade agreement with Russia opens new opportunities.", "Deny access to all suspicious commercial activity."] },
            3: { title: "BRIEFING DAY 3", items: ["Diplomatic tensions with the U.S. at an all-time high.", "**HIGH ALERT**: Wanted: Javier Rodriguez, a U.S. disinformation agent."] },
            4: { title: "BRIEFING DAY 4", items: ["Announcement of 'Project Quasar', a national scientific initiative.", "Any request not for 'Academic Research' must be blocked."] },
            5: { title: "BRIEFING DAY 5", items: ["**RED ALERT: ISOLATION PROTOCOL ACTIVATED.**", "Access for 'Business' or 'Tourism' is prohibited until further notice."] }
        }
    };

    const endOfDayLore = {
        'es': {
            1: "Otro día, otra pila de datos. Al menos el pago ayuda a mantener las luces encendidas. Me pregunto cuántos de los que denegué eran inocentes...",
            2: "La presión aumenta. Cada decisión parece más pesada que la anterior. A veces, por la noche, escucho susurros en la estática... ¿o es solo mi imaginación?",
            3: "Hoy fue intenso. Neutralizar a ese agente me hizo sentir... útil. Pero esa transmisión anónima no deja de inquietarme. ¿Quiénes son? ¿Qué quieren de mí?",
            4: "El Estado y 'La Red'... ambos tiran de los hilos, y yo estoy en medio. Cada crédito que gano se siente manchado. No sé en quién confiar."
        },
        'en': {
            1: "Another day, another pile of data. At least the pay helps keep the lights on. I wonder how many of those I denied were innocent...",
            2: "The pressure is mounting. Every decision feels heavier than the last. Sometimes, at night, I hear whispers in the static... or is it just my imagination?",
            3: "Today was intense. Neutralizing that agent made me feel... useful. But that anonymous transmission keeps unsettling me. Who are they? What do they want from me?",
            4: "The State and 'The Network'... both pulling the strings, and I'm in the middle. Every credit I earn feels tainted. I don't know who to trust."
        }
    };

    const tutorialSteps = [
        { el: 'applicant-data-container', text: { es: 'Aquí aparecen los datos del solicitante. Analízalos cuidadosamente.', en: 'The applicant\'s data appears here. Analyze it carefully.' } },
        { el: 'rules-box', text: { es: 'Estas son tus directivas del día. ¡Debes seguirlas al pie de la letra!', en: 'These are your directives for the day. You must follow them!' } },
        { el: 'timer-box', text: { es: 'Tienes un tiempo limitado para cada decisión. Si se agota, es un error.', en: 'You have limited time for each decision. If it runs out, it\'s a mistake.' } },
        { el: 'stats-box', text: { es: 'Aquí puedes ver tu progreso y tus créditos.', en: 'Here you can see your progress and credits.' } },
        { el: 'decision-bar', text: { es: 'Usa estos botones para decidir. ¡Buena suerte, operador!', en: 'Use these buttons to decide. Good luck, operator!' } }
    ];

    const dailyBills = { rent: 15, food: 10, medicine: 5, utilities: 5 };

    const shopUpgrades = {
        timeExtender: { name: {es: 'Extensor de Tiempo (+5s)', en: 'Time Extender (+5s)'}, cost: 100 },
        payBonus: { name: {es: 'Bonificación por Lealtad (+5C)', en: 'Loyalty Bonus (+5C)'}, cost: 120 },
        hackHelper: { name: {es: 'Software de Hackeo Mejorado', en: 'Improved Hacking Software'}, cost: 150 }
    };

    function getDifficultyMultiplier() {
        switch(settings.difficulty) {
            case 'short': return 1.25; // Hard
            case 'long': return 0.8;   // Easy
            default: return 1.0;       // Normal
        }
    }

    function startBootSequence() {
        elements.bootOverlay.style.display = 'flex';
        const bootLines = [
            "INITIATING BIOS...",
            "MEMORY CHECK: 64KB OK",
            "LOADING OS FROM DISK...",
            "KERNEL V2.3.1 LOADED",
            "MOUNTING FILE SYSTEMS...",
            "STARTING NETWORK SERVICES...",
            "CONNECTION TO STATE_GRID ESTABLISHED.",
            "AWAITING SECURITY CREDENTIALS..."
        ];
        let lineIndex = 0;
        const interval = setInterval(() => {
            if (lineIndex < bootLines.length) {
                const li = document.createElement('li');
                li.textContent = bootLines[lineIndex];
                elements.bootText.appendChild(li);
                lineIndex++;
            } else {
                clearInterval(interval);
                setupPasswordMinigame();
            }
        }, 400);
    }

    function setupPasswordMinigame() {
        dailyPassword = Array(6).fill(0).map(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 36)]).join('');
        const gridChars = Array(100).fill(0).map(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"[Math.floor(Math.random() * 44)]);
        
        let passwordIndices = new Set();
        while (passwordIndices.size < dailyPassword.length) {
            passwordIndices.add(Math.floor(Math.random() * 100));
        }
        
        const indicesArray = Array.from(passwordIndices);
        for (let i = 0; i < dailyPassword.length; i++) {
            gridChars[indicesArray[i]] = dailyPassword[i];
        }
        
        elements.passwordGrid.innerHTML = '';
        gridChars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            if (indicesArray.includes(index)) {
                span.classList.add('password-char');
            }
            elements.passwordGrid.appendChild(span);
        });
        
        elements.passwordMinigameContainer.style.display = 'flex';
        elements.passwordInput.focus();
    }

    elements.passwordInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            if (elements.passwordInput.value.toUpperCase() === dailyPassword) {
                elements.bootOverlay.style.display = 'none';
                showDailyBriefing();
            } else {
                elements.passwordError.style.display = 'block';
                setTimeout(() => { elements.passwordError.style.display = 'none'; }, 2000);
                elements.passwordInput.value = '';
            }
        }
    });


    function loadSettings() {
        const savedSettings = localStorage.getItem('protocoloAccesoSettings');
        settings = savedSettings ? JSON.parse(savedSettings) : { theme: 'green', crt: true, lang: 'es', difficulty: 'normal' };
        document.body.classList.add(`theme-${settings.theme}`);
        if (settings.crt) document.body.classList.add('crt-effect');
    }

    function loadGameSave() {
        const savedData = localStorage.getItem('protocoloAccesoGameSaves');
        const gameSaves = savedData ? JSON.parse(savedData) : [null, null, null];
        gameSave = gameSaves[slotId];
        if (!gameSave.upgrades) { 
            gameSave.upgrades = {}; 
        }
    }

    function saveGame() {
        const savedData = localStorage.getItem('protocoloAccesoGameSaves');
        let gameSaves = savedData ? JSON.parse(savedData) : [null, null, null];
        gameSaves[slotId] = gameSave;
        localStorage.setItem('protocoloAccesoGameSaves', JSON.stringify(gameSaves));
    }

    function showDailyBriefing() {
        const dayNews = newsData[settings.lang][gameSave.day];
        elements.briefingTitle.textContent = dayNews.title;
        elements.dailyBriefingNews.innerHTML = '';
        dayNews.items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            elements.dailyBriefingNews.appendChild(li);
        });
        elements.dailyBriefingOverlay.style.display = 'flex';
    }

    elements.startDayBtn.addEventListener('click', () => {
        elements.dailyBriefingOverlay.style.display = 'none';
        elements.gameContainer.style.visibility = 'visible';
        elements.decisionBar.style.visibility = 'visible';
        
        if (gameSave.activeApplicant) {
            loadActiveApplicant();
        } else {
            startDay();
        }
    });

    function startTutorial() {
        elements.tutorialOverlay.style.display = 'flex';
        tutorialStep = 0;
        showTutorialStep();
    }

    function showTutorialStep() {
        if (tutorialStep >= tutorialSteps.length) {
            elements.tutorialOverlay.style.display = 'none';
            gameSave.tutorial = false;
            saveGame();
            startTimer();
            return;
        }
        const step = tutorialSteps[tutorialStep];
        const targetElement = document.getElementById(step.el) || document.querySelector('.' + step.el);
        
        if(targetElement) {
            const rect = targetElement.getBoundingClientRect();
            elements.tutorialHighlighter.style.top = `${rect.top - 5}px`;
            elements.tutorialHighlighter.style.left = `${rect.left - 5}px`;
            elements.tutorialHighlighter.style.width = `${rect.width + 10}px`;
            elements.tutorialHighlighter.style.height = `${rect.height + 10}px`;
            elements.tutorialText.textContent = step.text[settings.lang];
        }
    }

    elements.tutorialNextBtn.addEventListener('click', () => {
        tutorialStep++;
        showTutorialStep();
    });

    function startDay() {
        applicantsProcessed = gameSave.applicantsProcessed || 0;
        specialApplicantGenerated = false;
        updateUI();
        setDayRules();
        nextApplicant();
    }

    function loadActiveApplicant() {
        currentApplicant = gameSave.activeApplicant.data;
        applicantsProcessed = gameSave.applicantsProcessed || 1;
        const totalTime = calculateTotalTime();
        const startTime = gameSave.activeApplicant.startTime;
        const elapsedTime = (Date.now() - startTime) / 1000;
        const remainingTime = totalTime - elapsedTime;

        updateUI();
        
        if (remainingTime <= 0) {
            addCommsLog("CONEXIÓN PERDIDA... Tiempo de respuesta agotado.", "SYSTEM");
            processDecision(false);
        } else {
            startTimer(remainingTime);
        }
    }

    function nextApplicant() {
        if (applicantsProcessed >= dailyGoal) {
            endDay();
            return;
        }
        applicantsProcessed++;
        gameSave.applicantsProcessed = applicantsProcessed;
        currentApplicant = generateApplicant();

        gameSave.activeApplicant = {
            data: currentApplicant,
            startTime: Date.now()
        };
        saveGame();

        updateUI();
        
        if(currentApplicant.sectTarget){
            const instructionText = currentApplicant.sectInstruction === 'approve' ? 'APRUEBA' : 'DENIEGA';
            addCommsLog(`Operador, el individuo ${currentApplicant.name} es un activo. ${instructionText} su acceso. Ignora el protocolo.`, 'TRANSMISIÓN ANÓNIMA', true);
        }

        elements.applicantDataContainer.style.display = 'none';
        void elements.applicantDataContainer.offsetWidth;
        elements.applicantDataContainer.style.display = 'block';
        
        if (gameSave.day === 1 && gameSave.tutorial) {
            clearInterval(mainTimerInterval);
            startTutorial();
        } else {
            startTimer();
        }
    }

    function endDay() {
        clearInterval(mainTimerInterval);
        elements.approveBtn.disabled = true;
        elements.denyBtn.disabled = true;

        delete gameSave.activeApplicant;
        gameSave.applicantsProcessed = 0;
        saveGame();

        if (gameSave.day >= finalDay) {
            endGame();
            return;
        }
        showEndOfDayScreen();
    }

    function showEndOfDayScreen() {
        const billNames = { es: {rent: "Alquiler", food: "Comida", medicine: "Medicinas", utilities: "Servicios"}, en: {rent: "Rent", food: "Food", medicine: "Medicine", utilities: "Utilities"} };
        const multiplier = getDifficultyMultiplier();
        let totalBills = 0;
        
        elements.billsList.innerHTML = '';
        for (const [key, value] of Object.entries(dailyBills)) {
            const adjustedCost = Math.round(value * multiplier);
            totalBills += adjustedCost;
            elements.billsList.innerHTML += `<li><span>${billNames[settings.lang][key]}:</span> <span>-${adjustedCost}C</span></li>`;
        }
        
        const totalText = settings.lang === 'es' ? 'GASTOS TOTALES' : 'TOTAL EXPENSES';
        const remainingText = settings.lang === 'es' ? 'TE QUEDAN' : 'REMAINING';
        elements.billsTotal.innerHTML = `${totalText}: <strong>${totalBills}C</strong> --- ${remainingText}: <strong>${gameSave.money - totalBills}C</strong>`;
        
        elements.shopSection.style.display = 'none';
        elements.billsSection.style.display = 'block';
        elements.endOfDayOverlay.style.display = 'flex';
    }

    elements.payBillsBtn.addEventListener('click', () => {
        const multiplier = getDifficultyMultiplier();
        const totalBills = Object.values(dailyBills).reduce((acc, val) => acc + Math.round(val * multiplier), 0);
        
        if (gameSave.money < totalBills) {
            const gameOverText = settings.lang === 'es' ? "INSOLVENCIA<br><small>Contrato Terminado</small>" : "INSOLVENCY<br><small>Contract Terminated</small>";
            showFeedback(false, gameOverText, true);
            const savedData = localStorage.getItem('protocoloAccesoGameSaves');
            let gameSaves = savedData ? JSON.parse(savedData) : [null, null, null];
            gameSaves[slotId] = null;
            localStorage.setItem('protocoloAccesoGameSaves', JSON.stringify(gameSaves));
            setTimeout(() => window.location.href = 'index.html', 4000);
        } else {
            gameSave.money -= totalBills;
            elements.billsSection.style.display = 'none';
            elements.shopSection.style.display = 'block';
            populateShop();
        }
    });

    function populateShop() {
        const creditsText = settings.lang === 'es' ? 'Créditos disponibles' : 'Credits available';
        elements.shopMoneyDisplay.innerHTML = `${creditsText}: <strong>${gameSave.money}C</strong>`;
        elements.shopItems.innerHTML = '';
        const multiplier = getDifficultyMultiplier();
        
        for (const id in shopUpgrades) {
            const upgrade = shopUpgrades[id];
            const adjustedCost = Math.round(upgrade.cost * multiplier);
            const btn = document.createElement('button');
            btn.className = 'action-button shop-item';
            btn.dataset.id = id;
            
            if (gameSave.upgrades[id]) {
                btn.disabled = true;
                const purchasedTe
