import BlockProps from "./BlockProps";

type LevelProps = {
  count?: number;
  types?: React.ComponentType<BlockProps>[];
  seed?: number;
}

export default LevelProps;