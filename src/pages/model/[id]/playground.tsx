import { PlaygroundTab } from '@/components/features/protocol/data-models/view/components/playground-tab';
import { DataModelLayout } from '@/components/features/protocol/data-models/view/layout';

export default function ProtocolDataModelPlayground() {
  return <PlaygroundTab />;
}

ProtocolDataModelPlayground.PageLayout = DataModelLayout;
