/* @ds-bundle: {"format":4,"namespace":"BoasEnvironmentalDesignSystem_8f288d","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"Readout","sourcePath":"components/data/Readout.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"FormField","sourcePath":"components/forms/FormField.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Card","sourcePath":"components/layout/Card.jsx"},{"name":"Divider","sourcePath":"components/layout/Divider.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"072282b705ed","components/buttons/IconButton.jsx":"4e48b19742e3","components/data/DataTable.jsx":"56da0cc6a9e2","components/data/ProgressBar.jsx":"1d53419a7b96","components/data/Readout.jsx":"20992cec605a","components/data/StatCard.jsx":"426f3149072b","components/feedback/Alert.jsx":"7eac347d0027","components/feedback/Badge.jsx":"4f29de46dd3e","components/feedback/Tooltip.jsx":"ac656da203b4","components/forms/Checkbox.jsx":"b8352eebaa9b","components/forms/FormField.jsx":"2aaa952459cc","components/forms/Input.jsx":"d42ee0c2ce6d","components/forms/Select.jsx":"4625b52ad5ac","components/layout/Card.jsx":"8056dc8ba0ff","components/layout/Divider.jsx":"f774bd87bb98","components/navigation/Breadcrumb.jsx":"342944fe05f9","components/navigation/Tabs.jsx":"c39f7de79ee8","ui_kits/website/App.jsx":"ba64984750a5","ui_kits/website/Chrome.jsx":"a3458585ec58","ui_kits/website/Icons.jsx":"8cb553acfebd","ui_kits/website/pages/Home.jsx":"42cb7146c95f","ui_kits/website/pages/Portal.jsx":"39876b0daba7","ui_kits/website/pages/Report.jsx":"d0a393bf6340","ui_kits/website/pages/Request.jsx":"316e785e9738","ui_kits/website/pages/Services.jsx":"a1d6dae548c9"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BoasEnvironmentalDesignSystem_8f288d = window.BoasEnvironmentalDesignSystem_8f288d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — the primary interaction primitive.
 *
 * Variants map to the trust hierarchy of a measurement B2B site:
 *   primary → the single most important action on a screen
 *   secondary → the paired complement (Cancel / View / Download etc.)
 *   ghost → tertiary, low-emphasis
 *   danger → destructive confirmation only
 *   brand-inverse → for use on dark teal surfaces
 */
function Button({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  fullWidth = false,
  loading = false,
  disabled = false,
  type = "button",
  children,
  style,
  onClick,
  ...rest
}) {
  const sizes = {
    sm: {
      height: 32,
      paddingX: 12,
      font: "var(--text-13)",
      gap: 6,
      icon: 14
    },
    md: {
      height: 40,
      paddingX: 16,
      font: "var(--text-14)",
      gap: 8,
      icon: 16
    },
    lg: {
      height: 48,
      paddingX: 20,
      font: "var(--text-16)",
      gap: 10,
      icon: 18
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: "var(--teal-500)",
      color: "var(--gray-0)",
      border: "1px solid var(--teal-500)",
      hoverBg: "var(--teal-600)",
      hoverBorder: "var(--teal-600)"
    },
    secondary: {
      background: "var(--gray-0)",
      color: "var(--gray-800)",
      border: "1px solid var(--gray-300)",
      hoverBg: "var(--gray-50)",
      hoverBorder: "var(--gray-400)"
    },
    ghost: {
      background: "transparent",
      color: "var(--gray-700)",
      border: "1px solid transparent",
      hoverBg: "var(--gray-100)",
      hoverBorder: "transparent"
    },
    danger: {
      background: "var(--danger-500)",
      color: "var(--gray-0)",
      border: "1px solid var(--danger-500)",
      hoverBg: "var(--danger-700)",
      hoverBorder: "var(--danger-700)"
    },
    "brand-inverse": {
      background: "var(--gray-0)",
      color: "var(--teal-700)",
      border: "1px solid var(--gray-0)",
      hoverBg: "var(--teal-50)",
      hoverBorder: "var(--teal-50)"
    }
  };
  const v = variants[variant] || variants.primary;
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const isDisabled = disabled || loading;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: isDisabled,
    onClick: onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      height: s.height,
      padding: `0 ${s.paddingX}px`,
      width: fullWidth ? "100%" : "auto",
      background: isDisabled ? "var(--gray-100)" : hovered ? v.hoverBg : v.background,
      color: isDisabled ? "var(--text-disabled)" : v.color,
      border: isDisabled ? "1px solid var(--gray-200)" : hovered ? `1px solid ${v.hoverBorder.replace("1px solid ", "")}` : v.border,
      borderRadius: "var(--radius-md)",
      fontFamily: "var(--font-sans)",
      fontSize: s.font,
      fontWeight: "var(--fw-semibold)",
      letterSpacing: "var(--tracking-snug)",
      lineHeight: 1,
      cursor: isDisabled ? "not-allowed" : "pointer",
      transition: "background var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out)",
      transform: pressed && !isDisabled ? "translateY(0.5px)" : "translateY(0)",
      outline: "none",
      boxShadow: "none",
      userSelect: "none",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), loading && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: s.icon,
      height: s.icon,
      border: "2px solid currentColor",
      borderRightColor: "transparent",
      borderRadius: "50%",
      display: "inline-block",
      animation: "boas-spin 720ms linear infinite",
      opacity: 0.85
    }
  }), !loading && iconLeft ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: s.icon,
      height: s.icon
    }
  }, iconLeft) : null, children, !loading && iconRight ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: s.icon,
      height: s.icon
    }
  }, iconRight) : null, /*#__PURE__*/React.createElement("style", null, `@keyframes boas-spin { to { transform: rotate(360deg); } }`));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — square, glyph-only companion to Button. Used for compact
 * toolbar-style actions (close dialogs, table row menus, filter toggles).
 * Provide an aria-label; a lone icon has no accessible name otherwise.
 */
function IconButton({
  variant = "ghost",
  size = "md",
  disabled = false,
  pressed = false,
  ariaLabel,
  children,
  style,
  onClick,
  ...rest
}) {
  const sizes = {
    sm: {
      size: 28,
      icon: 14
    },
    md: {
      size: 36,
      icon: 16
    },
    lg: {
      size: 44,
      icon: 20
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      bg: "var(--teal-500)",
      fg: "var(--gray-0)",
      bd: "var(--teal-500)",
      hoverBg: "var(--teal-600)"
    },
    secondary: {
      bg: "var(--gray-0)",
      fg: "var(--gray-800)",
      bd: "var(--gray-300)",
      hoverBg: "var(--gray-50)"
    },
    ghost: {
      bg: "transparent",
      fg: "var(--gray-700)",
      bd: "transparent",
      hoverBg: "var(--gray-100)"
    }
  };
  const v = variants[variant] || variants.ghost;
  const [hovered, setHovered] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": ariaLabel,
    "aria-pressed": pressed || undefined,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: s.size,
      height: s.size,
      background: disabled ? "var(--gray-100)" : pressed ? "var(--teal-50)" : hovered ? v.hoverBg : v.bg,
      color: disabled ? "var(--text-disabled)" : pressed ? "var(--teal-700)" : v.fg,
      border: `1px solid ${disabled ? "var(--gray-200)" : pressed ? "var(--teal-200)" : v.bd}`,
      borderRadius: "var(--radius-md)",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)",
      outline: "none",
      padding: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: s.icon,
      height: s.icon
    }
  }, children));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DataTable — the measurement-results table primitive. Optimized for
 * dense tabular data: mono numerals, aligned units, sticky header,
 * optional zebra striping, sortable columns.
 *
 * columns: [{ key, header, align?, width?, render?, sortable? }]
 * rows: [{ id, ...cellData }]
 */
function DataTable({
  columns = [],
  rows = [],
  keyField = "id",
  striped = false,
  compact = false,
  stickyHeader = false,
  onRowClick,
  emptyMessage = "표시할 데이터가 없습니다.",
  style,
  ...rest
}) {
  const rowPad = compact ? "8px 12px" : "12px 14px";
  const headPad = compact ? "8px 12px" : "10px 14px";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      background: "var(--surface-card)",
      overflow: "hidden",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: compact ? "var(--text-13)" : "var(--text-14)",
      color: "var(--text-primary)"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "var(--surface-sunken)",
      position: stickyHeader ? "sticky" : "static",
      top: 0
    }
  }, columns.map(col => /*#__PURE__*/React.createElement("th", {
    key: col.key,
    scope: "col",
    style: {
      padding: headPad,
      textAlign: col.align || "left",
      width: col.width,
      fontSize: "var(--text-12)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-secondary)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-caps)",
      borderBottom: "1px solid var(--border-default)",
      whiteSpace: "nowrap"
    }
  }, col.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: columns.length,
    style: {
      padding: 40,
      textAlign: "center",
      color: "var(--text-tertiary)",
      fontSize: "var(--text-13)"
    }
  }, emptyMessage)) : rows.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: row[keyField] ?? i,
    onClick: onRowClick ? () => onRowClick(row) : undefined,
    style: {
      background: striped && i % 2 === 1 ? "var(--surface-sunken)" : "transparent",
      cursor: onRowClick ? "pointer" : "default",
      transition: "background var(--duration-fast) var(--ease-out)"
    },
    onMouseEnter: onRowClick ? e => e.currentTarget.style.background = "var(--teal-50)" : undefined,
    onMouseLeave: onRowClick ? e => e.currentTarget.style.background = striped && i % 2 === 1 ? "var(--surface-sunken)" : "transparent" : undefined
  }, columns.map(col => /*#__PURE__*/React.createElement("td", {
    key: col.key,
    style: {
      padding: rowPad,
      textAlign: col.align || "left",
      borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--border-subtle)",
      fontFamily: col.mono ? "var(--font-mono)" : "inherit",
      fontVariantNumeric: col.mono ? "tabular-nums" : "normal",
      color: "var(--text-primary)",
      verticalAlign: "middle"
    }
  }, col.render ? col.render(row) : row[col.key]))))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ProgressBar — used for compliance percentages, workflow progress.
 * value: 0..100 (or set max). status colors the fill.
 */
function ProgressBar({
  value = 0,
  max = 100,
  status = "brand",
  size = "md",
  showLabel = false,
  labelPosition = "right",
  style,
  ...rest
}) {
  const pct = Math.min(100, Math.max(0, value / max * 100));
  const sizes = {
    sm: 4,
    md: 8,
    lg: 12
  };
  const h = sizes[size] || sizes.md;
  const colors = {
    ok: "var(--success-500)",
    warn: "var(--warning-500)",
    danger: "var(--danger-500)",
    neutral: "var(--gray-500)",
    brand: "var(--teal-500)"
  };
  const fill = colors[status] || colors.brand;
  const bar = /*#__PURE__*/React.createElement("div", {
    role: "progressbar",
    "aria-valuenow": value,
    "aria-valuemin": 0,
    "aria-valuemax": max,
    style: {
      flex: 1,
      height: h,
      background: "var(--gray-200)",
      borderRadius: "var(--radius-pill)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: "100%",
      background: fill,
      borderRadius: "var(--radius-pill)",
      transition: "width var(--duration-slow) var(--ease-out)"
    }
  }));
  const label = /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      fontSize: "var(--text-12)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-primary)",
      minWidth: 36,
      textAlign: "right"
    }
  }, Math.round(pct), "%");
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), showLabel && labelPosition === "left" ? label : null, bar, showLabel && labelPosition === "right" ? label : null);
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/Readout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Readout — mono-styled numeric measurement display, inline.
 *   value:  "18.4"
 *   unit:   "mg/m³"
 *   status: "ok" | "warn" | "danger" | "neutral" — colors the value only.
 *
 * Used inline in prose ("측정값: 18.4 mg/m³") or on top of reports.
 */
