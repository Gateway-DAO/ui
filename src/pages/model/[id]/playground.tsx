import dynamic from 'next/dynamic';

import { PlaygroundTab } from '@/components/features/protocol/data-models/show/components/playground-tab';
import { DataModelLayout } from '@/components/features/protocol/data-models/show/layout';

export default function ProtocolDataModelPlayground() {
  return <PlaygroundTab />;
}

ProtocolDataModelPlayground.PageLayout = DataModelLayout;
