import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';

const en = {
  // General
  "or": "Or",
  "progress": "Progress",
  "summary": "Summary",
  "date": "Date",
  "video": "VIDEO",
  "audio": "AUDIO",
  "text": "TEXT",
  "free": "FREE",
  "locale": "en-US",

  // Landing Page
  "heroTitle": "The Future of Learning is Here.",
  "heroSubtitle": "Welcome to Geeddi, the AI-powered academy where technology education is always current, engaging, and tailored for you.",
  "startLearningNow": "Start Learning Now",
  "whyGeeddiTitle": "Why Geeddi?",
  "whyGeeddiSubtitle": "An unparalleled learning experience.",
  "feature1Title": "AI-Powered Content",
  "feature1Desc": "Our curriculum is generated and updated by AI, ensuring you learn the most relevant and up-to-date skills in tech.",
  "feature2Title": "Interactive Learning",
  "feature2Desc": "Engage with dynamic modules, practical examples, and quizzes that test your knowledge every step of the way.",
  "feature3Title": "Accessible to Everyone",
  "feature3Desc": "With a mix of free and premium courses, Geeddi makes high-quality tech education available to all learners.",
  "testimonialsTitle": "Loved by Learners Worldwide",
  "testimonial1Text": "\"The AI course was phenomenal. The content was so fresh, it felt like I was learning about discoveries made yesterday!\"",
  "testimonial2Text": "\"Finally, a platform that keeps up with the pace of technology. The premium courses are worth every penny.\"",
  "testimonial3Text": "\"I started as a complete beginner, and now I feel confident discussing machine learning concepts. Thank you, Geeddi!\"",
  
  // Login
  "welcomeToGeeddi": "Welcome to Geeddi",
  "loginTagline": "Your journey into the future starts here at the AI Learning Academy.",
  "emailAddress": "Email address",
  "signInAndStartLearning": "Sign In & Start Learning",
  "continueAsGuest": "Continue as Guest",
  "demoUser": "Demo User",
  "guest": "Guest",

  // Header
  "appSubtitle": "AI Learning Academy",
  "appFullName": "Geeddi - AI Learning Academy",
  "logout": "Logout",
  "guestAccount": "Guest Account",
  "fullAccess": "Full Access",
  "trialDaysRemaining": "{days} trial days remaining",
  
  // Dashboard
  "welcomeBack": "Welcome, {name}!",
  "dashboardSubtitle": "Choose a topic and start your learning adventure.",
  "startLearningArrow": "Start Learning →",
  "createYourOwnCourse": "Create Your Own Course",
  "createCourseDescription": "Let our AI generate a custom course for you on any topic.",
  "searchPlaceholder": "Search for courses...",
  "noCoursesFound": "No courses found matching your search.",

  // Create Course Modal
  "createCourseModalTitle": "Create a New Course",
  "createCourseModalPrompt": "Enter a topic and select the desired format for your new course.",
  "courseTopic": "Course Topic",
  "courseTopicPlaceholder": "e.g., 'The Basics of Quantum Computing'",
  "courseFormat": "Course Format",
  "textFormat": "Text-based",
  "videoFormat": "Video (Script)",
  "audioFormat": "Audio (Script)",
  "createCourseButton": "Create Course",
  "aiGeneratedCourseDescription": "An AI-generated course on the topic of \"{topic}\".",

  // Course View
  "generatingCourse": "Generating your personalized course...",
  "generatingIntroduction": "Generating introduction...",
  "creatingModules": "Creating modules...",
  "craftingQuiz": "Crafting quiz...",
  "failedToLoadCourse": "Failed to Load Course",
  "unknownError": "An unknown error occurred.",
  "backToDashboard": "Back to Dashboard",
  "testYourKnowledge": "Test Your Knowledge",
  "submitAnswers": "Submit Answers",
  "yourScore": "Your Score",
  "congratulationsPassed": "Congratulations, you passed!",
  "viewCertificate": "View Certificate",
  "passingScoreInfo": "You need a score of {score}% or higher to receive a certificate. Please review the material and feel free to retake the quiz.",
  "correctAnswer": "Correct Answer",
  "browserNoSupportAudio": "Your browser does not support the audio element.",
  
  // Certificate
  "certificateOfCompletion": "CERTIFICATE of COMPLETION",
  "certifiesThat": "This certifies that",
  "successfullyCompleted": "has successfully completed the course",
  "issuingAuthority": "Issuing Authority",
  "downloadAsPNG": "Download as PNG",

  // Activation Flow
  "trialExpired": "Your 14-day trial has ended.",
  "requestAccessInstruction": "To continue learning, please request an activation code by sending an email with your registered user details to:",
  "and": "and",
  "requestAccessCTA": "Request Full Access via Email",
  "alreadyHaveCode": "Already have a code?",
  "enterCodeHere": "Enter Code Here",
  "enterActivationCode": "Enter Activation Code",
  "enterCodePrompt": "Please enter the code you received via email to unlock full access.",
  "activationCode": "Activation Code",
  "activate": "Activate",
  "invalidCode": "Invalid code. Please try again.",

  // Footer
  "footerRights": "Geeddi AI Learning Academy. All Rights Reserved.",
  "footerDisclaimer": "This is a fictional application for demonstration purposes."
};

