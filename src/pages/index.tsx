import NavHeader from "@/components/navHeader";
import Image from "next/image";
import styles from '@/styles/home.module.scss';
import {AboutDoc, DesignSystem, LeftOrigin, RightOrigin, seo} from '@/data/doc';
import {useEffect, useState} from "react";
import APP_CONF from "@/data/config";
import {Button} from "antd";
import Head from "next/head";

function Home() {
    const [bgHeight, setBgHeight] = useState('0px');
    const [originHeight, setOriginHeight] = useState('0px');
    const {title, keywords, description} = seo || {};
    useEffect(() => {
        homeBackgroundHeight(document);
    })
    const homeBackgroundHeight = (document) => {
        const Width = document.documentElement.clientWidth || document.body.clientWidth;
        const BgHeight = (Width * 658 / 1440) + 'px';
        const originHeight = (Width * 501 / 1440) + 'px';
        setBgHeight(BgHeight);
        setOriginHeight(originHeight);
    }
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="keywords" content={keywords} />
                <meta name="description" content={description} />
            </Head>
            <div className={styles.header} style={{ height: bgHeight }}>
                <NavHeader isShow={true} isFixed={false}/>
                <div className={styles.title}>
                    <Image src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/home_title.png`} width={423} height={39}/>
                </div>
            </div>
            <div className={styles.body}>
                <div style={{ padding: '13px 0 39px' }}>设计体系</div>
                <div className={styles.container}>
                    {
                        DesignSystem?.map((item) => (
                            <a className={styles.box} key={item.key} href={item.jumpUrl} rel="nofollow noreferrer noopener" target="_blank">
                                <img src={item?.imgUrl} alt=""/>
                                <div>{item.title}</div>
                                <div className={styles.subTitle}>{item.subTitle}</div>
                            </a>
                        ))
                    }
                </div>
                <div style={{ paddingTop: '80px' }}>开源</div>
            </div>
            <div className={styles.origin} style={{ height: originHeight }}>
                <div className={`${styles.left} ${styles.leftBox}`}>
                    {
                        LeftOrigin?.map((item) => (
                            <div key={item.key}>
                                <img src={item?.imgUrl} alt=""/>
                                <div className={styles.title}>{item.title}</div>
                                <div className={styles.subTitle}>{item.subTitle}</div>
                                <a href={item.jumpUrl} rel="nofollow noreferrer noopener" target="_blank">{'查看详情>'}</a>
                            </div>
                        ))
                    }
                </div>
                <div>
                    {
                        RightOrigin?.map((item) => (
                            <div className={`${styles.rightBox} ${styles.right}`} key={item.key}>
                                <img src={item?.imgUrl} alt=""/>
                                <div style={{ margin: '35px 0px' }}>
                                    <div className={styles.title}>{item.title}</div>
                                    <div className={styles.subTitle}>{item.subTitle}</div>
                                    <a href={item.jumpUrl} rel="nofollow noreferrer noopener" target="_blank">{'查看详情>'}</a>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.describe} style={{ paddingTop: '50px' }}>相关链接： <span style={{ color: '#3D446E'}}>袋鼠云</span></div>
                <div className={styles.describe} style={{ marginTop: '30px' }}>{AboutDoc.footer}</div>
            </div>
        </div>

    )
}

export default Home
