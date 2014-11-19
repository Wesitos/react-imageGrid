"use strict";

var ImageGrid = React.createClass({
  getDefaultProps: function(){
    return{
      data: [],
      imgRatio: 1,
      imgMaxWidth: 300,
      imgMinWidth: 200,
      style: {
        position: "absolute",
        left: "auto",
        top: 0,
      },
    };
  },
  getInitialState: function(){
    return{
      width: 0,
    };    
  },
  render: function(){
    // Primer renderizado
    if (! this.isMounted()){
      var style = React.addons.update(this.props.style,
       {position: {$set: "relative"}});
      return(
        <div id="imageGrid" style={style}
             ref="divNode">
        </div>
      );
    };

    var data = this.props.data;
    var gridWidth = this.state.width;
    var imgMaxWidth = this.props.imgMaxWidth;
    var imgMinWidth = this.props.imgMinWidth;
    var numColumns = Math.floor(gridWidth/ imgMinWidth);
    var imgWidth = gridWidth/numColumns;
    if (imgWidth>imgMaxWidth) imgWidth = imgMaxWidth;
    var i = 0;
    var j = 0;
    var imgProps = { width: imgWidth,
                     height: imgWidth * this.props.imgRatio};
    var imageList = this.props.data.map(function(child){
      var imgCoords = {x: i, y: j};
      i++;
      if (i == numColumns){
        i = 0;
        j++;
      };
      return <ImageCell {...child}
                        {...imgProps}
                        imgCoords={imgCoords}
                        />;
    });
    return(
      <div id="imageGrid"
           ref="divNode"
           style={this.props.style}>
        {imageList}
      </div>
    );
  },
  getDivWidth: function(){
    var divNode = this.refs.divNode.getDOMNode();
    var rect = divNode.parentNode.getBoundingClientRect();
    this.setState({width:rect.width});
  },
  componentDidMount: function(){
    this.getDivWidth();
    window.addEventListener("resize", this.getDivWidth);
  },
});

var ImageCell = React.createClass({
  getDefaultProps:function(){
    return{
      src: "http://placehold.it/200x200",
      width: 200,
      height: 200,
      href: "#",
      title: "Placeholder text",
      subtitle: "something",
      imgCoords: {x: 0, y: 0},
    };
  },
  onClickHandler: function(event){
    window.location.href = this.props.href;
  },

  render: function(){
    var imgProps = { src: this.props.src,
                     width: this.props.width,
                     height: this.props.height,
                     style:{
                       
                     },
    };
    var imgCoords = this.props.imgCoords;
    var wrapProps = {style: { position: "absolute",
                              left: imgCoords.x * this.props.width,
                              top: imgCoords.y * this.props.height,
                              cursor: "pointer",
    },};
    var captionProps = {
      
    };
    return(
      
      <div className="imageCellWrap"
           {...wrapProps}
           onClick={this.onClickHandler}
           >
        <img className="imageCell"
             {...imgProps} />
        <div className="caption"
             {...captionProps}>
         <p>{this.props.title}</p>
         <span>{this.props.subtitle}</span>
        </div>
      </div>
    );
  },
});

