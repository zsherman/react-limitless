import React, { PropTypes } from 'react';

export class Limitless extends React.PureComponent {
  render() {
    return <div>React Limitless</div>;
  }
}

Limitless.propTypes = {
  className: PropTypes.string
};

Limitless.displayName = 'ReactLimitless';

export default Limitless;