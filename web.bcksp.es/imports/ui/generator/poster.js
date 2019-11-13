/*----------------------------------------*\
  bcksp.es - poster.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2019-02-10 15:11:10
  @Last Modified time: 2019-05-19 12:21:19
\*----------------------------------------*/
import T from './../../i18n/index.js';
import React, { Component } from 'react';
import { lerp } from "./../../utilities/math.js";

export default class GeneratorPoster extends Component {
  constructor(props){
    super(props);
    let width = 210 * 2;
    let height = 297 * 2;
    this.state = {
      width,
      height,
      shapes : props.shapes || this.createShapes(width, height)
    };
  }
  createShapes(width, height){
    let shapes = (new Array(10)).fill(0).map((e, k)=>{
      let sw = Math.random();
      let sx = Math.random();
      let sy = Math.random();
      let sz = Math.random();
      return {
        key : k,
        x : width * sx,
        y : height * sy,
        width : width * sx * sw,
        height : height * sy * sz,
        color : "#"+ Math.floor(sx * sy * 16777215).toString(16),
        rotate : 180 * sx * sy
      }
    });
    _.isFunction(this.props.onShapes) && this.props.onShapes(shapes);
    return shapes;
  }
  genAnother(event){
    event.preventDefault();
    this.setState({
      shapes : this.props.shapes || this.createShapes(this.state.width, this.state.height)
    });
    return false;
  }
  render(){
    let ratio = this.props.sentence.length / 200;
    let size = lerp(50, 10, Math.pow(ratio, 0.35));
    return (
      <div className="generator">
        <div className="generator__preview">
          <div className="generator__preview-img"
            data-design-poster={JSON.stringify({
              fontSize : size,
              lineHeight : size,
              shapes : this.state.shapes,
              sentence : this.props.sentence
            })}
            style={{
              position:"relative",
              width : this.state.width,
              height : this.state.height,
              boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
              overflow : "hidden"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 420 594">
              {
                this.state.shapes.map(shape=>(
                   <rect
                    key={shape.key}
                    width={shape.width}
                    height={shape.height}
                    fill={shape.color}
                    transform={"translate("+(shape.x + shape.width * 0.5)+", "+(shape.y + shape.height * 0.5)+") rotate("+shape.rotate+" 0 0)"}
                   />
                ))
              }
            </svg>
            <div
              style={{
                position: "absolute",
                width: "71%",
                top: "28%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: size+"px",
                lineHeight: size+"px",
                textAlign: "center",
                overflowWrap: "break-word",
              }}
            >
              <div style={{textAlign: "left"}}>«</div>
              {this.props.sentence}
              <div style={{textAlign: "right"}}>»</div>
            </div>
            <div
              style={{
                position: "absolute",
                width: "71%",
                bottom: "1%",
                right: "1%",
                fontSize: "3px",
                lineHeight: "4px",
                textAlign: "right",
                overflowWrap: "break-word",
              }}
            >
              <T>souvenir.item.poster.text</T>
            </div>
          </div>
          {
            !this.props.disallowRegenerate &&
              <button className="button button--transparent generator__button-new-layout" onClick={this.genAnother.bind(this)}>
                <svg className="generator__button-new-layout-icon" width="95" height="105" viewBox="0 0 95 105" xmlns="http://www.w3.org/2000/svg"><title>Slice 1</title><path d="M93.693 25.113l-1.163-1.345c-.317-.367-.549-.338-.71-.327l-10.504.792-.002.001-2.753.143a.532.532 0 0 0-.494.426l-.6 2.96c0 .004.002.006.001.01l-.331 1.619-1.708 8.626c-.034.158-.096.383.22.75l1.164 1.344c.402.465 1.105.241 1.24-.345l2.04-10.704c6.419 7.53 10.3 17.286 10.3 27.934 0 23.78-19.348 43.128-43.128 43.128-23.781 0-43.128-19.347-43.128-43.128 0-23.371 18.687-42.454 41.903-43.106v9.092c0 .356.295.647.656.647h1.805c.36 0 .656-.29.656-.647V1.647A.654.654 0 0 0 48.501 1h-1.805a.654.654 0 0 0-.656.647v9.107C21.094 11.407 1 31.896 1 56.997c0 25.51 20.754 46.264 46.265 46.264 25.51 0 46.264-20.754 46.264-46.264 0-11.448-4.182-21.935-11.095-30.021l10.738-.686c.6-.049.922-.712.52-1.177" stroke="#231F20" strokeWidth="2" fill="#231F20" fillRule="evenodd"/></svg>
                <span className="sr-only">Another</span>
              </button>
          }
        </div>
      </div>
    );
  }
}