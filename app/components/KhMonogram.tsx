/**
 * KH monogram, traced from the company logo into a single path so it stays
 * crisp at any size and weighs ~440 bytes.
 *
 * Inlined rather than referenced with <img>: inside an <img> the SVG is an
 * isolated document, so `currentColor` has nothing to resolve against and the
 * mark renders invisible. Inline, `color` on the element drives the fill.
 */
export function KhMonogram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 233 231" fill="currentColor" fillRule="evenodd" aria-hidden="true" focusable="false">
      <path d="M158 0 L233 0 L233 231 L99 231 L62 147 L61 198 L35 198 L34 35 L59 35 L59 89 L84 35 L111 35 L78 116 L116 205 L209 206 L209 24 L158 24 Z M0 1 L144 1 L145 108 L174 108 L174 36 L199 36 L199 198 L173 197 L173 128 L147 128 L147 197 L123 198 L123 24 L23 24 L23 209 L75 209 L84 230 L0 230 Z" />
    </svg>
  );
}
