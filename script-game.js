// --- GESTOR DE AUDIO MEJORADO CON MÚSICA ---
const AudioManager = {
    sounds: {}, music: null, settings: null,
    init(settings) {
        this.settings = settings;
        this.sounds = {
            'approve': new Audio('data:audio/wav;base64,UklGRiABAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YVwBAADs/f/9/v4A/f75/Of4x/Sp8yDzA/Ju72XsoOzv6DXpDOgE5gbl/uTo5kTlUuQi4wXg/+AP4EbgAuGE3wDcEtv82p7aR9hC1yvWodNt0vTQbtGf0JzPDs9Uz1TPUM9FzwvMAstXywvKmsnNyLbHvsT7xG/ERcMLwz/Bm8BfwFbAW8AewGvAVMBowFXAYMCOwGDAZcB8wGDAecB+wH/AgcB9wIHAgsC+wJrAfsCfgH5AnkB9wJ2AfsCewHxAnAB9gJvAfsCgAH6An4B+gKAAf0ChAH7AosB/QKcAf4CowD/ApYB/wKgAP8CmwD/AqAA/wKiAP8CsgD/ArgA/wLKAP8C2gD/Av4A/wMkAf8DEQD/Ax0A/wMlAP8DLQD/AzIA/wM7AP8DQAD/A0cA/wNMAP8DTQD/A1EA/wNfAP8DaAD/A2kA/wNsAP8DcwD/A3YA/wN6AP8DgQD/A4UA/wOHAP8DiwD/A5AA/wOXAP8DogD/A6YA/wOmAP8DqAD/A6wA/wOsAP8DrwD/A7MA/wO5AP8DvwD/A8QA/wPIAP8DzwD/A9IA/wPVAP8D2AD/A9wA/wPhAP8D6AD/A/IA/wP6AP8EAgD/BAUA/wQJAP8EDQD/BBEA/wQWAP8EGgD/BB4A/wQiAP8EJQD/BCgA/wQtAP8EMgD/BDgA/wQ/AP8EQwD/BEgA/wRNAP8EuwD/BA=='),
            'deny': new Audio('data:audio/wav;base64,UklGRjYBAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YSIBAACAgICAgAD+/v4A/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+//////7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+AAAAAAAAAAD+AAAAAP7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+'),
            'error': new Audio('data:audio/wav;base64,UklGRjoBAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YSaAgICA//3/gICA//3/gICA/v3/gICA/v3/gICA/fb/gICA/fb/gID99v+AgP32/4CA/fb/gP32/4D99v+A/fb/gP32/4D99v+A/fb/gP32/4D99v+A/fb/gP32/4D99v+A/fb/gP32/w=='),
            'kaching': new Audio('data:audio/wav;base64,UklGRiYBAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQBAADBDv8KMw0/D0cSWxJvF/QZ+hqIG/scBx6eH2sgliNsI/sk/iXhKE8pAyoEKwAtxy7IL+cwWDNsNCY1TjXUNuA3JDkQOww8CT0APwBBf0K4Q/hElEUwRowlDwc='),
            'click': new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YUIAAABvT1/y/4b/c/yI/TT/ev6L/I39vP6D/En8V/sV/Nf9iP+m//8A/3A='),
            'hack_success': new Audio('data:audio/wav;base64,UklGRiwBAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YRgBAABFC0QWRRlYHIUeBSLUI9cl8ikAKk0szy6LMDcyPjO8Nkc2JjcaODw6Tjx8PKw/RUKvRBJFo0fOSXNLy00+TpxQbFJrVGtXalpwXINeImBEYVBjU2lcbV9tYGxpdXF9d4mBfYKDiIuMkY+Sj5aTmZufoaSmp6irra6us7G+wMPGycjS1NXa3d/i4+Xn6uvt8fP09/r7/P/9AA=='),
            'hack_fail': new Audio('data:audio/wav;base64,UklGRjoBAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YSaAgICA//3/gICA//3/gICA/v3/gICA/v3/gICA/fb/gICA/fb/gID99v+AgP32/4CA/fb/gP32/4D99v+A/fb/gP32/4D99v+A/fb/gP32/4D99v+A/fb/gP32/4D99v+A/fb/gP32/w=='),
        };
        this.music = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjQ1LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAChNYaW5nAP/7UMQCAAIMAC1BTzU0MDVNAgAATEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV-p/u1JgH/9qGIAAADSAAAAQEDAwMFeXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eX-ysrK-ysrKysrK-ysrK-ysrKysrK-ysrK-ysrKysrK-ysrK-ysrKysrK-ysrK-ysrKysrK-ysrK-ysrK-ysrKysrK-ysrK-ysrKysrK-ysrK-ysrK-ysrKysrK-ysrK-ysrK-ysrKysrK-ysrK-ysrKysrK-ysrK-ysrKysrK-ysrK-ysrKysrK-ysrK-ysrKysrK-ysrK-ysrK-ysrKysrK-ysrK-ysrKysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrKysrK-ysrK-ysrKysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrKysrK-ysrK-ysrKysrK-ysrK-ysrK-ysrK-ysrK-ysrKysrK-ysrK-ysrK-ysrKysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrKysrK-ysrK-ysrKysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrKysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrKysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ys-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ys-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ys-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ys-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysrK-ysg=');
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
                if (!this.music.paused || this.music.currentTime > 0) {
                    this.startMusic();
                }
            }
        }
    }
};

