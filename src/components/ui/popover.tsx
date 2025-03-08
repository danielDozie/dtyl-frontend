"use client"
import { useEffect, useRef, useState } from "react";
import {Text} from '@/components/ui/text'

function CustomPopover({
  children,
  content,
  trigger = "click"
}: any) {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef<any>(null);

  const handleMouseOver = () => {
    if (trigger === "hover") {
      setShow(true);
    };
  };

  const handleMouseLeft = () => {
    if (trigger === "hover") {
      setShow(false);
    };
  };

  useEffect(() => {
    function handleClickOutside(event: { target: any; }) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShow(false);
      }
    }

    if (show) {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [show, wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeft}
      className="w-fit h-fit relative flex justify-center">
      <div
        onClick={() => setShow(!show)}
      >
        {children}
      </div>
      <div
        hidden={!show}
        className="min-w-fit w-[200px] h-fit absolute top-[100%] z-50 transition-all">
        <div className="rounded bg-transparent flex justify-center mx-auto items-center p-3">
          <Text className="text-sm text-center">{content}</Text>
        </div>
      </div>
    </div>
  );
};

export default CustomPopover;