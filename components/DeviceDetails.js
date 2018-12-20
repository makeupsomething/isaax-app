import React, { useState, useEffect, Fragment } from 'react'
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import * as api from '../utils/api';
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
                <View style={styles.detailsHeader}>
                    <Text style={styles.header}>
                        Device: {device.label}
                    </Text>
                </View>
                <View style={styles.detailsCard}>
                    <Text style={styles.label}>Device ID:</Text>
                    <Text style={styles.info}>{device.id}</Text>
                    <Text style={styles.label}>Cluster:</Text>
                    <Text style={styles.info}>{device.cluster.title}</Text>
                    <Text style={styles.label}>Created At:</Text>
                    <Text style={styles.info}>{dayjs(device.createdAt).format('DD/MM/YYYY hh:mm:ss')}</Text>
                    <Text style={styles.label}>Updated At:</Text>
                    <Text style={styles.info}>{dayjs(device.updatedAt).format('DD/MM/YYYY hh:mm:ss')}</Text>
                    <Text style={styles.label}>Last Message:</Text>
                    <Text style={styles.info}>{dayjs(device.lastMessageAt).format('DD/MM/YYYY hh:mm:ss')}</Text>
                    <Text style={styles.label}>IsaaxD Version:</Text>
                    <Text style={styles.info}>{device.version}</Text>
                    <Text style={styles.label}>Interfaces:</Text>
                    {device.interfaces.map(inter => {
                        return <Text key={inter.Name} style={styles.info}>{inter.Ip}</Text>
                    })}

                    <TouchableHighlight style={styles.buttonView} onPress={() => stopDevice(itemId)}>
                        <View style={styles.buttonStop}>
                            <Text color='white'>Stop Device</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.buttonView} onPress={() => startDevice(itemId)}>
                        <View style={styles.buttonStart}>
                            <Text color='white'>Start Device</Text>
                        </View>
                    </TouchableHighlight>
                </View>
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
        <View style={styles.container}>
            <DeviceInfo itemId={itemId} />
        </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9ecef',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
    },
    detailsHeader: {
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#588c95',
        marginTop: 15,
    },
    header: {
        fontSize: 30,
        color: 'white'
    },
    detailsCard: {
        backgroundColor: 'white',
        padding: 15,
        padding: 15,
    },
    label: {
        fontWeight: 'bold',
    },
    buttonView: {
        marginTop: 15,
        width: 150,
    },
    buttonStop: {
        backgroundColor: 'red',
        padding: 15,
    },
    buttonStart: {
        backgroundColor: 'green',
        padding: 15,
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
    },
    subHeader: {
        color: 'navy',
        fontSize: 30,
        marginTop: 15,
    }
  });
  