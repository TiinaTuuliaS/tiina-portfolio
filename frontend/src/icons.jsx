const paths = {
  up: <><path d="M12 19V5" /><path d="m6 11 6-6 6 6" /></>,
  down: <><path d="M12 5v14" /><path d="m18 13-6 6-6-6" /></>,
  left: <><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></>,
  'up-right': <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>,
}

export function ArrowIcon({ direction = 'up-right', className = '' }) {
  return <svg className={`arrow-icon ${className}`.trim()} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true" focusable="false">{paths[direction]}</svg>
}
