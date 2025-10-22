import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';

const en = {
  // General
  "or": "Or",
  "and": "and",
  "progress": "Progress",
  "summary": "Summary",
  "date": "Date",
  "video": "VIDEO",
  "audio": "AUDIO",
  "text": "TEXT",
  "free": "FREE",
  "premium": "PREMIUM",
  "locale": "en-US",
  "learner": "Valued Learner",
  "activate": "Activate",
  "introduction": "Introduction",
  "quiz": "Quiz",
  "previous": "Previous",
  "next": "Next",
  "startQuiz": "Start Quiz",
  "courseOutline": "Course Outline",

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
  "loginTagline": "Your personalized AI learning journey starts here.",
  "emailAddress": "Email address",
  "signInAndStartLearning": "Sign In & Start Learning",
  "continueAsGuest": "Continue as Guest",
  "demoUser": "Demo User",
  "guest": "Guest",

  // Header
  "appSubtitle": "AI Learning Academy",
  "appFullName": "Geeddi - AI Learning Academy",
  "logout": "Logout",
  
  // Dashboard
  "welcomeBack": "Welcome, {name}!",
  "dashboardSubtitle": "Choose a topic and start your learning adventure.",
  "startLearningArrow": "Start Learning →",
  "unlockCourse": "Unlock Course →",
  "searchPlaceholder": "Search for courses...",
  "noCoursesFound": "No courses found matching your search.",

  // Course View
  "generatingCourse": "Generating your personalized course...",
  "generatingIntroduction": "Generating introduction...",
  "creatingModules": "Creating modules...",
  "craftingQuiz": "Crafting quiz...",
  "generatingAudio": "Generating course audio...",
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
  "sources": "Sources",
  "apiRateLimitError": "The AI service is currently experiencing high traffic. Please wait a moment and try again.",
  "apiRetryMessage": "API is busy. Retrying in {seconds}s... (Attempt {attempt} of {max})",
  
  // Certificate
  "certificateOfCompletion": "CERTIFICATE of COMPLETION",
  "certifiesThat": "This certifies that",
  "successfullyCompleted": "has successfully completed the course",
  "issuingAuthority": "Issuing Authority",
  "downloadAsPNG": "Download as PNG",

  // Request Access View
  "trialExpired": "Full Access Required",
  "requestAccessInstruction": "To continue using the full features of the Geeddi app, please request an activation code by sending an email to:",
  "requestAccessCTA": "Request Access Code",
  "alreadyHaveCode": "Already have a code?",
  "enterCodeHere": "Enter code here",
  
  // Enter Code Modal
  "invalidCode": "The code you entered is invalid. Please try again.",
  "enterActivationCode": "Enter Activation Code",
  "enterCodePrompt": "Please enter the activation code you received to unlock the full app.",
  "activationCode": "Activation Code",

  // Create Course Modal
  "createCourseModalTitle": "Create a New Course",
  "createCourseModalPrompt": "What topic would you like to learn about? Our AI will generate a custom course for you.",
  "courseTopic": "Course Topic",
  "courseTopicPlaceholder": "e.g., 'Quantum Computing Basics'",
  "courseFormat": "Course Format",
  "textFormat": "Text",
  "videoFormat": "Video",
  "audioFormat": "Audio",
  "createCourseButton": "Create Course",

  // Footer
  "footerRights": "Geeddi AI Learning Academy. All Rights Reserved.",
  "footerDisclaimer": "This is a fictional application for demonstration purposes."
};

