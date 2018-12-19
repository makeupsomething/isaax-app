import React, { useState, useEffect, Fragment } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as api from '../utils/api';



function OnlineIcon(props) {
    const lastMessage = props.lastMessage
    var date1 = new Date(lastMessage);
    var date2 = new Date();
    var dif = date2.getTime() - date1.getTime(); 
    console.log(date1.getTime())
    console.log(date2.getTime())
    var Seconds_from_T1_to_T2 = dif / 1000;
    var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
    if(Seconds_Between_Dates < 100) { 
        return <Ionicons name='ios-checkmark-circle-outline' style={styles.icon} color='green' size={20}/>
    } else {
        return <Ionicons name='ios-close-circle-outline' style={styles.icon} color='red' size={20}/>
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
                        {cluster.title}
                    </Text>
                </View>
                <View style={styles.detailsCard}>
                    <Text style={styles.label}>Cluster ID:</Text>
                    <Text style={styles.info}>{cluster.id}</Text>
                    <Text style={styles.label}>Branch:</Text>
                    <Text style={styles.info}>{cluster.branch}</Text>
                    <Text style={styles.label}>Revision:</Text>
                    <Text style={styles.info}>{cluster.revision}</Text>
                    <Text style={styles.label}>Created On:</Text>
                    <Text style={styles.info}>{cluster.createdOn}</Text>
                    <Text style={styles.label}>Updated At:</Text>
                    <Text style={styles.info}>{cluster.updatedAt}</Text>
                </View>
                <TouchableHighlight style={styles.buttonView} onPress={restartApplication}>
                    <View style={styles.button}>
                        <Text color='white'>Restart Application</Text>
                    </View>
                </TouchableHighlight>
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
                            <OnlineIcon lastMessage={device.lastMessage} />
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
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15,
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
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: 'teal',
        padding: 15,
    },
    icon: {
        padding: 30,
    },
    subHeader: {
        color: 'navy',
        fontSize: 30,
        marginTop: 15,
    }
  });
  