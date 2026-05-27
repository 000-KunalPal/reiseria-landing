import { cn } from "@/lib/utils"
import { motion, type MotionValue } from "motion/react"

interface SquigglyArrowProps {
    width?: number
    height?: number
    strokeWidth?: number
    className?: string
    direction?: "right" | "left" | "up" | "down"
    variant?: "wavy" | "bouncy" | "smooth"
    progress?: MotionValue<number> | number
}

export default function SquigglyArrow({
    width = 200,
    height = 100,
    strokeWidth = 2.5,
    className,
    direction = "right",
    variant = "wavy",
    progress = 0,
}: SquigglyArrowProps) {
    const paths = {
        wavy: "M 15 50 Q 35 35, 55 48 T 95 52 Q 115 48, 135 50 Q 145 52, 155 48 Q 147 44, 143 42 Q 147 44, 155 48 Q 148 53, 144 56",
        bouncy: "M 15 50 Q 45 32, 65 50 Q 85 68, 105 50 Q 125 32, 145 50 Q 152 54, 158 50 Q 149 45, 145 43 Q 149 45, 158 50 Q 150 56, 146 59",
        smooth: "M 15 50 Q 60 38, 100 48 Q 135 56, 158 50 Q 149 45, 145 43 Q 149 45, 158 50 Q 150 56, 146 59",
    }

    const rotations = {
        right: "rotate(0)",
        left: "rotate(180 100 50)",
        down: "rotate(90 100 50)",
        up: "rotate(-90 100 50)",
    }

    const selectedPath = paths[variant]
    const rotation = rotations[direction]

    return (
        <svg
            width={width}
            height={height}
            viewBox="-10 -10 220 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-foreground", className)}
        >
            <title>Squiggly arrow</title>
            <g transform={rotation}>
                {/* Background Squiggly arrow (Muted) */}
                <path
                    d={selectedPath}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    fill="none"
                    className="opacity-18"
                />

                {/* Foreground Animated Squiggly arrow */}
                <motion.path
                    d={selectedPath}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    fill="none"
                    style={{ pathLength: progress }}
                />
            </g>
        </svg>
    )
}
