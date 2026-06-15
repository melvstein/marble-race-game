import BlockProps from "./BlockProps";

type LevelProps = {
  count?: number;
  types?: React.ComponentType<BlockProps>[];
}

export default LevelProps;