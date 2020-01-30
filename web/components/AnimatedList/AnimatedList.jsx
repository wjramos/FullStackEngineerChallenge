import React from 'react';
import { Trail } from 'react-spring/renderprops'

import { animated } from 'react-spring';

export default function AnimatedList({ items = [], getKeys, renderItem, ...restProps }) {
  return (
    <ul {...restProps}>
      <Trail
        items={items}
        keys={getKeys}
        config={{ mass: 5, tension: 2000, friction: 200 }}
        from={{
          opacity: 0,
          x: -50,
          height: 0,
        }}
        to={{
          opacity: 1,
          x: 0,
          height: 'fit-content',
        }}
      >
        {item => style => (
          <animated.li style={style}>
            {renderItem ? renderItem(item) : item}
          </animated.li>
        )}
      </Trail>
    </ul>
  )
}