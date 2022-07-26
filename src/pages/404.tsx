import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const NotFound: NextPage = () => {
    const router = useRouter();

    // TODO: 页面404时重定向，暂未找到更好的方法
    useEffect(() => {
        router.push('/');
    });

    return null;
};

export default NotFound;
