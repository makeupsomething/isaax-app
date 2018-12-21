import React, { useState, useEffect, Fragment } from 'react'
import { Text } from 'react-native'
import Container from './Container'
import { HeaderWrapper, HeaderText, InformationBar, InformationBarText } from './Header'
import { ButtonWrapper, ButtonView, ButtonText } from './ActionButton'
import { CardWrapper, Label, Value } from './DetailsCard'
import * as api from '../utils/api'
import dayjs from 'dayjs'

function DeviceInfo(props) {
    const {itemId} = props
    const [device, setDevice] = useState(null);
    const [loading, setLoading] = useState(false);

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
                {loading ? <LoadingInformation action={loading} /> : null}
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
                    <ButtonWrapper onPress={() => stopDevice(itemId, setLoading)}>
                        <ButtonView backgroundColor='red'>
                            <ButtonText>Stop Device</ButtonText>
                        </ButtonView>
                    </ButtonWrapper>

                    <ButtonWrapper onPress={() => startDevice(itemId, setLoading)}>
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

function LoadingInformation({action}) {
    console.log(action)
    return (
        <InformationBar>
            <InformationBarText>{action} application</InformationBarText>
        </InformationBar>
    )
}

function startDevice(itemId, setLoading) {
    setLoading("starting")
    api.post(`/devices/${itemId}/start`)
    .then(() => {
        setTimeout(() => { setLoading(false) }, 3000);
    })
}

function stopDevice(itemId, setLoading) {
    setLoading("stopping")
    api.post(`/devices/${itemId}/stop`)
    .then(() => {
        setTimeout(() => { setLoading(false) }, 3000);
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
  