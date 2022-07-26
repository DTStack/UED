import './config';
import APP_CONF from "@/data/config";

const menu = [
    {
        key: 'home',
        name: 'home',
        label: '首页',
        children: [],
        jumpUrl: '/',
    },
    {
        key: 'article',
        name: 'article',
        label: '专栏',
        children: [],
        jumpUrl: '/article',
    },
    {
        key: 'design',
        name: 'design',
        label: '设计体系',
        children: [],
        jumpUrl: APP_CONF.THEME,
    },
    {
        key: 'origin',
        name: 'origin',
        label: '开源',
        children: [
            {
                key: 'theme',
                name: 'theme',
                label: 'Theme',
                jumpUrl: APP_CONF.THEME
            },
            {
                key: 'molecule',
                name: 'molecule',
                label: 'Molecule',
                jumpUrl: APP_CONF.MOLECULE
            },
            {
                key: 'component',
                name: 'component',
                label: '组件库',
                jumpUrl: APP_CONF.COMPONENT
            },
            {
                key: 'taier',
                name: 'taier',
                label: 'Taier',
                jumpUrl: APP_CONF.TAIER
            },
            {
                key: 'utils',
                name: 'utils',
                label: 'DT_utils',
                jumpUrl: APP_CONF.DT_UTILS
            },
            {
                key: 'sql-parser',
                name: 'sql-parser',
                label: 'DT-sql-parser',
                jumpUrl: APP_CONF.DT_SQL_PARSER
            },
        ],
    },
    {
        key: 'about',
        name: 'about',
        label: '关于我们',
        children: [],
        jumpUrl: '/about'
    },
]
export default menu;
