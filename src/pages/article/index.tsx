import { useEffect, useState } from 'react';
import styles from '@/styles/article.module.scss';

const Article = () => {
    const [tag_id, setTagId] = useState('');
    const [sort_type, setSortType] = useState('2');
    const [page, setPage] = useState('1');
    const [total, setTotal] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [tagList, setTagList] = useState([]);
    const [articleList, setArticleList] = useState([]);
    const pageSize = '5'

    useEffect(() => {
        fetch('http://localhost:3002/api/getTagList')
            .then(res => res.json())
            .then(res => {
                setTagList(res.data || [])
            })
    }, [])

    useEffect(() => {
        const params = {
            page,
            pageSize,
            tag_id,
            sort_type,
        }
        fetch(`http://localhost:3002/api/getArticleList?${new URLSearchParams(params).toString()}`)
            .then(res => res.json())
            .then(res => {
                const { articleList, total, totalCount } = res.data
                setArticleList(articleList || [])
                setTotal(total || 0)
                setTotalCount(totalCount || 0)
            })
    }, [tag_id, sort_type, page])

    const handleSelectSortType = (sort_type) => {
        setPage('1')
        setSortType(sort_type)
    }
    const handleSelectTag = (item, tag) => {
        setPage('1')
        setTagId(tag.tag_id === tag_id ? '' : tag.tag_id)
    }
    const handleJump = (url) => {
        window.open(url)
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
        <div className={styles.articleContent}>
            <div className={styles.sortBox}>
                <div className={`${styles.sortItem} ${sort_type === '2' ? styles.sortItemActive : ''}`} onClick={() => handleSelectSortType('2')}>按最新</div>
                <div className={`${styles.sortItem} ${sort_type === '1' ? styles.sortItemActive : ''}`} onClick={() => handleSelectSortType('1')}>按热度</div>
            </div>

            <div className={styles.tagBox}>
                {
                    tagList.map(tag => {
                        return (
                            <div className={`${styles.tagItem} ${ tag.tag_id === tag_id ? styles.tagItemActive : '' }`} key={tag.tag_id} onClick={(item) => handleSelectTag(item, tag)}>
                                {tag.tag_name} {tag.count}
                            </div>
                        )
                    })
                }
            </div>

            <div className={styles.articleBox}>
                {
                    articleList.map(article => {
                        return (
                            <div className={styles.articleItem} key={article.article_id}>
                                <div className={styles.title} onClick={() => handleJump(article.url)}>{article.title}</div>
                                <div className={styles.content}>{article.brief_content}</div>
                                <div className={styles.row}>
                                    <div className={styles.item}>{article.create_date} {article.create_time}</div>
                                    <div className={styles.username} onClick={() => handleJump('https://juejin.cn/user/2137106333053912')}>{article.user_name}</div>
                                    <div className={styles.item}>阅读量：{article.view_count}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>


            <div className={styles.pageBox}>
                <div className={styles.page} onClick={handlePrev}>上一页</div>
                <div className={styles.total}>第 {page} 页，共 {total} 篇文章</div>
                <div className={styles.page} onClick={handleNext}>下一页</div>
            </div>

            <div className={styles.totalCount}>累计已发布 {totalCount} 篇</div>
        </div>
    )
}

export default Article
