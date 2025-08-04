const nextConfig = {
    assetPrefix: '/ued',
    // 本地开发时要放开 basePath 的注释
    // basePath: '/ued',
    distDir: 'build',
    images: {
        domains: [
            'assets.dtstack.com',
        ],
    },
}

module.exports = nextConfig
