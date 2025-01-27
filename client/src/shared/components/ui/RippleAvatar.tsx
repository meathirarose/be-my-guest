'use client';

import { Avatar, Box, Flex } from '@chakra-ui/react';
import { keyframes } from '@emotion/react'; 


interface RippleAvatarProps {
  src: string;
  size?: string; 
  color?: string; 
  alt?: string; 
  onClick?: () => void; 
}

const RippleAvatar: React.FC<RippleAvatarProps> = ({
  src,
  size = '96px',
  color = 'teal',
  alt = 'Profile Avatar',
  onClick,
}) => {
  const pulseRing = keyframes`
    0% {
      transform: scale(0.33);
    }
    40%,
    50% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  `;

  return (
    <Flex justifyContent="center" alignItems="center" w="full" onClick={onClick}>
      <Box
        position="relative"
        w={size}
        h={size}
        _before={{
          content: "''",
          position: 'relative',
          display: 'block',
          width: '300%',
          height: '300%',
          boxSizing: 'border-box',
          marginLeft: '-100%',
          marginTop: '-100%',
          borderRadius: '50%',
          bgColor: color,
          animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite`,
        }}
      >
        <Avatar
          src={src}
          size="full"
          position="absolute"
          top={0}
          alt={alt}
          cursor={onClick ? 'pointer' : 'default'}
        />
      </Box>
    </Flex>
  );
};

export default RippleAvatar;
