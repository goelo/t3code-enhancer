const { execFileSync } = require("node:child_process");
const { realpathSync } = require("node:fs");
const path = require("node:path");

function main() {
  const [sourcePath, outputPath, extra] = process.argv.slice(2);
  if (!sourcePath || !outputPath || extra) {
    throw new Error("用法：node macos.cjs <T3 Code 增强版源码工作树> <输出目录>");
  }
  if (process.platform !== "darwin" || process.arch !== "arm64") {
    throw new Error("此构建入口支持 Apple 芯片上的 macOS。");
  }
  const source = realpathSync(sourcePath);
  const output = path.resolve(outputPath);
  execFileSync(process.execPath, [
    "scripts/build-desktop-artifact.ts", "--platform", "mac", "--arch", "arm64",
    "--target", "dir", "--output-dir", output,
  ], { cwd: source, stdio: "inherit" });

  const app = path.join(output, "mac-arm64", "T3 Code Enhancer.app");
  const appId = execFileSync("/usr/libexec/PlistBuddy", [
    "-c", "Print CFBundleIdentifier", path.join(app, "Contents", "Info.plist"),
  ], { encoding: "utf8" }).trim();
  if (appId !== "com.goelo.t3code-enhancer") {
    throw new Error(`不匹配的应用标识：${appId}`);
  }
  execFileSync("/usr/bin/codesign", ["--verify", "--deep", "--strict", app], {
    stdio: "inherit",
  });
  console.log(app);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
