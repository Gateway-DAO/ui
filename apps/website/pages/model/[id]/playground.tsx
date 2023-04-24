import dynamic from 'next/dynamic';

import { PlaygroundTab } from '../../../components/templates/protocol/data-models/show/components/playground-tab';
import { DataModelLayout } from '../../../components/templates/protocol/data-models/show/layout';

export default function ProtocolDataModelPlayground() {
  return <PlaygroundTab />;
}

ProtocolDataModelPlayground.PageLayout = DataModelLayout;
