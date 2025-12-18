# Tags & Skills Popover Implementation

## ✅ Completed Implementation

### Overview
Implemented a progressive disclosure pattern for Tags and Skills in the CTF Machines section. Users can now hover (desktop) or click (mobile) on "+N more" to see all tags/skills in a non-intrusive popover without breaking the grid layout.

### Components Created

#### 1. **Popover Component** (`components/Popover.tsx`)
A reusable popover component with:
- **Hover support (desktop)**: Shows on hover with configurable delay
- **Click support (mobile)**: Toggles on click/tap for touch devices
- **Auto-detection**: Uses `@media (hover: hover)` to detect device capabilities
- **Positioning**: Configurable position (top/bottom) and alignment (left/center/right)
- **Accessibility**: 
  - Keyboard navigation (Enter/Space to open, Escape to close)
  - ARIA attributes (`aria-haspopup`, `aria-expanded`, `role="dialog"`)
  - Focus management
- **Click outside**: Closes when clicking outside the popover
- **Mouse leave**: Closes when mouse leaves both trigger and popover (desktop only)

#### 2. **ChipsList Component** (`components/ChipsList.tsx`)
A specialized component for displaying chips with "+N more" functionality:
- Shows first N chips (configurable)
- Displays "+N more" trigger when there are more items
- Uses Popover to show all chips sorted alphabetically
- Customizable chip styling
- Configurable popover title and positioning

### Integration

#### MachineCard Component
- **Tags**: Shows first 3 tags, "+N more" opens popover with all tags
- **Skills**: Shows first 3 skills, "+N more" opens popover with all skills
- Popover appears below the trigger

#### MachineListItem Component
- **Tags**: Shows first 3 tags, "+N more" opens popover with all tags
- **Skills**: Shows first 2 skills, "+N more" opens popover with all skills
- Popover appears above the trigger (to avoid overflow)

### Features

#### ✅ Interaction Behavior
- **Desktop**: Hover over "+N more" to show popover
- **Mobile/Touch**: Tap "+N more" to toggle popover
- **Click outside**: Closes popover
- **Escape key**: Closes popover and returns focus to trigger

#### ✅ UI Constraints
- **No layout shifts**: Popover uses `position: absolute`, doesn't affect card height
- **No grid reflow**: Popover overlays content, doesn't push other cards
- **Proper z-index**: Popover appears above all content (`z-50`)
- **Max width**: Constrained to `20rem` (configurable)
- **Scrollable**: Content scrolls if it overflows (`max-h-48 overflow-y-auto`)

#### ✅ Content Display
- **Section title**: "All Tags" or "All Skills" shown in popover header
- **Sorted alphabetically**: All chips sorted for easy scanning
- **Consistent styling**: Chips use same styles as visible ones
- **Proper spacing**: Chips wrap with consistent gap

#### ✅ Accessibility
- **Keyboard accessible**: Tab to focus, Enter/Space to open, Escape to close
- **ARIA attributes**: Proper `aria-haspopup`, `aria-expanded`, `role="dialog"`
- **Focus management**: Focus returns to trigger on close
- **Screen reader friendly**: Popover has descriptive `aria-label`

### Technical Details

#### Popover Positioning
```typescript
// Bottom position (default for cards)
position="bottom" align="left"
// Popover appears below trigger, aligned to left

// Top position (for list items)
position="top" align="left"
// Popover appears above trigger, aligned to left
```

#### Styling
- **Background**: `bg-container-alt/95` with backdrop blur
- **Border**: `border-accent/20` for subtle border
- **Shadow**: `shadow-xl` for depth
- **Max height**: `max-h-48` (12rem) with scroll

#### State Management
- Each card manages its own popover state
- Only one popover open per card at a time
- State resets when popover closes

### Usage Example

```tsx
<ChipsList
  items={machine.tags}
  maxVisible={3}
  chipClassName="px-2 py-1 bg-cyber-purple/10 text-purple-accent text-xs rounded border border-cyber-purple/20"
  popoverTitle="All Tags"
  iconColor="text-gray-light/60"
  popoverPosition="bottom"
  popoverAlign="left"
/>
```

### Design Principles

1. **Progressive Disclosure**: Minimal information by default, full detail on demand
2. **Zero Visual Clutter**: Clean, unobtrusive "+N more" indicator
3. **Responsive**: Adapts to device capabilities (hover vs click)
4. **Accessible**: Full keyboard and screen reader support
5. **Performant**: No layout shifts, smooth animations

### Browser Support

- Modern browsers with CSS `backdrop-filter` support
- Graceful degradation for older browsers (popover still works, just no blur)
- Touch devices automatically use click instead of hover

### Future Enhancements

Potential improvements:
- Add animation/transition for popover appearance
- Support for custom popover content (not just chips)
- Configurable delays for hover/hide
- Viewport-aware positioning (flip if near edge)

