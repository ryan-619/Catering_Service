import { FaPhone, FaMapMarkerAlt, FaBuilding, FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer>
      <div className="ct">
        <div className="fg">
          <div className="fb-brand">
            <div className="logo-txt">LTCS<span>.</span></div>
            <div className="since">Only Veg Food Series · Since 1982</div>
            <p>
              Lala Trivedi Catering Service has been a trusted name in pure vegetarian
              catering across Kanpur since 1982, serving with devotion guided by Mata Annapurna.
            </p>
            <div className="fsoc">
              <a className="fsl" href="#"><FaFacebookF /></a>
              <a className="fsl" href="#"><FaLinkedinIn /></a>
              <a className="fsl" href="#"><FaYoutube /></a>
            </div>
          </div>

          <div className="fcol">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Wedding Catering</a></li>
              <li><a href="#">Corporate Events</a></li>
              <li><a href="#">Social Gatherings</a></li>
              <li><a href="#">VIP Private Events</a></li>
              <li><a href="#">Jain Food Options</a></li>
            </ul>
          </div>

          <div className="fcol">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#menu">Our Menu</a></li>
              <li><a href="#testi">Reviews</a></li>
              <li><a href="#faq">FAQs</a></li>
              <li><a href="#gallery">Gallery</a></li>
            </ul>
          </div>

          <div className="fcol">
            <h4>Contact Us</h4>
            <div className="cline">
<span className="cicon"><FaPhone /></span>
              <span>
                <a href="tel:+919936485155" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>
                  +91-9936485155
                </a><br />
                <a href="tel:+918299504889" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>
                  +91-8299504889
                </a>
              </span>
            </div>
            <div className="cline">
              <span className="cicon"><FaMapMarkerAlt /></span>
              <span>77/6 Gandhi Gram, Kanpur – 208007, U.P.</span>
            </div>
            <div className="cline">
              <span className="cicon"><FaBuilding /></span>
              <span>7/1, 7/2 LT Enclave, Krishna Nagar, Kanpur</span>
            </div>
          </div>
        </div>

        <div className="fbot">
          <p>© 2025 Lala Trivedi Catering Service. All Rights Reserved. | GSTIN: 09ACSPT6343B2Z7</p>
          <p style={{ color: 'rgba(255,255,255,.18)', fontSize: '.7rem' }}>Designed with ♥ for LTCS</p>
        </div>
      </div>
    </footer>
  )
}
