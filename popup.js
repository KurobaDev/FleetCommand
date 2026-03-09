let API_URL = "";
let BASE_DOMAIN = "";
let API_KEY = "";
let deviceHierarchy = {}; 
let allDevicesFlat = [];
let currentPrinterSerial = "";

const CACHE_VERSION = 3; 

const ICON_SUN = `<svg viewBox="0 0 24 24"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18.75a.75.75 0 01.75.75V21.75a.75.75 0 01-1.5 0V19.5a.75.75 0 01.75-.75zM6.166 17.834a.75.75 0 001.06 1.06l1.591-1.59a.75.75 0 10-1.06-1.061l-1.591 1.59zM4.5 12a.75.75 0 01-.75.75H1.5a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM6.166 6.166a.75.75 0 001.06 1.06l1.59-1.591a.75.75 0 00-1.061-1.06l-1.59 1.591z"/></svg>`;
const ICON_MOON = `<svg viewBox="0 0 24 24"><path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/></svg>`;
const ICON_PRINTER = `<svg style="width:20px;height:20px;fill:currentColor;opacity:0.7;" viewBox="0 0 24 24"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>`;
const ICON_COMPANY = `<svg style="width:20px;height:20px;fill:currentColor;opacity:0.7;" viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>`;

function getStatusClass(status) {
    if (!status) return "status-inactive";
    if (status === "ACTIVE") return "status-active";
    if (status === "NOT_RESPONDING") return "status-offline";
    return "status-inactive"; 
}

document.addEventListener('DOMContentLoaded', async () => {
    const themeBtn = document.getElementById('themeToggleBtn');
    const { theme } = await chrome.storage.local.get('theme');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeBtn.innerHTML = ICON_SUN;
    } else {
        themeBtn.innerHTML = ICON_MOON;
    }

    themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            chrome.storage.local.set({ theme: 'light' });
            themeBtn.innerHTML = ICON_MOON;
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            chrome.storage.local.set({ theme: 'dark' });
            themeBtn.innerHTML = ICON_SUN;
        }
    });

    document.getElementById('backBtn1').addEventListener('click', () => slide(0));
    document.getElementById('backBtn2').addEventListener('click', () => slide(1));
    document.getElementById('backBtn3').addEventListener('click', () => {
        slide(document.getElementById('searchInput').value ? 0 : 2);
    });

    const notesToggle = document.getElementById('notesToggle');
    const notesTextarea = document.getElementById('localNotes');
    notesToggle.addEventListener('click', () => {
        notesToggle.classList.toggle('open');
        notesTextarea.classList.toggle('open');
    });

    let saveTimeout;
    notesTextarea.addEventListener('input', () => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            if (currentPrinterSerial) {
                chrome.storage.local.set({ [`note_${currentPrinterSerial}`]: notesTextarea.value });
            }
        }, 400);
    });

    document.getElementById('networkDisplay').addEventListener('click', (e) => {
        const badge = e.target.closest('.network-badge');
        if (badge && badge.dataset.copy) {
            navigator.clipboard.writeText(badge.dataset.copy);
            const original = badge.innerHTML;
            badge.innerHTML = "Copied! \u2713"; 
            setTimeout(() => { badge.innerHTML = original; }, 1500);
        }
    });

    const { apiKey, domain, deviceCache, flatCache, cacheVersion, pendingSearch } = await chrome.storage.local.get(['apiKey', 'domain', 'deviceCache', 'flatCache', 'cacheVersion', 'pendingSearch']);
    
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
                if (chrome.action) chrome.action.setBadgeText({ text: "" }); 
            }
        } else {
            fetchDevices(true);
        }
    } else {
        document.getElementById('setup').style.display = 'block';
    }

    document.getElementById('saveKey').addEventListener('click', () => {
        const key = document.getElementById('apiKey').value.trim();
        let dom = document.getElementById('domain').value.trim();
        dom = dom.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
        if (key && dom) {
            chrome.storage.local.set({ apiKey: key, domain: dom }, () => location.reload());
        }
    });

    document.getElementById('searchInput').addEventListener('input', (e) => {
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
    });

    document.getElementById('locationSearchInput').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const currentCompany = document.getElementById('headerCompanyName').textContent;
        renderLocations(currentCompany, query);
    });

    document.getElementById('syncBtn').addEventListener('click', (e) => {
        const icon = e.currentTarget.querySelector('svg');
        icon.classList.add('spinning');
        fetchDevices(false).finally(() => icon.classList.remove('spinning'));
    });
});

