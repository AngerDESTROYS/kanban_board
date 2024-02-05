import { useSelector } from "react-redux";
import { Issue, RootState } from "../redux/reducers";
import RepoInput from "./RepoInput";
import IssueCard from "./issueCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import {
  setIssues,
  setIssuesDone,
  setIssuesInProgress,
  setIssuesToDo,
} from "../redux/actions";

const KanbanBoard: React.FC = () => {
  const issuesToDo = useSelector((state: RootState) => state.issuesToDo);
  const dispatch = useDispatch();
  const issues = useSelector((state: RootState) => state.issues);
  const issuesInProgress = useSelector(
    (state: RootState) => state.issuesInProgress
  );
  const issuesDone = useSelector((state: RootState) => state.issuesDone);

  const handleDragDrop = (results: any) => {
    const { source, destination } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const map: Record<string, Issue[]> = {
      REPO_INPUT1: issues,
      REPO_INPUT2: issues,
      REPO_INPUT3: issues,
      TO_DO_COLUMN: issuesToDo,
      IN_PROGRESS_COLUMN: issuesInProgress,
      DONE_COLUMN: issuesDone,
    };

    const map2: Record<string, (issues: Issue[]) => any> = {
      REPO_INPUT1: setIssues,
      REPO_INPUT2: setIssues,
      REPO_INPUT3: setIssues,
      TO_DO_COLUMN: setIssuesToDo,
      IN_PROGRESS_COLUMN: setIssuesInProgress,
      DONE_COLUMN: setIssuesDone,
    };

    const start = map[source.droppableId];
    const finish = map[destination.droppableId];
    const reorderedIssues = [...start];
    const destinationIssues = [...finish];
    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    if (start === finish) {
      const [removedIssue] = reorderedIssues.splice(sourceIndex, 1);
      reorderedIssues.splice(destinationIndex, 0, removedIssue);

      const fstaction = map2[source.droppableId];
      dispatch(fstaction(reorderedIssues));
    }
    if (start !== finish) {
      const [removedIssue] = reorderedIssues.splice(sourceIndex, 1);
      destinationIssues.splice(destinationIndex, 0, removedIssue);
      const fstaction = map2[source.droppableId];
      const scndaction = map2[destination.droppableId];

      dispatch(fstaction(reorderedIssues));
      dispatch(scndaction(destinationIssues));
    }
  };

  const renderDroppableColumn = (columnId: string, issues: Issue[], title: string) => (
    <Droppable droppableId={columnId} type="issue">
      {(provided) => (
        <div
          style={{
            minHeight: "50vh",
            border: "1px solid #007bff",
            width: "500px",
            borderRadius: '15px'
          }}
        >
          <div className="card-header">
            <h4>{title}</h4>
          </div>
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ padding: "0 50px" }}
          >
            {issues.map((issue: Issue, index: number) => (
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
        </div>
      )}
    </Droppable>
  );

  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <RepoInput />
      <div className="d-flex justify-content-around">
        {renderDroppableColumn("TO_DO_COLUMN", issuesToDo, "ToDo")}
        {renderDroppableColumn(
          "IN_PROGRESS_COLUMN",
          issuesInProgress,
          "In Progress"
        )}
        {renderDroppableColumn("DONE_COLUMN", issuesDone, "Done")}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
