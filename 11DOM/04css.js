document.addEventListener("DOMContentLoaded", () => {
  const element = document.createElement("div");
  element.style.color = "red";
  element.style.width = '100px';
  element.style.height = '100px';
  document.body.appendChild(element);

  // 1. CSSStyleDeclaration: 表示一个元素的样式声明对象
  const style = element.style;
  console.log("1. CSSStyleDeclaration:", style);
  console.log("1.1 CSSStyleDeclaration.color:", style.color);

  // 2. getComputedStyle: 获取元素的计算样式
  const computedStyle = getComputedStyle(element);
  console.log("2. getComputedStyle:", computedStyle);
  console.log("2.1 getComputedStyle.color:", computedStyle.color);

  // 3. StyleSheet: 表示一个样式表
  const styleSheet = document.styleSheets[0];
  console.log("3. StyleSheet:", styleSheet);

  // 4. CSSRuleList: 表示一个样式表中的规则列表
  const cssRuleList = styleSheet.cssRules;
  console.log("4. CSSRuleList:", cssRuleList);

  // 5. CSSRule: 表示一个单独的样式规则
  const cssRule = cssRuleList[0];
  console.log("5. CSSRule:", cssRule);
  console.log("5.1 CSSRule.selectorText:", cssRule.selectorText);
  console.log("5.2 CSSRule.style.cssText:", cssRule.style.cssText);

  // 6. matchMedia: 检查文档是否匹配指定的媒体查询
  const mediaQueryList = matchMedia("(max-width: 600px)");
  console.log("6. matchMedia:", mediaQueryList);
  console.log("6.1 matchMedia.matches:", mediaQueryList.matches);

  // 7. MediaQueryList: 表示一个媒体查询的结果
  mediaQueryList.addEventListener("change", (event) => {
    console.log("7. MediaQueryList change:", event.matches);
  });
});
