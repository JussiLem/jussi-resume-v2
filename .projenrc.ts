import { web, javascript } from "projen";
const project = new web.NextJsTypeScriptProject({
  defaultReleaseBranch: "main",
  name: "jussi-resume-v2",
  projenrcTs: true,
  prettier: true,
  prettierOptions: {
    settings: {
      bracketSpacing: true,
      printWidth: 120,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: javascript.TrailingComma.ALL,
      useTabs: false,
      arrowParens: javascript.ArrowParens.AVOID,
    }
  },
  deps: ["autoprefixer@10.4.14", "classnames@2.3.2", "ts-pattern@^4.0.3", "@headlessui/react@1.7.5, @heroicons/react@^1.0.6"],
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: ["cssnano@5.1.15", "@tailwindcss/forms@0.5.3", "@tailwindcss/typography@0.5.9"],
  // packageName: undefined,  /* The "name" in package.json. */
  tailwind: true,
});
project.synth();