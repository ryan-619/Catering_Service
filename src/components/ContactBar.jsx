import { FaPhone, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa'

export default function ContactBar() {
  return (
    <div id="contact-bar">
      <div className="ct">
        <div className="cb-grid">
          <div className="cb-item">
            <span className="cb-icon"><FaPhone /></span>
            <div className="cb-label">Call Us</div>
            <div className="cb-val">
              <a href="tel:+919936485155">+91-9936485155</a><br />
              <a href="tel:+918299504889">+91-8299504889</a><br />
              <a href="tel:+919336118498">+91-9336118498</a>
            </div>
          </div>
          <div className="cb-item">
            <span className="cb-icon"><FaWhatsapp /></span>
            <div className="cb-label">WhatsApp</div>
            <div className="cb-val">
              <a href="https://wa.me/919936485155" target="_blank" rel="noreferrer">
                +91-9936485155
              </a>
            </div>
          </div>
          <div className="cb-item">
            <span className="cb-icon"><FaMapMarkerAlt /></span>
            <div className="cb-label">Our Office</div>
            <div className="cb-val" style={{ fontSize: '.85rem' }}>
              7/1, 7/2 LT Enclave, Krishna Nagar<br />
              Kanpur – 208007, U.P.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
