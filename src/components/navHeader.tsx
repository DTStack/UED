import Link from 'next/link';
import menu from "../data/menu";
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
    const jumpAction = (item, menu) => {
        let jumpItem = menu.filter((value) => value.key === item.key)
        window.open(jumpItem[0].jumpUrl);
    }
    const content = (menu) => <Menu items={menu} onClick={(item) => jumpAction(item, menu)} className={styles.menu}/>
    const renderNavgitor = () => {
        return menu?.map(item => {
            if(!item.children.length){
                if(['design'].includes(item.key)) {
                    return <a key={item.key} href={item?.jumpUrl} rel="nofollow" target="_blank">{item?.label}</a>
                }else {
                    return <Link href={item?.jumpUrl} key={item?.key}><div>{item?.label}</div></Link>
                }
            }
            return <Dropdown overlay={content(item.children)} key={item.key} trigger={['click']}>
                    <Space>{item.label}<CaretDownOutlined /></Space>
                </Dropdown>;
        })
    }
    return (
        <div className={classNames(styles.nav, {[styles.fixedNav]: isFixed })}>
            <Link href={'/'}>
                <div className={styles.leftMenu}>
                    <Image src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/logo.png`} width={46} height={52}/>
                    <h1 className={styles.subtitle}>袋鼠云数栈UED团队</h1>
                </div>
            </Link>
            <div className={styles.rightMenu}>
                { isShow && renderNavgitor()}
            </div>
        </div>
    )
}

export default NavHeader;