const elements = {
    dayCounter: document.getElementById('day-counter'),
    moneyCounter: document.getElementById('money-counter'),
    applicantCounter: document.getElementById('applicant-counter'),
    rulesList: document.getElementById('rules-list'),
    timerBar: document.getElementById('timer-bar'),
    applicantPhoto: document.getElementById('applicant-photo'), // Nuevo
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
    loreSection: document.getElementById('lore-section'),
    loreRevealText: document.getElementById('lore-reveal-text'),
    nextDayBtn: document.getElementById('next-day-btn'),
    storySceneOverlay: document.getElementById('story-scene-overlay'),
    storyCharImg: document.getElementById('story-char-img'),
    storyDialogueText: document.getElementById('story-dialogue-text'),
    storyChoices: document.getElementById('story-choices'),
    tutorialOverlay: document.getElementById('tutorial-overlay'),
    tutorialHighlighter: document.getElementById('tutorial-highlighter'),
    tutorialText: document.getElementById('tutorial-text'),
    tutorialNextBtn: document.getElementById('tutorial-next-btn')
};

let slotId, gameSave, settings, currentApplicant, dayRules, mainTimerInterval, hackTimerInterval;
let timeLeft;
let applicantsProcessed = 0;
let specialApplicantGenerated = false;

// --- CONSTANTES DE JUEGO ---
const dailyGoal = 5;
const finalDay = 5;
const baseTimePerApplicant = 20;

const maleNames = ["Alejandro Díaz", "Javier Rodríguez", "Mateo Hernández", "Carlos López", "Miguel Torres"];
const femaleNames = ["Sofía García", "Camila Martínez", "Valentina Pérez", "Isabella Gómez", "Lucía Fernández"];
const countries = ["Cuba", "EE.UU.", "Rusia", "España", "México", "Canadá"];
const reasons = ["Intercambio Cultural", "Negocios", "Turismo", "Investigación Académica", "Contacto Familiar"];

