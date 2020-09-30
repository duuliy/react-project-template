export default (api) => {
    // console.log(api.pluginMethods)
    console.log(api.service.pluginMethods)
    api.service.pluginMethods.addHTMLHeadScripts({
      type: "text/javascript",
      src: 'https://webapi.amap.com/maps?v=1.4.15&key=4a5b71a582d1245762d01a6cec855f61',
    });
  };