import { FaLeaf } from 'react-icons/fa'

export default function TopBar() {
  return (
    <div className="topbar">
      <span>
        ☏ Call / WhatsApp:{' '}
        <a href="tel:+919936485155">+91-9936485155</a>
        &nbsp;|&nbsp;
        <a href="tel:+918299504889">+91-8299504889</a>
        &nbsp;|&nbsp;
        <FaLeaf style={{ display: 'inline', verticalAlign: 'middle' }} />
        &nbsp;Only Vegetarian Food &nbsp;|&nbsp; Serving Kanpur Since 1982
      </span>
    </div>
  )
}