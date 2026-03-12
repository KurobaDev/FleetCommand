function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

const i18n = {
    en: {
        accountSetup: "Account Setup", domainPlaceholder: "Domain (e.g., demo.fleetcommand.com)", apiKeyPlaceholder: "API Key",
        connectAccount: "Connect Account", searchPlaceholder: "Search customer, location, model, SN or IP...", back: "Back",
        filterLocations: "Filter locations...", deviceDetails: "Device Details", totalPages: "Total Pages:", lastSeen: "Last Seen:",
        webPanel: "Web Panel", portal: "Portal", drivers: "Drivers", copyInfo: "Copy Info", openTicket: "Open Support Ticket",
        localNotes: "Local Notes", showQR: "Show QR", scanSerial: "Scan for Asset Serial", typeNotes: "Type notes here...",
        preferences: "Preferences", apiConnection: "API Connection", saveRestart: "Save & Restart", language: "Language",
        extensionFeatures: "Extension Features", assetQRCodes: "Asset QR Codes", quickTicket: "Quick-Ticket Button",
        supportEmail: "Support Email (e.g., helpdesk@company.com)", troubleshooting: "Troubleshooting",
        clearCacheDesc: "If fleet data is missing or out of sync, clear the local cache to force a full server re-sync.",
        clearCacheBtn: "Clear Local Cache", copied: "Copied! \u2713", companyProfile: "Company Profile", locationFolder: "Location", noMatching: "No matching customers, locations or devices found.",
        activeAlerts: "Active Alerts", ticketSubj: "Printer Issue - SN: ", ticketBodyDevice: "Device: ", ticketBodyLocation: "Location: ",
        ticketBodyDesc: "Description of issue:\n", personalization: "Personalization", appTheme: "App Theme",
        themeMatrix: "The Matrix", themeOcean: "Deep Ocean", themeCrimson: "Crimson Red", themeForest: "Forest Green", themePurple: "Midnight Purple",
        appName: "White-label App Name", compactMode: "Compact List View",
        dataManagement: "Data Management", exportBtn: "Export JSON", importBtn: "Import JSON", exportCsvBtn: "Export Inventory to CSV", rememberState: "Remember Last Screen",
        copyDevice: "Device:", copyModel: "Orig. Model:", copySN: "SN:", copyIP: "IP:", copyMAC: "MAC:", copyPages: "Pages:", copyAlerts: "Alerts:",
        autoSync: "Auto-Sync Fleet Data", syncInterval: "Sync Interval", min15: "15 Minutes", min30: "30 Minutes", hour1: "1 Hour", hour4: "4 Hours", hour24: "24 Hours",
        sortName: "Sort: Alphabetical", sortPages: "Sort: Total Pages (High to Low)", sortRecent: "Sort: Last Seen First"
    },
    nl: {
        accountSetup: "Account Instellen", domainPlaceholder: "Domein (bijv. demo.fleetcommand.com)", apiKeyPlaceholder: "API Sleutel",
        connectAccount: "Account Verbinden", searchPlaceholder: "Zoek klant, locatie, model, SN of IP...", back: "Terug",
        filterLocations: "Filter locaties...", deviceDetails: "Apparaat Details", totalPages: "Totaal Pagina's:", lastSeen: "Laatst Gezien:",
        webPanel: "Webpaneel", portal: "Portaal", drivers: "Drivers", copyInfo: "Kopieer Info", openTicket: "Open Support Ticket",
        localNotes: "Lokale Notities", showQR: "Toon QR", scanSerial: "Scan voor Serienummer", typeNotes: "Typ hier notities...",
        preferences: "Instellingen", apiConnection: "API Verbinding", saveRestart: "Opslaan & Herstarten", language: "Taal",
        extensionFeatures: "Extensie Functies", assetQRCodes: "Asset QR Codes", quickTicket: "Quick-Ticket Knop",
        supportEmail: "Support E-mail (bijv. helpdesk@bedrijf.nl)", troubleshooting: "Probleemoplossing",
        clearCacheDesc: "Als de lijst leeg of verouderd is, leeg dan de cache om de data opnieuw op te halen.",
        clearCacheBtn: "Lokale Cache Legen", copied: "Gekopieerd! \u2713", companyProfile: "Bedrijfsprofiel", locationFolder: "Locatie", noMatching: "Geen klanten, locaties of apparaten gevonden.",
        activeAlerts: "Actieve Meldingen", ticketSubj: "Printer Probleem - SN: ", ticketBodyDevice: "Apparaat: ", ticketBodyLocation: "Locatie: ",
        ticketBodyDesc: "Beschrijving van het probleem:\n", personalization: "Personalisatie", appTheme: "App Thema",
        themeMatrix: "The Matrix", themeOcean: "Diepe Oceaan", themeCrimson: "Donkerrood", themeForest: "Bosgroen", themePurple: "Nachtpaars",
        appName: "Naam in Header", compactMode: "Compacte Weergave",
        dataManagement: "Data Beheer", exportBtn: "Exporteer JSON", importBtn: "Importeer JSON", exportCsvBtn: "Exporteer Apparaten naar CSV", rememberState: "Onthoud Laatste Scherm",
        copyDevice: "Apparaat:", copyModel: "Orig. Model:", copySN: "Serienummer:", copyIP: "IP-Adres:", copyMAC: "MAC-Adres:", copyPages: "Pagina's:", copyAlerts: "Meldingen:",
        autoSync: "Automatisch Syncen", syncInterval: "Sync Interval", min15: "15 Minuten", min30: "30 Minuten", hour1: "1 Uur", hour4: "4 Uur", hour24: "24 Uur",
        sortName: "Sorteer: Alfabetisch", sortPages: "Sorteer: Tellerstanden (Hoog naar Laag)", sortRecent: "Sorteer: Laatst Gezien"
    }
};

