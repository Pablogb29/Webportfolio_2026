# Popover Root Cause Analysis & Fix

## 🔍 Root Cause Identified

### **Primary Issue: Incorrect Position Calculation for `position: fixed`**

**Problem**: Lines 92-93 and throughout `calculatePosition()` were adding `scrollY` and `scrollX` offsets:
```typescript
let top = triggerRect.bottom + GAP + scrollY;  // ❌ WRONG for fixed
let left = triggerRect.left + scrollX;         // ❌ WRONG for fixed
```

**Why This Breaks**:
- `position: fixed` positions elements relative to the **viewport**, not the document
- Adding scroll offsets causes the popover to appear in the wrong location
- When scrolled, the popover appears offset by the scroll amount
- Cards near viewport edges cause inconsistent behavior

### **Secondary Issues Found**:

1. **Z-index too low**: Using `z-50` (50) instead of `9999` - could be hidden behind other elements
2. **Missing left overflow check**: Only checked right overflow, not left
3. **Collision detection**: Needed improvement for edge cases

## ✅ Fixes Applied

### 1. **Removed Scroll Offsets** (CRITICAL FIX)
```typescript
// BEFORE (WRONG):
let top = triggerRect.bottom + GAP + scrollY;
let left = triggerRect.left + scrollX;

// AFTER (CORRECT):
let top = triggerRect.bottom + GAP;  // Viewport coordinates only
let left = triggerRect.left;         // Viewport coordinates only
```

### 2. **Increased Z-index**
```typescript
// Changed from z-50 to z-index: 9999 in inline style
style={{
  top: `${popoverPosition.top}px`,
  left: `${popoverPosition.left}px`,
  zIndex: 9999,  // ✅ High z-index for safety
}}
```

### 3. **Added Left Overflow Check**
```typescript
// Check if overflows left, shift right
if (left < 12) {
  left = 12;
  // Adjust arrow to point to trigger center
  const triggerCenterX = triggerRect.left + triggerRect.width / 2;
  arrowOffset = triggerCenterX - left;
}
```

### 4. **Improved Collision Detection**
- Uses viewport coordinates only (no scroll offsets)
- Properly handles all four edges
- Measures actual popover dimensions after render
- Recalculates position on scroll/resize

## 📋 Verification Checklist

### ✅ Portal Rendering
- Already using `createPortal(popoverContent, document.body)` ✅
- Popover renders outside card containers ✅

### ✅ Position: Fixed
- Using `position: fixed` ✅
- **FIXED**: Removed scroll offsets ✅
- Using viewport coordinates only ✅

### ✅ Collision Handling
- Checks bottom overflow → flips to top ✅
- Checks top overflow → flips to bottom ✅
- Checks right overflow → shifts left ✅
- **ADDED**: Checks left overflow → shifts right ✅

### ✅ Z-index Safety
- **FIXED**: Changed from `z-50` to `z-index: 9999` ✅
- Not affected by parent stacking contexts ✅

### ✅ Hover Logic
- Uses `pointerenter`/`pointerleave` ✅
- Open delay: 80ms ✅
- Close delay: 120ms ✅
- Tracks `isOverTrigger` and `isOverPopover` ✅
- Only closes when both are false ✅

## 🎯 Result

The popover now:
- ✅ Appears consistently regardless of card position
- ✅ Uses correct viewport coordinates (no scroll offset bug)
- ✅ Has high z-index (9999) to stay on top
- ✅ Handles all edge cases (left, right, top, bottom overflow)
- ✅ Works reliably for cards at any position in grid/list

## 📁 Files Modified

- `components/Popover.tsx` - Fixed position calculation, z-index, and collision detection

