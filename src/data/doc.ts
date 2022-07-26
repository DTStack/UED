import APP_CONF from './config';
export const AboutDoc = {
    subtitle: '我们是袋鼠云数栈 UED 团队，致力于打造优秀的一站式数据中台产品。我们始终保持工匠精神，探索前端道路，为社区积累并传播经验价值。',
    footer: '@2022 数栈前端组 All Rights Reserved'
}

export const DesignSystem = [
    {
        key: 'design',
        imgUrl: '/images/home/design.png',
        title: '设计价值观',
        subTitle: '基于「严谨理想」、「简约克制」、「节奏韵律」和「数字化」的设计价值观，创造美好的用户体验。',
        jumpUrl: 'https://dtstack.github.io/ant-design-dtinsight-theme/docs/react/introduce-cn'
    },
    {
        key: 'eye',
        imgUrl: '/images/home/eye.png',
        title: '视觉语言',
        subTitle: '以「极简易用」为设计理念，创造美好的用户体验同时赋能商业产品。',
        jumpUrl: 'https://dtstack.github.io/ant-design-dtinsight-theme/docs/react/color-cn'
    },
    {
        key: 'component',
        imgUrl: '/images/home/component.png',
        title: 'UI 组件库',
        subTitle: '旨在数栈产品生态体系内，建立友好、高效、一致的用户体验，最大程度适应不同需求。',
        jumpUrl: 'https://dtstack.github.io/ant-design-dtinsight-theme/components/breadcrumb-cn/'
    }
]

export const LeftOrigin = [
    {
        key: 'molecule',
        imgUrl: '/images/home/molecule.png',
        title: 'Molecule',
        subTitle: '一个轻量级的 Web IDE UI 框架。',
        jumpUrl: APP_CONF.MOLECULE,
    }
]
export const RightOrigin = [
    {
        key: 'Taier',
        imgUrl: '/images/home/Taier.png',
        title: 'Taier',
        subTitle: '大数据平台-分布式任务调度系统。',
        jumpUrl: APP_CONF.TAIER,
    },
    {
        key: 'doraemon',
        imgUrl: '/images/home/doraemon.png',
        title: 'Doraemon',
        subTitle: '一个帮你整理日常开发、配置、代理服务、主机资源的管理工具。',
        jumpUrl: APP_CONF.DORAEMON
    }
]