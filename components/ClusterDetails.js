import React, { useState, useEffect, Fragment } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as api from '../utils/api';
import dayjs from 'dayjs'

function OnlineIcon(props) {
    const {lastMessage} = props
    const date1 = dayjs(lastMessage);
    const date2 = dayjs();
    if(date2.diff(date1, 'second') < 100) { 
        return <Text style={styles.statusOn}>Online</Text>
    } else {
        return <Text style={styles.statusOff}>Offline</Text>
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
                <View style={styles.detailsHeader}>
                    <Text style={styles.header}>
                        Cluster: {cluster.title}
                    </Text>
                </View>
                <View style={styles.detailsCard}>
                    <Text style={styles.label}>Cluster ID:</Text>
                    <Text style={styles.info}>{cluster.id}</Text>
                    <Text style={styles.label}>Branch:</Text>
                    <Text style={styles.info}>{cluster.branch}</Text>
                    <Text style={styles.label}>Revision:</Text>
                    <Text style={styles.info}>{cluster.revision}</Text>
                    <Text style={styles.label}>Created At:</Text>
                    <Text style={styles.info}>{dayjs(cluster.createdAt).format('DD/MM/YYYY hh:mm:ss')}</Text>
                    <Text style={styles.label}>Updated At:</Text>
                    <Text style={styles.info}>{dayjs(cluster.updatedAt).format('DD/MM/YYYY hh:mm:ss')}</Text>
                
                    <TouchableHighlight style={styles.buttonView} onPress={restartApplication}>
                        <View style={styles.button}>
                            <Text color='white'>Restart Application</Text>
                        </View>
                    </TouchableHighlight>
                </View>
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
            <Text style={styles.subHeader}>Devices</Text>
            <ScrollView>
                {devices.list ? devices.list.map(device => {
                    return (
                    <TouchableHighlight
                        key={device.id}
                        onPress={() => navigate('DeviceDetails', {id: device.id})}
                    >
                        <View style={styles.card}>
                            <Text style={styles.cardText}>{device.label}</Text>
                            <OnlineIcon lastMessage={device.lastMessageAt} />
                        </View>
                    </TouchableHighlight>
                    )
                }) : null}
            </ScrollView>
        </Fragment>
    )
}

function restartApplication(props) {
    const {navigation} = props;
    const itemId = navigation.getParam('id');

    api.post(`/clusters/${itemId}/reload`)
    .then((response) => {
        console.log(response)
    })
}

export default function ClusterDetails(props) {
    const {navigation} = props;
    const itemId = navigation.getParam('id');
    return (
        <View style={styles.container}>
            <ClusterInfo itemId={itemId} />
            <DeviceList props={props} />
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
        backgroundColor: '#355998',
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
      info: {
      },
    card: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 3,
        backgroundColor: 'white',
        borderColor: '#588c95',
        marginTop: 15,
    },
    cardText: {
      fontSize: 30,
      padding: 30,
      color: 'navy',
    },
    buttonView: {
        marginTop: 15,
        width: 150,
    },
    button: {
        backgroundColor: 'teal',
        padding: 15,
    },
    statusOn: {
        color: 'green',
        padding: 30,
    },
    statusOff: {
        color: 'red',
        padding: 30,
    },
    subHeader: {
        color: 'navy',
        fontSize: 30,
        marginTop: 15,
    }
  });
  