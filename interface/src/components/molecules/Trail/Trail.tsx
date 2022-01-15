import React, { FC, ReactElement } from "react";
import { useTrail, animated } from "react-spring";

interface TrailProps {
    children: JSX.Element[] | JSX.Element;
}

const Trail: FC<TrailProps> = ({ children }): ReactElement => {
    const items = React.Children.toArray(children);

    const gentle = {
        mass: 1,
        tension: 140,
        friction: 14,
        precision: 0.01,
        velocity: 0,
        clamp: true,
    };

    const trail = useTrail(items.length, {
        config: gentle,
        from: { opacity: 0, transform: "translateY(60px)" },
        to: { opacity: 1, transform: "translateY(0px)" },
    });

    return (
        <>
            {trail.map((style, index) => (
                <animated.div className="col-xs-6 col-sm-4 col-md-3" key={index} style={style}>
                    {items[index]}
                </animated.div>
            ))}
        </>
    );
};

export default Trail;
