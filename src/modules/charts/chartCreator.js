// 注入所有的实例对象和图表初始参数
const charts = new Map(); // 存放所有的图表类（构造函数）
const ChartCreator = Object.create({
  // 注册构造函数
  register(name, constructor) {
    charts.set(name, constructor);
  },
  // 获取当前图表的构造函数
  getConstructor(theme) {
    const chartConstructor = charts.get(theme);
    if (chartConstructor) {
      return new Promise(resolve => resolve(chartConstructor));
    } else {
      console.warn(`Can't find ${theme} constructor`);
    }
  },
  // 拿到构造函数，实例化
  create(option, theme) {
    return ChartCreator.getConstructor(theme).then(ChartConstructor => {
      let chart = new ChartConstructor(option, elm, theme);
      return chart;
    });
  }
});
