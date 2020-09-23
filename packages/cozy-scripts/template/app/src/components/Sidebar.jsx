import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { NavLink as RRNavLink } from 'react-router-dom'

import UISidebar from 'cozy-ui/transpiled/react/Sidebar'
import Nav, {
  NavItem,
  NavIcon,
  NavText,
  genNavLink
} from 'cozy-ui/transpiled/react/Nav'

import navIcon from '../assets/icons/icon-bullet-point.svg'

const NavLink = genNavLink(RRNavLink)

export const Sidebar = ({ t }) => (
  <UISidebar>
    <Nav>
      <NavItem>
        <NavLink to="/todos">
          <NavIcon icon={navIcon} />
          <NavText>{t('Nav.todos')}</NavText>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/viewhello1">
          <NavIcon icon={navIcon} />
          <NavText>{t('Nav.hello_nav_2')}</NavText>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/viewhello2">
          <NavIcon icon={navIcon} />
          <NavText>{t('Nav.hello_nav_3')}</NavText>
        </NavLink>
      </NavItem>
    </Nav>
  </UISidebar>
)

// translate() provide t() to use translations (ex: locales/en.json)
export default translate()(Sidebar)
