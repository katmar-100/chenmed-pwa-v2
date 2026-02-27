export const patient = {
  name: "Margaret Johnson",
  firstName: "Margaret",
  age: 72,
  dateOfBirth: "1953-08-14",
  memberId: "CM-2024-88421",
  phone: "(305) 555-0147",
  emergencyContact: { name: "Lisa Johnson", phone: "(305) 555-0298", relationship: "Daughter" },
  primaryDoctor: "Dr. Sarah Chen",
  center: "ChenMed Coral Way Center",
  memberSince: "2024",
  about: "I love gardening, spending time with my grandkids, and trying new healthy\u00A0recipes.",
  avatar: null,
  language: "English",
  pharmacy: {
    name: "CVS Pharmacy",
    address: "3015 SW 22nd St, Miami, FL 33145",
    phone: "(305) 445-2891",
    hours: "Mon–Fri 8am–9pm, Sat 9am–6pm, Sun 10am–5pm",
  },
};

export const doctors = [
  { id: "doc-1", name: "Dr. Sarah Chen", specialty: "Primary Care", rating: 4.9, credentials: "MD, FACP", location: "ChenMed Coral Way Center", address: "2750 SW 8th St, Miami, FL 33135", avatar: "female-1", availableSlots: ["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","2:00 PM","2:30 PM","3:00 PM"], bio: { education: "University of Miami Miller School of Medicine", residency: "Jackson Memorial Hospital — Internal Medicine", yearsWithChenMed: 6, languages: ["English", "Mandarin"], philosophy: "I believe every patient deserves to be heard. My goal is to build a relationship based on trust, so we can work together to keep you healthy and feeling your best.", funFact: "When I'm not at the clinic, I love making dumplings with my grandmother's recipe." }, reviews: [
    { author: "Sandra K.", rating: 5, text: "Dr. Chen is so patient and kind. She always takes the time to explain everything in a way I can understand. I never feel\u00A0rushed.", date: "2026-01-15" },
    { author: "Robert M.", rating: 5, text: "Best doctor I've ever had. She remembers details about my life and always follows up. Truly cares about her\u00A0patients.", date: "2026-01-28" },
    { author: "Linda T.", rating: 5, text: "Dr. Chen caught something another doctor missed. I'm so grateful for her thoroughness and attention to\u00A0detail.", date: "2026-02-05" },
    { author: "James P.", rating: 4, text: "Very knowledgeable and warm. The only downside is the office can sometimes run a bit behind\u00A0schedule.", date: "2026-02-12" },
  ]},
  { id: "doc-2", name: "Dr. James Rivera", specialty: "Cardiology", rating: 4.8, credentials: "MD, FACC", location: "ChenMed Coral Way Center", address: "2750 SW 8th St, Miami, FL 33135", avatar: "male-1", availableSlots: ["10:00 AM","10:30 AM","11:00 AM","1:00 PM","1:30 PM","2:00 PM","2:30 PM"], bio: { education: "University of Florida College of Medicine", residency: "Cleveland Clinic — Cardiology Fellowship", yearsWithChenMed: 4, languages: ["English", "Spanish"], philosophy: "The heart is more than just a muscle — it's the center of your life. I want my patients to understand their heart health without fear, so they can make confident choices.", funFact: "I run a free heart-health walk at Tropical Park every Saturday morning." }, reviews: [
    { author: "Patricia H.", rating: 5, text: "Dr. Rivera explained my heart condition so clearly. He used simple words and even drew a picture for me. I felt so much less\u00A0scared.", date: "2026-01-20" },
    { author: "Margaret J.", rating: 5, text: "He really listens and never makes me feel like my questions are silly. My blood pressure has improved so much under his\u00A0care.", date: "2026-02-01" },
    { author: "George W.", rating: 4, text: "Very skilled cardiologist. Takes his time during exams and explains test results\u00A0thoroughly.", date: "2026-02-10" },
  ]},
  { id: "doc-3", name: "Dr. Maria Lopez", specialty: "Endocrinology", rating: 5.0, credentials: "MD, FACE", location: "ChenMed Kendall Center", address: "8755 SW 94th St, Miami, FL 33176", avatar: "female-2", availableSlots: ["9:00 AM","9:30 AM","10:00 AM","11:00 AM","3:00 PM","3:30 PM"], bio: { education: "FIU Herbert Wertheim College of Medicine", residency: "Mount Sinai Medical Center — Endocrinology Fellowship", yearsWithChenMed: 8, languages: ["English", "Spanish", "Portuguese"], philosophy: "Managing diabetes is a journey, not a destination. I want to walk that journey with my patients — celebrating every win and working through every challenge together.", funFact: "I grow my own herbs and love sharing healthy cooking tips with patients." }, reviews: [
    { author: "Rosa G.", rating: 5, text: "Dr. Lopez helped me get my diabetes under control when I was really struggling. She never made me feel bad about my\u00A0numbers.", date: "2026-01-10" },
    { author: "Sandra K.", rating: 5, text: "So compassionate and encouraging! She celebrates every small win with me. My A1C has dropped two points since I started seeing\u00A0her.", date: "2026-01-25" },
    { author: "Betty A.", rating: 5, text: "She speaks Spanish which is wonderful for my mother. Always so respectful and thorough. We trust her\u00A0completely.", date: "2026-02-08" },
  ]},
  { id: "doc-4", name: "Dr. Robert Adams", specialty: "Internal Medicine", rating: 4.7, credentials: "MD, ABIM", location: "ChenMed Coral Way Center", address: "2750 SW 8th St, Miami, FL 33135", avatar: "male-2", availableSlots: ["8:30 AM","9:00 AM","9:30 AM","10:00 AM","1:00 PM","2:00 PM","3:00 PM","4:00 PM"], bio: { education: "Emory University School of Medicine", residency: "Baptist Health South Florida — Internal Medicine", yearsWithChenMed: 3, languages: ["English"], philosophy: "Prevention is the best medicine. I focus on helping my patients build healthy habits that last, because small changes today lead to big results over time.", funFact: "I lead the center's monthly nutrition workshop and make a mean smoothie bowl." }, reviews: [
    { author: "Thomas R.", rating: 5, text: "Dr. Adams is incredibly knowledgeable. He connected the dots between symptoms that other doctors hadn't\u00A0noticed.", date: "2026-01-18" },
    { author: "Helen M.", rating: 5, text: "He also leads the nutrition workshop which has been wonderful. Really practices what he preaches about healthy\u00A0living.", date: "2026-02-02" },
    { author: "James P.", rating: 4, text: "Good doctor who takes time to answer questions. His office runs a tight schedule which I\u00A0appreciate.", date: "2026-02-14" },
  ]},
  { id: "doc-5", name: "Dr. Priya Patel", specialty: "Geriatrics", rating: 4.9, credentials: "MD, AGSF", location: "ChenMed Kendall Center", address: "8755 SW 94th St, Miami, FL 33176", avatar: "female-3", availableSlots: ["9:00 AM","10:00 AM","11:00 AM","1:30 PM","2:30 PM","3:30 PM"], bio: { education: "Johns Hopkins University School of Medicine", residency: "University of Pennsylvania — Geriatric Medicine Fellowship", yearsWithChenMed: 5, languages: ["English", "Hindi", "Gujarati"], philosophy: "Aging is not a disease — it's a privilege. My patients deserve care that honors their experience and wisdom while keeping them active and independent.", funFact: "I teach a gentle yoga class at the Kendall center every Thursday." }, reviews: [
    { author: "Dorothy L.", rating: 5, text: "Dr. Patel truly understands the needs of older patients. She never talks down to me and always includes me in decisions about my\u00A0care.", date: "2026-01-22" },
    { author: "Margaret J.", rating: 5, text: "She spent extra time helping me understand my new medication. Even called to check on me the next day. That meant the world to\u00A0me.", date: "2026-02-06" },
    { author: "Frank S.", rating: 5, text: "My wife and I both see Dr. Patel. She remembers everything about us and our family. It's like talking to a friend who happens to be a brilliant\u00A0doctor.", date: "2026-02-15" },
    { author: "Linda T.", rating: 4, text: "Very gentle and thorough. The Kendall location is a bit of a drive but absolutely worth it for her\u00A0care.", date: "2026-02-18" },
  ]},
];

