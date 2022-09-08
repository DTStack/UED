import { useEffect, useState, useRef } from 'react';
import styles from '@/styles/article.module.scss';
import NavHeader from "@/components/navHeader";
import APP_CONF from "@/data/config";
import { Menu, Spin, BackTop } from "antd";
import { OpenOriginUrl, seo } from "@/data/doc";
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import Head from "next/head";

const Article = (data) => {
    const [tag_id, setTagId] = useState('');
    const [sort_type, setSortType] = useState('2');
    const [page, setPage] = useState('1');
    const [total, setTotal] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [tagList, setTagList] = useState([]);
    const [articleList, setArticleList] = useState([]);
    const [spinning, setSpinning] = useState(false);
    const firstUpdate = useRef(true);
    const pageSize = '7';
    const {title, description, keywords} = seo || {};

    useEffect(() => {
        fetch('http://localhost:3002/api/getTagList')
            .then(res => res.json())
            .then(res => {
                setTagList(res.data || [])
            })
    }, [])

    useEffect(() => {
        getArticleList();
    }, [tag_id, sort_type, page])

    const getArticleList = () => {
        if (firstUpdate.current) {
            const { articleList, total, totalCount } = data
            setArticleList(articleList || [])
            setTotal(total || 0)
            setTotalCount(totalCount || 0)

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
        fetch(`http://localhost:3002/api/getArticleList?${new URLSearchParams(params).toString()}`)
            .then(res => res.json())
            .then(res => {
                const { articleList, total, totalCount } = res.data
                setArticleList(articleList || [])
                setTotal(total || 0)
                setTotalCount(totalCount || 0)
            })
            .finally(() => {
                setSpinning(false)
            })
    }

    const handleSelectSortType = (sort_type) => {
        setPage('1')
        setSortType(sort_type)
    }
    const handleSelectTag = (item, tag) => {
        setPage('1')
        setTagId(tag.tag_id === tag_id ? '' : tag.tag_id)
    }

    const handlePrev = () => {
        if (+page > 1) {
            setPage(`${+page - 1}`)
        }
    }
    const handleNext = () => {
        if (+page < Math.ceil(total / +pageSize)) {
            setPage(`${+page + 1}`)
        }
    }

    return (
        <div className={styles.article}>
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
            <div className={styles.articleContent}>
                <Spin spinning={spinning}>
                    <div className={styles.articleContentBox}>
                        <div className={styles.leftBox}>
                            <div className={styles.sortBox}>
                                <div>文章列表</div>
                                {/* <div className={`${styles.sortItem} ${sort_type === '2' ? styles.sortItemActive : ''}`} onClick={() => handleSelectSortType('2')}>按最新</div>
                                <div className={`${styles.sortItem} ${sort_type === '1' ? styles.sortItemActive : ''}`} onClick={() => handleSelectSortType('1')}>按热度</div> */}
                            </div>
                            <div className={styles.articleBox}>
                                {
                                    articleList.map(article => {
                                        return (
                                            <div className={styles.articleItem} key={article.article_id}>
                                                <a className={styles.title} href={article.url} target='_blank' rel="nofollow noopener noreferrer">{article.title}</a>
                                                <div className={styles.content}>{article.brief_content}</div>
                                                <div className={styles.row}>
                                                    <div className={styles.item}>{article.create_date} {article.create_time}</div>
                                                    <a className={styles.username} href={'https://juejin.cn/user/2137106333053912'} target='_blank' rel="nofollow noopener noreferrer">{article.user_name}</a>
                                                    <div className={styles.item}><img src={`${APP_CONF.IMAGE_DOMAIN}/UEDLanding/Article/eye.svg`} alt=""/>{article.view_count}</div>
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
                        {/*<div className={styles.pageBox}>*/}
                        {/*    <div className={styles.page} onClick={handlePrev}>上一页</div>*/}
                        {/*    <div className={styles.total}>第 {page} 页，共 {total} 篇文章</div>*/}
                        {/*    <div className={styles.page} onClick={handleNext}>下一页</div>*/}
                        {/*</div>*/}
                    </div>
                </Spin>
            </div>
        </div>
    )
}

export default Article

export async function getServerSideProps (context) {
    const { data } = await fetch(`http://localhost:3002/api/getArticleList?pageSize=7`).then(res => res.json())
    return {
        props: data
    }
}
