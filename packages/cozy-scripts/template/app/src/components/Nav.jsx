import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { NavLink } from 'react-router-dom'

export const Nav = ({ t }) => (
  <nav>
    <ul className='c-nav'>
      <li className='c-nav-item'>
        <NavLink to='/viewhello1' className='hello-cat-hello1 c-nav-link' activeClassName='active'>
          { t('Nav.hello_nav_1') }
        </NavLink>
      </li>
      <li className='c-nav-item'>
        <NavLink to='/viewhello2' className='hello-cat-hello2 c-nav-link' activeClassName='active'>
          { t('Nav.hello_nav_2') }
        </NavLink>
      </li>
      <li className='c-nav-item'>
        <NavLink to='/viewhello3' className='hello-cat-hello3 c-nav-link' activeClassName='active'>
          { t('Nav.hello_nav_3') }
        </NavLink>
      </li>
    </ul>
  </nav>
)

export default translate()(Nav)
