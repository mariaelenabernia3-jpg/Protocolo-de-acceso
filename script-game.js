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
    nextDayBtn: document.getElementById('next-day-btn'),
    tutorialOverlay: document.getElementById('tutorial-overlay'),
    tutorialHighlighter: document.getElementById('tutorial-highlighter'),
    tutorialText: document.getElementById('tutorial-text'),
    tutorialNextBtn: document.getElementById('tutorial-next-btn')
};

let slotId, gameSave, settings, currentApplicant, dayRules, mainTimerInterval, hackTimerInterval;
let timeLeft;
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

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    slotId = parseInt(urlParams.get('slot'), 10);
    if (isNaN(slotId)) { window.location.href = 'index.html'; return; }
    loadSettings(); 
    loadGameSave(); 
    showDailyBriefing();
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
    const totalBills = Object.values(dailyBills).reduce((a, b) => a + b, 0);
    
    elements.billsList.innerHTML = '';
    for (const [key, value] of Object.entries(dailyBills)) {
        elements.billsList.innerHTML += `<li><span>${billNames[settings.lang][key]}:</span> <span>-${value}C</span></li>`;
    }
    
    const totalText = settings.lang === 'es' ? 'GASTOS TOTALES' : 'TOTAL EXPENSES';
    const remainingText = settings.lang === 'es' ? 'TE QUEDAN' : 'REMAINING';
    elements.billsTotal.innerHTML = `${totalText}: <strong>${totalBills}C</strong> --- ${remainingText}: <strong>${gameSave.money - totalBills}C</strong>`;
    
    elements.shopSection.style.display = 'none';
    elements.billsSection.style.display = 'block';
    elements.endOfDayOverlay.style.display = 'flex';
}

