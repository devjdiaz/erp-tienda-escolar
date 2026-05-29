"use client";

interface HGAvatarProps {
  initials: string;
  color: string;
  size?: number;
  ring?: boolean;
}

export function HGAvatar({ initials, color, size = 38, ring = false }: HGAvatarProps) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: color, color: "#fff", display: "flex", alignItems: "center",
      justifyContent: "center", fontFamily: "Montserrat, system-ui", fontWeight: 800,
      fontSize: size * 0.36, letterSpacing: ".02em",
      boxShadow: ring ? "0 0 0 3px rgba(255,255,255,.25)" : "none",
    }}>
      {initials}
    </div>
  );
}
