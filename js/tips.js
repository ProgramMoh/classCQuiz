// Tips — California driving rules and DMV test preparation

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
      <h1 class="page-title">Things to Know</h1>
      <p class="page-subtitle">California rules and numbers you'll be tested on</p>

      <div class="tip-section card">
        <div class="tip-section-title">Rules That Are Easy to Miss</div>
        <div class="tip-item">
          <div class="tip-text"><strong>Right turn on red</strong> — You can turn right at a red light after a full stop, unless a sign says "No Turn on Red." You must yield to pedestrians and cross traffic.</div>
        </div>
        <div class="tip-item">
          <div class="tip-text"><strong>School bus stops</strong> — When a school bus has red lights flashing and the stop arm out, you must stop from both directions. The only exception is if you're separated by a physical median or barrier. Fines are severe.</div>
        </div>
        <div class="tip-item">
          <div class="tip-text"><strong>Curb colors</strong> — Red: no stopping ever. Yellow: loading/unloading only. Green: limited time parking (check sign for duration). Blue: disabled placard only. White: passenger pickup/drop-off, driver stays with car.</div>
        </div>
        <div class="tip-item">
          <div class="tip-text"><strong>Hill parking</strong> — Downhill with curb: turn wheels toward curb. Uphill with curb: turn wheels away from curb. No curb at all: turn wheels toward the shoulder (right). This comes up on almost every test.</div>
        </div>
        <div class="tip-item">
          <div class="tip-text"><strong>Hands-free phones only</strong> — Holding your phone while driving is illegal for all drivers, not just minors. Even swiping or tapping your phone screen can get you a ticket.</div>
        </div>
        <div class="tip-item">
          <div class="tip-text"><strong>Carpool / HOV lanes</strong> — Marked with a diamond. Require 2+ occupants during posted hours. Violations are $400+. Some clean-air vehicles with proper stickers can use them solo.</div>
        </div>
        <div class="tip-item">
          <div class="tip-text"><strong>Pedestrian right-of-way</strong> — Every intersection is a legal crosswalk, even without painted lines. You must always yield to pedestrians.</div>
        </div>
        <div class="tip-item">
          <div class="tip-text"><strong>3-foot rule for cyclists</strong> — When passing a bicycle, you must leave at least 3 feet of space between your car and the cyclist.</div>
        </div>
        <div class="tip-item">
          <div class="tip-text"><strong>Move Over law</strong> — When you see a stopped emergency vehicle, tow truck, or Caltrans vehicle with flashing lights, change lanes away from them. If you can't change lanes, slow down.</div>
        </div>
        <div class="tip-item">
          <div class="tip-text"><strong>Lane splitting</strong> — California is the only US state where motorcycles can legally split lanes. Check mirrors frequently — they may appear between lanes.</div>
        </div>
        <div class="tip-item">
          <div class="tip-text"><strong>Headphones</strong> — Illegal to wear headphones or earbuds covering both ears while driving. One earbud is okay.</div>
        </div>
        <div class="tip-item">
          <div class="tip-text"><strong>Implied consent</strong> — By driving in California, you've already agreed to take a chemical test (breath, blood, or urine) if arrested for DUI. Refusing = automatic 1-year license suspension.</div>
        </div>
      </div>

      <div class="tip-section card">
        <div class="tip-section-title">Numbers to Memorize</div>
        <table class="comparison-table">
          <thead>
            <tr>
              <th style="width:65%">Rule</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Residential speed limit</td><td>25 mph</td></tr>
            <tr><td>School zone (children present)</td><td>25 mph</td></tr>
            <tr><td>Alley speed limit</td><td>15 mph</td></tr>
            <tr><td>Blind intersection</td><td>15 mph</td></tr>
            <tr><td>Most highways</td><td>65 mph</td></tr>
            <tr><td>Some posted freeways</td><td>70 mph</td></tr>
            <tr><td>Towing on freeway</td><td>55 mph</td></tr>
            <tr><td>Following distance</td><td>3 seconds</td></tr>
            <tr><td>Parallel park from curb</td><td>18 inches max</td></tr>
            <tr><td>Distance from fire hydrant</td><td>15 feet min</td></tr>
            <tr><td>Distance from railroad tracks</td><td>7.5 feet min</td></tr>
            <tr><td>BAC limit (21+)</td><td>0.08%</td></tr>
            <tr><td>BAC limit (under 21)</td><td>0.01%</td></tr>
            <tr><td>BAC limit (commercial)</td><td>0.04%</td></tr>
            <tr><td>Dim high beams (oncoming)</td><td>500 feet</td></tr>
            <tr><td>Dim high beams (following)</td><td>300 feet</td></tr>
            <tr><td>Headlights on/off</td><td>30 min after sunset / 30 min before sunrise</td></tr>
            <tr><td>Report collision to DMV</td><td>10 days (if injury or $1,000+ damage)</td></tr>
            <tr><td>Min liability insurance</td><td>$15K / $30K / $5K</td></tr>
            <tr><td>Passing a bicycle</td><td>3 feet clearance</td></tr>
            <tr><td>Window tint (front sides)</td><td>Must allow 70% light</td></tr>
          </tbody>
        </table>
      </div>

      <div class="tip-section card">
        <div class="tip-section-title">Child Seat Rules</div>
        <div class="tip-item">
          <div class="tip-text"><strong>Under 2 years old</strong> — Must be in a rear-facing car seat in the back seat (unless the child weighs 40+ lbs or is 40+ inches tall).</div>
        </div>
        <div class="tip-item">
          <div class="tip-text"><strong>Under 8 years old</strong> — Must be secured in a car seat or booster seat in the back seat.</div>
        </div>
        <div class="tip-item">
          <div class="tip-text"><strong>All passengers</strong> — Seatbelts required for everyone in the vehicle, regardless of seating position.</div>
        </div>
      </div>

      <div class="tip-section card">
        <div class="tip-section-title">On Test Day</div>
        <div class="tip-item">
          <div class="tip-text"><strong>Format</strong> — 46 multiple-choice questions. You need 38 correct (83%) to pass. You get 3 attempts. If you fail, wait at least 7 days before retaking.</div>
        </div>
        <div class="tip-item">
          <div class="tip-text"><strong>What to bring</strong> — Proof of identity (passport), Social Security number, and proof of California residency (utility bill, bank statement, lease, etc.).</div>
        </div>
        <div class="tip-item">
          <div class="tip-text"><strong>Appointment</strong> — Book ahead at dmv.ca.gov. Walk-ins are possible but lines can be very long.</div>
        </div>
        <div class="tip-item">
          <div class="tip-text"><strong>No tricks</strong> — The DMV says their questions are straightforward. There's always one clearly correct answer. Don't overthink it.</div>
        </div>
        <div class="tip-item">
          <div class="tip-text"><strong>Official handbook</strong> — All questions come from the <a href="https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/" target="_blank" rel="noopener">California Driver Handbook</a>. It's free online.</div>
        </div>
      </div>
    `;
  }
};
