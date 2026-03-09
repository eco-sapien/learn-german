/**
 * Learn German - Vocabulary Data
 * 8 levels building toward A0 German proficiency (~86 words)
 */

const LEVELS = [
  {
    id: 1,
    title: 'First Words',
    description: 'Essential greetings and basic words',
    icon: '\u{1F44B}',
    words: [
      { de: 'Hallo', en: 'Hello', example: 'Hallo, wie geht es dir?' },
      { de: 'Tsch\u00fcss', en: 'Goodbye', example: 'Tsch\u00fcss, bis morgen!' },
      { de: 'Ja', en: 'Yes', example: 'Ja, ich verstehe.' },
      { de: 'Nein', en: 'No', example: 'Nein, danke.' },
      { de: 'Danke', en: 'Thank you', example: 'Danke sch\u00f6n!' },
      { de: 'Bitte', en: 'Please / You\'re welcome', example: 'Bitte sch\u00f6n.' },
      { de: 'Gut', en: 'Good', example: 'Das ist gut.' },
      { de: 'Schlecht', en: 'Bad', example: 'Das ist schlecht.' },
      { de: 'Guten Morgen', en: 'Good morning', example: 'Guten Morgen, Herr M\u00fcller.' },
      { de: 'Gute Nacht', en: 'Good night', example: 'Gute Nacht, schlaf gut!' }
    ]
  },
  {
    id: 2,
    title: 'Numbers 1\u201310',
    description: 'Learn to count in German',
    icon: '\u{1F522}',
    words: [
      { de: 'eins', en: 'one', example: 'Ich habe eins.' },
      { de: 'zwei', en: 'two', example: 'Zwei Kaffee, bitte.' },
      { de: 'drei', en: 'three', example: 'Drei Tage.' },
      { de: 'vier', en: 'four', example: 'Vier Personen.' },
      { de: 'f\u00fcnf', en: 'five', example: 'F\u00fcnf Minuten.' },
      { de: 'sechs', en: 'six', example: 'Sechs Euro.' },
      { de: 'sieben', en: 'seven', example: 'Sieben Uhr.' },
      { de: 'acht', en: 'eight', example: 'Acht Stunden.' },
      { de: 'neun', en: 'nine', example: 'Neun Monate.' },
      { de: 'zehn', en: 'ten', example: 'Zehn Kilometer.' }
    ]
  },
  {
    id: 3,
    title: 'Colors',
    description: 'Describe the world around you',
    icon: '\u{1F3A8}',
    words: [
      { de: 'rot', en: 'red', example: 'Die Rose ist rot.' },
      { de: 'blau', en: 'blue', example: 'Der Himmel ist blau.' },
      { de: 'gr\u00fcn', en: 'green', example: 'Das Gras ist gr\u00fcn.' },
      { de: 'gelb', en: 'yellow', example: 'Die Sonne ist gelb.' },
      { de: 'schwarz', en: 'black', example: 'Die Katze ist schwarz.' },
      { de: 'wei\u00df', en: 'white', example: 'Der Schnee ist wei\u00df.' },
      { de: 'braun', en: 'brown', example: 'Der Hund ist braun.' },
      { de: 'orange', en: 'orange', example: 'Die Orange ist orange.' },
      { de: 'rosa', en: 'pink', example: 'Die Blume ist rosa.' },
      { de: 'grau', en: 'gray', example: 'Der Elefant ist grau.' }
    ]
  },
  {
    id: 4,
    title: 'Days & Months',
    description: 'Talk about time and dates',
    icon: '\u{1F4C5}',
    words: [
      { de: 'Montag', en: 'Monday', example: 'Am Montag arbeite ich.' },
      { de: 'Dienstag', en: 'Tuesday', example: 'Dienstag ist gut.' },
      { de: 'Mittwoch', en: 'Wednesday', example: 'Mittwoch ist Mitte der Woche.' },
      { de: 'Donnerstag', en: 'Thursday', example: 'Am Donnerstag gehe ich einkaufen.' },
      { de: 'Freitag', en: 'Friday', example: 'Freitag ist mein Lieblingstag.' },
      { de: 'Samstag', en: 'Saturday', example: 'Am Samstag schlafe ich lang.' },
      { de: 'Sonntag', en: 'Sunday', example: 'Sonntag ist Ruhetag.' },
      { de: 'Januar', en: 'January', example: 'Im Januar ist es kalt.' },
      { de: 'Mai', en: 'May', example: 'Im Mai bl\u00fchen die Blumen.' },
      { de: 'August', en: 'August', example: 'Im August ist Sommer.' },
      { de: 'Oktober', en: 'October', example: 'Im Oktober ist Oktoberfest.' },
      { de: 'Dezember', en: 'December', example: 'Im Dezember ist Weihnachten.' }
    ]
  },
  {
    id: 5,
    title: 'Food & Drink',
    description: 'Order at a restaurant or caf\u00e9',
    icon: '\u{1F354}',
    words: [
      { de: 'Wasser', en: 'water', example: 'Ein Glas Wasser, bitte.' },
      { de: 'Brot', en: 'bread', example: 'Das Brot ist frisch.' },
      { de: 'Kaffee', en: 'coffee', example: 'Einen Kaffee, bitte.' },
      { de: 'Tee', en: 'tea', example: 'Ich trinke gern Tee.' },
      { de: 'Milch', en: 'milk', example: 'Milch mit Kaffee.' },
      { de: 'Apfel', en: 'apple', example: 'Der Apfel ist rot.' },
      { de: 'Fleisch', en: 'meat', example: 'Ich esse kein Fleisch.' },
      { de: 'Reis', en: 'rice', example: 'Reis mit Gem\u00fcse.' },
      { de: 'K\u00e4se', en: 'cheese', example: 'K\u00e4se aus der Schweiz.' },
      { de: 'Bier', en: 'beer', example: 'Ein Bier, bitte.' },
      { de: 'Kuchen', en: 'cake', example: 'Der Kuchen schmeckt gut.' },
      { de: 'Suppe', en: 'soup', example: 'Die Suppe ist hei\u00df.' }
    ]
  },
  {
    id: 6,
    title: 'Self-Introduction',
    description: 'Tell people about yourself',
    icon: '\u{1F464}',
    words: [
      { de: 'Ich bin', en: 'I am', example: 'Ich bin Student.' },
      { de: 'Ich hei\u00dfe', en: 'My name is', example: 'Ich hei\u00dfe Anna.' },
      { de: 'Ich komme aus', en: 'I come from', example: 'Ich komme aus Indien.' },
      { de: 'Ich wohne in', en: 'I live in', example: 'Ich wohne in Berlin.' },
      { de: 'Ich spreche', en: 'I speak', example: 'Ich spreche Deutsch.' },
      { de: 'Freund', en: 'friend', example: 'Das ist mein Freund.' },
      { de: 'Familie', en: 'family', example: 'Meine Familie ist gro\u00df.' },
      { de: 'Arbeit', en: 'work', example: 'Ich gehe zur Arbeit.' },
      { de: 'Schule', en: 'school', example: 'Die Schule beginnt um acht.' },
      { de: 'Hobby', en: 'hobby', example: 'Mein Hobby ist Lesen.' }
    ]
  },
  {
    id: 7,
    title: 'Polite Phrases',
    description: 'Navigate social situations with grace',
    icon: '\u{1F91D}',
    words: [
      { de: 'Entschuldigung', en: 'Excuse me / Sorry', example: 'Entschuldigung, wo ist der Bahnhof?' },
      { de: 'Es tut mir leid', en: 'I\'m sorry', example: 'Es tut mir leid, ich bin sp\u00e4t.' },
      { de: 'Wie geht es Ihnen?', en: 'How are you? (formal)', example: 'Guten Tag, wie geht es Ihnen?' },
      { de: 'Mir geht es gut', en: 'I\'m doing well', example: 'Danke, mir geht es gut.' },
      { de: 'Ich verstehe nicht', en: 'I don\'t understand', example: 'Entschuldigung, ich verstehe nicht.' },
      { de: 'Sprechen Sie Englisch?', en: 'Do you speak English?', example: 'Sprechen Sie Englisch, bitte?' },
      { de: 'Wie bitte?', en: 'Pardon?', example: 'Wie bitte? Noch einmal.' },
      { de: 'Kein Problem', en: 'No problem', example: 'Kein Problem, gern geschehen.' },
      { de: 'Herzlich willkommen', en: 'Welcome', example: 'Herzlich willkommen in Deutschland!' },
      { de: 'Auf Wiedersehen', en: 'Goodbye (formal)', example: 'Auf Wiedersehen, Frau Schmidt.' }
    ]
  },
  {
    id: 8,
    title: 'Travel & Sentences',
    description: 'Get around in a German-speaking country',
    icon: '\u{2708}\u{FE0F}',
    words: [
      { de: 'Wo ist...?', en: 'Where is...?', example: 'Wo ist der Bahnhof?' },
      { de: 'Wie viel kostet das?', en: 'How much does it cost?', example: 'Wie viel kostet das Brot?' },
      { de: 'die Stra\u00dfe', en: 'the street', example: 'Die Stra\u00dfe ist lang.' },
      { de: 'der Bahnhof', en: 'the train station', example: 'Der Bahnhof ist dort.' },
      { de: 'das Hotel', en: 'the hotel', example: 'Das Hotel ist sch\u00f6n.' },
      { de: 'der Flughafen', en: 'the airport', example: 'Zum Flughafen, bitte.' },
      { de: 'links', en: 'left', example: 'Gehen Sie links.' },
      { de: 'rechts', en: 'right', example: 'Dann rechts abbiegen.' },
      { de: 'Ich m\u00f6chte', en: 'I would like', example: 'Ich m\u00f6chte ein Ticket.' },
      { de: 'die Rechnung', en: 'the bill', example: 'Die Rechnung, bitte.' },
      { de: 'Hilfe', en: 'Help', example: 'Ich brauche Hilfe!' },
      { de: 'Ich habe eine Frage', en: 'I have a question', example: 'Entschuldigung, ich habe eine Frage.' }
    ]
  }
];

// Level configuration for review cards
const LEVEL_CONFIG = [
  { id: 1, reviewCount: 0 },
  { id: 2, reviewCount: 3 },
  { id: 3, reviewCount: 5 },
  { id: 4, reviewCount: 6 },
  { id: 5, reviewCount: 8 },
  { id: 6, reviewCount: 8 },
  { id: 7, reviewCount: 10 },
  { id: 8, reviewCount: 12 }
];