// --- DATOS NARRATIVOS ---
const storyScenes = {
    1: [{
        character: 'esposa',
        dialogue: "Cariño, ¿cómo ha ido el primer día? Este trabajo... me da mala espina. Ten mucho cuidado.",
        choices: [
            { text: "Tranquila, es solo un trabajo de oficina. Todo irá bien.", effect: { familyRelationship: 1 } },
            { text: "Es más complicado de lo que parece. Pero traeré el dinero a casa.", effect: { familyRelationship: -1 } }
        ]
    }],
    2: [{
        condition: (save) => save.sectAllegiance > 0,
        character: 'jefe_secta',
        dialogue: "Operador. Hemos visto tu... flexibilidad. Hay quienes luchan contra el sistema desde dentro. Considera tu papel en el gran esquema.",
        choices: [
            { text: "No sé de qué me hablas. Solo hago mi trabajo.", effect: { sectAllegiance: -1 } },
            { text: "Escucho. El sistema actual tiene fallos.", effect: { sectAllegiance: 1 } }
        ]
    }, {
        character: 'hijo',
        dialogue: "Papá, en la escuela dicen que tu trabajo es muy importante para proteger el país. ¿Eres un héroe?",
        choices: [
            { text: "Hago lo que es necesario para mantenernos a salvo, campeón.", effect: { familyRelationship: 1 } },
            { text: "Es solo un trabajo, hijo. Los héroes no existen.", effect: { familyRelationship: -1 } }
        ]
    }],
    3: [{
        condition: (save) => save.familyRelationship < -1,
        character: 'esposa',
        dialogue: "He notado que estás más distante... y tenemos menos dinero. ¿Estás seguro de que todo va bien? Podemos arreglárnoslas con menos, tu seguridad es lo primero.",
        choices: [
            { text: "No te preocupes. Solo estoy cansado. Pronto mejoraré.", effect: { familyRelationship: 1 } },
            { text: "¡Estoy haciendo lo que puedo! ¡Esta presión es demasiada!", effect: { familyRelationship: -2 } }
        ]
    }, {
        condition: (save) => save.sectAllegiance > 2,
        character: 'jefe_secta',
        dialogue: "Has demostrado ser un activo valioso. La 'Red Invisible' te recompensa. Sigue nuestras directivas y verás el verdadero poder.",
        choices: [
            { text: "Mi lealtad está con la causa. ¿Cuál es el siguiente paso?", effect: { sectAllegiance: 2 } },
            { text: "Este dinero ayudará... pero no estoy seguro de esto.", effect: { sectAllegiance: -2 } }
        ]
    }]
};
const dailyBills = { rent: 15, food: 10, medicine: 5, utilities: 5 };
const shopUpgrades = {
    timeExtender: { name: {es: 'Extensor de Tiempo (+5s)', en: 'Time Extender (+5s)'}, cost: 100 },
    payBonus: { name: {es: 'Bonificación por Lealtad (+5C)', en: 'Loyalty Bonus (+5C)'}, cost: 120 },
    hackHelper: { name: {es: 'Software de Hackeo Mejorado', en: 'Improved Hacking Software'}, cost: 150 }
};
const newsData = {
    'es': {
        1: { title: "BOLETÍN DÍA 1", items: ["El Estado anuncia una nueva alianza estratégica con Cuba.", "La vigilancia es nuestra primera línea de defensa."] },
        2: { title: "BOLETÍN DÍA 2", items: ["Acuerdo comercial con Rusia abre nuevas oportunidades.", "Denegar el acceso a toda actividad comercial sospechosa."] },
        3: { title: "BOLETÍN DÍA 3", items: ["Tensiones diplomáticas con EE.UU. en su punto más alto.", "**MÁXIMA ALERTA**: Se busca a Javier Rodríguez, agente de desinformación de EE.UU."] },
        4: { title: "BOLETÍN DÍA 4", items: ["Anuncio del 'Proyecto Quásar', una iniciativa científica nacional.", "Cualquier solicitud que no sea de 'Investigación Académica' debe ser bloqueada."] },
        5: { title: "BOLETÍN DÍA 5", items: ["**ALERTA ROJA: PROTOCOLO DE AISLAMIENTO ACTIVADO.**", "Se prohíbe el acceso por motivos de 'Negocios' o 'Turismo' hasta nuevo aviso."] }
    }, 'en': { /* ... */ }
};


// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    slotId = parseInt(urlParams.get('slot'), 10);
    if (isNaN(slotId)) { window.location.href = 'index.html'; return; }
    loadSettings(); 
    loadGameSave();
    AudioManager.init(settings);
    AudioManager.startMusic();
    showDailyBriefing();
});

function loadSettings() {
    const savedSettings = localStorage.getItem('protocoloAccesoSettings');
    settings = savedSettings ? JSON.parse(savedSettings) : { theme: 'green', crt: true, lang: 'es', difficulty: 'normal', masterVol: 8, sfxVol: 10 };
    document.body.classList.add(`theme-${settings.theme}`);
    if (settings.crt) document.body.classList.add('crt-effect');
}

function loadGameSave() {
    const savedData = localStorage.getItem('protocoloAccesoGameSaves');
    const gameSaves = savedData ? JSON.parse(savedData) : [null, null, null];
    gameSave = gameSaves[slotId];
    if (!gameSave.upgrades) gameSave.upgrades = {};
    if (gameSave.familyRelationship === undefined) gameSave.familyRelationship = 0;
}

function saveGame() {
    const savedData = localStorage.getItem('protocoloAccesoGameSaves');
    let gameSaves = savedData ? JSON.parse(savedData) : [null, null, null];
    gameSaves[slotId] = gameSave;
    localStorage.setItem('protocoloAccesoGameSaves', JSON.stringify(gameSaves));
}

// --- FLUJO DEL DÍA ---
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
    AudioManager.play('click');
    elements.dailyBriefingOverlay.style.display = 'none';
    elements.gameContainer.style.visibility = 'visible';
    elements.decisionBar.style.visibility = 'visible';
    startDay();
});

