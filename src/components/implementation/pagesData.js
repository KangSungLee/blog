const pagesContext = require.context('../../pages/implementationPages', false, /\.jsx$/);
const pagesData = pagesContext.keys().map(key => ({
    path: key.replace('./', '/implementationPage/').replace('.jsx', ''),
    title: key.replace('./', '').replace('.jsx', '').replace(/([A-Z])/g, ' $1').trim(),
    component: pagesContext(key).default,
    // content: pagesContext(key).default.toString()
}));

export default pagesData;
