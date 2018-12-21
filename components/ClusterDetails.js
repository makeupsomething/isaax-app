import React, { useState, useEffect, Fragment } from 'react'
import { Text, ScrollView, TouchableHighlight } from 'react-native';
import Container from './Container'
import { HeaderWrapper, HeaderText, SubHeader } from './Header'
import { ButtonWrapper, ButtonView, ButtonText } from './ActionButton'
import { CardWrapper, Label, Value } from './DetailsCard'
import { ItemCardWrapper, ItemCardText, StatusText } from './ItemCard'
import * as api from '../utils/api';
import dayjs from 'dayjs'

function OnlineIcon(props) {
    const {lastMessage} = props
    const date1 = dayjs(lastMessage);
    const date2 = dayjs();
    if(date2.diff(date1, 'second') < 100) { 
        return <StatusText color="green">Online</StatusText>
    } else {
        return <StatusText color="red">Offline</StatusText>
    }

}

function ClusterInfo(props) {
    const {itemId} = props
    const [cluster, setCluster] = useState(null);

    useEffect(() => {
        api.get(`/clusters/${itemId}`)
        .then((response) => {
            setCluster(response)
        })
    }, []);

    if(cluster) {
        return (
            <Fragment>
                <HeaderWrapper backgroundColor="#355998">
                    <HeaderText>
                        Cluster: {cluster.title}
                    </HeaderText>
                </HeaderWrapper>
                <CardWrapper>
                    <Label>Cluster ID:</Label>
                    <Value>{cluster.id}</Value>
                    <Label>Branch:</Label>
                    <Value>{cluster.branch}</Value>
                    <Label>Revision:</Label>
                    <Value>{cluster.revision}</Value>
                    <Label>Created At:</Label>
                    <Value>{dayjs(cluster.createdAt).format('DD/MM/YYYY hh:mm:ss')}</Value>
                    <Label>Updated At:</Label>
                    <Value>{dayjs(cluster.updatedAt).format('DD/MM/YYYY hh:mm:ss')}</Value>
                
                    <ButtonWrapper onPress={() => restartApplication(itemId)}>
                        <ButtonView>
                            <ButtonText>Restart Application</ButtonText>
                        </ButtonView>
                    </ButtonWrapper>
                </CardWrapper>
            </Fragment>
        )
    } else {
        return <Text>Loading...</Text>
    }
}

function DeviceList({props}) {
    const {navigation} = props;
    const {navigate} = props.navigation;
    const itemId = navigation.getParam('id');
    const [devices, setDevices] = useState([]);
    
    useEffect(() => {
        api.get(`/devices?clusterId=${itemId}`)
        .then((response) => {
            setDevices(response)
        })
    }, []);

    return (
        <Fragment>
            <SubHeader>Devices</SubHeader>
            <ScrollView>
                {devices.list ? devices.list.map(device => {
                    return (
                    <TouchableHighlight
                        key={device.id}
                        onPress={() => navigate('DeviceDetails', {id: device.id})}
                    >
                        <ItemCardWrapper borderColor="#588c95">
                            <ItemCardText>{device.label}</ItemCardText>
                            <OnlineIcon lastMessage={device.lastMessageAt} />
                        </ItemCardWrapper>
                    </TouchableHighlight>
                    )
                }) : null}
            </ScrollView>
        </Fragment>
    )
}

function restartApplication(itemId) {
    api.post(`/clusters/${itemId}/reload`)
    .then((response) => {
        console.log(response)
    })
}

export default function ClusterDetails(props) {
    const {navigation} = props;
    const itemId = navigation.getParam('id');
    return (
        <Container>
            <ClusterInfo itemId={itemId} />
            <DeviceList props={props} />
        </Container>
        );
}
  