import './config';
import APP_CONF from "@/data/config";

const menu = [
    {
        key: 'home',
        name: 'home',
        label: '首页',
        children: [],
        jump_url: '/',
    },
    {
        key: 'article',
        name: 'article',
        label: '专栏',
        children: [],
        jump_url: '/article',
    },
    {
        key: 'design',
        name: 'design',
        label: '设计体系',
        children: [],
        jump_url: APP_CONF.THEME,
    },
    {
        key: 'origin',
        name: 'origin',
        label: '开源',
        children: [
            {
                key: 'Taier',
                name: 'Taier',
                label: 'Taier',
                jump_url: APP_CONF.TAIER
            },
            {
                key: 'Molecule',
                name: 'Molecule',
                label: 'Molecule',
                jump_url: APP_CONF.MOLECULE
            },
            {
                key: 'dt-sql-parser',
                name: 'dt-sql-parser',
                label: 'dt-sql-parser',
                jump_url: APP_CONF.DT_SQL_PARSER
            },
            {   
                key: 'code-review-practices',
                name: 'code-review-practices',
                label: 'code-review-practices',
                jump_url: APP_CONF.CODE_REVIEW_PRACTICES,
            },
            {
                key: 'dt-react-component',
                name: 'dt-react-component',
                label: 'dt-react-component',
                jump_url: APP_CONF.COMPONENT
            },
            {
                key: 'ant-design-dtinsight-theme',
                name: 'ant-design-dtinsight-theme',
                label: 'ant-design-dtinsight-theme',
                jump_url: APP_CONF.THEME
            },
            {
                key: 'ko',
                name: 'ko',
                label: 'ko',
                jump_url: APP_CONF.KO
            },
            {
                key: 'dt-utils',
                name: 'dt-utils',
                label: 'dt-utils',
                jump_url: APP_CONF.DT_UTILS
            },
            {
                key: 'Doraemon',
                name: 'Doraemon',
                label: 'Doraemon',
                jump_url: APP_CONF.DORAEMON
            }
        ],
    },
    {
        key: 'about',
        name: 'about',
        label: '关于我们',
        children: [],
        jump_url: '/about'
    },
]
export default menu;
