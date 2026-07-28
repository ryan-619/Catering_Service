import founder1Img from '../assets/founder1.jpg'
import founder2Img from '../assets/founder2.jpg'

const founders = [
  {
    img: founder1Img,
    tag: '🌿 Est. 1982',
    name: 'Surya Prakash Trivedi',
    nickname: '(Lala Trivedi)',
    role: 'Founder, LTCS',
    story: `Born with a deep love for pure vegetarian food and community service, Surya Prakash Trivedi laid the foundation of Lala Trivedi Catering Service in 1982. His vision was simple yet powerful — to serve wholesome, hygienic vegetarian food to every household, event, and celebration with the same devotion one offers to the divine.`,
    quote: 'A meal prepared with devotion is not just food — it is a blessing that nourishes the soul, strengthens bonds, and keeps traditions alive for generations.',
    stats: [
      { val: '1982', lbl: 'Founded' },
      { val: '42+', lbl: 'Years' },
      { val: 'Kanpur', lbl: 'Hometown' },
    ],
    expNum: '42',
    expLbl: 'Years of Vision',
    reverse: false,
  },
  {
    img: founder2Img,
    tag: '🤝 Co-Founder',
    name: 'Vijay Prakash Trivedi',
    nickname: '',
    role: 'Co-Founder, LTCS',
    story: `Carrying forward the legacy of LTCS with passion and precision, Vijay Prakash Trivedi has been the driving force behind the brand's modern growth. With an eye for detail and an uncompromising commitment to quality, he has helped LTCS scale from a local catering unit to Kanpur's most trusted vegetarian catering service.`,
    quote: 'Quality is not what we do sometimes — it is what we do every single time, for every single guest, without exception.',
    stats: [
      { val: '10K+', lbl: 'Events' },
      { val: '300+', lbl: 'Menus' },
      { val: '100%', lbl: 'Veg Always' },
    ],
    expNum: '26+',
    expLbl: 'Years of Leadership',
    reverse: true,
  },
]

export default function Founder() {
  return (
    <section id="founder">
      <div className="founder-inner">
        <div className="ct">

          {/* Header */}
          <div className="founder-top-label">
            <span className="founder-line"></span>
            <span className="founder-eyebrow">The Visionaries Behind LTCS</span>
            <span className="founder-line"></span>
          </div>

          {/* Founder Cards */}
          {founders.map((f, i) => (
            <div
              key={f.name}
              className={`founder-grid ${f.reverse ? 'founder-reverse' : ''} ${i < founders.length - 1 ? 'founder-divider-row' : ''}`}
            >
              {/* Photo */}
              <div className="founder-left">
                <div className="founder-circle-wrap">
                  <img src={f.img} alt={f.name} className="founder-circle-img" />
                  <div className="founder-ring"></div>
                </div>
                <div className="founder-exp-card">
                  <span className="founder-exp-num">{f.expNum}</span>
                  <span className="founder-exp-lbl">{f.expLbl}</span>
                </div>
              </div>

              {/* Content */}
              <div className="founder-right">
                <div className="founder-tag">{f.tag}</div>
                <h2 className="founder-name">{f.name}</h2>
                {f.nickname && (
                  <div className="founder-nickname">{f.nickname}</div>
                )}
                <p className="founder-role">{f.role}</p>
                <p className="founder-story">{f.story}</p>
                <div className="founder-philosophy">
                  <div className="founder-philosophy-icon">💬</div>
                  <div>
                    <div className="founder-philosophy-title">His Words</div>
                    <div className="founder-philosophy-text">"{f.quote}"</div>
                  </div>
                </div>
                <div className="founder-stats-row">
                  {f.stats.map((s, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center' }}>
                      <div className="founder-stat-box">
                        <div className="founder-stat-val">{s.val}</div>
                        <div className="founder-stat-lbl">{s.lbl}</div>
                      </div>
                      {j < f.stats.length - 1 && <div className="founder-stat-sep"></div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}