export const appointments = [
  { id: "apt-1", doctorId: "doc-1", date: "2026-02-23", time: "10:00 AM", location: "ChenMed Coral Way Center", address: "2750 SW 8th St, Miami, FL 33135", prep: "Remember to bring your medication list and any new symptoms to discuss. Wear comfortable clothes for your\u00A0check-up!" },
  { id: "apt-2", doctorId: "doc-2", date: "2026-02-26", time: "2:30 PM", location: "ChenMed Coral Way Center", address: "2750 SW 8th St, Miami, FL 33135", prep: "Avoid caffeine for 24 hours before your visit. Wear comfortable, loose clothing for the heart\u00A0exam." },
  { id: "apt-3", doctorId: "doc-3", date: "2026-03-03", time: "9:00 AM", location: "ChenMed Kendall Center", address: "8755 SW 94th St, Miami, FL 33176", prep: "Please fast for 8 hours before your appointment. You may drink water. We'll be checking your blood sugar\u00A0levels." },
  { id: "apt-4", doctorId: "doc-1", date: "2026-03-16", time: "11:00 AM", location: "ChenMed Coral Way Center", address: "2750 SW 8th St, Miami, FL 33135", prep: "This is a routine follow-up visit. Bring your blood pressure log if you have\u00A0one." },
];

