const heyuiConfig = () => {
  const staticDict = {};
  Object.keys(staticDict).forEach((key) => {
    HeyUI.addDict(key, staticDict[key]);
  });

  HeyUI.config('dict.keyName', 'key');
  HeyUI.config('dict.titleName', 'title');

  HeyUI.config('menu', {
    keyName: 'key',
    titleName: 'title',
    childrenName: 'children'
  });
};

export default heyuiConfig;
