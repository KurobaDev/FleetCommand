# 🚀 FleetCommand

**FleetCommand** is a high-performance browser extension designed for IT Professionals and Managed Print Service (MPS) providers. It transforms the way you interact with fleet data, bridging the gap between your browser-based workflow and your **Princity** environment.

---

## ✨ Advanced Features

* 🔍 **Tokenized Smart Search:** Search by combining terms like `Customer + IP`, `Model + Serial`, or `Location + SN`. The engine splits your query and searches across all metadata simultaneously.
* 🖱️ **Context-Aware Searching:** Highlight any text (Serial, IP, or Model) on any webpage, right-click, and instantly find that device in FleetCommand.
* ⚠️ **Live SNMP Alerts:** View active hardware warnings (paper jams, low staples, maintenance needs) in real-time with Unicode-supported formatting.
* 📉 **Predictive Supply Tracking:** Monitor color-coded supply levels with intelligent estimates for remaining days (`daysLeft`) or pages.
* 📝 **Local Sticky Notes:** Attach persistent, private notes to specific printers. Perfect for tracking onsite quirks or physical locations without cluttering the server.
* ⚡ **Quick-Action Suite:** Instant access to secure Remote Web Panels, portals, and automated Google searches for model-specific drivers and manuals.
* 🎨 **Premium UX:** "Dark-mode first" aesthetic featuring skeleton loaders for smooth transitions and high-visibility status glow indicators.

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
