import React, { useState } from 'react';
import GoogleAd from '../components/GoogleAd';
import './NumerologyCalculator.css';

interface NumerologyCalculatorProps {
  onBack: () => void;
}

type NumerologySystem = 'pythagorean' | 'chaldean' | 'kabbalah';

const NumerologyCalculator: React.FC<NumerologyCalculatorProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'birthDate' | 'name'>('birthDate');
  const [numerologySystem, setNumerologySystem] = useState<NumerologySystem>('pythagorean');
  const [birthDate, setBirthDate] = useState('');
  const [name, setName] = useState('');
  const [result, setResult] = useState<{
    number: number;
    meaning: string;
    traits: string[];
    systemName: string;
  } | null>(null);

  // Friendly Numbers Table
  const friendlyNumbers = [
    { number: 1, bestFriends: '1, 2, 9, 3', friends: '1, 2, 3, 4, 7, 9', enemies: '6, 8', neutral: '5' },
    { number: 2, bestFriends: '2, 1, 5', friends: '2, 1, 4, 5, 7', enemies: '', neutral: '3, 6, 8, 9' },
    { number: 3, bestFriends: '3, 1, 2, 9', friends: '3, 1, 2, 4, 7, 9', enemies: '5, 6', neutral: '8' },
    { number: 4, bestFriends: '1, 5', friends: '4, 1, 2, 3, 7, 9', enemies: '6, 8', neutral: '5' },
    { number: 5, bestFriends: '5, 1, 6', friends: '5, 1, 4, 6', enemies: '2, 7', neutral: '3, 8, 9' },
    { number: 6, bestFriends: '6, 5', friends: '6, 5, 8', enemies: '1, 2, 4, 7', neutral: '3, 9' },
    { number: 7, bestFriends: '1, 6, 2', friends: '7, 1, 2, 4, 5', enemies: '', neutral: '3, 6, 8, 9' },
    { number: 8, bestFriends: '5, 6', friends: '8, 5, 6', enemies: '1, 2, 4, 7, 9', neutral: '3' },
    { number: 9, bestFriends: '9, 1, 2, 3', friends: '9, 1, 2, 3, 4, 7', enemies: '5', neutral: '6, 8' },
  ];

  const getPositionValues = (system: NumerologySystem): number[] => {
    const positionMaps: { [key in NumerologySystem]: number[] } = {
      pythagorean: [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,9,0],
      chaldean: [1,2,3,4,5,8,3,5,1,1,2,3,4,5,7,8,1,2,3,4,6,6,6,5,1,7,1,2,3,4,5,6,7,8,9,0],
      kabbalah: [21,2,3,4,5,7,8,9,10,11,3,12,13,14,15,16,3,17,18,19,19,1,1,6,0,18,1,2,3,4,5,6,7,8,9,0],
    };
    return positionMaps[system];
  };

  const getSystemName = (system: NumerologySystem): string => {
    const names: { [key in NumerologySystem]: string } = {
      pythagorean: 'Pythagorean (Modern/Western)',
      chaldean: 'Chaldean (Ancient Babylon/Vedic)',
      kabbalah: 'Kabbalah (Hebrew - Experimental)',
    };
    return names[system];
  };

  const calculateFromDate = (date: string) => {
    if (!date) return;
    const parts = date.split('-');
    const day = parseInt(parts[2]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[0]);

    const sum = day + month + year;
    const lifePath = reduceToSingleDigit(sum);
    const meanings = getLifePathMeaning(lifePath);
    setResult({
      number: lifePath,
      meaning: meanings.meaning,
      traits: meanings.traits,
      systemName: getSystemName(numerologySystem),
    });
  };

  const calculatePersonalityNumber = (date: string) => {
    if (!date) return;
    const parts = date.split('-');
    const day = parseInt(parts[2]);
    
    const personality = reduceToSingleDigit(day);
    const meanings = getPersonalityMeaning(personality);
    setResult({
      number: personality,
      meaning: meanings.meaning,
      traits: meanings.traits,
      systemName: getSystemName(numerologySystem),
    });
  };

  const calculateFromName = (fullName: string) => {
    if (!fullName.trim()) return;

    const positionValues = getPositionValues(numerologySystem);
    let sum = 0;
    
    fullName.toLowerCase().split('').forEach((char) => {
      const charCode = char.charCodeAt(0);
      // A-Z: 65-90, a-z: 97-122
      if (charCode >= 97 && charCode <= 122) {
        const position = charCode - 97; // 0-25 for a-z
        sum += positionValues[position];
      } else if (charCode >= 48 && charCode <= 57) {
        // Digits 0-9: 48-57
        const position = 26 + (charCode - 48); // 26-35 for 0-9
        sum += positionValues[position];
      }
    });

    const destiny = reduceToSingleDigit(sum);
    const meanings = getDestinyMeaning(destiny);
    setResult({
      number: destiny,
      meaning: meanings.meaning,
      traits: meanings.traits,
      systemName: getSystemName(numerologySystem),
    });
  };

  const reduceToSingleDigit = (num: number): number => {
    if (num < 10) return num;
    const digits = num.toString().split('').map(Number);
    return reduceToSingleDigit(digits.reduce((a, b) => a + b, 0));
  };

  const getLifePathMeaning = (num: number) => {
    const meanings: { [key: number]: { meaning: string; traits: string[] } } = {
      1: {
        meaning: 'The Leader - Independent, Ambitious, and Pioneering',
        traits: ['Leadership', 'Independence', 'Determination', 'Ambition', 'Originality', 'Courage'],
      },
      2: {
        meaning: 'The Peacemaker - Diplomatic, Cooperative, and Sensitive',
        traits: ['Diplomacy', 'Cooperation', 'Sensitivity', 'Adaptability', 'Partnership', 'Intuition'],
      },
      3: {
        meaning: 'The Communicator - Creative, Expressive, and Optimistic',
        traits: ['Creativity', 'Communication', 'Optimism', 'Expression', 'Sociability', 'Enthusiasm'],
      },
      4: {
        meaning: 'The Builder - Practical, Reliable, and Systematic',
        traits: ['Practicality', 'Reliability', 'Organization', 'Discipline', 'Stability', 'Hard Work'],
      },
      5: {
        meaning: 'The Adventurer - Curious, Dynamic, and Freedom-Loving',
        traits: ['Adventure', 'Curiosity', 'Dynamism', 'Flexibility', 'Variety', 'Freedom'],
      },
      6: {
        meaning: 'The Nurturer - Responsible, Compassionate, and Caring',
        traits: ['Responsibility', 'Compassion', 'Caring', 'Harmony', 'Loyalty', 'Service'],
      },
      7: {
        meaning: 'The Seeker - Analytical, Spiritual, and Intellectual',
        traits: ['Analysis', 'Spirituality', 'Wisdom', 'Intuition', 'Introspection', 'Mystery'],
      },
      8: {
        meaning: 'The Achiever - Ambitious, Powerful, and Business-Minded',
        traits: ['Ambition', 'Power', 'Business', 'Material Success', 'Authority', 'Strength'],
      },
      9: {
        meaning: 'The Humanitarian - Compassionate, Universal, and Idealistic',
        traits: ['Compassion', 'Universality', 'Idealism', 'Tolerance', 'Wisdom', 'Humanity'],
      },
    };
    return meanings[num] || { meaning: 'Unknown', traits: [] };
  };

  const getDestinyMeaning = (num: number) => {
    const meanings: { [key: number]: { meaning: string; traits: string[] } } = {
      1: {
        meaning: 'Expression Number 1 - Self-Reliant and Independent',
        traits: ['Initiative', 'Leadership', 'Independence', 'Confidence', 'Determination'],
      },
      2: {
        meaning: 'Expression Number 2 - Cooperative and Sensitive',
        traits: ['Diplomacy', 'Sensitivity', 'Cooperation', 'Balance', 'Harmony'],
      },
      3: {
        meaning: 'Expression Number 3 - Creative and Social',
        traits: ['Creativity', 'Social Skills', 'Communication', 'Optimism', 'Joy'],
      },
      4: {
        meaning: 'Expression Number 4 - Practical and Grounded',
        traits: ['Stability', 'Practicality', 'Responsibility', 'Structure', 'Security'],
      },
      5: {
        meaning: 'Expression Number 5 - Versatile and Dynamic',
        traits: ['Adaptability', 'Versatility', 'Energy', 'Communication', 'Adventure'],
      },
      6: {
        meaning: 'Expression Number 6 - Nurturing and Responsible',
        traits: ['Nurturing', 'Responsibility', 'Compassion', 'Service', 'Harmony'],
      },
      7: {
        meaning: 'Expression Number 7 - Introspective and Wise',
        traits: ['Wisdom', 'Analysis', 'Spirituality', 'Depth', 'Understanding'],
      },
      8: {
        meaning: 'Expression Number 8 - Ambitious and Powerful',
        traits: ['Ambition', 'Power', 'Success', 'Leadership', 'Executive Ability'],
      },
      9: {
        meaning: 'Expression Number 9 - Compassionate and Idealistic',
        traits: ['Compassion', 'Idealism', 'Humanity', 'Wisdom', 'Tolerance'],
      },
    };
    return meanings[num] || { meaning: 'Unknown', traits: [] };
  };

  const getPersonalityMeaning = (num: number) => {
    const meanings: { [key: number]: { meaning: string; traits: string[] } } = {
      1: {
        meaning: 'Personality Number 1 - Determined Trailblazer',
        traits: ['Ambitious', 'Natural Leader', 'Assertive', 'Independent', 'Pioneering Spirit'],
      },
      2: {
        meaning: 'Personality Number 2 - Gentle Diplomat',
        traits: ['Tactful', 'Cooperative', 'Sensitive', 'Peaceful', 'Team Player'],
      },
      3: {
        meaning: 'Personality Number 3 - Charismatic Communicator',
        traits: ['Expressive', 'Charming', 'Sociable', 'Optimistic', 'Entertaining'],
      },
      4: {
        meaning: 'Personality Number 4 - Reliable Organizer',
        traits: ['Practical', 'Dependable', 'Organized', 'Honest', 'Hardworking'],
      },
      5: {
        meaning: 'Personality Number 5 - Free-Spirited Adventurer',
        traits: ['Dynamic', 'Curious', 'Versatile', 'Adventurous', 'Energetic'],
      },
      6: {
        meaning: 'Personality Number 6 - Caring Nurture',
        traits: ['Responsible', 'Compassionate', 'Loving', 'Supportive', 'Harmonious'],
      },
      7: {
        meaning: 'Personality Number 7 - Mysterious Seeker',
        traits: ['Analytical', 'Spiritual', 'Introspective', 'Philosophical', 'Wise'],
      },
      8: {
        meaning: 'Personality Number 8 - Powerful Achiever',
        traits: ['Ambitious', 'Authoritative', 'Executive', 'Business-Minded', 'Commanding'],
      },
      9: {
        meaning: 'Personality Number 9 - Humanitarian Idealist',
        traits: ['Compassionate', 'Universal', 'Idealistic', 'Generous', 'Enlightened'],
      },
    };
    return meanings[num] || { meaning: 'Unknown', traits: [] };
  };

  return (
    <div className="numerology-container">
      <button className="back-button-numerology" onClick={onBack}>
        ← Back
      </button>

      <div className="numerology-content">
        <h1>🔢 Numerology Calculator</h1>
        <p className="numerology-subtitle">
          Discover the hidden meanings and patterns in numbers
        </p>

        {/* Two Column Layout */}
        <div className="numerology-layout">
          {/* Left Column - What is Numerology */}
          <div className="numerology-sidebar">
            <div className="sidebar-card">
              <h2>Welcome to Numerology 🌟</h2>
              <p>
                Numerology is an ancient belief system that assigns mystical significance to numbers 
                and their relationship to events and personality traits. It's a fascinating way to 
                explore patterns and discover deeper insights about yourself and others.
              </p>

              <h3>Numerology Numbers Explained</h3>
              <div className="numbers-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                  const meanings = getLifePathMeaning(num);
                  return (
                    <div key={num} className="number-box">
                      <div className="number-circle">{num}</div>
                      <h4>{meanings.meaning.split(' - ')[0]}</h4>
                      <p>{meanings.meaning.split(' - ')[1]}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Calculators */}
          <div className="numerology-calculator">
            {/* System Selector */}
            <div className="system-selector">
              <label>Choose Numerology System:</label>
              <div className="system-buttons">
                <button
                  className={`system-btn ${numerologySystem === 'pythagorean' ? 'active' : ''}`}
                  onClick={() => {
                    setNumerologySystem('pythagorean');
                    setResult(null);
                  }}
                >
                  Pythagorean
                </button>
                <button
                  className={`system-btn ${numerologySystem === 'chaldean' ? 'active' : ''}`}
                  onClick={() => {
                    setNumerologySystem('chaldean');
                    setResult(null);
                  }}
                >
                  Chaldean (Vedic)
                </button>
                <button
                  className={`system-btn ${numerologySystem === 'kabbalah' ? 'active' : ''}`}
                  onClick={() => {
                    setNumerologySystem('kabbalah');
                    setResult(null);
                  }}
                >
                  Kabbalah
                </button>
              </div>
              <p className="system-info">Current: Pythagorean (Modern/Western) | Chaldean (Ancient Babylon/Vedic) | Kabbalah (Hebrew - Experimental)</p>
            </div>

            <div className="numerology-tabs">
              <button
                className={`tab-button ${activeTab === 'birthDate' ? 'active' : ''}`}
                onClick={() => setActiveTab('birthDate')}
              >
                📅 Life Path & Personality
              </button>
              <button
                className={`tab-button ${activeTab === 'name' ? 'active' : ''}`}
                onClick={() => setActiveTab('name')}
              >
                ✍️ Destiny Number
              </button>
            </div>

            {activeTab === 'birthDate' && (
              <div className="tab-content calculator-tab">
                <div className="calculator-card">
                  <h2>Your Birth Date Numbers 📅</h2>
                  <p className="description">
                    Discover your Life Path Number and Personality Number from your birth date.
                  </p>

                  <div className="input-group">
                    <label htmlFor="birthDate">Enter Your Birth Date:</label>
                    <input
                      type="date"
                      id="birthDate"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="date-input"
                    />
                    <div className="button-group">
                      <button
                        className="calculate-button"
                        onClick={() => calculateFromDate(birthDate)}
                        disabled={!birthDate}
                      >
                        Life Path Number 🔮
                      </button>
                      <button
                        className="calculate-button alternate"
                        onClick={() => calculatePersonalityNumber(birthDate)}
                        disabled={!birthDate}
                      >
                        Personality Number 🔮
                      </button>
                    </div>
                  </div>

                  {result && (
                    <div className="result-card">
                      <div className="result-number">{result.number}</div>
                      <h3>{result.meaning}</h3>
                      <div className="traits">
                        <h4>Key Traits:</h4>
                        <div className="traits-list">
                          {result.traits.map((trait, idx) => (
                            <span key={idx} className="trait-badge">
                              ✨ {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'name' && (
              <div className="tab-content calculator-tab">
                <div className="calculator-card">
                  <h2>Calculate Your Destiny Number</h2>
                  <p className="description">
                    Your Destiny Number reveals your natural abilities, purpose, and potential.
                  </p>

                  <div className="input-group">
                    <label htmlFor="fullName">Enter Your Full Name:</label>
                    <input
                      type="text"
                      id="fullName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., John Smith"
                      className="text-input"
                    />
                    <button
                      className="calculate-button"
                      onClick={() => calculateFromName(name)}
                      disabled={!name.trim()}
                    >
                      Calculate 🔮
                    </button>
                  </div>

                  {result && (
                    <div className="result-card">
                      <div className="result-number">{result.number}</div>
                      <h3>{result.meaning}</h3>
                      <div className="traits">
                        <h4>Key Traits:</h4>
                        <div className="traits-list">
                          {result.traits.map((trait, idx) => (
                            <span key={idx} className="trait-badge">
                              ✨ {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Numerology Guide Section - Full Width Below */}
        <div className="numerology-guide-section">
          <h2 className="guide-title">📚 Complete Numerology Guide</h2>
          
          {/* Understanding Numerology Metaphor */}
          <div className="info-section">
            <h3>🌱 Understanding Numerology (The Plant Metaphor)</h3>
            <div className="info-content">
              <p><strong>Pyramid (Compound) Number</strong> is a root of plant.</p>
              <p><strong>Numerology Number</strong> is type of plant.</p>
              <p><strong>Pronology</strong> is a fruit of plant.</p>
              <p><strong>Astrology</strong> is like which type of plant is suitable for you.</p>
              <p className="highlight"><strong>Pronology</strong> - Study of sound vibrations in a name.</p>
            </div>
          </div>

          {/* Friendly Numbers Table */}
          <div className="info-section">
            <h3>🤝 Friendly Numbers & Harmonious Vibrations (Based on Astrology)</h3>
            <div className="friendly-numbers-table">
              <table>
                <thead>
                  <tr>
                    <th>Birthday Number</th>
                    <th>Best Friends or Harmonious</th>
                    <th>Friends</th>
                    <th>Enemies</th>
                    <th>Neutral</th>
                  </tr>
                </thead>
                <tbody>
                  {friendlyNumbers.map((row) => (
                    <tr key={row.number}>
                      <td>{row.number}</td>
                      <td>{row.bestFriends}</td>
                      <td>{row.friends}</td>
                      <td>{row.enemies || '-'}</td>
                      <td>{row.neutral}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Name Suggestion */}
          <div className="info-section">
            <h3>✍️ Name Suggestion & Selection</h3>
            <div className="info-content">
              <p>
                Instead of using "Initials. FirstName LastName" to calculate your name number, 
                I personally would suggest you to use <strong>"FirstName"</strong> for everything 
                (numerology name, known name, calling name, pet name, short name, full name, and signature).
              </p>
              <p>
                To have good benefits/results, out of your name - your numerology name, known name, 
                calling name, pet name, short name, full name, and signature <strong>all should be same</strong>.
              </p>
              <p>
                You are free to use the format "Initials. FirstName Lastname" in passports/visas/bank 
                accounts etc., (Since there are no other options...) - otherwise (stick to) I would 
                personally prefer just using "FirstName" for everything else and for numerology too.
              </p>
              <p className="highlight">
                <strong>Name Selection / Correction:</strong> If your Psychic or Birthday or Personality 
                Number is 1, Expression or Life Number should at least be one among 1, 2, 9, 3 (Best Friends). 
                Avoid 2, 4, and 8. If possible, Names have to be in harmonious vibration with both 
                Personality & Destiny (Life Path) numbers.
              </p>
            </div>
          </div>

          {/* Soul Types */}
          <div className="info-section">
            <h3>🌟 Soul Types Based on Birthday Number</h3>
            <div className="info-content">
              <p>
                According to planetary powers, your Psychic or Personality or Birthday number will 
                tell the soul type (not soul urge). If your number is 7, 8, or 9, then your soul 
                type is - <strong>Old Soul</strong>. Ex. Old Soul = An experienced being who is able 
                to get along with pretty much everyone.
              </p>
              <div className="soul-types-grid">
                <div className="soul-type-box">
                  <span className="soul-number">1</span>
                  <span className="soul-label">Young Soul</span>
                </div>
                <div className="soul-type-box">
                  <span className="soul-number">2</span>
                  <span className="soul-label">Baby Soul</span>
                </div>
                <div className="soul-type-box">
                  <span className="soul-number">3</span>
                  <span className="soul-label">Old Soul</span>
                </div>
                <div className="soul-type-box">
                  <span className="soul-number">4</span>
                  <span className="soul-label">Young Soul</span>
                </div>
                <div className="soul-type-box">
                  <span className="soul-number">5</span>
                  <span className="soul-label">Infant Soul</span>
                </div>
                <div className="soul-type-box">
                  <span className="soul-number">6</span>
                  <span className="soul-label">Young Soul</span>
                </div>
                <div className="soul-type-box">
                  <span className="soul-number">7</span>
                  <span className="soul-label">Old Soul</span>
                </div>
                <div className="soul-type-box">
                  <span className="soul-number">8</span>
                  <span className="soul-label">Old Soul</span>
                </div>
                <div className="soul-type-box">
                  <span className="soul-number">9</span>
                  <span className="soul-label">Old Soul</span>
                </div>
              </div>
            </div>
          </div>

          {/* Names Success Rate */}
          <div className="info-section">
            <h3>🅰️ Names That Start With Letters & Success Rate</h3>
            <div className="info-content">
              <div className="success-rate-box most-successful">
                <h4>Most Successful (100%)</h4>
                <p>A, B, C, E, H, J, K, L, M</p>
              </div>
              <div className="success-rate-box successful">
                <h4>Successful (90%)</h4>
                <p>N, R, T, V, Y, I</p>
              </div>
              <div className="success-rate-box least-successful">
                <h4>Least Successful (60%)</h4>
                <p>P, D, S, U, G, X, Z, O, W, F, Q</p>
              </div>
            </div>
          </div>

          {/* Grouping of Numbers */}
          <div className="info-section">
            <h3>🌊 Grouping of Numbers by Element</h3>
            <div className="info-content">
              <div className="group-box water-group">
                <h4>💧 Water Group - Emotional</h4>
                <p>1, 5, 7, 10, 14, 16, 19, 23, 25, 28</p>
              </div>
              <div className="group-box fire-group">
                <h4>🔥 Fire Group - Intellectual</h4>
                <p>2, 4, 8, 11, 13, 17, 20, 22, 26, 29, 31</p>
              </div>
              <div className="group-box air-group">
                <h4>💨 Air Group - Intuitional</h4>
                <p>3, 6, 9, 12, 15, 18, 21, 24, 27, 30</p>
              </div>
            </div>
          </div>

          {/* Lucky Numbers */}
          <div className="info-section">
            <h3>🍀 How to Find Your Lucky Numbers</h3>
            <div className="info-content">
              <p>Your lucky numbers are all of the following, you are free to use them as lucky numbers. 
              Most people use the 1st and 3rd from the below list:</p>
              <ol className="lucky-list">
                <li>Psychic or Birthday or Personality / Personal or Day Number</li>
                <li>Life Path or Destiny Number</li>
                <li>Expression or Life Number</li>
                <li>Soul Urge / Motivation Number</li>
              </ol>
            </div>
          </div>

          {/* Fundamental Aspects */}
          <div className="info-section">
            <h3>💎 Fundamental Aspects & Lucky Metals</h3>
            <div className="info-content">
              <p>Below is a list of traits, good and bad, associated with each number. 
              (Note: 11 and 22 are "master numbers." The qualities of 11 are like those of 2, 
              but amplified; the same goes for 22 and 4.)</p>
              <div className="aspects-grid">
                <div className="aspect-card">
                  <span className="aspect-num">1</span>
                  <p>Leadership, individuality, aggression, self-confidence, originality, impatience.</p>
                  <p className="metal">Wear: Gold</p>
                </div>
                <div className="aspect-card">
                  <span className="aspect-num">2</span>
                  <p>Balance, partnership, receptivity, collaboration, diplomacy, patience.</p>
                  <p className="metal">Wear: Silver</p>
                </div>
                <div className="aspect-card">
                  <span className="aspect-num">3</span>
                  <p>Self-expression, innovation, creativity, communication, activity.</p>
                  <p className="metal">Wear: Tin</p>
                </div>
                <div className="aspect-card">
                  <span className="aspect-num">4</span>
                  <p>Stability, dependability, discipline, dedication, over-cautious, stubborn.</p>
                  <p className="metal">Wear: Uranium (oh no, you can't)</p>
                </div>
                <div className="aspect-card">
                  <span className="aspect-num">5</span>
                  <p>Progressive, pioneering, innovation, adventure, rebellion, opportunist.</p>
                  <p className="metal">Wear: Quicksilver / Mercury (oh no, you can't)</p>
                </div>
                <div className="aspect-card">
                  <span className="aspect-num">6</span>
                  <p>Harmony, compassion, service, nurturing, self-righteous, chronic worrier.</p>
                  <p className="metal">Wear: Copper</p>
                </div>
                <div className="aspect-card">
                  <span className="aspect-num">7</span>
                  <p>Intelligence, intuition, spirituality, analytical, solitary, secretive.</p>
                  <p className="metal">Wear: Uranium (oh no, you can't)</p>
                </div>
                <div className="aspect-card">
                  <span className="aspect-num">8</span>
                  <p>Ambition, organization, practicality, successful, selfish, materialistic.</p>
                  <p className="metal">Wear: Lead</p>
                </div>
                <div className="aspect-card">
                  <span className="aspect-num">9</span>
                  <p>Generosity, passion, altruistic, resourceful, egotistical, fragile.</p>
                  <p className="metal">Wear: Iron</p>
                </div>
                <div className="aspect-card">
                  <span className="aspect-num">11</span>
                  <p>Visionary, idealistic, teacher, sensitive, perfectionist, aloof.</p>
                </div>
                <div className="aspect-card">
                  <span className="aspect-num">22</span>
                  <p>Master builder, honest, practical, peaceful, extreme, manipulative.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Days of Week */}
          <div className="info-section">
            <h3>📅 Numerological Numbers for Days of the Week</h3>
            <div className="info-content">
              <div className="days-grid">
                <div className="day-box"><strong>Sunday:</strong> 1, 4</div>
                <div className="day-box"><strong>Monday:</strong> 2, 7</div>
                <div className="day-box"><strong>Tuesday:</strong> 9</div>
                <div className="day-box"><strong>Wednesday:</strong> 5</div>
                <div className="day-box"><strong>Thursday:</strong> 3</div>
                <div className="day-box"><strong>Friday:</strong> 6</div>
                <div className="day-box"><strong>Saturday:</strong> 8</div>
              </div>
            </div>
          </div>

          {/* Marriage Info */}
          <div className="info-section">
            <h3>💍 Marriage/Partnership/Business Numbers</h3>
            <div className="info-content warning-box">
              <p>
                <strong>Important:</strong> As per numerology, no one should get married on a day 
                ruled by <strong>5, 7, or 8</strong> as its day number or compound number.
              </p>
            </div>
          </div>

          {/* Numerology System Overview */}
          <div className="info-section">
            <h3>📜 Understanding Numerology Systems</h3>
            <div className="info-content">
              <p>
                According to traditional practice, Indians commonly use <strong>Chaldean (Ancient Babylon, i.e., Iraq)</strong> 
                or <strong>Vedic Numerology</strong> systems. However, it's your personal belief or choice to select a numerology system.
              </p>
              <p className="warning-text">
                <strong>General Guidance:</strong> It's generally advisable to avoid numbers <strong>2, 4, and 8</strong>. 
                These numbers are only beneficial for very few people.
              </p>
            </div>
          </div>

          {/* Alphabet Value Tables */}
          <div className="info-section">
            <h3>🔤 Alphabet Numerology Values</h3>
            <div className="info-content">
              <div className="alphabet-tables">
                <h4>Pythagorean Values</h4>
                <div className="alphabet-grid">
                  <div className="alphabet-row">
                    <span>a=1</span><span>b=2</span><span>c=3</span><span>d=4</span><span>e=5</span>
                    <span>f=6</span><span>g=7</span><span>h=8</span><span>i=9</span>
                  </div>
                  <div className="alphabet-row">
                    <span>j=1</span><span>k=2</span><span>l=3</span><span>m=4</span><span>n=5</span>
                    <span>o=6</span><span>p=7</span><span>q=8</span><span>r=9</span>
                  </div>
                  <div className="alphabet-row">
                    <span>s=1</span><span>t=2</span><span>u=3</span><span>v=4</span><span>w=5</span>
                    <span>x=6</span><span>y=7</span><span>z=8</span>
                  </div>
                </div>

                <h4 style={{marginTop: '30px'}}>Chaldean Values</h4>
                <div className="alphabet-grid">
                  <div className="alphabet-row">
                    <span>a=1</span><span>b=2</span><span>c=3</span><span>d=4</span><span>e=5</span>
                    <span>f=8</span><span>g=3</span><span>h=5</span><span>i=1</span>
                  </div>
                  <div className="alphabet-row">
                    <span>j=1</span><span>k=2</span><span>l=3</span><span>m=4</span><span>n=5</span>
                    <span>o=7</span><span>p=8</span><span>q=1</span><span>r=2</span>
                  </div>
                  <div className="alphabet-row">
                    <span>s=3</span><span>t=4</span><span>u=6</span><span>v=6</span><span>w=6</span>
                    <span>x=5</span><span>y=1</span><span>z=7</span>
                  </div>
                </div>

                <h4 style={{marginTop: '30px'}}>Kabbalah Values</h4>
                <div className="alphabet-grid">
                  <div className="alphabet-row">
                    <span>a=21</span><span>b=2</span><span>c=3</span><span>d=4</span><span>e=5</span>
                    <span>f=7</span><span>g=8</span><span>h=9</span><span>i=10</span>
                  </div>
                  <div className="alphabet-row">
                    <span>j=11</span><span>k=3</span><span>l=12</span><span>m=13</span><span>n=14</span>
                    <span>o=15</span><span>p=16</span><span>q=3</span><span>r=17</span>
                  </div>
                  <div className="alphabet-row">
                    <span>s=18</span><span>t=19</span><span>u=19</span><span>v=1</span><span>w=1</span>
                    <span>x=6</span><span>y=0</span><span>z=18</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Number Associations */}
          <div className="info-section">
            <h3>🌟 Number Associations (Elements, Planets, Lords)</h3>
            <div className="info-content">
              <div className="associations-table">
                <table>
                  <thead>
                    <tr>
                      <th>Number</th>
                      <th>Element</th>
                      <th>Planet</th>
                      <th>Lord</th>
                      <th>Alphabets</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Fire</td>
                      <td>Sun</td>
                      <td>Shri Surya Bhagavan</td>
                      <td>A I J Q Y</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Water</td>
                      <td>Moon</td>
                      <td>Shri Chandra Bhagavan</td>
                      <td>B K R</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Fire</td>
                      <td>Jupiter</td>
                      <td>Shri Dakshinamoorthy / Guru</td>
                      <td>C G L S</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Air</td>
                      <td>Uranus</td>
                      <td>Shri Rahu Bhagavan</td>
                      <td>D M T</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Air</td>
                      <td>Mercury</td>
                      <td>Shri Budha[n] Bhagavan</td>
                      <td>E H N X</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Earth</td>
                      <td>Venus</td>
                      <td>Shri Sukra[n] Bhagavan</td>
                      <td>U V W</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Water</td>
                      <td>Neptune</td>
                      <td>Shri Ketu Bhagavan</td>
                      <td>O Z</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>Earth</td>
                      <td>Saturn</td>
                      <td>Shri Sani / Shanaishwar</td>
                      <td>P F</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>Fire</td>
                      <td>Mars</td>
                      <td>Shri Mangala / Angaraka / Kuja / Chevvai</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Harmonious Vibrations for Marriage */}
          <div className="info-section">
            <h3>💑 Harmonious Vibrations for Marriage</h3>
            <div className="info-content">
              <p>Birthday or personal number - People should marry someone from the same vibrational group:</p>
              <div className="vibration-groups">
                <div className="vibration-card water">
                  <h4>💧 Water Group - Emotional</h4>
                  <p>1, 5, 7, 10, 14, 16, 19, 23, 25, 28</p>
                </div>
                <div className="vibration-card fire">
                  <h4>🔥 Fire Group - Intellectual</h4>
                  <p>2, 4, 8, 11, 13, 17, 20, 22, 26, 29, 31</p>
                </div>
                <div className="vibration-card air">
                  <h4>🌬️ Air Group - Intuitional</h4>
                  <p>3, 6, 9, 12, 15, 18, 21, 24, 27, 30</p>
                </div>
              </div>
            </div>
          </div>

          {/* How to Use Numerology */}
          <div className="info-section">
            <h3>📋 How to Use Numerology for Selecting</h3>
            <div className="info-content">
              <ul className="usage-list">
                <li>
                  <strong>Partner for Marriage/Business:</strong>
                  <ul>
                    <li>Partner's Psychic/Birthday/Personality Number should be a friend of your Psychic/Birthday/Personality Number</li>
                    <li>Partner's Expression/Life Number should be a friend of your Life Path Number</li>
                    <li>Partner's Destiny Number should be a friend of your Destiny Number</li>
                    <li>Refer to the "Friends and Foes" table above</li>
                  </ul>
                </li>
                <li>
                  <strong>Business Name:</strong> Should be in harmony with your personal number and lucky number
                </li>
                <li>
                  <strong>Vehicle/Car Number:</strong> Should be in harmony with your personal number and lucky number
                </li>
                <li>
                  <strong>Baby Name/Your Name:</strong> Destiny number should be a friend of the psychic number. 
                  Refer to "Friends and Foes" table above
                </li>
              </ul>
            </div>
          </div>

          {/* Double Digit Numbers */}
          <div className="info-section">
            <h3>🔢 Double Digit Numbers - Advanced Meanings</h3>
            <div className="info-content">
              <p className="intro-text">
                It is time to study the wider meanings of double-digit numbers which play an important role in advanced numerology. 
                These meanings, explained by Cheiro (the greatest numerologist of all times), have proved accurate in the lives of several people.
              </p>
              
              <div className="double-digit-meanings">
                <div className="digit-card">
                  <span className="digit-num">10</span>
                  <p>Represents honor, faith, self-confidence, rise and fall, good or bad. Depending on one's desires, this number leads one to good or bad.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">11</span>
                  <p>Represents hidden dangers, treachery and difficulties from others.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">12</span>
                  <p>Represents suffering, anxiety and sacrifice. This number personifies a person being sacrificed for the plans and intrigues of others.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">13</span>
                  <p>Represents change of plans, change of place, upheaval and destruction and unexpected dangers.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">14</span>
                  <p>Represents movement, combination of people and things, danger from natural elements. Very good for money, speculation and business changes but carries risk from others' actions.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">15</span>
                  <p>Very good for receiving favors, gifts and money. Lucky and powerful with strong primary numbers but destructive with 4 and 8. Avoid business with 15 when involving 4 or 8.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">16</span>
                  <p>Represents accidents and defeat of one's plans.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">17</span>
                  <p>Represents spiritualism, peace, love, and immortality. Very fortunate unless associated with 4 or 8. Talented but can be tragic.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">18</span>
                  <p>Represents materialism trying to destroy spiritualism. Quarrels, family squabbles, war, revolutions. May indicate arms-related business. Treachery and danger from natural elements.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">19</span>
                  <p>Represents success, esteem, honor and happiness. Known as the heavenly number.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">20</span>
                  <p>Not materialistic. Doubtful worldly success. Represents new plans, ambitions, purposes. Delays, hindrances and obstructions in implementation.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">21</span>
                  <p>Represents advancement, success, elevation and honor. Victory after a long fight.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">22</span>
                  <p>Stands for illusion and delusion, fool's paradise, dreamer of dreams. False judgment and delay in recognizing looming dangers.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">23</span>
                  <p>Represents success, help from others and protection from those in high positions.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">24</span>
                  <p>Represents assistance from high positions. Gains from persons of the opposite sex.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">25</span>
                  <p>Strength gained through experience and benefits from observation. Strife and trouble in early life.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">26</span>
                  <p>Represents gravest dangers and disasters from association with others. Ruin and losses from bad speculation, ill advice, bad partnerships.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">27</span>
                  <p>Represents authority, power and command. Should carry out own plans instead of taking advice from others.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">28</span>
                  <p>Number of great promises. Loss through trust in others, opposition, competition, trade danger through law. Beginning life again and again.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">29</span>
                  <p>Indicates uncertainties, treachery and deception from others. Dangers, unreliable friends, grief and deception from opposite sex.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">30</span>
                  <p>Neither fortunate nor unfortunate. Sometimes powerful, sometimes the weakest number.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">31</span>
                  <p>Has ingredients of 30. Additionally identified with isolation and loneliness.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">32-36</span>
                  <p>32 = like 14 & 23; 33 = like 24; 34 = like 25; 35 = like 26; 36 = like 27</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">37</span>
                  <p>Represents good friendship and partnership of all kinds. Success in matters concerning opposite sex.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">38-42</span>
                  <p>38 = like 29; 39 = like 30; 40 = like 31; 41 = like 32; 42 = like 24</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">43</span>
                  <p>Unfortunate number. Represents revolution, upheaval, strife, failure and prevention.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">44-50</span>
                  <p>44 = like 26; 45 = like 27; 46 = like 37; 47 = like 29; 48 = like 30; 49 = like 31; 50 = like 32</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">51</span>
                  <p>High potency number, nature of a warrior. Sudden advancement. Highly favorable for leaders, navy and military but carries threat of assassination.</p>
                </div>
                <div className="digit-card">
                  <span className="digit-num">52+</span>
                  <p>For numbers above 52: Reduce by 9 until you reach 52 or less, then see corresponding meaning. Example: 98-9=89, 89-9=80... until 44.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="info-section disclaimer">
            <h3>⚠️ Privacy & Disclaimer</h3>
            <div className="info-content">
              <p>
                🔒 <strong>Your Privacy Matters:</strong> This calculator runs entirely in your browser and does not collect, 
                store, or transmit any personal information you enter. Your data stays with you, always.
              </p>
              <p style={{marginTop: '15px'}}>
                🌟 <strong>Love This Tool?</strong> Help others discover the wisdom of numerology! 
                Share <a href="https://learnjoyhub.in" target="_blank" rel="noopener noreferrer" className="share-link">LearnJoyHub.in</a> with 
                friends, family, and your social network. Together, we can spread joy and learning!
              </p>
              <p style={{marginTop: '15px', fontStyle: 'italic', fontSize: '0.95em', color: '#666'}}>
                📚 <strong>Important Note:</strong> Numerology is an ancient belief system meant for entertainment, 
                self-reflection, and personal insight. While it can offer interesting perspectives, please make important 
                life decisions based on careful thought, professional advice, and consideration of multiple factors. 
                Use this wisdom as a guide, not as a sole decision-maker.
              </p>
              <div style={{marginTop: '20px', padding: '15px', background: '#e3f2fd', borderRadius: '10px', textAlign: 'center'}}>
                <p style={{margin: 0, color: '#1976d2', fontWeight: 'bold'}}>
                  ✨ Share the joy of learning: <a href="https://learnjoyhub.in" target="_blank" rel="noopener noreferrer" className="share-link">learnjoyhub.in</a>
                </p>
              </div>
            </div>
          </div>

          {/* Educational Articles About Numerology */}
          <div className="numerology-articles-section">
            <h2>Understanding Numerology: A Comprehensive Guide</h2>
            
            <article className="numerology-article">
              <h3>The Ancient Origins of Numerology</h3>
              <p>
                Numerology has been practiced for thousands of years across different cultures and civilizations. 
                The ancient Egyptians, Greeks, Romans, Chinese, and Hebrew scholars all recognized the significance 
                of numbers beyond their mathematical value. Pythagoras, the famous Greek mathematician and philosopher 
                (circa 570-495 BCE), is often credited as the father of modern Western numerology, though number 
                mysticism existed long before his time.
              </p>
              <p>
                Pythagoras believed that everything in the universe could be expressed through numbers, and that 
                numbers held vibrational properties that influenced physical reality. His teachings formed the 
                foundation of the Pythagorean numerology system we use today. Meanwhile, the ancient Babylonians 
                developed the Chaldean system, which is considered by many to be the oldest and most accurate 
                numerology system, though it's more complex to calculate.
              </p>
              <p>
                In Hebrew tradition, the Kabbalah system of numerology connects numbers with Hebrew letters and 
                their sacred meanings. This system is deeply intertwined with Jewish mysticism and the study of 
                the Torah. Each of these systems offers unique insights, and we've incorporated all three into 
                our calculator to give you the most comprehensive numerological analysis possible.
              </p>
            </article>

            <article className="numerology-article">
              <h3>How Numerology Works: The Science Behind the Mystery</h3>
              <p>
                At its core, numerology is based on the principle that numbers carry specific vibrations and energies. 
                Every letter in your name corresponds to a number, and every digit in your birth date has significance. 
                By reducing these numbers to single digits (or master numbers), numerologists believe they can reveal 
                insights about personality, destiny, and life purpose.
              </p>
              <p>
                The most common numerological calculations are:
              </p>
              <ul style={{marginLeft: '30px', lineHeight: '1.8'}}>
                <li><strong>Life Path Number:</strong> Calculated from your birth date, this number represents your 
                core essence and the path you're meant to walk in life. It's considered the most important number in 
                your numerology chart.</li>
                <li><strong>Destiny Number (Expression Number):</strong> Derived from your full birth name, this number 
                reveals your natural talents, abilities, and the direction you're meant to take in life.</li>
                <li><strong>Personality Number:</strong> Based on the consonants in your name, this shows how others 
                perceive you and the face you present to the world.</li>
                <li><strong>Soul Urge Number (Heart's Desire):</strong> Calculated from the vowels in your name, this 
                reveals your innermost desires, motivations, and what truly drives you.</li>
              </ul>
              <p>
                While numerology isn't recognized as a science in the traditional sense, millions of people find value 
                in its insights. Think of it as a tool for self-reflection and personal growth rather than a predictive 
                science. The patterns and correlations that numerology reveals can help you understand yourself better 
                and make more conscious choices aligned with your natural inclinations.
              </p>
            </article>

            <article className="numerology-article">
              <h3>Understanding Master Numbers: 11, 22, and 33</h3>
              <p>
                In numerology, certain double-digit numbers are considered "Master Numbers" and are never reduced to 
                single digits. These are 11, 22, and 33. Some numerologists also include 44, but the first three are 
                universally recognized as master numbers carrying special significance and spiritual power.
              </p>
              <p>
                <strong>Master Number 11 - The Spiritual Messenger:</strong> People with this life path are believed 
                to be highly intuitive, spiritually aware, and capable of great insight. They often serve as bridges 
                between the spiritual and material worlds. However, the intensity of this number can also bring challenges, 
                including anxiety and self-doubt. The key for 11s is to trust their intuition and share their spiritual 
                insights with others.
              </p>
              <p>
                <strong>Master Number 22 - The Master Builder:</strong> This is considered the most powerful number in 
                numerology. 22s have the practical skills of the number 4 (2+2=4) combined with the visionary power of 
                master numbers. They're capable of turning dreams into reality on a grand scale, often leaving lasting 
                legacies. Famous leaders, architects, and innovators often have 22 in their charts.
              </p>
              <p>
                <strong>Master Number 33 - The Master Teacher:</strong> This is the rarest and most evolved of the master 
                numbers. 33 combines the intuition of 11 with the practicality of 22, creating someone who can heal and 
                uplift humanity. People with 33 are often drawn to healing professions, teaching, or humanitarian work. 
                They have deep compassion and a strong desire to serve others.
              </p>
              <p>
                If you have a master number in your chart, it's both a gift and a responsibility. Master numbers indicate 
                higher spiritual potential and greater challenges. Many people with master numbers don't fully embody 
                their potential until later in life, as it takes time to grow into the wisdom these numbers represent.
              </p>
            </article>

            <article className="numerology-article">
              <h3>Practical Applications: Using Numerology in Daily Life</h3>
              <p>
                While skeptics may dismiss numerology as superstition, practitioners have found practical ways to apply 
                numerological insights to enhance their lives. Here are some common applications:
              </p>
              <p>
                <strong>Career Guidance:</strong> Your destiny number can suggest careers that align with your natural 
                talents. For example, a person with destiny number 3 (creativity and communication) might thrive in 
                fields like writing, marketing, or the arts, while someone with destiny number 8 (power and material 
                success) might excel in business, finance, or leadership roles.
              </p>
              <p>
                <strong>Relationship Compatibility:</strong> Numerology can offer insights into relationship dynamics. 
                By comparing life path numbers, you can understand potential challenges and strengths in partnerships. 
                For instance, a life path 1 (independent leader) and life path 2 (cooperative partner) might need to 
                balance autonomy with togetherness, but they can complement each other beautifully when both are mature 
                and self-aware.
              </p>
              <p>
                <strong>Timing of Major Decisions:</strong> Personal year numbers (calculated by adding your birth 
                day and month to the current year) can help you understand the energy and themes of a particular year. 
                A personal year 9 might be a time for completion and letting go, while a personal year 1 signals new 
                beginnings and fresh starts. Understanding these cycles can help you time major life decisions more 
                consciously.
              </p>
              <p>
                <strong>Self-Understanding and Personal Growth:</strong> Perhaps the most valuable application of 
                numerology is as a mirror for self-reflection. Reading about your numbers can help you recognize patterns 
                in your behavior, understand your strengths and challenges, and make more conscious choices. Even if you 
                don't believe numbers have mystical power, the insights can prompt valuable self-examination.
              </p>
            </article>

            <article className="numerology-article">
              <h3>Comparing Numerology Systems: Which One Is Right for You?</h3>
              <p>
                Our calculator offers three major numerology systems: Pythagorean, Chaldean, and Kabbalah. Each has its 
                own methodology and cultural background. Understanding the differences can help you choose which system 
                resonates most with you.
              </p>
              <p>
                <strong>Pythagorean (Western) System:</strong> This is the most widely used system in the Western world. 
                It assigns numbers 1-9 to letters A-Z in sequence. It's straightforward to calculate and interpret, making 
                it popular for beginners. The Pythagorean system focuses on the personality and external traits, giving 
                insights into how you interact with the world around you.
              </p>
              <p>
                <strong>Chaldean (Ancient Babylonian) System:</strong> Considered by many to be more accurate but more 
                complex, the Chaldean system uses numbers 1-8 (no 9, as it's considered sacred) and assigns them based 
                on vibrational patterns rather than alphabetical order. It's also based on your birth name rather than 
                the name you use currently. The Chaldean system is thought to reveal deeper, more spiritual aspects of 
                your being.
              </p>
              <p>
                <strong>Kabbalah (Hebrew) System:</strong> This system is deeply connected to Jewish mysticism and 
                Hebrew letters. It focuses primarily on your name and doesn't typically use your birth date. The Kabbalah 
                system has 22 vibrations corresponding to the 22 letters of the Hebrew alphabet, plus an additional zero 
                vibration. It's often used for spiritual development and understanding your soul's purpose.
              </p>
              <p>
                Which system should you use? Many numerology enthusiasts calculate their numbers using all three systems 
                and compare the results. You might find that one system's interpretation resonates more deeply with you, 
                or you might discover that each system reveals different facets of your personality and life path. There's 
                no "wrong" choice—use the system (or systems) that speaks to you most powerfully.
              </p>
            </article>

            <article className="numerology-article">
              <h3>Skepticism and Belief: Finding Your Own Truth</h3>
              <p>
                It's important to approach numerology with an open mind while maintaining healthy skepticism. Numerology 
                is not recognized by mainstream science, and there's no empirical evidence that numbers have mystical 
                properties or can predict the future. However, the lack of scientific validation doesn't necessarily 
                negate numerology's value as a tool for self-reflection and personal growth.
              </p>
              <p>
                Consider numerology as you might consider other personality frameworks like the Myers-Briggs Type Indicator 
                or the Enneagram. These systems aren't scientifically proven either, yet millions find them useful for 
                understanding themselves and others. The value lies not in supernatural predictive power, but in the 
                self-awareness and insights these frameworks can spark.
              </p>
              <p>
                The "Barnum Effect" (also called the Forer Effect) explains why general personality descriptions often 
                feel personally meaningful—we tend to accept vague, general statements as uniquely applicable to ourselves. 
                This psychological principle means you should be cautious about accepting numerological descriptions 
                uncritically. Look for specific, actionable insights rather than just flattering generalities.
              </p>
              <p>
                That said, if numerology helps you understand yourself better, make more thoughtful decisions, or simply 
                brings you joy and fascination, then it serves a valuable purpose in your life. Use it as one tool among 
                many for self-understanding, but never let it override your own judgment, intuition, or professional advice 
                when making important life decisions.
              </p>
              <p>
                Ultimately, whether you view numerology as mystical wisdom or psychological tool, the key is to approach 
                it with curiosity, openness, and discernment. Take what resonates, leave what doesn't, and always trust 
                your own inner wisdom above any external system of analysis.
              </p>
            </article>
          </div>

          {/* Ad Section - After all content */}
          <GoogleAd 
            adSlot="1234567891"
            adFormat="auto"
            className="numerology-ad"
          />

        </div>
      </div>
    </div>
  );
};

export default NumerologyCalculator;