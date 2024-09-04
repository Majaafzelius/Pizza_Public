## Projektet - Den publika webbplatsen
Den publika delen av slutprojketet i kursen Webbutveckling III. På denna Webbsidan kan besökare läsa om restaurungen och se menyn. Det finns även funktionalitet för att beställa mat för takeaway. Dock sparas beställningar inte i en databas eller annat liknande sätt.
Gulp har använts för att enkelt och smidigt utveckla koden som krävts. Filerna i mappen src är source-filer som skrivits och sedan minifierats, konverterats och konkatinerats. Dessa filer har sedan flyttats till mappen pub. I denna mappen hittas alla de filer som behövs för webbsidan. Det är filerna i denna mapp som sedan publiceras på webbservern.
<br>De gulp-paket som använts för att utveckla denna kod är följande: 
<ul>
  <li>gulp-concat</li>
  <li>gulp-uglify-es</li>
  <li>gulp-sass</li>
  <li>node-sass</li>
  <li>browser-sync</li>
</ul>
