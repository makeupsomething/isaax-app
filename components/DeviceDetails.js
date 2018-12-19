import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import * as api from '../utils/api';

function DeviceInfo(props) {
    const {itemId} = props
    const [device, setDevice] = useState(null);

    useEffect(() => {
        api.get(`https://api.isaax.io/devices/${itemId}`)
        .then((response) => {
            setDevice(response)
        })
    }, []);

    return (
        <View style={styles.headerWrapper}>
            {device ? 
            (<Text style={styles.header}>
                {device.label}
            </Text>) : 
            (<Text>Loading...</Text>)
            }
        </View>
    )
}

function startDevice() {
    const {navigation} = this.props;
    const itemId = navigation.getParam('id');

    api.post(`https://api.isaax.io/devices/${itemId}/start`)
    .then((response) => {
        console.log(response)
    })
}

function stopDevice() {
    const {navigation} = this.props;
    const itemId = navigation.getParam('id');

    api.post(`https://api.isaax.io/devices/${itemId}/stop`)
    .then((response) => {
        console.log(response)
    })
}

export default function DeviceDetails(props) {
    const {navigation} = props;
    const itemId = navigation.getParam('id');
    return (
        <View style={{flex: 1}}>
            <DeviceInfo itemId={itemId} />
            <Button
                onPress={startDevice}
                title="Start Device"
                color="green"
            />
            <Button
                onPress={stopDevice}
                title="Stop Device"
                color="red"
            />
        </View>
        );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#e9ecef',
      marginBottom: 10,
    },
    headerWrapper: {
      alignItems: 'center',
      paddingTop: 10,
      backgroundColor: '#e9ecef',
    },
    header: {
      fontSize: 70,
      color: 'navy'
    },
    card: {
      borderTopWidth: 3,
      backgroundColor: 'white',
      borderColor: '#355998',
      marginTop: 10,
      marginTop: 10,
      marginLeft: 15,
      marginRight: 15,
    },
    cardText: {
      fontSize: 30,
      padding: 30,
      color: 'navy',
    }
  });
  