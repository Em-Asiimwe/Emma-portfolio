# Emma Asiimwe — Software Engineer Portfolio

A modern, responsive portfolio website for Emma Asiimwe, showcasing software engineering projects, technical expertise, research work, and contact information.

## Overview

The portfolio is designed to present Emma's work through concise case studies and an interactive user experience. It includes project galleries, animated statistics, category filters, scroll-reveal effects, responsive navigation, social links, resume downloads, and a functional Web3Forms contact form.

## Features

- Responsive dark-themed interface for desktop and mobile
- Hero section with calls to action and resume download
- About section with expertise cards and animated project-area counter
- Technical expertise overview
- Interactive project filters
- Case-study layouts for:
  - QuickMed Healthcare Application
  - Military Communication Security System
  - Swahara Platform
- Responsive project screenshot galleries
- Scroll-reveal animations and hover interactions
- LinkedIn, GitHub, email, and WhatsApp contact links
- Web3Forms contact submission with success and error notifications
- Accessible labels, focus states, reduced-motion support, and semantic HTML
- Standalone PowerShell development server

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome
- Web3Forms
- PowerShell `HttpListener` development server

## Project structure

```text
Emma-portfolio/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── documents/
│   │   └── Emma-Asiimwe-Resume.pdf
│   ├── images/
│   │   ├── profile.png
│   │   └── projects/
│   └── js/
│       └── script.js
├── index.html
├── serve.ps1
└── README.md
```

## Run locally

Open PowerShell in the project directory:

```powershell
cd C:\src\Emma-portfolio
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```

Then open:

```text
http://localhost:5500
```

Press `Ctrl + C` in the terminal to stop the server.

To use another port:

```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1 -Port 5501
```

## Contact form setup

The contact form uses [Web3Forms](https://web3forms.com/) and requires an access key.

1. Create a Web3Forms access key for `emmyimmanuelasiimwe@gmail.com`.
2. Open `index.html`.
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in the hidden form field with your key.
4. Submit a test message and confirm the success notification and email delivery.

## Resume

The download button expects the resume at:

```text
assets/documents/Emma-Asiimwe-Resume.pdf
```

Keep this filename and path unless the download link in `index.html` is updated.

## Deployment

This is a static website and can be deployed using GitHub Pages, Netlify, or Vercel.

For GitHub Pages:

1. Push the project to a GitHub repository.
2. Open **Settings → Pages**.
3. Select **Deploy from a branch**.
4. Choose the `main` branch and `/ (root)` folder.

## Customization

- Update personal content, project details, and links in `index.html`.
- Update colors, layout, responsive behavior, and animations in `assets/css/style.css`.
- Update interaction logic in `assets/js/script.js`.
- Replace project screenshots in `assets/images/projects/`.
- Replace the profile image at `assets/images/profile.png`.

## Contact

- Email: [emmyimmanuelasiimwe@gmail.com](mailto:emmyimmanuelasiimwe@gmail.com)
- LinkedIn: [Emma Asiimwe](https://www.linkedin.com/in/emma-emmy-asiimwe-501a09369/)
- GitHub: [Em-Asiimwe](https://github.com/Em-Asiimwe)
- WhatsApp: [Chat on WhatsApp](https://wa.me/256740372862)