function Readout({
  value,
  unit,
  size = "md",
  status = "neutral",
  align = "baseline",
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      val: "var(--text-16)",
      unit: "var(--text-12)"
    },
    md: {
      val: "var(--text-20)",
      unit: "var(--text-13)"
    },
    lg: {
      val: "var(--text-30)",
      unit: "var(--text-14)"
    },
    xl: {
      val: "var(--text-48)",
      unit: "var(--text-16)"
    }
  };
  const s = sizes[size] || sizes.md;
  const colors = {
    ok: "var(--success-700)",
    warn: "var(--warning-700)",
    danger: "var(--danger-700)",
    neutral: "var(--text-primary)",
    brand: "var(--teal-600)"
  };
  const color = colors[status] || colors.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: align === "center" ? "center" : "baseline",
      gap: 4,
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      letterSpacing: "var(--tracking-tight)",
      color,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: s.val,
      fontWeight: "var(--fw-semibold)",
      lineHeight: 1.05
    }
  }, value), unit ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: s.unit,
      color: "var(--text-tertiary)",
      fontWeight: "var(--fw-medium)"
    }
  }, unit) : null);
}
Object.assign(__ds_scope, { Readout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Readout.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatCard — headline KPI display. Big number + label + optional trend.
 * Trend accepts a signed number; positive is treated as up unless
 * `positiveIntent="down"` is set (falling pollutants are good).
 */
function StatCard({
  label,
  value,
  unit,
  trend,
  trendLabel,
  positiveIntent = "up",
  tone = "default",
  icon,
  footer,
  style,
  ...rest
}) {
  const isPositive = trend != null && (positiveIntent === "up" ? trend > 0 : trend < 0);
  const isNegative = trend != null && (positiveIntent === "up" ? trend < 0 : trend > 0);
  const trendColor = trend == null ? "var(--text-tertiary)" : isPositive ? "var(--success-700)" : isNegative ? "var(--danger-700)" : "var(--text-tertiary)";
  const tones = {
    default: {
      bg: "var(--surface-card)",
      fg: "var(--text-primary)",
      bd: "var(--border-subtle)"
    },
    brand: {
      bg: "var(--teal-500)",
      fg: "var(--gray-0)",
      bd: "var(--teal-500)"
    },
    sunken: {
      bg: "var(--surface-sunken)",
      fg: "var(--text-primary)",
      bd: "var(--border-subtle)"
    }
  };
  const t = tones[tone] || tones.default;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      padding: 20,
      background: t.bg,
      color: t.fg,
      border: `1px solid ${t.bd}`,
      borderRadius: "var(--radius-xl)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-12)",
      fontWeight: "var(--fw-medium)",
      color: tone === "brand" ? "rgba(255,255,255,0.85)" : "var(--text-secondary)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-caps)"
    }
  }, label), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: tone === "brand" ? 0.9 : 0.7,
      display: "inline-flex"
    }
  }, icon) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      fontSize: "var(--text-36)",
      fontWeight: "var(--fw-semibold)",
      lineHeight: 1.05,
      letterSpacing: "var(--tracking-tight)"
    }
  }, value), unit ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-14)",
      color: tone === "brand" ? "rgba(255,255,255,0.85)" : "var(--text-secondary)",
      fontWeight: "var(--fw-medium)"
    }
  }, unit) : null), trend != null || trendLabel ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, trend != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 2,
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      fontSize: "var(--text-13)",
      fontWeight: "var(--fw-semibold)",
      color: tone === "brand" ? "var(--gray-0)" : trendColor
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, trend > 0 ? "▲" : trend < 0 ? "▼" : "—"), Math.abs(trend), "%") : null, trendLabel ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-12)",
      color: tone === "brand" ? "rgba(255,255,255,0.85)" : "var(--text-tertiary)"
    }
  }, trendLabel) : null) : null, footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 12,
      borderTop: `1px solid ${tone === "brand" ? "rgba(255,255,255,0.15)" : "var(--border-subtle)"}`,
      fontSize: "var(--text-12)",
      color: tone === "brand" ? "rgba(255,255,255,0.9)" : "var(--text-secondary)"
    }
  }, footer) : null);
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Alert — inline notification block. Optional title, dismiss, and icon.
 * Uses the same tone vocabulary as Badge.
 */
function Alert({
  tone = "info",
  title,
  onDismiss,
  icon,
  children,
  style,
  ...rest
}) {
  const tones = {
    ok: {
      bg: "var(--status-ok-bg)",
      fg: "var(--status-ok-fg)",
      bd: "var(--status-ok-border)",
      accent: "var(--success-500)"
    },
    warn: {
      bg: "var(--status-warn-bg)",
      fg: "var(--status-warn-fg)",
      bd: "var(--status-warn-border)",
      accent: "var(--warning-500)"
    },
    danger: {
      bg: "var(--status-danger-bg)",
      fg: "var(--status-danger-fg)",
      bd: "var(--status-danger-border)",
      accent: "var(--danger-500)"
    },
    info: {
      bg: "var(--status-info-bg)",
      fg: "var(--status-info-fg)",
      bd: "var(--status-info-border)",
      accent: "var(--info-500)"
    },
    neutral: {
      bg: "var(--status-neutral-bg)",
      fg: "var(--status-neutral-fg)",
      bd: "var(--status-neutral-border)",
      accent: "var(--gray-500)"
    }
  };
  const t = tones[tone] || tones.info;
  const defaultIcons = {
    ok: "✓",
    warn: "!",
    danger: "!",
    info: "i",
    neutral: "·"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      gap: 12,
      alignItems: "flex-start",
      padding: "12px 14px",
      background: t.bg,
      color: t.fg,
      border: `1px solid ${t.bd}`,
      borderLeft: `3px solid ${t.accent}`,
      borderRadius: "var(--radius-md)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-14)",
      lineHeight: "var(--lh-base)",
      letterSpacing: "var(--tracking-snug)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      background: t.accent,
      color: "#fff",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "var(--text-13)",
      fontWeight: "var(--fw-bold)",
      fontFamily: "var(--font-sans)",
      marginTop: 1,
      flexShrink: 0
    }
  }, icon || defaultIcons[tone] || "·"), /*#__PURE__*/React.createElement("div", null, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: "var(--fw-semibold)",
      marginBottom: children ? 2 : 0,
      color: t.fg
    }
  }, title) : null, children ? /*#__PURE__*/React.createElement("div", null, children) : null), onDismiss ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onDismiss,
    "aria-label": "\uB2EB\uAE30",
    style: {
      width: 24,
      height: 24,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "transparent",
      border: "none",
      color: t.fg,
      opacity: 0.65,
      cursor: "pointer",
      borderRadius: "var(--radius-sm)",
      fontSize: "var(--text-16)",
      lineHeight: 1,
      padding: 0
    },
    onMouseEnter: e => e.currentTarget.style.opacity = "1",
    onMouseLeave: e => e.currentTarget.style.opacity = "0.65"
  }, "\xD7") : null);
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — compact status pill. The domain drives the tone vocabulary:
 *   ok      → 기준 이내 (within limits)
 *   warn    → 주의 (approaching limit)
 *   danger  → 초과 (exceeded)
 *   info    → 신규 / 접수됨
 *   neutral → 대기중 / 기록
 *   brand   → in-brand accent (for tags that aren't status)
 */
function Badge({
  tone = "neutral",
  size = "md",
  dot = false,
  children,
  style,
  ...rest
}) {
  const tones = {
    ok: {
      bg: "var(--status-ok-bg)",
      fg: "var(--status-ok-fg)",
      bd: "var(--status-ok-border)",
      dot: "var(--success-500)"
    },
    warn: {
      bg: "var(--status-warn-bg)",
      fg: "var(--status-warn-fg)",
      bd: "var(--status-warn-border)",
      dot: "var(--warning-500)"
    },
    danger: {
      bg: "var(--status-danger-bg)",
      fg: "var(--status-danger-fg)",
      bd: "var(--status-danger-border)",
      dot: "var(--danger-500)"
    },
    info: {
      bg: "var(--status-info-bg)",
      fg: "var(--status-info-fg)",
      bd: "var(--status-info-border)",
      dot: "var(--info-500)"
    },
    neutral: {
      bg: "var(--status-neutral-bg)",
      fg: "var(--status-neutral-fg)",
      bd: "var(--status-neutral-border)",
      dot: "var(--gray-500)"
    },
    brand: {
      bg: "var(--teal-50)",
      fg: "var(--teal-700)",
      bd: "var(--teal-100)",
      dot: "var(--teal-500)"
    }
  };
  const t = tones[tone] || tones.neutral;
  const sizes = {
    sm: {
      padY: 2,
      padX: 6,
      font: "var(--text-11)",
      dot: 5
    },
    md: {
      padY: 3,
      padX: 8,
      font: "var(--text-12)",
      dot: 6
    },
    lg: {
      padY: 4,
      padX: 10,
      font: "var(--text-13)",
      dot: 7
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: `${s.padY}px ${s.padX}px`,
      background: t.bg,
      color: t.fg,
      border: `1px solid ${t.bd}`,
      borderRadius: "var(--radius-sm)",
      fontFamily: "var(--font-sans)",
      fontSize: s.font,
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--tracking-snug)",
      lineHeight: 1,
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: s.dot,
      height: s.dot,
      borderRadius: "50%",
      background: t.dot,
      display: "inline-block",
      flexShrink: 0
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tooltip — hover / focus popover. Simple, styled bubble; positioned via
 * absolute placement relative to the wrapper. For complex placement
 * requirements substitute a positioning library — this is intentionally
 * lightweight.
 */
function Tooltip({
  content,
  placement = "top",
  delay = 200,
  children,
  style,
  ...rest
}) {
  const [visible, setVisible] = React.useState(false);
  const timeoutRef = React.useRef(null);
  const show = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  };
  const hide = () => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  };
  const placements = {
    top: {
      bottom: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    bottom: {
      top: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    left: {
      right: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    },
    right: {
      left: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    },
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide
  }, rest), children, visible ? /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      ...placements[placement],
      padding: "6px 8px",
      background: "var(--gray-900)",
      color: "var(--gray-0)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-12)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--tracking-snug)",
      borderRadius: "var(--radius-sm)",
      whiteSpace: "nowrap",
      pointerEvents: "none",
      zIndex: 100,
      boxShadow: "var(--shadow-md)"
    }
  }, content) : null);
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Checkbox — pairs a native input with an aligned label. For a checkbox
 * without a visible label (e.g. table row selection) omit `children`.
 */
function Checkbox({
  checked,
  defaultChecked,
  disabled = false,
  indeterminate = false,
  children,
  onChange,
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-14)",
      color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
      cursor: disabled ? "not-allowed" : "pointer",
      userSelect: "none",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    ref: ref,
    type: "checkbox",
    checked: checked,
    defaultChecked: defaultChecked,
    disabled: disabled,
    onChange: onChange,
    style: {
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
      width: 16,
      height: 16,
      margin: 0,
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-xs)",
      background: "var(--gray-0)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)",
      position: "relative"
    }
  }, rest)), /*#__PURE__*/React.createElement("style", null, `
        input[type="checkbox"]:checked, input[type="checkbox"]:indeterminate {
          background-color: var(--teal-500);
          border-color: var(--teal-500);
        }
        input[type="checkbox"]:checked::after {
          content: '';
          position: absolute;
          left: 4px; top: 1px;
          width: 4px; height: 8px;
          border: solid #fff;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        input[type="checkbox"]:indeterminate::after {
          content: '';
          position: absolute;
          left: 2px; right: 2px; top: 6px;
          height: 2px;
          background: #fff;
        }
        input[type="checkbox"]:focus-visible {
          box-shadow: var(--ring-focus);
        }
      `), children);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/FormField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FormField — the label + helper + error scaffold every form control sits in.
 * Wrap Input / Select / Checkbox etc. Provide a stable id so the label's
 * htmlFor binds to the control.
 */
function FormField({
  label,
  htmlFor,
  helper,
  error,
  required = false,
  children,
  style,
  ...rest
}) {
  const errorId = error && htmlFor ? `${htmlFor}-error` : undefined;
  const helperId = helper && htmlFor ? `${htmlFor}-helper` : undefined;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      fontSize: "var(--text-13)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-primary)",
      letterSpacing: "var(--tracking-snug)"
    }
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: "var(--danger-500)",
      marginLeft: 4
    }
  }, "*") : null) : null, React.Children.map(children, child => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, {
      id: child.props.id || htmlFor,
      "aria-invalid": !!error || undefined,
      "aria-describedby": [errorId, helperId].filter(Boolean).join(" ") || undefined
    });
  }), error ? /*#__PURE__*/React.createElement("span", {
    id: errorId,
    style: {
      fontSize: "var(--text-12)",
      color: "var(--danger-700)",
      lineHeight: "var(--lh-base)"
    }
  }, error) : helper ? /*#__PURE__*/React.createElement("span", {
    id: helperId,
    style: {
      fontSize: "var(--text-12)",
      color: "var(--text-tertiary)",
      lineHeight: "var(--lh-base)"
    }
  }, helper) : null);
}
Object.assign(__ds_scope, { FormField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FormField.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — single-line text field. Pair with FormField for label/error.
 * Accepts a leading and/or trailing addon (icon, unit, etc.).
 */
function Input({
  size = "md",
  invalid = false,
  disabled = false,
  addonLeft,
  addonRight,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      height: 32,
      padX: 10,
      font: "var(--text-13)"
    },
    md: {
      height: 40,
      padX: 12,
      font: "var(--text-14)"
    },
    lg: {
      height: 48,
      padX: 14,
      font: "var(--text-16)"
    }
  };
  const s = sizes[size] || sizes.md;
  const [focused, setFocused] = React.useState(false);
  const borderColor = invalid ? "var(--danger-500)" : focused ? "var(--teal-500)" : "var(--border-default)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      height: s.height,
      background: disabled ? "var(--gray-50)" : "var(--gray-0)",
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      boxShadow: focused ? invalid ? "var(--ring-danger)" : "var(--ring-focus)" : "none",
      transition: "border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)",
      opacity: disabled ? 0.7 : 1,
      overflow: "hidden",
      ...style
    }
  }, addonLeft ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: s.padX,
      color: "var(--text-tertiary)",
      fontSize: s.font
    }
  }, addonLeft) : null, /*#__PURE__*/React.createElement("input", _extends({
    disabled: disabled,
    onFocus: e => {
      setFocused(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocused(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      flex: 1,
      minWidth: 0,
      height: "100%",
      padding: `0 ${s.padX}px`,
      paddingLeft: addonLeft ? 8 : s.padX,
      paddingRight: addonRight ? 8 : s.padX,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-sans)",
      fontSize: s.font,
      color: "var(--text-primary)",
      letterSpacing: "var(--tracking-snug)"
    }
  }, rest)), addonRight ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      paddingRight: s.padX,
      color: "var(--text-tertiary)",
      fontSize: s.font
    }
  }, addonRight) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Select — native select styled to match Input. Wrap in FormField.
 */