export const medications = [
  { id: "med-1", name: "Metformin", dose: "500mg", rxNumber: "RX-7843291", frequency: "Twice daily", timeOfDay: "morning", timeLabel: "Take 1 tablet with breakfast", takenToday: false, pillType: "round-white", physicalDescription: "Small, round, white tablet. About the size of a pencil eraser. You may see '500' stamped on one side and a line down the middle on the other\u00A0side.", purpose: "Helps your body manage blood sugar levels. It's one of the most commonly prescribed medications for type 2\u00A0diabetes.", howToTake: "Take with food to reduce stomach upset. Swallow whole with a glass of\u00A0water.", sideEffects: "You might notice mild stomach discomfort or nausea at first. This usually gets better after a few\u00A0days.", talkToDoctor: "Tell your doctor if you have persistent nausea, unusual muscle pain, or difficulty\u00A0breathing." },
  { id: "med-2", name: "Lisinopril", dose: "10mg", rxNumber: "RX-7843292", frequency: "Once daily", timeOfDay: "morning", timeLabel: "Take 1 tablet in the morning", takenToday: false, pillType: "capsule-blue", physicalDescription: "Small, blue and white capsule. About the length of your pinky fingernail. You may see 'L 10' printed on the\u00A0side.", purpose: "Helps lower your blood pressure and protects your heart and kidneys. It relaxes your blood vessels so blood flows more\u00A0easily.", howToTake: "Take at the same time each morning, with or without\u00A0food.", sideEffects: "A dry cough is the most common side effect. You might also feel a little dizzy when standing\u00A0up.", talkToDoctor: "Contact your doctor right away if you notice swelling of your face, lips, or\u00A0tongue." },
  { id: "med-3", name: "Atorvastatin", dose: "20mg", rxNumber: "RX-7843293", frequency: "Once daily", timeOfDay: "evening", timeLabel: "Take 1 tablet at bedtime", takenToday: false, pillType: "oval-yellow", physicalDescription: "Small, oval, yellow tablet. About the size of a sunflower seed. Smooth coating on the outside. You may see '20' printed on one\u00A0side.", purpose: "Helps lower your cholesterol levels. Think of it as keeping your arteries clean and\u00A0clear.", howToTake: "Take at bedtime — your body makes the most cholesterol at night. Swallow\u00A0whole.", sideEffects: "Some people notice mild muscle aches. Stay hydrated and let your doctor know if this bothers\u00A0you.", talkToDoctor: "Tell your doctor if you experience unusual muscle pain, weakness, or dark-colored\u00A0urine." },
  { id: "med-4", name: "Amlodipine", dose: "5mg", rxNumber: "RX-7843294", frequency: "Once daily", timeOfDay: "morning", timeLabel: "Take 1 tablet in the morning", takenToday: false, pillType: "round-small", physicalDescription: "Very small, round, white tablet. About the size of a pea — one of your smallest pills. May have '5' printed on one\u00A0side.", purpose: "Helps relax and widen your blood vessels, making it easier for your heart to pump blood. Works alongside your other blood pressure\u00A0medication.", howToTake: "Take at the same time each day. Can be taken with or without\u00A0food.", sideEffects: "You might notice slight swelling in your ankles or feet. This is common and usually\u00A0mild.", talkToDoctor: "Let your doctor know if you feel very dizzy, have a rapid heartbeat, or notice significant\u00A0swelling." },
  { id: "med-5", name: "Vitamin D3", dose: "2000 IU", rxNumber: "RX-7843295", frequency: "Once daily", timeOfDay: "morning", timeLabel: "Take 1 softgel with breakfast", takenToday: false, pillType: "capsule-green", physicalDescription: "Small, oval, soft gel capsule. Golden-green color and slightly squishy to the touch. No writing on it — it looks like a tiny\u00A0olive.", purpose: "Helps keep your bones strong and supports your immune system. Many people don't get enough vitamin D, especially if they spend a lot of time\u00A0indoors.", howToTake: "Take with a meal that contains some fat — it helps your body absorb the vitamin\u00A0better.", sideEffects: "Very few side effects at this dose. Some people feel a mild stomach\u00A0upset.", talkToDoctor: "Mention to your doctor at your next visit if you're taking any other\u00A0supplements." },
];