const alertDictionary = {
    "Toner Low": "Toner bijna leeg", "Replace Toner": "Vervang toner", "Paper Jam": "Papier vastgelopen",
    "Tray Empty": "Papierlade leeg", "Out of Paper": "Papier op", "Door Open": "Klep open", "Cover Open": "Klep open",
    "Waste Toner Full": "Resttonerbak vol", "Waste Toner Near Full": "Resttonerbak bijna vol", "Offline": "Apparaat is offline",
    "Sleep Mode": "Slaapstand", "Warming Up": "Opwarmen", "Drum Near End of Life": "Drum bijna aan vervanging toe",
    "Replace Drum": "Vervang drum", "Maintenance Required": "Onderhoud vereist", "Fuser Error": "Fuser fout",
    "Scanner Error": "Scanner fout", "Ready": "Klaar voor gebruik", "Low Paper": "Papier bijna op"
};

function translateAlert(text, lang) {
    if (lang !== 'nl' || !text) return text;
    let result = text;
    for (const [en, nl] of Object.entries(alertDictionary)) { result = result.replace(new RegExp(en, "gi"), nl); }
    return result;
}

let currentLang = 'en';
function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[lang][key]) el.innerHTML = i18n[lang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (i18n[lang][key]) el.setAttribute('placeholder', i18n[lang][key]);
    });
}

let API_URL = ""; let BASE_DOMAIN = ""; let API_KEY = "";
let deviceHierarchy = {}; let allDevicesFlat = []; let localNicknames = {}; 
let currentPrinter = null; let currentViewCompany = ""; let currentViewLocation = "";

let currentSlideIndex = 0; 
let previousSlideBeforeSettings = 0;

const CACHE_VERSION = 3; 