function Select({
  size = "md",
  invalid = false,
  disabled = false,
  placeholder,
  options = [],
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      height: 32,
      padX: 10,
      font: "var(--text-13)"
    },
    md: {
      height: 40,
      padX: 12,
      font: "var(--text-14)"
    },
    lg: {
      height: 48,
      padX: 14,
      font: "var(--text-16)"
    }
  };
  const s = sizes[size] || sizes.md;
  const [focused, setFocused] = React.useState(false);
  const borderColor = invalid ? "var(--danger-500)" : focused ? "var(--teal-500)" : "var(--border-default)";
  const caret = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'><path d='M4 6l4 4 4-4' stroke='%234C5860' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>\")";
  return /*#__PURE__*/React.createElement("select", _extends({
    disabled: disabled,
    defaultValue: rest.defaultValue ?? (placeholder ? "" : undefined),
    onFocus: e => {
      setFocused(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocused(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      height: s.height,
      padding: `0 ${s.padX + 20}px 0 ${s.padX}px`,
      background: `${disabled ? "var(--gray-50)" : "var(--gray-0)"} ${caret} no-repeat right ${s.padX}px center`,
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      boxShadow: focused ? invalid ? "var(--ring-danger)" : "var(--ring-focus)" : "none",
      transition: "border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)",
      fontFamily: "var(--font-sans)",
      fontSize: s.font,
      color: "var(--text-primary)",
      letterSpacing: "var(--tracking-snug)",
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
      outline: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.7 : 1,
      ...style
    }
  }, rest), placeholder ? /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true,
    hidden: true
  }, placeholder) : null, options.map(opt => {
    const value = typeof opt === "string" ? opt : opt.value;
    const label = typeof opt === "string" ? opt : opt.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, label);
  }));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/layout/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the standard surface primitive. Composable via header / footer.
 * Interactive variant swaps the border for a subtle hover shadow.
 */
function Card({
  variant = "default",
  padding = "md",
  header,
  footer,
  interactive = false,
  onClick,
  children,
  style,
  ...rest
}) {
  const paddings = {
    none: 0,
    sm: 12,
    md: 20,
    lg: 28
  };
  const p = paddings[padding] ?? paddings.md;
  const variants = {
    default: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      shadow: "none"
    },
    raised: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      shadow: "var(--shadow-sm)"
    },
    sunken: {
      background: "var(--surface-sunken)",
      border: "1px solid var(--border-subtle)",
      shadow: "none"
    },
    brand: {
      background: "var(--teal-500)",
      border: "1px solid var(--teal-500)",
      shadow: "var(--shadow-md)",
      color: "var(--gray-0)"
    }
  };
  const v = variants[variant] || variants.default;
  const [hovered, setHovered] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: interactive ? onClick : undefined,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      background: v.background,
      color: v.color || "inherit",
      border: v.border,
      borderRadius: "var(--radius-xl)",
      boxShadow: interactive && hovered ? "var(--shadow-md)" : v.shadow,
      transform: interactive && hovered ? "translateY(-1px)" : "translateY(0)",
      transition: "box-shadow var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out), border-color var(--duration-fast) var(--ease-out)",
      cursor: interactive ? "pointer" : "default",
      overflow: "hidden",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), header ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: `${Math.max(p - 4, 12)}px ${p}px`,
      borderBottom: "1px solid var(--border-subtle)",
      fontSize: "var(--text-14)",
      fontWeight: "var(--fw-semibold)",
      color: "inherit",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12
    }
  }, header) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: p
    }
  }, children), footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: `${Math.max(p - 4, 12)}px ${p}px`,
      borderTop: "1px solid var(--border-subtle)",
      background: variant === "brand" ? "transparent" : "var(--surface-sunken)",
      fontSize: "var(--text-13)",
      color: variant === "brand" ? "inherit" : "var(--text-secondary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12
    }
  }, footer) : null);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Card.jsx", error: String((e && e.message) || e) }); }

// components/layout/Divider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Divider — thin rule for separating content. Optionally holds a label
 * (used for section eyebrows or "or" separators).
 */
function Divider({
  orientation = "horizontal",
  label,
  style,
  ...rest
}) {
  if (orientation === "vertical") {
    return /*#__PURE__*/React.createElement("span", _extends({
      role: "separator",
      "aria-orientation": "vertical",
      style: {
        display: "inline-block",
        width: 1,
        alignSelf: "stretch",
        background: "var(--border-subtle)",
        ...style
      }
    }, rest));
  }
  if (label) {
    return /*#__PURE__*/React.createElement("div", _extends({
      role: "separator",
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        color: "var(--text-tertiary)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-12)",
        fontWeight: "var(--fw-medium)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-caps)",
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        height: 1,
        background: "var(--border-subtle)"
      }
    }), label, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        height: 1,
        background: "var(--border-subtle)"
      }
    }));
  }
  return /*#__PURE__*/React.createElement("hr", _extends({
    role: "separator",
    style: {
      border: 0,
      borderTop: "1px solid var(--border-subtle)",
      margin: 0,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Divider.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Breadcrumb — the ancestry path above a page title.
 * items: [{ label, href? }] — last item is the current page (rendered non-link).
 */
function Breadcrumb({
  items = [],
  separator = "/",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    "aria-label": "Breadcrumb",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      flexWrap: "wrap",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-13)",
      color: "var(--text-tertiary)",
      letterSpacing: "var(--tracking-snug)",
      ...style
    }
  }, rest), items.map((item, i) => {
    const isLast = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, item.href && !isLast ? /*#__PURE__*/React.createElement("a", {
      href: item.href,
      style: {
        color: "var(--text-secondary)",
        textDecoration: "none",
        padding: "2px 4px",
        borderRadius: "var(--radius-xs)",
        transition: "color var(--duration-fast) var(--ease-out), background var(--duration-fast) var(--ease-out)"
      },
      onMouseEnter: e => {
        e.currentTarget.style.color = "var(--teal-600)";
        e.currentTarget.style.background = "var(--teal-50)";
      },
      onMouseLeave: e => {
        e.currentTarget.style.color = "var(--text-secondary)";
        e.currentTarget.style.background = "transparent";
      }
    }, item.label) : /*#__PURE__*/React.createElement("span", {
      "aria-current": isLast ? "page" : undefined,
      style: {
        color: isLast ? "var(--text-primary)" : "var(--text-secondary)",
        fontWeight: isLast ? "var(--fw-semibold)" : "var(--fw-regular)",
        padding: "2px 4px"
      }
    }, item.label), !isLast ? /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        color: "var(--gray-300)"
      }
    }, separator) : null);
  }));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tabs — single-select page-level nav. Controlled or uncontrolled.
 *
 * items: [{ id, label, badge?, icon?, disabled? }]
 */
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  variant = "underline",
  size = "md",
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.id);
  const active = value ?? internal;
  const select = id => {
    if (value === undefined) setInternal(id);
    onChange && onChange(id);
  };
  const sizes = {
    sm: {
      padY: 6,
      padX: 10,
      font: "var(--text-13)",
      gap: 4
    },
    md: {
      padY: 10,
      padX: 14,
      font: "var(--text-14)",
      gap: 6
    },
    lg: {
      padY: 14,
      padX: 18,
      font: "var(--text-16)",
      gap: 8
    }
  };
  const s = sizes[size] || sizes.md;
  const isUnderline = variant === "underline";
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: "flex",
      gap: isUnderline ? 4 : 2,
      borderBottom: isUnderline ? "1px solid var(--border-subtle)" : "none",
      background: isUnderline ? "transparent" : "var(--surface-sunken)",
      padding: isUnderline ? 0 : 4,
      borderRadius: isUnderline ? 0 : "var(--radius-md)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), items.map(item => {
    const isActive = item.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: item.id,
      role: "tab",
      "aria-selected": isActive,
      disabled: item.disabled,
      onClick: () => !item.disabled && select(item.id),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: s.gap,
        padding: `${s.padY}px ${s.padX}px`,
        background: isUnderline ? "transparent" : isActive ? "var(--surface-card)" : "transparent",
        border: "none",
        borderRadius: isUnderline ? 0 : "var(--radius-sm)",
        borderBottom: isUnderline ? `2px solid ${isActive ? "var(--teal-500)" : "transparent"}` : "none",
        marginBottom: isUnderline ? -1 : 0,
        boxShadow: !isUnderline && isActive ? "var(--shadow-xs)" : "none",
        color: isActive ? "var(--teal-700)" : item.disabled ? "var(--text-disabled)" : "var(--text-secondary)",
        fontFamily: "var(--font-sans)",
        fontSize: s.font,
        fontWeight: isActive ? "var(--fw-semibold)" : "var(--fw-medium)",
        letterSpacing: "var(--tracking-snug)",
        cursor: item.disabled ? "not-allowed" : "pointer",
        transition: "color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out), background var(--duration-fast) var(--ease-out)",
        outline: "none",
        whiteSpace: "nowrap"
      }
    }, item.icon ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        width: 16,
        height: 16
      }
    }, item.icon) : null, item.label, item.badge != null ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 20,
        height: 18,
        padding: "0 6px",
        background: isActive ? "var(--teal-500)" : "var(--gray-200)",
        color: isActive ? "var(--gray-0)" : "var(--text-secondary)",
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-11)",
        fontWeight: "var(--fw-semibold)",
        marginLeft: 2
      }
    }, item.badge) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/App.jsx
try { (() => {
// App.jsx — router + layout switching.

const MARKETING_ROUTES = new Set(["home", "services", "request", "about"]);
const PORTAL_ROUTES = new Set(["portal", "report", "ongoing", "archive", "billing", "settings"]);
function parseRoute() {
  const h = window.location.hash.replace(/^#\/?/, "").split("/")[0];
  return h || "home";
}
function App() {
  const [route, setRoute] = React.useState(parseRoute());
  React.useEffect(() => {
    const onHash = () => {
      setRoute(parseRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const navigate = React.useCallback(r => {
    window.location.hash = `#/${r}`;
  }, []);

  /* ── Page router ───────────────────────────────────────── */
  let page;
  if (route === "home") page = /*#__PURE__*/React.createElement(HomePage, {
    onNavigate: navigate
  });else if (route === "services") page = /*#__PURE__*/React.createElement(ServicesPage, {
    onNavigate: navigate
  });else if (route === "request") page = /*#__PURE__*/React.createElement(RequestPage, {
    onNavigate: navigate
  });else if (route === "portal") page = /*#__PURE__*/React.createElement(PortalPage, {
    onNavigate: navigate
  });else if (route === "report") page = /*#__PURE__*/React.createElement(ReportPage, {
    onNavigate: navigate
  });else if (route === "about") page = /*#__PURE__*/React.createElement(PlaceholderPage, {
    title: "\uD68C\uC0AC \uC18C\uAC1C",
    subtitle: "Company introduction \xB7 placeholder page",
    onNavigate: navigate
  });else page = /*#__PURE__*/React.createElement(PlaceholderPage, {
    title: route,
    subtitle: `Portal ${route} view · placeholder`,
    onNavigate: navigate
  });

  /* ── Layout wrappers ──────────────────────────────────── */
  if (PORTAL_ROUTES.has(route)) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: "100vh",
        background: "var(--surface-sunken)",
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(PortalSidebar, {
      route: route,
      onNavigate: navigate
    }), /*#__PURE__*/React.createElement("main", {
      style: {
        flex: 1,
        minWidth: 0,
        overflow: "auto"
      }
    }, page));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--surface-page)",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    route: route,
    onNavigate: navigate
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1
    }
  }, page), /*#__PURE__*/React.createElement(SiteFooter, {
    onNavigate: navigate
  }));
}
function PlaceholderPage({
  title,
  subtitle,
  onNavigate
}) {
  const {
    Button,
    Card,
    Breadcrumb
  } = window.BoasEnvironmentalDesignSystem_8f288d;
  const inPortal = PORTAL_ROUTES.has(parseRoute());
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: inPortal ? 900 : "var(--container-wide)",
      margin: "0 auto",
      padding: "40px 32px 80px"
    }
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    separator: "\u203A",
    items: [{
      label: inPortal ? "고객 포털" : "홈",
      href: inPortal ? "#/portal" : "#/"
    }, {
      label: title
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      fontWeight: 600,
      color: "var(--teal-600)",
      marginBottom: 10
    }
  }, inPortal ? "PORTAL" : "PAGE"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 36,
      fontWeight: 800,
      letterSpacing: "-0.03em"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 0",
      fontSize: 14,
      color: "var(--text-secondary)"
    }
  }, subtitle)), /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      color: "var(--text-secondary)",
      lineHeight: 1.65
    }
  }, "\uC774 \uD654\uBA74\uC740 \uD504\uB85C\uD1A0\uD0C0\uC785 \uB77C\uC6B0\uD130\uAC00 \uB0A8\uAE34 \uC790\uB9AC\uD45C\uC2DC(placeholder)\uC785\uB2C8\uB2E4. UI \uD0B7\uC740 ", /*#__PURE__*/React.createElement("b", null, "\uD648 / \uC11C\uBE44\uC2A4 / \uCE21\uC815 \uC694\uCCAD / \uACE0\uAC1D \uD3EC\uD138 / \uBCF4\uACE0\uC11C"), " \uD654\uBA74\uC5D0 \uC9D1\uC911\uD569\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => onNavigate(inPortal ? "portal" : "home")
  }, inPortal ? "대시보드로" : "홈으로"))));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Chrome.jsx
