import { PartialDeep } from 'type-fest';

import { Credentials } from '../../../services/graphql/types.generated';
import { DefaultMintScreen } from './screen/default-mint-screen';
import { MintingScreen } from './screen/minting-screen';
import { StartMintScreen } from './screen/start-mint-screen';

import { Subjects } from './index';

export function processScreen(
  mintProcessStatus: Subjects,
  setMintProcessStatus: React.Dispatch<React.SetStateAction<Subjects>>,
  mint: (token_uri?: string) => void,
  details: {
    error?: any;
    credential: PartialDeep<Credentials>;
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
        <MintingScreen
          {...{ mintProcessStatus, setMintProcessStatus, mint, details }}
        />
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
