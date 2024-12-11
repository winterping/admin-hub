export default {
  trailingComma: "all", //在多行的对象或数组末尾添加逗号（包括函数参数）。
  singleQuote: true, //使用单引号代替双引号
  semi: false, //不强制分号
  printWidth: 80, //设置单行的最大字符宽度为 80。
  arrowParens: "always", //对箭头函数参数总是添加括号，即使只有一个参数。
  proseWrap: "always", //proseWrap: 'always'
  endOfLine: "lf", //使用 Unix 风格的换行符（\n）。
  tabWidth: 2, //设置每一级缩进为 2 个空格。
  useTabs: false, //禁止使用制表符缩进，统一使用空格。
  quoteProps: "consistent", //对对象属性的引号使用保持一致：如果至少有一个属性需要引号，所有属性都添加引号。
  jsxSingleQuote: false, //在 JSX 中使用双引号代替单引号。
  bracketSpacing: true, //在对象的括号和内容之间保留空格。
  bracketSameLine: false, //多行 JSX 元素的闭合标签不与最后一行内容同行。
  vueIndentScriptAndStyle: false, //禁止对 <script> 和 <style> 标签内容缩进。
  singleAttributePerLine: false, //禁止将每个属性拆分为单独的一行。
};
