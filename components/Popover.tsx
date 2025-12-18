"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { usePopoverContext } from "@/contexts/PopoverContext";

interface PopoverProps {
  id: string; // Unique ID for this popover (e.g., "machine-123:tags")
  trigger: ReactNode;
  content: ReactNode;
  title?: string;
  /**
   * Position of the popover relative to trigger
   * 'bottom' = below trigger, 'top' = above trigger
   */
  position?: "bottom" | "top";
  /**
   * Alignment of the popover relative to trigger
   * 'left' = align left, 'center' = center, 'right' = align right
   */
  align?: "left" | "center" | "right";
  /**
   * Delay before showing popover on hover (ms)
   */
  openDelay?: number;
  /**
   * Delay before hiding popover after mouse leave (ms)
   */
  closeDelay?: number;
}

interface PopoverPosition {
  top: number;
  left: number;
  arrowPosition: "top" | "bottom";
  arrowOffset: number;
}

export default function Popover({
  id,
  trigger,
  content,
  title,
  position = "bottom",
  align = "left",
  openDelay = 80,
  closeDelay = 120,
}: PopoverProps) {
  const { openPopoverId, setOpenPopoverId } = usePopoverContext();
  const isOpen = openPopoverId === id;

  const [isOverTrigger, setIsOverTrigger] = useState(false);
  const [isOverPopover, setIsOverPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState<PopoverPosition | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect if device supports hover
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia("(hover: hover)");
    setSupportsHover(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setSupportsHover(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Calculate popover position using position: fixed (viewport coordinates only)
  const calculatePosition = (): PopoverPosition | null => {
    if (!triggerRef.current) return null;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const GAP = 8;
    const POPOVER_WIDTH = window.innerWidth >= 640 ? 380 : 320;
    // Get actual popover height if available, otherwise estimate
    const POPOVER_HEIGHT = popoverRef.current?.getBoundingClientRect().height || 200;

    // Default: bottom-start (position = "bottom", align = "left")
    // IMPORTANT: Using position: fixed, so NO scrollY/scrollX offsets
    let top = triggerRect.bottom + GAP;
    let left = triggerRect.left;
    let arrowPosition: "top" | "bottom" = "top";
    let arrowOffset = 20; // Offset from left edge (default for left alignment)

    // Handle alignment
    if (align === "center") {
      left = triggerRect.left + triggerRect.width / 2 - POPOVER_WIDTH / 2;
      arrowOffset = POPOVER_WIDTH / 2;
    } else if (align === "right") {
      left = triggerRect.right - POPOVER_WIDTH;
      arrowOffset = POPOVER_WIDTH - 20;
    }

    // Check if overflows bottom, flip to top
    if (position === "bottom" && triggerRect.bottom + POPOVER_HEIGHT + GAP > viewportHeight) {
      top = triggerRect.top - GAP - POPOVER_HEIGHT;
      arrowPosition = "bottom";
    } else if (position === "top") {
      top = triggerRect.top - GAP - POPOVER_HEIGHT;
      arrowPosition = "bottom";
      // Check if overflows top, flip to bottom
      if (triggerRect.top - POPOVER_HEIGHT - GAP < 0) {
        top = triggerRect.bottom + GAP;
        arrowPosition = "top";
      }
    }

    // Check if overflows right, shift left
    if (left + POPOVER_WIDTH > viewportWidth - 12) {
      left = Math.max(12, viewportWidth - POPOVER_WIDTH - 12);
      // Adjust arrow to point to trigger center
      const triggerCenterX = triggerRect.left + triggerRect.width / 2;
      arrowOffset = triggerCenterX - left;
    }

    // Check if overflows left, shift right
    if (left < 12) {
      left = 12;
      // Adjust arrow to point to trigger center
      const triggerCenterX = triggerRect.left + triggerRect.width / 2;
      arrowOffset = triggerCenterX - left;
    }

    // Clamp arrow offset to stay within popover bounds
    arrowOffset = Math.max(20, Math.min(POPOVER_WIDTH - 20, arrowOffset));

    return { top, left, arrowPosition, arrowOffset };
  };

  // Update position when popover opens or window resizes
  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const pos = calculatePosition();
      if (pos) {
        setPopoverPosition(pos);
        // Recalculate with actual dimensions after render
        requestAnimationFrame(() => {
          const pos2 = calculatePosition();
          if (pos2) setPopoverPosition(pos2);
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, position, align]);

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: PointerEvent | MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpenPopoverId(null);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setOpenPopoverId]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPopoverId(null);
        if (triggerRef.current) {
          const focusableElement = triggerRef.current.querySelector(
            'button, [tabindex]:not([tabindex="-1"])'
          ) as HTMLElement;
          focusableElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, setOpenPopoverId]);

  // Hover intent logic
  const scheduleClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      if (!isOverTrigger && !isOverPopover) {
        setOpenPopoverId(null);
      }
    }, closeDelay);
  };

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleTriggerPointerEnter = () => {
    setIsOverTrigger(true);
    cancelClose();
    if (supportsHover) {
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current);
      }
      openTimeoutRef.current = setTimeout(() => {
        setOpenPopoverId(id);
      }, openDelay);
    }
  };

  const handleTriggerPointerLeave = () => {
    setIsOverTrigger(false);
    if (supportsHover && isOpen) {
      scheduleClose();
    }
  };

  const handlePopoverPointerEnter = () => {
    setIsOverPopover(true);
    cancelClose();
  };

  const handlePopoverPointerLeave = () => {
    setIsOverPopover(false);
    if (supportsHover && isOpen) {
      scheduleClose();
    }
  };

  const handleClick = () => {
    if (!supportsHover) {
      // Mobile: toggle
      setOpenPopoverId(isOpen ? null : id);
    } else {
      // Desktop: also allow click to toggle
      setOpenPopoverId(isOpen ? null : id);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpenPopoverId(isOpen ? null : id);
    }
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current);
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const popoverContent = isOpen && popoverPosition && (
    <div
      ref={popoverRef}
      role="dialog"
      aria-label={title || "Popover"}
      className="fixed w-[320px] sm:w-[380px] max-w-[90vw] rounded-xl border border-cyan-400/20 bg-slate-950/90 backdrop-blur-md shadow-2xl shadow-black/40 animate-popover-in pointer-events-auto"
      style={{
        top: `${popoverPosition.top}px`,
        left: `${popoverPosition.left}px`,
        zIndex: 9999,
      }}
      onPointerEnter={handlePopoverPointerEnter}
      onPointerLeave={handlePopoverPointerLeave}
    >
      {/* Arrow - Border */}
      <div
        className={`absolute w-0 h-0 ${
          popoverPosition.arrowPosition === "top"
            ? "top-[-8px] border-b-[8px] border-b-cyan-400/20"
            : "bottom-[-8px] border-t-[8px] border-t-cyan-400/20"
        } border-l-[8px] border-r-[8px] border-transparent`}
        style={{
          left: `${popoverPosition.arrowOffset}px`,
          transform: "translateX(-50%)",
        }}
      />
      {/* Arrow - Fill */}
      <div
        className={`absolute w-0 h-0 ${
          popoverPosition.arrowPosition === "top"
            ? "top-[-7px] border-b-[7px] border-b-slate-950"
            : "bottom-[-7px] border-t-[7px] border-t-slate-950"
        } border-l-[7px] border-r-[7px] border-transparent`}
        style={{
          left: `${popoverPosition.arrowOffset}px`,
          transform: "translateX(-50%)",
        }}
      />

      {/* Header */}
      {title && (
        <div className="flex items-center justify-between px-3 pt-3 pb-2 border-b border-white/10">
          <h4 className="text-xs tracking-widest text-slate-300/80 uppercase font-medium">
            {title}
          </h4>
        </div>
      )}

      {/* Body */}
      <div className="p-3">
        <div className="max-h-56 overflow-y-auto pr-1 popover-scroll">
          <div className="flex flex-wrap gap-2">{content}</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        ref={triggerRef}
        className="relative inline-flex"
        onPointerEnter={handleTriggerPointerEnter}
        onPointerLeave={handleTriggerPointerLeave}
      >
        <div
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-haspopup="true"
          aria-expanded={isOpen}
          className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-accent/50 focus:ring-offset-2 focus:ring-offset-background rounded"
        >
          {trigger}
        </div>
      </div>

      {/* Render popover in portal */}
      {isMounted && isOpen && popoverPosition && createPortal(popoverContent, document.body)}
    </>
  );
}
