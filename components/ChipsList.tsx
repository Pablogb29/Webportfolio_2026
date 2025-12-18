"use client";

import Popover from "./Popover";

interface ChipsListProps {
  items: string[];
  /**
   * Unique ID for this chips list (e.g., "machine-123:tags")
   */
  id: string;
  /**
   * Maximum number of chips to show before showing "+N more"
   */
  maxVisible?: number;
  /**
   * Chip styling classes
   */
  chipClassName: string;
  /**
   * Title for the popover (e.g., "All Tags", "All Skills")
   */
  popoverTitle: string;
  /**
   * Icon color class (for the section header icon)
   */
  iconColor?: string;
  /**
   * Position of the popover relative to trigger
   */
  popoverPosition?: "bottom" | "top";
  /**
   * Alignment of the popover relative to trigger
   */
  popoverAlign?: "left" | "center" | "right";
}

export default function ChipsList({
  items,
  id,
  maxVisible = 3,
  chipClassName,
  popoverTitle,
  iconColor = "text-gray-light/60",
  popoverPosition = "bottom",
  popoverAlign = "left",
}: ChipsListProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const visibleItems = items.slice(0, maxVisible);
  const remainingCount = items.length - maxVisible;
  const hasMore = remainingCount > 0;

  // Sort all items alphabetically for popover
  const sortedItems = [...items].sort((a, b) => a.localeCompare(b));

  return (
    <div className="flex flex-wrap gap-2">
      {visibleItems.map((item) => (
        <span key={item} className={chipClassName}>
          {item}
        </span>
      ))}
      {hasMore && (
        <Popover
          id={id}
          trigger={
            <span className={`px-2 py-1 text-xs ${iconColor} cursor-pointer hover:text-gray-light transition-colors`}>
              +{remainingCount} more
            </span>
          }
          content={
            <>
              {sortedItems.map((item) => (
                <span key={item} className={chipClassName}>
                  {item}
                </span>
              ))}
            </>
          }
          title={popoverTitle}
          position={popoverPosition}
          align={popoverAlign}
          openDelay={80}
          closeDelay={120}
        />
      )}
    </div>
  );
}

