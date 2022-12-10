import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import cx from 'classnames'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import UISidebar from 'cozy-ui/transpiled/react/Sidebar'
import Nav, {
  NavItem,
  NavIcon,
  NavText,
  NavLink
} from 'cozy-ui/transpiled/react/Nav'

import BulletPoint from 'src/assets/icons/icon-bullet-point.svg'

const Sidebar = () => {
  const { t } = useI18n()

  return (
    <UISidebar>
      <Nav>
        <NavItem>
          <RouterLink
            to="/todos"
            className={({ isActive }) =>
              cx(NavLink.className, {
                [NavLink.activeClassName]: isActive
              })
            }
          >
            <NavIcon icon={BulletPoint} />
            <NavText>{t('nav.todos')}</NavText>
          </RouterLink>
        </NavItem>
        <NavItem>
          <RouterLink
            to="/viewhello1"
            className={({ isActive }) =>
              cx(NavLink.className, {
                [NavLink.activeClassName]: isActive
              })
            }
          >
            <NavIcon icon={BulletPoint} />
            <NavText>{t('nav.hello_nav_2')}</NavText>
          </RouterLink>
        </NavItem>
        <NavItem>
          <RouterLink
            to="/viewhello2"
            className={({ isActive }) =>
              cx(NavLink.className, {
                [NavLink.activeClassName]: isActive
              })
            }
          >
            <NavIcon icon={BulletPoint} />
            <NavText>{t('nav.hello_nav_3')}</NavText>
          </RouterLink>
        </NavItem>
      </Nav>
    </UISidebar>
  )
}

export default Sidebar
