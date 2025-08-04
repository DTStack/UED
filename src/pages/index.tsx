import NavHeader from "@/components/navHeader";
import Jumper from "@/components/jumper";
import Image from "next/image";
import styles from '@/styles/home.module.scss';
import {AboutDoc, DesignSystem, OriginList, seo} from '@/data/doc';
import APP_CONF from "@/data/config";
import Head from "next/head";
import {isMobile} from "@/utils";
import {useEffect, useState} from "react";
import Script from 'next/script'

function Home() {
    const {title, keywords, description} = seo || {};
    const [mobile, setMobile] = useState(false);

    useEffect(()=>{
        setMobile(isMobile(window));
    }, []);

    return (
        <div style={{ overflowX: 'hidden' }}>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-FJDDJSESXT"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-FJDDJSESXT');
                `}
            </Script>

            <Head>
                <title>{title}</title>
                <link rel="icon" href="/ued/favicon.ico" />
                <meta charSet="utf-8" />
                <meta name="keywords" content={keywords} />
                <meta name="description" content={description} />
            </Head>
            <div className={styles.header}>
                <NavHeader isShow={true} isFixed={false}/>
                {
                    mobile ? (
                        <div className={styles.title}>
                            <Image src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/home_title.png`} width={423} height={39} alt="" />
                        </div>
                    ) : (
                        <div className={styles.topImgBox}>
                            <img className={`${styles.titleImg} ${styles.noHover}`} src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/home_title.png`} alt="" />
                            <img className={styles.dImg} src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/home_d.png`} alt="" />
                            <img className={styles.tImg} src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/home_t.png`} alt="" />
                            <img className={styles.uImg} src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/home_u.png`} alt="" />
                            <img className={styles.eImg} src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/home_e.png`} alt="" />
                            <img className={styles.bigImg} src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/home_big_ball.png`} alt="" />
                            <img className={styles.smallImg} src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/home_small_ball.png`} alt="" />
                        </div>
                    )
                }
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
                                    <img src={item?.imgUrl} alt="" />
                                    <div style={{ fontSize: '24px' }}>{item.title}</div>
                                    <div className={styles.subTitle}>{item.subTitle}</div>
                                </a>
                            ))
                        }
                    </div>
                </Jumper>
                <div className={styles.title}>开源</div>
            </div>
            <div className={styles.origin}>
                {!mobile && (<>
                    <img src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/origin_left.png`} style={{ position: 'absolute', width:  '654px' }}/>
                    <img src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/origin_right.png`} style={{ position: 'absolute', width: '735px', right: 0 }}/>
                </>)}
                <div className={styles.originBox}>
                    {
                        OriginList?.map(item => (
                            <div className={styles.originItem} key={item.key}>
                                <img src={item?.imgUrl} alt=""/>
                                <div style={{ margin: '16px 0px' }}>
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