const so: typeof en = {
  // General
  "or": "Ama",
  "progress": "Horumar",
  "summary": "Soo Koobid",
  "date": "Taariikh",
  "video": "MUUQAAL",
  "audio": "MAQAL",
  "text": "QORAAL",
  "free": "BILAASH",
  "locale": "so-SO",
  
  // Landing Page
  "heroTitle": "Mustaqbalka Barashada Waa Halkan.",
  "heroSubtitle": "Ku soo dhawoow Geeddi, akadeemiyada AI-ku shaqeysa halkaas oo waxbarashada teknoolojiyaddu ay had iyo jeer tahay mid casri ah, xiiso leh, oo adiga laguu talagalay.",
  "startLearningNow": "Hadda Barasho Bilow",
  "whyGeeddiTitle": "Waa Maxay Geeddi?",
  "whyGeeddiSubtitle": "Khibrad waxbarasho oo aan la barbar dhigi karin.",
  "feature1Title": "Mawduuc AI-ku Shaqeeya",
  "feature1Desc": "Manhajkayaga waxaa soo saara oo cusbooneysiiya AI, taasoo hubinaysa inaad barato xirfadaha ugu habboon uguna casrisan ee teknoolojiyadda.",
  "feature2Title": "Barasho Is-dhexgal ah",
  "feature2Desc": "La falgeli cutubyo firfircoon, tusaalooyin wax ku ool ah, iyo imtixaanno tijaabinaya aqoontaada tallaabo kasta.",
  "feature3Title": "Qof Walba Wuu Heli Karaa",
  "feature3Desc": "Isku darka koorsooyin bilaash ah iyo kuwa lacag ah, Geeddi waxay waxbarasho teknoolojiyad tayo sare leh u fidinaysaa dhammaan ardayda.",
  "testimonialsTitle": "Aad Bay u Jecel Yihiin Ardayda Adduunka",
  "testimonial1Text": "\"Kooraskii AI wuxuu ahaa mid cajiib ah. Mawduucu wuxuu ahaa mid cusub, waxaan dareemayay sidii aan wax u baranayay daahfur shalay la sameeyay!\"",
  "testimonial2Text": "\"Ugu dambayn, barmaamij la jaanqaadaya xawaaraha teknoolojiyadda. Koorsooyinka qiimaha leh waa kuwo istaahila dinaar kasta.\"",
  "testimonial3Text": "\"Waxaan ku bilaabay anigoo ah qof aan waxba aqoon, haddana waxaan ku kalsoonahay inaan ka hadlo fikradaha barashada mashiinka. Mahadsanid, Geeddi!\"",
  
  // Login
  "welcomeToGeeddi": "Ku Soo Dhawoow Geeddi",
  "loginTagline": "Safarakaaga mustaqbalka halkan ayuu ka bilaabmayaa akadeemiyada barashada AI.",
  "emailAddress": "Ciwaanka iimaylka",
  "signInAndStartLearning": "Soo Gal & Barasho Bilow",
  "continueAsGuest": "Sii Wad Marti Ahaan",
  "demoUser": "Isticmaale Tusaale ah",
  "guest": "Marti",

  // Header
  "appSubtitle": "Akadeemiyada Barashada AI",
  "appFullName": "Geeddi - Akadeemiyada Barashada AI",
  "logout": "Ka Bax",
  "guestAccount": "Akoon Marti ah",
  "fullAccess": "Helitaan Buuxa",
  "trialDaysRemaining": "{days} maalmood oo tijaabo ah ayaa kaaga hadhay",
  
  // Dashboard
  "welcomeBack": "Soo dhawoow, {name}!",
  "dashboardSubtitle": "Dooro mawduuc oo bilow safarkaaga waxbarasho.",
  "startLearningArrow": "Barasho Bilow →",
  "createYourOwnCourse": "Samee Kooras Adiga kuu Gaar ah",
  "createCourseDescription": "U oggolow AI-gayagu inuu kuu soo saaro kooras gaar ah oo ku saabsan mawduuc kasta.",
  "searchPlaceholder": "Raadi koorsooyin...",
  "noCoursesFound": "Lama helin koorsooyin u dhigma raadintaada.",

  // Create Course Modal
  "createCourseModalTitle": "Abuur Kooras Cusub",
  "createCourseModalPrompt": "Geli mawduuc oo dooro qaabka la rabo ee koorsadaada cusub.",
  "courseTopic": "Mawduuca Kooraska",
  "courseTopicPlaceholder": "tusaale, 'Aasaaska Quantum Computing'",
  "courseFormat": "Qaabka Kooraska",
  "textFormat": "Qoraal ku salaysan",
  "videoFormat": "Muuqaal (Qoraal)",
  "audioFormat": "Maqal (Qoraal)",
  "createCourseButton": "Abuur Kooras",
  "aiGeneratedCourseDescription": "Kooras ay AI soo saartay oo ku saabsan mawduuca \"{topic}\".",

  // Course View
  "generatingCourse": "Waxaa lagu diyaarinayaa koorsadaada gaarka ah...",
  "generatingIntroduction": "Diyaarinta hordhaca...",
  "creatingModules": "Abuurista cutubyada...",
  "craftingQuiz": "Samaynta imtixaanka...",
  "failedToLoadCourse": "Lama Soo Rarin Karin Kooraska",
  "unknownError": "Cilad aan la aqoon ayaa dhacday.",
  "backToDashboard": "Ku Laabo Hoolka Weyn",
  "testYourKnowledge": "Tijaabi Aqoontaada",
  "submitAnswers": "Gudbi Jawaabaha",
  "yourScore": "Dhibcahaaga",
  "congratulationsPassed": "Hambalyo, waad gudubtay!",
  "viewCertificate": "Eeg Shahaadada",
  "passingScoreInfo": "Waxaad u baahan tahay dhibco ah {score}% ama ka badan si aad u hesho shahaado. Fadlan dib u eeg maadada oo xor u noqo inaad imtixaanka mar kale gasho.",
  "correctAnswer": "Jawaabta Saxda ah",
  "browserNoSupportAudio": "Barowsarkaagu ma taageerayo codka.",
  
  // Certificate
  "certificateOfCompletion": "SHAHHAADADA DHAMMAYSTIRKA",
  "certifiesThat": "Tan waxay cadaynaysaa in",
  "successfullyCompleted": "uu si guul leh u dhammeeyey koorsada",
  "issuingAuthority": "Hay'adda Bixisay",
  "downloadAsPNG": "La Deg PNG Ahaan",

  // Activation Flow
  "trialExpired": "Muddadii tijaabadaada ee 14-ka maalmood ahayd way dhammaatay.",
  "requestAccessInstruction": "Si aad u sii wadato barashada, fadlan ka codso koodka kicinta adigoo iimayl u diraya faahfaahinta isticmaalahaaga diiwaangashan cinwaanadan:",
  "and": "iyo",
  "requestAccessCTA": "Codso Helitaan Buuxa (Email)",
  "alreadyHaveCode": "Hore ma u haysataa kood?",
  "enterCodeHere": "Halkan Geli Koodka",
  "enterActivationCode": "Geli Koodka Kicinta",
  "enterCodePrompt": "Fadlan geli koodka aad ku heshay iimaylka si aad u furto helitaan buuxa.",
  "activationCode": "Koodka Kicinta",
  "activate": "Kici",
  "invalidCode": "Kood khaldan. Fadlan isku day mar kale.",
  
  // Footer
  "footerRights": "Geeddi Akadeemiyada Barashada AI. Xuquuqda oo dhan way xifdisan tahay.",
  "footerDisclaimer": "Kani waa codsi khayaali ah oo loogu talagalay ujeeddooyin bandhig."
};

const translations = { en, so };

type TranslationKeys = keyof typeof en;

export const useTranslation = () => {
  const { language } = useContext(LanguageContext);

  const t = (key: TranslationKeys, replacements?: { [key: string]: string | number }): string => {
    let translation = translations[language][key] || translations['en'][key] || key;
    
    if (replacements) {
      Object.keys(replacements).forEach(placeholder => {
        translation = translation.replace(`{${placeholder}}`, String(replacements[placeholder]));
      });
    }
    
    return translation;
  };

  return t;
};

export const useLanguage = () => {
    return useContext(LanguageContext);
}