try { (() => {
// Marketing site chrome (header + footer) and portal chrome (top bar + sidebar).
// All navigation is fake — links call the `onNavigate` callback which the
// router translates into a hash change.

const {
  Button,
  Badge,
  Divider
} = window.BoasEnvironmentalDesignSystem_8f288d;
const SITE_NAV = [{
  id: "home",
  label: "홈"
}, {
  id: "services",
  label: "서비스"
}, {
  id: "about",
  label: "회사소개"
}, {
  id: "portal",
  label: "고객 포털"
}];
function SiteHeader({
  route,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 10,
      background: "rgba(251, 250, 247, 0.92)",
      backdropFilter: "saturate(1.2) blur(8px)",
      WebkitBackdropFilter: "saturate(1.2) blur(8px)",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-wide)",
      margin: "0 auto",
      padding: "16px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#/",
    onClick: e => {
      e.preventDefault();
      onNavigate("home");
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      textDecoration: "none",
      color: "inherit"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.svg",
    alt: "\u321C\uBCF4\uC544\uC2A4\uD658\uACBD\uAE30\uC220",
    style: {
      height: 36,
      width: "auto",
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, SITE_NAV.map(item => {
    const active = item.id === route || item.id === "portal" && ["portal", "report"].includes(route);
    return /*#__PURE__*/React.createElement("a", {
      key: item.id,
      href: `#/${item.id}`,
      onClick: e => {
        e.preventDefault();
        onNavigate(item.id);
      },
      style: {
        padding: "8px 14px",
        borderRadius: "var(--radius-md)",
        fontFamily: "var(--font-sans)",
        fontSize: 14,
        fontWeight: active ? 600 : 500,
        color: active ? "var(--teal-700)" : "var(--text-secondary)",
        background: active ? "var(--teal-50)" : "transparent",
        textDecoration: "none",
        transition: "color var(--duration-fast) var(--ease-out), background var(--duration-fast) var(--ease-out)",
        letterSpacing: "var(--tracking-snug)"
      }
    }, item.label);
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 16
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: () => onNavigate("request")
  }, "\uCE21\uC815 \uC694\uCCAD"))));
}
function SiteFooter({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--teal-900)",
      color: "var(--gray-0)",
      marginTop: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-wide)",
      margin: "0 auto",
      padding: "56px 32px 32px",
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.svg",
    alt: "\u321C\uBCF4\uC544\uC2A4\uD658\uACBD\uAE30\uC220",
    style: {
      height: 44,
      width: "auto",
      display: "block",
      filter: "brightness(0) invert(1)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      letterSpacing: "0.14em",
      color: "rgba(255,255,255,0.55)",
      marginTop: 10,
      fontWeight: 500
    }
  }, "BOAZ ENVIRONMENTAL TECHNOLOGY CO., LTD."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,0.75)",
      lineHeight: 1.65,
      marginTop: 16,
      maxWidth: 320
    }
  }, "\uB300\uAE30\uCE21\uC815 \uBC0F \uBD84\uC11D \uC804\uBB38 \uAE30\uC5C5. \uD658\uACBD\uCE21\uC815 \uB300\uD589, \uB300\uAE30\xB7\uC545\uCDE8\uC800\uAC10 \uCEE8\uC124\uD305, \uAC01\uC885 \uD658\uACBD\uC5C5\uBB34 \uB300\uD589.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      color: "rgba(255,255,255,0.55)",
      fontWeight: 600,
      marginBottom: 14
    }
  }, "\uC11C\uBE44\uC2A4"), ["대기측정", "악취저감 컨설팅", "환경측정 대행", "종합환경관리"].map(s => /*#__PURE__*/React.createElement("a", {
    key: s,
    href: "#/services",
    onClick: e => {
      e.preventDefault();
      onNavigate("services");
    },
    style: {
      display: "block",
      fontSize: 13,
      color: "rgba(255,255,255,0.85)",
      textDecoration: "none",
      padding: "4px 0"
    }
  }, s))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      color: "rgba(255,255,255,0.55)",
      fontWeight: 600,
      marginBottom: 14
    }
  }, "\uD68C\uC0AC"), ["회사 소개", "인정 · 자격", "채용", "공지사항"].map(s => /*#__PURE__*/React.createElement("div", {
    key: s,
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,0.85)",
      padding: "4px 0"
    }
  }, s))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      color: "rgba(255,255,255,0.55)",
      fontWeight: 600,
      marginBottom: 14
    }
  }, "\uBCF8\uC0AC"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,0.85)",
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(IconMapPin, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, "\uC6B8\uC0B0\uAD11\uC5ED\uC2DC \uB0A8\uAD6C")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center",
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(IconPhone, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, "052-000-0000")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center",
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(IconMail, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, "info@boaz.example"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid rgba(255,255,255,0.1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-wide)",
      margin: "0 auto",
      padding: "18px 32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: 12,
      color: "rgba(255,255,255,0.55)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2025 Boaz Environmental Technology Co., Ltd."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      letterSpacing: "0.05em"
    }
  }, "\uC0AC\uC5C5\uC790\uB4F1\uB85D 000-00-00000 \xB7 \uB300\uAE30\uCE21\uC815 \uC778\uC815 \uB300\uD589\uC5C5\uCCB4"))));
}

/* ────────────── PORTAL CHROME ────────────── */

