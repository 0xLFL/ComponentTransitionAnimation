import React, { useCallback, useEffect, useState } from 'react';

type TransitionTimingFunction = 
  | 'ease'
  | 'linear'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'cubic-bezier'
  | string;

interface ComponentTransitionAnimationProps {
  components: React.ReactNode[],
  currentStep: number,
  transitionDuration?: number,
  style?: React.CSSProperties,
  containerStyle?: React.CSSProperties,
  animationType?: TransitionTimingFunction
}

/**
 * ComponentTransitionAnimation applies a transition animation to a given set of components based on the current step.
 * The components transition with the specified duration and animation type.
 *
 * @typedef {object} ComponentTransitionAnimationProps
 * @param {React.ReactNode[]} components - The array of components that are having their transtions animated
 * @param {number} currentStep - The index of the component that is currently displayed.
 * @param {number} [transitionDuration] - The duration of the transition in milliseconds. Defaults to 1000ms if not defined.
 * @param {React.CSSProperties} [style] - The styles to apply to the wrapper of the displayed component.
 * @param {React.CSSProperties} [containerStyle] - The styles to apply to the container element that holds the components.
 * @param {TransitionTimingFunction} [animationType] - The type of timing function to apply to the transition (e.g., 'ease', 'ease-in-out', 'linear'), defaults to 'ease-in-out'.
 *
 * @returns {JSX.Element} The rendered JSX element with transition animation applied to the components.
 */
const ComponentTransitionAnimation = ({
  components,
  currentStep,
  transitionDuration,
  style,
  containerStyle,
  animationType,
}: ComponentTransitionAnimationProps) => {
  const style_ = style || {};
  const containerStyle_ = containerStyle || {};
  const animationType_ = animationType || 'ease-in-out';
  const transitionDuration_ = (transitionDuration || 1000) / 2;

  const [delayedStep, setDelayedStep] = useState(currentStep | 0);
  const [opacity, setOpacity] = useState(1);

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  
  const queueDelayedStep = useCallback(async (step: number) => {
    // stops fade in on init load
    if (step === delayedStep) {
      return;
    }

    setOpacity(0);
    await delay(transitionDuration_);

    setDelayedStep(step);
    setOpacity(1);
  }, [delayedStep, transitionDuration_]);
  
  useEffect(() => {
    queueDelayedStep(currentStep);
  }, [currentStep, queueDelayedStep]);

  return (
    <div
      style={{
        transition: `height ${transitionDuration_}s ${animationType_}`,
        ...containerStyle_,
      }}
    >
      {
        components
        .filter((_, index) => index === delayedStep)
        .map((element, index) => (
          <div
            style={{
              opacity,
              display: 'flex',
              transition: `opacity ${transitionDuration_}ms ${animationType_}`,
              width: '100%',
              ...style_,
            }}
            key={index}
          >
            {element}
          </div>
        ))
      }
    </div>
  );
}

export default ComponentTransitionAnimation;
