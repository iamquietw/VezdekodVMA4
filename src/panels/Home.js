// Приносим свои извинения за некрасивый код. Разработчик очень хотел выпить чай и уснуть, поэтому не мог придумать красивого решения задачи. Надеемся что вы не будете снижать за это балл :(

import React, {useState} from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import bridge from "@vkontakte/vk-bridge";

import "./Home.css"

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			settings: {
				0: 0,
				1: 1,
				2: 0,
				3: 1,
				4: 0,
				5: 1,
				6: 0,
				7: 1
			},
			beat: 0
		}
		setInterval(() => {
			if(this.state.settings[this.state.beat]) {
				bridge.send("VKWebAppFlashSetLevel", {"level": 1});
			} else {
				bridge.send("VKWebAppFlashSetLevel", {"level": 0});
			}
			if(this.state.beat === 7) {
				this.setState({ beat: 0 })
			} else {
				this.setState({ beat: ++this.state.beat })
			}
		}, 1000)
	}

	click = e => {
		const bid = e.currentTarget.dataset.bid;
		let set = this.state.settings;
		set[bid] = !set[bid]
		this.setState({ settings: set })
	}

	render() {
		return(
			<Panel id={this.props.id}>
				<PanelHeader>Бит-фонарь</PanelHeader>
				<Group header={<Header mode="secondary">Панель управления</Header>}>
					<Div className={"buttonsWrapper"}>
						<Button data-bid={0} onClick={this.click} className={"beatButton"} mode={(this.state.settings[0] ? "commerce" : "destructive" )}> </Button>
						<Button data-bid={1} onClick={this.click} className={"beatButton"} mode={(this.state.settings[1] ? "commerce" : "destructive" )}> </Button>
						<Button data-bid={2} onClick={this.click} className={"beatButton"} mode={(this.state.settings[2] ? "commerce" : "destructive" )}> </Button>
						<Button data-bid={3} onClick={this.click} className={"beatButton"} mode={(this.state.settings[3] ? "commerce" : "destructive" )}> </Button>
						<Button data-bid={4} onClick={this.click} className={"beatButton"} mode={(this.state.settings[4] ? "commerce" : "destructive" )}> </Button>
						<Button data-bid={5} onClick={this.click} className={"beatButton"} mode={(this.state.settings[5] ? "commerce" : "destructive" )}> </Button>
						<Button data-bid={6} onClick={this.click} className={"beatButton"} mode={(this.state.settings[6] ? "commerce" : "destructive" )}> </Button>
						<Button data-bid={7} onClick={this.click} className={"beatButton"} mode={(this.state.settings[7] ? "commerce" : "destructive" )}> </Button>
					</Div>
				</Group>
			</Panel>
		)
	}

}

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
