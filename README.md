# t3code-enhancer

T3 Code 桌面版的主题与界面增强工具，提供安装、状态检测和卸载命令。

## macOS 独立应用

Apple 芯片 Mac 使用独立的 **T3 Code 增强版**，支持加号菜单、模型与思考深度选择、额度与上下文浮层、工作过程折叠联动。首次打开时，可在连接设置中添加已有的 T3 环境来查看历史对话。历史和正在运行的任务由原环境继续管理。

从包含 macOS 增强功能的 T3 Code 源码工作树构建。先在该工作树运行 `vp i`，然后在本仓库运行：

```bash
node macos.cjs /path/to/t3code-source /path/to/new-output
```

构建入口会验证应用身份和本机签名，然后输出 `T3 Code Enhancer.app` 的路径。双击应用即可启动。

适用于 T3 Code **0.1.11** 的 **Windows 桌面版**和 **Linux x86_64 官方 AppImage**。Linux 版会安装一个独立的增强版副本。

从 [GitHub Releases](https://github.com/Barometer-2002/t3code-enhancer/releases/latest) 下载安装 ZIP。安装、卸载和界面截图见 [使用教程](使用教程.md)。

## 界面预览

![输入框底栏，左侧是加号和额度，右侧是上下文、模型、思考深度和发送按钮](assets/tutorial/composer.png)

| 加号菜单 | 模型与 Harness |
| :---: | :---: |
| <img src="assets/tutorial/plus-menu.png" alt="添加文件、引用、技能与斜杠命令菜单" width="310"> | <img src="assets/tutorial/model-picker.png" alt="Harness 切换、模型搜索与选择" width="310"> |

| 思考深度 | 右侧详情面板 |
| :---: | :---: |
| <img src="assets/tutorial/effort-slider.png" alt="思考深度滑块与恢复默认按钮" width="310"> | <img src="assets/tutorial/side-panel.png" alt="右侧详情面板的额度双环与上下文占用" width="297"> |

| 额度详情 | 上下文与统计 |
| :---: | :---: |
| <img src="assets/tutorial/quota-details.png" alt="5 小时和 7 天剩余额度及重置时间" width="310"> | <img src="assets/tutorial/context-stats.png" alt="上下文占用、缓存命中率与 Token 明细" width="310"> |

**工作过程**可以按组展开。收起上级后，再次打开时下级仍处于折叠状态。

![展开工作组后显示的命令与工具列表](assets/tutorial/work-log.png)

## 包含模块

1. **ChatGPT / Codex 一体化主题（`themes/chatgpt-app.json`）**
   - 明暗双模统一设计 Token（`768px` 主阅读栏 / `296px` 右侧面板 / `10px` 根圆角 / 4 级墨色与字号阶梯）。
   - 全局 `vector-effect: non-scaling-stroke`（`1.35px` 固定物理线宽）+ 分区锁定图标尺寸，彻底消除图标发虚与粗细不一。
   - 主对话区 `0px → 7px → 22px` 左轴对齐、侧栏统一 `10px` 基准线、无顶栏硬线、丝滑鼠标悬停交互。
2. **多层级折叠联动补丁（`lib/patches/timeline-collapse.cjs`）**
   - 收起上级菜单（回合折叠 / 尝试折叠 / 工具组折叠）时，自动清空该分支下所有下级展开状态，同级其他回合不受影响。
3. **加号多功能菜单、思考深度滑块/Harness 快切 & 悬停双浮层卡（`lib/patches/usage-rings.cjs`）**
   - **底部输入框 `+` 多功能菜单**：将原回形针附件按钮升级为 ChatGPT 风格 `32×32px` 圆形 `+` 按钮（`17px` 图标，带常驻/悬停/按压分阶圆底纹），点击展开分组菜单（`添加`：文件和图片 / `@` 引用工作区文件 / `$` 技能与扩展；`模式与命令`：`/btw` 侧边对话 / 压缩上下文 / 新建干净上下文 / `/` 全部斜杠命令），菜单图标统一锁定 `15px` / `1.35px` 线宽。
   - **完全替换原生三栏模型面板（ChatGPT 双面板一体设计）**：
     - **模型 & Harness 按钮（`[ 图标 模型名 ]`）**：点击展开 ChatGPT 风格 `288px`「选择模型」卡片——顶部为严格过滤后的**仅已开启可用 Harness 2 列网格**（默认展示 4 个，超出可点「展开 +N / 收起」）、中段为简洁单列模型列表（多模型自动出现搜索框）、底部集成 T3 原生访问权限切换与「思考深度 ›」直达入口。
     - **独立思考深度按钮（`[ ▂▄▆ High ]`）**：不再与模型按钮重复显示，点击展开纯正 ChatGPT 风格推理强度滑块卡片（`⚡` 快速模式开关、`↺` 恢复默认、点击/拖拽/键盘吸附的靛蓝分段滑块、以及模型名直达入口），两张面板设计语言完全统一且一键互通。
   - **底部双胶囊（悬停直接展开 + 同款 `8px` 圆角灰底纹响应）**：
     - 左下角 `◎ 84%` 额度双环：**实时联动当前选中模型**（多模型独立额度池下自动匹配如 `Gemini` / `Gemini 4 Argon` / `Claude & GPT (shared)`，低额文字与圆环同步变橙/红），悬停展开「**用量**」卡片（当前模型额度行标有「当前」徽标 + 5h/7d 各自独立换行重置倒计时 + 「查看完整用量 →」跳转）。
     - 右下角 `19% · 204k ◔` 上下文直显（支持费用自动拼接）：悬停展开「**上下文与统计**」卡片（上下文进度条与自动压缩刻度线、会话费用/缓存命中/回合与步骤统计、本轮耗时与输入输出、Token 细分统计）。
   - **右侧详情面板**：自动配对同一模型的 `5h` / `7d` 窗口为双层同心圆环（外环 7d 陶土橙、内环 5h 翡翠绿，低额度自动变警告橙/红），统一 `px-2.5` 左对齐，上下文圆环悬停同步展开「上下文与统计」浮层。
   - **自动激活与还原**：`install.cmd` 会自动在 `settings.json` 中激活 `chatgpt-app` 主题，`uninstall.cmd` 会同步还原默认主题与纯净原版 `server.asar`。

## 使用方法

### Windows 一键脚本

- **查看状态**：双击 `status.cmd`
- **一键安装**：先关闭所有 T3 Code 窗口 → 双击 `install.cmd` → 重新打开 T3 Code
- **一键卸载**：先关闭所有 T3 Code 窗口 → 双击 `uninstall.cmd` → 重新打开 T3 Code

### Windows 命令行

```powershell
node cli.cjs status                  # 查看安装状态与备份完整性
node cli.cjs install                 # 安装全部模块（主题 + 两项前端补丁）
node cli.cjs install --theme-only    # 仅更新主题（无需退出 T3 Code）
node cli.cjs uninstall               # 完整卸载并逐字节还原原版 server.asar
node cli.cjs uninstall --keep-theme  # 仅卸载前端补丁，保留主题
node tests/verify.cjs                # 运行自动化单元测试与 ASAR 试构建校验
```

### Linux x86_64

准备 Node.js 20 或更新版本，以及 [T3 Code 0.1.11 官方 x86_64 AppImage](https://github.com/pingdotgg/t3code/releases/tag/v0.1.11)。在增强包解压目录中以桌面用户执行：

```bash
node linux.cjs install ~/Downloads/T3-Code-x86_64.AppImage
"${XDG_DATA_HOME:-$HOME/.local/share}/t3code-enhancer/launch.sh"
```

安装器校验官方 AppImage 的 SHA-256 后解包，原 AppImage 可继续单独使用。增强版默认使用本地端口 `3774`，可在启动命令前用 `T3CODE_PORT=3775` 指定空闲端口。首次启动后可在「设置 → 外观」选择 **ChatGPT App**。

`node linux.cjs status` 查看状态。退出增强版后执行 `node linux.cjs uninstall` 可以移除它，增强版的会话和偏好保存在同级的 `t3code-enhancer-profile`。安装和卸载已在 Omarchy x86_64 上验证。

## 安全保障
- 安装前自动备份纯净原版为 `server.asar.before-t3code-enhancer`（若此前已安装过旧版 `patch-timeline-collapse.cjs`，会自动继承其纯净原版备份，绝不覆盖原版）。
- 写入前自动进行 ESM 语法检查、SHA-256 块完整性重算、以及所有未修改文件的逐字节一致性校验。
- T3 Code 后续版本更新覆盖 `server.asar` 时，可先运行 `node cli.cjs status` 确认兼容性。

## 许可与致谢

本项目是独立的 T3 Code 增强工具，采用 [MIT 许可](LICENSE)。

- 补丁定位使用了 [T3 Code](https://github.com/pingdotgg/t3code) 的部分代码片段。 [T3 Code 许可](licenses/T3-Code.txt)
- 部分面板图标来自 [Lucide](https://github.com/lucide-icons/lucide) 及 Feather。 [Lucide 与 Feather 许可](licenses/Lucide.txt)
- 本项目认可并支持 [LINUX DO 社区](https://linux.do/)。