elements.payBillsBtn.addEventListener('click', () => {
    const totalBills = Object.values(dailyBills).reduce((a, b) => a + b, 0);
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
    
    for (const id in shopUpgrades) {
        const upgrade = shopUpgrades[id];
        const btn = document.createElement('button');
        btn.className = 'action-button shop-item';
        btn.dataset.id = id;
        
        if (gameSave.upgrades[id]) {
            btn.disabled = true;
            const purchasedText = settings.lang === 'es' ? 'COMPRADO' : 'PURCHASED';
            btn.innerHTML = `${upgrade.name[settings.lang]} <span class="cost">[${purchasedText}]</span>`;
        } else {
            btn.innerHTML = `${upgrade.name[settings.lang]} <span class="cost">${upgrade.cost}C</span>`;
            if (gameSave.money < upgrade.cost) {
                btn.disabled = true;
            }
        }

        btn.addEventListener('click', () => {
            if (gameSave.money >= upgrade.cost && !gameSave.upgrades[id]) {
                gameSave.money -= upgrade.cost;
                gameSave.upgrades[id] = true;
                saveGame();
                populateShop();
            }
        });
        elements.shopItems.appendChild(btn);
    }
}

elements.nextDayBtn.addEventListener('click', () => {
    gameSave.day++;
    saveGame();
    location.reload();
});

function setDayRules() {
    elements.rulesList.innerHTML = '';
    switch (gameSave.day) {
        case 1: dayRules = { allowedCountries: ["Cuba"] }; addRule("Solo se permite acceso a ciudadanos de Cuba."); break;
        case 2: dayRules = { allowedCountries: ["Cuba", "Rusia"], bannedReasons: ["Negocios"] }; addRule("Acceso permitido: Cuba, Rusia."); addRule("Motivo 'Negocios' está denegado."); break;
        case 3: dayRules = { bannedCountries: ["EE.UU."] }; addRule("Denegar todas las solicitudes de EE.UU."); break;
        case 4: dayRules = { requiredReason: "Investigación Académica" }; addRule("Solo se permite el motivo 'Investigación Académica'."); break;
        case 5: dayRules = { bannedCountries: ["EE.UU.", "Rusia"], bannedReasons: ["Negocios", "Turismo"]}; addRule("DENEGAR: EE.UU. y Rusia."); addRule("DENEGAR: 'Negocios' y 'Turismo'."); break;
        default: dayRules = { bannedCountries: ["EE.UU.", "España"]}; addRule("Acceso denegado a: EE.UU., España."); break;
    }
}

function addRule(text) { const li = document.createElement('li'); li.textContent = text; elements.rulesList.appendChild(li); }

function generateApplicant() {
    if (gameSave.day === 3 && !specialApplicantGenerated && applicantsProcessed === 3) {
        specialApplicantGenerated = true;
        return { name: "Javier Rodríguez", country: "EE.UU.", id: `FLG-1337`, reason: "Turismo", balance: 350, hackAttempted: false, responses: { denyCorrect: "Maldición... Me han encontrado." }, isValid: false, isHighValueTarget: true };
    }
    const applicant = { name: names[Math.floor(Math.random() * names.length)], country: countries[Math.floor(Math.random() * countries.length)], id: `VEN-${Math.floor(1000 + Math.random() * 9000)}`, reason: reasons[Math.floor(Math.random() * reasons.length)], balance: Math.floor(Math.random() * 951) + 50, hackAttempted: false, responses: { approveCorrect: "Conexión establecida.", approveIncorrect: "Demasiado fácil.", denyCorrect: "Entendido.", denyIncorrect: "¿Por qué?" } };
    let isValid = true;
    if (dayRules.allowedCountries && !dayRules.allowedCountries.includes(applicant.country)) isValid = false;
    if (dayRules.bannedCountries && dayRules.bannedCountries.includes(applicant.country)) isValid = false;
    if (dayRules.bannedReasons && dayRules.bannedReasons.includes(applicant.reason)) isValid = false;
    if (dayRules.requiredReason && dayRules.requiredReason !== applicant.reason) isValid = false;
    applicant.isValid = isValid;
    applicant.sectTarget = false;
    if (gameSave.day > 1 && Math.random() < 0.3) { 
        applicant.sectTarget = true;
        applicant.sectInstruction = applicant.isValid ? 'deny' : 'approve';
    }
    return applicant;
}

function calculateTotalTime() {
    let time = baseTimePerApplicant;
    if (settings.difficulty === 'short') time *= 0.7;
    if (settings.difficulty === 'long') time *= 1.5;
    if (gameSave.upgrades.timeExtender) time += 5;
    return time;
}

function startTimer(initialTime = null) {
    clearInterval(mainTimerInterval);
    elements.timerBar.classList.remove('low-time');
    const totalTime = calculateTotalTime();
    timeLeft = initialTime !== null ? initialTime : totalTime;
    
    mainTimerInterval = setInterval(() => {
        timeLeft--;
        elements.timerBar.style.width = `${(timeLeft / totalTime) * 100}%`;
        if (timeLeft <= 5) elements.timerBar.classList.add('low-time');
        if (timeLeft <= 0) {
            addCommsLog("Tiempo de respuesta agotado.", "SYSTEM");
            processDecision(false);
        }
    }, 1000);
}

function processDecision(playerApproves) {
    clearInterval(mainTimerInterval);
    let message, feedbackText;
    let correctAccordingToState = playerApproves === currentApplicant.isValid;

    delete gameSave.activeApplicant;
    
    if (currentApplicant.isHighValueTarget && !playerApproves) {
        addCommsLog("Objetivo de alto interés neutralizado. Bonificación acreditada.", "CENTRAL");
        gameSave.money += 50;
    }

    if (currentApplicant.sectTarget) {
        const playerObeyedSect = (playerApproves && currentApplicant.sectInstruction === 'approve') || (!playerApproves && currentApplicant.sectInstruction === 'deny');
        if (playerObeyedSect) {
            addCommsLog("Bien hecho. Transferencia de fondos iniciada.", "TRANSMISIÓN ANÓNIMA", true);
            gameSave.money += 75;
            gameSave.sectAllegiance++;
            showFeedback(true, "ÓRDENES CUMPLIDAS");
        } else {
            addCommsLog("Nos has decepcionado, operador.", "TRANSMISIÓN ANÓNIMA", true);
            gameSave.sectAllegiance--;
            showFeedback(false, "ORDEN IGNORADA");
        }
    }

    if (correctAccordingToState) {
        if (!currentApplicant.sectTarget) {
            let bonus;
            switch(settings.difficulty) {
                case 'short': bonus = 15; break; // Hard
                case 'long': bonus = 8; break;   // Easy
                default: bonus = 10;             // Normal
            }
            if (gameSave.upgrades.payBonus) bonus += 5;
            gameSave.money += bonus;
            feedbackText = "DECISIÓN CORRECTA";
            showFeedback(true, feedbackText);
        }
        message = playerApproves ? currentApplicant.responses.approveCorrect : currentApplicant.responses.denyCorrect;
    } else {
        gameSave.money -= 25;
        feedbackText = playerApproves ? "BRECHA DE SEGURIDAD" : "BLOQUEO INCORRECTO";
        showFeedback(false, feedbackText);
        message = playerApproves ? currentApplicant.responses.approveIncorrect : currentApplicant.responses.denyIncorrect;
    }
    
    saveGame();
    addCommsLog(message, currentApplicant.name);
    setTimeout(nextApplicant, 2500);
}

function startHackMinigame() {
    elements.approveBtn.disabled = true;
    elements.denyBtn.disabled = true;
    const sequence = Array(8).fill(0).map(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 36)]).join('');
    elements.hackSequence.textContent = sequence;
    elements.hackInput.value = '';
    elements.hackMinigame.style.display = 'flex';
    elements.hackInput.focus();
    
    let hackTime;
    switch(settings.difficulty) {
        case 'short': hackTime = 5; break; // Hard
        case 'long': hackTime = 10; break;  // Easy
        default: hackTime = 7;              // Normal
    }
    if (gameSave.upgrades.hackHelper) hackTime += 3;

    elements.hackTimer.style.transition = `width ${hackTime}s linear`;
    elements.hackTimer.style.width = '100%';
    setTimeout(() => { elements.hackTimer.style.width = '0%'; }, 100);
    
    hackTimerInterval = setTimeout(() => processHackResult(false), hackTime * 1000);
    elements.hackInput.oninput = () => { if (elements.hackInput.value.toUpperCase() === sequence) { processHackResult(true); } };
}