export const vitals = {
  bloodPressure: [
    { date: "2026-02-20", systolic: 128, diastolic: 82 },
    { date: "2026-02-17", systolic: 132, diastolic: 85 },
    { date: "2026-02-13", systolic: 125, diastolic: 80 },
    { date: "2026-02-10", systolic: 130, diastolic: 84 },
    { date: "2026-02-06", systolic: 135, diastolic: 87 },
    { date: "2026-02-01", systolic: 138, diastolic: 89 },
    { date: "2026-01-27", systolic: 133, diastolic: 86 },
    { date: "2026-01-22", systolic: 140, diastolic: 90 },
    { date: "2026-01-17", systolic: 136, diastolic: 88 },
    { date: "2026-01-12", systolic: 142, diastolic: 91 },
  ],
  weight: [
    { date: "2026-02-20", value: 168, unit: "lbs" },
    { date: "2026-02-13", value: 169, unit: "lbs" },
    { date: "2026-02-06", value: 170, unit: "lbs" },
    { date: "2026-01-30", value: 170, unit: "lbs" },
    { date: "2026-01-23", value: 171, unit: "lbs" },
    { date: "2026-01-16", value: 172, unit: "lbs" },
    { date: "2026-01-09", value: 173, unit: "lbs" },
    { date: "2026-01-02", value: 174, unit: "lbs" },
  ],
  bloodGlucose: [
    { date: "2026-02-20", value: 142, unit: "mg/dL" },
    { date: "2026-02-17", value: 138, unit: "mg/dL" },
    { date: "2026-02-13", value: 125, unit: "mg/dL" },
    { date: "2026-02-10", value: 148, unit: "mg/dL" },
    { date: "2026-02-06", value: 135, unit: "mg/dL" },
    { date: "2026-02-01", value: 150, unit: "mg/dL" },
    { date: "2026-01-27", value: 140, unit: "mg/dL" },
    { date: "2026-01-22", value: 155, unit: "mg/dL" },
  ],
  heartRate: [
    { date: "2026-02-20", value: 72, unit: "bpm" },
    { date: "2026-02-17", value: 74, unit: "bpm" },
    { date: "2026-02-13", value: 70, unit: "bpm" },
    { date: "2026-02-10", value: 76, unit: "bpm" },
    { date: "2026-02-06", value: 71, unit: "bpm" },
    { date: "2026-02-01", value: 78, unit: "bpm" },
    { date: "2026-01-27", value: 73, unit: "bpm" },
    { date: "2026-01-22", value: 75, unit: "bpm" },
  ],
  cholesterol: [
    { date: "2026-02-15", total: 198, ldl: 118, hdl: 52, triglycerides: 140 },
    { date: "2026-01-15", total: 205, ldl: 125, hdl: 50, triglycerides: 150 },
    { date: "2025-12-15", total: 212, ldl: 130, hdl: 48, triglycerides: 170 },
    { date: "2025-11-15", total: 220, ldl: 138, hdl: 46, triglycerides: 180 },
    { date: "2025-10-15", total: 225, ldl: 142, hdl: 45, triglycerides: 190 },
  ],
  vitaminsAndMinerals: [
    { name: "Vitamin D", value: 32, unit: "ng/mL", normalRange: "30-100", status: "normal", date: "2026-02-15" },
    { name: "Vitamin B12", value: 450, unit: "pg/mL", normalRange: "200-900", status: "normal", date: "2026-02-15" },
    { name: "Iron", value: 65, unit: "mcg/dL", normalRange: "60-170", status: "normal", date: "2026-02-15" },
    { name: "Calcium", value: 9.2, unit: "mg/dL", normalRange: "8.5-10.5", status: "normal", date: "2026-02-15" },
    { name: "Magnesium", value: 1.6, unit: "mg/dL", normalRange: "1.7-2.2", status: "low", date: "2026-02-15" },
    { name: "Potassium", value: 4.1, unit: "mEq/L", normalRange: "3.5-5.0", status: "normal", date: "2026-02-15" },
    { name: "Folate", value: 8.5, unit: "ng/mL", normalRange: "2.7-17", status: "normal", date: "2026-02-15" },
    { name: "Zinc", value: 58, unit: "mcg/dL", normalRange: "60-120", status: "low", date: "2026-02-15" },
  ],
};

