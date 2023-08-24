import { PlaygroundTab } from '@/components/features/protocol/data-models/view/components/playground-tab';
import { DataModelLayout } from '@/components/features/protocol/data-models/view/layout';
export function getStaticProps() {
  return {
    notFound: true,
  };
}
export default function ProtocolDataModelPlayground() {
  return <PlaygroundTab />;
}

ProtocolDataModelPlayground.PageLayout = DataModelLayout;
