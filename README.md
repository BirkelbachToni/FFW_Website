# Feuerwehrwebsite Wasserknoden – Modernisierung

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![WebStorm](https://img.shields.io/badge/Built%20with-WebStorm-000000.svg)](https://www.jetbrains.com/webstorm/)

Modernisierung der Website der Freiwilligen Feuerwehr Wasserknoden mit Schwerpunkt auf **Security**, **Performance** und **Responsive Design**.


## 🚀 Features
- **Security-by-Design**: CSP, HSTS, reCAPTCHA v3, Security Headers.
- **Moderne Technologien**: Tailwind CSS, 11ty Static Site Generator.
- **Optimierte Performance**: Lazy Loading, WebP-Bilder via Squoosh, Webpack-Bundling.
- **Barrierefreiheit**: WCAG-konform (getestet mit WAVE).

## 🔧 Technologien & Tools
| Kategorie       | Tools                                                                                     |
|-----------------|------------------------------------------------------------------------------------------|
| **Frontend**    | Tailwind CSS, HTML5, JavaScript (Vanilla)                                                |
| **Build**       | Webpack, 11ty                                                                           |
| **Security**    | reCAPTCHA v3, SecurityHeaders.com, Mozilla Observatory                                   |
| **Performance** | Lighthouse, GTmetrix, Squoosh (Bildoptimierung)                                         |
| **Testing**     | WAVE (Accessibility), SSL Labs Test (SSL-Konfiguration)                                 |
| **Hosting**     | Formspree (Kontaktformular)                                                             |

## 🛡️ Implementierte Sicherheitsmaßnahmen
- **Security-Headers**: CSP, X-Content-Type-Options, X-Frame-Options, HSTS.
- **HTTPS-Erzwingung**: Redirect von HTTP zu HTTPS (getestet via SSL Labs).
- **reCAPTCHA v3**: Anti-Bot-Protection für das Kontaktformular.
- **Statische Generierung**: Kein Backend-Risiko dank 11ty.
- **Regelmäßige Scans**: Automatisierte Checks mit Mozilla Observatory.

## 📦 Installation
1. **Klone das Repository**:
   ```bash
   git clone https://github.com/dein-benutzer/ffw-wasserknoden.git
   cd ffw-wasserknoden
   ```

2. **Installiere Abhängigkeiten:**
   ```bash
   npm install
   ```

3. **Starte den Dev-Server
   ```bash
   npm run dev # Kombiniert 11ty & Webpack
   ```

4. Produktionsbuild erstellen
   ```bash
   npm run build  # Optimiere Assets für Deployment
   ```

---

## 🛡️ Security-Checks (Manuelle Tests)
```bash
# Prüfe Security-Headers mit Mozilla Observatory
npx observatory https://ffw.wasserknoden.com

# Teste SSL/TLS-Konfiguration
curl -I https://ffw.wasserknoden.com
```

---

## 📚 Ressourcen
- [**OWASP Secure Headers Project**](https://owasp.org/www-project-secure-headers/)
- [**Google reCAPTCHA v3 Docs**](https://developers.google.com/recaptcha/docs/v3?hl=de)
- [**11ty Static Site Generator**](https://www.11ty.dev/docs/)

---

## 📄 Lizenz
**MIT License** – [Lizenz](LICENSE)  
Copyright © 2025 BirkelbachToni / Freiwillige Feuerwehr Wasserknoden
