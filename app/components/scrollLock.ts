let locks = 0;

/**
 * Ref-counted body scroll lock. The nav panel and the enquiry drawer can both be
 * open at once, so neither may unconditionally clear `overflow` on close.
 *
 * `html { overflow-x: clip }` keeps <html> as the scroll container, so hiding
 * the body's overflow stops scrolling without removing the scrollbar and
 * nothing shifts. No width compensation is needed.
 *
 * Returns the matching release function.
 */
export function lockBodyScroll() {
  locks += 1;
  if (locks === 1) {
    document.body.style.overflow = "hidden";
  }

  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks = Math.max(locks - 1, 0);
    if (locks === 0) {
      document.body.style.overflow = "";
    }
  };
}
