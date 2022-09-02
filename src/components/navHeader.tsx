// @ts-ignore
import Link from 'next/link';
import menu from "../data/menu";
import { useRouter } from "next/router";
import { Dropdown, Space, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import Image from "next/image";
import APP_CONF from "@/data/config";
import classNames from "classnames";
import styles from '../styles/navHeader.module.scss';

interface IProps {
    isShow: boolean;
    isFixed: boolean;
}
function NavHeader(props: IProps) {
    const { isShow, isFixed } = props;
    const router = useRouter();
    const jumpAction = (item, menu) => {
        let jumpItem = menu.filter((value) => value.key === item.key)
        window.open(jumpItem[0].jumpUrl);
    }
    const content = (menu) => <Menu items={menu} onClick={(item) => jumpAction(item, menu)} className={styles.menu}/>
    const renderNavgitor = () => {
        return menu?.map(item => {
            if(!item.children.length){
               return <div
                   onClick={() => {
                       if(['design'].includes(item.key)) {
                           window.open(item?.jumpUrl);
                           return;
                       }
                        router.push(item.jumpUrl)}
                    }
                   key={item.key}>
                   {item.label}
               </div>
            }
            return <Dropdown overlay={content(item.children)} key={item.key} trigger={['click']}>
                    <Space>{item.label}<CaretDownOutlined /></Space>
                </Dropdown>;
        })
    }
    return (
        <div className={classNames(styles.nav, {[styles.fixedNav]: isFixed })}>
            <div className={styles.leftMenu} onClick={() => router.push('/')}>
                <Image src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/logo.png`} width={46} height={52}/>
                <h1 className={styles.subtitle}>袋鼠云数栈UED团队</h1>
            </div>
            <div className={styles.rightMenu}>
                { isShow && renderNavgitor()}
            </div>
        </div>
    )
}

export default NavHeader;
