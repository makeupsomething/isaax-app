import {createStackNavigator, createAppContainer} from 'react-navigation';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import ClusterDetails from './components/ClusterDetails';
import DeviceDetails from './components/DeviceDetails';

const App = createStackNavigator({
  Home: {screen: Projects},
  ProjectDetails: {screen: ProjectDetails},
  ClusterDetails: {screen: ClusterDetails},
  DeviceDetails: {screen: DeviceDetails}
});

export default createAppContainer(App);