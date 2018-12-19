import React, { useState, useEffect } from 'react'
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
        api.get(`https://api.isaax.io/clusters/${itemId}`)
        .then((response) => {
            setCluster(response)
        })
    }, []);

    return (
        <View style={styles.headerWrapper}>
            {cluster ? 
            (<Text style={styles.header}>
                {cluster.title}
            </Text>) : 
            (<Text>Loading...</Text>)
            }
        </View>
    )
}

function DeviceList({props}) {
    const {navigation} = props;
    const {navigate} = props.navigation;
    const itemId = navigation.getParam('id');
    const [devices, setDevices] = useState([]);
    
    useEffect(() => {
        api.get(`https://api.isaax.io/devices?clusterId=${itemId}`)
        .then((response) => {
            setDevices(response)
        })
    }, []);

    return (
        <ScrollView style={styles.container}>
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
    )
}

function restartApplication(props) {
    const {navigation} = props;
    const itemId = navigation.getParam('id');

    api.post(`https://api.isaax.io/clusters/${itemId}/reload`)
    .then((response) => {
        console.log(response)
    })
}

export default function ClusterDetails(props) {
    const {navigation} = props;
    const itemId = navigation.getParam('id');
    return (
        <View style={{flex: 1}}>
            <ClusterInfo itemId={itemId} />
            <TouchableHighlight style={styles.buttonView} onPress={restartApplication}>
                <View style={styles.button}>
                    <Text color='white'>Restart Application</Text>
                </View>
            </TouchableHighlight>
            <DeviceList props={props} />
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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 3,
        backgroundColor: 'white',
        borderColor: '#588c95',
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
    buttonView: {
        backgroundColor: '#e9ecef',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'teal',
        padding: 15,
    },
    icon: {
        padding: 30,
    }
  });
  