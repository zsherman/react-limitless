import React from 'react'
import classnames from 'classnames'

export default ({children, className, ...rest}) => (
  <div
    className={classnames('ReactLimitless', className)}
    {...rest}
  >
    {children}
  </div>
)
