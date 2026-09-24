import useReveal from '../hooks/useReveal';

/**
 * Wraps children in an element that fades/slides into view on scroll.
 * `as` changes the wrapper tag, `delay` staggers groups of items, and any
 * Tailwind classes passed via `className` are merged onto the same node.
 */
export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