const so: typeof en = {
  // General
  "or": "Ama",
  "and": "iyo",
  "progress": "Horumar",
  "summary": "Soo Koobid",
  "date": "Taariikh",
  "video": "MUUQAAL",
  "audio": "MAQAL",
  "text": "QORAAL",
  "free": "BILAASH",
  "premium": "QIIMO",
  "locale": "so-SO",
  "learner": "Arday Qaali ah",
  "activate": "Kici",
  "introduction": "Hordhac",
  "quiz": "Imtixaan",
  "previous": "Hore",
  "next": "Xiga",
  "startQuiz": "Bilow Imtixaanka",
  "courseOutline": "Dulmarka Kooraska",

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
  "loginTagline": "Safarkaaga waxbarasho ee AI-ga ah halkan ayuu ka bilaabmayaa.",
  "emailAddress": "Ciwaanka emailka",
  "signInAndStartLearning": "Soo Gal & Barasho Bilow",
  "continueAsGuest": "Sii Wad Marti Ahaan",
  "demoUser": "Isticmaale Tijaabo ah",
  "guest": "Marti",

  // Header
  "appSubtitle": "Akadeemiyada Barashada AI",
  "appFullName": "Geeddi - Akadeemiyada Barashada AI",
  "logout": "Ka Bax",
  
  // Dashboard
  "welcomeBack": "Soo dhawoow, {name}!",
  "dashboardSubtitle": "Dooro mawduuc oo bilow safarkaaga waxbarasho.",
  "startLearningArrow": "Barasho Bilow →",
  "unlockCourse": "Fur Kooraska →",
  "searchPlaceholder": "Raadi koorsooyin...",
  "noCoursesFound": "Lama helin koorsooyin u dhigma raadintaada.",

  // Course View
  "generatingCourse": "Waxaa lagu diyaarinayaa koorsadaada gaarka ah...",
  "generatingIntroduction": "Diyaarinta hordhaca...",
  "creatingModules": "Abuurista cutubyada...",
  "craftingQuiz": "Samaynta imtixaanka...",
  "generatingAudio": "Waxaa la diyaarinayaa codka koorsada...",
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
  "sources": "Xigashooyin",
  "apiRateLimitError": "Adeegga AI wuxuu hadda la kulmayaa mashquul badan. Fadlan sug wax yar oo mar kale isku day.",
  "apiRetryMessage": "API-gu wuu mashquul yahay. Waxaa la isku dayayaa mar kale {seconds}s gudahood... (Isku day {attempt} of {max})",
  
  // Certificate
  "certificateOfCompletion": "SHAHHAADADA DHAMMAYSTIRKA",
  "certifiesThat": "Tan waxay cadaynaysaa in",
  "successfullyCompleted": "uu si guul leh u dhammeeyey koorsada",
  "issuingAuthority": "Hay'adda Bixisay",
  "downloadAsPNG": "La Deg PNG Ahaan",
  
  // Request Access View
  "trialExpired": "Waxaa Loo Baahan Yahay Ogolaansho Buuxda",
  "requestAccessInstruction": "Si aad u sii waddo isticmaalka dhammaan qaybaha abka Geeddi, fadlan codso koodka kicinta adigoo iimayl u diraya:",
  "requestAccessCTA": "Codso Koodka Ogolaanshaha",
  "alreadyHaveCode": "Hore ma u haysataa kood?",
  "enterCodeHere": "Halkan geli koodka",
  
  // Enter Code Modal
  "invalidCode": "Koodka aad gelisay waa sax aheyn. Fadlan isku day mar kale.",
  "enterActivationCode": "Geli Koodka Kicinta",
  "enterCodePrompt": "Fadlan geli koodka kicinta ee aad heshay si aad u furto abka oo dhan.",
  "activationCode": "Koodka Kicinta",

  // Create Course Modal
  "createCourseModalTitle": "Abuur Kooras Cusub",
  "createCourseModalPrompt": "Mawduuc noocee ah ayaad jeclaan lahayd inaad wax ka barato? AI-gayagu wuxuu kuu soo saari doonaa koorso gaar ah.",
  "courseTopic": "Mawduuca Kooraska",
  "courseTopicPlaceholder": "tusaale, 'Aasaaska Quantum Computing'",
  "courseFormat": "Qaabka Kooraska",
  "textFormat": "Qoraal",
  "videoFormat": "Muuqaal",
  "audioFormat": "Maqal",
  "createCourseButton": "Abuur Kooras",
  
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