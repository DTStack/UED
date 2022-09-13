import NavHeader from "@/components/navHeader";
import Jumper from "@/components/jumper";
import Image from "next/image";
import styles from '@/styles/home.module.scss';
import {AboutDoc, DesignSystem, OriginList, seo} from '@/data/doc';
import {useEffect, useState} from "react";
import APP_CONF from "@/data/config";
import Head from "next/head";
import {H5_Width} from "@/data";

function Home() {
    const [bgHeight, setBgHeight] = useState('0px');
    const {title, keywords, description} = seo || {};
    useEffect(() => {
        homeBackgroundHeight(document);
    })
    const homeBackgroundHeight = (document) => {
        const Width = document.documentElement.clientWidth || document.body.clientWidth;
        const BgHeight = Width > H5_Width
                        ?(Width * 658 / 1440) + 'px'
                        :(Width * 600 / 750) + 'px';
        setBgHeight(BgHeight);
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
                <Jumper>
                    <div style={{ padding: '13px 0 39px', fontSize: '20px' }}>设计体系</div>
                </Jumper>
                <Jumper>
                    <div className={styles.container}>
                        {
                            DesignSystem?.map((item) => (
                                <a className={styles.box} key={item.key} href={item.jump_url} rel="nofollow noopener noreferrer" target="_blank">
                                    <img src={item?.imgUrl} alt=""/>
                                    <div style={{ fontSize: '26px' }}>{item.title}</div>
                                    <div className={styles.subTitle}>{item.subTitle}</div>
                                </a>
                            ))
                        }
                    </div>
                </Jumper>
                <Jumper>
                    <div className={styles.title}>开源</div>
                </Jumper>
            </div>
            <div className={styles.origin}>
                <div className={styles.originBox}>
                    {
                        OriginList?.map(item => (
                            <div className={styles.originItem} key={item.key}>
                                <img src={item?.imgUrl} alt=""/>
                                <div style={{ margin: '35px 0px' }}>
                                    <div className={styles.title}>{item.title}</div>
                                    <div className={styles.subTitle}>{item.subTitle}</div>
                                    <a href={item.jump_url} rel="nofollow noopener noreferrer" target="_blank">{'查看详情>'}</a>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.describe} style={{ paddingTop: '50px' }}>相关链接：
                    <a href={APP_CONF.DTSTACK_URL} target="_blank" style={{ color: '#3D446E'}} rel="noreferrer">袋鼠云</a>
                </div>
                <div className={styles.describe} style={{ marginTop: '30px' }}>{AboutDoc.footer}</div>
            </div>
        </div>

    )
}

export default Home