export const communityGroups = [
  { id: "grp-1", name: "Morning Walkers Club", members: 32, description: "We share our daily walks and cheer each other\u00A0on!", icon: "walking", posts: [
    { author: "Sandra K.", text: "Just finished a 25-minute walk around the park! The weather is beautiful today.", time: "2 hours ago" },
    { author: "Anonymous", text: "Day 15 of my walking streak! Never thought I'd make it this far.", time: "4 hours ago" },
    { author: "Robert M.", text: "Anyone want to do a group walk at Tropical Park this Saturday?", time: "Yesterday" },
  ]},
  { id: "grp-2", name: "Healthy Cooking Circle", members: 28, description: "Recipe swaps, cooking tips, and food\u00A0photos!", icon: "cooking", posts: [
    { author: "Maria G.", text: "Tried the low-sodium chicken soup recipe — my family loved it!", time: "1 hour ago" },
    { author: "Anonymous", text: "Does anyone have a good sugar-free dessert recipe?", time: "3 hours ago" },
    { author: "James T.", text: "Made salmon bowls for dinner. So easy and delicious!", time: "Yesterday" },
  ]},
  { id: "grp-3", name: "Book Club for Wellness", members: 19, description: "Reading and discussing books about health and\u00A0happiness.", icon: "book", posts: [
    { author: "Patricia H.", text: "Just started 'The Blue Zones' — fascinating so far!", time: "5 hours ago" },
    { author: "Linda M.", text: "This month's pick really changed how I think about sleep.", time: "Yesterday" },
  ]},
  { id: "grp-4", name: "Grandparents Corner", members: 45, description: "Share stories, photos, and advice about\u00A0grandparenting.", icon: "family", posts: [
    { author: "Margaret J.", text: "My granddaughter just took her first steps! So proud!", time: "3 hours ago" },
    { author: "Robert M.", text: "Teaching my grandson to play chess. He's a natural!", time: "Yesterday" },
    { author: "Anonymous", text: "Best gift ideas for a 10-year-old? Birthday coming up!", time: "2 days ago" },
  ]},
  { id: "grp-5", name: "Heart Health Heroes", members: 47, description: "Supporting each other on the journey to better heart\u00A0health.", icon: "heart", posts: [
    { author: "Anonymous", text: "Just took my evening walk — 20 minutes!", time: "1 hour ago" },
    { author: "Robert M.", text: "Down 3 points on my BP this month!", time: "4 hours ago" },
    { author: "Sandra K.", text: "Anyone else trying the low-sodium recipes? The chicken one is great!", time: "Yesterday" },
  ]},
];

export const recipes = [
  { id: "rec-1", name: "Heart-Healthy Salmon Bowl", time: "15 min", difficulty: "Easy", tags: ["Heart Healthy", "High Protein"], icon: "fish", ingredients: ["4 oz salmon fillet", "1 cup brown rice (cooked)", "1/2 avocado, sliced", "1 cup mixed greens", "1 tbsp olive oil", "Lemon juice", "Salt-free seasoning"], instructions: ["Cook the salmon in a pan with olive oil for 4 minutes each side.", "Place brown rice in a bowl as your base.", "Add mixed greens alongside the rice.", "Place the cooked salmon on top.", "Add avocado slices and squeeze fresh lemon.", "Season with your favorite salt-free\u00A0herbs!"] },
  { id: "rec-2", name: "Simple Low-Sodium Chicken Soup", time: "30 min", difficulty: "Easy", tags: ["Low Sodium", "Comforting"], icon: "soup", ingredients: ["2 chicken breasts", "4 cups low-sodium chicken broth", "2 carrots, diced", "2 celery stalks, diced", "1 onion, diced", "2 cloves garlic", "Fresh herbs (thyme, parsley)"], instructions: ["Sauté onion, garlic, carrots, and celery in a large pot for 5 minutes.", "Add chicken broth and bring to a boil.", "Add chicken breasts, reduce heat, and simmer for 15 minutes.", "Remove chicken, shred with two forks, and return to pot.", "Add fresh herbs and simmer for 5 more minutes.", "Serve warm — perfect for a cozy\u00A0evening!"] },
  { id: "rec-3", name: "Berry Smoothie for Blood Sugar", time: "5 min", difficulty: "Easy", tags: ["Diabetic Friendly", "Quick"], icon: "smoothie", ingredients: ["1/2 cup blueberries", "1/2 cup strawberries", "1/2 cup plain Greek yogurt", "1/4 cup unsweetened almond milk", "1 tbsp ground flaxseed", "Ice cubes"], instructions: ["Add all ingredients to a blender.", "Blend until smooth — about 30 seconds.", "Pour into a glass and enjoy!", "Tip: The protein in Greek yogurt helps balance blood\u00A0sugar."] },
  { id: "rec-4", name: "Mediterranean Veggie Wrap", time: "10 min", difficulty: "Easy", tags: ["Heart Healthy", "Vegetarian"], icon: "wrap", ingredients: ["1 whole wheat tortilla", "1/4 cup hummus", "1/2 cup mixed greens", "1/4 cucumber, sliced", "Cherry tomatoes, halved", "Feta cheese crumbles", "Olive oil drizzle"], instructions: ["Spread hummus evenly on the tortilla.", "Layer greens, cucumber, and tomatoes.", "Sprinkle feta cheese and drizzle olive oil.", "Roll up tightly, cut in half, and\u00A0enjoy!"] },
  { id: "rec-5", name: "Oatmeal with Cinnamon & Walnuts", time: "10 min", difficulty: "Easy", tags: ["Heart Healthy", "Diabetic Friendly"], icon: "bowl", ingredients: ["1/2 cup rolled oats", "1 cup water or milk", "1/2 tsp cinnamon", "2 tbsp chopped walnuts", "1/2 banana, sliced", "Drizzle of honey (optional)"], instructions: ["Cook oats with water or milk on medium heat for 5 minutes.", "Stir in cinnamon.", "Top with walnuts and banana slices.", "Add a small drizzle of honey if desired.", "A warm, filling breakfast that's great for your\u00A0heart!"] },
];

