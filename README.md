# P.I.K - Pannan I Kaklet

Statisk version av hemsidan för P.I.K - Pannan I Kaklet, redo för GitHub Pages.

## Kör lokalt

Öppna `index.html` direkt i webbläsaren, eller kör en enkel lokal server i projektmappen:

```bash
python3 -m http.server 5173
```

## Publicera på GitHub Pages

1. Skapa ett nytt GitHub-repo och pusha projektet till branchen `main`.
2. Gå till `Settings` -> `Pages`.
3. Välj `GitHub Actions` som källa.
4. Pusha en ändring till `main`, eller kör workflowet `Deploy to GitHub Pages` manuellt.

Bokningsformuläret skickas via FormSubmit till `pannanikaklet@gmail.com`.
Besökaren får ett automatiskt bekräftelsemail till adressen de anger i fältet `E-post`.
Första gången formuläret skickas från den publicerade sidan skickar FormSubmit ett verifieringsmail till adressen som behöver godkännas.
