// @ts-ignore
import Link from 'next/link';
import menu from "../data/menu";
import { useRouter } from "next/router";
import { Popover } from 'antd';
import Image from "next/image";
import Logo from "../static/images/logo.png";
import styles from '../styles/navHeader.module.scss';

interface IProps {
    isShow: boolean;
}
function NavHeader(props: IProps) {
    const { isShow } = props;
    const router = useRouter();
    const content = (menu) => (
        menu.map((item) => {
            return <div onClick={() => router.push(item.jumpUrl)} key={item.key}>{item.label}</div>
        })
    );
    const renderNavgitor = () => {
        return menu?.map(item => {
            if(!item.children.length){
               return <div onClick={() => router.push(item.jumpUrl)} key={item.key}>{item.label}</div>
            }
            return <Popover content={content(item.children)} title={null} key={item.key}>{item.label}</Popover>;
        })
    }
    return (
        <div className={styles.nav}>
            <div className={styles.leftMenu}>
                <Image src={Logo} width={46} height={52}/>
                <div className={styles.subtitle}>袋鼠云数栈UED</div>
            </div>
            <div className={styles.rightMenu}>
                { isShow && renderNavgitor()}
            </div>
        </div>
    )
}

export default NavHeader;
