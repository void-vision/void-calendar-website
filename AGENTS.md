# 官网界面工作

- 中文交流。保留现有品牌风格、业务文案承诺、双语路由和产品演示行为。
- 构建、修改、审计任何界面前，读取 `.agents/skills/refactoring-ui/SKILL.md`，按需加载其 `references/`，不要一次读取整个目录。
- 本项目为 React 19 + TanStack Start SSR、Tailwind CSS 4、shadcn/Radix。设计变量位于 `src/styles.css`；现有设计系统优先于 skill 的示例值。
- 审计按层级、布局与间距、排版、色彩、深度、图像、收尾顺序进行。发现与修复记录在 `docs/ui-audit.md`，每项引用规则号，并区分实测与源码推断。
- 在 1280px 和 375px 下检查中英文页面；修复后验证相应页面、交互与键盘路径。图片、图表和表格需要局部滚动时，不得用全站隐藏横向溢出来掩盖布局缺陷。
- UI 变更后运行 `bun run typecheck`、`bun run build` 和相关测试。不要手改生成的路由树，不要部署或发布，除非用户明确要求。

Skill 来源：edisonmbli/refactoring-ui-skill，固定于 4459662c4fbf36d54342b1546d8851273031442c；第三方许可证和署名保留于 skill 目录。
