import React, { useState, useEffect, Fragment } from 'react'
import { Text } from 'react-native'
import Container from './Container'
import { HeaderWrapper, HeaderText } from './Header'
import { ButtonWrapper, ButtonView, ButtonText } from './ActionButton'
import { CardWrapper, Label, Value } from './DetailsCard'
import * as api from '../utils/api'
import dayjs from 'dayjs'

function DeviceInfo(props) {
    const {itemId} = props
    const [device, setDevice] = useState(null);

    useEffect(() => {
        api.get(`/devices/${itemId}`)
        .then((response) => {
            setDevice(response)
        })
    }, []);

    if(device) {
        return (
            <Fragment>
                <HeaderWrapper backgroundColor="#588c95">
                    <HeaderText>
                        Device: {device.label}
                    </HeaderText>
                </HeaderWrapper>
                <CardWrapper>
                    <Label>Device ID:</Label>
                    <Value>{device.id}</Value>
                    <Label>Cluster:</Label>
                    <Value>{device.cluster.title}</Value>
                    <Label>Created At:</Label>
                    <Value>{dayjs(device.createdAt).format('DD/MM/YYYY hh:mm:ss')}</Value>
                    <Label>Updated At:</Label>
                    <Value>{dayjs(device.updatedAt).format('DD/MM/YYYY hh:mm:ss')}</Value>
                    <Label>Last Message:</Label>
                    <Value>{dayjs(device.lastMessageAt).format('DD/MM/YYYY hh:mm:ss')}</Value>
                    <Label>IsaaxD Version:</Label>
                    <Value>{device.version}</Value>
                    <Label>Interfaces:</Label>
                    {device.interfaces.map(inter => {
                        return <Value key={inter.Name}>{inter.Ip}</Value>
                    })}

                    <ButtonWrapper onPress={() => stopDevice(itemId)}>
                        <ButtonView backgroundColor='red'>
                            <ButtonText>Stop Device</ButtonText>
                        </ButtonView>
                    </ButtonWrapper>

                    <ButtonWrapper onPress={() => startDevice(itemId)}>
                        <ButtonView backgroundColor='green'>
                            <ButtonText>Start Device</ButtonText>
                        </ButtonView>
                    </ButtonWrapper>
                </CardWrapper>
            </Fragment>
        )
    } else {
        return <Text>Loading...</Text>
    }
}

function startDevice(itemId) {
    api.post(`/devices/${itemId}/start`)
    .then((response) => {
        console.log(response)
    })
}

function stopDevice(itemId) {
    api.post(`/devices/${itemId}/stop`)
    .then((response) => {
        console.log(response)
    })
}

export default function DeviceDetails(props) {
    const {navigation} = props;
    const itemId = navigation.getParam('id');
    return (
        <Container>
            <DeviceInfo itemId={itemId} />
        </Container>
        );
}
  