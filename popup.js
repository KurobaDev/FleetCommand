let API_URL = "";
let BASE_DOMAIN = "";
let deviceList = [];

document.addEventListener('DOMContentLoaded', async () => {
    const { apiKey, domain } = await chrome.storage.local.get(['apiKey', 'domain']);
    
    if (apiKey && domain) {
        BASE_DOMAIN = domain;
        API_URL = `https://${domain}/api`;
        initApp(apiKey);
    } else {
        document.getElementById('setup').style.display = 'block';
    }

    document.getElementById('saveKey').addEventListener('click', () => {
        const key = document.getElementById('apiKey').value.trim();
        let dom = document.getElementById('domain').value.trim();
        
        dom = dom.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
        
        if (key && dom) {
            chrome.storage.local.set({ apiKey: key, domain: dom }, () => location.reload());
        } else {
            alert("Please enter both a Domain and an API Key.");
        }
    });

    document.getElementById('searchInput').addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        renderDropdown(deviceList.filter(d => 
            d.modelName.toLowerCase().includes(q) || 
            d.serialNumber.toLowerCase().includes(q) || 
            d.companyName.toLowerCase().includes(q)
        ));
    });
});

async function initApp(key) {
    const errorLog = document.getElementById('errorLog');
    
    try {
        const res = await fetch(`${API_URL}/v3/devices`, {
            method: 'POST',
            headers: { "Content-Type": "application/json", "App-auth-key": key },
            body: JSON.stringify({
                cursorParams: { offset: 0, limit: 1000, filters: [], orders: [] },
                fieldIds: ["Device.id", "Device.model.name", "Device.serialNumber", "Device.company.name"]
            })
        });

        if (!res.ok) throw new Error("Connection failed. Check your Domain and API Key.");

        const { entries = [] } = await res.json();
        
        deviceList = entries.map(d => ({
            id: d.id || "",
            modelName: d.model?.name || d["Device.model.name"] || "Unknown",
            serialNumber: d.serialNumber || d["Device.serialNumber"] || "N/A",
            companyName: d.company?.name || d["Device.company.name"] || "General"
        }));

        document.getElementById('setup').style.display = 'none';
        document.getElementById('main').style.display = 'block';
        
        renderDropdown(deviceList);

        document.getElementById('printerSelect').addEventListener('change', (e) => {
            const id = e.target.value;
            const target = deviceList.find(d => d.id === id);
            
            const btnRemote = document.getElementById('remoteBtn');
            const btnPage = document.getElementById('devicePageBtn');
            const supplyDiv = document.getElementById('supplies');
            
            if (target) {
                document.getElementById('modelDisplay').textContent = `${target.companyName} | ${target.modelName}`;
                btnRemote.style.display = 'block';
                btnPage.style.display = 'block';
                loadSupplies(id, key);
            } else {
                btnRemote.style.display = 'none';
                btnPage.style.display = 'none';
                supplyDiv.innerHTML = '<div style="color: #94a3b8; font-size: 13px; text-align: center; padding: 16px 0;">No device selected</div>';
            }
        });

    } catch (err) {
        errorLog.textContent = err.message;
        errorLog.style.display = 'block';
        
        document.getElementById('setup').style.display = 'block';
        document.getElementById('main').style.display = 'none';
        chrome.storage.local.clear();
    }
}

function renderDropdown(devices) {
    const select = document.getElementById('printerSelect');
    select.innerHTML = `<option value="">Select a Printer (${devices.length})</option>`;
    
    devices.sort((a, b) => a.companyName.localeCompare(b.companyName))
           .forEach(item => {
               const opt = new Option(`${item.companyName} - ${item.modelName} (${item.serialNumber})`, item.id);
               select.add(opt);
           });
}

async function loadSupplies(id, key) {
    const container = document.getElementById('supplies');
    container.innerHTML = '<div style="text-align:center; padding: 10px; color:#888;"><i>Loading...</i></div>';

    try {
        const res = await fetch(`${API_URL}/v1/supplies?deviceId=${encodeURIComponent(id)}`, {
            headers: { "App-auth-key": key }
        });

        const data = await res.json();
        const supplies = Array.isArray(data) ? data : [];
        
        container.innerHTML = '';
        
        if (!supplies.length) {
            container.innerHTML = '<div style="color:#d9534f; font-size:12px;">No supply data reported.</div>';
            return;
        }

        const groups = supplies.reduce((acc, s) => {
            const type = (s.model?.type || 'OTHER').toUpperCase();
            (acc[type] = acc[type] || []).push(s);
            return acc;
        }, {});

        for (const [type, items] of Object.entries(groups)) {
            container.insertAdjacentHTML('beforeend', `<div class="supply-group-title">${type}</div>`);

            items.forEach(s => {
                const color = (s.model?.color || 'BLACK').toUpperCase();
                const level = s.level?.current ?? s.level ?? 0;
                
                const bg = color.includes('CYAN') ? '#00AEEF' : 
                           color.includes('MAGENTA') ? '#EC008C' : 
                           color.includes('YELLOW') ? '#F2C80F' : '#2C3E50';

                container.insertAdjacentHTML('beforeend', `
                    <div class="toner-row">
                        <div class="toner-labels"><span>${color}</span><span>${level}%</span></div>
                        <div class="toner-track"><div class="toner-fill" style="width:${level}%; background-color:${bg};"></div></div>
                    </div>
                `);
            });
        }

        document.getElementById('remoteBtn').onclick = () => window.open(`https://${BASE_DOMAIN}/ws/device/webPanel/${id}`, '_blank');
        document.getElementById('devicePageBtn').onclick = () => window.open(`https://${BASE_DOMAIN}/device/${id}/`, '_blank');

    } catch (err) {
        container.innerHTML = '<div style="color:#d9534f; font-size:12px;">Connection error.</div>';
    }
}