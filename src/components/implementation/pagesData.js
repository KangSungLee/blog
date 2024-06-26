const pagesContext = require.context('../../pages/implementationPages', false, /\.jsx$/);
const componentContext = require.context('../../components/implementation', true, /\.jsx$/);

const getComponentContent = (component) => {
    const componentModule = componentContext(component);
    return componentModule.default ? componentModule.default.toString() : '';
};

const pagesData = pagesContext.keys().map(key => {
    const componentName = key.replace('./', '').replace('.jsx', '');
    const componentPath = `./${componentName}/DeliveryTrackerContent.jsx`;
    const componentContent = componentContext.keys().includes(componentPath) ? getComponentContent(componentPath) : '';

    return {
        path: key.replace('./', '/implementationPage/').replace('.jsx', ''),
        title: key.replace('./', '').replace('.jsx', '').replace(/([A-Z])/g, ' $1').trim(),
        component: pagesContext(key).default,
        content: pagesContext(key).default.toString() + componentContent,
    };
});

export default pagesData;