const ICON_SUN = `<svg viewBox="0 0 24 24"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18.75a.75.75 0 01.75.75V21.75a.75.75 0 01-1.5 0V19.5a.75.75 0 01.75-.75zM6.166 17.834a.75.75 0 001.06 1.06l1.591-1.59a.75.75 0 10-1.06-1.061l-1.591 1.59zM4.5 12a.75.75 0 01-.75.75H1.5a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM6.166 6.166a.75.75 0 001.06 1.06l1.59-1.591a.75.75 0 00-1.061-1.06l-1.59 1.591z"/></svg>`;
const ICON_MOON = `<svg viewBox="0 0 24 24"><path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/></svg>`;
const ICON_PRINTER = `<svg style="width:20px;height:20px;fill:currentColor;opacity:0.7;" viewBox="0 0 24 24"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>`;
const ICON_COMPANY = `<svg style="width:20px;height:20px;fill:currentColor;opacity:0.7;" viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>`;
const ICON_LOCATION = `<svg style="width:20px;height:20px;fill:currentColor;opacity:0.7;" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
const ICON_EYE_ON = `<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>`;
const ICON_EYE_OFF = `<path d="M11.83 9L15 12.16V12a3 3 0 00-3-3h-.17zm-4.3.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.3-3.1c-.8 0-1.55.2-2.21.53l1.92 1.92A2.99 2.99 0 0114.83 12l1.92 1.92c.33-.66.53-1.41.53-2.2 0-2.76-2.24-5-5-5zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.3-3.1c-.8 0-1.55.2-2.21.53l1.92 1.92A2.99 2.99 0 0114.83 12l1.92 1.92c.33-.66.53-1.41.53-2.2 0-2.76-2.24-5-5-5z"/>`;

function getStatusClass(status) {
    if (!status) return "status-inactive";
    if (status === "ACTIVE") return "status-active";
    if (status === "NOT_RESPONDING") return "status-offline";
    return "status-inactive"; 
}

document.addEventListener('DOMContentLoaded', async () => {

    try {
        const versionEl = document.getElementById('appVersion');
        if (versionEl && typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getManifest) {
            versionEl.textContent = 'v' + chrome.runtime.getManifest().version;
        }
    } catch(e) {}

    const allData = await chrome.storage.local.get(null);
    let { apiKey, domain, deviceCache, flatCache, cacheVersion, pendingSearch, theme, prefShowQR, prefShowTicket, prefTicketEmail, prefLang, prefTheme, prefAppName, prefCompact, prefRememberState, savedSlide, savedCompany, savedLocation, savedPrinterSN, prefAutoSync, prefSyncInterval, lastSyncTime } = allData;
    
    if (prefAutoSync === undefined) prefAutoSync = true;
    if (!prefSyncInterval) prefSyncInterval = 60; 

    for (const key in allData) {
        if (key.startsWith('nickname_')) localNicknames[key.replace('nickname_', '')] = allData[key];
    }

    currentLang = prefLang || 'en';
    document.getElementById('langSelect').value = currentLang;
    setLanguage(currentLang);

    const currentTheme = prefTheme || theme || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.getElementById('settingTheme').value = currentTheme;
    const themeBtn = document.getElementById('themeToggleBtn');
    
    const isDarkTheme = ['dark', 'matrix', 'ocean', 'crimson', 'forest', 'purple'].includes(currentTheme);
    themeBtn.innerHTML = isDarkTheme ? ICON_SUN : ICON_MOON;
    
    themeBtn.addEventListener('click', () => {
        let isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        let newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        document.getElementById('settingTheme').value = newTheme;
        chrome.storage.local.set({ prefTheme: newTheme, theme: newTheme });
        themeBtn.innerHTML = isDark ? ICON_MOON : ICON_SUN;
    });

    document.getElementById('settingTheme').addEventListener('change', (e) => {
        const t = e.target.value;
        document.documentElement.setAttribute('data-theme', t);
        chrome.storage.local.set({ prefTheme: t });
        themeBtn.innerHTML = (t !== 'light') ? ICON_SUN : ICON_MOON;
    });

    document.querySelectorAll('.pwd-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const input = e.currentTarget.previousElementSibling;
            if(input.type === 'password') {
                input.type = 'text';
                e.currentTarget.innerHTML = ICON_EYE_OFF;
            } else {
                input.type = 'password';
                e.currentTarget.innerHTML = ICON_EYE_ON;
            }
        });
    });

    document.getElementById('headerAppName').textContent = prefAppName || "FleetCommand";
    document.getElementById('settingAppName').value = prefAppName || "";
    document.getElementById('settingAppName').addEventListener('input', (e) => {
        const name = e.target.value.trim() || "FleetCommand";
        chrome.storage.local.set({ prefAppName: name });
        document.getElementById('headerAppName').textContent = escapeHTML(name);
    });

    if(prefCompact) document.body.classList.add('compact-mode');
    document.getElementById('settingCompact').checked = !!prefCompact;
    document.getElementById('settingCompact').addEventListener('change', (e) => {
        chrome.storage.local.set({ prefCompact: e.target.checked });
        document.body.classList.toggle('compact-mode', e.target.checked);
    });

    document.getElementById('settingRememberState').checked = prefRememberState !== false;
    document.getElementById('settingRememberState').addEventListener('change', (e) => {
        chrome.storage.local.set({ prefRememberState: e.target.checked });
        if(!e.target.checked) chrome.storage.local.remove(['savedSlide', 'savedCompany', 'savedLocation', 'savedPrinterSN']);
    });

    const autoSyncToggle = document.getElementById('settingAutoSync');
    const intervalSelect = document.getElementById('settingSyncInterval');
    const intervalRow = document.getElementById('syncIntervalRow');

    autoSyncToggle.checked = prefAutoSync;
    intervalSelect.value = prefSyncInterval.toString();
    intervalRow.style.display = autoSyncToggle.checked ? 'flex' : 'none';

    autoSyncToggle.addEventListener('change', (e) => {
        chrome.storage.local.set({ prefAutoSync: e.target.checked });
        intervalRow.style.display = e.target.checked ? 'flex' : 'none';
    });

    intervalSelect.addEventListener('change', (e) => {
        chrome.storage.local.set({ prefSyncInterval: parseInt(e.target.value) });
    });

    const qrToggle = document.getElementById('settingShowQR');
    const ticketToggle = document.getElementById('settingShowTicket');
    const emailInput = document.getElementById('settingTicketEmail');
    const langSelect = document.getElementById('langSelect');

    qrToggle.checked = !!prefShowQR;
    ticketToggle.checked = !!prefShowTicket;
    emailInput.value = prefTicketEmail || "";
    emailInput.style.display = prefShowTicket ? 'block' : 'none';

    qrToggle.addEventListener('change', (e) => chrome.storage.local.set({ prefShowQR: e.target.checked }));
    ticketToggle.addEventListener('change', (e) => {
        chrome.storage.local.set({ prefShowTicket: e.target.checked });
        emailInput.style.display = e.target.checked ? 'block' : 'none';
    });
    let emailSaveTimeout;
    emailInput.addEventListener('input', (e) => {
        clearTimeout(emailSaveTimeout);
        emailSaveTimeout = setTimeout(() => chrome.storage.local.set({ prefTicketEmail: e.target.value.trim() }), 500);
    });
    langSelect.addEventListener('change', (e) => {
        chrome.storage.local.set({ prefLang: e.target.value });
        setLanguage(e.target.value);
    });

    document.getElementById('backBtn1').addEventListener('click', () => slide(0));
    document.getElementById('backBtn2').addEventListener('click', () => slide(1));
    document.getElementById('backBtn3').addEventListener('click', () => slide(document.getElementById('searchInput').value ? 0 : 2));
    document.getElementById('backBtn4').addEventListener('click', () => slide(previousSlideBeforeSettings));

    document.getElementById('settingsBtn').addEventListener('click', () => {
        if (currentSlideIndex !== 4) {
            previousSlideBeforeSettings = currentSlideIndex;
        }
        document.getElementById('setDomain').value = BASE_DOMAIN;
        document.getElementById('setApiKey').value = API_KEY;
        slide(4);
    });

    document.getElementById('printerSort').addEventListener('change', () => {
        renderPrinters(currentViewCompany, currentViewLocation);
    });

    const notesToggle = document.getElementById('notesToggle');
    const notesTextarea = document.getElementById('localNotes');
    const qrBtn = document.getElementById('qrBtn');
    const qrContainer = document.getElementById('qrContainer');
    
    notesToggle.addEventListener('click', (e) => {
        if(e.target === qrBtn) return; 
        notesToggle.classList.toggle('open');
        notesTextarea.classList.toggle('open');
    });

    qrBtn.addEventListener('click', () => qrContainer.classList.toggle('open'));

    let saveTimeout;
    notesTextarea.addEventListener('input', () => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            if (currentPrinter) {
                chrome.storage.local.set({ [`note_${currentPrinter.serialNumber}`]: notesTextarea.value });
            }
        }, 400);
    });

    const editBtn = document.getElementById('editNameBtn');
    const modelDisplay = document.getElementById('modelDisplay');
    const modelInput = document.getElementById('modelInput');
    
    editBtn.addEventListener('click', () => {
        modelDisplay.style.display = 'none';
        editBtn.style.display = 'none';
        modelInput.style.display = 'block';
        modelInput.value = localNicknames[currentPrinter.serialNumber] || currentPrinter.modelName;
        modelInput.focus();
    });

    async function saveNickname() {
        const newName = modelInput.value.trim();
        if(newName && newName !== currentPrinter.modelName) {
            localNicknames[currentPrinter.serialNumber] = newName;
            await chrome.storage.local.set({ [`nickname_${currentPrinter.serialNumber}`]: newName });
            modelDisplay.textContent = newName;
        } else {
            delete localNicknames[currentPrinter.serialNumber];
            await chrome.storage.local.remove(`nickname_${currentPrinter.serialNumber}`);
            modelDisplay.textContent = currentPrinter.modelName;
        }
        modelInput.style.display = 'none';
        modelDisplay.style.display = 'block';
        editBtn.style.display = 'block';
    }

    modelInput.addEventListener('blur', saveNickname);
    modelInput.addEventListener('keydown', (e) => { if(e.key === 'Enter') { e.preventDefault(); modelInput.blur(); } });

    document.getElementById('networkDisplay').addEventListener('click', (e) => {
        const badge = e.target.closest('.network-badge');
        if (badge && badge.dataset.copy) {
            if(badge.innerHTML.includes("MAC")) {
                window.open(`https://macvendors.com/query/${badge.dataset.copy}`, '_blank');
                return;
            }
            navigator.clipboard.writeText(badge.dataset.copy);
            const original = badge.innerHTML;
            badge.innerHTML = escapeHTML(i18n[currentLang].copied); 
            setTimeout(() => { badge.innerHTML = original; }, 1500);
        }
    });

    document.getElementById('copySummaryBtn').addEventListener('click', (e) => {
        if(!currentPrinter) return;
        const btn = e.currentTarget;
        const alertHtml = document.getElementById('alertContainer').innerHTML;
        
        let alerts = alertHtml.replace(/<[^>]*>?/gm, '\n').replace(/&nbsp;/g, ' ').trim();
        if(alerts.includes(':')) {
            alerts = alerts.substring(alerts.indexOf(':') + 1).trim();
        } else {
            alerts = "";
        }
        
        const nameToUse = localNicknames[currentPrinter.serialNumber] || currentPrinter.modelName;
        const alertStr = alerts ? `\n\n${i18n[currentLang].copyAlerts}\n${alerts}` : '';
        
        const summary = `${i18n[currentLang].copyDevice} ${nameToUse}
${i18n[currentLang].copyModel} ${currentPrinter.modelName}
${i18n[currentLang].copySN} ${currentPrinter.serialNumber}
${i18n[currentLang].copyIP} ${currentPrinter.ip}
${i18n[currentLang].copyMAC} ${currentPrinter.mac}
${i18n[currentLang].copyPages} ${currentPrinter.totalPages}${alertStr}`;
        
        navigator.clipboard.writeText(summary);
        btn.innerHTML = escapeHTML(i18n[currentLang].copied);
        setTimeout(() => btn.innerHTML = escapeHTML(i18n[currentLang].copyInfo), 1500);
    });

    document.getElementById('exportDataBtn').addEventListener('click', async () => {
        const items = await chrome.storage.local.get(null);
        delete items.deviceCache; delete items.flatCache; delete items.cacheVersion; delete items.lastSyncTime;
        const blob = new Blob([JSON.stringify(items, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `FleetCommand_Settings_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    });

    document.getElementById('importDataBtn').addEventListener('click', () => document.getElementById('importFileInput').click());
    document.getElementById('importFileInput').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = JSON.parse(e.target.result);
                await chrome.storage.local.set(data);
                alert(currentLang === 'nl' ? "Instellingen succesvol geïmporteerd! De app herstart nu." : "Settings imported successfully! App will restart.");
                location.reload();
            } catch(err) {
                alert("Error importing file. Invalid JSON format.");
            }
        };
        reader.readAsText(file);
    });

    document.getElementById('exportCsvBtn').addEventListener('click', () => {
        if (!allDevicesFlat || allDevicesFlat.length === 0) return alert("No devices found to export.");
        
        const headers = ["Company", "Location", "Model", "Serial Number", "IP", "MAC", "Total Pages", "Last Seen", "Status"];
        const rows = allDevicesFlat.map(d => {
            const lastSeenStr = d.lastUpdate ? new Date(d.lastUpdate).toLocaleString() : '';
            return [
                `"${d.companyName || ''}"`, `"${d.locationName || ''}"`, `"${d.modelName || ''}"`, `"${d.serialNumber || ''}"`,
                `"${d.ip || ''}"`, `"${d.mac || ''}"`, `"${d.totalPages || 0}"`, `"${lastSeenStr}"`, `"${d.status || ''}"`
            ];
        });
        
        const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `FleetCommand_Inventory_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    });

    function restoreState() {
        if (prefRememberState !== false && savedSlide > 0) {
            
            if (savedSlide === 3 && savedPrinterSN) {
                const p = allDevicesFlat.find(d => d.serialNumber === savedPrinterSN);
                if (p) {
                    currentViewCompany = p.companyName;
                    currentViewLocation = p.locationName;
                    
                    document.getElementById('headerCompanyName').textContent = p.companyName;
                    if (deviceHierarchy[p.companyName]) renderLocations(p.companyName);
                    
                    document.getElementById('headerLocationName').textContent = p.locationName;
                    if (deviceHierarchy[p.companyName]?.[p.locationName]) renderPrinters(p.companyName, p.locationName);
                    
                    openPrinterDetails(p);
                    return;
                }
            } 
            
            if (savedSlide === 2 && savedCompany && savedLocation && deviceHierarchy[savedCompany]?.[savedLocation]) {
                currentViewCompany = savedCompany;
                currentViewLocation = savedLocation;
                
                document.getElementById('headerCompanyName').textContent = savedCompany;
                renderLocations(savedCompany);
                
                document.getElementById('headerLocationName').textContent = savedLocation;
                renderPrinters(savedCompany, savedLocation);
                slide(2);
                return;
            } 
            
            if (savedSlide === 1 && savedCompany && deviceHierarchy[savedCompany]) {
                currentViewCompany = savedCompany;
                document.getElementById('headerCompanyName').textContent = savedCompany;
                renderLocations(savedCompany);
                slide(1);
                return;
            }
            
            slide(0);
        } else {
            slide(0);
        }
    }

    if (apiKey && domain) {
        BASE_DOMAIN = domain;
        API_KEY = apiKey;
        API_URL = `https://${domain}/api`;
        document.getElementById('setup').style.display = 'none';
        document.getElementById('main').style.display = 'block';

        if (deviceCache && flatCache && cacheVersion === CACHE_VERSION) {
            deviceHierarchy = deviceCache;
            allDevicesFlat = flatCache;
            renderCompanies();
            
            if (pendingSearch) {
                document.getElementById('searchInput').value = pendingSearch;
                document.getElementById('companyList').style.display = 'none';
                document.getElementById('searchResults').style.display = 'block';
                renderGlobalSearch(pendingSearch.toLowerCase().trim());
                chrome.storage.local.remove('pendingSearch'); 
                
                if (chrome.action) {
                    chrome.action.setBadgeText({ text: "" });
                }
            } else {
                restoreState();
            }

            if (prefAutoSync && lastSyncTime) {
                const intervalMs = prefSyncInterval * 60 * 1000;
                if (Date.now() - lastSyncTime > intervalMs) {
                    const icon = document.getElementById('syncBtn').querySelector('svg');
                    icon.classList.add('spinning');
                    fetchDevices(false).finally(() => icon.classList.remove('spinning'));
                }
            }

        } else {
            fetchDevices(true);
        }
    } else {
        document.getElementById('setup').style.display = 'block';
    }

    document.getElementById('saveKey').addEventListener('click', () => saveCredentials('apiKey', 'domain'));
    document.getElementById('saveSettingsBtn').addEventListener('click', () => saveCredentials('setApiKey', 'setDomain'));

    function saveCredentials(keyId, domId) {
        const key = document.getElementById(keyId).value.trim();
        let dom = document.getElementById(domId).value.trim();
        dom = dom.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
        if (key && dom) {
            chrome.storage.local.set({ apiKey: key, domain: dom, cacheVersion: 0 }, () => location.reload());
        }
    }

    document.getElementById('clearCacheBtn').addEventListener('click', () => {
        chrome.storage.local.remove(['deviceCache', 'flatCache', 'lastSyncTime'], () => {
            alert(currentLang === 'nl' ? "Cache geleegd! De app herstart om de data op te halen." : "Cache cleared! The app will now restart to fetch fresh data.");
            location.reload();
        });
    });

    document.getElementById('searchInput').addEventListener('input', debounce((e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query === "") {
            document.getElementById('companyList').style.display = 'block';
            document.getElementById('searchResults').style.display = 'none';
            renderCompanies();
        } else {
            document.getElementById('companyList').style.display = 'none';
            document.getElementById('searchResults').style.display = 'block';
            renderGlobalSearch(query);
        }
    }, 250));

    document.getElementById('locationSearchInput').addEventListener('input', debounce((e) => {
        const query = e.target.value.toLowerCase().trim();
        const currentCompany = document.getElementById('headerCompanyName').textContent;
        renderLocations(currentCompany, query);
    }, 200));

    document.getElementById('syncBtn').addEventListener('click', (e) => {
        const icon = e.currentTarget.querySelector('svg');
        icon.classList.add('spinning');
        fetchDevices(false).finally(() => icon.classList.remove('spinning'));
    });
});

