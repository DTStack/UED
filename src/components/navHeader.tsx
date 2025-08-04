import Link from 'next/link';
import menu from "../data/menu";
import { Dropdown, Space, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import Image from "next/image";
import APP_CONF from "@/data/config";
import classNames from "classnames";
import styles from '../styles/navHeader.module.scss';
import {useEffect, useState} from "react";
import {H5_Width} from "@/data";

interface IProps {
    isShow: boolean;
    isFixed: boolean;
}
function NavHeader(props: IProps) {
    const { isShow, isFixed } = props;
    const [H5, setH5] = useState(false);
    useEffect(() => {
        const Width = document.documentElement.clientWidth || document.body.clientWidth;
        const isH5 = Width > H5_Width ? false : true;
        setH5(isH5);
    });
    const jumpAction = (item, menu) => {
        let jumpItem = menu.filter((value) => value.key === item.key)
        window.open(jumpItem[0].jump_url);
    }
    const content = (menu) => <Menu items={menu} onClick={(item) => jumpAction(item, menu)} className={styles.menu}/>
    const renderNavgitor = () => {
        return menu?.map(item => {
            if(!item.children.length){
                if(['design'].includes(item.key)) {
                    return <a key={item.key} href={item?.jump_url} rel="nofollow noopener noreferrer" target="_blank">{item?.label}</a>
                }else {
                    return <Link href={item?.jump_url} key={item?.key}><div>{item?.label}</div></Link>
                }
            }
            return <Dropdown overlay={content(item.children)} key={item.key} trigger={['click']}>
                    <Space>{item.label}<CaretDownOutlined /></Space>
                </Dropdown>;
        })
    }
    return (
        <div className={classNames(styles.nav, {[styles.fixedNav]: isFixed })}>
            <div className={styles.leftMenu}>
            <a href="https://dtstack.com" target="_blank" rel="noreferrer" style={{ height: '30px' }}>
                    <Image src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/dtstack_logo.png`} width={120} height={30}/>
                </a>
                <Link href="/ued">
                {/* <Image src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/logo.png`} width={46} height={52}/> */}
                    <h1 className={styles.subtitle}>袋鼠云数栈UED团队</h1>
                </Link>
            </div>
            <div className={styles.rightMenu}>
                { (H5 || isShow) && renderNavgitor()}
            </div>
        </div>
    )
}

export default NavHeader;
