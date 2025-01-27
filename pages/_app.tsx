// global styles shared across the entire site
import 'styles/global.css'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/build/styles.css'

// used for collection views (optional)
import 'react-notion-x/build/third-party/collection.css'

// used for rendering equations (optional)
import 'react-notion-x/build/third-party/equation.css'

// used for tweet embeds (optional)
import 'react-static-tweets/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'

// this might be better for dark mode
// import 'prismjs/themes/prism-okaidia.css'

// global style overrides for notion
import 'styles/notion.css'

// global style overrides for prism theme (optional)
import 'styles/prism-theme.css'

// import any languages we want to support for syntax highlighting via Notion's
// Code block and prismjs
// import 'prismjs/components/prism-typescript'

import React from 'react'
import { useRouter } from 'next/router'
import { bootstrap } from 'lib/bootstrap-client'
import { fathomId, fathomConfig } from 'lib/config'
import * as Fathom from 'fathom-client'

if (typeof window !== 'undefined') {
  bootstrap()
}

export default function App({ Component, pageProps }) {
  const router = useRouter()

  React.useEffect(() => {
    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }

    if (fathomId) {
      Fathom.load(fathomId, fathomConfig)

      router.events.on('routeChangeComplete', onRouteChangeComplete)

      return () => {
        router.events.off('routeChangeComplete', onRouteChangeComplete)
      }
    }
  }, [router.events])

  return <Component {...pageProps} />
}
