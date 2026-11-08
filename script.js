const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 761px)').addEventListener('change', (event) => {
  if (event.matches) closeMenu();
});
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('veerendranadhreddy11@gmail.com');
    status.textContent = 'Email copied.';
  } catch {
    status.textContent = 'Use the email link above to get in touch.';
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navigation.querySelectorAll('a').forEach((link) => {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -60% 0px' });
  document.querySelectorAll('main > section[id], .about-section').forEach((section) => observer.observe(section));
}

// The portfolio console displays local portfolio information only.
const consoleOutput = document.querySelector('#console-output');
const consoleInput = document.querySelector('#console-input');
const commandHistory = [];
let historyIndex = 0;
const portfolioCommands = {
  help: 'AVAILABLE PORTFOLIO COMMANDS\n\nwhoami       Background and current studies\nprojects     Explore selected projects\nskills       Programming and security toolkit\nlab          Recorded PentestMate validation notes\ncontact      Contact information\nclear        Clear the console\n\nUse the tabs or type a command below.',
  whoami: 'VEERENDRANADH REDDY TANGIRALA\nMSc Cybersecurity & Data Science / ESAIP\nAngers, France\n\nComputer science graduate building practical skills\nin authorized assessment and Python automation.\n\nFocus: learn, build, validate, and document.',
  projects: 'SELECTED WORK\n\n[01] PentestMate\n     Python / Nmap / evidence integrity / PDF reports\n     11-option assessment workflow, 25 tests passed.\n\n[02] AI-Driven General Physician Agent\n     Python healthcare capstone, in development.\n\n[03] Future Fit College App\n     Search, filtering, and college comparisons.\n\nThe case studies section contains details and links.',
  skills: 'THE WORKBENCH\n\nCODE        Python / Java / C / MySQL\nSECURITY    Kali Linux / Nmap / Wireshark\nNETWORKS    TCP/IP / DNS / HTTP(S) / OSI model\nSYSTEMS     Linux / Windows\n\nDeveloping: vulnerability assessment fundamentals,\nsecurity automation, and evidence-led reporting.',
  lab: 'PENTESTMATE / RECORDED LAB NOTES\n\nSource: documented isolated Kali validation run.\nThis is saved project evidence, not a live scan.\n\nTarget          127.0.0.1 (local test service)\nOpen service    TCP 8000 / HTTP\nRule matches    0\nManual finding  1 synthetic / False Positive\nEvidence        SHA-256 verified\nTests           25 / 25 passed on Kali\n\nFull recording and validation record: case studies.',
  contact: 'CONTACT / OPEN TO LEARNING OPPORTUNITIES\n\nEmail: veerendranadhreddy11@gmail.com\nGitHub: github.com/veerendranadhreddy11\nLocation: Angers, France\n\nInterested in cybersecurity internships, practical\nprojects, and thoughtful technical conversations.'
};
function runPortfolioCommand(value) {
  const raw = value.trim().slice(0, 100);
  const command = raw.toLowerCase();
  if (!command) return;
  document.querySelectorAll('.console-tabs button').forEach((button) => {
    button.classList.toggle('active', button.dataset.command === command);
  });
  if (command === 'clear') {
    consoleOutput.replaceChildren();
    return;
  }
  const entry = document.createElement('div');
  entry.className = 'console-entry';
  const prompt = document.createElement('p');
  prompt.className = 'console-command';
  const prefix = document.createElement('span');
  prefix.textContent = 'vr@portfolio:~$';
  prompt.append(prefix, document.createTextNode(' ' + raw));
  const answer = document.createElement('div');
  answer.className = 'console-answer';
  answer.textContent = portfolioCommands[command] || 'Command not found. Type help for portfolio commands.';
  entry.append(prompt, answer);
  consoleOutput.append(entry);
  while (consoleOutput.children.length > 12) consoleOutput.firstElementChild.remove();
  consoleOutput.scrollTop = entry.offsetTop - consoleOutput.offsetTop;
}
document.querySelector('#console-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const value = consoleInput.value.trim();
  if (!value) return;
  commandHistory.push(value);
  historyIndex = commandHistory.length;
  runPortfolioCommand(value);
  consoleInput.value = '';
});
document.querySelectorAll('.console-tabs button').forEach((button) => {
  button.addEventListener('click', () => runPortfolioCommand(button.dataset.command));
});
consoleInput.addEventListener('keydown', (event) => {
  if (!['ArrowUp', 'ArrowDown'].includes(event.key)) return;
  event.preventDefault();
  historyIndex = Math.min(commandHistory.length, Math.max(0, historyIndex + (event.key === 'ArrowUp' ? -1 : 1)));
  consoleInput.value = commandHistory[historyIndex] || '';
});
