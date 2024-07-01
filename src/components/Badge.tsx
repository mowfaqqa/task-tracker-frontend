/* eslint-disable require-jsdoc */
import React from "react";
import clsx from "clsx";

interface IBadgeProps {
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  variant?: keyof typeof BadgeVariantClass;
  [x: string]: any;
}

export function Badge(props: IBadgeProps) {
  const { suffix, prefix, variant, className, children, ...rest } = props;

  return (
    <div {...rest}>
      <div className={clsx(className, "badge", BadgeVariantClass[variant!])}>
        {prefix && (
          <span
            className={clsx(
              "rounded-full mr-1 p-1",
              BadgeIconVariantClass[variant!]
            )}
          >
            {prefix}
          </span>
        )}
        {children}
        {suffix && (
          <span
            className={clsx(
              "rounded-full ml-2 p-1",
              BadgeIconVariantClass[variant!]
            )}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export default Badge;

const BadgeVariantClass: any = {
  info: "badge-info",
  danger: "badge-danger",
  warning: "badge-warning",
  success: "badge-success",
  tertiary: "badge-tertiary",
  selected: "badge-selected",
};

const BadgeIconVariantClass: any = {
  danger: "badge-danger-icon",
  success: "badge-success-icon",
  tertiary: "badge-tertiary-icon",
};