const PORTAL_NAV = [{
  id: "portal",
  label: "대시보드",
  icon: IconHome
}, {
  id: "ongoing",
  label: "진행중 측정",
  icon: IconClipboard,
  badge: 8
}, {
  id: "report",
  label: "완료 보고서",
  icon: IconFileText,
  badge: 142
}, {
  id: "archive",
  label: "이력 조회",
  icon: IconFolder
}, {
  id: "billing",
  label: "청구",
  icon: IconChart
}, {
  id: "settings",
  label: "설정",
  icon: IconSettings
}];
function PortalSidebar({
  route,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 240,
      background: "var(--surface-card)",
      borderRight: "1px solid var(--border-subtle)",
      padding: "24px 16px",
      display: "flex",
      flexDirection: "column",
      gap: 24,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#/",
    onClick: e => {
      e.preventDefault();
      onNavigate("home");
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      textDecoration: "none",
      color: "inherit",
      padding: "0 8px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.svg",
    alt: "\u321C\uBCF4\uC544\uC2A4\uD658\uACBD\uAE30\uC220",
    style: {
      height: 30,
      width: "auto",
      display: "block"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: "0.14em",
      color: "var(--text-tertiary)",
      textTransform: "uppercase"
    }
  }, "\uACE0\uAC1D \uD3EC\uD138")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, PORTAL_NAV.map(item => {
    const active = item.id === route || item.id === "report" && route === "report";
    const Icon = item.icon;
    return /*#__PURE__*/React.createElement("a", {
      key: item.id,
      href: `#/${item.id}`,
      onClick: e => {
        e.preventDefault();
        onNavigate(item.id);
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 12px",
        borderRadius: "var(--radius-md)",
        fontSize: 14,
        fontWeight: active ? 600 : 500,
        color: active ? "var(--teal-700)" : "var(--text-secondary)",
        background: active ? "var(--teal-50)" : "transparent",
        textDecoration: "none",
        letterSpacing: "var(--tracking-snug)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      size: 16
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, item.label), item.badge != null ? /*#__PURE__*/React.createElement(Badge, {
      tone: active ? "brand" : "neutral",
      size: "sm"
    }, item.badge) : null);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 12px",
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 999,
      background: "var(--teal-500)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 600,
      fontSize: 13
    }
  }, "\uAE40"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, "\uAE40\uB2F4\uB2F9"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-tertiary)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, "\uC6B8\uC0B0 1\uACF5\uC7A5")))));
}
function PortalTopBar({
  title,
  breadcrumb,
  actions
}) {
  const {
    Breadcrumb
  } = window.BoasEnvironmentalDesignSystem_8f288d;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 20,
      padding: "20px 32px",
      borderBottom: "1px solid var(--border-subtle)",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement("div", null, breadcrumb ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: breadcrumb,
    separator: "\u203A"
  })) : null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: "-0.02em"
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, actions));
}
Object.assign(window, {
  SiteHeader,
  SiteFooter,
  PortalSidebar,
  PortalTopBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Inline SVG icons used across the UI kit. Lucide-style: 1.5px stroke,
// currentColor, 24×24 base. Each takes an optional size prop.

const Icon = ({
  children,
  size = 20,
  style,
  ...rest
}) => /*#__PURE__*/React.createElement("svg", _extends({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  style: {
    display: "inline-block",
    flexShrink: 0,
    ...style
  }
}, rest), children);
const IconWind = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M17.5 19a4.5 4.5 0 1 0-1.5-8.75"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 8a5 5 0 1 1 8.5 3.5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M2 12h20"
}), /*#__PURE__*/React.createElement("path", {
  d: "M2 16h14"
}));
const IconFlask = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M9 3h6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M10 3v6l-5 9a2 2 0 0 0 1.8 2.9h10.4A2 2 0 0 0 19 18l-5-9V3"
}), /*#__PURE__*/React.createElement("path", {
  d: "M7.5 14h9"
}));
const IconLeaf = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 3c1 2.5 1 6-2 8-2 2-4.6 2-6.5 2s-3.8.5-4.7 2.5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M2 21c0-3 1.85-5.36 5.08-6"
}));
const IconShield = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 12l2 2 4-4"
}));
const IconClipboard = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
  x: "6",
  y: "4",
  width: "12",
  height: "18",
  rx: "2"
}), /*#__PURE__*/React.createElement("rect", {
  x: "9",
  y: "2",
  width: "6",
  height: "4",
  rx: "1"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 12h6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 16h4"
}));
const IconChart = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M3 3v18h18"
}), /*#__PURE__*/React.createElement("path", {
  d: "M7 14l4-4 3 3 5-6"
}));
const IconDownload = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M12 3v12"
}), /*#__PURE__*/React.createElement("path", {
  d: "M6 9l6 6 6-6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 21h16"
}));
const IconArrowRight = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M5 12h14"
}), /*#__PURE__*/React.createElement("path", {
  d: "M13 6l6 6-6 6"
}));
const IconCheck = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M4 12l5 5L20 6"
}));
const IconMapPin = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M12 21s-8-6.5-8-12a8 8 0 0 1 16 0c0 5.5-8 12-8 12z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "9",
  r: "3"
}));
const IconPhone = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L7.9 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"
}));
const IconMail = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "5",
  width: "18",
  height: "14",
  rx: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 7l9 6 9-6"
}));
const IconCalendar = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "4",
  width: "18",
  height: "16",
  rx: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 10h18"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 4v6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 4v6"
}));
const IconSearch = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
  cx: "11",
  cy: "11",
  r: "7"
}), /*#__PURE__*/React.createElement("path", {
  d: "M20 20l-4-4"
}));
const IconBell = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M10 21a2 2 0 0 0 4 0"
}));
const IconHome = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M3 12l9-9 9 9"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5 10v10h14V10"
}));
const IconFolder = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
}));
const IconFileText = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M14 3v4a1 1 0 0 0 1 1h4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M6 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7l-4-4z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 13h8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 17h5"
}));
const IconSettings = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "3"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.6 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1z"
}));
const IconUser = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "8",
  r: "4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"
}));
const IconChevronRight = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M9 6l6 6-6 6"
}));
const IconLogo = ({
  size = 28
} = {}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 40 40",
  style: {
    flexShrink: 0
  }
}, /*#__PURE__*/React.createElement("rect", {
  x: "4",
  y: "10",
  width: "32",
  height: "6",
  rx: "1.5",
  fill: "#2B959D",
  opacity: "0.55"
}), /*#__PURE__*/React.createElement("rect", {
  x: "4",
  y: "19",
  width: "32",
  height: "6",
  rx: "1.5",
  fill: "#2B959D",
  opacity: "0.80"
}), /*#__PURE__*/React.createElement("rect", {
  x: "4",
  y: "28",
  width: "32",
  height: "6",
  rx: "1.5",
  fill: "#01737D"
}));
Object.assign(window, {
  IconWind,
  IconFlask,
  IconLeaf,
  IconShield,
  IconClipboard,
  IconChart,
  IconDownload,
  IconArrowRight,
  IconCheck,
  IconMapPin,
  IconPhone,
  IconMail,
  IconCalendar,
  IconSearch,
  IconBell,
  IconHome,
  IconFolder,
  IconFileText,
  IconSettings,
  IconUser,
  IconChevronRight,
  IconLogo
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/pages/Home.jsx
try { (() => {
// HomePage — marketing landing. Hero + credentials + services + stats + process + CTA.

const {
  Button,
  Card,
  Badge,
  StatCard,
  Readout
} = window.BoasEnvironmentalDesignSystem_8f288d;

/* Hero decorative panel — layered translucent teal bars evoking
   atmospheric layers / stacked measurement readings. No image needed. */
function HeroPanel() {
  const rows = [{
    top: 44,
    h: 26,
    w: 78,
    o: 0.14
  }, {
    top: 84,
    h: 26,
    w: 92,
    o: 0.18
  }, {
    top: 124,
    h: 26,
    w: 66,
    o: 0.22
  }, {
    top: 164,
    h: 26,
    w: 88,
    o: 0.26
  }, {
    top: 204,
    h: 26,
    w: 72,
    o: 0.32
  }, {
    top: 244,
    h: 26,
    w: 96,
    o: 0.38
  }, {
    top: 284,
    h: 26,
    w: 80,
    o: 0.5
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 380,
      borderRadius: "var(--radius-2xl)",
      background: "linear-gradient(160deg, #02333A 0%, #01464D 55%, #015A63 100%)",
      overflow: "hidden",
      color: "var(--gray-0)",
      border: "1px solid var(--teal-800)",
      boxShadow: "var(--shadow-lg)"
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: "absolute",
      left: 24,
      right: 24,
      top: r.top,
      height: r.h,
      width: `${r.w}%`,
      background: `rgba(146, 207, 211, ${r.o})`,
      borderRadius: 3
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 24,
      top: 24,
      right: 24,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      opacity: 0.8,
      fontWeight: 600
    }
  }, "LIVE READOUT \xB7 \uC6B8\uC0B0 1\uACF5\uC7A5 \xB7 A-3"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 11,
      opacity: 0.8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      background: "#5AB4BA",
      borderRadius: 999,
      display: "inline-block"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      letterSpacing: "-0.01em"
    }
  }, "\uC815\uAE30\uCE21\uC815 \uC9C4\uD589\uC911"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 24,
      bottom: 20,
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      opacity: 0.8,
      fontWeight: 600,
      marginBottom: 6
    }
  }, "NOx \xB7 \uBC30\uCD9C\uD5C8\uC6A9\uAE30\uC900 \uB300\uBE44"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      fontSize: 68,
      fontWeight: 600,
      letterSpacing: "-0.02em",
      lineHeight: 1
    }
  }, "94.8", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      opacity: 0.8,
      marginLeft: 4
    }
  }, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "3px 8px",
      background: "rgba(146, 207, 211, 0.18)",
      borderRadius: 4,
      fontSize: 12,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      background: "#0F8F5B",
      borderRadius: 999,
      display: "inline-block"
    }
  }), /*#__PURE__*/React.createElement("span", null, "\uAE30\uC900 \uC774\uB0B4"))));
}
function CredentialsStrip() {
  const items = [{
    code: "KOLAS",
    label: "국제공인 시험기관"
  }, {
    code: "환경부",
    label: "대기측정 인정 대행업체"
  }, {
    code: "ISO 9001",
    label: "품질경영시스템"
  }, {
    code: "ISO 14001",
    label: "환경경영시스템"
  }, {
    code: "KAS",
    label: "한국인정기구 등록"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-subtle)",
      borderBottom: "1px solid var(--border-subtle)",
      background: "var(--gray-0)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-wide)",
      margin: "0 auto",
      padding: "18px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      fontWeight: 600,
      color: "var(--text-tertiary)"
    }
  }, "\uACF5\uC778 \uC778\uC99D \xB7 \uB4F1\uB85D"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 32,
      flexWrap: "wrap"
    }
  }, items.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.code,
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      fontWeight: 700,
      color: "var(--teal-700)",
      letterSpacing: "-0.01em"
    }
  }, c.code), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-secondary)"
    }
  }, c.label))))));
}
function ServiceCard({
  icon: Icon,
  title,
  desc,
  items
}) {
  return /*#__PURE__*/React.createElement(Card, {
    variant: "default",
    padding: "lg",
    interactive: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 44,
      height: 44,
      borderRadius: "var(--radius-md)",
      background: "var(--teal-50)",
      color: "var(--teal-600)",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    size: 22
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: "-0.02em"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 14px",
      fontSize: 13,
      color: "var(--text-secondary)",
      lineHeight: 1.6
    }
  }, desc), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it,
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 8,
      fontSize: 13,
      color: "var(--text-primary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--teal-500)",
      marginTop: 6,
      width: 4,
      height: 4,
      borderRadius: 999,
      background: "var(--teal-500)",
      flexShrink: 0
    }
  }), it))));
}
function ProcessStep({
  n,
  title,
  desc
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 999,
      border: "1.5px solid var(--teal-500)",
      background: "var(--surface-card)",
      color: "var(--teal-700)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-mono)",
      fontWeight: 600,
      fontSize: 14,
      flexShrink: 0
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: "var(--border-subtle)"
    }
  })), /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: "-0.01em"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontSize: 13,
      color: "var(--text-secondary)",
      lineHeight: 1.55
    }
  }, desc));
}
function HomePage({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "var(--container-wide)",
      margin: "0 auto",
      padding: "72px 32px 56px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.05fr 1fr",
      gap: 56,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 12px",
      background: "var(--teal-50)",
      color: "var(--teal-700)",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "var(--tracking-snug)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      background: "var(--teal-500)",
      borderRadius: 999
    }
  }), "KOLAS \xB7 \uB300\uAE30\uCE21\uC815 \uC778\uC815 \uB300\uD589\uC5C5\uCCB4"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "20px 0 0",
      fontSize: 60,
      fontWeight: 800,
      lineHeight: 1.05,
      letterSpacing: "-0.03em"
    }
  }, "\uACF5\uAE30\uC758 \uBB34\uAC8C\uB97C", /*#__PURE__*/React.createElement("br", null), "\uC815\uD655\uD558\uAC8C \uC7BD\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "20px 0 32px",
      fontSize: 17,
      color: "var(--text-secondary)",
      lineHeight: 1.65,
      maxWidth: 520
    }
  }, "\uBCF4\uC544\uC2A4\uD658\uACBD\uAE30\uC220\uC740 \uB300\uAE30\uCE21\uC815 \uBC0F \uBD84\uC11D \uC804\uBB38 \uAE30\uC5C5\uC785\uB2C8\uB2E4. \uC0B0\uC5C5\uCCB4 \uBC30\uCD9C\uAC00\uC2A4, \uC545\uCDE8, \uC791\uC5C5\uD658\uACBD\uAE4C\uC9C0 \u2014 \uAD6D\uC81C\uACF5\uC778 \uBC29\uBC95\uC73C\uB85C \uCE21\uC815\uD558\uACE0, \uD310\uC815 \uADFC\uAC70\uB97C \uB2F4\uC740 \uBCF4\uACE0\uC11C\uB97C \uC81C\uACF5\uD569\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => onNavigate("request"),
    iconRight: /*#__PURE__*/React.createElement(IconArrowRight, {
      size: 16
    })
  }, "\uCE21\uC815 \uC694\uCCAD \uBCF4\uB0B4\uAE30"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    onClick: () => onNavigate("services")
  }, "\uC11C\uBE44\uC2A4 \uC790\uC138\uD788")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      display: "flex",
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 26,
      fontWeight: 700,
      letterSpacing: "-0.02em"
    }
  }, "24,180", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--text-tertiary)",
      marginLeft: 4,
      fontWeight: 500
    }
  }, "\uAC74")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-tertiary)",
      marginTop: 2
    }
  }, "\uB204\uC801 \uCE21\uC815 \uC2E4\uC801")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 26,
      fontWeight: 700,
      letterSpacing: "-0.02em"
    }
  }, "380", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--text-tertiary)",
      marginLeft: 4,
      fontWeight: 500
    }
  }, "\uC0AC")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-tertiary)",
      marginTop: 2
    }
  }, "\uC11C\uBE44\uC2A4 \uACE0\uAC1D\uC0AC")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 26,
      fontWeight: 700,
      letterSpacing: "-0.02em"
    }
  }, "9", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--text-tertiary)",
      marginLeft: 4,
      fontWeight: 500
    }
  }, "\uB144")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-tertiary)",
      marginTop: 2
    }
  }, "\uC5C5\uB825 \xB7 2016.5~")))), /*#__PURE__*/React.createElement(HeroPanel, null))), /*#__PURE__*/React.createElement(CredentialsStrip, null), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "var(--container-wide)",
      margin: "0 auto",
      padding: "72px 32px 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginBottom: 32,
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      fontWeight: 600,
      color: "var(--teal-600)",
      marginBottom: 10
    }
  }, "SERVICES \xB7 \uC11C\uBE44\uC2A4"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 36,
      fontWeight: 700,
      letterSpacing: "-0.02em"
    }
  }, "\uCE21\uC815\uC5D0\uC11C \uCEE8\uC124\uD305\uAE4C\uC9C0, \uD55C \uACF3\uC5D0\uC11C.")), /*#__PURE__*/React.createElement("a", {
    href: "#/services",
    onClick: e => {
      e.preventDefault();
      onNavigate("services");
    },
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      color: "var(--teal-600)",
      textDecoration: "none",
      fontSize: 14,
      fontWeight: 600
    }
  }, "\uC804\uCCB4 \uC11C\uBE44\uC2A4 \uBCF4\uAE30 ", /*#__PURE__*/React.createElement(IconArrowRight, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(ServiceCard, {
    icon: IconWind,
    title: "\uB300\uAE30\uCE21\uC815 \uB300\uD589",
    desc: "\uBC30\uCD9C\uAC00\uC2A4 \xB7 \uB300\uAE30\uD658\uACBD \uC815\uAE30\uCE21\uC815. \uD45C\uC900 \uC2DC\uD5D8\uBC29\uBC95 \uC900\uC218.",
    items: ["먼지·NOx·SOx·CO", "휘발성유기화합물 (VOCs)", "특정대기유해물질"]
  }), /*#__PURE__*/React.createElement(ServiceCard, {
    icon: IconFlask,
    title: "\uC2DC\uB8CC \uBD84\uC11D",
    desc: "\uC790\uCCB4 \uC2E4\uD5D8\uC2E4 \uC815\uBC00 \uBD84\uC11D. \uC2DC\uB8CC \uCC44\uCDE8\uBD80\uD130 \uD310\uC815\uAE4C\uC9C0.",
    items: ["기기분석 (GC / ICP)", "습식 · 중량법", "판정 리포트 제공"]
  }), /*#__PURE__*/React.createElement(ServiceCard, {
    icon: IconLeaf,
    title: "\uC545\uCDE8\uC800\uAC10 \uCEE8\uC124\uD305",
    desc: "\uBCF5\uD569\uC545\uCDE8 \xB7 \uC9C0\uC815\uC545\uCDE8\uBB3C\uC9C8 \uC9C4\uB2E8\uACFC \uC800\uAC10 \uC124\uACC4 \uC790\uBB38.",
    items: ["현장 실측 · 원인 진단", "저감시설 설계 검토", "규제대응 자문"]
  }), /*#__PURE__*/React.createElement(ServiceCard, {
    icon: IconShield,
    title: "\uD658\uACBD\uC5C5\uBB34 \uB300\uD589",
    desc: "\uC790\uAC00\uCE21\uC815 \uB300\uD589, \uD658\uACBD\uAD00\uB9AC \uC2E4\uBB34, \uC2E0\uACE0\xB7\uC778\xB7\uD5C8\uAC00 \uC9C0\uC6D0.",
    items: ["자가측정 대행", "환경관리 실무", "인·허가 자료 작성"]
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-sunken)",
      padding: "72px 0",
      marginTop: 72
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-wide)",
      margin: "0 auto",
      padding: "0 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      fontWeight: 600,
      color: "var(--teal-600)",
      marginBottom: 10
    }
  }, "PROCESS \xB7 \uCE21\uC815 \uD504\uB85C\uC138\uC2A4"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 32,
      fontWeight: 700,
      letterSpacing: "-0.02em"
    }
  }, "\uBCF4\uACE0\uC11C \uBC1C\uD589\uAE4C\uC9C0, \uD3C9\uADE0 5\uC601\uC5C5\uC77C."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement(ProcessStep, {
    n: "01",
    title: "\uCE21\uC815 \uC694\uCCAD \uC811\uC218",
    desc: "\uC2DC\uC124\uBA85 \xB7 \uB300\uC0C1 \uD56D\uBAA9 \xB7 \uD76C\uB9DD\uC77C \uD655\uC778 \uD6C4 \uB2F4\uB2F9\uC790 \uBC30\uC815."
  }), /*#__PURE__*/React.createElement(ProcessStep, {
    n: "02",
    title: "\uD604\uC7A5 \uC2DC\uB8CC \uCC44\uCDE8",
    desc: "\uACF5\uC2DD \uBC29\uBC95 \uC900\uC218 \xB7 \uCC44\uCDE8 \uC870\uAC74 \uAE30\uB85D \xB7 \uC774\uC911 \uC2DC\uB8CC \uD655\uBCF4."
  }), /*#__PURE__*/React.createElement(ProcessStep, {
    n: "03",
    title: "\uC2E4\uD5D8\uC2E4 \uC815\uBC00 \uBD84\uC11D",
    desc: "KOLAS \uC778\uC815 \uBC29\uBC95\uC5D0 \uB530\uB978 \uC815\uB7C9 \uBD84\uC11D \xB7 \uD310\uC815 \uAE30\uC900 \uB300\uC870."
  }), /*#__PURE__*/React.createElement(ProcessStep, {
    n: "04",
    title: "\uBCF4\uACE0\uC11C \uBC1C\uD589",
    desc: "\uC6D0\uBCF8 \uB370\uC774\uD130 \xB7 \uD310\uC815 \uADFC\uAC70 \xB7 \uAC1C\uC120 \uAD8C\uACE0 \uC0AC\uD56D \uD3EC\uD568."
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "var(--container-wide)",
      margin: "72px auto 0",
      padding: "0 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-2xl)",
      background: "linear-gradient(135deg, #02333A 0%, #01737D 100%)",
      color: "var(--gray-0)",
      padding: "48px 48px",
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr",
      gap: 32,
      alignItems: "center",
      boxShadow: "var(--shadow-md)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      fontWeight: 600,
      opacity: 0.7,
      marginBottom: 12
    }
  }, "\uC815\uAE30\uCE21\uC815\uC774 \uB2E4\uAC00\uC624\uACE0 \uC788\uB098\uC694?"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 30,
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.25
    }
  }, "\uCE21\uC815 \uC77C\uC815\uACFC \uACAC\uC801\uC744", /*#__PURE__*/React.createElement("br", null), "1\uC601\uC5C5\uC77C \uC548\uC5D0 \uD68C\uC2E0\uB4DC\uB9BD\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "brand-inverse",
    size: "lg",
    onClick: () => onNavigate("request"),
    iconRight: /*#__PURE__*/React.createElement(IconArrowRight, {
      size: 18
    })
  }, "\uCE21\uC815 \uC694\uCCAD \uBCF4\uB0B4\uAE30"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      opacity: 0.75
    }
  }, "\uC804\uD654: ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, "052-000-0000"))))));
}
Object.assign(window, {
  HomePage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/pages/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/pages/Portal.jsx
try { (() => {
// PortalPage — authenticated dashboard. Composed with the portal chrome
// (sidebar + top bar); this file only supplies the main content.

const {
  Button,
  Card,
  Badge,
  DataTable,
  StatCard,
  Readout,
  ProgressBar,
  Tabs,
  Alert,
  IconButton
} = window.BoasEnvironmentalDesignSystem_8f288d;
const ACTIVE_ROWS = [{
  id: 1,
  code: "M-1041",
  site: "울산 1공장 · A-3",
  type: "정기측정",
  date: "2025.10.14",
  stage: "실험실 분석",
  progress: 62,
  due: "10.19",
  assignee: "이수현"
}, {
  id: 2,
  code: "M-1040",
  site: "울산 2공장 · B-1",
  type: "자가측정 대행",
  date: "2025.10.12",
  stage: "시료 채취 완료",
  progress: 40,
  due: "10.18",
  assignee: "박정민"
}, {
  id: 3,
  code: "M-1039",
  site: "울산 1공장 · C-2",
  type: "특별 측정",
  date: "2025.10.10",
  stage: "보고서 작성",
  progress: 88,
  due: "10.15",
  assignee: "김서연"
}, {
  id: 4,
  code: "M-1038",
  site: "부산 지사 · 도장부",
  type: "악취 측정",
  date: "2025.10.08",
  stage: "판정 검토",
  progress: 76,
  due: "10.17",
  assignee: "이수현"
}];
const RECENT_REPORTS = [{
  id: "R-1032",
  date: "2025.10.02",
  site: "울산 1공장 · A-3",
  items: 4,
  verdict: {
    tone: "ok",
    label: "기준 이내"
  }
}, {
  id: "R-1031",
  date: "2025.09.28",
  site: "울산 2공장 · B-1",
  items: 5,
  verdict: {
    tone: "warn",
    label: "주의 항목 1건"
  }
}, {
  id: "R-1030",
  date: "2025.09.24",
  site: "부산 지사 · 도장부",
  items: 3,
  verdict: {
    tone: "danger",
    label: "초과 항목 2건"
  }
}, {
  id: "R-1029",
  date: "2025.09.20",
  site: "울산 1공장 · C-2",
  items: 4,
  verdict: {
    tone: "ok",
    label: "기준 이내"
  }
}];
function stageBadgeTone(stage) {
  if (stage.includes("보고서")) return "brand";
  if (stage.includes("판정")) return "info";
  if (stage.includes("분석")) return "info";
  return "neutral";
}
function ActivityItem({
  time,
  title,
  meta,
  tone
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      gap: 12,
      alignItems: "flex-start",
      padding: "12px 0",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 999,
      background: tone === "ok" ? "var(--success-500)" : tone === "warn" ? "var(--warning-500)" : tone === "danger" ? "var(--danger-500)" : "var(--teal-500)",
      marginTop: 8,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-tertiary)",
      marginTop: 2
    }
  }, meta)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--text-tertiary)"
    }
  }, time));
}
function PortalPage({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "28px 32px 60px",
      maxWidth: 1400,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Alert, {
    tone: "warn",
    title: "10\uC6D4 17\uC77C\uAE4C\uC9C0 \uD68C\uC2E0 \uD544\uC694\uD55C \uCE21\uC815 \uC694\uCCAD\uC774 2\uAC74 \uC788\uC2B5\uB2C8\uB2E4.",
    onDismiss: () => {}
  }, "\uACAC\uC801 \uD68C\uC2E0 \uB300\uAE30 \xB7 \uB9C8\uAC10\uC774 \uC784\uBC15\uD55C \uC694\uCCAD\uBD80\uD130 \uC6B0\uC120 \uCC98\uB9AC\uD574 \uC8FC\uC138\uC694."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "\uC774\uBC88\uB2EC \uCE21\uC815",
    value: "128",
    unit: "\uAC74",
    trend: 12,
    trendLabel: "\uC9C0\uB09C\uB2EC \uB300\uBE44",
    icon: /*#__PURE__*/React.createElement(IconChart, {
      size: 18
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "\uC9C4\uD589\uC911",
    value: "8",
    unit: "\uAC74",
    trendLabel: "4\uAC74 \uB9C8\uAC10 \uC784\uBC15",
    icon: /*#__PURE__*/React.createElement(IconClipboard, {
      size: 18
    })
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "\uD3C9\uADE0 NOx \uBC30\uCD9C",
    value: "87.4",
    unit: "ppm",
    trend: -8,
    positiveIntent: "down",
    trendLabel: "\uC9C0\uB09C\uC8FC \uB300\uBE44"
  }), /*#__PURE__*/React.createElement(StatCard, {
    tone: "brand",
    label: "\uB204\uC801 \uC2E4\uC801",
    value: "24,180",
    unit: "\uAC74",
    footer: "2016.05\uBD80\uD130"
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "none"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "18px 20px",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: "-0.01em"
    }
  }, "\uC9C4\uD589\uC911 \uCE21\uC815"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-tertiary)",
      marginTop: 2
    }
  }, "4\uAC74 \xB7 \uC2E4\uC2DC\uAC04 \uC9C4\uD589\uB960")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "segmented",
    size: "sm",
    defaultValue: "all",
    items: [{
      id: "all",
      label: "전체"
    }, {
      id: "mine",
      label: "내 담당"
    }, {
      id: "flagged",
      label: "이슈"
    }]
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, "\uC804\uCCB4 \uBCF4\uAE30"))), /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: "code",
      header: "번호",
      width: 90,
      mono: true,
      render: r => /*#__PURE__*/React.createElement("a", {
        href: "#/report",
        onClick: e => {
          e.preventDefault();
          onNavigate("report");
        },
        style: {
          color: "var(--text-link)",
          textDecoration: "none",
          fontWeight: 600
        }
      }, r.code)
    }, {
      key: "site",
      header: "측정 대상"
    }, {
      key: "type",
      header: "유형"
    }, {
      key: "date",
      header: "요청일",
      mono: true
    }, {
      key: "stage",
      header: "단계",
      render: r => /*#__PURE__*/React.createElement(Badge, {
        tone: stageBadgeTone(r.stage),
        size: "sm"
      }, r.stage)
    }, {
      key: "progress",
      header: "진행률",
      width: 180,
      render: r => /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement(ProgressBar, {
        value: r.progress,
        status: "brand",
        size: "sm"
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: "var(--font-mono)",
          fontVariantNumeric: "tabular-nums",
          fontSize: 12,
          fontWeight: 600,
          minWidth: 34,
          textAlign: "right"
        }
      }, r.progress, "%"))
    }, {
      key: "due",
      header: "마감",
      mono: true,
      align: "right"
    }, {
      key: "assignee",
      header: "담당",
      align: "right"
    }],
    rows: ACTIVE_ROWS,
    onRowClick: r => onNavigate("report")
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "none"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "18px 20px",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: "-0.01em"
    }
  }, "\uCD5C\uADFC \uBC1C\uD589\uB41C \uBCF4\uACE0\uC11C"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-tertiary)",
      marginTop: 2
    }
  }, "\uCD5C\uADFC 30\uC77C \xB7 12\uAC74 \uBC1C\uD589")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    iconRight: /*#__PURE__*/React.createElement(IconArrowRight, {
      size: 14
    })
  }, "\uC804\uCCB4 \uC774\uB825")), /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: "id",
      header: "보고서",
      width: 90,
      mono: true,
      render: r => /*#__PURE__*/React.createElement("a", {
        href: "#/report",
        onClick: e => {
          e.preventDefault();
          onNavigate("report");
        },
        style: {
          color: "var(--text-link)",
          textDecoration: "none",
          fontWeight: 600
        }
      }, r.id)
    }, {
      key: "date",
      header: "발행일",
      mono: true,
      width: 110
    }, {
      key: "site",
      header: "측정 대상"
    }, {
      key: "items",
      header: "항목",
      mono: true,
      align: "right",
      width: 70,
      render: r => `${r.items}개`
    }, {
      key: "verdict",
      header: "판정",
      align: "center",
      width: 140,
      render: r => /*#__PURE__*/React.createElement(Badge, {
        tone: r.verdict.tone,
        dot: true
      }, r.verdict.label)
    }],
    rows: RECENT_REPORTS,
    onRowClick: () => onNavigate("report")
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: "-0.01em"
    }
  }, "\uB2F4\uB2F9\uC790 \uD65C\uB3D9"), /*#__PURE__*/React.createElement(IconButton, {
    variant: "ghost",
    ariaLabel: "\uC54C\uB9BC \uC124\uC815",
    size: "sm"
  }, /*#__PURE__*/React.createElement(IconBell, {
    size: 16
  }))), /*#__PURE__*/React.createElement(ActivityItem, {
    tone: "ok",
    time: "10:42",
    title: "M-1039 \uBCF4\uACE0\uC11C \uCD08\uC548 \uAC80\uD1A0 \uC644\uB8CC",
    meta: "\uAE40\uC11C\uC5F0 \xB7 \uD310\uC815 \uADFC\uAC70 \uD655\uC778"
  }), /*#__PURE__*/React.createElement(ActivityItem, {
    tone: "brand",
    time: "09:18",
    title: "M-1042 \uC2E0\uADDC \uCE21\uC815 \uC694\uCCAD \uC811\uC218",
    meta: "\uC6B8\uC0B0 3\uACF5\uC7A5 \xB7 VOCs \uC804 \uD56D\uBAA9"
  }), /*#__PURE__*/React.createElement(ActivityItem, {
    tone: "warn",
    time: "08:55",
    title: "M-1040 \uC7AC\uCE21\uC815 \uD611\uC758 \uC694\uCCAD",
    meta: "\uD48D\uD5A5 \uC870\uAC74 \uBD88\uCDA9\uC871 \u2014 \uC2DC\uB8CC \uC7AC\uCC44\uCDE8 \uD544\uC694"
  }), /*#__PURE__*/React.createElement(ActivityItem, {
    tone: "ok",
    time: "\uC5B4\uC81C",
    title: "R-1032 \uBCF4\uACE0\uC11C \uBC1C\uC1A1 \uC644\uB8CC",
    meta: "\uC6B8\uC0B0 1\uACF5\uC7A5 \xB7 4\uAC1C \uD56D\uBAA9 \uBAA8\uB450 \uAE30\uC900 \uC774\uB0B4"
  }), /*#__PURE__*/React.createElement(ActivityItem, {
    tone: "danger",
    time: "10.09",
    title: "R-1030 SOx \uCD08\uACFC \uC54C\uB9BC \uBC1C\uC1A1",
    meta: "\uBD80\uC0B0 \uC9C0\uC0AC \xB7 \uB2F4\uB2F9\uC790\uC5D0\uAC8C \uC54C\uB9BC"
  }))));
}
Object.assign(window, {
  PortalPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/pages/Portal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/pages/Report.jsx
try { (() => {
// ReportPage — single measurement report detail view.

const {
  Button,
  Card,
  Badge,
  DataTable,
  Readout,
  ProgressBar,
  Breadcrumb,
  IconButton,
  Divider,
  Alert
} = window.BoasEnvironmentalDesignSystem_8f288d;
const REPORT_ROWS = [{
  id: 1,
  item: "먼지 (TSP)",
  method: "중량법",
  value: "18.4",
  unit: "mg/m³",
  limit: "50",
  pct: 37,
  status: {
    tone: "ok",
    label: "기준 이내"
  }
}, {
  id: 2,
  item: "질소산화물 (NOx)",
  method: "화학발광법",
  value: "142.7",
  unit: "ppm",
  limit: "150",
  pct: 95,
  status: {
    tone: "warn",
    label: "주의"
  }
}, {
  id: 3,
  item: "황산화물 (SOx)",
  method: "이온크로마토",
  value: "212.5",
  unit: "ppm",
  limit: "200",
  pct: 106,
  status: {
    tone: "danger",
    label: "초과"
  }
}, {
  id: 4,
  item: "일산화탄소 (CO)",
  method: "NDIR",
  value: "7.1",
  unit: "ppm",
  limit: "600",
  pct: 1.2,
  status: {
    tone: "ok",
    label: "기준 이내"
  }
}, {
  id: 5,
  item: "휘발성유기화합물",
  method: "GC-FID",
  value: "38.2",
  unit: "ppm",
  limit: "40",
  pct: 96,
  status: {
    tone: "warn",
    label: "주의"
  }
}];
function MetaCell({
  label,
  children,
  mono
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      fontWeight: 600,
      color: "var(--text-tertiary)",
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "var(--text-primary)",
      fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
      fontVariantNumeric: mono ? "tabular-nums" : "normal"
    }
  }, children));
}
function ReportPage({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "28px 32px 60px",
      maxWidth: 1200,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 20,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Breadcrumb, {
    separator: "\u203A",
    items: [{
      label: "고객 포털",
      href: "#/portal"
    }, {
      label: "완료 보고서",
      href: "#/portal"
    }, {
      label: "R-1032 · 2025.10.02"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: "-0.02em"
    }
  }, "\uC815\uAE30\uCE21\uC815 \uBCF4\uACE0\uC11C \xB7 R-1032"), /*#__PURE__*/React.createElement(Badge, {
    tone: "warn",
    dot: true,
    size: "lg"
  }, "\uC8FC\uC758 \uD56D\uBAA9 2\uAC74")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontSize: 14,
      color: "var(--text-secondary)"
    }
  }, "\uC6B8\uC0B0 1\uACF5\uC7A5 \xB7 A-3 \uBC30\uCD9C\uAD6C \xB7 2025\uB144 10\uC6D4 \uC815\uAE30\uCE21\uC815")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    ariaLabel: "\uACF5\uC720",
    variant: "secondary",
    size: "md"
  }, /*#__PURE__*/React.createElement(IconMail, {
    size: 16
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconLeft: /*#__PURE__*/React.createElement(IconFileText, {
      size: 14
    })
  }, "\uC6D0\uBCF8 \uB370\uC774\uD130"), /*#__PURE__*/React.createElement(Button, {
    iconLeft: /*#__PURE__*/React.createElement(IconDownload, {
      size: 14
    })
  }, "PDF \uB2E4\uC6B4\uB85C\uB4DC"))), /*#__PURE__*/React.createElement(Alert, {
    tone: "warn",
    title: "\uAC80\uD1A0\uAC00 \uD544\uC694\uD55C \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4."
  }, "SOx \uCE21\uC815\uAC12\uC774 \uBC30\uCD9C\uD5C8\uC6A9\uAE30\uC900\uC758 ", /*#__PURE__*/React.createElement("b", null, "106%"), "\uB85C \uCD08\uACFC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. VOCs\uC640 NOx\uB294 \uAE30\uC900 \uB300\uBE44 90% \uC774\uC0C1\uC73C\uB85C \uC8FC\uC758\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. \uB2F4\uB2F9\uC790 \uAC80\uD1A0 \uD6C4 \uAC1C\uC120 \uC870\uCE58\uB97C \uD611\uC758\uD558\uC138\uC694."), /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(MetaCell, {
    label: "\uCE21\uC815 \uC704\uCE58"
  }, "\uBC30\uCD9C\uAD6C A-3"), /*#__PURE__*/React.createElement(MetaCell, {
    label: "\uCE21\uC815 \uC77C\uC2DC",
    mono: true
  }, "2025.10.02 09:41"), /*#__PURE__*/React.createElement(MetaCell, {
    label: "\uCE21\uC815 \uBC29\uBC95"
  }, "\uACF5\uC815\uC2DC\uD5D8\uAE30\uC900"), /*#__PURE__*/React.createElement(MetaCell, {
    label: "\uCE21\uC815\uC790"
  }, "\uC774\uC218\uD604 \xB7 \uBC15\uC815\uBBFC"), /*#__PURE__*/React.createElement(MetaCell, {
    label: "\uC2DC\uB8CC \uC720\uD615"
  }, "\uBC30\uCD9C\uAC00\uC2A4"), /*#__PURE__*/React.createElement(MetaCell, {
    label: "\uAE30\uC0C1 \uC870\uAC74"
  }, "\uD48D\uD5A5 SW \xB7 21\xB0C"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      fontWeight: 600,
      color: "var(--text-tertiary)",
      marginBottom: 12
    }
  }, "Overall \xB7 \uC885\uD569 \uD310\uC815"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Readout, {
    value: "94.8",
    unit: "%",
    status: "brand",
    size: "xl"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-tertiary)"
    }
  }, "\uBC30\uCD9C\uD5C8\uC6A9\uAE30\uC900 \uB300\uBE44 \uD3C9\uADE0")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginTop: 12,
      padding: "4px 10px",
      background: "var(--status-warn-bg)",
      color: "var(--status-warn-fg)",
      borderRadius: 999,
      alignSelf: "flex-start",
      width: "fit-content",
      fontSize: 12,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      background: "var(--warning-500)",
      borderRadius: 999
    }
  }), "5\uAC1C \uD56D\uBAA9 \uC911 3\uAC1C \uAE30\uC900 \uC774\uB0B4 \xB7 2\uAC1C \uC8FC\uC758"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: "10px 14px",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)"
    }
  }, "\uB2E4\uC74C \uCE21\uC815 \uC608\uC815"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, "2026.01.05 (\uBD84\uAE30)"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)"
    }
  }, "\uC7AC\uCE21\uC815 \uAD8C\uACE0"), /*#__PURE__*/React.createElement("span", null, "SOx \xB7 \uC870\uAC74 \uAC80\uD1A0 \uD6C4"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)"
    }
  }, "\uBCF4\uACE0\uC11C \uBC1C\uD589"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, "2025.10.02 \xB7 v1.0"))), /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      fontWeight: 600,
      color: "var(--text-tertiary)",
      marginBottom: 12
    }
  }, "\uAE30\uC900 \uB300\uBE44 \xB7 \uD56D\uBAA9\uBCC4"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, REPORT_ROWS.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    style: {
      display: "grid",
      gridTemplateColumns: "120px 1fr 56px",
      gap: 12,
      alignItems: "center",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, r.item), /*#__PURE__*/React.createElement(ProgressBar, {
    value: Math.min(r.pct, 120),
    max: 100,
    status: r.status.tone === "danger" ? "danger" : r.status.tone === "warn" ? "warn" : "ok",
    size: "sm"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      fontSize: 12,
      fontWeight: 600,
      textAlign: "right"
    }
  }, r.pct, "%")))))), /*#__PURE__*/React.createElement(Card, {
    padding: "none"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "18px 20px",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: "-0.01em"
    }
  }, "\uCE21\uC815 \uACB0\uACFC \uC0C1\uC138"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-tertiary)",
      marginTop: 2
    }
  }, "5\uAC1C \uD56D\uBAA9 \xB7 \uB300\uAE30\uC624\uC5FC\uACF5\uC815\uC2DC\uD5D8\uAE30\uC900 \uC801\uC6A9")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(IconDownload, {
      size: 14
    })
  }, "Excel")), /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: "item",
      header: "측정 항목"
    }, {
      key: "method",
      header: "시험 방법"
    }, {
      key: "value",
      header: "측정값",
      align: "right",
      mono: true,
      render: r => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 600
        }
      }, r.value), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--text-tertiary)",
          marginLeft: 3,
          fontSize: 11
        }
      }, r.unit))
    }, {
      key: "limit",
      header: "허용기준",
      align: "right",
      mono: true,
      render: r => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, r.limit), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--text-tertiary)",
          marginLeft: 3,
          fontSize: 11
        }
      }, r.unit))
    }, {
      key: "pct",
      header: "기준 대비",
      align: "right",
      mono: true,
      render: r => `${r.pct}%`
    }, {
      key: "status",
      header: "판정",
      align: "center",
      width: 130,
      render: r => /*#__PURE__*/React.createElement(Badge, {
        tone: r.status.tone,
        dot: true
      }, r.status.label)
    }],
    rows: REPORT_ROWS
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: "-0.01em",
      marginBottom: 10
    }
  }, "\uB2F4\uB2F9\uC790 \uB178\uD2B8 \xB7 \uAC1C\uC120 \uAD8C\uACE0"), /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: 0,
      paddingLeft: 20,
      fontSize: 14,
      lineHeight: 1.7,
      color: "var(--text-primary)"
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("b", null, "SOx \uCD08\uACFC (106%):"), " \uC6D0\uB8CC \uC720\uD669\uBD84 \uC0C1\uC2B9 \uBC0F \uC2A4\uD06C\uB7EC\uBC84 \uD761\uC218\uC561 pH \uC800\uD558\uAC00 \uC6D0\uC778\uC73C\uB85C \uCD94\uC815\uB429\uB2C8\uB2E4. pH \uC870\uC808\uC81C \uBCF4\uCDA9 \uBC0F \uB2F4\uC218 \uC21C\uD658 \uC810\uAC80 \uD6C4 ", /*#__PURE__*/React.createElement("b", null, "10\uC6D4 \uB0B4 \uC7AC\uCE21\uC815"), "\uC744 \uAD8C\uACE0\uD569\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("b", null, "NOx 95%, VOCs 96%:"), " \uAE30\uC900 \uC774\uB0B4\uC774\uB098 \uC9C0\uB09C \uBD84\uAE30 \uB300\uBE44 \uC0C1\uC2B9\uC138\uC785\uB2C8\uB2E4. \uC5F0\uC18C \uC870\uAC74(\uACF5\uAE30\uBE44, \uBD80\uD558\uC728) \uBC0F \uC800\uC7A5\uD0F1\uD06C \uBC38\uBE0C \uC2E4\uB9C1 \uC810\uAC80\uC744 \uAD8C\uACE0\uD569\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("b", null, "\uAE30\uD0C0:"), " \uCE21\uC815 \uB2F9\uC77C \uD48D\uD5A5(SW)\uC774 \uC608\uB144\uACFC \uC0C1\uC774\uD588\uC73C\uBA70, \uD1B5\uC0C1 \uC870\uAC74\uC5D0\uC11C\uC758 \uC7AC\uD604\uC131 \uD655\uC778\uC744 \uC704\uD574 \uB2E4\uC74C \uBD84\uAE30\uCE21\uC815 \uC2DC \uAE30\uC0C1 \uB370\uC774\uD130\uB97C \uB3D9\uBD09\uD569\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Divider, {
    style: {
      margin: "16px 0 12px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: 12,
      color: "var(--text-tertiary)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uAC80\uD1A0: \uAE40\uC11C\uC5F0 (\uC218\uC11D\uC5F0\uAD6C\uC6D0) \xB7 \uC2B9\uC778: \uC815\uC18C\uC601 (\uBCF8\uBD80\uC7A5)"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, "2025.10.02 15:24 KST"))));
}
Object.assign(window, {
  ReportPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/pages/Report.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/pages/Request.jsx
try { (() => {
// RequestPage — measurement request form.

const {
  Button,
  Card,
  FormField,
  Input,
  Select,
  Checkbox,
  Breadcrumb,
  Alert,
  Divider
} = window.BoasEnvironmentalDesignSystem_8f288d;
function RequestPage({
  onNavigate
}) {
  const [submitted, setSubmitted] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-wide)",
      margin: "0 auto",
      padding: "40px 32px 80px"
    }
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    separator: "\u203A",
    items: [{
      label: "홈",
      href: "#/"
    }, {
      label: "측정 요청"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      fontWeight: 600,
      color: "var(--teal-600)",
      marginBottom: 12
    }
  }, "REQUEST \xB7 \uCE21\uC815 \uC694\uCCAD"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 40,
      fontWeight: 800,
      letterSpacing: "-0.03em",
      lineHeight: 1.1
    }
  }, "\uCE21\uC815 \uACAC\uC801 \xB7 \uC77C\uC815 \uC694\uCCAD"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "16px 0 0",
      fontSize: 15,
      color: "var(--text-secondary)",
      lineHeight: 1.65,
      maxWidth: 640
    }
  }, "\uB2F4\uB2F9\uC790\uAC00 ", /*#__PURE__*/React.createElement("b", null, "1\uC601\uC5C5\uC77C \uC774\uB0B4"), " \uACAC\uC801\uACFC \uAC00\uB2A5 \uC77C\uC815\uC744 \uD68C\uC2E0\uB4DC\uB9BD\uB2C8\uB2E4. \uAE09\uD55C \uAC74\uC740 \uC804\uD654\uB85C \uBB38\uC758 \uC8FC\uC138\uC694 \u2014 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, "052-000-0000"), ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr",
      gap: 32,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, submitted ? /*#__PURE__*/React.createElement(Alert, {
    tone: "ok",
    title: "\uCE21\uC815 \uC694\uCCAD\uC774 \uC811\uC218\uB418\uC5C8\uC2B5\uB2C8\uB2E4."
  }, "\uB2F4\uB2F9\uC790\uAC00 1\uC601\uC5C5\uC77C \uC774\uB0B4 \uC774\uBA54\uC77C\uB85C \uC5F0\uB77D\uB4DC\uB9BD\uB2C8\uB2E4. \uC811\uC218\uBC88\uD638\uB294 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, "#RQ-2025-1041"), ".") : null, /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSubmitted(true);
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      marginTop: submitted ? 20 : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      fontWeight: 600,
      color: "var(--text-tertiary)"
    }
  }, "\uD68C\uC0AC \uC815\uBCF4"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "\uD68C\uC0AC\uBA85",
    htmlFor: "company",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "\uC608) \uBCF4\uC544\uC2A4\uC0B0\uC5C5 (\uC8FC)"
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "\uC0AC\uC5C5\uC790\uB4F1\uB85D\uBC88\uD638",
    htmlFor: "bizno",
    helper: "10\uC790\uB9AC, \uD558\uC774\uD508 \uC81C\uC678"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "0000000000"
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "\uB2F4\uB2F9\uC790 \uC774\uB984",
    htmlFor: "name",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "\uAE40\uB2F4\uB2F9"
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "\uC9C1\uCC45 / \uBD80\uC11C",
    htmlFor: "dept"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "\uD658\uACBD\uC548\uC804\uD300"
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "\uC5F0\uB77D\uCC98",
    htmlFor: "phone",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "052-000-0000"
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "\uC774\uBA54\uC77C",
    htmlFor: "email",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    type: "email",
    placeholder: "name@company.com"
  }))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      fontWeight: 600,
      color: "var(--text-tertiary)"
    }
  }, "\uCE21\uC815 \uC815\uBCF4"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "\uCE21\uC815 \uC720\uD615",
    htmlFor: "type",
    required: true
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "\uC120\uD0DD",
    options: [{
      value: "regular",
      label: "정기측정 (분기·연간)"
    }, {
      value: "self",
      label: "자가측정 대행"
    }, {
      value: "special",
      label: "특별 측정 (사전점검)"
    }, {
      value: "odor",
      label: "악취 측정"
    }]
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "\uD76C\uB9DD \uCE21\uC815\uC77C",
    htmlFor: "date",
    helper: "\uC815\uD655\uD55C \uC77C\uC815\uC740 \uB2F4\uB2F9\uC790\uC640 \uD611\uC758"
  }, /*#__PURE__*/React.createElement(Input, {
    type: "date",
    defaultValue: "2025-10-24"
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "\uCE21\uC815 \uC2DC\uC124 (\uB3C4\uC2DC)",
    htmlFor: "city"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "\uC608) \uC6B8\uC0B0\uAD11\uC5ED\uC2DC \uB0A8\uAD6C"
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "\uBC30\uCD9C\uAD6C \xB7 \uC2DC\uC124 \uC218",
    htmlFor: "count",
    helper: "\uD655\uC815\uB418\uC9C0 \uC54A\uC558\uC5B4\uB3C4 \uB300\uB7B5\uC801 \uC218\uB7C9"
  }, /*#__PURE__*/React.createElement(Input, {
    addonRight: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11
      }
    }, "\uAC1C\uC18C"),
    defaultValue: "3"
  }))), /*#__PURE__*/React.createElement(FormField, {
    label: "\uCE21\uC815 \uD56D\uBAA9",
    htmlFor: "items",
    required: true,
    helper: "\uC544\uB798\uC5D0\uC11C \uD544\uC694\uD55C \uD56D\uBAA9\uC744 \uBAA8\uB450 \uC120\uD0DD"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 8,
      padding: 4
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    defaultChecked: true
  }, "\uBA3C\uC9C0 (TSP)"), /*#__PURE__*/React.createElement(Checkbox, {
    defaultChecked: true
  }, "\uC9C8\uC18C\uC0B0\uD654\uBB3C (NOx)"), /*#__PURE__*/React.createElement(Checkbox, {
    defaultChecked: true
  }, "\uD669\uC0B0\uD654\uBB3C (SOx)"), /*#__PURE__*/React.createElement(Checkbox, null, "\uC77C\uC0B0\uD654\uD0C4\uC18C (CO)"), /*#__PURE__*/React.createElement(Checkbox, null, "\uD718\uBC1C\uC131\uC720\uAE30\uD654\uD569\uBB3C (VOCs)"), /*#__PURE__*/React.createElement(Checkbox, null, "\uD2B9\uC815\uB300\uAE30\uC720\uD574\uBB3C\uC9C8"), /*#__PURE__*/React.createElement(Checkbox, null, "\uBCF5\uD569\uC545\uCDE8"), /*#__PURE__*/React.createElement(Checkbox, null, "\uC9C0\uC815\uC545\uCDE8\uBB3C\uC9C8 22\uC885"), /*#__PURE__*/React.createElement(Checkbox, null, "\uAE30\uD0C0 (\uBCF8\uBB38\uC5D0 \uAE30\uC7AC)"))), /*#__PURE__*/React.createElement(FormField, {
    label: "\uC0C1\uC138 \uC694\uCCAD \uC0AC\uD56D",
    htmlFor: "note",
    helper: "\uC2DC\uC124 \uD2B9\uC131, \uC774\uC804 \uCE21\uC815 \uC774\uB825, \uADDC\uC81C \uC774\uC288 \uB4F1 \uC790\uC720\uB86D\uAC8C \uAE30\uC7AC"
  }, /*#__PURE__*/React.createElement("textarea", {
    id: "note",
    rows: 5,
    placeholder: "\uC608) \uBC30\uCD9C\uAD6C A-3\uC5D0\uC11C \uC9C0\uB09C \uBD84\uAE30 NOx\uAC00 90%\uB97C \uB118\uC5B4 \uC0C1\uC138 \uC9C4\uB2E8\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.",
    style: {
      width: "100%",
      boxSizing: "border-box",
      padding: 12,
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      color: "var(--text-primary)",
      resize: "vertical",
      outline: "none"
    }
  })), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Checkbox, {
    defaultChecked: true
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-secondary)"
    }
  }, "\uAC1C\uC778\uC815\uBCF4 \uC218\uC9D1\xB7\uC774\uC6A9\uC5D0 \uB3D9\uC758\uD569\uB2C8\uB2E4. \uC811\uC218 \uD655\uC778, \uACAC\uC801 \uD68C\uC2E0, \uC77C\uC815 \uC870\uC728 \uBAA9\uC801\uC73C\uB85C\uB9CC \uC0AC\uC6A9\uB429\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 12,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => onNavigate("home"),
    type: "button"
  }, "\uCDE8\uC18C"), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    iconRight: /*#__PURE__*/React.createElement(IconArrowRight, {
      size: 16
    })
  }, "\uC694\uCCAD \uC81C\uCD9C")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      position: "sticky",
      top: 96
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "md"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      fontWeight: 600,
      color: "var(--text-tertiary)",
      marginBottom: 12
    }
  }, "\uC9C4\uD589 \uACFC\uC815"), [{
    n: "01",
    title: "요청 접수",
    desc: "이메일 · 전화로 접수 확인"
  }, {
    n: "02",
    title: "견적 · 일정 회신",
    desc: "1영업일 이내"
  }, {
    n: "03",
    title: "현장 측정",
    desc: "표준 방법 · 이중 시료"
  }, {
    n: "04",
    title: "분석 · 판정",
    desc: "3~7영업일"
  }, {
    n: "05",
    title: "보고서 발행",
    desc: "PDF · 원본 첨부"
  }].map(s => /*#__PURE__*/React.createElement("div", {
    key: s.n,
    style: {
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: 12,
      padding: "10px 0",
      borderBottom: "1px dashed var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      fontWeight: 700,
      color: "var(--teal-600)",
      paddingTop: 2
    }
  }, s.n), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, s.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-tertiary)",
      marginTop: 2
    }
  }, s.desc))))), /*#__PURE__*/React.createElement(Card, {
    variant: "brand",
    padding: "md"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      fontWeight: 600,
      opacity: 0.85,
      marginBottom: 6
    }
  }, "\uAE09\uD55C \uAC74\uC740 \uC804\uD654\uAC00 \uBE60\uB985\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 24,
      fontWeight: 700,
      letterSpacing: "-0.02em"
    }
  }, "052-000-0000"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      opacity: 0.85,
      marginTop: 2
    }
  }, "\uD3C9\uC77C 09:00 \u2013 18:00 \xB7 \uC6B8\uC0B0 \uBCF8\uC0AC")))));
}
Object.assign(window, {
  RequestPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/pages/Request.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/pages/Services.jsx
try { (() => {
// ServicesPage — detailed catalog of measurement services.

const {
  Button,
  Card,
  Badge,
  Breadcrumb
} = window.BoasEnvironmentalDesignSystem_8f288d;
const SERVICES = [{
  icon: IconWind,
  title: "대기측정 대행",
  subtitle: "Ambient · Emission",
  desc: "배출구 배출가스, 대기환경 측정을 국제공인 시험 방법으로 수행합니다. 정기측정, 자가측정, 특별점검 모두 대응 가능합니다.",
  items: [{
    label: "먼지 (TSP · PM10 · PM2.5)",
    meta: "중량법 · 광산란법"
  }, {
    label: "질소산화물 (NOx)",
    meta: "화학발광법 · UV형광법"
  }, {
    label: "황산화물 (SOx)",
    meta: "습식·건식 흡수법"
  }, {
    label: "일산화탄소 · 이산화탄소",
    meta: "NDIR"
  }, {
    label: "휘발성유기화합물 (VOCs)",
    meta: "GC-FID · GC-MS"
  }, {
    label: "특정대기유해물질",
    meta: "환경부 고시 방법"
  }],
  turnaround: "표준 5영업일",
  price: "항목당 견적"
}, {
  icon: IconFlask,
  title: "시료 분석",
  subtitle: "Laboratory Analysis",
  desc: "자체 KOLAS 인정 실험실에서 정밀 분석을 수행합니다. 시료 채취부터 판정까지 이관 없이 관리합니다.",
  items: [{
    label: "기기분석 (GC · GC-MS · ICP)",
    meta: "정량 하한 확인"
  }, {
    label: "습식 분석 · 중량법",
    meta: "표준 · 반복 시험"
  }, {
    label: "판정 리포트 · 원본 데이터 첨부",
    meta: "PDF · Excel"
  }, {
    label: "긴급 분석 (24시간 옵션)",
    meta: "별도 협의"
  }],
  turnaround: "표준 3~7영업일",
  price: "항목당 견적"
}, {
  icon: IconLeaf,
  title: "악취저감 컨설팅",
  subtitle: "Odor Consulting",
  desc: "복합악취 및 지정악취물질을 실측하고, 저감시설의 설계·운영 자문을 제공합니다. 규제 대응까지 지원합니다.",
  items: [{
    label: "복합악취 · 지정악취 22종 실측",
    meta: "공기희석관능법"
  }, {
    label: "저감시설 설계 검토",
    meta: "탈취탑 · 흡착탑 · 스크러버"
  }, {
    label: "규제 대응 자문",
    meta: "지자체 · 환경부"
  }, {
    label: "주민 민원 대응 자료",
    meta: ""
  }],
  turnaround: "프로젝트별 협의",
  price: "프로젝트 견적"
}, {
  icon: IconShield,
  title: "환경업무 대행",
  subtitle: "Environmental Management",
  desc: "환경관리 실무, 자가측정 대행, 인·허가 자료 작성 등 산업체 환경담당자의 업무를 대행합니다.",
  items: [{
    label: "자가측정 대행",
    meta: "월·분기·연간 정기"
  }, {
    label: "환경관리 실무 대행",
    meta: "일지 관리 · 보고"
  }, {
    label: "인·허가 자료 작성",
    meta: "신규 · 변경"
  }, {
    label: "환경교육 · 문진",
    meta: ""
  }],
  turnaround: "월간 · 프로젝트",
  price: "월정액 · 협의"
}];
function ServiceBlock({
  svc,
  index
}) {
  const Icon = svc.icon;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.6fr",
      gap: 40,
      alignItems: "start",
      padding: "40px 0",
      borderTop: index === 0 ? "none" : "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 56,
      height: 56,
      borderRadius: "var(--radius-lg)",
      background: "var(--teal-50)",
      color: "var(--teal-600)",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    size: 28
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      fontWeight: 600,
      color: "var(--teal-600)",
      marginBottom: 6
    }
  }, svc.subtitle), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 26,
      fontWeight: 700,
      letterSpacing: "-0.02em"
    }
  }, svc.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 20px",
      fontSize: 14,
      color: "var(--text-secondary)",
      lineHeight: 1.65
    }
  }, svc.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: "10px 16px",
      fontSize: 13,
      marginTop: 20,
      padding: "16px 0",
      borderTop: "1px dashed var(--border-subtle)",
      borderBottom: "1px dashed var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)",
      fontWeight: 500
    }
  }, "\uC18C\uC694\uAE30\uAC04"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums"
    }
  }, svc.turnaround), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-tertiary)",
      fontWeight: 500
    }
  }, "\uBE44\uC6A9"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, svc.price))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      fontWeight: 600,
      color: "var(--text-tertiary)",
      marginBottom: 14
    }
  }, "\uC138\uBD80 \uD56D\uBAA9"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 0
    }
  }, svc.items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      padding: "14px 16px",
      borderBottom: "1px solid var(--border-subtle)",
      borderRight: i % 2 === 0 ? "1px solid var(--border-subtle)" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 14,
    style: {
      color: "var(--teal-500)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, it.label)), it.meta ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-tertiary)",
      marginLeft: 22,
      fontFamily: "var(--font-mono)"
    }
  }, it.meta) : null)))));
}
function ServicesPage({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-wide)",
      margin: "0 auto",
      padding: "40px 32px 80px"
    }
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    separator: "\u203A",
    items: [{
      label: "홈",
      href: "#/"
    }, {
      label: "서비스"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      marginBottom: 32,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      fontWeight: 600,
      color: "var(--teal-600)",
      marginBottom: 12
    }
  }, "SERVICES \xB7 \uC11C\uBE44\uC2A4"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 44,
      fontWeight: 800,
      letterSpacing: "-0.03em",
      lineHeight: 1.1
    }
  }, "\uB300\uAE30\uCE21\uC815\uC5D0\uC11C \uCEE8\uC124\uD305\uAE4C\uC9C0,", /*#__PURE__*/React.createElement("br", null), "\uC804 \uACFC\uC815 \uC11C\uBE44\uC2A4."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "16px 0 0",
      fontSize: 16,
      color: "var(--text-secondary)",
      lineHeight: 1.65,
      maxWidth: 640
    }
  }, "\uC0B0\uC5C5\uCCB4 \uB2F4\uB2F9\uC790\uAC00 \uD558\uB098\uC758 \uD30C\uD2B8\uB108\uC5D0\uAC8C \uB9E1\uAE38 \uC218 \uC788\uB3C4\uB85D, \uC2DC\uB8CC \uCC44\uCDE8 \xB7 \uC2E4\uD5D8\uC2E4 \uBD84\uC11D \xB7 \uD310\uC815 \xB7 \uAC1C\uC120 \uC790\uBB38\uAE4C\uC9C0 \uC0AC\uB0B4\uC5D0\uC11C \uCC98\uB9AC\uD569\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => onNavigate("request"),
    iconRight: /*#__PURE__*/React.createElement(IconArrowRight, {
      size: 16
    })
  }, "\uCE21\uC815 \uC694\uCCAD")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, SERVICES.map((svc, i) => /*#__PURE__*/React.createElement(ServiceBlock, {
    key: svc.title,
    svc: svc,
    index: i
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      padding: "24px 28px",
      borderRadius: "var(--radius-xl)",
      background: "var(--surface-sunken)",
      border: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      gap: 24,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 44,
      height: 44,
      borderRadius: 999,
      background: "var(--gray-0)",
      color: "var(--teal-600)",
      border: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(IconClipboard, {
    size: 22
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: "-0.01em"
    }
  }, "\uBAA8\uB4E0 \uCE21\uC815\uC5D0 \uD45C\uC900 \uC2DC\uD5D8\uBC29\uBC95\uC744 \uC801\uC6A9\uD569\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-secondary)",
      marginTop: 4,
      lineHeight: 1.5
    }
  }, "\uB300\uAE30\uC624\uC5FC\uACF5\uC815\uC2DC\uD5D8\uAE30\uC900 \xB7 KOLAS \uC778\uC815 \uBC29\uBC95 \xB7 \uD658\uACBD\uBD80 \uACE0\uC2DC \uBC29\uBC95\uC744 \uC900\uC218\uD558\uBA70, \uC6D0\uBCF8 \uB370\uC774\uD130\uB97C 5\uB144\uAC04 \uBCF4\uAD00\uD569\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => onNavigate("about")
  }, "\uC778\uC815 \xB7 \uC790\uACA9 \uC790\uC138\uD788"))));
}
Object.assign(window, {
  ServicesPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/pages/Services.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Readout = __ds_scope.Readout;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.FormField = __ds_scope.FormField;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
