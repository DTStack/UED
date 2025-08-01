import '@/styles/globals.scss';
import 'antd/dist/antd.css';
import {version} from '../../package.json';

export default function MyApp({ Component, pageProps }) {
    console.log(
        `%cApp current version: v${version}`,
        'font-family: Cabin, Helvetica, Arial, sans-serif;text-align: left;font-size:32px;color:#B21212;'
    );

    return <Component {...pageProps} />
}
