import React from "react";
import { useSpring, animated } from "react-spring";
import formatCurrency from "../../CarFinanceCalculator";

function AniNumbers({ n }) {
  console.log("Received n:", n);
  const props = useSpring({
    from: { values: 0 },
    values: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return <animated.div>{props.values.to((n) => n.toFixed(2))}</animated.div>;
}

export default AniNumbers;
