"use client";

import React from "react";

type DesktopBackgroundProps = {
  backgroundImage?: string;
  overlay?: boolean;
};

export default function DesktopBackground({ 
  backgroundImage = "/bg.jpg", 
  overlay = true 
}: DesktopBackgroundProps) {
  return (
    <>
      {/* Desktop Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />
      
      {/* Background Overlay */}
      {overlay && <div className="absolute inset-0 bg-black/20" />}
    </>
  );
}
