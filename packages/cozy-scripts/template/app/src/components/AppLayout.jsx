/* global cozy */
import React from 'react'
import { Outlet } from 'react-router-dom'
import cx from 'classnames'

import { Layout, Main, Content } from 'cozy-ui/transpiled/react/Layout'
import Sprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import BarTitle from 'cozy-ui/transpiled/react/BarTitle'
import { useClient } from 'cozy-client'

import Sidebar from 'src/components/Sidebar'

const AppLayout = () => {
  const { t } = useI18n()
  const client = useClient()
  const { isMobile } = useBreakpoints()
  const { BarCenter } = cozy.bar

  return (
    <Layout>
      {isMobile && (
        <BarCenter>
          <MuiCozyTheme>
            <BarTitle>{client.appMetadata.slug}</BarTitle>
          </MuiCozyTheme>
        </BarCenter>
      )}
      <Sidebar />
      <Main>
        <Content
          className={cx({
            'u-mh-half u-mv-1': isMobile,
            'u-mh-2 u-mv-1': !isMobile
          })}
        >
          <Outlet />
        </Content>
      </Main>
      <Alerter t={t} />
      <Sprite />
    </Layout>
  )
}

export default AppLayout
