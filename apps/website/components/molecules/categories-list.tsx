import { useEffect, useRef, useState } from 'react';

import { useIntersection } from 'react-use';

import { Chip, List, ListItem, Popover, Stack } from '@mui/material';

import GateStateChip from '../atoms/gate-state-chip';

type CategoriesListProps = {
  categories: string[];
  isGate?: boolean;
  showStatus?: boolean;
  published?: string;
  listMode?: boolean;
  isPass?: boolean;
};

export function CategoriesList({
  categories,
  isGate,
  showStatus,
  published,
  listMode,
  isPass,
  ...props
}: CategoriesListProps): JSX.Element {
  const refs = useRef<HTMLDivElement[]>([]);
  const parentRef = useRef<HTMLDivElement>(null);
  const [itemsPopover, setItemsPopover] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const intersection = useIntersection(parentRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (intersection?.intersectionRatio > 0) {
      const arr: string[] = [];
      refs.current.map((chip) => {
        if (
          parentRef.current.getBoundingClientRect().right -
            (chip.getBoundingClientRect().right + 50) <
          0
        ) {
          arr.push(chip.textContent);

          chip.style.display = 'none';
        }
      });
      setItemsPopover([...itemsPopover, ...arr]);
    }
  }, [intersection]);

  return (
    <>
      <Stack
        aria-hidden={false}
        direction="row"
        sx={{ position: 'relative' }}
        justifyContent={'space-between'}
        ref={parentRef}
      >
        <Stack direction="row" pt={1} spacing={listMode ? 0 : 1} {...props}>
          {isPass && (
            <Chip
              aria-hidden={false}
              label="Pass"
              size="small"
              sx={{ mr: listMode ? '10px' : 'none' }}
              color="secondary"
            />
          )}
          {categories?.map((category, index) => {
            const formattedLabel =
              category.charAt(0).toUpperCase() + category.slice(1);
            return (
              <Chip
                aria-hidden={false}
                ref={(element) => (refs.current[index] = element)}
                key={category + index}
                label={formattedLabel}
                size="small"
                sx={{ mr: 'none' }}
              />
            );
          })}
        </Stack>

        {itemsPopover.length > 0 && (
          <Stack mt={1}>
            <Chip
              size="small"
              aria-owns={open ? 'mouse-over-popover' : undefined}
              onMouseEnter={(event) => setAnchorEl(event.currentTarget)}
              onMouseLeave={() => setAnchorEl(null)}
              label={`+ ${itemsPopover.length}`}
            />
          </Stack>
        )}
        {isGate && (
          <Stack direction="row" spacing={1} px={2} pt={1} pb={2} {...props}>
            {showStatus && <GateStateChip published={published} small />}
          </Stack>
        )}
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={() => setAnchorEl(null)}
          disableRestoreFocus
        >
          <List>
            {itemsPopover.map((listItem) => (
              <ListItem key={listItem} sx={{ px: 2, py: 1, width: '200px' }}>
                {listItem}
              </ListItem>
            ))}
          </List>
        </Popover>
      </Stack>
    </>
  );
}
