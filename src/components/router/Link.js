import React,{Component} from 'react'

export class Link extends Component {
 static contextTypes = {
 	route : React.PropTypes.string,
 	linkHandler : React.PropTypes.func
 }

	handleClick = (evt) => {
	evt.preventDefault()
     // window.history.pushState(null,'',this.props.to)
     this.context.linkHandler(this.props.to)
	}
	render(){
		const activeClass = this.context.route === this.props.to ? 'active' : ''

		// return <a href="#" onClick={this.handleClick}>{this.props.children}</a>
		return <a href="#" className={activeClass} onClick={this.handleClick}>{this.props.children}</a>
	}
}


Link.protoTypes = {
	to : React.PropTypes.string.isRequired
}