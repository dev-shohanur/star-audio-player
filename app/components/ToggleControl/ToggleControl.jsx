import "./toggleControlStyle.css";

export function ToggleControl({
  value = true,
  onChange = () => {},
  label,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <label>{label}</label>
      </div>
      <div>
        <label className="switch">
          <input
            style={{ display: "none" }}
            type="checkbox"
            onClick={() => onChange(!value)}
            checked={value}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}

