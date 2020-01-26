import React from 'react';
import { useTrail, animated } from 'react-spring';

const config = { mass: 5, tension: 2000, friction: 200 };

export default function AnimatedList({ children = [], ...restProps }) {
  const trail = useTrail(children.length, {
    config,
    opacity: 1,
    x: 0,
    height: 'auto',
    from: {
      opacity: 0,
      x: -50,
      height: 0,
    },
  });

  return (
    <div {...restProps}>
      {trail.map(({ x, height, ...rest }, index) => (
        <animated.div
          key={index}
          style={{
            ...rest,
            transform: x.interpolate(x => `translate3d(0, ${x}px, 0)`),
          }}>
          <animated.div style={{ height }}>
            {children[index]}
          </animated.div>
        </animated.div>
      ))}
    </div>
  )
}