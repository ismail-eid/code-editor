import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);

        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100)
    }

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    }
  }, [])
  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width: width,
      resizeHandles: ['e'], // eastern edge
      minConstraints: [innerWidth * 0.2, Infinity], // horizental and vertical
      maxConstraints: [innerWidth * 0.75, Infinity], // max resizable - maximum resizable
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      }
    }
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      minConstraints: [Infinity, 24], // horizental and vertical
      maxConstraints: [Infinity, innerHeight * 0.9] // max resizable // maximum resizable
    }
  }
  return <ResizableBox {...resizableProps} >{children}</ResizableBox>
}

export default Resizable;