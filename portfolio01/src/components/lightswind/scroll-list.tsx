import React, { useRef, useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// Define the props for the ScrollList component
export interface ScrollListProps<T> {
  data: T[]; // The array of data items to display
  renderItem: (item: T, index: number, isFocused: boolean) => React.ReactNode; // Function to render each item's content
  itemHeight?: number; // Optional: Fixed height for each item in pixels. Defaults to 220px.
  containerHeight?: string | number; // Optional: Height for the container. Defaults to 520px.
  className?: string;
}

export const ScrollList = <T,>({
  data,
  renderItem,
  itemHeight = 220, // Default item height
  containerHeight = 520,
  className,
}: ScrollListProps<T>) => {
  // useRef to get a reference to the scrollable div element
  const listRef = useRef<HTMLDivElement>(null);
  // useState to keep track of the index of the currently focused item
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  useEffect(() => {
    const updateFocusedItem = () => {
      if (!listRef.current) return;

      const container = listRef.current;
      // Get all direct children (the motion.div items)
      const children = Array.from(container.children) as HTMLDivElement[];
      const scrollTop = container.scrollTop; // Current vertical scroll position
      const containerCenter = container.clientHeight / 2; // Vertical center of the container

      let closestItemIndex = 0;
      let minDistanceToCenter = Infinity;

      // Iterate over each child item to find the one closest to the center
      children.forEach((child, index) => {
        const itemTop = child.offsetTop;
        const actualItemHeight = child.offsetHeight;
        const itemCenter = itemTop + actualItemHeight / 2;

        const distanceToCenter = Math.abs(
          itemCenter - scrollTop - containerCenter
        );

        if (distanceToCenter < minDistanceToCenter) {
          minDistanceToCenter = distanceToCenter;
          closestItemIndex = index;
        }
      });

      setFocusedIndex(closestItemIndex);
    };

    updateFocusedItem();

    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener("scroll", updateFocusedItem, { passive: true });
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener("scroll", updateFocusedItem);
      }
    };
  }, [data, itemHeight]);

  // Framer Motion Variants for defining animation states for each item
  const itemVariants: Variants = {
    hidden: {
      opacity: 0.35,
      scale: 0.88,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    focused: {
      opacity: 1,
      scale: 1,
      zIndex: 10,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    next: {
      opacity: 0.75,
      scale: 0.94,
      zIndex: 5,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    visible: {
      opacity: 0.6,
      scale: 0.92,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  const parsedContainerHeight =
    typeof containerHeight === "number" ? `${containerHeight}px` : containerHeight;

  return (
    <div
      ref={listRef}
      className={cn(
        "scroll-list__wrp scrollbar-hidden mx-auto w-full overflow-y-auto relative px-2 py-4 select-none",
        className
      )}
      style={{
        height: parsedContainerHeight,
        scrollSnapType: "y proximity",
      }}
    >
      {data.map((item, index) => {
        let variant = "hidden";

        if (index === focusedIndex) {
          variant = "focused";
        } else if (index === focusedIndex + 1 || index === focusedIndex - 1) {
          variant = "next";
        } else {
          const isWithinVisibleRange = Math.abs(index - focusedIndex) <= 2;
          if (isWithinVisibleRange) {
            variant = "visible";
          }
        }

        return (
          <motion.div
            key={index}
            className="scroll-list__item mx-auto max-w-4xl py-2.5 transition-all"
            variants={itemVariants}
            initial="hidden"
            animate={variant}
            style={{
              height: itemHeight ? `${itemHeight}px` : "auto",
              boxSizing: "border-box",
              scrollSnapAlign: "center",
            }}
          >
            {renderItem(item, index, index === focusedIndex)}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ScrollList;