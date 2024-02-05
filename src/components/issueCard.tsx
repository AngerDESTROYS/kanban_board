import React from "react";
import { Card } from "react-bootstrap";
import moment from "moment";
import { Issue } from "../redux/reducers";


const IssueCard: React.FC<{ issue: Issue }> = ({ issue }) => {
  const cardStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    width: "400px",
    height: "190px",
    margin: "10px 10px 10px 0",
  };

  const thirdLine: React.CSSProperties = {
    position: 'absolute',
    top: '150px',
    gap: "20px",
  };

  const secondLine: React.CSSProperties = {
    bottom: '40px',
    position: 'absolute',
    gap: "40px",
  };

  const openedDaysAgo = moment(issue.created_at).fromNow();

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title>{issue.title}</Card.Title>
        <div className="d-flex" style={secondLine}>
          <p># {issue.number}</p>
          <p>Opened {openedDaysAgo}</p>
        </div>
        <div className="d-flex" style={thirdLine}>
          <p>Opened by: {issue.user ? issue.user.login : "Unknown User"}</p>

          <p>Comments: {issue.comments}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default IssueCard;
