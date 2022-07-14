import { Subjects } from './index';
import { DefaultMintScreen } from './default-mint-screen';
import { StartMintScreen } from './start-mint-screen';
import { MintingScreen } from './minting-screen';

export function processScreen(
  mintProcessStatus: Subjects,
  setMintProcessStatus: React.Dispatch<React.SetStateAction<Subjects>>,
  mint: (token_uri?: string) => void,
  details: {
    title: string;
    description: string;
    image: string;
    categories: string[];
    nft_url?: string;
  }
) {
  switch (mintProcessStatus) {
    case Subjects.start:
      return (
        <StartMintScreen
          {...{ mintProcessStatus, setMintProcessStatus, mint }}
        />
      );
    case Subjects.minting:
    case Subjects.successful:
    case Subjects.failed:
    case Subjects.sign:
      return (
        <MintingScreen {...{ mintProcessStatus, setMintProcessStatus, mint }} />
      );
    case Subjects.default:
    case Subjects.alreadyMinted:
      return (
        <DefaultMintScreen
          {...{ mintProcessStatus, setMintProcessStatus, mint, details }}
        />
      );
  }
}