export const communityEvents = [
  { id: "evt-1", name: "Virtual Chair Yoga", day: "Wednesday", time: "10:00 AM", host: "Instructor Maya" },
  { id: "evt-2", name: "Nutrition Workshop", day: "Thursday", time: "2:00 PM", host: "Dr. Robert Adams" },
  { id: "evt-3", name: "Walking Challenge Kick-off", day: "Saturday", time: "9:00 AM", host: "Morning Walkers Club" },
];

export const exercises = {
  chair: [
    { id: "ex-1", name: "Seated Arm Raises", duration: "5 min", difficulty: "Easy", desc: "Great for shoulder\u00A0mobility", instructions: ["Sit tall in a sturdy chair with feet flat on the floor.", "Start with arms at your sides.", "Slowly raise both arms out to the sides and up overhead.", "Hold for 2 seconds, then slowly lower.", "Repeat 10 times. Rest if needed!", "Remember to breathe — inhale as you raise, exhale as you\u00A0lower."] },
    { id: "ex-2", name: "Chair Squats", duration: "5 min", difficulty: "Easy", desc: "Strengthens your legs for standing and\u00A0walking", instructions: ["Stand in front of a sturdy chair.", "Slowly lower yourself as if sitting down.", "Just before you touch the seat, pause for 1 second.", "Stand back up using your leg muscles.", "Repeat 8-10 times.", "Hold onto the chair's arms for support if\u00A0needed."] },
    { id: "ex-3", name: "Ankle Circles", duration: "3 min", difficulty: "Easy", desc: "Improves circulation in your feet and\u00A0legs", instructions: ["Sit in a chair and lift one foot slightly off the floor.", "Slowly rotate your ankle in circles — 10 times clockwise.", "Then 10 times counterclockwise.", "Switch to the other foot and repeat.", "This helps blood flow and prevents\u00A0stiffness!"] },
    { id: "ex-4", name: "Seated Marching", duration: "5 min", difficulty: "Easy", desc: "Gets your heart pumping\u00A0gently", instructions: ["Sit tall in your chair.", "Lift one knee up toward your chest, then lower it.", "Alternate legs, like you're marching in place.", "Swing your arms naturally as you march.", "Keep going for 2-3 minutes at a comfortable pace.", "Great for warming up or a midday energy\u00A0boost!"] },
  ],
  walking: [
    { id: "wk-1", name: "5-Minute Starter Walk", desc: "Just around your block. Every step\u00A0counts!" },
    { id: "wk-2", name: "15-Minute Neighborhood Stroll", desc: "A bit further today. You've got\u00A0this!" },
    { id: "wk-3", name: "30-Minute Park Walk", desc: "For when you're feeling\u00A0strong!" },
  ],
  stretching: [
    { id: "st-1", name: "Morning Wake-Up Stretch", duration: "5 min", desc: "Gentle stretches to start your day\u00A0right" },
    { id: "st-2", name: "After-Meal Gentle Stretch", duration: "3 min", desc: "Helps digestion and keeps you\u00A0flexible" },
  ],
};

export const triviaQuestions = [
  { q: "How many glasses of water should most adults drink each day?", options: ["4-5 glasses", "6-8 glasses", "10-12 glasses"], answer: 1, fact: "Staying hydrated helps your body regulate temperature, keep joints lubricated, and deliver nutrients to cells!" },
  { q: "Which type of exercise is best for heart health?", options: ["Heavy weightlifting", "Walking or swimming", "Stretching only"], answer: 1, fact: "Regular moderate exercise like walking strengthens your heart muscle and improves circulation. Even 15 minutes a day makes a difference!" },
  { q: "What is considered a normal resting heart rate for adults?", options: ["40-50 bpm", "60-100 bpm", "110-130 bpm"], answer: 1, fact: "A lower resting heart rate usually means better cardiovascular fitness. Regular exercise can help lower your resting heart rate over time." },
  { q: "Which nutrient is most important for strong bones?", options: ["Vitamin C", "Iron", "Calcium and Vitamin D"], answer: 2, fact: "Calcium builds and maintains bones, while Vitamin D helps your body absorb calcium. They work as a team!" },
  { q: "How many hours of sleep do most adults over 65 need?", options: ["5-6 hours", "7-8 hours", "9-10 hours"], answer: 1, fact: "Quality matters as much as quantity! Good sleep habits include keeping a regular schedule and making your bedroom comfortable and dark." },
];