function slide(index) {
    const track = document.getElementById('sliderTrack');
    
    if (Math.abs(currentSlideIndex - index) > 1) {
        const slides = document.querySelectorAll('.slide');
        
        slides.forEach((s, i) => {
            if (i !== currentSlideIndex && i !== index) {
                s.style.opacity = '0';
                s.style.transition = 'opacity 0.1s ease';
            }
        });

        track.style.transform = `translateX(-${index * 20}%)`;

        setTimeout(() => {
            slides.forEach(s => {
                s.style.opacity = '1';
                s.style.transition = '';
            });
        }, 450); 

    } else {
        track.style.transform = `translateX(-${index * 20}%)`;
    }

    currentSlideIndex = index;
    
    if (index === 0) {
        setTimeout(() => document.getElementById('searchInput').focus(), 300);
    }

    if (index !== 4) {
        chrome.storage.local.get(['prefRememberState'], (res) => {
            if (res.prefRememberState !== false) {
                chrome.storage.local.set({ 
                    savedSlide: index, 
                    savedCompany: currentViewCompany, 
                    savedLocation: currentViewLocation, 
                    savedPrinterSN: currentPrinter ? currentPrinter.serialNumber : null 
                });
            }
        });
    }
}

async function fetchDevices(showLoadingUI) {
    const compList = document.getElementById('companyList');
    if (showLoadingUI) compList.innerHTML = '<div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>';

    try {
        const res = await fetch(`${API_URL}/v3/devices`, {
            method: 'POST',
            headers: { "Content-Type": "application/json", "App-auth-key": API_KEY },
            body: JSON.stringify({
                cursorParams: { offset: 0, limit: 1000, filters: [], orders: [] },
                fieldIds: ["Device.id", "Device.model.name", "Device.serialNumber", "Device.company.name", "Device.location.name", "Device.status", "Device.counter.mono", "Device.counter.color", "Device.ip", "Device.mac", "Device.hostname", "Device.lastUpdate"]
            })
        });

        if (!res.ok) throw new Error("API Connection failed");

        const { entries = [] } = await res.json();
        const tree = {};
        const flatList = [];

        entries.forEach(d => {
            const cName = d.company?.name || d["Device.company.name"] || "General";
            const lName = d.location?.name || d["Device.location.name"] || "Main Location";
            const mono = d.counter?.mono || d["Device.counter.mono"] || 0;
            const color = d.counter?.color || d["Device.counter.color"] || 0;

            const printer = {
                id: d.id, modelName: d.model?.name || d["Device.model.name"], serialNumber: d.serialNumber || d["Device.serialNumber"],
                status: d.status, totalPages: mono + color, ip: d.ip || d["Device.ip"] || "N/A", mac: d.mac || d["Device.mac"] || "N/A",
                hostname: d.hostname || d["Device.hostname"] || "N/A", lastUpdate: d.lastUpdate, companyName: cName, locationName: lName
            };
            if (!tree[cName]) tree[cName] = {};
            if (!tree[cName][lName]) tree[cName][lName] = [];
            tree[cName][lName].push(printer);
            flatList.push(printer);
        });

        deviceHierarchy = tree;
        allDevicesFlat = flatList;
        await chrome.storage.local.set({ deviceCache: tree, flatCache: flatList, cacheVersion: CACHE_VERSION, lastSyncTime: Date.now() });
        renderCompanies();
        if (showLoadingUI) slide(0);
    } catch (err) { 
        document.getElementById('errorLog').textContent = "Failed to connect to API. Please check your credentials in Settings.";
        document.getElementById('errorLog').style.display = "block";
    }
}

