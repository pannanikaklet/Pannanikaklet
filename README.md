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

Bokningsformuläret är statiskt och öppnar ett färdigifyllt mail till `boka@pannanikaklet.se`.
Vill du ha riktig formulärhantering senare kan du koppla på till exempel Formspree, Netlify Forms eller en egen backend.