export const aiResponses = {
  "What does my blood pressure mean?": "Great question, Margaret! Your last blood pressure reading was 128/82. The top number (128) is called systolic — it measures pressure when your heart beats. The bottom number (82) is diastolic — pressure when your heart rests between\u00A0beats.\n\nYour numbers are in what doctors call the \"elevated\" range, which means they're slightly above the ideal of 120/80, but not in the high blood pressure zone yet. That's pretty good\u00A0news!\n\nKeeping up with your Lisinopril and Amlodipine, plus regular walks, is exactly the right approach. Your care team at ChenMed is tracking your numbers and will let you know if anything needs\u00A0adjusting.",
  "Can I take Metformin with food?": "Yes, absolutely! In fact, taking Metformin with food is recommended. It helps reduce any stomach upset, which is the most common side effect when people first start taking\u00A0it.\n\nYour prescription says to take it with breakfast, which is perfect. Try to take it at roughly the same time each day — consistency helps it work\u00A0best.\n\nOne small tip: avoid drinking alcohol right after taking Metformin, as it can lower your blood sugar too much. If you ever forget a dose, just take it when you remember — unless it's almost time for your next dose. Never double\u00A0up!",
  "How can I sleep better?": "Sleep is so important for your health, Margaret! Here are some tips that many of our patients find\u00A0helpful:\n\n1. Try to go to bed and wake up at the same time every day — yes, even\u00A0weekends!\n2. Make your bedroom cool, dark, and quiet. A fan or white noise machine can\u00A0help.\n3. Avoid screens (TV, phone, tablet) for at least 30 minutes before bed. Try reading a book\u00A0instead.\n4. Skip caffeine after 2 PM — it stays in your body longer than you might\u00A0think.\n5. A warm cup of chamomile tea before bed can be wonderfully\u00A0relaxing.\n\nIf you're still having trouble sleeping, mention it to Dr. Chen at your next visit. There's a lot she can help\u00A0with!",
  "What exercises are safe for me?": "There are lots of great exercises that are safe and beneficial for you! Based on your health profile, here are some wonderful\u00A0options:\n\nWalking is fantastic — even 15-20 minutes a day can improve your heart health, mood, and energy levels. Start short and build up\u00A0gradually.\n\nChair exercises are perfect for building strength without the risk of falls. Try seated arm raises, ankle circles, and gentle marching in\u00A0place.\n\nStretching helps keep you flexible and reduces stiffness. The morning wake-up routine in your Exercise section is a great place to\u00A0start!\n\nSwimming or water aerobics are very gentle on your joints while giving you a full-body\u00A0workout.\n\nAlways listen to your body — if something hurts, stop. And check with Dr. Chen before starting any new exercise\u00A0routine!",
};

export const blogArticles = [
  { id: 'blog-1', title: 'Why Your Annual Wellness Visit Matters More Than You Think', excerpt: 'Your annual visit is more than a check-up — it\'s a chance to catch problems early, update your care plan, and build a stronger relationship with your doctor. At ChenMed, we use this time to really listen and understand your whole health\u00A0picture.', category: 'Preventive Care', readTime: '4 min read', date: '2026-02-20', icon: 'shield' },
  { id: 'blog-2', title: 'Margaret\'s Story: How Small Changes Made a Big Difference', excerpt: 'When Margaret first joined ChenMed, her blood pressure was consistently high and she felt tired all the time. With the support of her care team, she started walking 15 minutes a day and making small diet changes. Six months later, her numbers improved\u00A0dramatically.', category: 'Patient Stories', readTime: '5 min read', date: '2026-02-14', icon: 'heart' },
  { id: 'blog-3', title: '5 Heart-Healthy Snacks You\'ll Actually Enjoy', excerpt: 'Eating for your heart doesn\'t mean giving up flavor. Try these five delicious snacks that your cardiologist would approve of — from avocado toast with everything seasoning to dark chocolate covered\u00A0almonds.', category: 'Wellness', readTime: '3 min read', date: '2026-02-08', icon: 'apple' },
  { id: 'blog-4', title: 'Understanding Your Blood Pressure Numbers', excerpt: 'What do those two numbers really mean? We break down systolic vs. diastolic, what\'s considered normal, and simple steps you can take at home to keep your numbers in a healthy\u00A0range.', category: 'Preventive Care', readTime: '5 min read', date: '2026-01-30', icon: 'activity' },
  { id: 'blog-5', title: 'The Loneliness Epidemic: Why Community Matters for Your Health', excerpt: 'Research shows that social isolation can be as harmful as smoking 15 cigarettes a day. Discover how ChenMed\'s community programs are helping patients stay connected and live longer, healthier\u00A0lives.', category: 'Wellness', readTime: '6 min read', date: '2026-01-22', icon: 'users' },
  { id: 'blog-6', title: 'Roberto\'s Journey: From Pre-Diabetes to Prevention', excerpt: 'Roberto was told he was pre-diabetic and felt overwhelmed. His ChenMed care team helped him understand his options and built a personalized plan. Today, his blood sugar is back in the normal range — no medication\u00A0needed.', category: 'Patient Stories', readTime: '4 min read', date: '2026-01-15', icon: 'star' },
];

