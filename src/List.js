import React, { PureComponent, PropTypes } from 'react';

class List extends PureComponent {

  static propTypes = {
    data: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      shouldUpdate: true,
      total: 0,
      renderStart: 0,
      renderEnd: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    const shouldUpdate = !(
      nextProps.visibleStart >= this.state.renderStart &&
      nextProps.visibleEnd <= this.state.renderEnd
    ) || (nextProps.total !== this.state.total);

    if (shouldUpdate) {
      this.setState({
        shouldUpdate: shouldUpdate,
        total: nextProps.data.length,
        renderStart: nextProps.renderStart,
        renderEnd: nextProps.renderEnd
      });
    } else {
      this.setState({
        shouldUpdate: false
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.shouldUpdate;
  }

  render() {
    const {
      data,
      renderStart,
      renderEnd,
      rowHeight,
      renderRow
    } = this.props;

    let rows = [];

    // Simulate height of row elements above
    const spacerTopStyle = {
      height: renderStart * rowHeight || 0
    }

    // Simulate height of row elements below
    const spacerBottomStyle = {
      height: ((data.length - 1) - renderEnd) * rowHeight || 0
    }

    for (let i = renderStart; i <= renderEnd; i++) {
      let datum = data[i];
      const el = <div key={`limitless-${i}`}>{renderRow(i, datum)}</div>
      rows.push(el)
    }

    return (
      <div ref={(ref) => this.List = ref}>
        <div style={spacerTopStyle} />
        {rows}
        <div style={spacerBottomStyle} />
      </div>
    );
  }

}

export default List;
