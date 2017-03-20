'use strict';

var React = require('react');

module.exports = React.createClass({

  propTypes: {
    fill: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    serienr: React.PropTypes.number,
    indexnr: React.PropTypes.number,
    className: React.PropTypes.string,
    showValues:     React.PropTypes.bool,
    valueTextFill:  React.PropTypes.string,
    valueTextFormatter: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      offset: 0,
      className: 'rd3-vertbarchart-bar',
      showLabels: false,
      valueTextFill: 'white'
    };
  },

  renderLabel() {
    // make value text can be formatted
    var props = this.props;
    var formattedValue = props.valueTextFormatter(props.value);
    var x = props.x+Math.round(props.width/2);
    var y = props.y+Math.round(props.height/2);
    return (
        <text
          className='rd3-vertbarchart-value'
          transform={'translate('+x+', '+y+')'}
          dy='.35em'
          style={{
            'shapeRendering': 'crispEdges',
            'textAnchor': 'middle',
            'fill': props.valueTextFill
          }}>
          { formattedValue }
        </text>
      );
  },

  render() {
    const classname = 'rd3-vertbarchart-bar-cont serie-'+this.props.serienr+' index-'+this.props.indexnr;
    return (
      <g className={classname}>
        <rect
          className='rd3-vertbarchart-bar'
          {...this.props}
          fill={this.props.fill}
          onMouseOver={this.props.handleMouseOver}
          onMouseLeave={this.props.handleMouseLeave}
        />
        {this.props.showValues ? this.renderLabel() : null}
      </g>
    );
  }
});