export const healthNews = [
  { id: 'news-1', title: 'New Study: Walking Just 4,000 Steps a Day Reduces Heart Disease Risk by 25%', excerpt: 'A major study published this month found that even moderate daily walking significantly lowers cardiovascular risk in adults over 60 — far fewer steps than the commonly cited 10,000\u00A0goal.', source: 'Journal of the American Heart Association', date: '2026-02-18', icon: 'trending' },
  { id: 'news-2', title: 'Medicare Advantage Plans to Cover More Preventive Dental Care in 2027', excerpt: 'CMS announced expanded dental coverage for Medicare Advantage members starting next year, including two annual cleanings and basic restorative care at no additional\u00A0cost.', source: 'CMS.gov', date: '2026-02-12', icon: 'shield' },
  { id: 'news-3', title: 'Breakthrough: New Alzheimer\'s Treatment Shows Promise in Slowing Cognitive Decline', excerpt: 'A new therapeutic approach targeting brain inflammation has shown significant results in Phase 3 trials, slowing memory loss by up to 35% in early-stage Alzheimer\'s\u00A0patients.', source: 'National Institutes of Health', date: '2026-02-05', icon: 'brain' },
  { id: 'news-4', title: 'Senior Fitness Programs Linked to 40% Fewer Falls, Study Finds', excerpt: 'Community-based exercise programs designed for older adults dramatically reduced fall-related injuries, according to a new CDC report. Chair exercises and balance training were the most\u00A0effective.', source: 'CDC Prevention Report', date: '2026-01-28', icon: 'activity' },
  { id: 'news-5', title: 'Telehealth Usage Among Seniors Doubles, Improving Access to Care', excerpt: 'A national survey shows that telehealth adoption among adults over 65 has doubled since 2024, with patients reporting higher satisfaction and fewer missed\u00A0appointments.', source: 'AARP Health Research', date: '2026-01-20', icon: 'phone' },
  { id: 'news-6', title: 'Mediterranean Diet Officially Recommended for Heart Disease Prevention', excerpt: 'The American Heart Association has issued its strongest endorsement yet of the Mediterranean diet, citing overwhelming evidence of its benefits for cardiovascular health in older\u00A0adults.', source: 'American Heart Association', date: '2026-01-12', icon: 'heart' },
];

export const defaultSettings = {
  fontSizeMode: 'normal',
  theme: 'classic',
  showSunny: true,
  medicationReminders: true,
  appointmentReminders: true,
  communityDisplayName: 'real',
  shareVitals: false,
};

export const avatarOptions = [
  'flower-pink', 'flower-blue', 'bird-teal', 'sun-happy', 'cat-purple', 'butterfly', 'tree-green', 'star-gold'
];

export const longevityTips = [
  "Did you know? People who maintain social connections tend to live longer. Call a friend\u00A0today!",
  "Studies show that laughing for 15 minutes a day can improve your heart health. Watch something funny\u00A0tonight!",
  "Eating colorful fruits and vegetables gives your body different nutrients. Try to eat the\u00A0rainbow!",
  "Taking a 10-minute walk after meals can help lower blood sugar by up to 22%. Every step\u00A0counts!",
  "Gratitude journaling for just 5 minutes a day has been shown to improve sleep quality and\u00A0mood.",
  "Staying curious and learning new things helps keep your brain healthy. What will you explore\u00A0today?",
];

export const healthArticles = [
  { id: "art-1", title: "The Power of Walking: How 20 Minutes a Day Adds Years to Your Life", summary: "Discover why the simplest exercise is also one of the most powerful for\u00A0longevity.", readTime: "5 min read" },
  { id: "art-2", title: "Sleep Better Tonight: 5 Simple Changes", summary: "Small adjustments to your bedtime routine can make a big difference in sleep\u00A0quality.", readTime: "4 min read" },
  { id: "art-3", title: "The Mediterranean Diet: Why Doctors Love It", summary: "Learn how the foods of the Mediterranean can protect your heart and boost your\u00A0mood.", readTime: "6 min read" },
];
