import colorMix, { MixComponent } from "../src/impl/colorMix";
import { AdjusterType, Colorspace } from "../src/util/color";

it("mixes in SRGB colorspace", () => {
  const comp1: MixComponent = {
    color: '#FFFF0000',
    adjusters: [
      {
        type: AdjusterType.green,
        percentage: 0.75,
      }
    ],
  };

  const comp2: MixComponent = {
    color: '#FF0000FF',
    adjusters: [],
  };

  expect(colorMix(comp1, comp2, Colorspace.srgb)).toEqual("rgba(255,191,0,0.5)");
});
