import { ValueType, Tags, FetchedData } from "../../../src/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/group-generator";
import { Group } from "../../../src/group";

export default new GroupGenerator({
  name: "pooly-lawyer-minters",
  generate: async (context: GeneratorContext): Promise<Group[]> => {
    const allPoolyGroup = await Group.store.latest("pooly-minters");

    const data: FetchedData = {};

    // filter only on value >= 2 (lawyer or judge to avoid doxing)
    for (const address in allPoolyGroup.data) {
      const groupData = await allPoolyGroup.data()
      if (groupData[address] >= 2) {
        data[address] = 1;
      }
    }

    return [new Group({
      name: "pooly-lawyer-minters",
      generationDate: new Date(context.timestamp),
      data,
      valueType: ValueType.Score,
      tags: [Tags.Mainnet, Tags.Asset, Tags.NFT],
    })];
  },
  generationFrequency: GenerationFrequency.Once,
});
