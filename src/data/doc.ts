import APP_CONF from './config';

export const seo = {
    title: '袋鼠云数栈UED团队',
    keywords: 'Component Library, IDE, SQL Parser, 袋鼠云, UED, Theme',
    description: 'UED - 创造美好的用户体验',
};

export const AboutDoc = {
    subtitle: '我们是袋鼠云数栈 UED 团队，致力于打造优秀的一站式数据中台产品。我们始终保持工匠精神，探索前端道路，为社区积累并传播经验价值。',
    footer: '袋鼠云数栈UED团队'
}

export const DesignSystem = [
    {
        key: 'design',
        imgUrl: `${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/design.png`,
        title: '设计价值观',
        subTitle: '基于「严谨理想」、「简约克制」、「节奏韵律」和「数字化」的设计价值观，创造美好的用户体验。',
        jump_url: 'https://dtstack.github.io/ant-design-dtinsight-theme/docs/react/introduce-cn'
    },
    {
        key: 'eye',
        imgUrl: `${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/eye.png`,
        title: '视觉语言',
        subTitle: '以「极简易用」为设计理念，创造美好的用户体验同时赋能商业产品。',
        jump_url: 'https://dtstack.github.io/ant-design-dtinsight-theme/docs/react/color-cn'
    },
    {
        key: 'component',
        imgUrl: `${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/component.png`,
        title: 'UI 组件库',
        subTitle: '旨在数栈产品生态体系内，建立友好、高效、一致的用户体验，最大程度适应不同需求。',
        jump_url: 'https://dtstack.github.io/ant-design-dtinsight-theme/components/breadcrumb-cn/'
    }
]

export const OriginList = [
    {
        key: 'Taier',
        imgUrl: `${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/taier.png`,
        title: 'Taier',
        subTitle: '大数据平台-分布式任务调度系统',
        jump_url: APP_CONF.TAIER,
    },
    {
        key: 'molecule',
        imgUrl: `${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/molecule.png`,
        title: 'Molecule',
        subTitle: '一个轻量级的 Web IDE UI 框架',
        jump_url: APP_CONF.MOLECULE,
    },
    {
        key: 'dt-sql-parser',
        imgUrl: `${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/dt-sql-parser.png`,
        title: 'dt-sql-parser',
        subTitle: '一个针对大数据领域的 SQL Parser 项目',
        jump_url: APP_CONF.DT_SQL_PARSER
    },
    {
      key: 'dt-react-component',
      imgUrl: `${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/dt-utils.png`,
      title: 'dt-react-component',
      subTitle: '基于 ant-design 的 React UI 组件库',
      jump_url: APP_CONF.COMPONENT,
    },
    {
        key: 'ko',
        imgUrl: `${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/dt-utils.png`,
        title: 'ko',
        subTitle: '一个速度更快、配置更灵活、使用更简单的模块打包器',
        jump_url: APP_CONF.KO,
    },
    {
        key: 'dt-utils',
        imgUrl: `${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/dt-utils.png`,
        title: 'dt-utils',
        subTitle: '袋鼠云实用工具库',
        jump_url: APP_CONF.DT_UTILS
    },
    {
        key: 'doraemon',
        imgUrl: `${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Home/doraemon.png`,
        title: 'Doraemon',
        subTitle: '一个帮你整理日常开发、配置、代理服务、主机资源的管理工具',
        jump_url: APP_CONF.DORAEMON
    },
]

export const OpenOriginUrl = [
    {
        key: 'zhihu',
        name: '知乎',
        label: '知乎',
        site: 'https://www.zhihu.com/people/dtux',
    },
    {
        key: 'juejin',
        name: '掘金',
        label: '掘金',
        site: 'https://juejin.cn/user/2137106333053912',
    },
    {
        key: 'jianshu',
        name: '简书',
        label: '简书',
        site: 'https://www.jianshu.com/u/747db476a6e9',
    },
    {
        key: 'cnblogs',
        name: '博客园',
        label: '博客园',
        site: 'https://www.cnblogs.com/dtux/',
    },
    {
        key: 'segmentfault',
        name: '思否',
        label: '思否',
        site: 'https://segmentfault.com/u/daishuyunshuzhanqianduan',
    },
]
