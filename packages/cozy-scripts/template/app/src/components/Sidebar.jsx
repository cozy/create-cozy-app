import React from 'react'

import { NavLink } from 'react-router-dom'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Icon from 'cozy-ui/transpiled/react/Icon'

import NavIcon from '../assets/icons/icon-bullet-point.svg'

export const Sidebar = () => {
  const { t } = useI18n()

  return (
    <aside className="o-sidebar">
      <nav>
        <ul className="c-nav">
          <li className="c-nav-item">
            <NavLink
              to="/todos"
              className="c-nav-link"
              activeClassName="is-active"
            >
              <Icon className="c-nav-icon" icon={NavIcon} />
              {t('Nav.todos')}
            </NavLink>
          </li>
          <li className="c-nav-item">
            <NavLink
              to="/viewhello1"
              className="c-nav-link"
              activeClassName="is-active"
            >
              <Icon className="c-nav-icon" icon={NavIcon} />
              {t('Nav.hello_nav_2')}
            </NavLink>
          </li>
          <li className="c-nav-item">
            <NavLink
              to="/viewhello2"
              className="c-nav-link"
              activeClassName="is-active"
            >
              <Icon className="c-nav-icon" icon={NavIcon} />
              {t('Nav.hello_nav_3')}
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
