import { Card } from "react-bootstrap";

export default function StatusCard({
  title,
  value,
  bg = "primary",
  icon = "📊",
}) {
  return (
    <Card bg={bg} text="white" className="shadow-sm">
      <Card.Body className="text-center">
        <Card.Title className="fs-5">
          {icon} {title}
        </Card.Title>
        <Card.Text className="display-6 fw-bold">{value}</Card.Text>
      </Card.Body>
    </Card>
  );
}
