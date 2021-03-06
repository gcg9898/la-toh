import 'react-app-polyfill/stable';

import './index.css';
import script from '../../common/mocks';
import { Screen } from '../../../dialogs/src/models';
import { init, Channel } from '@telefonica/la-web-sdk';
import SplashScreen from './screens/splash';
import ErrorScreen from './screens/error';
import HomeScreen from './screens/home';
import HeroesScreen from './screens/heroes';
import VillainsScreen from './screens/villains';

init({
    channel: Channel.STB,
    laName: process.env.REACT_APP_LA_NAME as string,
    screens: {
        [Screen.SPLASH]: () => SplashScreen,
        [Screen.ERROR]: () => ErrorScreen,
        [Screen.HOME]: () => HomeScreen,
        [Screen.HEROES]: () => HeroesScreen,
        [Screen.VILLAINS]: () => VillainsScreen,
    },
    buildNumber: process.env.BUILD_NUMBER,
    auraMockClient:
        process.env.REACT_APP_AURA_MOCK_CLIENT !== 'true'
            ? undefined
            : {
                  script,
                  pendingTerms: false,
              },
});
