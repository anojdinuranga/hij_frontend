const mainScript= async (data:any ={}) => {
        return default_script();
}

const default_script = () => {
    return `
        <script src="/assets/js/bootstrap.min.js"></script>
        <script src="/assets/js/main.js"></script>
    `;
}



export default mainScript;