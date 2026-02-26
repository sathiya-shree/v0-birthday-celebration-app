
# 🎂 Interactive 3D Birthday Celebration App

A high-end, interactive birthday experience built with **Next.js**, **Spline 3D**, and **Tailwind CSS**. This app features a responsive 3D monster cake, physics-based confetti fountains, and ambient audio to create a memorable digital celebration.

## 🚀 Live Demo

**Check out the live celebration here:** [https://birthday-celebration-app.vercel.app/](https://birthday-celebration-app.vercel.app/)

---

## ✨ Features

* **Interactive 3D Scene**: A custom-built 3D monster cake using Spline that users can interact with.
* **Confetti Fountain**: A 5-second celebratory confetti blast powered by `canvas-confetti`.
* **Immersive Audio**: Integrated party horn and ambient sounds using `howler.js`.
* **Glassmorphism UI**: A modern, dark-themed interface with gold accents and radial glows.
* **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
* **3D Engine**: [Spline](https://spline.design/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Animations**: Framer Motion & Lucide React
* **Libraries**: `howler`, `canvas-confetti`

---

## ⚙️ Local Setup

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

```


2. **Install dependencies:**
```bash
npm install

```


3. **Run the development server:**
```bash
npm run dev

```


4. **Open the app:**
Navigate to [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to see the magic.

---

## 📝 Customization

To personalize the message, navigate to `app/page.tsx` and update the `BirthdayMessage` component props or the main `h1` heading. To change the 3D model, update the URL in `components/spline-scene.tsx`.

---

## 📄 License

This project is open-source and available under the MIT License.

---
