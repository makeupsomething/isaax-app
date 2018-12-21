import React, { useState, useEffect, Fragment, } from 'react'
import { Text, ScrollView, TouchableHighlight } from 'react-native';
import { HeaderWrapper, HeaderText, SubHeader } from './Header'
import { CardWrapper, Label, Value } from './DetailsCard'
import { ItemCardWrapper, ItemCardText } from './ItemCard'
import * as api from '../utils/api';
import dayjs from 'dayjs'
import Container from './Container'

function ProjectInfo(props) {
    const {itemId} = props
    const [project, setProject] = useState(null);

    useEffect(() => {
        api.get(`/projects/${itemId}`)
        .then((response) => {
            setProject(response)
        })
    }, []);

    
    if(project) {
        return (
            <Fragment>
                <HeaderWrapper backgroundColor="#97a7c3"> 
                    <HeaderText>
                        Project: {project.name}
                    </HeaderText>
                </HeaderWrapper>
                <CardWrapper>
                    <Label>Project ID:</Label>
                    <Value>{project.id}</Value>
                    <Label>Created At:</Label>
                    <Value>{dayjs(project.createdAt).format('DD/MM/YYYY hh:mm:ss')}</Value>
                    <Label>Repo Path:</Label>
                    <Value>{project.repoPath}</Value>
                </CardWrapper>
            </Fragment>
        )
    } else {
        return <Text>Loading...</Text>
    }
}

function ClusterList({props}) {

    const {navigation} = props;
    const {navigate} = props.navigation;
    const itemId = navigation.getParam('id');
    const [clusters, setClusters] = useState([]);

    useEffect(() => {
        api.get(`/clusters?projectId=${itemId}`)
        .then((response) => {
            setClusters(response)
        })
    }, []);

    return (
        <Fragment>
            <SubHeader>Clusters</SubHeader>
            <ScrollView>
                {clusters.map(cluster => {
                    return (
                    <TouchableHighlight
                        key={cluster.id}
                        onPress={() => navigate('ClusterDetails', {id: cluster.id})}
                    >
                        <ItemCardWrapper borderColor="#355998">
                            <ItemCardText>{cluster.title}</ItemCardText>
                        </ItemCardWrapper>
                    </TouchableHighlight>
                    )
                })}
            </ScrollView>
        </Fragment>
    )
}

export default function ProjectDetails(props) {
    const {navigation} = props;
    const itemId = navigation.getParam('id');

    return (
        <Container>
            <ProjectInfo itemId={itemId} />
            <ClusterList props={props} />
        </Container>
    );
}