function startDay() {
    applicantsProcessed = 0;
    specialApplicantGenerated = false;
    updateUI();
    setDayRules();
    nextApplicant();
}

function nextApplicant() {
    if (applicantsProcessed >= dailyGoal) {
        endDay();
        return;
    }
    applicantsProcessed++;
    currentApplicant = generateApplicant();
    saveGame(); 
    updateUI();
    
    if(currentApplicant.sectTarget){
        const instructionText = currentApplicant.sectInstruction === 'approve' ? 'APRUEBA' : 'DENIEGA';
        addCommsLog(`Operador, el individuo ${currentApplicant.name} es un activo. ${instructionText} su acceso. Ignora el protocolo.`, 'TRANSMISIÓN ANÓNIMA', true);
    }
    
    elements.applicantDataContainer.style.display = 'none';
    void elements.applicantDataContainer.offsetWidth; 
    elements.applicantDataContainer.style.display = 'block';
    
    startTimer();
}

function endDay() {
    clearInterval(mainTimerInterval);
    elements.approveBtn.disabled = true;
    elements.denyBtn.disabled = true;
    
    if (gameSave.day >= finalDay) {
        endGame();
        return;
    }
    triggerStoryScene();
}

// --- LÓGICA DE HISTORIA ---
function triggerStoryScene() {
    const scenesForDay = storyScenes[gameSave.day];
    if (!scenesForDay) {
        showEndOfDayScreen();
        return;
    }

    let sceneToShow = scenesForDay.find(scene => !scene.condition || scene.condition(gameSave));
    
    if (sceneToShow) {
        displayStoryScene(sceneToShow);
    } else {
        showEndOfDayScreen();
    }
}

function displayStoryScene(scene) {
    elements.storyCharImg.src = `${scene.character}.png`;
    elements.storyDialogueText.textContent = scene.dialogue;
    elements.storyChoices.innerHTML = '';

    scene.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.textContent = `> ${choice.text}`;
        btn.className = 'action-button story-choice-btn';
        btn.onclick = () => handlePlayerChoice(choice.effect);
        elements.storyChoices.appendChild(btn);
    });

    elements.storySceneOverlay.style.display = 'flex';
}

function handlePlayerChoice(effect) {
    AudioManager.play('click');
    for (const key in effect) {
        if (gameSave.hasOwnProperty(key)) {
            gameSave[key] += effect[key];
        }
    }
    saveGame();
    elements.storySceneOverlay.style.display = 'none';
    showEndOfDayScreen();
}

// --- PANTALLA DE FIN DE DÍA (FACTURAS, TIENDA, LORE) ---
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
    elements.loreSection.style.display = 'none';
    elements.billsSection.style.display = 'block';
    elements.endOfDayOverlay.style.display = 'flex';
}

elements.payBillsBtn.addEventListener('click', () => {
    AudioManager.play('click');
    const totalBills = Object.values(dailyBills).reduce((a, b) => a + b, 0);
    if (gameSave.money < totalBills) {
        const gameOverText = settings.lang === 'es' ? "INSOLVENCIA<br><small>Contrato Terminado</small>" : "INSOLVENCY<br><small>Contract Terminated</small>";
        AudioManager.play('error');
        showFeedback(false, gameOverText, true);
        const savedData = localStorage.getItem('protocoloAccesoGameSaves');
        let gameSaves = savedData ? JSON.parse(savedData) : [null, null, null];
        gameSaves[slotId] = null;
        localStorage.setItem('protocoloAccesoGameSaves', JSON.stringify(gameSaves));
        setTimeout(() => window.location.href = 'index.html', 4000);
    } else {
        gameSave.money -= totalBills;
        AudioManager.play('kaching');
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
            if (gameSave.money < upgrade.cost) { btn.disabled = true; }
        }
        btn.addEventListener('click', () => {
            AudioManager.play('click');
            if (gameSave.money >= upgrade.cost && !gameSave.upgrades[id]) {
                gameSave.money -= upgrade.cost;
                gameSave.upgrades[id] = true;
                AudioManager.play('kaching');
                saveGame();
                populateShop();
            }
        });
        elements.shopItems.appendChild(btn);
    }
}
elements.showLoreBtn.addEventListener('click', () => {
    AudioManager.play('click');
    elements.shopSection.style.display = 'none';
    elements.loreSection.style.display = 'block';
    // Se puede mantener este lore o eliminarlo si las escenas lo reemplazan
    elements.loreRevealText.textContent = "Las paredes tienen oídos. Y los cables, memoria...";
});
elements.nextDayBtn.addEventListener('click', () => {
    AudioManager.play('click');
    gameSave.day++;
    saveGame();
    window.location.href = `lore.html?slot=${slotId}`;
});


