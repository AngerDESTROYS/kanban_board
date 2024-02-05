import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import IssueCard from "./issueCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { setIssues, setRepo } from "../redux/actions";

const RepoInput = () => {
  const dispatch = useDispatch();
  const [repoUrl, setRepoUrl] = useState("");
  const issues = useSelector((state: RootState) => state.issues);
  const repoData = useSelector((state: RootState) => state.repoData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(e.target.value.trim());
  };

  const handleLoadClick = async () => {
    try {
      const repoName = repoUrl.replace("https://github.com/", "").trim();

      const repoResponse = await fetch(
        `https://api.github.com/repos/${repoName}`
      );

      const repoData = await repoResponse.json();
      if (!repoResponse.ok) {
        console.error("Error fetching repository details:", repoData.message);
        return;
      }

      const issuesResponse = await fetch(
        `https://api.github.com/repos/${repoName}/issues`
      );
      const issuesData = await issuesResponse.json();

      if (!issuesResponse.ok) {
        console.error("Error fetching issues:", issuesData.message);
        return;
      }
      console.log("Repository details:", repoData);
      console.log("Issues:", issuesData);

      dispatch(setIssues(issuesData));
      dispatch(setRepo(repoData));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formatNumberToKs = (number: number) => {
    if (number >= 1000) {
      return `${(number / 1000).toFixed(1)} K stars`;
    }
    return number.toString();
  };

  const buttonStyle = {
    marginLeft: "40px",
    width: "100px",
  };

  return (
    <div className="container-fluid mt-3" style={{ width: "1250px"}}>
      <div className="input-group">
        <input
          type="text"
          value={repoUrl}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Enter GitHub repo URL"
        />
        <div className="input-group-append">
          <button
            onClick={handleLoadClick}
            className="btn btn-primary"
            style={buttonStyle}
          >
            Load
          </button>
        </div>
      </div>

      {repoData !== null && (
        <div className="d-flex mt-2">
          <a
            href={repoData.owner.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-info mr-2"
          >
            View Owner's Profile: {repoData.owner.login}
          </a>

          <a
            href={repoData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success"
          >
            View Repository: {repoData.name}
          </a>

          <span
            className="badge badge-warning align-self-center d-flex"
            style={{ fontSize: "1.6rem", marginLeft: "8px" }}
          >
            <i className="bi bi-star-fill"></i>
            <span className="ml-1">
              {formatNumberToKs(repoData.stargazers_count)}
            </span>
          </span>
        </div>
      )}

      <div className="d-flex mt-2">
        <p className="mr-2">Example</p>
        <p>https://github.com/facebook/react</p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "1300px",
          marginBottom: '30px',
        }}
      >
        <Droppable droppableId="REPO_INPUT1" type="issue">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {issues.slice(0, 10).map((issue, index) => (
                <Draggable
                  draggableId={issue.id.toString()}
                  key={issue.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <IssueCard key={issue.id} issue={issue} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="REPO_INPUT2" type="issue">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {issues.slice(10, 20).map((issue, index) => (
                <Draggable
                  draggableId={issue.id.toString()}
                  key={issue.id}
                  index={index += 10}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <IssueCard key={issue.id} issue={issue} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="REPO_INPUT3" type="issue">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {issues.slice(20, 30).map((issue, index) => (
                <Draggable
                  draggableId={issue.id.toString()}
                  key={issue.id}
                  index={index+=20}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <IssueCard key={issue.id} issue={issue} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default RepoInput;
