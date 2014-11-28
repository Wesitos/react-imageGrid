'use strict';

var ImageGrid = React.createClass({
    propTypes: {
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        data: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                src: React.PropTypes.string,
                text: React.PropTypes.string
            })),

        imageRatio: React.PropTypes.number,
        imageMaxWidth: React.PropTypes.number.isRequired,
        imageMinWidth: React.PropTypes.number.isRequired
    },
    getDefaultProps: function(){
        return{
            imageRatio: 1
        };
    },
    render: function(){
        var gridStyle = {
            position: 'absolute'
        };
        var data = this.props.data;
        var gridWidth = this.props.width;
        var imgMaxWidth = this.props.imageMaxWidth;
        var imgMinWidth = this.props.imageMinWidth;
        var numColumns = Math.floor(gridWidth/ imgMinWidth);
        var imgWidth = gridWidth/numColumns;
        if (imgWidth>imgMaxWidth) imgWidth = imgMaxWidth;
        var imgHeight = imgWidth*this.props.imageRatio;

        var i = 0;
        var j = 0;
        var imageList = data.map(function(item){
            if (j == numColumns){ j=0; i++;};
            var position = {
                x: j*imgWidth,
                y: i*imgHeight
            };
            j++;
            var imageProps = {
                width: imgWidth,
                height: imgHeight,
                position: position
            };
            return <ImageCell {...imageProps} {...item}/>;
        });

        return (
            <div style={gridStyle}>
                {imageList}
            </div>
        );
    }

});

var ImageCell = React.createClass({
    propTypes: {
        src: React.PropTypes.string,
        href: React.PropTypes.string,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        title: React.PropTypes.string,
        subtitle: React.PropTypes.string,
        position: React.PropTypes.shape({
            x: React.PropTypes.number,
            y: React.PropTypes.number
        })
    },
    getDefaultProps: function(){
        return{
            src:'http://placehold.it/200x200',
            href: '#',
            text: ''
        };
    },
    onMouseEnterHandler: function(event){
        this.refs.overLayer.getDOMNode().style.opacity = 1;
    },
    onMouseLeaveHandler: function(event){
        this.refs.overLayer.getDOMNode().style.opacity = 0;
    },
    render: function(){
        var wrapStyle = {
            position: "absolute",
            left: this.props.position.x,
            top: this.props.position.y,
            width: this.props.width,
            height: this.props.height,

            WebkitTransitionDuration: '0.8s',
            MozTransitionDuration: '0.8s',
            OTransitionDuration: '0.8s',
            transitionDuration: '0.8s',

            WebkitTransitionProperty: ['top','left','width','height'],
            MozTransitionProperty: ['top','left','width','height'],
            OkitTransitionProperty: ['top','left','width','height'],
            transitionProperty: ['top','left','width','height']

        };
        var imgProps = {
            src: this.props.src,
            width: '100%',
            height: '100%'

        };
        var overLayerStyle = {
            WebkitTransition: 'opacity 0.5s ease-in-out',
            MozTransition: 'opacity 0.5s ease-in-out',
            OTransition: 'opacity 0.5s ease-in-out',
            transition: 'opacity 0.5s ease-in-out',
            opacity: 0
        };
        var shadowStyle = {
            backgroundColor: 'black',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: this.props.width,
            height: this.props.height,
            opacity: 0.4,
            filter: 'alpha(opacity=40)'
        };
        var captionStyle = {
            position: 'absolute',
            bottom: '5%',
            left: '5%'
        };
        var titleStyle = {
            color: 'white'
        };
        var linkStyle = {
            position: 'absolute',
            width: this.props.width,
            height: this.props.height,
            bottom: 0,
            left: 0
        };
        return(
            <div style={wrapStyle}
                 onMouseEnter={this.onMouseEnterHandler}
                 onMouseLeave={this.onMouseLeaveHandler}>
                <img {...imgProps}/>
                <div ref='overLayer' style={overLayerStyle}>
                    <div style={shadowStyle}></div>
                    <div style={captionStyle}>
                        <p style={titleStyle}>{this.props.title}</p>
                        <p>{this.props.subtitle}</p>
                    </div>
                    <a href={this.props.href}
                       style={linkStyle}></a>
                </div>
            </div>
        );
    }
});