// --- LÓGICA DE SOLICITANTES Y REGLAS ---
function setDayRules() {
    elements.rulesList.innerHTML = '';
    switch (gameSave.day) {
        case 1: dayRules = { allowedCountries: ["Cuba"] }; addRule("Solo se permite acceso a ciudadanos de Cuba."); break;
        case 2: dayRules = { allowedCountries: ["Cuba", "Rusia"], bannedReasons: ["Negocios"] }; addRule("Acceso permitido: Cuba, Rusia."); addRule("Motivo 'Negocios' está denegado."); break;
        case 3: dayRules = { bannedCountries: ["EE.UU."] }; addRule("Denegar todas las solicitudes de EE.UU."); break;
        case 4: dayRules = { requiredReason: "Investigación Académica" }; addRule("Solo se permite el motivo 'Investigación Académica'."); break;
        case 5: dayRules = { bannedCountries: ["EE.UU.", "Rusia"], bannedReasons: ["Negocios", "Turismo"]}; addRule("DENEGAR: EE.UU. y Rusia."); addRule("DENEGAR: 'Negocios' y 'Turismo'."); break;
    }
}
function addRule(text) { const li = document.createElement('li'); li.textContent = text; elements.rulesList.appendChild(li); }

function generateApplicant() {
    if (gameSave.day === 3 && !specialApplicantGenerated && applicantsProcessed === 3) {
        specialApplicantGenerated = true;
        return { name: "Javier Rodríguez", photo: "hombre2.png", country: "EE.UU.", id: `FLG-1337`, reason: "Turismo", balance: 350, hackAttempted: false, responses: { denyCorrect: "Maldición... Me han encontrado." }, isValid: false, isHighValueTarget: true };
    }
    
    const isMale = Math.random() > 0.5;
    const name = isMale 
        ? maleNames[Math.floor(Math.random() * maleNames.length)]
        : femaleNames[Math.floor(Math.random() * femaleNames.length)];
    const photo = (isMale ? 'hombre' : 'mujer') + (Math.floor(Math.random() * 3) + 1) + '.png';

    const applicant = {
        name: name,
        photo: photo,
        country: countries[Math.floor(Math.random() * countries.length)],
        id: `VEN-${Math.floor(1000 + Math.random() * 9000)}`,
        reason: reasons[Math.floor(Math.random() * reasons.length)],
        balance: Math.floor(Math.random() * 951) + 50,
        hackAttempted: false,
        responses: { approveCorrect: "Conexión establecida.", approveIncorrect: "Demasiado fácil.", denyCorrect: "Entendido.", denyIncorrect: "¿Por qué?" }
    };

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


// --- TEMPORIZADOR Y DECISIONES ---
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
            AudioManager.play('error');
            processDecision(false);
        }
    }, 1000);
}
function processDecision(playerApproves) {
    clearInterval(mainTimerInterval);
    let message, feedbackText;
    let correctAccordingToState = playerApproves === currentApplicant.isValid;

    if (currentApplicant.isHighValueTarget && !playerApproves) {
        addCommsLog("Objetivo de alto interés neutralizado. Bonificación acreditada.", "CENTRAL");
        gameSave.money += 50;
        AudioManager.play('kaching');
    }
    
    if (currentApplicant.sectTarget) {
        const playerObeyedSect = (playerApproves && currentApplicant.sectInstruction === 'approve') || (!playerApproves && currentApplicant.sectInstruction === 'deny');
        if (playerObeyedSect) {
            addCommsLog("Bien hecho. Transferencia de fondos iniciada.", "TRANSMISIÓN ANÓNIMA", true);
            gameSave.money += 75;
            gameSave.sectAllegiance++;
            AudioManager.play('kaching');
            showFeedback(true, "ÓRDENES CUMPLIDAS");
        } else {
            addCommsLog("Nos has decepcionado, operador.", "TRANSMISIÓN ANÓNIMA", true);
            gameSave.sectAllegiance--;
            AudioManager.play('error');
            showFeedback(false, "ORDEN IGNORADA");
        }
    } else { // Solo se evalúa como correcto/incorrecto si no es una misión de la secta
        if (correctAccordingToState) {
            let bonus = (settings.difficulty === 'short') ? 15 : (settings.difficulty === 'long' ? 8 : 10);
            if (gameSave.upgrades.payBonus) bonus += 5;
            gameSave.money += bonus;
            AudioManager.play('kaching');
            showFeedback(true, "DECISIÓN CORRECTA");
        } else {
            gameSave.money -= 25;
            AudioManager.play('error');
            feedbackText = playerApproves ? "BRECHA DE SEGURIDAD" : "BLOQUEO INCORRECTO";
            showFeedback(false, feedbackText);
        }
    }

    message = playerApproves 
        ? (correctAccordingToState ? currentApplicant.responses.approveCorrect : currentApplicant.responses.approveIncorrect)
        : (correctAccordingToState ? currentApplicant.responses.denyCorrect : currentApplicant.responses.denyIncorrect);
        
    saveGame();
    addCommsLog(message, currentApplicant.name);
    setTimeout(nextApplicant, 2500);
}

