import React, { useState, useEffect, Fragment } from 'react'
import { TouchableHighlight, ScrollView } from 'react-native'
import { SubHeader } from './Header'
import { ItemCardWrapper, ItemCardText } from './ItemCard'
import * as api from '../utils/api'
import Container from './Container'

function ProjectList(props) {
    const {navigate} = props.navigation;
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects')
        .then((response) => {
            setProjects(response)
        })
    }, []);

    return (
        <ScrollView>
            {projects.map(project => {
                return (
                <TouchableHighlight
                    key={project.id}
                    onPress={() => navigate('ProjectDetails', {id: project.id})}
                >
                    <ItemCardWrapper borderColor="#97a7c3">
                        <ItemCardText>{project.name}</ItemCardText>
                    </ItemCardWrapper>
                </TouchableHighlight>
                )
            })}
        </ScrollView>
    )
}

export default class Projects extends React.Component {
    static navigationOptions = {
        title: 'Projects',
    };
    render() {
        return (
        <Fragment>
            <Container>
                <SubHeader>
                    Projects
                </SubHeader>
                <ProjectList navigation={this.props.navigation} />
            </Container>
        </Fragment>
        );
    }
}