function renderCompanies() {
    const list = document.getElementById('companyList');
    list.innerHTML = '';
    Object.keys(deviceHierarchy).sort().forEach(company => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `<div class="list-item-content">${ICON_COMPANY} <div style="font-weight:600;">${escapeHTML(company)}</div></div>`;
        div.onclick = () => {
            currentViewCompany = company;
            document.getElementById('headerCompanyName').textContent = company;
            document.getElementById('locationSearchInput').value = '';
            renderLocations(company);
            slide(1);
        };
        list.appendChild(div);
    });
}

function renderLocations(company, query = "") {
    const list = document.getElementById('locationList');
    list.innerHTML = '';
    if (!deviceHierarchy[company]) return;
    Object.keys(deviceHierarchy[company]).filter(loc => loc.toLowerCase().includes(query)).sort().forEach(location => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `<div><div style="font-weight:600;">${escapeHTML(location)}</div> <span class="item-subtitle">${deviceHierarchy[company][location].length} device(s)</span></div>`;
        div.onclick = () => {
            currentViewLocation = location;
            document.getElementById('headerLocationName').textContent = location;
            renderPrinters(company, location);
            slide(2);
        };
        list.appendChild(div);
    });
}

function renderPrinters(company, location) {
    const list = document.getElementById('printerList');
    list.innerHTML = '';
    
    if(!deviceHierarchy[company] || !deviceHierarchy[company][location]) return;

    let printers = [...deviceHierarchy[company][location]];
    const sortMode = document.getElementById('printerSort').value;

    printers.sort((a,b) => {
        if(sortMode === 'name') {
            return (a.modelName || '').localeCompare(b.modelName || '');
        } else if(sortMode === 'pages') {
            return (b.totalPages || 0) - (a.totalPages || 0);
        } else if(sortMode === 'recent') {
            const dateA = a.lastUpdate ? new Date(a.lastUpdate).getTime() : 0;
            const dateB = b.lastUpdate ? new Date(b.lastUpdate).getTime() : 0;
            return dateB - dateA;
        }
        return 0;
    });

    printers.forEach(printer => {
        const div = document.createElement('div');
        div.className = 'list-item';
        const dotClass = getStatusClass(printer.status);
        const displayName = localNicknames[printer.serialNumber] || printer.modelName;

        div.innerHTML = `<div class="list-item-content"><div style="position:relative;width:20px;height:20px;">${ICON_PRINTER}<span class="status-dot ${dotClass}"></span></div>
            <div><div style="font-weight:600;">${escapeHTML(displayName)}</div><span class="item-subtitle">SN: ${escapeHTML(printer.serialNumber)}</span></div></div>`;
        div.onclick = () => openPrinterDetails(printer);
        list.appendChild(div);
    });
}

