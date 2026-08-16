import { useState } from 'react'
import { SlideLeft, SlideRight } from './AnimatedSection'

const faqs = [
  { q: 'Do you serve only vegetarian food?', a: 'Yes — absolutely. Lala Trivedi Catering Service serves ONLY vegetarian food. This is our founding commitment since 1982. We do not handle any non-vegetarian ingredients. We also offer dedicated Jain food options.' },
  { q: 'What types of events do you cater to?', a: 'We cater to weddings, corporate events, birthday parties, anniversaries, Pooja functions, festivals, community gatherings, and all types of social events in and around Kanpur, U.P.' },
  { q: 'Can you provide Jain food options?', a: 'Yes. We cater to Jain dietary requirements with dedicated preparation. Please mention your requirements when booking and we will ensure complete compliance.' },
  { q: 'Do you offer tasting sessions?', a: 'Yes. We offer menu tasting sessions at our Kanpur office so you can experience our food quality before making a decision. Contact us to schedule.' },
  { q: 'What is your service area?', a: 'We are based in Kanpur, U.P. and serve events across Kanpur and surrounding areas. Contact us for events outside Kanpur to discuss logistics.' },
  { q: 'How do I get a quote or book?', a: 'Call us at +91-9936485155 or +91-8299504889, WhatsApp at +91-9936485155, or fill out the booking form on this page. We respond within 24 hours.' },
]

export default function Faq({ onBookNow }) {
  const [openIndex, setOpenIndex] = useState(0)
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="faq">
      <div className="ct">
        <div className="faq-layout">
          <SlideLeft>
            <div className="fl">
              <span className="ey">FAQs</span>
              <span className="gline"></span>
              <h2 className="st">
                Frequently Asked<br />
                <em className="italic" style={{ color: 'var(--yellow)' }}>Questions</em>
              </h2>
              <p>Have questions about our catering? Find answers here, or reach out directly.</p>
              <button className="btn btn-g" onClick={onBookNow}>Contact Us</button>
              <div style={{ marginTop: '16px' }}>
                <a href="https://wa.me/919936485155" target="_blank" rel="noreferrer" className="wa-btn">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </SlideLeft>

          <SlideRight>
            <div>
              {faqs.map((faq, i) => (
                <div className={`fi ${openIndex === i ? 'open' : ''}`} key={i}>
                  <button className="fq" onClick={() => toggle(i)}>
                    {faq.q}
                    <span className="ficon">+</span>
                  </button>
                  <div className="fa">
                    <div className="fa-inner">{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </SlideRight>
        </div>
      </div>
    </section>
  )
}