import { useState } from 'react';

export enum ViewMode {
  grid,
  table,
}

export function useViewMode() {
  const [view, setView] = useState<ViewMode>(ViewMode.table);
  const toggleView = () => {
    setView((oldView) =>
      oldView === ViewMode.grid ? ViewMode.table : ViewMode.grid
    );
  };
  return { view, toggleView };
}
