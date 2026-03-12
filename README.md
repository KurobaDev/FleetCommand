# FleetCommand 🚀

FleetCommand is an enterprise-grade browser extension designed to accelerate workflows for managed print environments. It transforms basic API monitoring into a high-performance, interactive dashboard right in your browser.

With real-time SNMP alerting, advanced search capabilities, and deep device intelligence, FleetCommand gives support engineers and fleet managers instant access to the data they need, exactly when they need it.

## ✨ Key Features

### 🔍 Smart Search & Navigation
* **Global Smart Search:** Instantly filter across customers, locations, models, serial numbers, IPs, and MAC addresses. Optimized with debounce technology for lag-free typing.
* **Context Menu Integration:** Highlight any serial number or IP on a webpage, right-click, and select "Search in FleetCommand" to find the device instantly.
* **Dynamic Sorting:** Sort your fleet views by Alphabetical order, Total Pages (High to Low), or Last Seen (Recent).

### 🛠 Device Intelligence & Support
* **Real-Time SNMP Alerts:** Active hardware warnings (paper jams, toner low, maintenance required) are translated and displayed instantly.
* **Supply Tracking:** Visual toner levels with predictive estimates (days or pages left) based on real-time data.
* **Quick Support Tools:** Generate QR codes for easy asset scanning, or use the "Open Support Ticket" button to auto-draft an email containing all device metadata.
* **Persistent Local Notes:** Add local sticky notes to specific serial numbers to track onsite history, hardware quirks, or specific configurations.
* **One-Click Actions:** Access Web Panels, Portals, or auto-search for model drivers with a single click. Copy full device summaries to your clipboard instantly.

### 🎨 Personalization & Data Management
* **Multi-Language Support:** Fully localized in English and Dutch.
* **Custom Themes:** Choose from Light, Dark, The Matrix, Deep Ocean, Crimson Red, Forest Green, or Midnight Purple.
* **Compact Mode:** Toggle a condensed list view to fit more devices on your screen.
* **White-Labeling:** Customize the header app name to match your organization.
* **Data Portability:** Export your entire fleet inventory to CSV, or backup/restore your extension preferences via JSON.

---

## 🚀 Installation (Developer Mode)

### For Google Chrome / Microsoft Edge:

1. Download or clone this repository.
2. Navigate to `chrome://extensions/`.
3. Enable **Developer mode** (top right corner).
4. Click **Load unpacked** and select the extension folder.
5. Pin the extension to your toolbar!

### For Mozilla Firefox:

1. Dowload FleetCommandFirefox.zip from the latest release.
2. Unpack FleetCommandFirefox.zip into a folder.
3. Navigate to `about:debugging#/runtime/this-firefox`.
4. Click **Load Temporary Add-on...**.
5. Select the `manifest.json` file.

---

## 🛠️ Setup & Security

1. Click the icon in your toolbar.
2. Enter your **Princity Domain** and **API Key**.
3. **Connect Account** to sync your fleet data.

> **Privacy Note:** Your API Key and Local Notes are stored exclusively on your device using `chrome.storage.local`. This extension communicates directly with the API endpoint; no data ever touches third-party servers.

---

## 💻 Tech Stack

* **V3 Manifest:** Fully compliant with the latest browser extension standars.
* **Parallel Fetching:** Asynchronous architecture that loads supplies and alerts simultaneously for maximum speed.
* **Responsive UI:** Vanilla JS and CSS variables for a lightweight, zero-dependency experience.

---

## ⚖️ Disclaimer

**FleetCommand** is an independently developed third-party tool. It is not affiliated with, authorized, maintained, sponsored, or endorsed by **Princity** or any of its affiliates or subsidiaries. All product and company names are the registered trademarks of their original owners. The use of any trade name or trademark is for identification and compatibility purposes only.

---
