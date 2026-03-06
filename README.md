# 🖨️ Princity Monitor Extension

A sleek, lightweight browser extension for Chrome and Firefox that allows IT administrators and managed print service providers to monitor their Princity printer fleets directly from the browser toolbar.

<img width="355" height="323" alt="image" src="https://github.com/user-attachments/assets/78a45632-7cf4-49ad-a6fe-86f87b5250ba" />

---

## ✨ Features

* 📊 **Real-Time Supply Levels:** Instantly check toner, drum, and developer percentages with visual progress bars.
* 🔍 **Smart Search:** Quickly filter through hundreds of printers by Company Name, Model, or Serial Number.
* 🌍 **Custom Domain Support:** Works with standard `*.princity.cloud` environments as well as white-labeled custom domains.
* ⚡ **Quick Actions:** One-click access to a printer's Remote Web Panel or its detailed profile in the Princity dashboard.
* 🔒 **Secure by Design:** API keys and domain configurations are saved locally on your machine using strict browser sandboxing (`chrome.storage.local`). No data is sent to third parties.

---

## 🚀 Installation (Developer Mode)

While this extension is preparing for release on the official extension stores, you can install and run it locally right now.

### For Google Chrome / Microsoft Edge:
1. Download or clone this repository to your computer.
2. Open your browser and navigate to the extensions page:
   * Chrome: `chrome://extensions/`
   * Edge: `edge://extensions/`
3. Turn on **Developer mode** (usually a toggle in the top right corner).
4. Click the **Load unpacked** button.
5. Select the folder containing this extension's files.
6. Pin the extension to your toolbar for easy access!

### For Mozilla Firefox:
1. Download or clone this repository.
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click the **Load Temporary Add-on...** button.
4. Select the `manifest.json` file inside the extension folder.

---

## 🛠️ Usage Setup

To use the extension, you need an active Princity account and an API Key.

1. Click the extension icon in your toolbar.
2. Enter your Princity Domain (e.g., `demo.princity.cloud`).
3. Enter your Princity API Key.
4. Click **Connect Account**.
5. Search for a printer and view its stats!

---

## 💻 Tech Stack

* **HTML/CSS:** Custom, responsive UI with smooth CSS animations.
* **JavaScript:** Vanilla JS utilizing asynchronous API fetching and DOM manipulation.
* **Architecture:** Manifest V3 compatible.

---

## 🔒 Privacy & Security

This extension requires a Princity API Key to function. This key is stored securely and locally on the user's device utilizing native browser storage APIs. The extension only communicates directly with the Princity API endpoint provided by the user. The developer does not collect, transmit, store externally, or share the user's API key, usage data, or printer information with any third parties.
