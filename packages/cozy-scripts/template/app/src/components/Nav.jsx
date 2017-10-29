import React from 'react'
import { translate, Icon } from 'cozy-ui/react'
import { NavLink } from 'react-router-dom'
import NavIcon from '../assets/icons/icon-pin.svg'

export const Nav = ({ t }) => (
  <nav>
    <ul className='c-nav'>
      <li className='c-nav-item'>
        <NavLink to='/viewhello1' className='c-nav-link' activeClassName='active'>
          <Icon icon={NavIcon} />
          { t('Nav.hello_nav_1') }
        </NavLink>
      </li>
      <li className='c-nav-item'>
        <NavLink to='/viewhello2' className='c-nav-link' activeClassName='active'>
          <Icon icon={NavIcon} />
          { t('Nav.hello_nav_2') }
        </NavLink>
      </li>
      <li className='c-nav-item'>
        <NavLink to='/viewhello3' className='c-nav-link' activeClassName='active'>
          <Icon icon={NavIcon} />
          { t('Nav.hello_nav_3') }
        </NavLink>
      </li>
    </ul>
  </nav>
)

export default translate()(Nav)
