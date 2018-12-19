import React, { useState, useEffect, Fragment, } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import * as api from '../utils/api';

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
            <View style={styles.detailsHeader}> 
                <Text style={styles.header}>
                    {project.name}
                </Text>
            </View>
            <View style={styles.detailsCard}>
                <Text style={styles.label}>Project ID:</Text>
                <Text style={styles.info}>{project.id}</Text>
                <Text style={styles.label}>Created At:</Text>
                <Text style={styles.info}>{project.createdAt}</Text>
                <Text style={styles.label}>Repo Path::</Text>
                <Text style={styles.info}>{project.repoPath}</Text>
            </View>
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
            <Text>Clusters</Text>
            <ScrollView>
                {clusters.map(cluster => {
                    return (
                    <TouchableHighlight
                        key={cluster.id}
                        onPress={() => navigate('ClusterDetails', {id: cluster.id})}
                    >
                        <View style={styles.card}>
                            <Text style={styles.cardText}>{cluster.title}</Text>
                        </View>
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
        <View style={styles.container}>
            <ProjectInfo itemId={itemId} />
            <ClusterList props={props} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9ecef',
        marginBottom: 10,
    },
    detailsHeader: {
      alignItems: 'center',
      paddingTop: 10,
      backgroundColor: '#97a7c3',
      marginTop: 15,
      marginLeft: 15,
      marginRight: 15,
    },
    header: {
      fontSize: 30,
      color: 'white'
    },
    detailsCard: {
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 15,
        marginRight: 15,
        padding: 15,
        padding: 15,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    label: {
        fontWeight: 'bold',
    },
    info: {
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