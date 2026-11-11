"""Generate a privacy-conscious CV from the supplied CV and verified project work."""
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.pagesizes import A4
from pathlib import Path
out=Path('public/assets/veerendranadh-reddy-cv.pdf');out.parent.mkdir(parents=True,exist_ok=True)
styles=getSampleStyleSheet();styles.add(ParagraphStyle(name='CVTitle',fontSize=19,leading=23,textColor=colors.HexColor('#15334c'),spaceAfter=7));styles.add(ParagraphStyle(name='CVBody',fontSize=9,leading=12,spaceAfter=5));styles.add(ParagraphStyle(name='CVSection',fontSize=10,leading=13,textColor=colors.HexColor('#1c5875'),spaceBefore=11,spaceAfter=5));story=[]
def add(text,kind='CVBody'):story.append(Paragraph(text,styles[kind]))
add('VEERENDRANADH REDDY TANGIRALA','CVTitle')
add('MSc Cybersecurity and Data Science student | Python developer | Angers, France')
add('veerendranadhreddy11@gmail.com | github.com/veerendranadhreddy11')
add('linkedin.com/in/veerendranadhreddy-t-aa12aa444/')
add('PROFILE','CVSection');add('Computer science graduate pursuing an MSc at ESAIP. Interested in ethical hacking, vulnerability assessment, secure software development, and security operations. Building practical skills through Python tooling, authorized lab assessments, testing, and clear documentation.')
add('TECHNICAL SKILLS','CVSection');add('<b>Programming:</b> Python, Java, C. <b>Data:</b> MySQL.<br/><b>Security and systems:</b> Kali Linux, Nmap, Wireshark, Linux, Windows; ethical hacking and vulnerability assessment fundamentals.<br/><b>Networking:</b> TCP/IP, OSI model, DNS, HTTP/HTTPS. <b>Working skills:</b> problem solving, collaboration, adaptability, communication.')
add('PROJECTS','CVSection');add('<b>PentestMate - Personal security automation project</b><br/>Python CLI with an 11-option authorized assessment workflow. Nmap TCP service scans, analyst-managed findings, target-isolated records, evidence hashing, and PDF reporting. Documented Kali validation passed 25 tests, including real scans against an isolated local service. Source: github.com/veerendranadhreddy11/PentestMate.')
add('<b>AI-Driven General Physician Agent - Academic capstone, in development (May 2026 onward)</b><br/>Exploring Python-based data processing, model development, system evaluation, and automated recommendation concepts. No clinical efficacy or production deployment is claimed.')
add('<b>Future Fit College App - Academic project (November 2025)</b><br/>Application for college exploration, including search, filtering, information management, and comparison features.')
add('EXPERIENCE','CVSection');add('<b>Cybersecurity Intern | Future Interns | February 2026 | One month, online</b><br/>Cybersecurity fundamentals, ethical hacking concepts, vulnerability identification, system security basics, and exposure to network security and risk assessment.')
add('EDUCATION','CVSection');add('<b>MSc in Cybersecurity and Data Science</b> | ESAIP Graduate School of Engineering, Angers, France | 2026-present<br/><b>BTech in Computer Science and Engineering</b> | CMR University | 2022-2026')
add('CREDENTIALS AND LANGUAGES','CVSection');add('Cybersecurity Internship - Future Interns, February 2026.<br/>Full Stack Web Development with Java - QSpiders, October 2026.<br/><b>Languages:</b> English (fluent), Telugu (native), French (beginner).')
SimpleDocTemplate(str(out),pagesize=A4,leftMargin=40,rightMargin=40,topMargin=32,bottomMargin=30,title='Veerendranadh Reddy Tangirala - CV',author='Veerendranadh Reddy Tangirala').build(story)
print(out)
