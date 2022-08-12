// @ts-ignore
import Link from 'next/link';
import menu from "../data/menu";
import { useRouter } from "next/router";
import { Dropdown, Space, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import Image from "next/image";
import styles from '../styles/navHeader.module.scss';
import APP_CONF from "@/data/config";

interface IProps {
    isShow: boolean;
}
function NavHeader(props: IProps) {
    const { isShow } = props;
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
        <div className={styles.nav}>
            <div className={styles.leftMenu} onClick={() => router.push('/')}>
                <Image src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/logo.png`} width={46} height={52}/>
                <div className={styles.subtitle}>袋鼠云数栈UED</div>
            </div>
            <div className={styles.rightMenu}>
                { isShow && renderNavgitor()}
            </div>
        </div>
    )
}

export default NavHeader;
