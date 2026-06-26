// Server component (no 'use client' needed — it renders a plain <script> tag).
// Injected BEFORE paint — reads localStorage or system preference
// and sets the `dark` class on <html> with zero flash of the wrong theme.
export function ThemeScript() {
  const script = `
    (function () {
      try {
        var stored = localStorage.getItem('theme');
        var sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        var theme = stored || sys;
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `
  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  )
}