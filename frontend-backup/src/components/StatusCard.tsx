interface StatusCardProps {
  title: string;
  value: number | string;
  icon: string;
}

function StatusCard({
  title,
  value,
  icon,
}: StatusCardProps) {
  return (
    <div className="status-card">
      <div className="status-icon">
        {icon}
      </div>

      <div>
        <p>{title}</p>

        <h2>{value}</h2>
      </div>
    </div>
  );
}

export default StatusCard;