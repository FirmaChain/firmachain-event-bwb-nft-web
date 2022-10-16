import { createGlobalStyle } from 'styled-components';
import MetroPolis_Bold from './assets/Metropolis-Bold.woff';
import MetroPolis_Regular from './assets/Metropolis-Regular.woff';
import MetroPolis_Medium from './assets/Metropolis-Medium.woff';
import MetroPolis_Light from './assets/Metropolis-Light.woff';
import { Metropolis } from './theme';

const METROPOLIS_BOLD = MetroPolis_Bold;
const METROPOLIS_REGULAR = MetroPolis_Regular;
const METROPOLIS_MEDIUM = MetroPolis_Medium;
const METROPOLIS_LIGHT = MetroPolis_Light;

export default createGlobalStyle`
    @font-face {
        font-family: "${Metropolis}";
        src: local("Font_test"), url(${METROPOLIS_REGULAR}) format('woff'); 
        font-weight: normal;
    }
    @font-face {
        font-family: "${Metropolis}";
        src: local("Font_test"), url(${METROPOLIS_MEDIUM}) format('woff'); 
        font-weight: 500;
    }
    @font-face {
        font-family: "${Metropolis}";
        src: local("Font_test"), url(${METROPOLIS_BOLD}) format('woff');
        font-weight: bold;
    }
    @font-face {
        font-family: "${Metropolis}";
        src: local("Font_test"), url(${METROPOLIS_LIGHT}) format('woff');
        font-weight: 300;
    }
`;
