import { useState, useEffect } from "react";

const useScroll = (): boolean => {
  const [visible, setVisible] = useState<boolean>(true);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);

  const handleScroll = (): void => {
    const currentScrollPos = window.scrollY;

    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return visible;
};

export default useScroll;
