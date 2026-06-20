// Tips — UAE to California driving transition tips

const Tips = {
  initialized: false,

  init() {
    if (this.initialized) return;
    this.initialized = true;
    this.render();
  },

  render() {
    const page = document.getElementById('page-tips');

    page.innerHTML = `
      <h1 class="page-title">Driving Tips</h1>
      <p class="page-subtitle">What you need to know coming from the UAE to California</p>

      <div class="tip-section card">
        <div class="tip-section-title">🔄 Key Differences: UAE vs California</div>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Topic</th>
              <th>UAE</th>
              <th>California</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Right on Red</strong></td>
              <td>Not allowed</td>
              <td>Allowed after full stop (unless posted otherwise)</td>
            </tr>
            <tr>
              <td><strong>Speed Units</strong></td>
              <td>km/h</td>
              <td>mph (1 mile ≈ 1.6 km)</td>
            </tr>
            <tr>
              <td><strong>Speed Enforcement</strong></td>
              <td>Mostly radar cameras</td>
              <td>Police patrol, aircraft, and cameras</td>
            </tr>
            <tr>
              <td><strong>School Buses</strong></td>
              <td>No special stop rules</td>
              <td>Must stop in both directions when red lights flash</td>
            </tr>
            <tr>
              <td><strong>Horn Usage</strong></td>
              <td>Common for communication</td>
              <td>Only for safety warnings — not for frustration</td>
            </tr>
            <tr>
              <td><strong>BAC Limit</strong></td>
              <td>Zero tolerance (0.00%)</td>
              <td>0.08% (21+), 0.01% (under 21)</td>
            </tr>
            <tr>
              <td><strong>Gas Stations</strong></td>
              <td>Full-service attendants</td>
              <td>Self-service (you pump your own)</td>
            </tr>
            <tr>
              <td><strong>Pedestrian Crossings</strong></td>
              <td>Vary by emirate</td>
              <td>Every intersection is a legal crosswalk</td>
            </tr>
            <tr>
              <td><strong>Carpool/HOV Lanes</strong></td>
              <td>Not common</td>
              <td>Widely used — 2+ passengers required</td>
            </tr>
            <tr>
              <td><strong>Headlight Flashing</strong></td>
              <td>Used to request passing</td>
              <td>Considered aggressive; avoid it</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="tip-section card">
        <div class="tip-section-title">⚠️ Rules That Catch UAE Drivers Off Guard</div>
        <div class="tip-item">
          <span class="tip-icon">🚌</span>
          <div class="tip-text"><strong>School bus stops are law.</strong> When a school bus has its red lights flashing and stop sign extended, you MUST stop from both directions. The fine is huge. There is no equivalent in the UAE.</div>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🔴</span>
          <div class="tip-text"><strong>Right turn on red is allowed.</strong> After coming to a complete stop, you can turn right on red unless a sign says otherwise. This doesn't exist in the UAE.</div>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🎨</span>
          <div class="tip-text"><strong>Curb colors matter.</strong> Red = no stopping. Yellow = loading only. Green = short-term. Blue = disabled. White = passenger drop-off. Memorize these.</div>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🏔️</span>
          <div class="tip-text"><strong>Hill parking rules.</strong> You must turn your wheels when parking on hills — toward the curb going downhill, away from the curb going uphill. This is tested heavily.</div>
        </div>
        <div class="tip-item">
          <span class="tip-icon">📱</span>
          <div class="tip-text"><strong>Hands-free only.</strong> Holding your phone while driving is illegal for ALL drivers. Use Bluetooth or a mount. Even touching your phone is risky.</div>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🚗</span>
          <div class="tip-text"><strong>Carpool lanes (HOV).</strong> Diamond-marked lanes require 2+ passengers during posted hours. Fines for violations are $400+.</div>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🚶</span>
          <div class="tip-text"><strong>Pedestrians always have right-of-way.</strong> Every intersection has a legal crosswalk even without painted lines. Always yield to pedestrians.</div>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🚲</span>
          <div class="tip-text"><strong>3-foot rule for bicycles.</strong> You must give cyclists at least 3 feet of space when passing. Bikes are much more common on roads here.</div>
        </div>
      </div>

      <div class="tip-section card">
        <div class="tip-section-title">📝 DMV Test Day Tips</div>
        <div class="tip-item">
          <span class="tip-icon">📖</span>
          <div class="tip-text"><strong>Read the CA Driver Handbook.</strong> All test questions come directly from the official handbook. It's available free at <a href="https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/" target="_blank" rel="noopener">dmv.ca.gov</a>.</div>
        </div>
        <div class="tip-item">
          <span class="tip-icon">📋</span>
          <div class="tip-text"><strong>46 questions, need 38 right (83%).</strong> You get 3 chances to pass. If you fail, you must wait at least 7 days before retaking.</div>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🪪</span>
          <div class="tip-text"><strong>Bring proper ID.</strong> You'll need proof of identity (passport), Social Security number, and proof of California residency (utility bill, bank statement, etc.).</div>
        </div>
        <div class="tip-item">
          <span class="tip-icon">⏰</span>
          <div class="tip-text"><strong>Go early.</strong> DMV offices get very busy. Go right when they open or book an appointment online at dmv.ca.gov.</div>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🧠</span>
          <div class="tip-text"><strong>No trick questions.</strong> The DMV says their questions are straightforward. One answer is always clearly correct. Trust your preparation.</div>
        </div>
        <div class="tip-item">
          <span class="tip-icon">💡</span>
          <div class="tip-text"><strong>Focus on numbers.</strong> Speed limits (25 residential, 15 alley/blind intersection, 65 highway), distances (15 ft from hydrant, 18 inches from curb), and BAC limits (0.08%) are commonly tested.</div>
        </div>
      </div>

      <div class="tip-section card">
        <div class="tip-section-title">🔢 Key Numbers to Memorize</div>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Rule</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Residential speed limit</td><td><strong>25 mph</strong></td></tr>
            <tr><td>School zone speed limit</td><td><strong>25 mph</strong> (when children present)</td></tr>
            <tr><td>Alley speed limit</td><td><strong>15 mph</strong></td></tr>
            <tr><td>Blind intersection speed limit</td><td><strong>15 mph</strong></td></tr>
            <tr><td>Highway speed limit</td><td><strong>65 mph</strong> (unless posted otherwise)</td></tr>
            <tr><td>Maximum on some freeways</td><td><strong>70 mph</strong> (posted)</td></tr>
            <tr><td>Towing speed limit</td><td><strong>55 mph</strong></td></tr>
            <tr><td>Following distance</td><td><strong>3 seconds</strong> minimum</td></tr>
            <tr><td>Park from curb</td><td>Within <strong>18 inches</strong></td></tr>
            <tr><td>Park from fire hydrant</td><td>At least <strong>15 feet</strong></td></tr>
            <tr><td>Park from railroad tracks</td><td>At least <strong>7.5 feet</strong></td></tr>
            <tr><td>BAC limit (21+)</td><td><strong>0.08%</strong></td></tr>
            <tr><td>BAC limit (under 21)</td><td><strong>0.01%</strong></td></tr>
            <tr><td>BAC limit (commercial)</td><td><strong>0.04%</strong></td></tr>
            <tr><td>Dim high beams distance (oncoming)</td><td><strong>500 feet</strong></td></tr>
            <tr><td>Dim high beams distance (following)</td><td><strong>300 feet</strong></td></tr>
            <tr><td>Headlights required</td><td><strong>30 min</strong> after sunset to <strong>30 min</strong> before sunrise</td></tr>
            <tr><td>Report collision to DMV within</td><td><strong>10 days</strong> (if injury/death or $1,000+ damage)</td></tr>
            <tr><td>Min insurance (15/30/5)</td><td>$15K person / $30K accident / $5K property</td></tr>
            <tr><td>Bicycle passing clearance</td><td>At least <strong>3 feet</strong></td></tr>
          </tbody>
        </table>
      </div>

      <div class="tip-section card">
        <div class="tip-section-title">🏗️ California-Specific Rules</div>
        <div class="tip-item">
          <span class="tip-icon">💎</span>
          <div class="tip-text"><strong>Move Over law.</strong> Change lanes or slow down when passing stopped emergency vehicles, tow trucks, or Caltrans vehicles with flashing lights.</div>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🏍️</span>
          <div class="tip-text"><strong>Lane splitting is legal.</strong> California is the only U.S. state where motorcycles can legally lane-split. Be aware and check mirrors frequently.</div>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🌉</span>
          <div class="tip-text"><strong>FasTrak tolls.</strong> Many bridges and express lanes use electronic tolling. Get a FasTrak transponder to avoid violation notices.</div>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🔗</span>
          <div class="tip-text"><strong>Chains in mountains.</strong> Winter driving in the Sierra Nevada may require tire chains. Check Caltrans chain control status before mountain trips.</div>
        </div>
        <div class="tip-item">
          <span class="tip-icon">👶</span>
          <div class="tip-text"><strong>Child seat laws.</strong> Under 2: rear-facing. Under 8: car seat or booster in the back seat. All children under 8 must ride in the back.</div>
        </div>
      </div>
    `;
  }
};
