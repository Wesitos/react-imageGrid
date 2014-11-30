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
            imageRatio: 1,
            height: 'auto'
        };
    },
    render: function(){
        var data = this.props.data;
        var gridWidth = this.props.width;
        var gridHeight = this.props.height;
        var imgMaxWidth = this.props.imageMaxWidth;
        var imgMinWidth = this.props.imageMinWidth;
        var numColumns = Math.floor(gridWidth/ imgMinWidth);
        if (numColumns==0) numColumns = 1;
        var imgWidth = gridWidth/numColumns;
        if (imgWidth>imgMaxWidth) imgWidth = imgMaxWidth;
        var imgHeight = imgWidth*this.props.imageRatio;

        var imageList = [];
        for (var k = 0; k < data.length; k++){
            var i = k % numColumns;
            var j = Math.floor(k/numColumns);
            var position = {
                x: i*imgWidth,
                y: j*imgHeight
            };
            if (gridHeight!== 'auto' && position.y + imgHeight > gridHeight){
                break;
            };
            var imgKey = 'img-' + k;
            var imageProps = {
                key: imgKey,
                width: imgWidth,
                height: imgHeight,
                position: position
            };
            var component =  <ImageCell {...imageProps} {...data[k]}/>;
            imageList.push(component);
        };
        var gridHeightStyle;
        if(gridHeight ==='auto')
            gridHeightStyle = imgHeight*Math.ceil(data.length/numColumns);
        else
            gridHeightStyle = gridHeight;

        var gridStyle = {
            position: 'relative',
            width: gridWidth,
            height: gridHeightStyle
        };

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
            text: '',
            shadowColor: undefined,
            shadowOpacity: undefined
        };
    },
    onMouseEnterHandler: function(event){
        this.refs.overLayer.getDOMNode().style.opacity = 1;
    },
    onMouseLeaveHandler: function(event){
        this.refs.overLayer.getDOMNode().style.opacity = 0;
    },
    componentDidMount: function(){
        var self = this;
        setTimeout(function(){ self.forceUpdate();}, 0);
    },
    render: function(){
        var wrapStyle = {
            position: 'absolute',
            left: (this.isMounted()?this.props.position.x:0),
            top: this.props.position.y,
            width: this.props.width,
            height: this.props.height
        };
        var imgProps = {
            src: this.props.src,
            width: '100%',
            height: '100%'
        };
        var overLayerStyle = {
            opacity: 0
        };
        var shadowStyle = {
            backgroundColor: this.props.shadowColor,
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: this.props.width,
            height: this.props.height,
            opacity: this.props.shadowOpacity
        };
        var captionStyle = {
            position: 'absolute'
        };
        var linkStyle = {
            position: 'absolute',
            width: this.props.width,
            height: this.props.height,
            bottom: 0,
            left: 0
        };
        return(
            <div className='ImageGridCell'
                 style={wrapStyle}
                 onMouseEnter={this.onMouseEnterHandler}
                 onMouseLeave={this.onMouseLeaveHandler}>
                <img {...imgProps}/>
                <div className='imageGridOverLayer'
                     ref='overLayer'
                     style={overLayerStyle}>
                    <div className='imageGridShadow'
                         style={shadowStyle}></div>
                    <div className='imageGridCaption' style={captionStyle}>
                        <p className='imageGridCaptionTitle'>{this.props.title}</p>
                        <p className='imageGridCaptionSubtitle'>{this.props.subtitle}</p>
                    </div>
                    <a href={this.props.href}
                       style={linkStyle}></a>
                </div>
            </div>
        );
    }
});
