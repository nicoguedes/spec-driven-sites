/**
 * Inline <head> script that sets the `dark` class BEFORE first paint, reading
 * localStorage / prefers-color-scheme. This prevents the flash of light theme
 * (FOUC) you'd otherwise get under static export.
 *
 * This MUST be a non-client module: it's called from the server-rendered root
 * layout to produce a `dangerouslySetInnerHTML` payload. (A `'use client'`
 * module's exports become client references and aren't callable on the server.)
 */
export function themeNoFlashScript() {
  return {
    __html: `(function(){try{var m=localStorage.getItem('theme');if(m==='dark'||(!m&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
  };
}