function slide(index) {
    document.getElementById('sliderTrack').style.transform = `translateX(-${index * 25}%)`;
}

async function fetchDevices(showLoadingUI) {
    const compList = document.getElementById('companyList');
    if (showLoadingUI) compList.innerHTML = '<div class="skeleton"></div><div class="skeleton"></div>';

    try {
        const res = await fetch(`${API_URL}/v3/devices`, {
            method: 'POST',
            headers: { "Content-Type": "application/json", "App-auth-key": API_KEY },
            body: JSON.stringify({
                cursorParams: { offset: 0, limit: 1000, filters: [], orders: [] },
                fieldIds: ["Device.id", "Device.model.name", "Device.serialNumber", "Device.company.name", "Device.location.name", "Device.status", "Device.counter.mono", "Device.counter.color", "Device.ip", "Device.mac", "Device.hostname", "Device.lastUpdate"]
            })
        });

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
        await chrome.storage.local.set({ deviceCache: tree, flatCache: flatList, cacheVersion: CACHE_VERSION });
        renderCompanies();
    } catch (err) { console.error(err); }
}

function renderCompanies() {
    const list = document.getElementById('companyList');
    list.innerHTML = '';
    Object.keys(deviceHierarchy).sort().forEach(company => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `<div class="list-item-content">${ICON_COMPANY} <div style="font-weight:600;">${company}</div></div>`;
        div.onclick = () => {
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
        div.innerHTML = `<div><div style="font-weight:600;">${location}</div> <span class="item-subtitle">${deviceHierarchy[company][location].length} device(s)</span></div>`;
        div.onclick = () => {
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
    deviceHierarchy[company][location].sort((a,b) => a.modelName.localeCompare(b.modelName)).forEach(printer => {
        const div = document.createElement('div');
        div.className = 'list-item';
        const dotClass = getStatusClass(printer.status);
        div.innerHTML = `<div class="list-item-content"><div style="position:relative;width:20px;height:20px;">${ICON_PRINTER}<span class="status-dot ${dotClass}"></span></div>
            <div><div style="font-weight:600;">${printer.modelName}</div><span class="item-subtitle">SN: ${printer.serialNumber}</span></div></div>`;
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
        div.innerHTML = `<div class="list-item-content">${ICON_COMPANY} <div><div style="font-weight:600;">${company}</div><span class="item-subtitle">Company Profile</span></div></div>`;
        div.onclick = () => {
            document.getElementById('headerCompanyName').textContent = company;
            document.getElementById('locationSearchInput').value = '';
            renderLocations(company);
            slide(1);
        };
        list.appendChild(div);
    });
    const matchingPrinters = allDevicesFlat.filter(p => {
        const str = `${p.companyName} ${p.locationName} ${p.modelName} ${p.serialNumber} ${p.ip} ${p.mac}`.toLowerCase();
        return terms.every(t => str.includes(t));
    });
    matchingPrinters.slice(0, 50).forEach(printer => {
        const div = document.createElement('div');
        div.className = 'list-item';
        const dotClass = getStatusClass(printer.status);
        div.innerHTML = `<div class="list-item-content"><div style="position:relative;width:20px;height:20px;">${ICON_PRINTER}<span class="status-dot ${dotClass}"></span></div>
            <div><div style="font-weight:600;">${printer.modelName}</div><span class="item-subtitle">SN: ${printer.serialNumber} | ${printer.companyName}</span></div></div>`;
        div.onclick = () => openPrinterDetails(printer);
        list.appendChild(div);
    });
    if (!matchingCompanies.length && !matchingPrinters.length) {
        list.innerHTML = '<div class="loading-text">No matching customers or devices found.</div>';
    }
}

async function openPrinterDetails(printer) {
    document.getElementById('modelDisplay').textContent = printer.modelName;
    let lastSeenStr = "Unknown";
    if (printer.lastUpdate) {
        const d = new Date(printer.lastUpdate);
        lastSeenStr = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    }
    document.getElementById('lastUpdateDisplay').innerHTML = `Last Seen: <strong>${lastSeenStr}</strong>`;
    document.getElementById('meterDisplay').innerHTML = `Total Pages: <strong>${(printer.totalPages || 0).toLocaleString('en-US')}</strong>`;
    document.getElementById('networkDisplay').innerHTML = `
        <div class="network-badge" data-copy="${printer.ip}">IP: ${printer.ip}</div>
        <div class="network-badge" data-copy="${printer.mac}">MAC: ${printer.mac}</div>
        <div class="network-badge" data-copy="${printer.hostname}">HOST: ${printer.hostname}</div>`;
    document.getElementById('remoteBtn').style.display = 'block';
    document.getElementById('devicePageBtn').style.display = 'block';
    document.getElementById('driverBtn').style.display = 'block';
    document.getElementById('remoteBtn').onclick = () => window.open(`https://${BASE_DOMAIN}/ws/device/webPanel/${printer.id}`, '_blank');
    document.getElementById('devicePageBtn').onclick = () => window.open(`https://${BASE_DOMAIN}/device/${printer.id}/`, '_blank');
    document.getElementById('driverBtn').onclick = () => window.open(`https://www.google.com/search?q=${encodeURIComponent(printer.modelName + ' drivers manual')}`, '_blank');
    currentPrinterSerial = printer.serialNumber;
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

async function loadPrinterData(id) {
    const container = document.getElementById('supplies');
    const alertBox = document.getElementById('alertContainer');
    container.innerHTML = '<div class="skeleton"></div><div class="skeleton"></div>';
    alertBox.style.display = 'none';
    try {
        const [sup, al] = await Promise.all([
            fetch(`${API_URL}/v1/supplies?deviceId=${encodeURIComponent(id)}`, {headers:{"App-auth-key":API_KEY}}).then(r => r.json()),
            fetch(`${API_URL}/v1/snmpalerts?deviceId=${encodeURIComponent(id)}&active=true`, {headers:{"App-auth-key":API_KEY}}).then(r => r.json())
        ]);
        if (al.length) {
            alertBox.innerHTML = `<strong>\u26A0\uFE0F Active Alerts:</strong><br/>` + al.map(a => `- ${a.description}`).join('<br/>');
            alertBox.style.display = 'block';
        }
        container.innerHTML = '';
        const groups = sup.reduce((acc, s) => {
            const t = (s.model?.type || 'OTHER').toUpperCase();
            (acc[t] = acc[t] || []).push(s);
            return acc;
        }, {});
        for (const [type, items] of Object.entries(groups)) {
            container.insertAdjacentHTML('beforeend', `<div class="supply-group-title">${type}</div>`);
            items.forEach(s => {
                const color = (s.model?.color || 'BLACK').toUpperCase();
                const level = s.level?.current ?? s.level ?? 0;
                let est = s.daysLeft ? `(~${s.daysLeft}d)` : s.pagesLeft ? `(~${s.pagesLeft}p)` : "";
                const bg = color.includes('CYAN') ? '#00AEEF' : color.includes('MAGENTA') ? '#EC008C' : color.includes('YELLOW') ? '#F2C80F' : 'var(--toner-black)';
                container.insertAdjacentHTML('beforeend', `<div class="toner-row"><div class="toner-labels"><span>${color}</span><span>${level}% ${est}</span></div>
                    <div class="toner-track"><div class="toner-fill" style="width:${level}%; background-color:${bg};"></div></div></div>`);
            });
        }
    } catch (e) { container.innerHTML = '<div class="loading-text">Error loading supplies.</div>'; }
}