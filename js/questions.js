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
  stop: `<img src="images/signs/stop.png" alt="Stop Sign" class="sign-image" />`,
  yield: `<img src="images/signs/yield.png" alt="Yield Sign" class="sign-image" />`,
  doNotEnter: `<img src="images/signs/doNotEnter.png" alt="Do Not Enter Sign" class="sign-image" />`,
  wrongWay: `<img src="images/signs/wrongWay.png" alt="Wrong Way Sign" class="sign-image" />`,
  speedLimit: (speed) => `<img src="images/signs/speedLimit.png" alt="Speed Limit ${speed}" class="sign-image" />`,
  schoolZone: `<img src="images/signs/schoolZone.png" alt="School Zone Sign" class="sign-image" />`,
  noUTurn: `<img src="images/signs/noUTurn.png" alt="No U-Turn Sign" class="sign-image" />`,
  railroadCrossing: `<img src="images/signs/railroad.png" alt="Railroad Crossing Sign" class="sign-image" />`,
  pedestrianCrossing: `<img src="images/signs/pedestrian.png" alt="Pedestrian Crossing Sign" class="sign-image" />`,
  mergeRight: `<img src="images/signs/merge.png" alt="Merge Right Sign" class="sign-image" />`,
  curveAhead: `<img src="images/signs/curve.png" alt="Curve Ahead Sign" class="sign-image" />`,
  construction: `<img src="images/signs/construction.png" alt="Construction Zone Sign" class="sign-image" />`,
  oneWay: `<svg viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="156" height="46" rx="3" fill="#000" stroke="#fff" stroke-width="3"/><text x="80" y="22" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold" font-family="Arial">ONE WAY</text><polygon points="120,10 150,25 120,40" fill="#fff"/></svg>`, // Keep as SVG since it wasn't fetched
  noLeftTurn: `<img src="images/signs/noLeftTurn.png" alt="No Left Turn Sign" class="sign-image" />`,
  keepRight: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="90" height="110" rx="5" fill="#fff" stroke="#000" stroke-width="3"/><text x="50" y="35" text-anchor="middle" fill="#000" font-size="12" font-weight="bold" font-family="Arial">KEEP</text><text x="50" y="55" text-anchor="middle" fill="#000" font-size="12" font-weight="bold" font-family="Arial">RIGHT</text><polygon points="50,65 65,90 35,90" fill="#000"/><line x1="65" y1="77" x2="65" y2="100" stroke="#000" stroke-width="3"/></svg>`,
  sharedLaneBikes: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><polygon points="60,5 115,115 5,115" fill="#FFD700" stroke="#000" stroke-width="3"/><text x="60" y="55" text-anchor="middle" fill="#000" font-size="10" font-weight="bold" font-family="Arial">SHARE</text><text x="60" y="70" text-anchor="middle" fill="#000" font-size="10" font-weight="bold" font-family="Arial">THE</text><text x="60" y="85" text-anchor="middle" fill="#000" font-size="10" font-weight="bold" font-family="Arial">ROAD</text></svg>`,
  slipperyWhenWet: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><polygon points="60,5 115,115 5,115" fill="#FFD700" stroke="#000" stroke-width="3"/><path d="M45,90 Q55,60 55,55 Q55,45 65,50 Q70,55 65,65 Q60,75 75,95" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/></svg>`,
  dividedHighway: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><polygon points="60,5 115,115 5,115" fill="#FFD700" stroke="#000" stroke-width="3"/><rect x="56" y="35" width="8" height="55" rx="2" fill="#000"/><polygon points="40,75 55,45 55,75" fill="#000"/><polygon points="80,75 65,45 65,75" fill="#000"/></svg>`,
  twoWayTraffic: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><polygon points="60,5 115,115 5,115" fill="#FFD700" stroke="#000" stroke-width="3"/><polygon points="45,55 45,95 38,95 50,105 62,95 55,95 55,55" fill="#000"/><polygon points="65,65 65,30 58,30 70,20 82,30 75,30 75,65" fill="#000"/></svg>`,
  stopAheadSign: `<img src="images/signs/stopAhead.png" alt="Stop Ahead Sign" class="sign-image" />`,
  handicapped: `<img src="images/signs/handicapped.png" alt="Handicapped Parking Sign" class="sign-image" />`,
  redCurb: `<svg viewBox="0 0 160 60" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="30" width="150" height="25" rx="3" fill="#CC0000"/><text x="80" y="48" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold" font-family="Arial">RED CURB</text><text x="80" y="22" text-anchor="middle" fill="#666" font-size="11" font-family="Arial">No stopping, standing, or parking</text></svg>`,
  yellowCurb: `<svg viewBox="0 0 160 60" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="30" width="150" height="25" rx="3" fill="#FFD700"/><text x="80" y="48" text-anchor="middle" fill="#000" font-size="12" font-weight="bold" font-family="Arial">YELLOW CURB</text><text x="80" y="22" text-anchor="middle" fill="#666" font-size="11" font-family="Arial">Loading / unloading only</text></svg>`,
  greenCurb: `<svg viewBox="0 0 160 60" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="30" width="150" height="25" rx="3" fill="#228B22"/><text x="80" y="48" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold" font-family="Arial">GREEN CURB</text><text x="80" y="22" text-anchor="middle" fill="#666" font-size="11" font-family="Arial">Limited time parking</text></svg>`,
  whiteCurb: `<svg viewBox="0 0 160 60" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="30" width="150" height="25" rx="3" fill="#fff" stroke="#ccc" stroke-width="2"/><text x="80" y="48" text-anchor="middle" fill="#000" font-size="12" font-weight="bold" font-family="Arial">WHITE CURB</text><text x="80" y="22" text-anchor="middle" fill="#666" font-size="11" font-family="Arial">Passenger loading only</text></svg>`,
  blueCurb: `<svg viewBox="0 0 160 60" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="30" width="150" height="25" rx="3" fill="#0066CC"/><text x="80" y="48" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold" font-family="Arial">BLUE CURB</text><text x="80" y="22" text-anchor="middle" fill="#666" font-size="11" font-family="Arial">Disabled parking only</text></svg>`,
  flashing_red: `<img src="images/signs/flashingRed.png" alt="Flashing Red Light" class="sign-image" />`,
  flashing_yellow: `<img src="images/signs/flashingYellow.png" alt="Flashing Yellow Light" class="sign-image" />`,
  greenArrow: `<img src="images/signs/greenArrow.png" alt="Green Arrow Light" class="sign-image" />`,
  solidYellowLines: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="100" fill="#555"/><line x1="0" y1="48" x2="200" y2="48" stroke="#FFD700" stroke-width="4"/><line x1="0" y1="56" x2="200" y2="56" stroke="#FFD700" stroke-width="4"/><text x="100" y="30" text-anchor="middle" fill="#fff" font-size="12" font-family="Arial">← Opposite traffic →</text><text x="100" y="85" text-anchor="middle" fill="#fff" font-size="12" font-family="Arial">← Opposite traffic →</text></svg>`,
  brokenYellowLine: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="100" fill="#555"/><line x1="0" y1="48" x2="200" y2="48" stroke="#FFD700" stroke-width="4"/><line x1="0" y1="56" x2="30" y2="56" stroke="#FFD700" stroke-width="4" stroke-dasharray="20,10"/><line x1="30" y1="56" x2="200" y2="56" stroke="#FFD700" stroke-width="4" stroke-dasharray="20,10"/></svg>`,
  schoolBus: `<img src="images/signs/schoolBus.png" alt="School Bus" class="sign-image" />`,
  carpoolSign: `<img src="images/signs/carpool.png" alt="Carpool Sign" class="sign-image" />`,
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
    question: "You want to park your vehicle, and you notice the curb is painted red. What does a red curb indicate?",
    options: [
      "You may park here only to load or unload passengers",
      "No stopping, standing, or parking at any time",
      "You may stop here only in an emergency"
    ],
    correctAnswer: 1,
    explanation: "Red curb = NO stopping, standing, or parking at any time (except buses at red bus zones).",
    image: SIGN_SVGS.redCurb
  },
  {
    id: "pk_002",
    category: "Parking",
    question: "You pull up to a yellow painted curb. What are the rules for this zone?",
    options: [
      "You may park here for up to 15 minutes",
      "It is for loading and unloading passengers or freight; non-commercial drivers must stay with the vehicle",
      "It is reserved exclusively for commercial delivery trucks at all times"
    ],
    correctAnswer: 1,
    explanation: "Yellow curb = loading/unloading of passengers or freight only. Drivers of noncommercial vehicles must stay with the vehicle.",
    image: SIGN_SVGS.yellowCurb
  },
  {
    id: "pk_003",
    category: "Parking",
    question: "You need to run into a store quickly and see a green painted curb. What does it mean?",
    options: [
      "Parking for emergency vehicles only",
      "Parking for a limited time, usually indicated by a nearby sign",
      "You may park here indefinitely on weekends"
    ],
    correctAnswer: 1,
    explanation: "Green curb = time-limited parking, often very short (e.g., 15 or 30 minutes). Check posted signs.",
    image: SIGN_SVGS.greenCurb
  },
  {
    id: "pk_004",
    category: "Parking",
    question: "You see a blue painted curb. Who is permitted to park here?",
    options: [
      "Anyone who is just dropping off a passenger",
      "Only vehicles displaying a disabled person placard or special license plates",
      "Only residents with a city parking permit"
    ],
    correctAnswer: 1,
    explanation: "Blue curb = reserved for vehicles displaying a disabled person placard or special license plates.",
    image: SIGN_SVGS.blueCurb
  },
  {
    id: "pk_005",
    category: "Parking",
    question: "You are looking for street parking and spot an open space near a fire hydrant. How far away from the hydrant must you park?",
    options: [
      "At least 10 feet",
      "At least 15 feet",
      "At least 20 feet"
    ],
    correctAnswer: 1,
    explanation: "You must park at least 15 feet from a fire hydrant."
  },
  {
    id: "pk_006",
    category: "Parking",
    question: "You need to park near a railroad track. What is the minimum legal distance you can park from the tracks?",
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
    question: "You are parallel parking your car on a city street. Your wheels must be within what distance from the curb?",
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
    question: "You are running a quick errand and have your 5-year-old child in the car. Under California law, when is it illegal to leave the child unattended in the vehicle?",
    options: [
      "When the engine is running or the keys are left in the ignition",
      "Only if you will be gone for more than 15 minutes",
      "Only when the outside temperature exceeds 90°F"
    ],
    correctAnswer: 0,
    explanation: "California law prohibits leaving a child 6 or younger unattended in a vehicle when the engine is running or keys are in the ignition."
  },
  {
    id: "pk_009",
    category: "Parking",
    question: "You want to park on the left side of a two-way street facing oncoming traffic. Is this legal?",
    options: [
      "Yes, as long as you pull completely onto the shoulder",
      "No, you must park parallel to the curb facing the direction of traffic on your side",
      "Yes, but only in residential neighborhoods"
    ],
    correctAnswer: 1,
    explanation: "Park parallel to and facing the direction of traffic on your side of the road."
  },
  {
    id: "pk_010",
    category: "Parking",
    question: "You are having trouble finding a parking spot. In which of the following locations is it always illegal to park?",
    options: [
      "On a bridge, unless permitted by signs",
      "In an unmarked crosswalk at an intersection",
      "Both of the above"
    ],
    correctAnswer: 2,
    explanation: "You may never park in a crosswalk (marked or unmarked), on a sidewalk, or blocking a driveway, nor on a bridge unless posted."
  },
  {
    id: "pk_011",
    category: "Parking",
    question: "The curb is full, so you stop your vehicle in the road next to a row of parked cars to wait for a friend. This is called 'double parking'. Is this legal?",
    options: [
      "Yes, if you keep your engine running and stay in the driver's seat",
      "No, double parking is always illegal",
      "Yes, if you turn on your emergency hazard lights"
    ],
    correctAnswer: 1,
    explanation: "Double parking is always illegal in California."
  },
  {
    id: "pk_012",
    category: "Parking",
    question: "You are preparing to leave your vehicle parked on the street. Before walking away, you must:",
    options: [
      "Leave the transmission in neutral and turn the wheels away from the curb",
      "Stop the engine, set the parking brake, and take the ignition key with you",
      "Leave your hazard lights flashing if the spot is dimly lit"
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
    question: "You are 25 years old and have had a few drinks at a party. Under California law, it is illegal for you to drive with a Blood Alcohol Concentration (BAC) of:",
    options: [
      "0.05% or higher",
      "0.08% or higher",
      "0.10% or higher"
    ],
    correctAnswer: 1,
    explanation: "In California, the legal BAC limit for drivers 21 and older is 0.08%. You can be impaired below this level."
  },
  {
    id: "ad_002",
    category: "Alcohol & Drugs",
    question: "You are 19 years old. What is the legal Blood Alcohol Concentration (BAC) limit for you to drive?",
    options: [
      "0.01% or higher (zero tolerance)",
      "0.05% or higher",
      "0.08% or higher"
    ],
    correctAnswer: 0,
    explanation: "California has a zero-tolerance law for drivers under 21. The BAC limit is 0.01%."
  },
  {
    id: "ad_003",
    category: "Alcohol & Drugs",
    question: "You are pulled over, and a police officer suspects you of a DUI. The officer asks you to take a breath or blood test. Under the 'implied consent' law, you:",
    options: [
      "Can refuse the test without penalty if it is your first offense",
      "Have already consented to take the test just by driving in California",
      "Must take the test only if you were involved in a collision"
    ],
    correctAnswer: 1,
    explanation: "By driving in California, you automatically consent to a chemical test (blood, breath, or urine) if lawfully arrested for DUI."
  },
  {
    id: "ad_004",
    category: "Alcohol & Drugs",
    question: "You are arrested for a DUI and refuse to take a chemical test (blood or breath). What will happen to your driver's license?",
    options: [
      "It will be suspended for 6 months",
      "It will be suspended for 1 year",
      "You will simply be fined $500 instead"
    ],
    correctAnswer: 1,
    explanation: "Refusing a chemical test results in a mandatory 1-year license suspension for the first offense, plus other penalties."
  },
  {
    id: "ad_005",
    category: "Alcohol & Drugs",
    question: "You are considering driving home after drinking alcohol. You should remember that alcohol affects your driving primarily by:",
    options: [
      "Making you more alert to potential hazards",
      "Impairing your judgment, slowing reaction time, and reducing coordination",
      "Decreasing your stopping distance"
    ],
    correctAnswer: 1,
    explanation: "Alcohol impairs judgment, slows reaction time, reduces coordination, and affects vision — all critical for safe driving."
  },
  {
    id: "ad_006",
    category: "Alcohol & Drugs",
    question: "You have had several drinks and feel intoxicated, but you need to drive home. What is the only thing that will sober you up?",
    options: [
      "Drinking two cups of black coffee",
      "Taking a cold shower before leaving",
      "Time"
    ],
    correctAnswer: 2,
    explanation: "Only time can lower your BAC. Coffee, cold showers, food, and exercise do not speed up the process."
  },
  {
    id: "ad_007",
    category: "Alcohol & Drugs",
    question: "You are convicted of your first DUI. What are the potential penalties?",
    options: [
      "A written warning and a small fine",
      "Up to 6 months in jail, heavy fines, license suspension, and mandatory DUI school",
      "Your car will be permanently confiscated"
    ],
    correctAnswer: 1,
    explanation: "A first DUI can result in up to 6 months in jail, fines of $390–$1,000 (plus assessments), license suspension, and mandatory DUI school."
  },
  {
    id: "ad_008",
    category: "Alcohol & Drugs",
    question: "You are a passenger in a vehicle driving on the highway. Can you legally drink an alcoholic beverage while the car is moving?",
    options: [
      "Yes, as long as the driver is not drinking",
      "No, it is illegal for anyone to drink alcohol in a vehicle on a highway",
      "Yes, but only if it is beer or wine"
    ],
    correctAnswer: 1,
    explanation: "It is illegal to drink any alcoholic beverage while driving or riding as a passenger in a motor vehicle on a highway."
  },
  {
    id: "ad_009",
    category: "Alcohol & Drugs",
    question: "You are taking a new prescription medication for a cold. Before driving, you should:",
    options: [
      "Assume it is safe because it was prescribed by a doctor",
      "Understand that many prescription drugs can impair your driving just as much as alcohol",
      "Only worry if you are taking the medication along with alcohol"
    ],
    correctAnswer: 1,
    explanation: "Many prescription and over-the-counter medications can impair driving. Check labels and ask your doctor."
  },
  {
    id: "ad_010",
    category: "Alcohol & Drugs",
    question: "You purchased over-the-counter allergy medicine. Before getting behind the wheel, you should:",
    options: [
      "Not worry, because over-the-counter medicines do not affect driving",
      "Read the label to see if it causes drowsiness or warns against operating machinery",
      "Take half the dose to ensure you don't get sleepy"
    ],
    correctAnswer: 1,
    explanation: "Always read medication labels for warnings about driving. Ask your doctor or pharmacist if unsure."
  },
  {
    id: "ad_011",
    category: "Alcohol & Drugs",
    question: "You hold a commercial driver's license (CDL) and are driving a commercial vehicle. The legal BAC limit for you is:",
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
    question: "Since marijuana is legal for recreational use in California, what is the law regarding driving under its influence?",
    options: [
      "It is perfectly legal to drive after using marijuana",
      "It is illegal, and you will be subject to the same DUI penalties as if you were drinking alcohol",
      "It is legal as long as you have a doctor's recommendation"
    ],
    correctAnswer: 1,
    explanation: "Driving under the influence of marijuana (or any drug) is illegal in California, regardless of marijuana's legal status."
  },
  {
    id: "ad_013",
    category: "Alcohol & Drugs",
    question: "You are going out for the evening and know you will be drinking. What is the best way to ensure you do not get a DUI?",
    options: [
      "Stop drinking at least one hour before you plan to drive",
      "Plan ahead to have a designated driver, or use a taxi/rideshare service",
      "Drive slower and stick to back roads"
    ],
    correctAnswer: 1,
    explanation: "The only sure way to avoid a DUI is to not drink and drive. Plan ahead with a designated driver or ride service."
  },
  {
    id: "ad_014",
    category: "Alcohol & Drugs",
    question: "You are driving home from a party and have an opened bottle of wine. Where is the only legal place to keep it?",
    options: [
      "In the trunk",
      "In the passenger area, as long as it has a cork in it",
      "In the glove compartment"
    ],
    correctAnswer: 0,
    explanation: "Open containers of alcohol are illegal in the passenger area. They must be stored in the trunk."
  },
  {
    id: "ad_015",
    category: "Alcohol & Drugs",
    question: "You are pulled over and take a breath test that shows a BAC of 0.08%. What immediate action will the DMV take?",
    options: [
      "They will fine you $100 on the spot",
      "They will impose an 'administrative per se' suspension of your license for 4 months",
      "They will impound your car for a week"
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
    question: "You approach an intersection with no marked crosswalks or traffic lights. A pedestrian is waiting to cross. Who has the right-of-way?",
    options: [
      "You do, because there is no marked crosswalk",
      "The pedestrian does, because there is an implied crosswalk at every intersection",
      "Whoever reached the intersection first"
    ],
    correctAnswer: 1,
    explanation: "You must yield to pedestrians in all crosswalks, whether marked or unmarked (every intersection has an implied crosswalk)."
  },
  {
    id: "sr_004",
    category: "Sharing the Road",
    question: "You are stopped at an intersection, and a blind pedestrian with a guide dog is preparing to cross. You should:",
    options: [
      "Honk your horn lightly to let them know you are waiting",
      "Remain stopped and yield the right-of-way without honking",
      "Drive past quickly before they step into the street"
    ],
    correctAnswer: 1,
    explanation: "Always stop and yield to blind pedestrians. Do not honk, as it may confuse them."
  },
  {
    id: "sr_005",
    category: "Sharing the Road",
    question: "You are driving on the highway and notice a motorcycle ahead. How much of the lane is the motorcycle entitled to?",
    options: [
      "Only the right half of the lane",
      "The full traffic lane, just like a car",
      "They must ride on the shoulder if traffic is heavy"
    ],
    correctAnswer: 1,
    explanation: "Motorcycles are entitled to a full traffic lane. Do not try to share their lane."
  },
  {
    id: "sr_006",
    category: "Sharing the Road",
    question: "You are following a motorcycle on a winding road. Your following distance should be:",
    options: [
      "Closer than you would for a car so they can see you in their mirrors",
      "Greater than you would for a car",
      "Exactly the same as you would for a car"
    ],
    correctAnswer: 1,
    explanation: "Follow motorcycles at a greater distance because they can stop much more quickly than a car."
  },
  {
    id: "sr_007",
    category: "Sharing the Road",
    question: "You are in heavy traffic, and a motorcycle passes you by riding between lanes of slow-moving vehicles. Is this legal in California?",
    options: [
      "No, lane splitting is always illegal",
      "Yes, lane splitting is legal when done safely and prudently",
      "Yes, but only on highways with a speed limit over 65 mph"
    ],
    correctAnswer: 1,
    explanation: "California is the only state that allows lane splitting by motorcycles, when done safely and prudently."
  },
  {
    id: "sr_008",
    category: "Sharing the Road",
    question: "You are driving on the freeway near a large commercial truck. What area should you avoid lingering in?",
    options: [
      "Directly in front of the truck only",
      "The truck's large blind spots (No-Zones) on all four sides",
      "The fast lane next to the truck"
    ],
    correctAnswer: 1,
    explanation: "Large trucks have extensive blind spots (No-Zones) on all four sides. Avoid lingering in these areas."
  },
  {
    id: "sr_009",
    category: "Sharing the Road",
    question: "You hear sirens and see an ambulance approaching from behind with flashing lights. What must you do?",
    options: [
      "Speed up to clear the lane for them",
      "Pull over to the right edge of the road and stop",
      "Stop immediately in your current lane"
    ],
    correctAnswer: 1,
    explanation: "Pull to the right side of the road and stop until the emergency vehicle passes."
  },
  {
    id: "sr_010",
    category: "Sharing the Road",
    question: "You see a police car stopped on the right shoulder of the freeway with its emergency lights flashing. Under California's 'Move Over' law, you must:",
    options: [
      "Move over one lane to the left if safe, or slow down if you cannot change lanes",
      "Honk your horn to acknowledge them",
      "Speed up to get past the hazard quickly"
    ],
    correctAnswer: 0,
    explanation: "The Move Over law requires drivers to change lanes away from stopped emergency vehicles, or slow down if lane change isn't possible."
  },
  {
    id: "sr_011",
    category: "Sharing the Road",
    question: "You approach an intersection and see a pedestrian with a white cane waiting to cross. You should:",
    options: [
      "Honk to let them know it is safe to cross",
      "Come to a complete stop and wait for them to cross safely",
      "Continue driving if they haven't stepped off the curb yet"
    ],
    correctAnswer: 1,
    explanation: "Always stop completely for visually impaired pedestrians. Do not honk — it can be disorienting."
  },
  {
    id: "sr_012",
    category: "Sharing the Road",
    question: "You are driving in the left lane of a multi-lane road. The car in the right lane is stopped at a crosswalk. You should:",
    options: [
      "Pass them quickly",
      "Stop as well, because they may be yielding to a pedestrian you cannot see",
      "Honk at the stopped car to get them to move"
    ],
    correctAnswer: 1,
    explanation: "The stopped vehicle may be yielding to a pedestrian. Never pass a vehicle stopped at a crosswalk."
  },
  {
    id: "sr_013",
    category: "Sharing the Road",
    question: "You are sharing a narrow road with a bicyclist. What rights do bicyclists have on California roads?",
    options: [
      "They must always yield to motor vehicles",
      "They have the same rights and responsibilities as motor vehicle drivers",
      "They have absolute right-of-way over all vehicles"
    ],
    correctAnswer: 1,
    explanation: "Bicyclists have the same rights and responsibilities as motor vehicle drivers on California roads."
  },
  {
    id: "sr_014",
    category: "Sharing the Road",
    question: "You want to make a right turn at an upcoming intersection, but there is a bike lane on your right. What is the proper procedure?",
    options: [
      "Turn from your traffic lane, cutting across the bike lane",
      "Merge into the bike lane no more than 200 feet before the turn, after yielding to any bicycles",
      "Never enter the bike lane; it is for bicycles only"
    ],
    correctAnswer: 1,
    explanation: "You may enter a bike lane within 200 feet of a right turn, but you must first check for and yield to bicyclists."
  },
  {
    id: "sr_015",
    category: "Sharing the Road",
    question: "You are approaching a residential intersection without stop signs. A pedestrian steps into the street. Who has the right-of-way?",
    options: [
      "You do, because there are no stop signs",
      "The pedestrian does, because they have the right-of-way at all intersections",
      "Whoever is moving faster"
    ],
    correctAnswer: 1,
    explanation: "Pedestrians have the right-of-way at all intersections. Every intersection has a crosswalk, whether marked or not."
  },
  {
    id: "sr_016",
    category: "Sharing the Road",
    question: "You are stopped at a red light next to a large semi-truck that is signaling a right turn. You should:",
    options: [
      "Pull up as close as possible to the truck",
      "Stay well back, as the truck will swing wide to the left before making the right turn",
      "Try to squeeze past on the right side before they turn"
    ],
    correctAnswer: 1,
    explanation: "Never try to squeeze between a large truck and the curb when it is making a wide right turn. The truck may crush you."
  },
  {
    id: "sr_017",
    category: "Sharing the Road",
    question: "You are driving on a rural road and come up behind a person riding a horse. You should:",
    options: [
      "Honk to let them know you are passing",
      "Slow down and pass carefully, giving them plenty of space without honking",
      "Rev your engine to scare the horse off the road"
    ],
    correctAnswer: 1,
    explanation: "Horses can be startled by loud noises. Slow down and pass carefully without honking."
  },
  {
    id: "sr_018",
    category: "Sharing the Road",
    question: "You are driving on a country road and see a farm tractor ahead displaying a fluorescent orange triangle on the rear. This means:",
    options: [
      "The vehicle is carrying hazardous materials",
      "It is a slow-moving vehicle designed to travel at 25 mph or less",
      "The vehicle is broken down"
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
    question: "You are driving on a wet road, and the rear of your car starts to skid to the right. How should you correct the skid?",
    options: [
      "Slam on the brakes immediately",
      "Take your foot off the gas and steer to the right (the direction of the skid)",
      "Steer hard to the left to overcorrect"
    ],
    correctAnswer: 1,
    explanation: "In a skid, steer in the direction you want the front of the car to go. Do not brake hard."
  },
  {
    id: "em_002",
    category: "Emergencies",
    question: "You are driving at 65 mph when your front right tire suddenly blows out. What should you do first?",
    options: [
      "Brake hard and steer onto the shoulder",
      "Grip the steering wheel firmly, ease off the gas pedal, and keep the car going straight",
      "Quickly shift into neutral"
    ],
    correctAnswer: 1,
    explanation: "Hold the steering wheel firmly, gradually slow down, and steer to the side of the road. Do not slam the brakes."
  },
  {
    id: "em_003",
    category: "Emergencies",
    question: "You are driving down a steep hill and realize your brakes have failed. What is the best immediate action?",
    options: [
      "Pump the brake pedal rapidly to build pressure and downshift to a lower gear",
      "Turn off the engine to stop the wheels",
      "Pull the emergency brake as hard as possible"
    ],
    correctAnswer: 0,
    explanation: "Pump the brake pedal rapidly to build pressure. Downshift to lower gears. Use the parking brake gradually. Look for an escape route."
  },
  {
    id: "em_004",
    category: "Emergencies",
    question: "While driving on the freeway, your gas pedal suddenly sticks, and your car continues to accelerate. What should you do?",
    options: [
      "Turn off the ignition immediately and remove the key",
      "Shift the vehicle into neutral, apply the brakes firmly, and look for a safe place to pull over",
      "Reach down to try and unstick the pedal with your hand while steering"
    ],
    correctAnswer: 1,
    explanation: "Shift to neutral to disengage the engine from the wheels, apply brakes, and safely pull off the road."
  },
  {
    id: "em_005",
    category: "Emergencies",
    question: "Smoke starts pouring from under the hood of your car while driving. What is the safest response?",
    options: [
      "Drive quickly to the nearest gas station for help",
      "Pull over safely, turn off the engine, get everyone out of the car, and call 911",
      "Open the hood immediately to see what is burning"
    ],
    correctAnswer: 1,
    explanation: "Pull over safely, turn off the engine, move everyone away from the vehicle, and call 911."
  },
  {
    id: "em_006",
    category: "Emergencies",
    question: "Your car engine dies completely while driving in the middle lane of a busy freeway. What is the best course of action?",
    options: [
      "Stop right where you are and call for a tow truck",
      "Use your remaining momentum to pull completely onto the right shoulder, then turn on your hazard lights",
      "Get out of your car and try to wave traffic around you"
    ],
    correctAnswer: 1,
    explanation: "Pull completely off the road, turn on hazard lights, raise the hood if possible, and call for help."
  },
  {
    id: "em_007",
    category: "Emergencies",
    question: "You are involved in a collision at an intersection, and the other driver appears to be injured. What are your legal obligations?",
    options: [
      "You may leave the scene if it wasn't your fault",
      "Stop immediately, call 911, and provide reasonable assistance to the injured person",
      "Exchange insurance information and then drive away"
    ],
    correctAnswer: 1,
    explanation: "California law requires you to stop at the scene, call for help, give reasonable aid, and exchange information."
  },
  {
    id: "em_008",
    category: "Emergencies",
    question: "You accidentally back into an unoccupied parked car in a parking lot, denting the door. You cannot locate the owner. What must you do?",
    options: [
      "Leave immediately since no one was hurt",
      "Leave a secure note with your name, contact info, and a description of the accident, then notify police",
      "Wait by the car for at least 4 hours"
    ],
    correctAnswer: 1,
    explanation: "Leave a note with your name, phone number, address, and a description of what happened. Report the collision to police."
  },
  {
    id: "em_009",
    category: "Emergencies",
    question: "You are involved in a traffic accident resulting in $1,500 worth of property damage but no injuries. What form must you file with the DMV, and within how many days?",
    options: [
      "No form is required if there are no injuries",
      "An SR-1 form within 10 days",
      "A police report within 30 days"
    ],
    correctAnswer: 1,
    explanation: "You must file a report with the DMV (Form SR-1) within 10 days if anyone is injured/killed or property damage exceeds $1,000."
  },
  {
    id: "em_010",
    category: "Emergencies",
    question: "You witness a severe collision on the highway ahead of you. You are the first person on the scene. What should you do?",
    options: [
      "Keep driving to avoid getting involved",
      "Pull completely off the road safely, call 911, and offer help only if you are trained and it is safe to do so",
      "Run into the road to stop oncoming traffic"
    ],
    correctAnswer: 1,
    explanation: "Pull over safely if you can help. Call 911 and provide assistance if you are trained to do so."
  },
  {
    id: "em_011",
    category: "Emergencies",
    question: "Your car stalls directly on a set of railroad tracks, and you see a train approaching in the distance. What is the safest action?",
    options: [
      "Stay in the car and try to restart the engine",
      "Get out immediately and run at a 45-degree angle away from the tracks in the direction the train is coming from",
      "Get out and run straight down the tracks away from the train"
    ],
    correctAnswer: 1,
    explanation: "Get out of the vehicle immediately and run diagonally away from the tracks, toward the approaching train. This avoids being hit by flying debris."
  },
  {
    id: "em_012",
    category: "Emergencies",
    question: "You witness a multi-car collision with severe injuries on the freeway. What number should you dial for emergency services?",
    options: [
      "311",
      "911",
      "Your auto insurance provider"
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
    question: "You are preparing to take your driving test. The DMV examiner will check your vehicle to ensure it has working:",
    options: [
      "Air conditioning and a radio",
      "Brakes, headlights, taillights, turn signals, horn, mirrors, and windshield wipers",
      "Fog lights and a backup camera"
    ],
    correctAnswer: 1,
    explanation: "California law requires working brakes, lights (headlights, taillights, brake lights), signals, horn, mirrors, and wipers."
  },
  {
    id: "ve_002",
    category: "Vehicle Equipment",
    question: "You are adjusting your vehicle's mirrors before driving. California law requires your vehicle to have at least:",
    options: [
      "One rearview mirror",
      "Two mirrors (typically the inside rearview and left outside mirror)",
      "Three mirrors (inside, left, and right outside)"
    ],
    correctAnswer: 1,
    explanation: "California requires at least two mirrors — a rearview mirror and a left-side mirror — that provide a view of the highway at least 200 feet behind."
  },
  {
    id: "ve_003",
    category: "Vehicle Equipment",
    question: "You are traveling with your 18-month-old niece. By law, she must be secured in:",
    options: [
      "A forward-facing car seat",
      "A rear-facing car seat in the back seat",
      "A standard seatbelt if she sits in the back"
    ],
    correctAnswer: 1,
    explanation: "Children under 2 must ride in a rear-facing car seat in the back seat, unless they weigh 40+ lbs or are 40+ inches tall."
  },
  {
    id: "ve_004",
    category: "Vehicle Equipment",
    question: "You are driving your 6-year-old son to school. Under California law, he must be:",
    options: [
      "Allowed to sit in the front passenger seat",
      "Secured in a federally approved child passenger restraint system (car seat or booster) in the back seat",
      "Required only to wear a lap belt"
    ],
    correctAnswer: 1,
    explanation: "Children under 8 must be properly secured in a car seat or booster seat in the back seat."
  },
  {
    id: "ve_005",
    category: "Vehicle Equipment",
    question: "You want to tint the windows of your car to reduce heat. What is the legal requirement for the front side windows in California?",
    options: [
      "They can be as dark as you want",
      "They must allow at least 70% of light to pass through",
      "Tinting front windows is completely illegal"
    ],
    correctAnswer: 1,
    explanation: "Front side windows must allow at least 70% of light to pass through in California."
  },
  {
    id: "ve_006",
    category: "Vehicle Equipment",
    question: "You are driving with three friends in the car. Who is legally required to wear a seatbelt?",
    options: [
      "Only the driver",
      "Only passengers in the front seat",
      "The driver and all passengers"
    ],
    correctAnswer: 2,
    explanation: "California law requires all occupants of a vehicle to wear seatbelts, regardless of seating position."
  },
  {
    id: "ve_007",
    category: "Vehicle Equipment",
    question: "It is late afternoon and the sun is beginning to set. When does California law require you to turn on your headlights?",
    options: [
      "Only when it is completely dark",
      "30 minutes after sunset until 30 minutes before sunrise, or whenever visibility is less than 1,000 feet",
      "Only when driving on freeways"
    ],
    correctAnswer: 1,
    explanation: "Headlights are required from 30 minutes after sunset to 30 minutes before sunrise, and whenever you cannot see 1,000 feet ahead."
  },
  {
    id: "ve_008",
    category: "Vehicle Equipment",
    question: "You are registering a new vehicle in California. What is the minimum liability insurance coverage required?",
    options: [
      "$5,000 for property damage only",
      "$15,000 for a single injury/death, $30,000 for multiple injuries/deaths, and $5,000 for property damage",
      "$100,000 comprehensive coverage"
    ],
    correctAnswer: 1,
    explanation: "California's minimum liability insurance is 15/30/5: $15,000 per person injury, $30,000 per accident injury, $5,000 property damage."
  },
  {
    id: "ve_009",
    category: "Vehicle Equipment",
    question: "You want to listen to music from your phone while driving. Is it legal to wear headphones?",
    options: [
      "No, it is illegal to wear headphones or earplugs in both ears while driving",
      "Yes, as long as the volume is low",
      "Yes, but only on the highway"
    ],
    correctAnswer: 0,
    explanation: "It is illegal to wear headphones or earbuds covering both ears while driving. One earbud is allowed."
  },
  {
    id: "ve_010",
    category: "Vehicle Equipment",
    question: "You recently purchased a car. How often must you renew your California vehicle registration?",
    options: [
      "Every 5 years",
      "Every year",
      "Only when you sell the vehicle"
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
    question: "You are driving on a coastal highway early in the morning and encounter a thick patch of fog. You should turn on your:",
    options: [
      "High beam headlights to pierce through the fog",
      "Low beam headlights",
      "Parking lights only"
    ],
    correctAnswer: 1,
    explanation: "Use low beams in fog. High beams reflect off the fog and reduce visibility."
  },
  {
    id: "sc_002",
    category: "Special Driving Conditions",
    question: "It has been dry all summer, and it suddenly begins to rain lightly. When is the road surface most slippery?",
    options: [
      "After it has been raining steadily for several hours",
      "During the first few minutes of rain",
      "Only if the rain turns to sleet"
    ],
    correctAnswer: 1,
    explanation: "The road is most slippery during the first few minutes of rain because oil and dust on the surface mix with the water."
  },
  {
    id: "sc_003",
    category: "Special Driving Conditions",
    question: "You are driving at night on a dark country road using your high beams. A car approaches from the opposite direction. When must you dim your lights?",
    options: [
      "When the approaching vehicle flashes their high beams at you",
      "When you are within 500 feet of the approaching vehicle",
      "Only when you are within 100 feet"
    ],
    correctAnswer: 1,
    explanation: "Dim your high beams when within 500 feet of an oncoming vehicle or 300 feet when following another vehicle."
  },
  {
    id: "sc_004",
    category: "Special Driving Conditions",
    question: "You are driving in heavy rain on the freeway. To maintain traction and avoid hydroplaning, you should:",
    options: [
      "Drive in the tire tracks of the vehicle ahead of you",
      "Drive faster to quickly clear water from your tires",
      "Drive in the far left lane where water pools least"
    ],
    correctAnswer: 0,
    explanation: "In rain, drive in the tire tracks of the vehicle ahead (where water has been displaced). Increase following distance."
  },
  {
    id: "sc_005",
    category: "Special Driving Conditions",
    question: "You are driving at night and suddenly see a deer standing in your lane ahead. What is the safest response?",
    options: [
      "Swerve sharply into the oncoming lane to go around it",
      "Slow down and stop if safe, maintaining a straight line — do not swerve",
      "Speed up to try and clear the area before the deer moves"
    ],
    correctAnswer: 1,
    explanation: "Slow down and stop if safe. Do not swerve — you could lose control of your vehicle or hit another car."
  },
  {
    id: "sc_006",
    category: "Special Driving Conditions",
    question: "During a severe storm, you come across a section of road that is flooded with deep water. You should:",
    options: [
      "Speed up to maintain momentum through the water",
      "Drive very slowly through the water, then test your brakes lightly once clear",
      "Drive on the wrong side of the road if the water looks shallower"
    ],
    correctAnswer: 1,
    explanation: "If you must go through water, drive slowly and test your brakes afterward. If it looks too deep, find an alternate route."
  },
  {
    id: "sc_007",
    category: "Special Driving Conditions",
    question: "You are driving on a narrow, winding mountain road where you cannot see at least 200 feet ahead. You should:",
    options: [
      "Use cruise control to maintain a steady speed",
      "Keep to the right edge of your lane and sound your horn",
      "Drive in the center of the road to avoid edge drop-offs"
    ],
    correctAnswer: 1,
    explanation: "On mountain roads, stay right on curves, use a lower gear going downhill, and honk on blind curves."
  },
  {
    id: "sc_008",
    category: "Special Driving Conditions",
    question: "You are driving uphill on a single-lane mountain road and meet another car coming downhill. There is no room to pass. Who has the right-of-way?",
    options: [
      "The vehicle facing uphill has the right-of-way",
      "The vehicle facing downhill has the right-of-way",
      "Whoever honks first has the right-of-way"
    ],
    correctAnswer: 0,
    explanation: "The vehicle going downhill must yield and back up because the uphill vehicle has less control."
  },
  {
    id: "sc_009",
    category: "Special Driving Conditions",
    question: "You are driving on a freeway where the speed limit is 65 mph. It starts to rain heavily. By how much should you generally reduce your speed?",
    options: [
      "By about 5 mph",
      "By about one-third",
      "By half"
    ],
    correctAnswer: 1,
    explanation: "On wet roads, reduce your speed by about one-third. On packed snow, reduce by half. On ice, slow to a crawl."
  },
  {
    id: "sc_010",
    category: "Special Driving Conditions",
    question: "You are driving in dense fog and visibility is near zero. What is the safest course of action?",
    options: [
      "Pull completely off the road, turn off your lights, and keep your foot off the brake pedal until it clears",
      "Turn on your hazard lights and continue driving slowly",
      "Keep driving with your high beams on"
    ],
    correctAnswer: 0,
    explanation: "If fog is too thick to safely drive, pull completely off the road and wait until conditions improve."
  },
  {
    id: "sc_011",
    category: "Special Driving Conditions",
    question: "You are approaching a highway construction zone where orange cones force traffic into a single lane. You should:",
    options: [
      "Maintain the posted construction speed limit and watch for workers",
      "Speed up to get through the zone as quickly as possible",
      "Follow closely behind the vehicle ahead to discourage others from cutting in"
    ],
    correctAnswer: 0,
    explanation: "Obey posted speed limits in work zones, watch for workers and equipment, and be prepared to stop."
  },
  {
    id: "sc_012",
    category: "Special Driving Conditions",
    question: "You are planning a winter trip to the mountains. When are you legally required to use tire chains?",
    options: [
      "Whenever it is raining",
      "Whenever there is snow or ice on the road and chain controls are posted",
      "Only when the temperature drops below freezing"
    ],
    correctAnswer: 1,
    explanation: "Chains may be required during winter conditions. Check Caltrans for chain control information."
  },
  {
    id: "sc_013",
    category: "Special Driving Conditions",
    question: "You are driving at night and the approaching vehicle forgets to dim their high beams, blinding you. Where should you look to avoid the glare?",
    options: [
      "Flash your high beams rapidly to get their attention",
      "Look toward the right edge of your lane",
      "Close your eyes briefly until they pass"
    ],
    correctAnswer: 1,
    explanation: "Look toward the right edge of your lane to guide your steering until the oncoming vehicle passes."
  },
  {
    id: "sc_014",
    category: "Special Driving Conditions",
    question: "It is a clear, dry day, but you are approaching an area shaded by trees where the temperature is dropping. What driving hazard should you anticipate in winter?",
    options: [
      "Black ice hiding on the roadway",
      "Deep puddles of water",
      "Loose gravel"
    ],
    correctAnswer: 0,
    explanation: "Shaded areas can hide black ice, a thin layer of ice that is nearly invisible and extremely slippery."
  },
  {
    id: "sc_015",
    category: "Special Driving Conditions",
    question: "You are driving a light, high-profile SUV across a bridge on a very windy day. What is the primary hazard you should anticipate?",
    options: [
      "Reduced visibility due to dust",
      "Strong crosswinds pushing your vehicle out of its lane",
      "Overheating engine"
    ],
    correctAnswer: 1,
    explanation: "High-profile vehicles like trucks, RVs, and SUVs are highly vulnerable to strong crosswinds."
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
