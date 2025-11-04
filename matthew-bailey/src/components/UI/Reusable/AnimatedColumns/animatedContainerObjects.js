export const ANIMATIONS = {
  SLIDE_IN_LEFT: "SLIDE_IN_LEFT",
  SLIDE_IN_RIGHT: "SLIDE_IN_RIGHT",
};

export const ALLOWED_ANIMATIONS = {
  SLIDE_IN_LEFT: {
    translateX: "100px",
    duration: 977,
    delay:0,
    opacity: [0, 1],
  },
  SLIDE_IN_RIGHT: {
    translateX: "-100px",
    duration: 977,
    delay:0,
    opacity: [0, 1],
  },
};

export const CUSTOMIZE_ANIMATIONS = ({
  animationsObject,
  animationName,
  animationValues,
}) => {
  try {
    const objectKeys = Object.keys(animationsObject);
    if (objectKeys.includes(animationName)) {
      for (let key of Object.keys(animationValues)) {
        if (!animationsObject[animationName]) {
          const err = new Error();
          throw err;
        }
      }
      animationsObject[animationName] = animationValues;
      return animationsObject[animationName];
    } else {
      const err = new Error();
      throw err;
    }
  } catch (err) {
    console.error(
      "CUSTOMIZE_ANIMATIONS : You must provide a valid animation name for this to work"
    );
  }
};

export const ANIMATION_OBJECT = {
  elementToAnimate: null,
  animationName: "SLIDE_IN_LEFT",
  elementData: null,
};
