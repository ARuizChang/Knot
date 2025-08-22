import { useEffect } from 'react'
import { useThemeStore } from '../store/useThemeStore.js'
import { THEMES, themeColors } from "../constants"

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey there!", isSent: false },
  { id: 2, content: "How is it going?", isSent: true },
]

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore()

  useEffect(() => {
    const colors = themeColors[theme]
    const root = document.documentElement

    root.classList.add('theme-transition')
    for (const key in colors) {
      root.style.setProperty(key, colors[key])
    }

    const timeout = setTimeout(() => root.classList.remove('theme-transition'), 300)
    return () => clearTimeout(timeout)
  }, [theme])

  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300 min-h-screen flex items-center justify-center py-10">
      <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl transition-colors duration-300">
        <div className="space-y-6">
          {/* Theme Selector */}
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-[var(--color-text)] transition-colors duration-300">Theme</h2>
            <p className="text-sm text-[var(--color-text)]/70 transition-colors duration-300">
              Choose a theme for your chat interface
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
            {THEMES.map((t) => {
              const colors = themeColors[t]
              return (
                <button
                  key={t}
                  className={`
                  group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors duration-300
                  ${theme === t ? "bg-[var(--color-card)]" : "hover:bg-[var(--color-card)]/50"}
                `}
                  onClick={() => setTheme(t)}
                >
                  <div className="relative h-5 w-full rounded-md overflow-hidden transition-all duration-300">
                    <div className="absolute inset-0 grid grid-cols-6 gap-px p-1">
                      <div className="rounded" style={{ backgroundColor: colors['bg'], transition: 'background-color 0.3s' }}></div>
                      <div className="rounded" style={{ backgroundColor: colors['text'], transition: 'background-color 0.3s' }}></div>
                      <div className="rounded" style={{ backgroundColor: colors['accent'], transition: 'background-color 0.3s' }}></div>
                      <div className="rounded" style={{ backgroundColor: colors['secondary'], transition: 'background-color 0.3s' }}></div>
                      <div className="rounded" style={{ backgroundColor: colors['card'], transition: 'background-color 0.3s' }}></div>
                      <div className="rounded" style={{ backgroundColor: colors['border'], transition: 'background-color 0.3s' }}></div>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium truncate w-full text-center text-[var(--color-text)] transition-colors duration-300">
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                </button>
              )
            })}
          </div>
          
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text)] transition-colors duration-300">Preview</h3>
          <div className="rounded-xl border transition-colors duration-300 border-[var(--color-border)] bg-[var(--color-bg)]">
            <div className="p-4 transition-colors duration-300 bg-[var(--color-card)]">
              <div className="max-w-lg mx-auto">
                {/* Mock Chat UI */}
                <div className="rounded-xl shadow-sm overflow-hidden transition-colors duration-300 bg-[var(--color-bg)]">
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-b flex items-center gap-3 transition-colors duration-300 border-[var(--color-border)] bg-[var(--color-card)]">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors duration-300 bg-[var(--color-accent)] text-[var(--color-bg)]">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-[var(--color-text)] transition-colors duration-300">John Doe</h3>
                      <p className="text-xs text-[var(--color-text)]/70 transition-colors duration-300">Online</p>
                    </div>
                  </div>

                  <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto text-[var(--color-text)] transition-colors duration-300">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div key={message.id} className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-xl p-3 shadow-sm transition-colors duration-300`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-[10px] mt-1.5">
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t transition-colors duration-300 border-[var(--color-border)] bg-[var(--color-card)]">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 text-sm h-10 border rounded px-3 focus:outline-none focus:ring transition-colors duration-300 bg-[var(--color-bg)] text-[var(--color-text)] border-[var(--color-border)]"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button
                        className="h-10 min-h-0 rounded px-4 font-medium transition-colors duration-300 bg-[var(--color-accent)] text-[var(--color-bg)] hover:bg-[var(--color-accent)]/90 flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
