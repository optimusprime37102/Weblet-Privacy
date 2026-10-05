import { useEffect, useState } from 'react'
import './App.css'

const LAST_UPDATED = 'October 5, 2026'
const CONTACT_EMAIL = 'privacy@weblet.app'

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'collect', label: 'What we collect' },
  { id: 'use', label: 'How we use data' },
  { id: 'third-parties', label: 'Third parties' },
  { id: 'storage', label: 'Storage & security' },
  { id: 'choices', label: 'Your choices' },
  { id: 'children', label: 'Children' },
  { id: 'changes', label: 'Changes' },
  { id: 'contact', label: 'Contact' },
]

function App() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id)
  const [tocOpen, setTocOpen] = useState(false)

  useEffect(() => {
    const nodes = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean,
    )

    if (!nodes.length) return undefined

    const syncActive = () => {
      const scrollBottom = window.scrollY + window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      if (docHeight - scrollBottom < 120) {
        setActiveId(SECTIONS[SECTIONS.length - 1].id)
        return
      }

      const offset = 140
      let current = nodes[0].id
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= offset) {
          current = node.id
        }
      }
      setActiveId(current)
    }

    syncActive()
    window.addEventListener('scroll', syncActive, { passive: true })
    window.addEventListener('resize', syncActive)
    return () => {
      window.removeEventListener('scroll', syncActive)
      window.removeEventListener('resize', syncActive)
    }
  }, [])

  useEffect(() => {
    if (!tocOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setTocOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [tocOpen])

  const goToSection = (id) => {
    setActiveId(id)
    setTocOpen(false)
  }

  const renderTocLinks = () => (
    <ul>
      {SECTIONS.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className={activeId === section.id ? 'active' : undefined}
            onClick={() => goToSection(section.id)}
          >
            {section.label}
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="page">
      <header className={`topbar${tocOpen ? ' menu-open' : ''}`}>
        <div className="topbar-inner">
          <div className="topbar-start">
            <button
              type="button"
              className="menu-btn"
              aria-expanded={tocOpen}
              aria-controls="mobile-toc"
              aria-label={tocOpen ? 'Close page menu' : 'Open page menu'}
              onClick={() => setTocOpen((open) => !open)}
            >
              <span className="menu-btn-bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
            <a className="brand" href="#top" aria-label="Weblet Privacy Policy">
              <span className="brand-mark" aria-hidden="true">
                W
              </span>
              <span className="brand-text">
                <strong>Weblet</strong>
                <span>Privacy</span>
              </span>
            </a>
          </div>
          <a
            className="topbar-link"
            href="#contact"
            onClick={() => goToSection('contact')}
          >
            Contact
          </a>
        </div>
        <nav
          id="mobile-toc"
          className="mobile-toc"
          aria-label="On this page"
          hidden={!tocOpen}
        >
          <p className="toc-title">On this page</p>
          {renderTocLinks()}
        </nav>
      </header>

      <main id="top" className="shell">
        <section className="hero">
          <p className="eyebrow">Lite Apps Browser · com.weblet.app</p>
          <h1>Privacy Policy</h1>
          <p className="lede">
            Weblet turns websites into lightweight apps on your device. This
            policy explains what stays on your phone, what leaves it when you
            browse, and the controls you have.
          </p>
          <div className="meta-row">
            <span className="pill">Effective {LAST_UPDATED}</span>
            <span className="pill soft">No accounts · No ads · Local-first</span>
          </div>
        </section>

        <div className="layout">
          <aside className="toc" aria-label="On this page">
            <p className="toc-title">On this page</p>
            <nav className="toc-nav">{renderTocLinks()}</nav>
          </aside>

          <article className="policy">
            <section id="overview">
              <h2>1. Overview</h2>
              <p>
                Weblet (“we”, “our”, or “the app”) is a Lite Apps browser that
                lets you save websites as shortcuts and open them in an in-app
                browser. Weblet does <strong>not</strong> require an account and
                does <strong>not</strong> operate a Weblet cloud backend that
                stores your Lite Apps, bookmarks, or browsing history.
              </p>
              <p>
                Most app preferences and lists stay on your device. When you open
                a website inside Weblet, that site and related network services
                process data under their own policies — the same way a normal
                browser does.
              </p>
            </section>

            <section id="collect">
              <h2>2. Information we collect</h2>
              <h3>Stored only on your device</h3>
              <ul>
                <li>
                  <strong>Lite Apps</strong> — names, URLs, icons, and per-app
                  settings you create
                </li>
                <li>
                  <strong>Bookmarks</strong> — pages you save from the browser
                </li>
                <li>
                  <strong>App settings</strong> — theme preference and similar
                  options
                </li>
                <li>
                  <strong>Website data</strong> — cookies, cache, and local site
                  storage for sites you visit in the WebView (when cookies are
                  allowed)
                </li>
              </ul>
              <h3>Not collected by Weblet</h3>
              <ul>
                <li>No Weblet user accounts or login profiles</li>
                <li>No advertising identifiers sold or shared by Weblet</li>
                <li>
                  No Weblet analytics, crash, or marketing SDKs in the current
                  app
                </li>
                <li>No payment or purchase information</li>
              </ul>
            </section>

            <section id="use">
              <h2>3. How we use information</h2>
              <p>Data kept on your device is used only to:</p>
              <ul>
                <li>Show your Lite Apps grid and bookmarks</li>
                <li>Apply theme, privacy, and browsing preferences</li>
                <li>
                  Keep website sessions working when cookies are enabled
                </li>
                <li>
                  Support features such as home-screen shortcuts on Android
                </li>
              </ul>
              <p>
                Weblet does not sell personal information and does not use your
                Lite Apps or bookmarks for advertising.
              </p>
            </section>

            <section id="third-parties">
              <h2>4. Third-party services</h2>
              <p>
                Opening a site in Weblet sends requests to that site’s servers.
                Those operators decide what they collect (pages viewed, cookies,
                accounts, and so on). Please review each site’s privacy policy.
              </p>
              <p>Weblet may also contact these services for core features:</p>
              <ul>
                <li>
                  <strong>Search</strong> — address-bar searches may be sent to
                  Google Search
                </li>
                <li>
                  <strong>Favicons</strong> — site icons may be loaded via
                  Google’s favicon service so Lite Apps and bookmarks can show
                  an icon
                </li>
              </ul>
              <p>
                Google and other third parties process those requests under their
                own terms and privacy policies. Weblet does not control their
                practices.
              </p>
            </section>

            <section id="storage">
              <h2>5. Storage &amp; security</h2>
              <p>
                Lite Apps, bookmarks, and settings are stored locally using
                on-device storage (AsyncStorage). Website cookies and cache live
                in the app’s WebView storage for each Lite App, subject to your
                privacy toggles.
              </p>
              <p>
                No method of electronic storage is perfectly secure. You can
                reduce retained website data with the in-app controls described
                below, or by uninstalling the app, which removes local Weblet
                data from the device.
              </p>
            </section>

            <section id="choices">
              <h2>6. Your choices</h2>
              <p>In each Lite App’s settings you can:</p>
              <ul>
                <li>
                  <strong>Allow cookies</strong> — turn cookie storage on or off
                </li>
                <li>
                  <strong>Block third-party cookies</strong> — limit cross-site
                  cookie tracking where supported
                </li>
                <li>
                  <strong>Clear data when the app closes</strong> — wipe cookies
                  and cache when you leave that Lite App
                </li>
                <li>
                  <strong>Clear website data</strong> — remove cookies and
                  cached data for that Lite App at any time
                </li>
              </ul>
              <p>
                In Weblet Settings you can also use{' '}
                <strong>Reset all data</strong> to remove Lite Apps, bookmarks,
                and stored app preferences from the device.
              </p>
            </section>

            <section id="children">
              <h2>7. Children’s privacy</h2>
              <p>
                Weblet is a general-purpose browser-style app and is not directed
                at children under 13 (or the equivalent minimum age in your
                region). We do not knowingly collect personal information from
                children through a Weblet account or Weblet server, because
                Weblet does not provide those services.
              </p>
              <p>
                Guardians should supervise browsing, because websites opened in
                Weblet may collect their own data.
              </p>
            </section>

            <section id="changes">
              <h2>8. Changes to this policy</h2>
              <p>
                We may update this Privacy Policy when the app’s features or
                legal requirements change. The “Effective” date at the top will
                be revised when we publish updates. Continued use of Weblet after
                a change means you accept the updated policy.
              </p>
            </section>

            <section id="contact">
              <h2>9. Contact</h2>
              <p>
                Questions about this Privacy Policy or Weblet’s privacy practices
                can be sent to:
              </p>
              <p className="contact-card">
                <span className="contact-label">Email</span>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>
            </section>
          </article>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <p>© {new Date().getFullYear()} Weblet. All rights reserved.</p>
          <p className="footer-note">Local-first Lite Apps Browser</p>
        </div>
      </footer>
    </div>
  )
}

export default App
