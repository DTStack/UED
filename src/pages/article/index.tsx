function Index({
    name
}) {
    return <div>Article: {name}</div>
}

Index.getInitialProps = () => {
    return {
        name: 'qianxun'
    }
}
export default Index;
