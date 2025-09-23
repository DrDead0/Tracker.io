# Tracker.io

**Tracker.io** is a real-time, privacy-first web application for live location sharing between devices. Designed for maximum accuracy and zero data retention, Tracker.io is perfect for personal device tracking, collaborative meetups, or any scenario where you want to share your live location—without ever storing or logging your data.

## 🚀 Features

- **Live, Real-Time Location Sharing:** Instantly see your own and other connected devices’ locations on a map (main tab only).
- **Privacy by Design:** No location data is ever stored, cached, or logged. All updates are ephemeral and exist only in memory.
- **Automatic Marker Removal:** When a device disconnects, its marker vanishes for all users—no history, no trace.

- **High Accuracy:** Uses the browser’s Geolocation API with high-accuracy mode enabled. Typical accuracy is 5–20 meters (95% confidence under good conditions).
- **No Account Needed:** Just open the site and start sharing your live location—no sign-up, no hassle.

## 🛡️ Privacy & Security

- **No Storage:** Tracker.io does **not** store, cache, or persist any location data—ever.
- **No Tracking:** No user accounts, no analytics, no tracking cookies.
- **Session-Only:** All data is kept in memory and is lost as soon as you disconnect or close the tab.
- **You’re in Control:** Your location is only visible while you’re connected. Disconnecting removes your marker for everyone.


## 📏 Accuracy

- **Typical Accuracy:** 5–20 meters (varies by device, browser, and environment).
- **No Caching:** Only the most recent, live location is kept in memory.
- **No History:** Once a device disconnects, its location is immediately forgotten.


## 🖥️ Usage

1. **Start the server:**  
	```bash
	node script.js
	```
2. **Open in your browser:**  
	Visit [http://localhost:3000](http://localhost:3000)
3. **Allow location access** when prompted.
4. **Open the site on another device or tab** to see live location sharing in action.

## ⚙️ Requirements

- Node.js (v14+ recommended)
- Modern browser with Geolocation API support

## 💡 How It Works

- When you open Tracker.io, your browser requests your current location and shares it in real time with other connected devices.
- The main tab displays all active users’ locations. Other tabs/devices only see their own marker.
- When you close a tab or leave the site, your marker is removed for everyone else.
- No location data is ever written to disk, database, or log files.





**Tracker.io** – Real-time, accurate, and privacy-first location sharing.
