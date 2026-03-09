/**
 * Learn German - Vocabulary Data
 * 8 levels building toward A0 German proficiency (~86 words)
 * Pronunciations use simplified English-friendly phonetics
 */

const LEVELS = [
  {
    id: 1,
    title: 'First Words',
    description: 'Essential greetings and basic words',
    icon: '\u{1F44B}',
    words: [
      { de: 'Hallo', en: 'Hello', pron: 'HAH-loh', example: 'Hallo, wie geht es dir?' },
      { de: 'Tsch\u00fcss', en: 'Goodbye', pron: 'chooss', example: 'Tsch\u00fcss, bis morgen!' },
      { de: 'Ja', en: 'Yes', pron: 'yah', example: 'Ja, ich verstehe.' },
      { de: 'Nein', en: 'No', pron: 'nine', example: 'Nein, danke.' },
      { de: 'Danke', en: 'Thank you', pron: 'DAHN-kuh', example: 'Danke sch\u00f6n!' },
      { de: 'Bitte', en: 'Please / You\'re welcome', pron: 'BIT-tuh', example: 'Bitte sch\u00f6n.' },
      { de: 'Gut', en: 'Good', pron: 'goot', example: 'Das ist gut.' },
      { de: 'Schlecht', en: 'Bad', pron: 'shlekht', example: 'Das ist schlecht.' },
      { de: 'Guten Morgen', en: 'Good morning', pron: 'GOO-ten MOR-gen', example: 'Guten Morgen, Herr M\u00fcller.' },
      { de: 'Gute Nacht', en: 'Good night', pron: 'GOO-tuh nahkht', example: 'Gute Nacht, schlaf gut!' }
    ]
  },
  {
    id: 2,
    title: 'Numbers 1\u201310',
    description: 'Learn to count in German',
    icon: '\u{1F522}',
    words: [
      { de: 'eins', en: 'one', pron: 'eyns', example: 'Ich habe eins.' },
      { de: 'zwei', en: 'two', pron: 'tsvye', example: 'Zwei Kaffee, bitte.' },
      { de: 'drei', en: 'three', pron: 'dry', example: 'Drei Tage.' },
      { de: 'vier', en: 'four', pron: 'feer', example: 'Vier Personen.' },
      { de: 'f\u00fcnf', en: 'five', pron: 'foonf', example: 'F\u00fcnf Minuten.' },
      { de: 'sechs', en: 'six', pron: 'zeks', example: 'Sechs Euro.' },
      { de: 'sieben', en: 'seven', pron: 'ZEE-ben', example: 'Sieben Uhr.' },
      { de: 'acht', en: 'eight', pron: 'ahkht', example: 'Acht Stunden.' },
      { de: 'neun', en: 'nine', pron: 'noyn', example: 'Neun Monate.' },
      { de: 'zehn', en: 'ten', pron: 'tsayn', example: 'Zehn Kilometer.' }
    ]
  },
  {
    id: 3,
    title: 'Colors',
    description: 'Describe the world around you',
    icon: '\u{1F3A8}',
    words: [
      { de: 'rot', en: 'red', pron: 'roht', example: 'Die Rose ist rot.' },
      { de: 'blau', en: 'blue', pron: 'blow', example: 'Der Himmel ist blau.' },
      { de: 'gr\u00fcn', en: 'green', pron: 'groon', example: 'Das Gras ist gr\u00fcn.' },
      { de: 'gelb', en: 'yellow', pron: 'gelp', example: 'Die Sonne ist gelb.' },
      { de: 'schwarz', en: 'black', pron: 'shvarts', example: 'Die Katze ist schwarz.' },
      { de: 'wei\u00df', en: 'white', pron: 'vyce', example: 'Der Schnee ist wei\u00df.' },
      { de: 'braun', en: 'brown', pron: 'brown', example: 'Der Hund ist braun.' },
      { de: 'orange', en: 'orange', pron: 'oh-RAHN-zhuh', example: 'Die Orange ist orange.' },
      { de: 'rosa', en: 'pink', pron: 'ROH-zah', example: 'Die Blume ist rosa.' },
      { de: 'grau', en: 'gray', pron: 'grow', example: 'Der Elefant ist grau.' }
    ]
  },
  {
    id: 4,
    title: 'Days & Months',
    description: 'Talk about time and dates',
    icon: '\u{1F4C5}',
    words: [
      { de: 'Montag', en: 'Monday', pron: 'MOHN-tahg', example: 'Am Montag arbeite ich.' },
      { de: 'Dienstag', en: 'Tuesday', pron: 'DEENS-tahg', example: 'Dienstag ist gut.' },
      { de: 'Mittwoch', en: 'Wednesday', pron: 'MIT-vokh', example: 'Mittwoch ist Mitte der Woche.' },
      { de: 'Donnerstag', en: 'Thursday', pron: 'DON-ers-tahg', example: 'Am Donnerstag gehe ich einkaufen.' },
      { de: 'Freitag', en: 'Friday', pron: 'FRY-tahg', example: 'Freitag ist mein Lieblingstag.' },
      { de: 'Samstag', en: 'Saturday', pron: 'ZAHMS-tahg', example: 'Am Samstag schlafe ich lang.' },
      { de: 'Sonntag', en: 'Sunday', pron: 'ZON-tahg', example: 'Sonntag ist Ruhetag.' },
      { de: 'Januar', en: 'January', pron: 'YAH-noo-ar', example: 'Im Januar ist es kalt.' },
      { de: 'Mai', en: 'May', pron: 'my', example: 'Im Mai bl\u00fchen die Blumen.' },
      { de: 'August', en: 'August', pron: 'ow-GOOST', example: 'Im August ist Sommer.' },
      { de: 'Oktober', en: 'October', pron: 'ok-TOH-ber', example: 'Im Oktober ist Oktoberfest.' },
      { de: 'Dezember', en: 'December', pron: 'deh-TSEM-ber', example: 'Im Dezember ist Weihnachten.' }
    ]
  },
  {
    id: 5,
    title: 'Food & Drink',
    description: 'Order at a restaurant or caf\u00e9',
    icon: '\u{1F354}',
    words: [
      { de: 'Wasser', en: 'water', pron: 'VAH-ser', example: 'Ein Glas Wasser, bitte.' },
      { de: 'Brot', en: 'bread', pron: 'broht', example: 'Das Brot ist frisch.' },
      { de: 'Kaffee', en: 'coffee', pron: 'KAH-fay', example: 'Einen Kaffee, bitte.' },
      { de: 'Tee', en: 'tea', pron: 'tay', example: 'Ich trinke gern Tee.' },
      { de: 'Milch', en: 'milk', pron: 'milkh', example: 'Milch mit Kaffee.' },
      { de: 'Apfel', en: 'apple', pron: 'AHP-fel', example: 'Der Apfel ist rot.' },
      { de: 'Fleisch', en: 'meat', pron: 'flysh', example: 'Ich esse kein Fleisch.' },
      { de: 'Reis', en: 'rice', pron: 'rice', example: 'Reis mit Gem\u00fcse.' },
      { de: 'K\u00e4se', en: 'cheese', pron: 'KAY-zuh', example: 'K\u00e4se aus der Schweiz.' },
      { de: 'Bier', en: 'beer', pron: 'beer', example: 'Ein Bier, bitte.' },
      { de: 'Kuchen', en: 'cake', pron: 'KOO-khen', example: 'Der Kuchen schmeckt gut.' },
      { de: 'Suppe', en: 'soup', pron: 'ZOO-puh', example: 'Die Suppe ist hei\u00df.' }
    ]
  },
  {
    id: 6,
    title: 'Self-Introduction',
    description: 'Tell people about yourself',
    icon: '\u{1F464}',
    words: [
      { de: 'Ich bin', en: 'I am', pron: 'ikh bin', example: 'Ich bin Student.' },
      { de: 'Ich hei\u00dfe', en: 'My name is', pron: 'ikh HY-suh', example: 'Ich hei\u00dfe Anna.' },
      { de: 'Ich komme aus', en: 'I come from', pron: 'ikh KOM-uh ows', example: 'Ich komme aus Indien.' },
      { de: 'Ich wohne in', en: 'I live in', pron: 'ikh VOH-nuh in', example: 'Ich wohne in Berlin.' },
      { de: 'Ich spreche', en: 'I speak', pron: 'ikh SHPREKH-uh', example: 'Ich spreche Deutsch.' },
      { de: 'Freund', en: 'friend', pron: 'froynt', example: 'Das ist mein Freund.' },
      { de: 'Familie', en: 'family', pron: 'fah-MEE-lee-uh', example: 'Meine Familie ist gro\u00df.' },
      { de: 'Arbeit', en: 'work', pron: 'AR-byte', example: 'Ich gehe zur Arbeit.' },
      { de: 'Schule', en: 'school', pron: 'SHOO-luh', example: 'Die Schule beginnt um acht.' },
      { de: 'Hobby', en: 'hobby', pron: 'HOB-ee', example: 'Mein Hobby ist Lesen.' }
    ]
  },
  {
    id: 7,
    title: 'Polite Phrases',
    description: 'Navigate social situations with grace',
    icon: '\u{1F91D}',
    words: [
      { de: 'Entschuldigung', en: 'Excuse me / Sorry', pron: 'ent-SHOOL-dee-goong', example: 'Entschuldigung, wo ist der Bahnhof?' },
      { de: 'Es tut mir leid', en: 'I\'m sorry', pron: 'es toot meer lyte', example: 'Es tut mir leid, ich bin sp\u00e4t.' },
      { de: 'Wie geht es Ihnen?', en: 'How are you? (formal)', pron: 'vee gayt es EE-nen', example: 'Guten Tag, wie geht es Ihnen?' },
      { de: 'Mir geht es gut', en: 'I\'m doing well', pron: 'meer gayt es goot', example: 'Danke, mir geht es gut.' },
      { de: 'Ich verstehe nicht', en: 'I don\'t understand', pron: 'ikh fer-SHTAY-uh nikht', example: 'Entschuldigung, ich verstehe nicht.' },
      { de: 'Sprechen Sie Englisch?', en: 'Do you speak English?', pron: 'SHPREKH-en zee ENG-lish', example: 'Sprechen Sie Englisch, bitte?' },
      { de: 'Wie bitte?', en: 'Pardon?', pron: 'vee BIT-tuh', example: 'Wie bitte? Noch einmal.' },
      { de: 'Kein Problem', en: 'No problem', pron: 'kyne pro-BLAYM', example: 'Kein Problem, gern geschehen.' },
      { de: 'Herzlich willkommen', en: 'Welcome', pron: 'HERTS-likh vil-KOM-en', example: 'Herzlich willkommen in Deutschland!' },
      { de: 'Auf Wiedersehen', en: 'Goodbye (formal)', pron: 'owf VEE-der-zay-en', example: 'Auf Wiedersehen, Frau Schmidt.' }
    ]
  },
  {
    id: 8,
    title: 'Travel & Sentences',
    description: 'Get around in a German-speaking country',
    icon: '\u{2708}\u{FE0F}',
    words: [
      { de: 'Wo ist...?', en: 'Where is...?', pron: 'voh ist', example: 'Wo ist der Bahnhof?' },
      { de: 'Wie viel kostet das?', en: 'How much does it cost?', pron: 'vee feel KOS-tet dahs', example: 'Wie viel kostet das Brot?' },
      { de: 'die Stra\u00dfe', en: 'the street', pron: 'dee SHTRAH-suh', example: 'Die Stra\u00dfe ist lang.' },
      { de: 'der Bahnhof', en: 'the train station', pron: 'dair BAHN-hohf', example: 'Der Bahnhof ist dort.' },
      { de: 'das Hotel', en: 'the hotel', pron: 'dahs ho-TEL', example: 'Das Hotel ist sch\u00f6n.' },
      { de: 'der Flughafen', en: 'the airport', pron: 'dair FLOOG-hah-fen', example: 'Zum Flughafen, bitte.' },
      { de: 'links', en: 'left', pron: 'links', example: 'Gehen Sie links.' },
      { de: 'rechts', en: 'right', pron: 'rekhts', example: 'Dann rechts abbiegen.' },
      { de: 'Ich m\u00f6chte', en: 'I would like', pron: 'ikh MERKH-tuh', example: 'Ich m\u00f6chte ein Ticket.' },
      { de: 'die Rechnung', en: 'the bill', pron: 'dee REKH-noong', example: 'Die Rechnung, bitte.' },
      { de: 'Hilfe', en: 'Help', pron: 'HIL-fuh', example: 'Ich brauche Hilfe!' },
      { de: 'Ich habe eine Frage', en: 'I have a question', pron: 'ikh HAH-buh EYE-nuh FRAH-guh', example: 'Entschuldigung, ich habe eine Frage.' }
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
