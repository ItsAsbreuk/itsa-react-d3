'use strict';

var React = require('react');
var d3 = require('d3');
var BarContainer = require('./BarContainer.jsx');

module.exports = React.createClass({

  displayName: 'DataSeries',

  propTypes: {
    _data:          React.PropTypes.array,
    series:         React.PropTypes.array,
    colors:         React.PropTypes.func,
    colorAccessor:  React.PropTypes.func,
    height:         React.PropTypes.number,
    width:          React.PropTypes.number,
    valuesAccessor: React.PropTypes.func,
  },

  render() {
    return (
      <g>{this._renderBarSeries()}</g>
    );
  },

  _renderBarSeries() {
    var { _data, valuesAccessor } = this.props;
    return _data.map((layer, seriesIdx) => {
      return valuesAccessor(layer)
             .map((segment, i) => this._renderBarContainer(segment, seriesIdx, i))
    });
  },

  _renderBarContainer(segment, seriesIdx, index) {
    console.warn('seriesIdx', seriesIdx);
    console.warn('segment', segment);
    console.warn('rangeRoundBandsPadding', this.props.rangeRoundBandsPadding);
    var { colors, colorAccessor, height, hoverAnimation, xScale, yScale, rangeRoundBandsPadding } = this.props;
    var barHeight = Math.abs(yScale(0) - yScale(segment.y));
    // var y = yScale( segment.y0 + segment.y );
    var y = yScale( segment.y0 );
    // var y = yScale( segment.y0 + segment.y ) + ;
    var barWidth = xScale.rangeBand();
    var spaceBetween = Math.round(rangeRoundBandsPadding*barWidth);
    return (
      <BarContainer
        width={barHeight}
        height={barWidth}
        // x={xScale(segment.x)}
        x={(segment.y >= 0) ? y : y - barHeight}
        y={(index===0) ? Math.round(1.5*spaceBetween) : xScale(index+1)}
        // y={Math.round( spaceBetween + (index * (barWidth+spaceBetween)  ))}
        // x={xScale(segment.x)}
        fill={colors(colorAccessor(segment, seriesIdx))}
        hoverAnimation={hoverAnimation}
        onMouseOver={this.props.onMouseOver}
        onMouseLeave={this.props.onMouseLeave}
        dataPoint={{xValue: segment.x, yValue: segment.y, seriesName: this.props.series[seriesIdx]}}
      />
    )
  }

  // _renderBarContainer(segment, seriesIdx) {
  //   var { colors, colorAccessor, height, hoverAnimation, xScale, yScale } = this.props;
  //   var barHeight = Math.abs(yScale(0) - yScale(segment.y));
  //   var y = yScale( segment.y0 + segment.y );
  //   return (
  //     <BarContainer
  //       height={barHeight}
  //       width={xScale.rangeBand()}
  //       x={xScale(segment.x)}
  //       y={(segment.y >= 0) ? y : y - barHeight}
  //       fill={colors(colorAccessor(segment, seriesIdx))}
  //       hoverAnimation={hoverAnimation}
  //       onMouseOver={this.props.onMouseOver}
  //       onMouseLeave={this.props.onMouseLeave}
  //       dataPoint={{xValue: segment.x, yValue: segment.y, seriesName: this.props.series[seriesIdx]}}
  //     />
  //   )
  // }

});
