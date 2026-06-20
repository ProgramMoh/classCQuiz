// California Class C License — Question Bank
// Based on the official California Driver Handbook
// Categories: Rules of the Road, Traffic Signs & Signals, Speed Laws,
// Safe Driving, Parking, Alcohol & Drugs, Sharing the Road,
// Emergencies, Vehicle Equipment, Special Driving Conditions

const CATEGORIES = [
  "Rules of the Road",
  "Traffic Signs & Signals",
  "Speed Laws",
  "Safe Driving",
  "Parking",
  "Alcohol & Drugs",
  "Sharing the Road",
  "Emergencies",
  "Vehicle Equipment",
  "Special Driving Conditions"
];

// SVG road sign generators for visual questions
const SIGN_SVGS = {
  stop: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><polygon points="60,5 100,25 115,60 100,95 60,115 20,95 5,60 20,25" fill="#CC0000" stroke="#fff" stroke-width="4"/><text x="60" y="68" text-anchor="middle" fill="#fff" font-size="24" font-weight="bold" font-family="Arial">STOP</text></svg>`,
  
  yield: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><polygon points="60,10 110,110 10,110" fill="#fff" stroke="#CC0000" stroke-width="6"/><text x="60" y="85" text-anchor="middle" fill="#CC0000" font-size="18" font-weight="bold" font-family="Arial">YIELD</text></svg>`,
  
  doNotEnter: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="55" fill="#CC0000" stroke="#fff" stroke-width="4"/><rect x="20" y="48" width="80" height="24" rx="3" fill="#fff"/><text x="60" y="40" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold" font-family="Arial">DO NOT</text><text x="60" y="90" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold" font-family="Arial">ENTER</text></svg>`,
  
  wrongWay: `<svg viewBox="0 0 140 50" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="136" height="46" rx="5" fill="#CC0000" stroke="#fff" stroke-width="3"/><text x="70" y="33" text-anchor="middle" fill="#fff" font-size="18" font-weight="bold" font-family="Arial">WRONG WAY</text></svg>`,
  
  speedLimit: (speed) => `<svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="90" height="120" rx="5" fill="#fff" stroke="#000" stroke-width="4"/><text x="50" y="30" text-anchor="middle" fill="#000" font-size="12" font-weight="bold" font-family="Arial">SPEED</text><text x="50" y="45" text-anchor="middle" fill="#000" font-size="12" font-weight="bold" font-family="Arial">LIMIT</text><text x="50" y="95" text-anchor="middle" fill="#000" font-size="48" font-weight="bold" font-family="Arial">${speed}</text></svg>`,
  
  schoolZone: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><polygon points="60,5 115,115 5,115" fill="#FFD700" stroke="#000" stroke-width="3"/><text x="60" y="65" text-anchor="middle" fill="#000" font-size="10" font-weight="bold" font-family="Arial">SCHOOL</text><text x="60" y="80" text-anchor="middle" fill="#000" font-size="10" font-weight="bold" font-family="Arial">ZONE</text><text x="60" y="100" text-anchor="middle" fill="#000" font-size="9" font-family="Arial">25 MPH</text></svg>`,
  
  noUTurn: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="55" fill="#fff" stroke="#CC0000" stroke-width="5"/><path d="M45,80 L45,45 Q45,30 60,30 Q75,30 75,45 L75,60" fill="none" stroke="#000" stroke-width="6" stroke-linecap="round"/><polygon points="68,55 82,55 75,68" fill="#000"/><line x1="20" y1="100" x2="100" y2="20" stroke="#CC0000" stroke-width="6"/></svg>`,
  
  railroadCrossing: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="55" fill="#FFD700" stroke="#000" stroke-width="3"/><line x1="30" y1="30" x2="90" y2="90" stroke="#000" stroke-width="10"/><line x1="90" y1="30" x2="30" y2="90" stroke="#000" stroke-width="10"/><text x="60" y="30" text-anchor="middle" fill="#000" font-size="22" font-weight="bold" font-family="Arial">R</text><text x="30" y="67" text-anchor="middle" fill="#000" font-size="22" font-weight="bold" font-family="Arial">R</text><text x="90" y="67" text-anchor="middle" fill="#000" font-size="22" font-weight="bold" font-family="Arial">R</text><text x="60" y="105" text-anchor="middle" fill="#000" font-size="22" font-weight="bold" font-family="Arial">R</text></svg>`,
  
  pedestrianCrossing: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><polygon points="60,5 115,115 5,115" fill="#FFD700" stroke="#000" stroke-width="3"/><circle cx="60" cy="40" r="7" fill="#000"/><line x1="60" y1="47" x2="60" y2="75" stroke="#000" stroke-width="4"/><line x1="60" y1="55" x2="45" y2="65" stroke="#000" stroke-width="3"/><line x1="60" y1="55" x2="75" y2="65" stroke="#000" stroke-width="3"/><line x1="60" y1="75" x2="48" y2="95" stroke="#000" stroke-width="3"/><line x1="60" y1="75" x2="72" y2="95" stroke="#000" stroke-width="3"/></svg>`,
  
  mergeRight: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><polygon points="60,5 115,115 5,115" fill="#FFD700" stroke="#000" stroke-width="3"/><path d="M60,30 L60,70 Q60,85 75,90" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/><path d="M45,90 L60,30 L60,90" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/></svg>`,
  
  curveAhead: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><polygon points="60,5 115,115 5,115" fill="#FFD700" stroke="#000" stroke-width="3"/><path d="M50,95 L50,55 Q50,35 70,35 L80,35" fill="none" stroke="#000" stroke-width="6" stroke-linecap="round"/><polygon points="75,25 90,35 75,45" fill="#000"/></svg>`,
  
  construction: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><polygon points="60,5 115,115 5,115" fill="#FF8C00" stroke="#000" stroke-width="3"/><text x="60" y="70" text-anchor="middle" fill="#000" font-size="10" font-weight="bold" font-family="Arial">ROAD</text><text x="60" y="85" text-anchor="middle" fill="#000" font-size="10" font-weight="bold" font-family="Arial">WORK</text><text x="60" y="100" text-anchor="middle" fill="#000" font-size="10" font-weight="bold" font-family="Arial">AHEAD</text></svg>`,
  
  oneWay: `<svg viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="156" height="46" rx="3" fill="#000" stroke="#fff" stroke-width="3"/><text x="80" y="22" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold" font-family="Arial">ONE WAY</text><polygon points="120,10 150,25 120,40" fill="#fff"/></svg>`,
  
  noLeftTurn: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="55" fill="#fff" stroke="#CC0000" stroke-width="5"/><path d="M75,80 L75,50 Q75,35 60,35 Q45,35 45,50 L45,55" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/><polygon points="38,50 52,50 45,38" fill="#000"/><line x1="20" y1="100" x2="100" y2="20" stroke="#CC0000" stroke-width="6"/></svg>`,
  
  keepRight: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="90" height="110" rx="5" fill="#fff" stroke="#000" stroke-width="3"/><text x="50" y="35" text-anchor="middle" fill="#000" font-size="12" font-weight="bold" font-family="Arial">KEEP</text><text x="50" y="55" text-anchor="middle" fill="#000" font-size="12" font-weight="bold" font-family="Arial">RIGHT</text><polygon points="50,65 65,90 35,90" fill="#000"/><line x1="65" y1="77" x2="65" y2="100" stroke="#000" stroke-width="3"/></svg>`,
  
  sharedLaneBikes: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><polygon points="60,5 115,115 5,115" fill="#FFD700" stroke="#000" stroke-width="3"/><text x="60" y="55" text-anchor="middle" fill="#000" font-size="10" font-weight="bold" font-family="Arial">SHARE</text><text x="60" y="70" text-anchor="middle" fill="#000" font-size="10" font-weight="bold" font-family="Arial">THE</text><text x="60" y="85" text-anchor="middle" fill="#000" font-size="10" font-weight="bold" font-family="Arial">ROAD</text></svg>`,
  
  slipperyWhenWet: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><polygon points="60,5 115,115 5,115" fill="#FFD700" stroke="#000" stroke-width="3"/><path d="M45,90 Q55,60 55,55 Q55,45 65,50 Q70,55 65,65 Q60,75 75,95" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/></svg>`,
  
  dividedHighway: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><polygon points="60,5 115,115 5,115" fill="#FFD700" stroke="#000" stroke-width="3"/><rect x="56" y="35" width="8" height="55" rx="2" fill="#000"/><polygon points="40,75 55,45 55,75" fill="#000"/><polygon points="80,75 65,45 65,75" fill="#000"/></svg>`,
  
  twoWayTraffic: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><polygon points="60,5 115,115 5,115" fill="#FFD700" stroke="#000" stroke-width="3"/><polygon points="45,55 45,95 38,95 50,105 62,95 55,95 55,55" fill="#000"/><polygon points="65,65 65,30 58,30 70,20 82,30 75,30 75,65" fill="#000"/></svg>`,
  
  stopAheadSign: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><polygon points="60,5 115,115 5,115" fill="#FFD700" stroke="#000" stroke-width="3"/><text x="60" y="55" text-anchor="middle" fill="#000" font-size="10" font-weight="bold" font-family="Arial">STOP</text><text x="60" y="75" text-anchor="middle" fill="#000" font-size="10" font-weight="bold" font-family="Arial">AHEAD</text></svg>`,
  
  handicapped: `<svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="96" height="36" rx="3" fill="#0066CC" stroke="#fff" stroke-width="2"/><circle cx="30" cy="12" r="4" fill="#fff"/><path d="M30,16 L30,28 M25,22 L35,22 M30,28 L25,34 M30,28 L35,34" stroke="#fff" stroke-width="2" fill="none"/><text x="60" y="26" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold" font-family="Arial">♿</text></svg>`,
  
  redCurb: `<svg viewBox="0 0 160 60" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="30" width="150" height="25" rx="3" fill="#CC0000"/><text x="80" y="48" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold" font-family="Arial">RED CURB</text><text x="80" y="22" text-anchor="middle" fill="#666" font-size="11" font-family="Arial">No stopping, standing, or parking</text></svg>`,
  
  yellowCurb: `<svg viewBox="0 0 160 60" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="30" width="150" height="25" rx="3" fill="#FFD700"/><text x="80" y="48" text-anchor="middle" fill="#000" font-size="12" font-weight="bold" font-family="Arial">YELLOW CURB</text><text x="80" y="22" text-anchor="middle" fill="#666" font-size="11" font-family="Arial">Loading / unloading only</text></svg>`,
  
  greenCurb: `<svg viewBox="0 0 160 60" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="30" width="150" height="25" rx="3" fill="#228B22"/><text x="80" y="48" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold" font-family="Arial">GREEN CURB</text><text x="80" y="22" text-anchor="middle" fill="#666" font-size="11" font-family="Arial">Limited time parking</text></svg>`,
  
  whiteCurb: `<svg viewBox="0 0 160 60" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="30" width="150" height="25" rx="3" fill="#fff" stroke="#ccc" stroke-width="2"/><text x="80" y="48" text-anchor="middle" fill="#000" font-size="12" font-weight="bold" font-family="Arial">WHITE CURB</text><text x="80" y="22" text-anchor="middle" fill="#666" font-size="11" font-family="Arial">Passenger loading only</text></svg>`,
  
  blueCurb: `<svg viewBox="0 0 160 60" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="30" width="150" height="25" rx="3" fill="#0066CC"/><text x="80" y="48" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold" font-family="Arial">BLUE CURB</text><text x="80" y="22" text-anchor="middle" fill="#666" font-size="11" font-family="Arial">Disabled parking only</text></svg>`,
  
  flashing_red: `<svg viewBox="0 0 60 140" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="50" height="130" rx="10" fill="#333" stroke="#555" stroke-width="2"/><circle cx="30" cy="35" r="18" fill="#CC0000"><animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/></circle><circle cx="30" cy="75" r="18" fill="#444"/><circle cx="30" cy="115" r="18" fill="#444"/></svg>`,
  
  flashing_yellow: `<svg viewBox="0 0 60 140" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="50" height="130" rx="10" fill="#333" stroke="#555" stroke-width="2"/><circle cx="30" cy="35" r="18" fill="#444"/><circle cx="30" cy="75" r="18" fill="#FFD700"><animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/></circle><circle cx="30" cy="115" r="18" fill="#444"/></svg>`,
  
  greenArrow: `<svg viewBox="0 0 60 140" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="50" height="130" rx="10" fill="#333" stroke="#555" stroke-width="2"/><circle cx="30" cy="35" r="18" fill="#444"/><circle cx="30" cy="75" r="18" fill="#444"/><circle cx="30" cy="115" r="18" fill="#228B22"/><polygon points="15,115 30,105 30,110 43,110 43,120 30,120 30,125" fill="#fff"/></svg>`,
  
  solidYellowLines: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="100" fill="#555"/><line x1="0" y1="48" x2="200" y2="48" stroke="#FFD700" stroke-width="4"/><line x1="0" y1="56" x2="200" y2="56" stroke="#FFD700" stroke-width="4"/><text x="100" y="30" text-anchor="middle" fill="#fff" font-size="12" font-family="Arial">← Opposite traffic →</text><text x="100" y="85" text-anchor="middle" fill="#fff" font-size="12" font-family="Arial">← Opposite traffic →</text></svg>`,
  
  brokenYellowLine: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="100" fill="#555"/><line x1="0" y1="48" x2="200" y2="48" stroke="#FFD700" stroke-width="4"/><line x1="0" y1="56" x2="30" y2="56" stroke="#FFD700" stroke-width="4" stroke-dasharray="20,10"/><line x1="30" y1="56" x2="200" y2="56" stroke="#FFD700" stroke-width="4" stroke-dasharray="20,10"/></svg>`,
  
  schoolBus: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="20" width="140" height="60" rx="8" fill="#FFD700" stroke="#000" stroke-width="2"/><rect x="40" y="30" width="25" height="20" rx="3" fill="#AAE"/><rect x="75" y="30" width="25" height="20" rx="3" fill="#AAE"/><rect x="110" y="30" width="25" height="20" rx="3" fill="#AAE"/><text x="100" y="72" text-anchor="middle" fill="#000" font-size="12" font-weight="bold" font-family="Arial">SCHOOL BUS</text><circle cx="55" cy="85" r="10" fill="#333"/><circle cx="145" cy="85" r="10" fill="#333"/><circle cx="30" cy="30" r="8" fill="#CC0000"><animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite"/></circle><circle cx="170" cy="30" r="8" fill="#CC0000"><animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite"/></circle><rect x="5" y="35" width="20" height="5" rx="2" fill="#CC0000"/></svg>`,

  carpoolSign: `<svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="90" height="120" rx="5" fill="#fff" stroke="#000" stroke-width="3"/><polygon points="50,15 60,30 40,30" fill="#000"/><rect x="42" y="30" width="16" height="35" fill="#000"/><text x="50" y="90" text-anchor="middle" fill="#000" font-size="10" font-weight="bold" font-family="Arial">CARPOOL</text><text x="50" y="105" text-anchor="middle" fill="#000" font-size="9" font-family="Arial">2+ ONLY</text></svg>`,
};

