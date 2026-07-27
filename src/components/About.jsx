import { SlideLeft, SlideRight, FadeUp } from './AnimatedSection'

export default function About({ onBookNow }) {
  return (
    <section id="about">
      <div className="ct">
        <div className="about-grid">
          <SlideLeft>
            <div className="about-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80"
                alt="LTCS catering event"
              />
              <div className="about-badge">
                <div className="num">42+</div>
                <div className="lbl">Years of Pure<br />Veg Excellence</div>
              </div>
            </div>
          </SlideLeft>

          <SlideRight>
            <div className="about-text">
              <span className="ey">Who We Are</span>
              <span className="gline"></span>
              <h2 className="st">
                Pure Vegetarian Excellence<br />
                <em className="italic" style={{ color: 'var(--green)' }}>Since 1982</em>
              </h2>
              <p style={{ marginTop: '18px' }}>
                Founded in <strong>1982</strong>, Lala Trivedi Catering Service has built a proud legacy
                of <strong>pure vegetarian catering</strong> in Kanpur, U.P. For over four decades, we
                have been the most trusted name for families, corporates, and communities seeking
                authentic, wholesome vegetarian food prepared with love, devotion, and expertise.
              </p>
              <p>
                Under our brand <strong>LTCS — Only Veg Food Series</strong>, we bring together
                traditional recipes, expert culinary craftsmanship, and warm hospitality to make every
                event truly unforgettable.
              </p>
              <div className="feats">
                <div className="feat">100% Pure Vegetarian</div>
                <div className="feat">Jain Food Options</div>
                <div className="feat">Custom Menu Planning</div>
                <div className="feat">Live Food Stations</div>
                <div className="feat">Professional Staff</div>
                <div className="feat">Complete Event Setup</div>
              </div>
              <div style={{ marginTop: '30px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button className="btn btn-g" onClick={onBookNow}>Book a Tasting</button>
                <a href="https://wa.me/919936485155" target="_blank" rel="noreferrer" className="btn btn-ol">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </SlideRight>
        </div>
      </div>
    </section>
  )
}