import postcss from "postcss";
import plugin from "../src/index";

async function run(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it("transforms color-mix functions", async () => {
  await run("a { color: color-mix(peru 40%, lightgoldenrod); }", "a { color: color-mix(peru 40%, lightgoldenrod); }", {})
});

it("transforms color-contrast functions", async () => {
  await run("", "", {})
});

it("transforms color-adjust functions", async () => {
  await run("", "", {})
});
