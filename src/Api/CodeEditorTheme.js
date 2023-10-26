import { loader } from "@monaco-editor/react";

 const monacoThemes = {
  "active4d": "Active4D",
  "blackboard": "Blackboard",
  clouds: "Clouds",
  "cobalt": "Cobalt",
  "dawn": "Dawn",
  "github": "GitHub",
 "monokai": "Monokai",
  "night-owl": "Night Owl",
  "solarized-dark": "Solarized-dark",
  "solarized-light": "Solarized-light",
  "spacecadet": "SpaceCadet",
  "sunburst": "Sunburst",
  "tomorrow-night-blue": "Tomorrow-Night-Blue",
  "tomorrow-night": "Tomorrow-Night",

};

const defineTheme = async(theme) => {
  return new Promise((res) => {
    Promise.all([
      loader.init(),
      import(`monaco-themes/themes/${monacoThemes[theme]}.json`),
    ]).then(([monaco, themeData]) => {
      monaco.editor.defineTheme(theme, themeData);
      res();
    });
  });
};

export { defineTheme, monacoThemes };