function startHackMinigame() { /* ... (sin cambios) ... */ }
function processHackResult(success) { /* ... (sin cambios) ... */ }

elements.approveBtn.addEventListener('click', () => { AudioManager.play('approve'); processDecision(true); });
elements.denyBtn.addEventListener('click', () => { AudioManager.play('deny'); processDecision(false); });
elements.hackBtn.addEventListener('click', startHackMinigame);

// --- ACTUALIZACIÓN DE UI Y FINALES ---
function updateUI() {
    elements.dayCounter.textContent = `DÍA: ${gameSave.day}`;
    elements.moneyCounter.textContent = `CRÉDITOS: ${gameSave.money}`;
    elements.applicantCounter.textContent = `SOLICITUD: ${applicantsProcessed} / ${dailyGoal}`;
    if (currentApplicant) {
        elements.applicantPhoto.src = currentApplicant.photo;
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
    let endTitle = "", endMessage = "", trophyId = "";
    
    if (gameSave.familyRelationship > 3 && gameSave.money > 150) {
        endTitle = "FUTURO FAMILIAR"; endMessage = "A pesar de la presión, nunca olvidaste lo que era importante. Lograste proveer para tu familia sin perderte en el camino. Juntos, enfrentan un nuevo amanecer."; trophyId = "family-future";
    } else if (gameSave.sectAllegiance > 5) {
        endTitle = "ARQUITECTO DE LA RED"; endMessage = "Tu lealtad a la 'Red Invisible' te ha elevado. Ya no eres un peón, sino una pieza clave en la reconfiguración del poder. El viejo sistema caerá, y tú estarás allí para construir el nuevo."; trophyId = "shadow-agent";
    } else if (gameSave.familyRelationship < -3 && gameSave.money < 100) {
        endTitle = "HOMBRE ROTO"; endMessage = "El trabajo te consumió. Alejaste a tu familia, fallaste al Estado y no conseguiste nada a cambio. Un día, simplemente, no regresas a casa. Eres un fantasma en el sistema que ayudaste a mantener."; trophyId = "broken-man";
    } else if (gameSave.sectAllegiance < -3 && gameSave.money > 250) {
        endTitle = "PERRO DEL ESTADO"; endMessage = "Tu lealtad ciega al Estado fue recompensada con una cómoda promoción. Vives bien, pero a costa de tu conciencia. Las preguntas que nunca hiciste te perseguirán en el silencio de tus noches vigiladas."; trophyId = "loyal-operator";
    } else {
        endTitle = "RECURSO AGOTADO"; endMessage = "Tu rendimiento ha sido mediocre. No has demostrado lealtad ni competencia. El Proyecto 'Ventana Digital' ha prescindido de tus servicios. Estás despedido."; trophyId = "depleted-resource";
    }

    const savedTrophies = JSON.parse(localStorage.getItem('protocoloAccesoTrophies')) || {};
    savedTrophies[trophyId] = true;
    if (settings.difficulty === 'short') { savedTrophies['master-operator'] = true; }
    localStorage.setItem('protocoloAccesoTrophies', JSON.stringify(savedTrophies));
    
    showFeedback(true, `FIN DE LA ASIGNACIÓN<br><br><small style="font-size: 3rem;">${endTitle}</small><br><p style="font-size: 1.5rem; max-width: 800px; margin: auto;">${endMessage}</p>`, true);

    const savedData = localStorage.getItem('protocoloAccesoGameSaves');
    let gameSaves = savedData ? JSON.parse(savedData) : [null, null, null];
    gameSaves[slotId] = null;
    localStorage.setItem('protocoloAccesoGameSaves', JSON.stringify(gameSaves));
    
    setTimeout(() => window.location.href = 'index.html', 12000);
}
