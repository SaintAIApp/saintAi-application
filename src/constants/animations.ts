export const  revealVariant = {
    hidden: {
      opacity: 0,
      x: 100,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
    
  };

export  const cubeVariant = {
    initial: {
      y: 0,
      rotate: 0,
    },
    animate: {
      y: [0, -20, 0], // Lifts up and then places down
      // rotate: [0, 10, -10, 0], // Slight rotation
      transition: {
        duration: 2, // Duration of the entire animation
        ease: "easeInOut",
        repeat: Infinity, // Repeat animation infinitely
        repeatType: "loop", // Type of repeat
      },
    },
  };