function processHackResult(success) {
    clearTimeout(hackTimerInterval);
    currentApplicant.hackAttempted = true;
    gameSave.activeApplicant.data.hackAttempted = true;
    saveGame();
    elements.hackMinigame.style.display = 'none';
    let message;
    if (success) {
        const stolen = Math.floor(currentApplicant.balance * 0.30);
        gameSave.money += stolen;
        message = `HACKEO EXITOSO. +${stolen} créditos transferidos.`;
        showFeedback(true, "ÉXITO");
    } else {
        gameSave.money -= 50;
        message = `HACKEO FALLIDO. Actividad sospechosa detectada. Multa de 50 créditos impuesta.`;
        showFeedback(false, "FALLO");
    }
    addCommsLog(message);
    updateUI();
    elements.approveBtn.disabled = false;
    elements.denyBtn.disabled = false;
}

elements.approveBtn.addEventListener('click', () => processDecision(true));
elements.denyBtn.addEventListener('click', () => processDecision(false));
elements.hackBtn.addEventListener('click', startHackMinigame);

function updateUI() {
    elements.dayCounter.textContent = `DÍA: ${gameSave.day}`;
    elements.moneyCounter.textContent = `CRÉDITOS: ${gameSave.money}`;
    elements.applicantCounter.textContent = `SOLICITUD: ${applicantsProcessed} / ${dailyGoal}`;
    if (currentApplicant) {
        elements.applicantName.textContent = currentApplicant.name;
        elements.applicantCountry.textContent = currentApplicant.country;
        elements.applicantId.textContent = currentApplicant.id;
        elements.applicantReason.textContent = currentApplicant.reason;
        elements.applicantBalance.textContent = currentApplicant.balance;
        elements.hackBtn.disabled = currentApplicant.hackAttempted;
    }
}

