// Parampara and History data for Sode Vadiraja Matha

export interface Guru {
  id: number;
  peethaNumber?: number;
  name: string;
  nameKannada?: string;
  asramaGuru?: number; // Previous peetadhipathi ID
  asramaShishya?: number; // Next peetadhipathi ID
  photo?: string; // Placeholder for now
  peethaFrom?: string;
  peethaTo?: string;
  poorvashramaName?: string;
  aradhana?: string;
  aradhanaKannada?: string;
  keyWorks?: string[];
  vrindavanaLocation?: {
    name: string;
    address: string;
    latitude?: number;
    longitude?: number;
  };
  description?: string;
}

export interface BhootarajaInfo {
  name: string;
  nameKannada: string;
  photo?: string;
  description: string;
  significance?: string;
  miracles?: string[];
  templeLocation?: {
    name: string;
    address: string;
    latitude?: number;
    longitude?: number;
  };
}

export interface MadhwacharyaInfo {
  name: string;
  nameKannada: string;
  photo?: string;
  birthPlace: string;
  birthYear?: string;
  mahasamadhi?: string;
  parents: string;
  asramaGuru: string;
  philosophy?: string;
  keyWorks: string[];
  description: string;
}

export interface MathaHistoryInfo {
  title: string;
  titleKannada: string;
  subTitle?: string;
  established?: string;
  founder?: string;
  location: {
    name: string;
    description: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  content: string;
  description?: string;
  significance?: string;
  keyMilestones?: Array<{ year: string; event: string }>;
  branches?: string[];
}

// Complete Parampara of Sri Sode Vadiraja Matha (36 Peetadhipathis)
export const paramparaData: Guru[] = [
  {
    id: 1,
    name: 'Sri Vishnutirtha',
    nameKannada: 'ಶ್ರೀ ವಿಷ್ಣುತೀರ್ಥರು',
    asramaShishya: 2,
    description: 'Sri Vishnutirtha was the first peetadhipathi of the Sode Matha lineage, directly ordained by Sri Madhwacharya himself. He was one of the eight celebrated monks entrusted with the worship of Lord Krishna and propagation of Dvaita Siddhanta.',
  },
  {
    id: 2,
    name: 'Sri Vyasatirtha',
    nameKannada: 'ಶ್ರೀ ವ್ಯಾಸತೀರ್ಥರು',
    asramaGuru: 1,
    asramaShishya: 3,
    description: 'The second in the illustrious lineage, Sri Vyasatirtha continued the sacred tradition of propagating Dvaita philosophy.',
  },
  {
    id: 3,
    name: 'Sri Vedyatirtha',
    nameKannada: 'ಶ್ರೀ ವೇದ್ಯತೀರ್ಥರು',
    asramaGuru: 2,
    asramaShishya: 4,
    description: 'Third peetadhipathi who upheld the traditions established by his predecessors.',
  },
  {
    id: 4,
    name: 'Sri Vedagarbhatirtha',
    nameKannada: 'ಶ್ರೀ ವೇದಗರ್ಭತೀರ್ಥರು',
    asramaGuru: 3,
    asramaShishya: 5,
    description: 'Continued the rich tradition of Vedantic scholarship and devotion.',
  },
  {
    id: 5,
    name: 'Sri Vareshatirtha',
    nameKannada: 'ಶ್ರೀ ವರೇಶತೀರ್ಥರು',
    asramaGuru: 4,
    asramaShishya: 6,
    description: 'Fifth in the sacred lineage of Sode Matha.',
  },
  {
    id: 6,
    name: 'Sri Vamanatirtha',
    nameKannada: 'ಶ್ರೀ ವಾಮನತೀರ್ಥರು',
    asramaGuru: 5,
    asramaShishya: 7,
    description: 'Sixth peetadhipathi of the Sode Matha lineage.',
  },
  {
    id: 7,
    name: 'Sri Vasudevatirtha',
    nameKannada: 'ಶ್ರೀ ವಾಸುದೇವತೀರ್ಥರು',
    asramaGuru: 6,
    asramaShishya: 8,
    description: 'Seventh in the revered lineage.',
  },
  {
    id: 8,
    name: 'Sri Vedavyasatirtha',
    nameKannada: 'ಶ್ರೀ ವೇದವ್ಯಾಸತೀರ್ಥರು',
    asramaGuru: 7,
    asramaShishya: 9,
    description: 'Eighth peetadhipathi, named after the great sage Vedavyasa.',
  },
  {
    id: 9,
    name: 'Sri Varahatirtha',
    nameKannada: 'ಶ್ರೀ ವರಾಹತೀರ್ಥರು',
    asramaGuru: 8,
    asramaShishya: 10,
    description: 'Ninth in the sacred succession.',
  },
  {
    id: 10,
    name: 'Sri Vedatmatirtha',
    nameKannada: 'ಶ್ರೀ ವೇದಾತ್ಮತೀರ್ಥರು',
    asramaGuru: 9,
    asramaShishya: 11,
    description: 'Tenth peetadhipathi of the lineage.',
  },
  {
    id: 11,
    name: 'Sri Vishwavandyatirtha I',
    nameKannada: 'ಶ್ರೀ ವಿಶ್ವವಂದ್ಯತೀರ್ಥರು - ೧',
    asramaGuru: 10,
    asramaShishya: 12,
    description: 'First of the peetadhipathis bearing the name Vishwavandya.',
  },
  {
    id: 12,
    name: 'Sri Ratnagarbhatirtha',
    nameKannada: 'ಶ್ರೀ ರತ್ನಗರ್ಭತೀರ್ಥರು',
    asramaGuru: 11,
    asramaShishya: 13,
    description: 'Twelfth in the illustrious succession.',
  },
  {
    id: 13,
    name: 'Sri Vedangatirtha',
    nameKannada: 'ಶ್ರೀ ವೇದಾಂಗತೀರ್ಥರು',
    asramaGuru: 12,
    asramaShishya: 14,
    description: 'Thirteenth peetadhipathi.',
  },
  {
    id: 14,
    name: 'Sri Vidyapatitirtha',
    nameKannada: 'ಶ್ರೀ ವಿದ್ಯಾಪತಿತೀರ್ಥರು',
    asramaGuru: 13,
    asramaShishya: 15,
    description: 'Fourteenth in the lineage, known for his scholarly pursuits.',
  },
  {
    id: 15,
    name: 'Sri Vishwavandyatirtha II',
    nameKannada: 'ಶ್ರೀ ವಿಶ್ವವಂದ್ಯತೀರ್ಥರು - ೨',
    asramaGuru: 14,
    asramaShishya: 16,
    description: 'Second peetadhipathi with the name Vishwavandya.',
  },
  {
    id: 16,
    name: 'Sri Vishwatirtha',
    nameKannada: 'ಶ್ರೀ ವಿಶ್ವತೀರ್ಥರು',
    asramaGuru: 15,
    asramaShishya: 17,
    description: 'Sixteenth in the sacred lineage.',
  },
  {
    id: 17,
    name: 'Sri Vitthalatirtha',
    nameKannada: 'ಶ್ರೀ ವಿಠ್ಠಲತೀರ್ಥರು',
    asramaGuru: 16,
    asramaShishya: 18,
    description: 'Seventeenth peetadhipathi.',
  },
  {
    id: 18,
    name: 'Sri Varadarajatirtha I',
    nameKannada: 'ಶ್ರೀ ವರದರಾಜತೀರ್ಥರು - ೧',
    asramaGuru: 17,
    asramaShishya: 19,
    description: 'First of the peetadhipathis named Varadaraja.',
  },
  {
    id: 19,
    name: 'Sri Vagishatirtha',
    nameKannada: 'ಶ್ರೀ ವಾಗೀಶತೀರ್ಥರು',
    asramaGuru: 18,
    asramaShishya: 20,
    description: 'Nineteenth peetadhipathi. He was the Ashrama Guru of the great Sri Vadirajatirtha. Under his guidance, Sri Vadiraja was ordained into Samnyasashrama at the age of seven.',
  },
  {
    id: 20,
    name: 'Sri Vadirajatirtha',
    nameKannada: 'ಶ್ರೀ ವಾದಿರಾಜತೀರ್ಥರು',
    asramaGuru: 19,
    asramaShishya: 21,
    poorvashramaName: 'Varaha',
    peethaFrom: '1488',
    peethaTo: '1600',
    aradhana: 'Phalguna Shukla Dvitiya',
    aradhanaKannada: 'ಫಾಲ್ಗುಣ ಶುಕ್ಲ ದ್ವಿತೀಯಾ',
    keyWorks: [
      'Rukminishavijaya (Mahakavya)',
      'Tirthaprabandha',
      'Yuktimallika',
      'Nyayaratnavali',
      'Mahabharatalakshalankara',
      'SvapnaVrindavanakhyana',
      'Lakshmi Shobhane',
      'Numerous Padas and Suladis',
    ],
    vrindavanaLocation: {
      name: 'Pancha Vrindavana',
      address: 'Sode (Sonda), near Sirsi, Uttara Kannada District, Karnataka',
      latitude: 14.4433,
      longitude: 74.8733,
    },
    description: `Sri Vadiraja was a great saint philosopher, the most facile writer in the Dvaita system. He was a gifted poet, a great mystic, a noted Haridasa and the like. Sri Vadiraja also deserves to be accredited as one of the great, authentic and noted facile writers.

Sri Vadirajatirtha happened to be the ever luminous crest jewel of the succession of Sri Vishnutirtha. Sri Vadiraja was born on Magha Shukla Dwadashi of Sharvari Samvatsara (1481 A.D) by the grace of Vagishatirtha, the nineteenth in the hierarchy of Vishnutirtha. His parents were Sri Ramacharya and Gouri. His birth name was Varaha as he was born with the blessings of Lord Varaha.

Sri Vadiraja was ordained the Samnyasashrama at the age of 7 by Vagishatirtha. He was named Vadirajatirtha. The name signifies his rich proficiency and pre-eminence in delivering the true import of lores and being an undaunted debater like a mighty lion to the elephants of opponents.

Sri Vadiraja was the only person after Sri Madhwacharya to visit Urdhvabadari. At the direction of Lord Vedavyasa, Sri Vadiraja authored an excellent commentary on Mahabharata namely Laksha-lankara. As promised, the supreme Lord in the form of Hayagriva appeared before Sri Vadiraja and blessed him.

Sri Vadiraja graced the Sarvajna Peetha 8 times across his life. He performed three Paryayas of two months each (from 1518 to 1522 A.D.) and five biennial Paryayas.

The span of Sri Vadiraja's mortal life was 120 years, the longest one ever seen. He was in charge of the pontifical seat for 83 years. He entered the holy Vrindavana alive at Sode (Sonda). Assuming five lustrous forms, Sri Vadiraja was present in all five Vrindavanas.`,
  },
  {
    id: 21,
    name: 'Sri Vedavedyatirtha',
    nameKannada: 'ಶ್ರೀ ವೇದವೇದ್ಯತೀರ್ಥರು',
    asramaGuru: 20,
    asramaShishya: 22,
    peethaFrom: '1530',
    peethaTo: '1616',
    description: 'Ordained by Sri Vadirajatirtha himself, Sri Vedavedyatirtha continued the sacred tradition. When Sri Vadiraja performed his fifth Paryaya at Sode, he was visibly present in Sode and invisibly present in his disciple Vedavedyatirtha at Udupi.',
  },
  {
    id: 22,
    name: 'Sri Vidyanidhitirtha',
    nameKannada: 'ಶ್ರೀ ವಿದ್ಯಾನಿಧಿತೀರ್ಥರು',
    asramaGuru: 21,
    asramaShishya: 23,
    description: 'Twenty-second peetadhipathi.',
  },
  {
    id: 23,
    name: 'Sri Vedanidhitirtha',
    nameKannada: 'ಶ್ರೀ ವೇದನಿಧಿತೀರ್ಥರು',
    asramaGuru: 22,
    asramaShishya: 24,
    description: 'In front of Sri Vedanidhitirtha, the Svapnavrindavanakhyana was revealed through a devoted brahmin who received teachings from Sri Vadiraja in his dreams over many years.',
  },
  {
    id: 24,
    name: 'Sri Varadarajatirtha II',
    nameKannada: 'ಶ್ರೀ ವರದರಾಜತೀರ್ಥರು - ೨',
    asramaGuru: 23,
    asramaShishya: 25,
    description: 'Second peetadhipathi bearing the name Varadaraja.',
  },
  {
    id: 25,
    name: 'Sri Vishwadhirajatirtha',
    nameKannada: 'ಶ್ರೀ ವಿಶ್ವಾಧಿರಾಜತೀರ್ಥರು',
    asramaGuru: 24,
    asramaShishya: 26,
    description: 'Twenty-fifth in the sacred succession.',
  },
  {
    id: 26,
    name: 'Sri Vadivandyatirtha',
    nameKannada: 'ಶ್ರೀ ವಾದಿವಂದ್ಯತೀರ್ಥರು',
    asramaGuru: 25,
    asramaShishya: 27,
    description: 'Twenty-sixth peetadhipathi.',
  },
  {
    id: 27,
    name: 'Sri Vishwavandyatirtha III',
    nameKannada: 'ಶ್ರೀ ವಿಶ್ವವಂದ್ಯತೀರ್ಥರು - ೩',
    asramaGuru: 26,
    asramaShishya: 28,
    description: 'Third peetadhipathi with the name Vishwavandya.',
  },
  {
    id: 28,
    name: 'Sri Vibudhavaryatirtha',
    nameKannada: 'ಶ್ರೀ ವಿಬುಧವರ್ಯತೀರ್ಥರು',
    asramaGuru: 27,
    asramaShishya: 29,
    description: 'Twenty-eighth in the lineage.',
  },
  {
    id: 29,
    name: 'Sri Vishwanidhitirtha',
    nameKannada: 'ಶ್ರೀ ವಿಶ್ವನಿಧಿತೀರ್ಥರು',
    asramaGuru: 28,
    asramaShishya: 30,
    description: 'Twenty-ninth peetadhipathi.',
  },
  {
    id: 30,
    name: 'Sri Vishwadhishwaratirtha',
    nameKannada: 'ಶ್ರೀ ವಿಶ್ವಾಧೀಶ್ವರತೀರ್ಥರು',
    asramaGuru: 29,
    asramaShishya: 31,
    description: 'Thirtieth in the sacred succession.',
  },
  {
    id: 31,
    name: 'Sri Vishweshatirtha',
    nameKannada: 'ಶ್ರೀ ವಿಶ್ವೇಶತೀರ್ಥರು',
    asramaGuru: 30,
    asramaShishya: 32,
    description: 'Thirty-first peetadhipathi.',
  },
  {
    id: 32,
    name: 'Sri Vishwapriyatirtha',
    nameKannada: 'ಶ್ರೀ ವಿಶ್ವಪ್ರಿಯತೀರ್ಥರು',
    asramaGuru: 31,
    asramaShishya: 33,
    peethaFrom: '1774',
    peethaTo: '1865',
    description: 'Known as Srimadvrindavan Acharya, thirty-second peetadhipathi who served for over 90 years.',
  },
  {
    id: 33,
    name: 'Sri Vishwadhishatirtha',
    nameKannada: 'ಶ್ರೀ ವಿಶ್ವಾಧೀಶತೀರ್ಥರು',
    asramaGuru: 32,
    asramaShishya: 34,
    description: 'Thirty-third in the lineage.',
  },
  {
    id: 34,
    name: 'Sri Vishwendratirtha',
    nameKannada: 'ಶ್ರೀ ವಿಶ್ವೇಂದ್ರತೀರ್ಥರು',
    asramaGuru: 33,
    asramaShishya: 35,
    description: 'Thirty-fourth peetadhipathi.',
  },
  {
    id: 35,
    name: 'Sri Vishwottamatirtha',
    nameKannada: 'ಶ್ರೀ ವಿಶ್ವೋತ್ತಮತೀರ್ಥರು',
    asramaGuru: 34,
    asramaShishya: 36,
    peethaFrom: '1934',
    peethaTo: '2007',
    description: 'The thirty-fifth peetadhipathi, revered for his spiritual guidance and dedication to the Matha. Under his leadership, the Matha saw significant growth and development.',
  },
  {
    id: 36,
    name: 'Sri Vishwavallabhatirtha',
    nameKannada: 'ಶ್ರೀ ವಿಶ್ವವಲ್ಲಭತೀರ್ಥರು',
    asramaGuru: 35,
    description: 'The present (36th) peetadhipathi of Sri Sode Vadiraja Matha. His Holiness continues the glorious tradition of propagating Dvaita Siddhanta and serving the devotees with utmost dedication.',
  },
];

// Sri Madhwacharya Information
export const madhwacharyaInfo: MadhwacharyaInfo = {
  name: 'Jagadguru Sri Madhwacharya',
  nameKannada: 'ಜಗದ್ಗುರು ಶ್ರೀ ಮಧ್ವಾಚಾರ್ಯರು',
  photo: undefined, // Placeholder
  birthPlace: 'Pajaka, Udupi District, Karnataka',
  birthYear: '1238 CE',
  mahasamadhi: '1317 CE',
  parents: 'Madhyagehabhat and Vedavati',
  asramaGuru: 'Sri Achyutaprekshatirtha',
  philosophy: 'Dvaita (Tatvavada)',
  keyWorks: [
    'Brahmasutra Bhashya',
    'Gita Bhashya',
    'Upanishad Bhashyas',
    'Mahabharata Tatparya Nirnaya',
    '37 Works collectively known as Sarvamula',
  ],
  description: `Among theistic schools, Sri Madhvacharya occupies key position of repute with regard. The greatness of Sri Madhvacharya is well glorified in the Sumadhvavijaya of Narayana Pandit.

Sri Madhvacharya is held as the third incarnation of god Vayu. Born of pious couple Madhyagehabhat and Vedavati at holy place Pajaka in the present Udupi district of Karnataka, Sri Madhvacharya took Samnyasashrama from Sri Achyutaprekshatirtha. He then became the successor of the pontificial lineage, started from Hamsa formed by Supreme Lord.

He did many miracles in his childhood and youth days. He was the first to go to Urdhvabadari and fortunate to have the holy Darshana of Lord Vedavyasa and Narayana. Receiving choicest blessings from them, Sri Madhvacharya wrote 37 works and dictated others which have been well known as 'Sarvamula'.

Sri Madhvacharya propounded the doctrine of difference. The difference lies between Supreme Lord, material and souls. All these three are different and distinct from each other. Lord Brahman is absolutely Complete (Poorna) in all respects, eternally liberated and hence has no bondage of Samsara. Moksha or complete liberation can be attained through the Lord's grace only. Pure devotion (Bhakti) is the only and chief means to secure Lord's grace.

Sri Madhvacharya set up a separate Matha in Udupi and installed a Saligrama statue of Lord Krishna. He worshiped Lord Krishna for many years. He nominated eight celebrated monks and entrusted to them the worship of Lord Krishna and propagation of Siddhanta. Thus, the Ashta Mathas were established.`,
};

// Sri Bhootaraja Information
export const bhootarajaInfo: BhootarajaInfo = {
  name: 'Sri Bhootaraja',
  nameKannada: 'ಶ್ರೀ ಭೂತರಾಜರು',
  photo: undefined, // Placeholder
  description: `Sri Bhootaraja is the divine attendant (Mukhyakinkara) of Sri Vadirajatirtha, serving the great saint with utmost devotion. 

According to the sacred tradition, Sri Vadiraja expiated the adverse effect of a curse on Sri Bhootaraja and blessed him endowed with super occult powers. Since then, Bhootaraja has been the prime attendant of the Guru, serving him devotedly.

When Sri Vadiraja received the Trivikrama idol from Lord Vedavyasa at Urdhvabadari, it was Sri Bhootaraja who carried the sacred idol to Sonda for installation.

A temple dedicated to Sri Bhootaraja stands in the corridor near the Pancha Vrindavana at Sode. Devotees pay their respects to Sri Bhootaraja before proceeding to the main Vrindavana, acknowledging his eternal service to Sri Vadirajatirtha.

Sri Bhootaraja is worshipped for his protective powers and his ability to fulfill the desires of sincere devotees who approach Sri Vadirajatirtha with pure hearts.`,
  significance: 'Sri Bhootaraja serves as the divine protector and gatekeeer of the Sode Matha. Devotees believe that seeking his blessings before approaching Sri Vadirajatirtha\'s Vrindavana brings special grace and fulfillment of wishes.',
  miracles: [
    'Protects devotees from evil spirits and negative energies',
    'Guides lost travelers to the Matha premises',
    'Fulfills the wishes of sincere devotees',
    'Guards the Matha premises day and night',
  ],
  templeLocation: {
    name: 'Sri Bhootaraja Sannidhi',
    address: 'Near Pancha Vrindavana, Sri Sode Vadiraja Matha, Sode, Karnataka',
    latitude: 14.4433,
    longitude: 74.8733,
  },
};

// Matha History
export const mathaHistory: MathaHistoryInfo = {
  title: 'History of Sri Sode Vadiraja Matha',
  titleKannada: 'ಶ್ರೀ ಸೋದೆ ವಾದಿರಾಜ ಮಠದ ಇತಿಹಾಸ',
  subTitle: 'One of the Ashta Mathas established by Sri Madhwacharya',
  established: '13th Century CE',
  founder: 'Sri Madhwacharya',
  location: {
    name: 'Sode (Sonda)',
    description: '281 km north of Mangalore',
    address: 'Sode, near Sirsi, Uttara Kannada District, Karnataka',
    latitude: 14.4433,
    longitude: 74.8733,
  },
  description: `The Sode Matha is part of the Ashta Mathas set up by Sri Madhvacharya. 281 km north of Mangalore is a small village by the name of Sode. It is also known as Sodha, Sonda and Swadi. This village is special because it is the headquarters of the Sode Matha.

A lake known as the Hayagriva Samudra is located just outside the matha. To the west of the lake, visitors can see the Dhwaja Stamba with depictions of the Hamsa and Garuda in front of the Rama Thrivikrama temple.`,
  significance: `The Sode Matha holds a unique position among the Ashta Mathas as it is the resting place of Sri Vadirajatirtha, one of the most revered saints in the Madhwa tradition. The Pancha Vrindavana, where Sri Vadirajatirtha's mortal remains rest, is the main attraction for thousands of devotees.

The Matha serves as a center for preserving and propagating Dvaita philosophy and continues the unbroken tradition of Vedic learning and devotional practices established by Sri Madhwacharya.`,
  keyMilestones: [
    { year: '13th Century', event: 'Establishment of Sode Matha as one of the Ashta Mathas by Sri Madhwacharya' },
    { year: '1480 CE', event: 'Birth of Sri Vadirajatirtha' },
    { year: '1575 CE', event: 'Sri Vadirajatirtha enters Brindavana (Maha Samadhi)' },
    { year: '16th Century', event: 'Construction of Pancha Vrindavana complex' },
    { year: 'Present', event: 'Sri Vishwavallabhatirtha serves as the 36th Peethadhipathi' },
  ],
  branches: [
    'Udupi Branch',
    'Bangalore Branch',
    'Mumbai Branch',
    'Hubli Branch',
  ],
  content: `The Sode Matha is part of the Ashta Mathas set up by Sri Madhvacharya. 281 km north of Mangalore is a small village by the name of Sode. It is also known as Sodha, Sonda and Swadi. This village is special because it is the headquarters of the Sode Matha.

A lake known as the Hayagriva Samudra is located just outside the matha. To the west of the lake, visitors can see the Dhwaja Stamba with depictions of the Hamsa and Garuda in front of the Rama Thrivikrama temple. This forms the first stage of the matha.

Ahead of this, on the second stage, are the Rajangana and the matha offices. This is the main entrance to the matha. Two wells known as the Antaraganga and Sheetalaganga are on this level.

The Dhavala Ganga tank and Sheethala Ganga tank are set on the lowest stage. The Pancha Vrindavans is located to the east of these tanks. Four Vrindavanas representing the presence of Lord Brahma, Lord Vishnu, Lord Shiva and Vayu form a perfect square with Sri Vadiraja Teertha's Vrindavana in the center.

A stone inscription of the Anuvrindavanakhyana can be seen beside Sri Vadiraja Teertha's Vrindavan. The Sri Vedavyasa temple is located opposite this. In the north is Naga Vana and on the right is the Bhootharaja Temple. Further, towards the east, are tombs of ten holy seers.

The lives of human beings are generally routine in nature, during most part of their life span. People get attracted by and inclined towards objects of enjoyment. But there also exist sorrow, pain, fear, uncertainties, difficulties etc, which affect everybody at one time or other. These negative aspects cause mental disturbance and affect the peace of mind.

Then the belief in God, Who is considered to be omnipresent, omniscient and omnipotent assumes greater importance. Craving for solace, solutions and peace, the people seek the blessing advice of learned scholars and sages. The saint scholars used to live in secluded places like Ashrama, temple, Matha and others. With the power of austerity, they tried their best to help and rescue mankind from mundane worries and sufferings.

Thus, Mathas became the religious centres headed by a Sanyasin with learned scholars and learning pupils. Belonging to one or other cult, Mathas have been playing an important role in continuing the teaching-learning process of sacred lores and preserving the culture and heritage.`,
};
