// utils/scrollToTop.js
// Shared same-path scroll-to-top handler, used by Navbar and Footer links.
// If the clicked link points to the page already active, prevent the
// default navigation (which would be a no-op) and smooth-scroll up instead.

export const scrollToTop = (e, currentPath, targetPath) => {
  if (currentPath === targetPath) {
    e.preventDefault()

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
}
