// --- GESTOR DE AUDIO MEJORADO CON MÚSICA ---
const AudioManager = {
    sounds: {},
    music: null,
    settings: null,
    init(settings) {
        this.settings = settings;
        this.sounds = {
            'click': new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YUIAAABvT1/y/4b/c/yI/TT/ev6L/I39vP6D/En8V/sV/Nf9iP+m//8A/3A='),
            'confirm': new Audio('data:audio/wav;base64,UklGRiYBAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQBAADBDv8KMw0/D0cSWxJvF/QZ+hqIG/scBx6eH2sgliNsI/sk/iXhKE8pAyoEKwAtxy7IL+cwWDNsNCY1TjXUNuA3JDkQOww8CT0APwBBf0K4Q/hElEUwRowlDwc='),
        };
        // --- LÍNEA MODIFICADA: Ahora carga tu archivo MP3 local ---
        this.music = new Audio('misterio-dan-barracuda-main-version-35867-02-01.mp3');
        this.music.loop = true;
        this.updateVolume();
    },
    play(soundName) {
        if (this.sounds[soundName] && this.settings.sfxVol > 0) {
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play().catch(e => {});
        }
    },
    startMusic() {
        if (this.music && this.settings.masterVol > 0 && this.music.paused) {
            this.music.play().catch(e => {});
        }
    },
    stopMusic() {
        if (this.music) {
            this.music.pause();
            this.music.currentTime = 0;
        }
    },
    updateVolume() {
        if (!this.settings) return;
        for (const key in this.sounds) {
            this.sounds[key].volume = (this.settings.masterVol / 10) * (this.settings.sfxVol / 10);
        }
        if (this.music) {
            this.music.volume = this.settings.masterVol / 10;
            if (this.settings.masterVol === 0) {
                this.music.pause();
            } else {
                if (!document.hidden) {
                    this.startMusic();
                }
            }
        }
    }
};
// --- El resto del archivo permanece igual ---
const langStrings = {
    'es': {
        loading: "CARGANDO...", gameTitle: "Protocolo de Acceso", newGame: "Nueva Partida", options: "Configuración", credits: "Créditos", trophies: "Trofeos",
        creditsTitle: "Créditos", creator: "Creador:", back: "Volver",
        optionsTitle: "Configuración de Terminal", audio: "Audio", masterVolume: "Volumen General",
        sfxVolume: "Volumen SFX", video: "Video", fullscreen: "Pantalla Completa",
        crtFilter: "Filtro Monitor CRT", colorPalette: "Paleta de Colores", reduceAnimation: "Reducir Animación",
        accessibility: "Accesibilidad y Juego", language: "Idioma", dayDuration: "Duración del Día",
        difficultyDescShort: "DIFÍCIL: Menos tiempo y mayor presión. Recompensas aumentadas.",
        difficultyDescNormal: "NORMAL: La experiencia de juego estándar.",
        difficultyDescLong: "FÁCIL: Más tiempo para revisar con calma. Recompensas reducidas.",
        resetProgress: "Reiniciar Progreso", save: "Guardar", saved: "¡Guardado!",
        resetConfirm: "¿Estás seguro? Se borrará todo tu progreso de forma permanente.",
        translationCredit: "Traducción: ChatGPT", fullscreenNote: "(No recomendable para celular)",
        selectSlot: "Seleccionar Ranura", slot: "RANURA", emptySlot: "[ VACÍA ]", day: "Día",
        tutorialPrompt: "¿Iniciar partida con tutorial?", yes: "Sí", no: "No", cancel: "Cancelar",
        loadGameConfirm: "¿Cargar partida guardada?",
        trophiesTitle: "Sala de Trofeos",
        trophy_shadow_agent_name: "Agente de la Sombra", trophy_shadow_agent_desc: "Alcanza el círculo interno de La Red Invisible.",
        trophy_loyal_operator_name: "Operador Leal", trophy_loyal_operator_desc: "Demuestra una lealtad inquebrantable al Estado.",
        trophy_expendable_martyr_name: "Mártir Prescindible", trophy_expendable_martyr_desc: "Traiciona al Estado y sé abandonado por tus nuevos amos.",
        trophy_depleted_resource_name: "Recurso Agotado", trophy_depleted_resource_desc: "Fracasa en demostrar tu valía tanto para el Estado como para La Red.",
        trophy_master_operator_name: "Maestro Operador", trophy_master_operator_desc: "Completa el juego en la dificultad más alta.",
        trophy_locked_name: "???", trophy_locked_desc: "Sigue jugando para desbloquear este final."
    },
    'en': {
        loading: "LOADING...", gameTitle: "Access Protocol", newGame: "New Game", options: "Settings", credits: "Credits", trophies: "Trophies",
        creditsTitle: "Credits", creator: "Creator:", back: "Back",
        optionsTitle: "Terminal Configuration", audio: "Audio", masterVolume: "Master Volume",
        sfxVolume: "SFX Volume", video: "Video", fullscreen: "Fullscreen",
        crtFilter: "CRT Monitor Filter", colorPalette: "Color Palette", reduceAnimation: "Reduce Animation",
        accessibility: "Accessibility & Game", language: "Language", dayDuration: "Day Duration",
        difficultyDescShort: "HARD: Less time and higher pressure. Increased rewards.",
        difficultyDescNormal: "NORMAL: The standard gameplay experience.",
        difficultyDescLong: "EASY: More time to calmly review documents. Reduced rewards.",
        resetProgress: "Reset Progress", save: "Save", saved: "Saved!",
        resetConfirm: "Are you sure? All your progress will be permanently deleted.",
        translationCredit: "Translation: ChatGPT", fullscreenNote: "(Not recommended for mobile)",
        selectSlot: "Select Slot", slot: "SLOT", emptySlot: "[ EMPTY ]", day: "Day",
        tutorialPrompt: "Start game with tutorial?", yes: "Yes", no: "No", cancel: "Cancel",
        loadGameConfirm: "Load saved game?",
        trophiesTitle: "Trophy Room",
        trophy_shadow_agent_name: "Shadow Agent", trophy_shadow_agent_desc: "Reach the inner circle of The Invisible Network.",
        trophy_loyal_operator_name: "Loyal Operator", trophy_loyal_operator_desc: "Show unwavering loyalty to the State.",
        trophy_expendable_martyr_name: "Expendable Martyr", trophy_expendable_martyr_desc: "Betray the State and be abandoned by your new masters.",
        trophy_depleted_resource_name: "Depleted Resource", trophy_depleted_resource_desc: "Fail to prove your worth to either the State or the Network.",
        trophy_master_operator_name: "Master Operator", trophy_master_operator_desc: "Complete the game on the highest difficulty.",
        trophy_locked_name: "???", trophy_locked_desc: "Keep playing to unlock this ending."
    }
};
const trophies = ['shadow-agent', 'loyal-operator', 'expendable-martyr', 'depleted-resource', 'master-operator'];
let settings = { lang: 'es', masterVol: 8, sfxVol: 10, fullscreen: false, crt: true, theme: 'green', animation: true, difficulty: 'normal' };
let gameSaves = [null, null, null];
let selectedSlotId = null;
const themes = ['green', 'amber', 'blue'];
const difficulties = ['short', 'normal', 'long'];
const languages = ['es', 'en'];
const body = document.body;
const allScreens = document.querySelectorAll('.screen');
const loadingScreen = document.getElementById('loading-screen');
const mainMenuScreen = document.getElementById('main-menu-screen');
const newGameScreen = document.getElementById('new-game-screen');
const creditsScreen = document.getElementById('credits-screen');
const optionsScreen = document.getElementById('options-screen');
const trophiesScreen = document.getElementById('trophies-screen');
const tutorialPrompt = document.getElementById('tutorial-prompt');
const trophiesContainer = document.getElementById('trophies-container');
const goToScreen = (screen) => { allScreens.forEach(s => s.classList.remove('active')); screen.classList.add('active'); };
document.querySelectorAll('.menu-button, .slot, .control-button, .toggle-value').forEach(btn => {
    btn.addEventListener('click', () => AudioManager.play('click'));
});
document.getElementById('new-game-btn').addEventListener('click', () => { loadGameSaves(); goToScreen(newGameScreen); });
document.getElementById('options-btn').addEventListener('click', () => goToScreen(optionsScreen));
document.getElementById('credits-btn').addEventListener('click', () => goToScreen(creditsScreen));
document.getElementById('trophies-btn').addEventListener('click', () => { displayTrophies(); goToScreen(trophiesScreen); });
document.getElementById('back-from-new-game-btn').addEventListener('click', () => goToScreen(mainMenuScreen));
document.getElementById('back-from-credits-btn').addEventListener('click', () => goToScreen(mainMenuScreen));
document.getElementById('back-from-trophies-btn').addEventListener('click', () => goToScreen(mainMenuScreen));
document.getElementById('back-from-options-btn').addEventListener('click', () => { loadSettings(); goToScreen(mainMenuScreen); });
const loadGameSaves = () => {
    const savedData = localStorage.getItem('protocoloAccesoGameSaves');
    gameSaves = savedData ? JSON.parse(savedData) : [null, null, null];
    document.querySelectorAll('.slot').forEach((slotButton, index) => {
        const slotData = gameSaves[index];
        const statusEl = slotButton.querySelector('.slot-status');
        slotButton.classList.toggle('slot-empty', !slotData);
        statusEl.textContent = slotData ? `${langStrings[settings.lang].day}: ${slotData.day}` : langStrings[settings.lang].emptySlot;
    });
};
const displayTrophies = () => {
    const unlockedTrophies = JSON.parse(localStorage.getItem('protocoloAccesoTrophies')) || {};
    trophiesContainer.innerHTML = '';
    trophies.forEach(trophyId => {
        const isUnlocked = unlockedTrophies[trophyId];
        const trophyDiv = document.createElement('div');
        trophyDiv.className = 'trophy-item';
        if (!isUnlocked) trophyDiv.classList.add('locked');
        const trophyTitle = document.createElement('h3');
        trophyTitle.className = 'trophy-title';
        const trophyDesc = document.createElement('p');
        trophyDesc.className = 'trophy-desc';
        const nameKey = isUnlocked ? `trophy_${trophyId.replace(/-/g, '_')}_name` : 'trophy_locked_name';
        const descKey = isUnlocked ? `trophy_${trophyId.replace(/-/g, '_')}_desc` : 'trophy_locked_desc';
        trophyTitle.textContent = langStrings[settings.lang][nameKey];
        trophyDesc.textContent = langStrings[settings.lang][descKey];
        trophyDiv.appendChild(trophyTitle);
        trophyDiv.appendChild(trophyDesc);
        trophiesContainer.appendChild(trophyDiv);
    });
};
const showTutorialPrompt = () => tutorialPrompt.classList.add('active');
const hideTutorialPrompt = () => tutorialPrompt.classList.remove('active');
document.querySelector('.slots-container').addEventListener('click', (e) => {
    const slotButton = e.target.closest('.slot');
    if (!slotButton) return;
    selectedSlotId = parseInt(slotButton.dataset.slotId, 10);
    if (gameSaves[selectedSlotId]) {
        if (confirm(langStrings[settings.lang].loadGameConfirm)) {
            AudioManager.play('confirm');
            window.location.href = `lore.html?slot=${selectedSlotId}`;
        }
    } else {
        showTutorialPrompt();
    }
});
document.getElementById('tutorial-yes').addEventListener('click', () => {
    hideTutorialPrompt();
    AudioManager.play('confirm');
    window.location.href = `lore.html?slot=${selectedSlotId}&newGame=true&tutorial=true`;
});
document.getElementById('tutorial-no').addEventListener('click', () => {
    hideTutorialPrompt();
    AudioManager.play('confirm');
    window.location.href = `lore.html?slot=${selectedSlotId}&newGame=true&tutorial=false`;
});
document.getElementById('tutorial-cancel').addEventListener('click', hideTutorialPrompt);
const updateUIandAudio = () => {
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if(langStrings[settings.lang][key]) {
            let text = langStrings[settings.lang][key];
            if (el.dataset.langVar) { text += ` ${el.dataset.langVar}`; }
            el.textContent = text;
        }
    });
    loadGameSaves(); 
    body.className = '';
    if (settings.crt) body.classList.add('crt-effect');
    if (!settings.animation) body.classList.add('no-animation');
    body.classList.add(`theme-${settings.theme}`);
    document.getElementById('master-vol-bar').textContent = '█'.repeat(settings.masterVol) + '░'.repeat(10 - settings.masterVol);
    document.getElementById('sfx-vol-bar').textContent = '█'.repeat(settings.sfxVol) + '░'.repeat(10 - settings.sfxVol);
    if(settings.difficulty === 'short') document.getElementById('difficulty-desc').textContent = langStrings[settings.lang].difficultyDescShort;
    else if(settings.difficulty === 'normal') document.getElementById('difficulty-desc').textContent = langStrings[settings.lang].difficultyDescNormal;
    else document.getElementById('difficulty-desc').textContent = langStrings[settings.lang].difficultyDescLong;
    document.getElementById('fullscreen-toggle').textContent = `[ ${settings.fullscreen ? 'ON' : 'OFF'} ]`;
    document.getElementById('crt-toggle').textContent = `[ ${settings.crt ? 'ON' : 'OFF'} ]`;
    document.getElementById('theme-toggle').textContent = `[ ${settings.theme.charAt(0).toUpperCase() + settings.theme.slice(1)} ]`;
    document.getElementById('animation-toggle').textContent = `[ ${settings.animation ? 'ON' : 'OFF'} ]`;
    document.getElementById('lang-toggle').textContent = `[ ${settings.lang === 'es' ? 'Español' : 'English'} ]`;
    const difficultyMap = { short: (settings.lang === 'es' ? 'Difícil' : 'Hard'), normal: 'Normal', long: (settings.lang === 'es' ? 'Fácil' : 'Easy') };
    document.getElementById('difficulty-toggle').textContent = `[ ${difficultyMap[settings.difficulty]} ]`;
    AudioManager.updateVolume();
};
const loadSettings = () => { const saved = localStorage.getItem('protocoloAccesoSettings'); if(saved) { settings = JSON.parse(saved); } updateUIandAudio(); };
const saveSettings = () => { localStorage.setItem('protocoloAccesoSettings', JSON.stringify(settings)); document.getElementById('save-status').style.opacity = '1'; setTimeout(() => { document.getElementById('save-status').style.opacity = '0'; }, 2000); AudioManager.play('confirm'); };
document.getElementById('save-btn').addEventListener('click', saveSettings);
document.getElementById('reset-progress').addEventListener('click', () => { if(confirm(langStrings[settings.lang].resetConfirm)) { localStorage.removeItem('protocoloAccesoGameSaves'); localStorage.removeItem('protocoloAccesoTrophies'); loadGameSaves();} });
const elem = document.documentElement;
document.addEventListener('fullscreenchange', () => { settings.fullscreen = !!document.fullscreenElement; updateUIandAudio(); });
document.getElementById('fullscreen-toggle').addEventListener('click', () => { if (!!document.fullscreenElement) { if(document.exitFullscreen) document.exitFullscreen(); } else { if(elem.requestFullscreen) elem.requestFullscreen(); } });
document.getElementById('master-vol-minus').addEventListener('click', () => { if(settings.masterVol > 0) settings.masterVol--; updateUIandAudio(); });
document.getElementById('master-vol-plus').addEventListener('click', () => { if(settings.masterVol < 10) settings.masterVol++; updateUIandAudio(); });
document.getElementById('sfx-vol-minus').addEventListener('click', () => { if(settings.sfxVol > 0) settings.sfxVol--; updateUIandAudio(); });
document.getElementById('sfx-vol-plus').addEventListener('click', () => { if(settings.sfxVol < 10) settings.sfxVol++; updateUIandAudio(); });
document.getElementById('crt-toggle').addEventListener('click', () => { settings.crt = !settings.crt; updateUIandAudio(); });
document.getElementById('animation-toggle').addEventListener('click', () => { settings.animation = !settings.animation; updateUIandAudio(); });
document.getElementById('theme-toggle').addEventListener('click', () => { settings.theme = themes[(themes.indexOf(settings.theme) + 1) % themes.length]; updateUIandAudio(); });
document.getElementById('lang-toggle').addEventListener('click', () => { settings.lang = languages[(languages.indexOf(settings.lang) + 1) % languages.length]; updateUIandAudio(); });
document.getElementById('difficulty-toggle').addEventListener('click', () => { settings.difficulty = difficulties[(difficulties.indexOf(settings.difficulty) + 1) % difficulties.length]; updateUIandAudio(); });
window.addEventListener('load', () => {
    loadSettings(); 
    AudioManager.init(settings);
    document.body.addEventListener('click', () => AudioManager.startMusic(), { once: true });
    setTimeout(() => {
        goToScreen(mainMenuScreen);
        document.querySelector('#main-menu-screen header h1').classList.add('start-typing');
    }, 4000);
});