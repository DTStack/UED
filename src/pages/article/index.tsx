import { useEffect, useState, useRef } from 'react';
import styles from '@/styles/article.module.scss';
import NavHeader from "@/components/navHeader";
import APP_CONF from "@/data/config";
import {Dropdown, Space, Menu, Spin, BackTop, Button} from "antd";
import { OpenOriginUrl, seo } from "@/data/doc";
import { CaretDownOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import Head from "next/head";
import { isMobile } from '@/utils';

const Article = (data) => {
    const [tag_id, setTagId] = useState('');
    const [sort_type, setSortType] = useState('2');
    const [page, setPage] = useState('1');
    const [total, setTotal] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [tagList, setTagList] = useState([]);
    const [tag_type, setTagType] = useState('');
    const [articleList, setArticleList] = useState([]);
    const [spinning, setSpinning] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [clearArticle, setClearArticle] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const firstUpdate = useRef(true);
    const [mobile, setMobile] = useState(false);
    const pageSize = '10';
    const sortTypeMenus = [
        { label: '按热度', key: '1' },
        { label: '按最新', key: '2' },
    ]
    const {title, description, keywords} = seo || {};
    const sortTag = tagList?.find(item => item.key === tag_type)?.label;
    const env = process.env.NODE_ENV || 'development';
    const fetchUrl = env === 'development' ? 'http://localhost:3002' : '';

    useEffect(() => {
        setMobile(isMobile(window));
        setIsAdmin(window.localStorage.getItem("is-admin") === 'true');
        getTagList()
    }, [])

    useEffect(() => {
        getArticleList();
    }, [tag_id, sort_type, page])

    const getTagList=()=>{
        fetch(`${fetchUrl}/api/getTagList`)
            .then(res => res.json())
            .then(res => {
                const tagList = res.data?.map((item) => {
                    return {
                        ...item,
                        label: item.tag_name,
                        key: item.tag_id,
                    }
                });
                setTagType(tagList?.[0].key);
                setTagList(tagList || []);
            })
    }

    // 处理文章数据
    const handleArticleList = (obj) => {
        const { result = [], total, totalCount } = obj
        const list = (clearArticle ? result : articleList.concat(result)) || []
        setArticleList(list)
        setTotal(total || 0)
        setTotalCount(totalCount || 0)
        setHasMore(+total > list.length)
        setClearArticle(false)
    }

    // 获取文章列表
    const getArticleList = () => {
        if (firstUpdate.current) {
            handleArticleList(data)
            firstUpdate.current = false
            return
        }
        const params = {
            page,
            pageSize,
            tag_id,
            sort_type,
        }
        setSpinning(true)
        fetch(`${fetchUrl}/api/getArticleList?${new URLSearchParams(params).toString()}`)
            .then(res => res.json())
            .then(res => {
                handleArticleList(res.data)
            })
            .finally(() => {
                setSpinning(false)
            })
    }

    // 更新数据库中的文章数据
    const updateArticleList = () => {
        setUpdating(true)
        fetch(`${fetchUrl}/api/updateArticleList`)
            .finally(() => {
                setUpdating(false)
                window.location.reload()
            })
    }

    const handleSelectSortType = (sort_type) => {
        setPage('1')
        setSortType(sort_type)
        setClearArticle(true)
    }
    const handleSelectTag = (item, tag) => {
        setPage('1')
        setTagId(tag.tag_id === tag_id ? '' : tag.tag_id)
        setClearArticle(true);
        setTagType(tag.tag_id);
    }

    // 下一页
    const handleNext = () => {
        if (+page < Math.ceil(total / +pageSize)) {
            setPage(`${+page + 1}`)
        }
    }

    const handleScroll = (e) => {
        const scrollTop = e.target.scrollTop
        const windowHeight = e.target.offsetHeight
        // 内容高度，180 是移动端顶部内容，318 是移动端名称图片内容，80 是 PC 端顶部内容，226 是 PC 端名称图片内容
        const contentHeight =  mobile ? (document.getElementById('articleContent')?.offsetHeight + 180 + 318) : (document.getElementById('articleContent')?.offsetHeight + 80 + 226)

        if (hasMore && (scrollTop + windowHeight + 5 >= contentHeight)) {
            console.log('下一页')
            handleNext()
        }
    }

    return (
        <div className={styles.article} onScroll={handleScroll}>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="keywords" content={keywords} />
                <meta name="description" content={description} />
            </Head>
            <NavHeader isShow={true} isFixed={true}/>
            <div className={styles.totalCard}>
                <img src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Article/logo_big.png`} alt=""/>
                <h1>袋鼠云数栈前端团队</h1>
                <p>共发布 {totalCount} 篇文章</p>
            </div>

            <BackTop>
                <VerticalAlignTopOutlined />
            </BackTop>
            <div id="articleContent" className={styles.articleContent}>
                <Spin spinning={spinning}>
                    <div className={styles.articleContentBox}>
                        <div className={styles.leftBox}>
                            <div className={styles.sortBox}>
                                <div className={styles.title}>文章列表</div>
                                <div className={styles.updateTime}>
                                    {isAdmin ? (
                                        <Button loading={updating} onClick={updateArticleList}>
                                            更新文章数据库
                                        </Button>
                                    ) : null}
                                    <span>文章数据更新时间：{articleList[0]?.createTime}</span>
                                </div>
                                <div className={styles.sortElement}>
                                    <Dropdown
                                        overlay={
                                            (<Menu items={sortTypeMenus} onClick={(item) => handleSelectSortType(item.key)} className={styles.typeMenu} />)
                                        }
                                        trigger={['click']}
                                    >
                                        <Space className={styles.typeSpace}>
                                            {sortTypeMenus.find(item => item.key === sort_type)?.label}
                                            <CaretDownOutlined />
                                        </Space>
                                    </Dropdown>
                                    {mobile && <>
                                        <Dropdown
                                            overlay={
                                                (<Menu items={tagList} onClick={(item) => handleSelectTag('', {tag_id:item?.key})}></Menu>)
                                            }
                                            trigger={['click']}
                                        >
                                            <Space>
                                                <div title={sortTag}>{sortTag?.slice(0, 13)}</div>
                                                <CaretDownOutlined />
                                            </Space>
                                        </Dropdown>
                                        <Dropdown
                                            overlay={
                                                (<Menu items={OpenOriginUrl} onClick={({key}) => {
                                                    const site = OpenOriginUrl?.find((item) => item.key === key)?.site;
                                                    window.open(site);
                                                }
                                                }></Menu>)
                                            }
                                            trigger={['click']}
                                        >
                                            <Space>
                                                社区
                                                <CaretDownOutlined />
                                            </Space>
                                        </Dropdown>
                                    </>}
                                </div>
                            </div>
                            <div className={styles.articleBox}>
                                {
                                    articleList.map(article => {
                                        return (
                                            <div className={styles.articleItem} key={article.article_id}>
                                                <a className={styles.title} href={article.url} target='_blank' rel="nofollow noopener noreferrer">{article.title}</a>
                                                <div className={styles.content}>{article.brief_content}</div>
                                                <div className={styles.row}>
                                                    <div>{article.create_date} { mobile ? '' : article.create_time}</div>
                                                    <a className={styles.username} href={'https://juejin.cn/user/2137106333053912'} target='_blank' rel="nofollow noopener noreferrer">{article.user_name}</a>

                                                    <div className={styles.countBox}>
                                                        <div>
                                                            <img src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Article/eye.svg`} alt=""/>
                                                            {article.view_count}
                                                        </div>
                                                        <div>
                                                            <img src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Article/liked.svg`} alt=""/>
                                                            {article.digg_count}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={styles.rightBox}>
                            <div className={styles.tagBox}>
                                <div className={styles.title}>相关分类</div>
                                {
                                    tagList?.map(tag => {
                                        return (
                                            <div className={`${styles.tagItem} ${ tag.tag_id === tag_id ? styles.tagItemActive : '' }`} key={tag.tag_id} onClick={(item) => handleSelectTag(item, tag)}>
                                                {tag.tag_name} {tag.count}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className={styles.originBox}>
                                <div className={styles.title}>社区</div>
                                {
                                    OpenOriginUrl.map(url => {
                                        return (
                                            <a
                                                key={url.key}
                                                className={styles.originItem}
                                                href={url.site}
                                                rel="nofollow noopener noreferrer"
                                                target="_blank"
                                            >
                                                <img src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Article/point.svg`} alt=""/>
                                                {url.name}
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </Spin>
            </div>
        </div>
    )
}

export default Article

export async function getServerSideProps (context) {
    const { data } = await fetch(`http://localhost:3002/api/getArticleList?pageSize=10`).then(res => res.json())
    return {
        props: data
    }
}
