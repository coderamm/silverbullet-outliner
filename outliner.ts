import {
  editor,
  getText,
  setText,
} from "@silverbulletmd/silverbullet/syscalls/editor";

export async function autoBullet() {
  const text = await getText();
  const lines = text.split("\n");
  const bulletedLines = lines.map((line) => {
    if (line.trim() === "") return line;
    if (/^\s*[*-]/.test(line)) return line;
    const leadingSpace = line.match(/^(\s*)/)?.[1] || "";
    return `${leadingSpace}* ${line.trim()}`;
  });
  await setText(bulletedLines.join("\n"));
}

export async function toggleOutliner() {
  await autoBullet();
  await editor.flashNotification("Outliner mode applied");
}
