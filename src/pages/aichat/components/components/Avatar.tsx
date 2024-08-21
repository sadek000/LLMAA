import React, { ReactNode } from "react";

interface AvatarProps {
  children: ReactNode;
  bg: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ children, bg, className }) => {
  return (
    <div id="avatar" style={{ backgroundColor: `${bg}` }}>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Avatar;
