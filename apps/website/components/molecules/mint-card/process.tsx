import { Subjects } from './index';
import { DefaultMintScreen } from './default-mint-screen';
import { StartMintScreen } from './start-mint-screen';
import { MintingScreen } from './minting-screen';

export function processScreen(
  mintProcessStatus: Subjects,
  setmintProcessStatus: React.Dispatch<React.SetStateAction<Subjects>>
) {
  switch (mintProcessStatus) {
    case Subjects.start:
      return <StartMintScreen {...{ setmintProcessStatus }} />;
    case Subjects.minting:
      return <MintingScreen {...{ setmintProcessStatus }} />;
    default:
      return (
        <DefaultMintScreen {...{ mintProcessStatus, setmintProcessStatus }} />
      );
  }
}
