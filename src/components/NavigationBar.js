import * as React from "react";
import {NavLink, useHistory} from "react-router-dom";

class NavigationBar extends React.Component{


	render(){
		return(
			<div style={{margin: '5px', display: 'flex', justifyContent: 'space-around'}}>
				<NavLink style={{margin: '5px'}} to="/" exact className={"link"} activeClassName={"active"}>
					Message List
				</NavLink>
				<NavLink style={{margin: '5px'}} to="/create-message" className={"link"} activeClassName={"active"}>
					Create Message
				</NavLink>
				<button style={{cursor: 'pointer', backgroundColor: "lightgray"}} onClick={this.props.logout}>Logout</button>
			</div>
		)
	}
};

export default NavigationBar;