function addCommsLog(text, sender = 'SYSTEM', isSect = false) {
    const p = document.createElement('p');
    p.textContent = sender === 'SYSTEM' ? `> ${text}` : `> [${sender}]: ${text}`;
    if (isSect) { p.classList.add('sect-message'); }
    elements.commsLog.insertBefore(p, elements.commsLog.firstChild);
    elements.commsLog.scrollTop = 0;
}

function showFeedback(isCorrect, customHtml = '', isFinal = false) {
    elements.feedbackOverlay.classList.remove('correct', 'incorrect');
    elements.feedbackOverlay.innerHTML = customHtml;
    elements.feedbackOverlay.classList.add(isCorrect ? 'correct' : 'incorrect');
    elements.feedbackOverlayContainer.style.display = 'flex';
    const duration = isFinal ? 9500 : 2500;
    if (!isFinal) {
        setTimeout(() => elements.feedbackOverlayContainer.style.display = 'none', duration);
    }
}

function endGame() {
    let endTitle = ""; 
    let endMessage = "";
    let trophyId = "";

    if (gameSave.sectAllegiance > 3 && gameSave.money > 200) {
        endTitle = "AGENTE DE LA SOMBRA"; endMessage = "Has servido bien a La Red Invisible. Tu lealtad y eficacia te han ganado un lugar en el círculo interno. El verdadero trabajo comienza ahora.";
        trophyId = "shadow-agent";
    } else if (gameSave.sectAllegiance < -2 && gameSave.money > 250) {
        endTitle = "OPERADOR LEAL"; endMessage = "Tu dedicación al Estado no ha pasado desapercibida. Has sido ascendido a un puesto de mayor responsabilidad. La soberanía digital está a salvo gracias a ti.";
        trophyId = "loyal-operator";
    } else if (gameSave.sectAllegiance > 2 && gameSave.money <= 100) {
        endTitle = "MÁRTIR PRESCINDIBLE"; endMessage = "Seguiste sus órdenes, pero tus errores te hicieron un lastre. La Red te ha abandonado y el Estado ha descubierto tu traición. Tu terminal ha sido desconectada... permanentemente.";
        trophyId = "expendable-martyr";
    } else {
        endTitle = "RECURSO AGOTADO"; endMessage = "Tu rendimiento ha sido mediocre. No has demostrado lealtad ni competencia. El Proyecto 'Ventana Digital' ha prescindido de tus servicios. Estás despedido.";
        trophyId = "depleted-resource";
    }

    const savedTrophies = JSON.parse(localStorage.getItem('protocoloAccesoTrophies')) || {};
    savedTrophies[trophyId] = true;
    if (settings.difficulty === 'short') {
        savedTrophies['master-operator'] = true;
    }
    localStorage.setItem('protocoloAccesoTrophies', JSON.stringify(savedTrophies));

    showFeedback(true, `FIN DE LA ASIGNACIÓN<br><br><small style="font-size: 3rem;">${endTitle}</small><br><p style="font-size: 1.5rem; max-width: 800px; margin: auto;">${endMessage}</p>`, true);
    
    const savedData = localStorage.getItem('protocoloAccesoGameSaves');
    let gameSaves = savedData ? JSON.parse(savedData) : [null, null, null];
    gameSaves[slotId] = null;
    localStorage.setItem('protocoloAccesoGameSaves', JSON.stringify(gameSaves));
    setTimeout(() => window.location.href = 'index.html', 12000);
}