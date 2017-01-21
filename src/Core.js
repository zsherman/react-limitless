import React, { PureComponent, PropTypes } from 'react';
import resizeDetector from "element-resize-detector";
import List from './List';

function getRowsPerWindow(height, rowHeight) {
  return Math.floor(height / rowHeight);
}

function getVisibleStart(scrollTop, rowHeight) {
  return Math.floor(scrollTop / rowHeight);
}

function getVisibleEnd(visibleStart, rowsPerWindow, total) {
  return Math.min(visibleStart + rowsPerWindow, total - 1);
}

function getRenderStart(scrollTop, rowHeight, overscan) {
  return Math.round(Math.max(0, Math.floor(scrollTop / rowHeight) - overscan));
}

function getRenderEnd(renderStart, rowsPerWindow, overscan, total) {
  return Math.round(Math.min(renderStart + rowsPerWindow + 2 * overscan, total - 1));
}

class Limitless extends PureComponent {

  static propTypes = {
    overscan: PropTypes.number,
    onScroll: PropTypes.func,
    height: PropTypes.number,
    width: PropTypes.number,
    renderRow: PropTypes.func,
    data: PropTypes.array
  }

  constructor(props) {
    super(props);

    // Bind instance methods
    this.onScroll = this.onScroll.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.getDefaultState = this.getDefaultState.bind(this);

    // Get initial state
    this.state = this.getDefaultState(props);

    // Set some static defaults
    this.running = false;
    this.last_known_scroll_position = 0;
  }

  getDefaultState(props) {
    const rowHeight = props.rowHeightEstimate;
    const rowsPerWindow = getRowsPerWindow(this.state ? this.state.height : 0, rowHeight);

    return {
      rowHeight,
      rowsPerWindow,
      data: props.data,
      total: props.data.length,
      visibleStart: 0,
      visibleEnd: rowsPerWindow,
      renderStart: 0,
      renderEnd: rowsPerWindow + props.overscan
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getDefaultState(nextProps));
  }

  componentDidMount() {
    // Allow overscrolling on load
    this.Limitless.scrollTop = 1;
    window.Limitless = this.Limitless;
    this.handleScroll(this.last_known_scroll_position);

    // Listen for element resizing to properly set height and width
    this.resizeDetector = resizeDetector();
    this.resizeDetector.listenTo(this.Limitless, this.handleResize);
  }

  componentWillUnmount() {
    this.resizeDetector = null;
  }

  handleResize(el) {
    const { rowHeight, total } = this.state;
    const { overscan, rowHeightEstimate } = this.props
    const scrollTop = this.Limitless.scrollTop;

    const rowsPerWindow = getRowsPerWindow(el.offsetHeight, rowHeightEstimate);
    const visibleStart = getVisibleStart(scrollTop, rowHeight);
    const visibleEnd = getVisibleEnd(visibleStart, rowsPerWindow, total);
    const renderStart = getRenderStart(scrollTop, rowHeight, overscan);
    const renderEnd = getRenderEnd(renderStart, rowsPerWindow, overscan, total);

    this.setState({
      width: el.offsetWidth,
      height: el.offsetHeight,
      visibleStart,
      visibleEnd,
      renderStart,
      renderEnd,
      rowsPerWindow
    });
    console.log("Size: " + el.offsetWidth + "x" + el.offsetHeight);
  }

  handleScroll(scrollTop, oldScrollTop, scrollHeight) {
    let { rowHeight, rowsPerWindow, total } = this.state;
    const { overscan, data } = this.props;

    total = data.length;

    // Determine which rows are visible
    const visibleStart = getVisibleStart(scrollTop, rowHeight);
    const visibleEnd = getVisibleEnd(visibleStart, rowsPerWindow, total);

    // Determine how aggressively to render rows
    // Defaults to 10 before and after aka overscan
    const renderStart = getRenderStart(scrollTop, rowHeight, overscan);
    const renderEnd = getRenderEnd(renderStart, rowsPerWindow, overscan, total);

    this.setState({
      visibleStart,
      visibleEnd,
      renderStart,
      renderEnd,
      total
    });
  }

  onScroll(e) {
    const { scrollTop, scrollHeight } = e.target;
    const oldScrollTop = this.last_known_scroll_position;

    if (!this.running) {
      window.requestAnimationFrame(() => {
        this.handleScroll(scrollTop, oldScrollTop, scrollHeight);
        this.running = false;
      });
    }

    this.last_known_scroll_position = scrollTop;
    this.running = true;
  }

  render() {
    const { data, renderRow } = this.props

    console.log(`visStart: ${this.state.visibleStart}, visEnd: ${this.state.visibleEnd}, renderStart: ${this.state.renderStart}, renderEnd: ${this.state.renderEnd}`)

    return (
      <div
        className="Limitless"
        style={{overflowY: "scroll"}}
        onScroll={this.onScroll}
        ref={(ref) => this.Limitless = ref}
      >
        <List
          data={data}
          total={this.state.total}
          visibleStart={this.state.visibleStart}
          visibleEnd={this.state.visibleEnd}
          renderStart={this.state.renderStart}
          renderEnd={this.state.renderEnd}
          rowHeight={this.state.rowHeight}
          renderRow={renderRow}
        />
      </div>
    );
  }
}

Limitless.defaultProps = {
  overscan: 20
};

export default Limitless;