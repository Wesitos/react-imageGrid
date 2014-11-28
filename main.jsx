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
        console.log(numColumns);
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
            text: ''
        };
    },
    render: function(){
        var imgProps = {
            src: this.props.src,
            width: this.props.width,
            height: this.props.height
        };
        var overLayerStyle = {
            backgroundColor: 'black',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.4,
            filter: 'alpha(opacity=40)'
        };
        var wrapStyle = {
            position: "absolute",
            left: this.props.position.x,
            top: this.props.position.y
        };
        var captionStyle = {
            position: 'absolute',
            bottom: '5%',
            left: '5%'
        };
        var titleStyle = {
            color: 'white'
        };
        return(
            <div style={wrapStyle}>
                <img {...imgProps}/>
                <div style={overLayerStyle}></div>
                <div style={captionStyle}>
                    <p style={titleStyle}>{this.props.title}</p>
                    <p>{this.props.subtitle}</p>
                </div>
            </div>
        );
    }
});
