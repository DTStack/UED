import { useEffect, useState } from 'react';
import NavHeader from "@/components/navHeader";
import styles from '@/styles/about.module.scss';
import Image from "next/image";
import {AboutDoc, seo} from '@/data/doc';
import APP_CONF from "@/data/config";
import Head from "next/head";
import {H5_Width} from "@/data";

function Index() {
    const [bgHeight, setBgHeight] = useState('0px');
    const { title, description, keywords} = seo || {};
    useEffect(() => {
        backgroundHeight(document);
    })
    const backgroundHeight = (document) => {
        const Width = document.documentElement.clientWidth || document.body.clientWidth;
        const BgHeight = Width > H5_Width
                        ? (Width * 1101 / 1440) + 'px'
                        : (Width * 1308/750) + 'px';
        setBgHeight(BgHeight);
    }
    return <div>
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/ued/favicon.ico" />
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
                <div className={styles.describe}>相关链接：
                    <a href={APP_CONF.DTSTACK_URL} target="_blank" style={{ color: '#3D446E'}} rel="noreferrer">袋鼠云</a>
                </div>
                <div className={styles.describe} style={{ marginTop: '30px' }}>{AboutDoc.footer}</div>
            </div>
        </div>
    </div>
}

export default Index;