function renderGlobalSearch(query) {
    const list = document.getElementById('searchResults');
    list.innerHTML = '';
    const terms = query.split(/\s+/).filter(t => t.length > 0);

    const matchingCompanies = Object.keys(deviceHierarchy).filter(c => {
        const lower = c.toLowerCase();
        return terms.every(t => lower.includes(t));
    }).sort();

    matchingCompanies.forEach(company => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `<div class="list-item-content">${ICON_COMPANY} <div><div style="font-weight:600;">${escapeHTML(company)}</div><span class="item-subtitle">${escapeHTML(i18n[currentLang].companyProfile)}</span></div></div>`;
        div.onclick = () => {
            currentViewCompany = company;
            document.getElementById('headerCompanyName').textContent = company;
            document.getElementById('locationSearchInput').value = '';
            renderLocations(company);
            slide(1);
        };
        list.appendChild(div);
    });

    const matchingLocations = [];
    Object.keys(deviceHierarchy).forEach(company => {
        Object.keys(deviceHierarchy[company]).forEach(location => {
            const str = `${company} ${location}`.toLowerCase();
            if (terms.every(t => str.includes(t))) {
                matchingLocations.push({ company, location });
            }
        });
    });

    matchingLocations.forEach(match => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `<div class="list-item-content">${ICON_LOCATION} <div><div style="font-weight:600;">${escapeHTML(match.location)}</div><span class="item-subtitle">${escapeHTML(i18n[currentLang].locationFolder)} | ${escapeHTML(match.company)}</span></div></div>`;
        div.onclick = () => {
            currentViewCompany = match.company;
            currentViewLocation = match.location;
            document.getElementById('headerCompanyName').textContent = match.company;
            renderLocations(match.company);
            document.getElementById('headerLocationName').textContent = match.location;
            renderPrinters(match.company, match.location);
            slide(2);
        };
        list.appendChild(div);
    });

    const matchingPrinters = allDevicesFlat.filter(p => {
        const nick = localNicknames[p.serialNumber] || "";
        const str = `${p.companyName} ${p.locationName} ${p.modelName} ${nick} ${p.serialNumber} ${p.ip} ${p.mac}`.toLowerCase();
        return terms.every(t => str.includes(t));
    });

    matchingPrinters.slice(0, 50).forEach(printer => {
        const div = document.createElement('div');
        div.className = 'list-item';
        const dotClass = getStatusClass(printer.status);
        const displayName = localNicknames[printer.serialNumber] || printer.modelName;

        div.innerHTML = `<div class="list-item-content"><div style="position:relative;width:20px;height:20px;">${ICON_PRINTER}<span class="status-dot ${dotClass}"></span></div>
            <div><div style="font-weight:600;">${escapeHTML(displayName)}</div><span class="item-subtitle">SN: ${escapeHTML(printer.serialNumber)} | ${escapeHTML(printer.locationName)}</span></div></div>`;
        div.onclick = () => openPrinterDetails(printer);
        list.appendChild(div);
    });

    if (!matchingCompanies.length && !matchingLocations.length && !matchingPrinters.length) {
        list.innerHTML = `<div class="loading-text">${escapeHTML(i18n[currentLang].noMatching)}</div>`;
    }
}

