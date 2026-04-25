"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { ClippedCircle } from "@/app/components/unlumen-ui/clipped-circle";
import { Tilt, type TiltProps } from "@/app/components/unlumen-ui/tilt";

import type { Signal } from "@/app/types/signal.types";

/* ---------------- TYPES ---------------- */

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;

  price?: string;
  badgeLabel?: string;
  badgeVariant?: "success" | "warning";

  imageSrc?: string; // fallback if no signals
  imageAlt?: string;

  signals?: Signal[]; // 🔥 NEW

  href?: string;
  tiltProps?: Omit<TiltProps, "children" | "className">;
}

/* ---------------- BADGE ---------------- */

const BADGE_LABEL_CLASSES = {
  success: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  warning: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
};

/* ---------------- HEAT COLORS ---------------- */

const HEAT_COLORS: Record<string, string> = {
  EMERGING: "bg-emerald-400",
  ACCELERATING: "bg-blue-500",
  STABLE: "bg-amber-400",
  DECLINING: "bg-red-400",
};

/* ---------------- COMPONENT ---------------- */

export function TiltCard({
  title,
  description,
  price,
  badgeLabel,
  badgeVariant = "success",
  imageSrc,
  imageAlt = "",
  signals,
  href,
  tiltProps,
  className,
  ...props
}: TiltCardProps) {
  const approved =
    signals?.filter((s) => s.approvalStatus === "APPROVED") ?? [];

  const [index, setIndex] = useState(0);

  /* AUTO SLIDE */
  useEffect(() => {
    if (approved.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % approved.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [approved.length]);

  const active = approved[index];

  const inner = (
    <Tilt
      rotationFactor={11}
      {...tiltProps}
      className={cn(
        "relative group overflow-hidden",
        "bg-background border border-border rounded-lg",
        "flex flex-col gap-4",
        "h-48 sm:h-52 md:h-56 w-96",
        "hover:shadow-lg hover:scale-105 transition-all duration-400 ease-out",
        className,
      )}
    >
      {/* ================= LEFT CONTENT ================= */}
      <div className="flex flex-row justify-between px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex flex-col gap-1 flex-1 mr-2">
          <h2 className="text-lg tracking-tight leading-tight font-medium">
            {active?.formatName ?? title}
          </h2>

          <p className="text-foreground/50 text-sm">
            {active?.insight ?? description}
          </p>

          {/* velocity */}
          {active?.velocity && (
            <div className="flex items-center gap-2 mt-2">
              <span
                className={cn(
                  "w-1.5 h-5 rounded",
                  HEAT_COLORS[active.velocity]
                )}
              />
              <span className="text-xs text-foreground/60">
                {active.velocity}
              </span>
            </div>
          )}
        </div>

        {/* BADGE */}
        {price && badgeLabel ? (
          <div className="inline-flex h-fit items-center text-sm whitespace-nowrap shrink-0">
            <span className="rounded-l-full bg-secondary py-1 px-2 font-medium">
              {price}
            </span>
            <span
              className={cn(
                "rounded-r-full py-1 px-2 font-medium",
                BADGE_LABEL_CLASSES[badgeVariant],
              )}
            >
              {badgeLabel}
            </span>
          </div>
        ) : price ? (
          <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium">
            {price}
          </span>
        ) : null}
      </div>

     {/* ================= RIGHT PREVIEW (FADE) ================= */}
{approved.length > 0 ? (
  <div className="absolute z-0 top-24 -right-10 w-60 h-40">
    {approved.map((signal, i) => (
      <img
        key={signal.id ?? i}
        src={signal.imageUrl ?? "/placeholder.png"}
        alt={signal.formatName}
        className={cn(
          "absolute inset-0 w-full h-full object-cover border rounded-md",
          "rotate-[-5deg]",
          "transition-all duration-700 ease-in-out",
          
          // fade logic
          i === index
            ? "opacity-100 scale-100 z-10"
            : "opacity-0 scale-95 z-0",

          // hover micro interaction (same as unlumen)
          "group-hover:-rotate-3 group-hover:-translate-y-1 group-hover:-translate-x-0.5"
        )}
      />
    ))}
  </div>
) : imageSrc ? (
  <img
    src={imageSrc}
    alt={imageAlt}
    className="
      absolute z-0 top-24 w-60 h-40 -right-10
      object-cover
      rotate-[-5deg]
      border rounded-md
      transition-transform duration-300
      group-hover:-rotate-3 group-hover:-translate-y-1 group-hover:-translate-x-0.5
    "
  />
) : null}

      {/* CLIPPED CIRCLE (UNCHANGED CORE) */}
      <ClippedCircle circleClassName="bg-white" circleSize={600} />
    </Tilt>
  );

  if (href) {
    return (
      <a href={href} className="block cursor-pointer">
        {inner}
      </a>
    );
  }

  return <div {...props}>{inner}</div>;
}