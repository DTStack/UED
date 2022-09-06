import { useEffect, useState } from 'react';
import NavHeader from "@/components/navHeader";
import styles from '@/styles/about.module.scss';
import Image from "next/image";
import {AboutDoc, seo} from '@/data/doc';
import APP_CONF from "@/data/config";
import Head from "next/head";

function Index() {
    const [bgHeight, setBgHeight] = useState('0px');
    const { title, description, keywords} = seo || {};
    useEffect(() => {
        backgroundHeight(document);
    })
    const backgroundHeight = (document) => {
        const Width = document.documentElement.clientWidth || document.body.clientWidth;
        const BgHeight = (Width * 1101 / 1440) + 'px';
        setBgHeight(BgHeight);
    }
    return <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
        </Head>
        <NavHeader isShow={false} isFixed={false}/>
        <div className={styles.centerBox}>
            <Image src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/About/about_title.png`} width={180} height={39}/>
            <div className={styles.excerpt}>{AboutDoc.subtitle}</div>
        </div>
        <div className={styles.content} style={{ height: bgHeight }}>
            <div className={styles.footer}>
                <div className={styles.describe}>相关链接： <span style={{ color: '#3D446E'}}>袋鼠云</span></div>
                <div className={styles.describe} style={{ marginTop: '30px' }}>{AboutDoc.footer}</div>
            </div>
        </div>
    </div>
}

export default Index;