const QUESTIONS = [
  // =========================================
  // CATEGORY: Rules of the Road (rr_001–rr_020)
  // =========================================
  {
    id: "rr_001",
    category: "Rules of the Road",
    question: "You are approaching an intersection with a STOP sign. Where should you stop?",
    options: [
      "At the solid white limit line, crosswalk, or before entering the intersection",
      "Far enough back so that you can see the traffic light",
      "Only if other vehicles are already in the intersection"
    ],
    correctAnswer: 0,
    explanation: "You must stop at the limit line, crosswalk, or before entering the intersection — whichever comes first."
  },
  {
    id: "rr_002",
    category: "Rules of the Road",
    question: "You are arriving at an intersection with no signs or signals at the same time as another vehicle. Who has the right of way?",
    options: [
      "The driver of the vehicle on your left",
      "The driver of the vehicle on your right",
      "The driver of the vehicle going straight"
    ],
    correctAnswer: 1,
    explanation: "At an uncontrolled intersection, yield to the vehicle on your right."
  },
  {
    id: "rr_003",
    category: "Rules of the Road",
    question: "In which of the following situations may you legally make a U-turn?",
    options: [
      "Across a set of double yellow lines on a highway",
      "At a residential intersection where there is no sign prohibiting it, and no vehicles are approaching",
      "On a one-way street, provided there is no oncoming traffic"
    ],
    correctAnswer: 1,
    explanation: "U-turns are legal at residential intersections when it is safe and there's no sign prohibiting it. You cannot make a U-turn across double yellow lines."
  },
  {
    id: "rr_004",
    category: "Rules of the Road",
    question: "You are merging onto the freeway. You should:",
    options: [
      "Stop and wait for a clear gap in traffic before merging",
      "Enter at or near the speed of freeway traffic",
      "Drive slower than freeway traffic until you find an opening"
    ],
    correctAnswer: 1,
    explanation: "When entering a freeway, use the on-ramp to accelerate to or near the speed of freeway traffic, then merge safely."
  },
  {
    id: "rr_005",
    category: "Rules of the Road",
    question: "A solid yellow line on your side of the center line means:",
    options: [
      "You may pass other vehicles if the road is clear",
      "You may not cross the line to pass other vehicles",
      "You must slow down and proceed with caution"
    ],
    correctAnswer: 1,
    explanation: "A solid yellow line on your side means you may not cross it to pass. A broken yellow line means passing is allowed when safe.",
    image: SIGN_SVGS.solidYellowLines
  },
  {
    id: "rr_006",
    category: "Rules of the Road",
    question: "When are you required to turn on your vehicle's headlights?",
    options: [
      "30 minutes after sunset until 30 minutes before sunrise",
      "One hour after sunset until one hour before sunrise",
      "Only when driving in heavy rain or fog"
    ],
    correctAnswer: 0,
    explanation: "California law requires headlights from 30 minutes after sunset to 30 minutes before sunrise, and any time conditions prevent you from seeing 1,000 feet ahead."
  },
  {
    id: "rr_007",
    category: "Rules of the Road",
    question: "You are getting ready to make a right turn. You should:",
    options: [
      "Swing wide to the left to give yourself more turning room",
      "Begin and end your turn in the lane closest to the right edge of the road",
      "Move into the center lane before making the turn"
    ],
    correctAnswer: 1,
    explanation: "When turning right, begin and end in the lane nearest the right-hand curb."
  },
  {
    id: "rr_008",
    category: "Rules of the Road",
    question: "When making a left turn from a two-way street onto a one-way street, you must:",
    options: [
      "Start your turn from the far right lane",
      "Start your turn from the lane closest to the center divider",
      "Pull into the intersection and wait for the light to turn red before completing the turn"
    ],
    correctAnswer: 1,
    explanation: "Left turns should begin from the lane closest to the center divider."
  },
  {
    id: "rr_009",
    category: "Rules of the Road",
    question: "Under which of the following circumstances may you cross a double yellow line?",
    options: [
      "To pass a slow-moving agricultural vehicle",
      "To turn left into a driveway or private road",
      "To pass another vehicle if you cannot see any oncoming traffic"
    ],
    correctAnswer: 1,
    explanation: "You may cross double yellow lines to turn into or out of a driveway, private road, or to make a U-turn where permitted."
  },
  {
    id: "rr_010",
    category: "Rules of the Road",
    question: "You are driving in a carpool (HOV) lane. This is legal only if:",
    options: [
      "You are driving faster than the rest of the traffic",
      "You have the minimum number of occupants posted on the sign, or drive a qualifying clean-air vehicle",
      "You are traveling during designated off-peak hours"
    ],
    correctAnswer: 1,
    explanation: "HOV lanes require the minimum number of passengers shown on the posted sign, or a qualifying clean-air vehicle with the proper sticker.",
    image: SIGN_SVGS.carpoolSign
  },
  {
    id: "rr_011",
    category: "Rules of the Road",
    question: "You are approaching a railroad crossing. You should:",
    options: [
      "Accelerate to cross the tracks quickly",
      "Slow down, look in both directions, and listen for approaching trains",
      "Stop completely, even if there are no warning lights flashing"
    ],
    correctAnswer: 1,
    explanation: "Always slow down, look both ways, and listen before crossing railroad tracks. Stop if warning signals are flashing."
  },
  {
    id: "rr_012",
    category: "Rules of the Road",
    question: "You are approaching an intersection and want to turn right on a red light. You must:",
    options: [
      "Slow down and proceed through the turn if the road is clear",
      "Come to a complete stop, yield to pedestrians and traffic, and proceed when safe",
      "Wait until the light turns green before making the turn"
    ],
    correctAnswer: 1,
    explanation: "You must come to a full stop before turning right on red. Yield to pedestrians and cross traffic. Check for 'No Turn on Red' signs."
  },
  {
    id: "rr_013",
    category: "Rules of the Road",
    question: "You have entered an intersection, but the traffic signal turns red before you can cross completely. You should:",
    options: [
      "Stop immediately where you are and wait for the green light",
      "Put your vehicle in reverse and back out of the intersection",
      "Continue through the intersection safely to clear it"
    ],
    correctAnswer: 2,
    explanation: "If you have already entered the intersection, clear it safely. Do not stop in the intersection or back up."
  },
  {
    id: "rr_014",
    category: "Rules of the Road",
    question: "You are waiting at an intersection and the traffic signal light turns green. You should:",
    options: [
      "Accelerate immediately to keep traffic moving",
      "Yield to any vehicles, bicycles, or pedestrians still in the intersection before proceeding",
      "Sound your horn lightly to alert cross traffic"
    ],
    correctAnswer: 1,
    explanation: "When the light turns green, check the intersection for safety before proceeding. Other vehicles or pedestrians may still be clearing."
  },
  {
    id: "rr_015",
    category: "Rules of the Road",
    question: "California's 'Basic Speed Law' means:",
    options: [
      "You should never drive faster than is safe for current conditions",
      "You must always drive at the posted speed limit, regardless of weather",
      "You may drive up to 10 mph over the speed limit to keep up with traffic flow"
    ],
    correctAnswer: 0,
    explanation: "California's Basic Speed Law states you should never drive faster than is safe for current conditions, regardless of the posted speed limit."
  },
  {
    id: "rr_016",
    category: "Rules of the Road",
    question: "You arrive at a four-way stop at the same time as another vehicle. Who has the right-of-way?",
    options: [
      "The driver of the vehicle on the left",
      "The driver of the vehicle on the right",
      "The driver who is traveling faster"
    ],
    correctAnswer: 1,
    explanation: "At a four-way stop, yield to the vehicle on your right when both arrive simultaneously."
  },
  {
    id: "rr_017",
    category: "Rules of the Road",
    question: "When are you permitted to drive in the far left lane of a multilane highway?",
    options: [
      "At all times, as long as you are driving at the speed limit",
      "When passing another vehicle, turning left, or when the right lanes are blocked",
      "Only when you are driving a carpool vehicle"
    ],
    correctAnswer: 1,
    explanation: "The left lane is primarily for passing and turning left. Slower traffic should keep right."
  },
  {
    id: "rr_018",
    category: "Rules of the Road",
    question: "You are driving on a city street and see an emergency vehicle with flashing lights and sirens approaching from behind. You must:",
    options: [
      "Continue driving but move into the right lane",
      "Pull to the right edge of the road and stop until it passes",
      "Stop immediately in your current lane"
    ],
    correctAnswer: 1,
    explanation: "You must always yield to emergency vehicles using their sirens and flashing lights. Pull to the right and stop."
  },
  {
    id: "rr_019",
    category: "Rules of the Road",
    question: "You are looking for parking and see a white painted curb. This means:",
    options: [
      "You may stop here only to load or unload passengers or mail",
      "You may not park here at any time",
      "You may park here for up to two hours"
    ],
    correctAnswer: 0,
    explanation: "White curb = passenger or mail loading/unloading only. Drivers must stay with the vehicle.",
    image: SIGN_SVGS.whiteCurb
  },
  {
    id: "rr_020",
    category: "Rules of the Road",
    question: "You are approaching an intersection and the traffic signal is flashing red. What does this mean?",
    options: [
      "Slow down and proceed carefully through the intersection",
      "Treat it as a stop sign: come to a complete stop, then proceed when safe",
      "Yield to traffic coming from your right side"
    ],
    correctAnswer: 1,
    explanation: "A flashing red light means the same as a stop sign — stop completely and proceed when it is safe.",
    image: SIGN_SVGS.flashing_red
  },

  // =========================================
  // CATEGORY: Traffic Signs & Signals (ts_001–ts_020)
  // =========================================
  {
    id: "ts_001",
    category: "Traffic Signs & Signals",
    question: "You see this red octagonal sign at an intersection. You must:",
    options: [
      "Stop only if there is cross traffic approaching",
      "Come to a complete stop at the limit line or crosswalk, then proceed when safe",
      "Slow down to 5 mph before entering the intersection"
    ],
    correctAnswer: 1,
    explanation: "A STOP sign means you must come to a complete stop at the limit line, crosswalk, or before entering the intersection.",
    image: SIGN_SVGS.stop
  },
  {
    id: "ts_002",
    category: "Traffic Signs & Signals",
    question: "You are approaching an intersection and see this red and white triangular sign. What should you do?",
    options: [
      "Stop completely and wait for a gap in traffic before proceeding",
      "Slow down and be ready to stop if necessary to let other vehicles or pedestrians cross",
      "Maintain your speed because you have the right-of-way"
    ],
    correctAnswer: 1,
    explanation: "A YIELD sign means slow down and be ready to stop, giving right-of-way to vehicles and pedestrians in the intersection.",
    image: SIGN_SVGS.yield
  },
  {
    id: "ts_003",
    category: "Traffic Signs & Signals",
    question: "You see this sign at the entrance to a freeway off-ramp. What does it indicate?",
    options: [
      "The road ahead is closed for construction",
      "You are going the wrong way and must not enter",
      "Traffic moves in one direction only, and you may proceed"
    ],
    correctAnswer: 1,
    explanation: "DO NOT ENTER means you cannot drive in that direction. You will usually see this at freeway exit ramps.",
    image: SIGN_SVGS.doNotEnter
  },
  {
    id: "ts_004",
    category: "Traffic Signs & Signals",
    question: "If you see this red rectangular sign while driving, it means:",
    options: [
      "The paved road ends ahead",
      "You should turn around when safe",
      "You are traveling against traffic and must pull over and stop"
    ],
    correctAnswer: 2,
    explanation: "WRONG WAY means you are traveling against traffic. Stop immediately and safely turn around.",
    image: SIGN_SVGS.wrongWay
  },
  {
    id: "ts_005",
    category: "Traffic Signs & Signals",
    question: "A diamond-shaped yellow sign on the side of the road typically indicates:",
    options: [
      "A law or regulation you must obey",
      "A warning of a potential hazard or change in road conditions ahead",
      "Information about nearby services, such as gas or hospitals"
    ],
    correctAnswer: 1,
    explanation: "Diamond-shaped yellow signs are warning signs that alert you to hazards, road conditions, or changes ahead."
  },
  {
    id: "ts_006",
    category: "Traffic Signs & Signals",
    question: "You are approaching an intersection and see this sign. What does it prohibit?",
    options: [
      "Parking along the side of the road",
      "Making a U-turn",
      "Making a right turn on a red light"
    ],
    correctAnswer: 1,
    explanation: "This sign prohibits U-turns at this location.",
    image: SIGN_SVGS.noUTurn
  },
  {
    id: "ts_007",
    category: "Traffic Signs & Signals",
    question: "You see this circular yellow sign while driving. What does it warn you about?",
    options: [
      "There is an airport or low-flying aircraft ahead",
      "You are approaching a railroad crossing",
      "There is an active road construction zone ahead"
    ],
    correctAnswer: 1,
    explanation: "The RR crossbuck sign warns of a railroad crossing ahead. Slow down, look, and listen for trains.",
    image: SIGN_SVGS.railroadCrossing
  },
  {
    id: "ts_008",
    category: "Traffic Signs & Signals",
    question: "You are approaching a traffic signal that is flashing yellow. What should you do?",
    options: [
      "Come to a complete stop and then proceed when it is safe",
      "Accelerate to clear the intersection before the light turns red",
      "Slow down and proceed carefully through the intersection"
    ],
    correctAnswer: 2,
    explanation: "A flashing yellow light means slow down and proceed with caution.",
    image: SIGN_SVGS.flashing_yellow
  },
  {
    id: "ts_009",
    category: "Traffic Signs & Signals",
    question: "You are waiting in a left-turn lane, and the traffic signal shows a green arrow pointing left. This means:",
    options: [
      "You may turn left after yielding to oncoming traffic",
      "You have a protected left turn; oncoming traffic is stopped by a red light",
      "All traffic in the intersection must stop to let you turn"
    ],
    correctAnswer: 1,
    explanation: "A green arrow means you have a protected turn. Oncoming traffic is stopped. You may proceed in the direction of the arrow.",
    image: SIGN_SVGS.greenArrow
  },
  {
    id: "ts_010",
    category: "Traffic Signs & Signals",
    question: "What does this yellow pentagon-shaped sign mean?",
    options: [
      "Watch for pedestrians crossing the road",
      "You are entering a school zone with children present",
      "There is a marked crosswalk ahead"
    ],
    correctAnswer: 0,
    explanation: "This pedestrian crossing sign warns you to watch for pedestrians crossing the road.",
    image: SIGN_SVGS.pedestrianCrossing
  },
  {
    id: "ts_011",
    category: "Traffic Signs & Signals",
    question: "While driving on the highway, you encounter this orange sign. What does it indicate?",
    options: [
      "A school zone is coming up",
      "There is construction or road work ahead",
      "You must take a mandatory detour"
    ],
    correctAnswer: 1,
    explanation: "Orange signs indicate construction zones. Slow down, watch for workers, and obey posted speed limits.",
    image: SIGN_SVGS.construction
  },
  {
    id: "ts_012",
    category: "Traffic Signs & Signals",
    question: "You see this rectangular black and white sign. What does it tell you?",
    options: [
      "Traffic on this road moves in one direction only",
      "You must keep to the left side of the road",
      "Passing other vehicles is not allowed"
    ],
    correctAnswer: 0,
    explanation: "A ONE WAY sign means traffic flows in only one direction on that road.",
    image: SIGN_SVGS.oneWay
  },
  {
    id: "ts_013",
    category: "Traffic Signs & Signals",
    question: "You are approaching an intersection and see this sign. What are you prohibited from doing?",
    options: [
      "Making a right turn",
      "Making a left turn",
      "Continuing straight through the intersection"
    ],
    correctAnswer: 1,
    explanation: "This sign prohibits left turns at this location.",
    image: SIGN_SVGS.noLeftTurn
  },
  {
    id: "ts_014",
    category: "Traffic Signs & Signals",
    question: "You are driving on a rural road and see this yellow warning sign. What does it mean?",
    options: [
      "The road will become narrower ahead",
      "There is a curve in the road ahead",
      "You must prepare to turn around"
    ],
    correctAnswer: 1,
    explanation: "This sign warns of a curve ahead. Slow down before the curve.",
    image: SIGN_SVGS.curveAhead
  },
  {
    id: "ts_015",
    category: "Traffic Signs & Signals",
    question: "A rectangular white sign with black letters or symbols usually indicates:",
    options: [
      "A warning about an upcoming hazard",
      "A regulatory rule or law you must follow",
      "Information about a nearby point of interest"
    ],
    correctAnswer: 1,
    explanation: "Rectangular white signs with black text are regulatory signs that tell you about laws and rules you must obey."
  },
  {
    id: "ts_016",
    category: "Traffic Signs & Signals",
    question: "Green rectangular signs located above or alongside highways provide:",
    options: [
      "Warning information about potential hazards",
      "Distance, direction, and destination information",
      "Current speed limit information"
    ],
    correctAnswer: 1,
    explanation: "Green signs are guide signs that provide information about distances, directions, and destinations."
  },
  {
    id: "ts_017",
    category: "Traffic Signs & Signals",
    question: "You are driving and see this yellow warning sign. What does it tell you?",
    options: [
      "The road surface may be slippery when it is wet",
      "There is a series of sharp curves ahead",
      "You are approaching a steep downhill grade"
    ],
    correctAnswer: 0,
    explanation: "This sign warns the road may be slippery when wet. Reduce your speed.",
    image: SIGN_SVGS.slipperyWhenWet
  },
  {
    id: "ts_018",
    category: "Traffic Signs & Signals",
    question: "You see this yellow sign while driving on a two-lane road. What does it indicate?",
    options: [
      "The paved portion of the road ends ahead",
      "A divided highway begins ahead",
      "Two separate roads are about to merge into one"
    ],
    correctAnswer: 1,
    explanation: "This sign indicates a divided highway begins ahead. Stay to the right of the divider.",
    image: SIGN_SVGS.dividedHighway
  },
  {
    id: "ts_019",
    category: "Traffic Signs & Signals",
    question: "Blue signs along the side of the highway typically provide information about:",
    options: [
      "Upcoming construction zones",
      "Motorist services like gas, food, and lodging",
      "State and federal traffic regulations"
    ],
    correctAnswer: 1,
    explanation: "Blue signs indicate motorist services such as gas stations, food, lodging, and hospitals."
  },
  {
    id: "ts_020",
    category: "Traffic Signs & Signals",
    question: "You are driving on a divided highway and see this yellow warning sign. What does it mean?",
    options: [
      "You are approaching a section of road with two-way traffic",
      "The highway you are on is about to become a divided highway",
      "The lane you are in is ending, and you must merge left"
    ],
    correctAnswer: 0,
    explanation: "This sign warns that two-way traffic is ahead. Stay in your lane.",
    image: SIGN_SVGS.twoWayTraffic
  },
  // =========================================
  // CATEGORY: Speed Laws (sl_001–sl_015): Speed Laws (sl_001–sl_015)
  // =========================================
  {
    id: "sl_001",
    category: "Speed Laws",
    question: "You are driving on a California highway where there are no posted speed limits. What is the maximum speed limit?",
    options: [
      "55 mph",
      "65 mph",
      "70 mph"
    ],
    correctAnswer: 1,
    explanation: "The maximum speed limit on most California highways is 65 mph, unless otherwise posted."
  },
  {
    id: "sl_002",
    category: "Speed Laws",
    question: "You are driving through a residential neighborhood. Unless otherwise posted, the speed limit is:",
    options: [
      "20 mph",
      "25 mph",
      "30 mph"
    ],
    correctAnswer: 1,
    explanation: "The default speed limit in residential and business districts is 25 mph."
  },
  {
    id: "sl_003",
    category: "Speed Laws",
    question: "You are driving near a school. Children are outside on the playground. What is the speed limit in this school zone?",
    options: [
      "15 mph",
      "20 mph",
      "25 mph unless otherwise posted"
    ],
    correctAnswer: 2,
    explanation: "The speed limit in a school zone when children are present is 25 mph, unless otherwise posted.",
    image: SIGN_SVGS.schoolZone
  },
  {
    id: "sl_004",
    category: "Speed Laws",
    question: "You are towing a trailer on a freeway with four lanes in your direction. What is your maximum speed limit?",
    options: [
      "45 mph",
      "55 mph",
      "65 mph"
    ],
    correctAnswer: 1,
    explanation: "When towing a vehicle, the maximum speed is 55 mph on any California freeway."
  },
  {
    id: "sl_005",
    category: "Speed Laws",
    question: "You are driving through an alley. What is the speed limit?",
    options: [
      "10 mph",
      "15 mph",
      "25 mph"
    ],
    correctAnswer: 1,
    explanation: "The speed limit in any alley is 15 mph."
  },
  {
    id: "sl_006",
    category: "Speed Laws",
    question: "You are approaching an intersection where you cannot see traffic for 100 feet in either direction. What is the speed limit for this 'blind' intersection?",
    options: [
      "10 mph",
      "15 mph",
      "25 mph"
    ],
    correctAnswer: 1,
    explanation: "At a blind intersection where you cannot see 100 feet in either direction, the speed limit is 15 mph."
  },
  {
    id: "sl_007",
    category: "Speed Laws",
    question: "You are driving on a two-lane undivided highway. Unless otherwise posted, the maximum speed limit is:",
    options: [
      "45 mph",
      "55 mph",
      "65 mph"
    ],
    correctAnswer: 1,
    explanation: "The speed limit on two-lane undivided highways is 55 mph unless otherwise posted."
  },
  {
    id: "sl_008",
    category: "Speed Laws",
    question: "You are driving on a road with a posted speed limit of 45 mph, but traffic is heavy and moving at 30 mph. You should:",
    options: [
      "Drive 45 mph because it is the posted limit",
      "Weave through traffic to maintain 45 mph",
      "Drive no faster than 30 mph"
    ],
    correctAnswer: 2,
    explanation: "California's Basic Speed Law requires you to drive at a speed that is safe for current conditions, regardless of the posted limit."
  },
  {
    id: "sl_009",
    category: "Speed Laws",
    question: "You are driving in dense fog. You should:",
    options: [
      "Turn on your high-beam headlights so you can see further ahead",
      "Use your parking lights only",
      "Slow down and use your low-beam headlights"
    ],
    correctAnswer: 2,
    explanation: "In fog, use low beam headlights (high beams reflect off fog and reduce visibility). Slow down."
  },
  {
    id: "sl_010",
    category: "Speed Laws",
    question: "You enter a designated construction zone where workers are present. The speed limit is:",
    options: [
      "Reduced by 10 mph automatically",
      "Always 25 mph",
      "Whatever is posted; fines for traffic violations are doubled"
    ],
    correctAnswer: 2,
    explanation: "Obey posted speed limits in construction zones. Fines for speeding are typically doubled when workers are present."
  },
  {
    id: "sl_011",
    category: "Speed Laws",
    question: "You are approaching a railroad crossing with no warning signals, and you cannot see the tracks for 400 feet in both directions. The speed limit is:",
    options: [
      "10 mph",
      "15 mph",
      "25 mph"
    ],
    correctAnswer: 1,
    explanation: "When approaching a railroad crossing where you cannot see the tracks for 400 feet in both directions, the speed limit is 15 mph."
  },
  {
    id: "sl_012",
    category: "Speed Laws",
    question: "You are driving 45 mph in a 65 mph zone in the far left lane. Traffic is backing up behind you. You could be cited for:",
    options: [
      "Nothing, because you are driving under the speed limit",
      "Driving too slowly and blocking the normal flow of traffic",
      "Reckless driving"
    ],
    correctAnswer: 1,
    explanation: "Driving too slowly on a freeway can be as dangerous as speeding because it disrupts traffic flow and can cause rear-end collisions."
  },
  {
    id: "sl_013",
    category: "Speed Laws",
    question: "California's 'prima facie' speed limit means:",
    options: [
      "Speed limits that apply only to commercial vehicles",
      "Speed limits that are assumed to be safe and reasonable under normal conditions",
      "The absolute maximum speed you can drive on an empty highway"
    ],
    correctAnswer: 1,
    explanation: "Prima facie speed limits are assumed to be safe and reasonable under normal conditions but you must still reduce speed when conditions warrant."
  },
  {
    id: "sl_014",
    category: "Speed Laws",
    question: "You want to exit the freeway. When should you begin to slow down?",
    options: [
      "About a half mile before your exit while still on the freeway",
      "Only after you have moved completely onto the exit ramp",
      "When you can see the end of the exit ramp"
    ],
    correctAnswer: 1,
    explanation: "Do not slow down on the freeway itself. Wait until you are on the off-ramp to reduce your speed."
  },
  {
    id: "sl_015",
    category: "Speed Laws",
    question: "You are driving on a freeway posted for 70 mph. Traffic is moving at 80 mph. You should drive:",
    options: [
      "80 mph to keep up with the flow of traffic",
      "70 mph or less",
      "Between 70 mph and 80 mph"
    ],
    correctAnswer: 1,
    explanation: "You may never legally drive faster than the posted speed limit, even if the rest of traffic is speeding."
  },

  // =========================================
  // CATEGORY: Safe Driving (sd_001–sd_018)
  // =========================================
  {
    id: "sd_001",
    category: "Safe Driving",
    question: "To avoid rear-ending the vehicle in front of you, you should use the 'three-second rule.' This means:",
    options: [
      "You should look three seconds ahead down the road",
      "It should take you three seconds to pass a fixed object after the car ahead of you passes it",
      "You should wait three seconds before accelerating when a light turns green"
    ],
    correctAnswer: 1,
    explanation: "Use the 3-second rule: pick a fixed point ahead, and when the car in front passes it, count 3 seconds before you reach it."
  },
  {
    id: "sd_002",
    category: "Safe Driving",
    question: "You want to change lanes. You must check your mirrors and:",
    options: [
      "Slow down before moving into the new lane",
      "Look over your shoulder to check your blind spot",
      "Flash your headlights to warn other drivers"
    ],
    correctAnswer: 1,
    explanation: "Always signal, check mirrors, AND look over your shoulder to check blind spots before changing lanes."
  },
  {
    id: "sd_003",
    category: "Safe Driving",
    question: "In which of the following scenarios should you increase your following distance beyond the normal three seconds?",
    options: [
      "When you are driving on a multi-lane highway in light traffic",
      "When you are being tailgated by another vehicle",
      "When you are following a small passenger car"
    ],
    correctAnswer: 1,
    explanation: "If you are being tailgated, increase your following distance ahead of you so you have more room to stop gradually without being rear-ended."
  },
  {
    id: "sd_004",
    category: "Safe Driving",
    question: "You are driving next to a large commercial truck. You should remember that large trucks:",
    options: [
      "Can stop much faster than passenger vehicles",
      "Have larger blind spots than passenger vehicles",
      "Are required to drive in the far left lane"
    ],
    correctAnswer: 1,
    explanation: "Large vehicles have extensive blind spots (No-Zones). If you can't see the driver in their side mirror, they can't see you."
  },
  {
    id: "sd_005",
    category: "Safe Driving",
    question: "According to the DMV, the most common cause of traffic collisions is:",
    options: [
      "Poor weather conditions and slippery roads",
      "Mechanical failure such as blown tires or bad brakes",
      "Driver error, such as distracted driving or speeding"
    ],
    correctAnswer: 2,
    explanation: "The vast majority of crashes are caused by driver error — distraction, speeding, impairment, or failure to follow rules."
  },
  {
    id: "sd_006",
    category: "Safe Driving",
    question: "You are driving on a city street next to a row of parked cars. You should:",
    options: [
      "Drive closely to the parked cars to stay out of the oncoming lane",
      "Watch for car doors opening and pedestrians stepping out from between the cars",
      "Honk your horn at every intersection"
    ],
    correctAnswer: 1,
    explanation: "Watch for car doors opening suddenly and pedestrians stepping out from between parked cars."
  },
  {
    id: "sd_007",
    category: "Safe Driving",
    question: "A vehicle is tailgating you (following too closely). You should:",
    options: [
      "Tap your brakes lightly to warn the driver to back off",
      "Speed up to create more distance between you and the tailgater",
      "Change lanes, or slow down gradually to encourage them to pass"
    ],
    correctAnswer: 2,
    explanation: "If tailgated, safely change lanes if possible, or slow down gradually to allow them to pass or give yourself more braking room."
  },
  {
    id: "sd_008",
    category: "Safe Driving",
    question: "You must carefully check your blind spots by looking over your shoulder before you:",
    options: [
      "Enter an intersection on a green light",
      "Change lanes, merge onto a freeway, or pull away from a curb",
      "Slow down to park parallel to the curb"
    ],
    correctAnswer: 1,
    explanation: "Always check your blind spots by looking over your shoulder before changing lanes, merging, or backing up."
  },
  {
    id: "sd_009",
    category: "Safe Driving",
    question: "You park your vehicle on a hill facing downhill. The street has a curb. How should you turn your wheels?",
    options: [
      "Turn your front wheels away from the curb",
      "Turn your front wheels toward the curb",
      "Keep your front wheels perfectly straight"
    ],
    correctAnswer: 1,
    explanation: "Facing downhill with a curb: turn wheels toward the curb so the car rolls into the curb if brakes fail."
  },
  {
    id: "sd_010",
    category: "Safe Driving",
    question: "You park your vehicle on a hill facing uphill. The street has a curb. How should you turn your wheels?",
    options: [
      "Turn your front wheels toward the curb",
      "Turn your front wheels away from the curb",
      "Keep your front wheels perfectly straight"
    ],
    correctAnswer: 1,
    explanation: "Facing uphill with a curb: turn wheels away from the curb (left) so the car rolls back into the curb if brakes fail."
  },
  {
    id: "sd_011",
    category: "Safe Driving",
    question: "You park on a hill that does not have a curb. How should you turn your wheels?",
    options: [
      "Turn your wheels toward the edge of the road (right)",
      "Turn your wheels away from the edge of the road (left)",
      "Keep your wheels straight"
    ],
    correctAnswer: 0,
    explanation: "No curb present: always turn wheels toward the right (shoulder) so the car doesn't roll into traffic."
  },
  {
    id: "sd_012",
    category: "Safe Driving",
    question: "You are backing up your vehicle. You should:",
    options: [
      "Rely entirely on your rearview and side mirrors",
      "Turn your head and look over your right shoulder out the rear window",
      "Use your backup camera exclusively"
    ],
    correctAnswer: 1,
    explanation: "When backing up, turn your head and look through the rear window. Don't rely solely on mirrors or cameras."
  },
  {
    id: "sd_013",
    category: "Safe Driving",
    question: "When is it appropriate to use your vehicle's horn?",
    options: [
      "To express anger at a driver who cut you off",
      "To warn other drivers to avoid an imminent collision",
      "To alert a bicyclist that you are passing them"
    ],
    correctAnswer: 1,
    explanation: "Use your horn only as a safety warning to avoid collisions. Do not use it to express anger or to startle bicyclists."
  },
  {
    id: "sd_014",
    category: "Safe Driving",
    question: "When is the road most slippery and likely to cause hydroplaning?",
    options: [
      "During a heavy, continuous downpour lasting several hours",
      "During the first few minutes of rain after a long dry spell",
      "When driving on a freshly paved asphalt road"
    ],
    correctAnswer: 1,
    explanation: "Hydroplaning is most dangerous during the first rain after a dry period when oil and dust on the road mix with water."
  },
  {
    id: "sd_015",
    category: "Safe Driving",
    question: "You are driving on a freeway and want to move into the adjacent lane. You must:",
    options: [
      "Signal and check your mirrors before moving over",
      "Check your mirrors, signal, look over your shoulder, and move when safe",
      "Accelerate to pass the vehicle next to you, then change lanes"
    ],
    correctAnswer: 1,
    explanation: "Always use the full procedure: check mirrors, signal, check blind spots (shoulder check), then merge when safe."
  },
  {
    id: "sd_016",
    category: "Safe Driving",
    question: "Under California law, it is illegal to use a handheld cell phone while driving:",
    options: [
      "Unless you are stopped at a red traffic light",
      "Only if you are under 18 years of age",
      "At all times, for all drivers, regardless of age"
    ],
    correctAnswer: 2,
    explanation: "California law prohibits all drivers from using handheld cell phones while driving. Hands-free is required."
  },
  {
    id: "sd_017",
    category: "Safe Driving",
    question: "You are driving at night on a dimly lit street. You should:",
    options: [
      "Always use your high-beam headlights to see further",
      "Drive slow enough so you can stop within the distance illuminated by your headlights",
      "Use your hazard lights so other drivers can see you"
    ],
    correctAnswer: 1,
    explanation: "At night, reduce speed so you can stop within the distance your headlights illuminate."
  },
  {
    id: "sd_018",
    category: "Safe Driving",
    question: "Another driver is trying to pass you on a two-lane road. You should:",
    options: [
      "Speed up slightly so they can tuck in behind you",
      "Maintain your lane position and do not increase your speed",
      "Honk your horn to warn them it is unsafe"
    ],
    correctAnswer: 1,
    explanation: "When being passed, move slightly to the right side of your lane if safe, and maintain your speed. Do not speed up."
  },

  // =========================================
  // CATEGORY: Parking (pk_001–pk_012)
  // =========================================
  {
    id: "pk_001",
    category: "Parking",
    question: "A red painted curb means:",
    options: [
      "Loading zone only",
      "No stopping, standing, or parking",
      "Passenger drop-off zone"
    ],
    correctAnswer: 1,
    explanation: "Red curb = NO stopping, standing, or parking at any time (except buses at red bus zones).",
    image: SIGN_SVGS.redCurb
  },
  {
    id: "pk_002",
    category: "Parking",
    question: "A yellow painted curb means:",
    options: [
      "No parking at any time",
      "Loading and unloading passengers or freight only (time limits apply)",
      "Parking for handicapped only"
    ],
    correctAnswer: 1,
    explanation: "Yellow curb = loading/unloading of passengers or freight only. Drivers of noncommercial vehicles must stay with the vehicle.",
    image: SIGN_SVGS.yellowCurb
  },
  {
    id: "pk_003",
    category: "Parking",
    question: "A green painted curb means:",
    options: [
      "Parking for emergency vehicles",
      "Limited time parking — look for posted time limits",
      "No restrictions"
    ],
    correctAnswer: 1,
    explanation: "Green curb = time-limited parking, often very short (e.g., 15 or 30 minutes). Check posted signs.",
    image: SIGN_SVGS.greenCurb
  },
  {
    id: "pk_004",
    category: "Parking",
    question: "A blue painted curb means:",
    options: [
      "Passenger loading zone",
      "Parking for disabled persons with a placard or special plates only",
      "Limited time parking"
    ],
    correctAnswer: 1,
    explanation: "Blue curb = reserved for vehicles displaying a disabled person placard or special license plates.",
    image: SIGN_SVGS.blueCurb
  },
  {
    id: "pk_005",
    category: "Parking",
    question: "You should park at least how many feet from a fire hydrant?",
    options: [
      "10 feet",
      "15 feet",
      "20 feet"
    ],
    correctAnswer: 1,
    explanation: "You must park at least 15 feet from a fire hydrant."
  },
  {
    id: "pk_006",
    category: "Parking",
    question: "It is illegal to park within how many feet of a railroad track?",
    options: [
      "7½ feet",
      "15 feet",
      "25 feet"
    ],
    correctAnswer: 0,
    explanation: "You may not park within 7½ feet of a railroad track."
  },
  {
    id: "pk_007",
    category: "Parking",
    question: "When parking parallel, your vehicle must be within how many inches of the curb?",
    options: [
      "12 inches",
      "18 inches",
      "24 inches"
    ],
    correctAnswer: 1,
    explanation: "When parking parallel to a curb, your vehicle must be within 18 inches of the curb."
  },
  {
    id: "pk_008",
    category: "Parking",
    question: "It is illegal to leave a child age 6 or younger unattended in a car when:",
    options: [
      "The engine is running or the keys are in the ignition",
      "Only when the temperature is above 90°F",
      "Only in commercial areas"
    ],
    correctAnswer: 0,
    explanation: "California law prohibits leaving a child 6 or younger unattended in a vehicle when the engine is running or keys are in the ignition."
  },
  {
    id: "pk_009",
    category: "Parking",
    question: "When parking on a two-way road, your vehicle should be parked:",
    options: [
      "Facing any direction",
      "Parallel to and facing the same direction as traffic on your side",
      "At an angle to the curb"
    ],
    correctAnswer: 1,
    explanation: "Park parallel to and facing the direction of traffic on your side of the road."
  },
  {
    id: "pk_010",
    category: "Parking",
    question: "You may not park your vehicle:",
    options: [
      "On the shoulder of the freeway",
      "In a marked or unmarked crosswalk",
      "In a residential area"
    ],
    correctAnswer: 1,
    explanation: "You may never park in a crosswalk (marked or unmarked), on a sidewalk, or blocking a driveway."
  },
  {
    id: "pk_011",
    category: "Parking",
    question: "Double parking (parking in the road next to a parked car) is:",
    options: [
      "Legal for short stops",
      "Always illegal",
      "Legal if your hazard lights are on"
    ],
    correctAnswer: 1,
    explanation: "Double parking is always illegal in California."
  },
  {
    id: "pk_012",
    category: "Parking",
    question: "When leaving your vehicle, you should always:",
    options: [
      "Leave the engine running",
      "Set the parking brake and lock the vehicle",
      "Leave the windows down"
    ],
    correctAnswer: 1,
    explanation: "Always set the parking brake, turn off the engine, remove the key, and lock the vehicle when leaving."
  },

  // =========================================
  // CATEGORY: Alcohol & Drugs (ad_001–ad_015)
  // =========================================
  {
    id: "ad_001",
    category: "Alcohol & Drugs",
    question: "The legal blood alcohol concentration (BAC) limit for drivers 21 and older is:",
    options: [
      "0.05%",
      "0.08%",
      "0.10%"
    ],
    correctAnswer: 1,
    explanation: "In California, the legal BAC limit for drivers 21 and older is 0.08%. You can be impaired below this level."
  },
  {
    id: "ad_002",
    category: "Alcohol & Drugs",
    question: "The legal BAC limit for drivers under 21 is:",
    options: [
      "0.01%",
      "0.05%",
      "0.08%"
    ],
    correctAnswer: 0,
    explanation: "California has a zero-tolerance law for drivers under 21. The BAC limit is 0.01%."
  },
  {
    id: "ad_003",
    category: "Alcohol & Drugs",
    question: "California's 'implied consent' law means:",
    options: [
      "You consent to traffic laws when you get your license",
      "By driving in California, you have agreed to submit to a chemical test if arrested for DUI",
      "Passengers consent to the driver's behavior"
    ],
    correctAnswer: 1,
    explanation: "By driving in California, you automatically consent to a chemical test (blood, breath, or urine) if lawfully arrested for DUI."
  },
  {
    id: "ad_004",
    category: "Alcohol & Drugs",
    question: "If you refuse a chemical test when arrested for DUI, your license will be:",
    options: [
      "Suspended for 6 months",
      "Suspended for 1 year",
      "Not affected"
    ],
    correctAnswer: 1,
    explanation: "Refusing a chemical test results in a mandatory 1-year license suspension for the first offense, plus other penalties."
  },
  {
    id: "ad_005",
    category: "Alcohol & Drugs",
    question: "Alcohol affects your driving by:",
    options: [
      "Improving your reaction time",
      "Impairing judgment, reaction time, and coordination",
      "Making you a more cautious driver"
    ],
    correctAnswer: 1,
    explanation: "Alcohol impairs judgment, slows reaction time, reduces coordination, and affects vision — all critical for safe driving."
  },
  {
    id: "ad_006",
    category: "Alcohol & Drugs",
    question: "The only thing that can sober you up is:",
    options: [
      "Coffee",
      "A cold shower",
      "Time"
    ],
    correctAnswer: 2,
    explanation: "Only time can lower your BAC. Coffee, cold showers, food, and exercise do not speed up the process."
  },
  {
    id: "ad_007",
    category: "Alcohol & Drugs",
    question: "A first DUI conviction in California can result in:",
    options: [
      "A warning and a fine",
      "Up to 6 months in jail, fines up to $1,000, and license suspension",
      "A suspended sentence only"
    ],
    correctAnswer: 1,
    explanation: "A first DUI can result in up to 6 months in jail, fines of $390–$1,000 (plus assessments), license suspension, and mandatory DUI school."
  },
  {
    id: "ad_008",
    category: "Alcohol & Drugs",
    question: "It is illegal to drink any alcoholic beverage while:",
    options: [
      "Sitting in a parked car",
      "Driving or riding in a vehicle on a highway",
      "At a restaurant near a road"
    ],
    correctAnswer: 1,
    explanation: "It is illegal to drink any alcoholic beverage while driving or riding as a passenger in a motor vehicle on a highway."
  },
  {
    id: "ad_009",
    category: "Alcohol & Drugs",
    question: "Prescription medications can:",
    options: [
      "Never affect your driving",
      "Impair your driving just as much as alcohol or illegal drugs",
      "Always be used safely while driving"
    ],
    correctAnswer: 1,
    explanation: "Many prescription and over-the-counter medications can impair driving. Check labels and ask your doctor."
  },
  {
    id: "ad_010",
    category: "Alcohol & Drugs",
    question: "If you are taking medication and plan to drive, you should:",
    options: [
      "Not worry about it",
      "Read the label for warnings about drowsiness or impairment",
      "Always drive slower"
    ],
    correctAnswer: 1,
    explanation: "Always read medication labels for warnings about driving. Ask your doctor or pharmacist if unsure."
  },
  {
    id: "ad_011",
    category: "Alcohol & Drugs",
    question: "The BAC limit for commercial vehicle drivers is:",
    options: [
      "0.04%",
      "0.08%",
      "0.01%"
    ],
    correctAnswer: 0,
    explanation: "Commercial vehicle drivers have a lower BAC limit of 0.04%."
  },
  {
    id: "ad_012",
    category: "Alcohol & Drugs",
    question: "Driving under the influence of marijuana is:",
    options: [
      "Legal in California since marijuana is legal",
      "Illegal and subject to the same penalties as alcohol DUI",
      "Legal as long as you are a medical patient"
    ],
    correctAnswer: 1,
    explanation: "Driving under the influence of marijuana (or any drug) is illegal in California, regardless of marijuana's legal status."
  },
  {
    id: "ad_013",
    category: "Alcohol & Drugs",
    question: "What is the best way to avoid a DUI?",
    options: [
      "Eat a large meal before drinking",
      "Don't drink and drive — use a designated driver, ride share, or taxi",
      "Drink only beer instead of hard liquor"
    ],
    correctAnswer: 1,
    explanation: "The only sure way to avoid a DUI is to not drink and drive. Plan ahead with a designated driver or ride service."
  },
  {
    id: "ad_014",
    category: "Alcohol & Drugs",
    question: "It is illegal to have an open container of alcohol in:",
    options: [
      "The trunk",
      "The passenger area of the vehicle",
      "A locked glove compartment"
    ],
    correctAnswer: 1,
    explanation: "Open containers of alcohol are illegal in the passenger area. They may be stored in the trunk."
  },
  {
    id: "ad_015",
    category: "Alcohol & Drugs",
    question: "If you are arrested for DUI and have a BAC of 0.08% or more, your license will be suspended by the DMV for:",
    options: [
      "30 days",
      "4 months (admin per se suspension for first offense)",
      "1 year"
    ],
    correctAnswer: 1,
    explanation: "The DMV imposes an administrative per se suspension of 4 months for a first offense with a BAC of 0.08% or more."
  },

  // =========================================
  // CATEGORY: Sharing the Road (sr_001–sr_018)
  // =========================================
  {
    id: "sr_001",
    category: "Sharing the Road",
    question: "When a school bus has its red lights flashing and stop arm extended, you must:",
    options: [
      "Slow down and pass carefully",
      "Stop in both directions (unless separated by a physical median)",
      "Stop only if children are visible"
    ],
    correctAnswer: 1,
    explanation: "You must stop from both directions when a school bus displays red flashing lights, unless separated by a physical barrier or median.",
    image: SIGN_SVGS.schoolBus
  },
  {
    id: "sr_002",
    category: "Sharing the Road",
    question: "When passing a bicyclist on a two-lane road, you must give them at least:",
    options: [
      "2 feet of space",
      "3 feet of space",
      "5 feet of space"
    ],
    correctAnswer: 1,
    explanation: "California's Three Feet for Safety Act requires drivers to give bicyclists at least 3 feet of clearance when passing."
  },
  {
    id: "sr_003",
    category: "Sharing the Road",
    question: "You must yield the right-of-way to a pedestrian:",
    options: [
      "Only in marked crosswalks",
      "In both marked and unmarked crosswalks",
      "Only if they have a walk signal"
    ],
    correctAnswer: 1,
    explanation: "You must yield to pedestrians in all crosswalks, whether marked or unmarked (every intersection has an implied crosswalk)."
  },
  {
    id: "sr_004",
    category: "Sharing the Road",
    question: "When you see a blind pedestrian with a white cane or guide dog at an intersection, you must:",
    options: [
      "Honk to let them know you are there",
      "Stop and yield the right-of-way — do not honk",
      "Speed up to pass before they cross"
    ],
    correctAnswer: 1,
    explanation: "Always stop and yield to blind pedestrians. Do not honk, as it may confuse them."
  },
  {
    id: "sr_005",
    category: "Sharing the Road",
    question: "Motorcycles are entitled to:",
    options: [
      "Half a lane only",
      "A full traffic lane, just like any other vehicle",
      "The bicycle lane when available"
    ],
    correctAnswer: 1,
    explanation: "Motorcycles are entitled to a full traffic lane. Do not try to share their lane."
  },
  {
    id: "sr_006",
    category: "Sharing the Road",
    question: "When driving behind a motorcycle, you should:",
    options: [
      "Follow closely so they can see you in their mirror",
      "Follow at a greater distance than you would for a car",
      "Follow at the same distance as a car"
    ],
    correctAnswer: 1,
    explanation: "Follow motorcycles at a greater distance because they can stop much more quickly than a car."
  },
  {
    id: "sr_007",
    category: "Sharing the Road",
    question: "Lane splitting by motorcycles in California is:",
    options: [
      "Always illegal",
      "Legal when done in a safe and prudent manner",
      "Legal only on freeways"
    ],
    correctAnswer: 1,
    explanation: "California is the only state that allows lane splitting by motorcycles, when done safely and prudently."
  },
  {
    id: "sr_008",
    category: "Sharing the Road",
    question: "When driving near a large truck, you should avoid:",
    options: [
      "Passing on the left side",
      "Driving in their large blind spots (No-Zones)",
      "Maintaining a safe following distance"
    ],
    correctAnswer: 1,
    explanation: "Large trucks have extensive blind spots (No-Zones) on all four sides. Avoid lingering in these areas."
  },
  {
    id: "sr_009",
    category: "Sharing the Road",
    question: "When an emergency vehicle is approaching with lights and sirens, you must:",
    options: [
      "Speed up to get out of the way",
      "Pull to the right edge of the road and stop",
      "Stop immediately wherever you are"
    ],
    correctAnswer: 1,
    explanation: "Pull to the right side of the road and stop until the emergency vehicle passes."
  },
  {
    id: "sr_010",
    category: "Sharing the Road",
    question: "California's 'Move Over' law requires you to:",
    options: [
      "Move over one lane (or slow down) when passing a stopped emergency vehicle with flashing lights",
      "Always move to the right lane",
      "Speed up to clear the area quickly"
    ],
    correctAnswer: 0,
    explanation: "The Move Over law requires drivers to change lanes away from stopped emergency vehicles, or slow down if lane change isn't possible."
  },
  {
    id: "sr_011",
    category: "Sharing the Road",
    question: "When approaching a pedestrian using a guide dog or white cane, you should:",
    options: [
      "Honk to alert them",
      "Come to a complete stop",
      "Move into the next lane"
    ],
    correctAnswer: 1,
    explanation: "Always stop completely for visually impaired pedestrians. Do not honk — it can be disorienting."
  },
  {
    id: "sr_012",
    category: "Sharing the Road",
    question: "You must not pass a vehicle stopped at a crosswalk because:",
    options: [
      "It is considered rude",
      "A pedestrian you cannot see may be crossing",
      "The stopped driver might move suddenly"
    ],
    correctAnswer: 1,
    explanation: "The stopped vehicle may be yielding to a pedestrian. Never pass a vehicle stopped at a crosswalk."
  },
  {
    id: "sr_013",
    category: "Sharing the Road",
    question: "Bicyclists on the road have:",
    options: [
      "Fewer rights than motor vehicles",
      "The same rights and responsibilities as motor vehicle drivers",
      "More rights because they are vulnerable"
    ],
    correctAnswer: 1,
    explanation: "Bicyclists have the same rights and responsibilities as motor vehicle drivers on California roads."
  },
  {
    id: "sr_014",
    category: "Sharing the Road",
    question: "When can you drive in a bike lane?",
    options: [
      "Whenever it is convenient",
      "Only within 200 feet of making a right turn (after checking for bicyclists)",
      "Never — it is always illegal"
    ],
    correctAnswer: 1,
    explanation: "You may enter a bike lane within 200 feet of a right turn, but you must first check for and yield to bicyclists."
  },
  {
    id: "sr_015",
    category: "Sharing the Road",
    question: "Pedestrians have the right-of-way:",
    options: [
      "Only when crossing at a green light",
      "At all intersections, whether or not there is a marked crosswalk",
      "Only on residential streets"
    ],
    correctAnswer: 1,
    explanation: "Pedestrians have the right-of-way at all intersections. Every intersection has a crosswalk, whether marked or not."
  },
  {
    id: "sr_016",
    category: "Sharing the Road",
    question: "You should never drive alongside or pass a large truck that is:",
    options: [
      "Driving below the speed limit",
      "Making a wide right turn",
      "In the left lane"
    ],
    correctAnswer: 1,
    explanation: "Never try to squeeze between a large truck and the curb when it is making a wide right turn. The truck may crush you."
  },
  {
    id: "sr_017",
    category: "Sharing the Road",
    question: "When passing a horse and rider on the road, you should:",
    options: [
      "Honk to alert the horse",
      "Slow down and pass carefully — do not honk",
      "Pass as quickly as possible"
    ],
    correctAnswer: 1,
    explanation: "Horses can be startled by loud noises. Slow down and pass carefully without honking."
  },
  {
    id: "sr_018",
    category: "Sharing the Road",
    question: "Slow-moving vehicles on the highway (like farm equipment) display:",
    options: [
      "A red flag",
      "An orange triangle on the back",
      "Flashing headlights"
    ],
    correctAnswer: 1,
    explanation: "Slow-moving vehicles display a fluorescent orange triangle on the rear."
  },

  // =========================================
  // CATEGORY: Emergencies (em_001–em_012)
  // =========================================
  {
    id: "em_001",
    category: "Emergencies",
    question: "If your car starts to skid, you should:",
    options: [
      "Slam on the brakes",
      "Steer in the direction you want to go and ease off the gas",
      "Turn the wheel in the opposite direction"
    ],
    correctAnswer: 1,
    explanation: "In a skid, steer in the direction you want the front of the car to go. Do not brake hard."
  },
  {
    id: "em_002",
    category: "Emergencies",
    question: "If a tire blows out while driving, you should:",
    options: [
      "Brake hard immediately",
      "Hold the steering wheel firmly, ease off the gas, and steer straight",
      "Turn the steering wheel quickly to the side of the road"
    ],
    correctAnswer: 1,
    explanation: "Hold the steering wheel firmly, gradually slow down, and steer to the side of the road. Do not slam the brakes."
  },
  {
    id: "em_003",
    category: "Emergencies",
    question: "If your brakes fail, you should:",
    options: [
      "Pump the brakes rapidly, downshift, and use the parking brake gradually",
      "Turn off the engine immediately",
      "Jump out of the car"
    ],
    correctAnswer: 0,
    explanation: "Pump the brake pedal rapidly to build pressure. Downshift to lower gears. Use the parking brake gradually. Look for an escape route."
  },
  {
    id: "em_004",
    category: "Emergencies",
    question: "If your accelerator (gas pedal) sticks, you should:",
    options: [
      "Turn off the engine immediately",
      "Shift to neutral, apply the brakes, and pull off the road",
      "Pump the gas pedal"
    ],
    correctAnswer: 1,
    explanation: "Shift to neutral to disengage the engine from the wheels, apply brakes, and safely pull off the road."
  },
  {
    id: "em_005",
    category: "Emergencies",
    question: "If your vehicle catches fire, you should:",
    options: [
      "Keep driving to the nearest fire station",
      "Pull over, turn off the engine, get everyone away from the vehicle, and call 911",
      "Pour water on the engine"
    ],
    correctAnswer: 1,
    explanation: "Pull over safely, turn off the engine, move everyone away from the vehicle, and call 911."
  },
  {
    id: "em_006",
    category: "Emergencies",
    question: "If your vehicle breaks down on the freeway, you should:",
    options: [
      "Stop where you are and call for help",
      "Pull completely off the road, make your car visible with hazard lights, and call for help",
      "Try to flag down another driver"
    ],
    correctAnswer: 1,
    explanation: "Pull completely off the road, turn on hazard lights, raise the hood if possible, and call for help."
  },
  {
    id: "em_007",
    category: "Emergencies",
    question: "You are involved in a collision and someone is injured. You must:",
    options: [
      "Move the injured person away from the road",
      "Stop, call 911, give aid if qualified, and report the crash",
      "Leave to get help"
    ],
    correctAnswer: 1,
    explanation: "California law requires you to stop at the scene, call for help, give reasonable aid, and exchange information."
  },
  {
    id: "em_008",
    category: "Emergencies",
    question: "If you are in a collision with a parked car and cannot find the owner, you must:",
    options: [
      "Leave without doing anything",
      "Leave a note with your name, address, and what happened, then report to police",
      "Wait at the scene for the owner"
    ],
    correctAnswer: 1,
    explanation: "Leave a note with your name, phone number, address, and a description of what happened. Report the collision to police."
  },
  {
    id: "em_009",
    category: "Emergencies",
    question: "A collision must be reported to the DMV within 10 days if:",
    options: [
      "There is any damage to your vehicle",
      "There is an injury, death, or property damage exceeding $1,000",
      "Only if you were at fault"
    ],
    correctAnswer: 1,
    explanation: "You must file a report with the DMV (Form SR-1) within 10 days if anyone is injured/killed or property damage exceeds $1,000."
  },
  {
    id: "em_010",
    category: "Emergencies",
    question: "If you encounter a collision scene, you should:",
    options: [
      "Stop only if you are involved",
      "Pull over safely, call 911 if needed, and offer help if qualified",
      "Always stop and direct traffic"
    ],
    correctAnswer: 1,
    explanation: "Pull over safely if you can help. Call 911 and provide assistance if you are trained to do so."
  },
  {
    id: "em_011",
    category: "Emergencies",
    question: "If your vehicle is stalled on railroad tracks and a train is approaching, you should:",
    options: [
      "Try to restart the engine",
      "Get out immediately and run diagonally away from the tracks toward the oncoming train",
      "Call 911 and wait in the car"
    ],
    correctAnswer: 1,
    explanation: "Get out of the vehicle immediately and run diagonally away from the tracks, toward the approaching train. This avoids being hit by debris."
  },
  {
    id: "em_012",
    category: "Emergencies",
    question: "What is the emergency number to call in case of a traffic collision?",
    options: [
      "311",
      "911",
      "411"
    ],
    correctAnswer: 1,
    explanation: "Call 911 for any emergency including traffic collisions with injuries."
  },

  // =========================================
  // CATEGORY: Vehicle Equipment (ve_001–ve_010)
  // =========================================
  {
    id: "ve_001",
    category: "Vehicle Equipment",
    question: "All vehicles must have working:",
    options: [
      "Air conditioning",
      "Brakes, headlights, taillights, turn signals, horn, mirrors, and windshield wipers",
      "GPS navigation"
    ],
    correctAnswer: 1,
    explanation: "California law requires working brakes, lights (headlights, taillights, brake lights), signals, horn, mirrors, and wipers."
  },
  {
    id: "ve_002",
    category: "Vehicle Equipment",
    question: "Your vehicle must have at least how many mirrors?",
    options: [
      "One (rearview mirror)",
      "Two (rearview and left side mirror)",
      "Three"
    ],
    correctAnswer: 1,
    explanation: "California requires at least two mirrors — a rearview mirror and a left-side mirror — that provide a view of the highway at least 200 feet behind."
  },
  {
    id: "ve_003",
    category: "Vehicle Equipment",
    question: "Children under age 2 must ride in:",
    options: [
      "Any car seat in the back seat",
      "A rear-facing car seat in the back seat",
      "A booster seat"
    ],
    correctAnswer: 1,
    explanation: "Children under 2 must ride in a rear-facing car seat in the back seat, unless they weigh 40+ lbs or are 40+ inches tall."
  },
  {
    id: "ve_004",
    category: "Vehicle Equipment",
    question: "Children under age 8 must:",
    options: [
      "Sit in the front seat",
      "Be secured in a car seat or booster seat in the back seat",
      "Wear only a seatbelt"
    ],
    correctAnswer: 1,
    explanation: "Children under 8 must be properly secured in a car seat or booster seat in the back seat."
  },
  {
    id: "ve_005",
    category: "Vehicle Equipment",
    question: "How dark can your front side window tint legally be in California?",
    options: [
      "Any darkness",
      "Must allow at least 70% of light in",
      "Must allow at least 50% of light in"
    ],
    correctAnswer: 1,
    explanation: "Front side windows must allow at least 70% of light to pass through in California."
  },
  {
    id: "ve_006",
    category: "Vehicle Equipment",
    question: "Wearing a seatbelt is required for:",
    options: [
      "Only the driver",
      "Only the driver and front seat passenger",
      "All occupants in the vehicle"
    ],
    correctAnswer: 2,
    explanation: "California law requires all occupants of a vehicle to wear seatbelts, regardless of seating position."
  },
  {
    id: "ve_007",
    category: "Vehicle Equipment",
    question: "When must you use your headlights?",
    options: [
      "Only at night",
      "From 30 minutes after sunset to 30 minutes before sunrise, and when visibility is less than 1,000 feet",
      "Only when it's raining"
    ],
    correctAnswer: 1,
    explanation: "Headlights are required from 30 minutes after sunset to 30 minutes before sunrise, and whenever you cannot see 1,000 feet ahead."
  },
  {
    id: "ve_008",
    category: "Vehicle Equipment",
    question: "You must have liability insurance that covers at least:",
    options: [
      "$5,000 for property damage",
      "$15,000 for injury/death of one person, $30,000 for injury/death of two or more, and $5,000 for property damage",
      "$50,000 total coverage"
    ],
    correctAnswer: 1,
    explanation: "California's minimum liability insurance is 15/30/5: $15,000 per person injury, $30,000 per accident injury, $5,000 property damage."
  },
  {
    id: "ve_009",
    category: "Vehicle Equipment",
    question: "It is illegal to drive with:",
    options: [
      "Headphones or earbuds covering both ears",
      "The windows down",
      "Sunglasses"
    ],
    correctAnswer: 0,
    explanation: "It is illegal to wear headphones or earbuds covering both ears while driving. One earbud is allowed."
  },
  {
    id: "ve_010",
    category: "Vehicle Equipment",
    question: "Your vehicle registration must be renewed:",
    options: [
      "Every 5 years",
      "Every year",
      "Every 2 years"
    ],
    correctAnswer: 1,
    explanation: "California vehicle registration must be renewed annually."
  },

  // =========================================
  // CATEGORY: Special Driving Conditions (sc_001–sc_015)
  // =========================================
  {
    id: "sc_001",
    category: "Special Driving Conditions",
    question: "When driving in heavy fog, you should use:",
    options: [
      "High beam headlights",
      "Low beam headlights",
      "Parking lights only"
    ],
    correctAnswer: 1,
    explanation: "Use low beams in fog. High beams reflect off the fog and reduce visibility."
  },
  {
    id: "sc_002",
    category: "Special Driving Conditions",
    question: "If it starts to rain after a long dry spell, the road is most slippery:",
    options: [
      "After it has been raining for an hour",
      "During the first few minutes of rain",
      "Only if the temperature is below 40°F"
    ],
    correctAnswer: 1,
    explanation: "The road is most slippery during the first few minutes of rain because oil and dust on the surface mix with the water."
  },
  {
    id: "sc_003",
    category: "Special Driving Conditions",
    question: "When driving at night, you should:",
    options: [
      "Use high beams at all times",
      "Dim your high beams when within 500 feet of an oncoming vehicle",
      "Dim your high beams only when the other driver dims theirs first"
    ],
    correctAnswer: 1,
    explanation: "Dim your high beams when within 500 feet of an oncoming vehicle or 300 feet when following another vehicle."
  },
  {
    id: "sc_004",
    category: "Special Driving Conditions",
    question: "When driving in rain, you should:",
    options: [
      "Drive in the tire tracks of the car ahead",
      "Drive faster to avoid being on the road longer",
      "Stay close to the car in front for better visibility"
    ],
    correctAnswer: 0,
    explanation: "In rain, drive in the tire tracks of the vehicle ahead (where water has been displaced). Increase following distance."
  },
  {
    id: "sc_005",
    category: "Special Driving Conditions",
    question: "What should you do if your headlights hit an animal on the road?",
    options: [
      "Swerve to avoid it",
      "Slow down and stop if safe — do not swerve",
      "Speed up to pass it quickly"
    ],
    correctAnswer: 1,
    explanation: "Slow down and stop if safe. Do not swerve — you could lose control of your vehicle or hit another car."
  },
  {
    id: "sc_006",
    category: "Special Driving Conditions",
    question: "When driving through deep water on the road, you should:",
    options: [
      "Speed up to get through quickly",
      "Drive slowly through the water, then test your brakes",
      "Turn around — never drive through flooded areas"
    ],
    correctAnswer: 1,
    explanation: "If you must go through water, drive slowly and test your brakes afterward. If it looks too deep, find an alternate route."
  },
  {
    id: "sc_007",
    category: "Special Driving Conditions",
    question: "When driving on a mountain road, you should:",
    options: [
      "Use cruise control",
      "Keep right on curves and honk on blind turns",
      "Always drive at the speed limit"
    ],
    correctAnswer: 1,
    explanation: "On mountain roads, stay right on curves, use a lower gear going downhill, and honk on blind curves."
  },
  {
    id: "sc_008",
    category: "Special Driving Conditions",
    question: "On a mountain road, when two vehicles meet on a steep road where neither can pass, who must yield?",
    options: [
      "The vehicle going uphill",
      "The vehicle going downhill must yield and back up",
      "Neither — they both stop"
    ],
    correctAnswer: 1,
    explanation: "The vehicle going downhill must yield and back up because the uphill vehicle has less control."
  },
  {
    id: "sc_009",
    category: "Special Driving Conditions",
    question: "When driving on wet roads, you should reduce your speed by:",
    options: [
      "5 mph",
      "About one-third",
      "Half"
    ],
    correctAnswer: 1,
    explanation: "On wet roads, reduce your speed by about one-third. On packed snow, reduce by half. On ice, slow to a crawl."
  },
  {
    id: "sc_010",
    category: "Special Driving Conditions",
    question: "If you must drive in fog and visibility is very poor, you should:",
    options: [
      "Pull off the road completely and wait for it to clear",
      "Use emergency flashers and high beams",
      "Keep driving slowly"
    ],
    correctAnswer: 0,
    explanation: "If fog is too thick to safely drive, pull completely off the road and wait until conditions improve."
  },
  {
    id: "sc_011",
    category: "Special Driving Conditions",
    question: "When driving through a work zone, you should:",
    options: [
      "Maintain the posted speed and watch for workers",
      "Speed up to get through quickly",
      "Follow closely behind the car ahead"
    ],
    correctAnswer: 0,
    explanation: "Obey posted speed limits in work zones, watch for workers and equipment, and be prepared to stop."
  },
  {
    id: "sc_012",
    category: "Special Driving Conditions",
    question: "Chains are required on mountain roads when:",
    options: [
      "It is raining",
      "There is snow or ice on the road and chain controls are in effect",
      "Temperature drops below 32°F"
    ],
    correctAnswer: 1,
    explanation: "Chains may be required during winter conditions. Check Caltrans for chain control information."
  },
  {
    id: "sc_013",
    category: "Special Driving Conditions",
    question: "If you are blinded by the headlights of an oncoming vehicle, you should:",
    options: [
      "Flash your high beams at them",
      "Look toward the right edge of the road until the vehicle passes",
      "Close your eyes briefly"
    ],
    correctAnswer: 1,
    explanation: "Look toward the right edge of your lane to guide your steering until the oncoming vehicle passes."
  },
  {
    id: "sc_014",
    category: "Special Driving Conditions",
    question: "When is the road surface most slippery?",
    options: [
      "During a heavy downpour",
      "During the first few minutes of light rain",
      "After several hours of rain"
    ],
    correctAnswer: 1,
    explanation: "The first few minutes of rain are most dangerous because oil and grime on the surface haven't been washed away yet."
  },
  {
    id: "sc_015",
    category: "Special Driving Conditions",
    question: "During heavy wind, which vehicles are most at risk?",
    options: [
      "Low sports cars",
      "Trucks, RVs, and vehicles towing trailers",
      "SUVs"
    ],
    correctAnswer: 1,
    explanation: "High-profile vehicles like trucks, RVs, and those towing trailers are most vulnerable to strong crosswinds."
  },

  // =========================================
  // ADDITIONAL QUESTIONS — Common on real DMV tests
  // =========================================
  {
    id: "ex_001",
    category: "Rules of the Road",
    question: "You are about to make a left turn. You must signal continuously during the last ____ feet before the turn.",
    options: [
      "50",
      "75",
      "100"
    ],
    correctAnswer: 2,
    explanation: "You must signal continuously during the last 100 feet before turning."
  },
  {
    id: "ex_002",
    category: "Rules of the Road",
    question: "You are driving on a two-lane highway and are being followed by several vehicles that want to pass. You should pull over and let them pass when you have ____ or more vehicles following you.",
    options: [
      "3",
      "5",
      "7"
    ],
    correctAnswer: 1,
    explanation: "On a two-lane highway, if 5 or more vehicles are lined up behind you, you must pull over when safe to let them pass."
  },
  {
    id: "ex_003",
    category: "Vehicle Equipment",
    question: "You must notify the DMV within 5 days if you:",
    options: [
      "Get a traffic ticket",
      "Sell or transfer your vehicle",
      "Change your car insurance company"
    ],
    correctAnswer: 1,
    explanation: "You must notify the DMV within 5 days of selling or transferring ownership of a vehicle."
  },
  {
    id: "ex_004",
    category: "Rules of the Road",
    question: "A traffic signal light is not working at an intersection. You should:",
    options: [
      "Slow down and proceed with caution",
      "Come to a complete stop, then proceed when safe",
      "Wait for a police officer to direct traffic"
    ],
    correctAnswer: 1,
    explanation: "A broken traffic signal should be treated as a four-way stop. Come to a complete stop, then proceed when it is safe."
  },
  {
    id: "ex_005",
    category: "Safe Driving",
    question: "Smoking inside a vehicle when a person younger than 18 years of age is present is:",
    options: [
      "Legal if the windows are open",
      "Illegal at all times",
      "Legal as long as you are the parent"
    ],
    correctAnswer: 1,
    explanation: "It is illegal to smoke in a vehicle when a minor under 18 is present, regardless of whether windows are open."
  },
  {
    id: "ex_006",
    category: "Rules of the Road",
    question: "If you have a green light, but traffic is blocking the intersection, you should:",
    options: [
      "Enter the intersection and wait for traffic to move",
      "Stay out of the intersection until you can get completely across",
      "Honk your horn to warn other drivers"
    ],
    correctAnswer: 1,
    explanation: "Never enter an intersection unless you can get completely through. Blocking an intersection is illegal."
  },
  {
    id: "ex_007",
    category: "Rules of the Road",
    question: "You are driving on the freeway. The vehicle in front of you is a large truck. You should drive:",
    options: [
      "Closely behind the truck so other drivers cannot cut in",
      "Farther behind the truck than you would for a passenger vehicle",
      "To the right side of the truck to be more visible"
    ],
    correctAnswer: 1,
    explanation: "Large trucks have bigger blind spots and need more room to stop. Follow farther behind than you would a passenger vehicle."
  },
  {
    id: "ex_008",
    category: "Safe Driving",
    question: "You are getting ready to make a right turn. You should:",
    options: [
      "Stop before entering the right lane and let all traffic pass",
      "Slow down and signal before the turn",
      "Signal and move into the right lane during the last 100 feet, then turn"
    ],
    correctAnswer: 2,
    explanation: "Signal during the last 100 feet, position yourself in the right lane closest to the curb, then make the turn."
  },
  {
    id: "ex_009",
    category: "Safe Driving",
    question: "To see vehicles in your blind spots, you should check:",
    options: [
      "Your interior rearview mirror",
      "Your side mirrors",
      "Over your shoulder in the direction you want to move"
    ],
    correctAnswer: 2,
    explanation: "Blind spots cannot be seen in any mirror. You must turn your head and look over your shoulder."
  },
  {
    id: "ex_010",
    category: "Alcohol & Drugs",
    question: "A driver with a blood alcohol concentration (BAC) of 0.08% or more is considered:",
    options: [
      "Legally impaired but not intoxicated",
      "Under the legal limit",
      "Legally intoxicated (per se DUI)"
    ],
    correctAnswer: 2,
    explanation: "In California, a BAC of 0.08% or higher is per se DUI — you are legally intoxicated regardless of how you feel."
  },
  {
    id: "ex_011",
    category: "Rules of the Road",
    question: "When you park your vehicle on a level road next to a curb, your wheels must be:",
    options: [
      "Within 12 inches of the curb",
      "Within 18 inches of the curb",
      "Within 24 inches of the curb"
    ],
    correctAnswer: 1,
    explanation: "Your wheels must be within 18 inches of the curb when parking parallel to a curb."
  },
  {
    id: "ex_012",
    category: "Rules of the Road",
    question: "Which way do you turn your front wheels when you park facing uphill next to a curb?",
    options: [
      "Toward the curb (right)",
      "Away from the curb (left)",
      "Straight ahead"
    ],
    correctAnswer: 1,
    explanation: "When parked uphill with a curb, turn your wheels away from the curb (left). If brakes fail, the car rolls into the curb."
  },
  {
    id: "ex_013",
    category: "Sharing the Road",
    question: "You are approaching an intersection. A blind person is at the corner ready to cross with a white cane. You must:",
    options: [
      "Honk once to let them know you are there",
      "Stop at the crosswalk and wait for the person to cross",
      "Drive slowly past them"
    ],
    correctAnswer: 1,
    explanation: "Always stop for blind pedestrians. Do not honk — it may startle or confuse them."
  },
  {
    id: "ex_014",
    category: "Rules of the Road",
    question: "You must report any traffic collision to the DMV within 10 days if:",
    options: [
      "Your vehicle was damaged",
      "Anyone was injured or killed, or there was property damage over $1,000",
      "You received a traffic ticket at the scene"
    ],
    correctAnswer: 1,
    explanation: "File a report (SR-1) with the DMV within 10 days if anyone was injured/killed or property damage exceeds $1,000."
  },
  {
    id: "ex_015",
    category: "Speed Laws",
    question: "The speed limit in any business or residential district is ____ mph, unless otherwise posted.",
    options: [
      "20",
      "25",
      "30"
    ],
    correctAnswer: 1,
    explanation: "The default speed limit in business and residential districts is 25 mph."
  },
  {
    id: "ex_016",
    category: "Safe Driving",
    question: "The safest precaution you can take for driving at night is to:",
    options: [
      "Use your high beam headlights at all times",
      "Reduce your speed and increase following distance",
      "Drive in the left lane"
    ],
    correctAnswer: 1,
    explanation: "At night, reduce speed so you can stop within the distance illuminated by your headlights, and increase following distance."
  },
  {
    id: "ex_017",
    category: "Rules of the Road",
    question: "You may drive off the paved roadway to pass another vehicle:",
    options: [
      "If the vehicle is turning left",
      "If the shoulder is wide enough",
      "Under no circumstances"
    ],
    correctAnswer: 2,
    explanation: "You may never drive off the paved or main-traveled portion of the road to pass."
  },
  {
    id: "ex_018",
    category: "Sharing the Road",
    question: "Which of the following is true about large trucks?",
    options: [
      "Trucks can stop faster than cars because of their braking systems",
      "Trucks have larger blind spots than most passenger vehicles",
      "Trucks always have the right of way on highways"
    ],
    correctAnswer: 1,
    explanation: "Large trucks have extensive blind spots (No-Zones) on all four sides. Avoid lingering in these areas."
  },
  {
    id: "ex_019",
    category: "Rules of the Road",
    question: "When you are within 200 feet of a cross street where you plan to turn right, you may drive in a bike lane:",
    options: [
      "Never — bike lanes are only for bicycles",
      "Only if there are no bicyclists in the bike lane",
      "After checking for and yielding to bicyclists"
    ],
    correctAnswer: 2,
    explanation: "You may enter a bike lane within 200 feet of a right turn, but you must first check for and yield to bicyclists."
  },
  {
    id: "ex_020",
    category: "Safe Driving",
    question: "Which of the following is true about road conditions after the first rain in a long time?",
    options: [
      "Roads are safest right as rain begins since dust is washed away",
      "Roads are most slippery during the first few minutes because oil mixes with water",
      "Rain only makes roads dangerous if it lasts more than an hour"
    ],
    correctAnswer: 1,
    explanation: "The first rain after a dry spell is the most dangerous. Oil and dust mix with water before being washed away, making roads very slippery."
  }
];

// Export for use in other modules
window.QUESTIONS = QUESTIONS;
window.CATEGORIES = CATEGORIES;
window.SIGN_SVGS = SIGN_SVGS;