async function openPrinterDetails(printer) {
    currentPrinter = printer; 
    
    document.getElementById('modelInput').style.display = 'none';
    document.getElementById('modelDisplay').style.display = 'block';
    document.getElementById('editNameBtn').style.display = 'block';

    document.getElementById('modelDisplay').textContent = localNicknames[printer.serialNumber] || printer.modelName;
    
    let lastSeenStr = i18n[currentLang].unknown || "Unknown";
    if (printer.lastUpdate) {
        const d = new Date(printer.lastUpdate);
        lastSeenStr = d.toLocaleDateString(currentLang === 'nl' ? 'nl-NL' : 'en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    }
    
    document.getElementById('lastUpdateDisplay').innerHTML = escapeHTML(lastSeenStr);
    document.getElementById('meterDisplay').innerHTML = escapeHTML((printer.totalPages || 0).toLocaleString(currentLang === 'nl' ? 'nl-NL' : 'en-US'));
    
    document.getElementById('networkDisplay').innerHTML = `
        <div class="network-badge" data-copy="${escapeHTML(printer.serialNumber)}" title="Click to copy">SN: ${escapeHTML(printer.serialNumber)}</div>
        <div class="network-badge" data-copy="${escapeHTML(printer.ip)}" title="Click to copy">IP: ${escapeHTML(printer.ip)}</div>
        <div class="network-badge" data-copy="${escapeHTML(printer.mac)}" title="Click to lookup vendor">MAC: ${escapeHTML(printer.mac)}</div>
        <div class="network-badge" data-copy="${escapeHTML(printer.hostname)}" title="Click to copy">HOST: ${escapeHTML(printer.hostname)}</div>`;

    document.getElementById('remoteBtn').style.display = 'block';
    document.getElementById('devicePageBtn').style.display = 'block';
    document.getElementById('driverBtn').style.display = 'block';
    document.getElementById('copySummaryBtn').style.display = 'block';
    
    document.getElementById('remoteBtn').onclick = () => window.open(`https://${BASE_DOMAIN}/ws/device/webPanel/${printer.id}`, '_blank');
    document.getElementById('devicePageBtn').onclick = () => window.open(`https://${BASE_DOMAIN}/device/${printer.id}/`, '_blank');
    document.getElementById('driverBtn').onclick = () => window.open(`https://www.google.com/search?q=${encodeURIComponent(printer.modelName + ' drivers manual')}`, '_blank');

    const { prefShowQR, prefShowTicket, prefTicketEmail } = await chrome.storage.local.get(['prefShowQR', 'prefShowTicket', 'prefTicketEmail']);
    
    if(prefShowQR) {
        document.getElementById('qrBtn').style.display = 'inline';
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(printer.serialNumber)}`;
        document.getElementById('qrImage').src = qrUrl;
        document.getElementById('qrContainer').classList.remove('open');
    } else {
        document.getElementById('qrBtn').style.display = 'none';
        document.getElementById('qrContainer').classList.remove('open');
    }

    if(prefShowTicket && prefTicketEmail) {
        const ticketBtn = document.getElementById('ticketBtn');
        ticketBtn.style.display = 'block';
        ticketBtn.onclick = () => {
            const subject = encodeURIComponent(`${i18n[currentLang].ticketSubj}${printer.serialNumber}`);
            const nameToUse = localNicknames[printer.serialNumber] || printer.modelName;
            const body = encodeURIComponent(`${i18n[currentLang].ticketBodyDevice}${nameToUse}\n${i18n[currentLang].copyModel} ${printer.modelName}\n${i18n[currentLang].ticketBodyLocation}${printer.companyName} - ${printer.locationName}\nIP: ${printer.ip}\n\n${i18n[currentLang].ticketBodyDesc}`);
            window.location.href = `mailto:${prefTicketEmail}?subject=${subject}&body=${body}`;
        };
    } else {
        document.getElementById('ticketBtn').style.display = 'none';
    }

    const noteKey = `note_${printer.serialNumber}`;
    const stored = await chrome.storage.local.get(noteKey);
    const textarea = document.getElementById('localNotes');
    const toggle = document.getElementById('notesToggle');
    textarea.value = stored[noteKey] || "";
    if (textarea.value) { textarea.classList.add('open'); toggle.classList.add('open'); }
    else { textarea.classList.remove('open'); toggle.classList.remove('open'); }

    loadPrinterData(printer.id);
    slide(3);
}

async function fetchSafeJson(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return res.json();
}

async function loadPrinterData(id) {
    const container = document.getElementById('supplies');
    const alertBox = document.getElementById('alertContainer');
    container.innerHTML = '<div class="skeleton"></div><div class="skeleton"></div>';
    alertBox.style.display = 'none';

    try {
        const [sup, al] = await Promise.all([
            fetchSafeJson(`${API_URL}/v1/supplies?deviceId=${encodeURIComponent(id)}`, {headers:{"App-auth-key":API_KEY}}),
            fetchSafeJson(`${API_URL}/v1/snmpalerts?deviceId=${encodeURIComponent(id)}&active=true`, {headers:{"App-auth-key":API_KEY}})
        ]);

        if (al.length) {
            alertBox.innerHTML = `<strong>\u26A0\uFE0F ${escapeHTML(i18n[currentLang].activeAlerts)}:</strong><br/>` + al.map(a => `- ${escapeHTML(translateAlert(a.description, currentLang))}`).join('<br/>');
            alertBox.style.display = 'block';
        }

        container.innerHTML = '';
        const groups = sup.reduce((acc, s) => {
            const t = (s.model?.type || 'OTHER').toUpperCase();
            (acc[t] = acc[t] || []).push(s);
            return acc;
        }, {});

        for (const [type, items] of Object.entries(groups)) {
            container.insertAdjacentHTML('beforeend', `<div class="supply-group-title">${escapeHTML(type)}</div>`);
            items.forEach(s => {
                const color = (s.model?.color || 'BLACK').toUpperCase();
                const level = s.level?.current ?? s.level ?? 0;
                let est = s.daysLeft ? `(~${s.daysLeft}d)` : s.pagesLeft ? `(~${s.pagesLeft}p)` : "";
                const bg = color.includes('CYAN') ? '#00AEEF' : color.includes('MAGENTA') ? '#EC008C' : color.includes('YELLOW') ? '#F2C80F' : 'var(--toner-black)';
                container.insertAdjacentHTML('beforeend', `<div class="toner-row"><div class="toner-labels"><span>${escapeHTML(color)}</span><span>${level}% ${escapeHTML(est)}</span></div>
                    <div class="toner-track"><div class="toner-fill" style="width:${level}%; background-color:${bg};"></div></div></div>`);
            });
        }
    } catch (e) { 
        console.warn("FleetCommand API Error:", e);
        container.innerHTML = '<div class="loading-text" style="font-size: 11px; color: var(--text-muted);">Error loading supplies data.</div>'; 
    }
}