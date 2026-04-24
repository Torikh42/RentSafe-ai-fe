import { HTMLMotionProps, motion } from 'framer-motion';

export const MotionDiv = motion.create('div') as unknown as React.FC<
  HTMLMotionProps<'div'>
>;
