import React from 'react';
import Link from 'next/link';
import { colors } from '@styles/token/colors';
import { typography } from '@styles/token/typography'; 

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    variant?: "primary" | "secondary";
    rounded?: boolean;
}

export default function Button({
    children, 
    href,
    onClick, 
    className, 
    disabled,
    variant = "primary",
    rounded = false
}: ButtonProps) {
    const baseStyle = {
        backgroundColor: variant === "primary" ? colors.primary : colors.secondary,
        color: "#fff",
        padding: "0.5rem 1.5rem",
        borderRadius: rounded ? "9999px" : "0.375rem",
        border: "none",
        fontWeight: "600",
        fontSize: typography.fontSize.sm,
        fontFamily: typography.fontFamily.primary,
        cursor: disabled ? "not-allowed" : "pointer",
        lineHeight: typography.lineHeight.normal,
        display: "inline-block",
        textAlign: "center" as const,
        transition: "background-color 0.2s ease-in-out, transform 0.2s ease-in-out",
        textDecoration: "none",
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)"
    };

    const hoverStyle = {
        backgroundColor: variant === "primary" ? "#4338CA" : colors.secondary,
    };

    return (
        <Link
            href={href || "#"}  // Fallback to "#" if href is undefined
            style={{ ...baseStyle, ...hoverStyle }}
            className={className}
            onClick={onClick}
        >
            {children}
        </Link>
    );
}
