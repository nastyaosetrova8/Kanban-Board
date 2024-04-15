import { useEffect, useMemo, useState } from "react";
import { Column, Issue, Props } from "../helpers/models";
import {
  DndContext,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Container } from "@chakra-ui/react";
import ListIssue from "./ListIssue";
import { createPortal } from "react-dom";
import IssueCard from "./IssueCard";

const defaultCols: Column[] = [
  {
    id: "open",
    title: "ToDo",
  },
  {
    id: "in progress",
    title: "In Progress",
  },
  {
    id: "closed",
    title: "Done",
  },
];

const Board = ({ issues: initialIssues, repoInfo }: Props) => {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [columns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeIssue, setActiveIssue] = useState<Issue | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  useEffect(() => {
    if (repoInfo) {
      const storedIssues = localStorage.getItem(repoInfo.html_url);
      if (storedIssues) {
        const parsedIssues = JSON.parse(storedIssues);
        const newIssues = initialIssues.filter((issue) => {
          return !parsedIssues.some(
            (parsedIssue: Issue) => parsedIssue.id === issue.id
          );
        });
        const updatedIssues = [...parsedIssues, ...newIssues];
        setIssues(updatedIssues);
      } else {
        setIssues(initialIssues);
      }
    }
  }, [initialIssues, repoInfo]);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Issue") {
      setActiveIssue(event.active.data.current.issue);
      return;
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAIssue = active.data.current?.type === "Issue";
    const isOverAIssue = over.data.current?.type === "Issue";

    if (!isActiveAIssue) return;

    // Dropping a Issue over another Issue
    if (isActiveAIssue && isOverAIssue) {
      setIssues((prevIssues) => {
        const activeIndex = prevIssues.findIndex((i) => i.id === activeId);
        const overIndex = prevIssues.findIndex((i) => i.id === overId);
        const updatedIssues = [...prevIssues];

        if (
          updatedIssues[activeIndex].state !== updatedIssues[overIndex].state
        ) {
          updatedIssues[activeIndex] = {
            ...updatedIssues[activeIndex],
            state: updatedIssues[overIndex].state,
          };
          return arrayMove(updatedIssues, activeIndex, overIndex - 1);
        }
        const newArray = arrayMove(updatedIssues, activeIndex, overIndex);

        localStorage.setItem(repoInfo.html_url, JSON.stringify(newArray));
        return newArray;
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Dropping a Issue over a column
    if (isActiveAIssue && isOverAColumn) {
      setIssues((prevIssues) => {
        const activeIndex = prevIssues.findIndex((i) => i.id === activeId);
        const updatedIssues = [...prevIssues];
        updatedIssues[activeIndex] = {
          ...updatedIssues[activeIndex],
          state: overId,
        };

        localStorage.setItem(repoInfo.html_url, JSON.stringify(updatedIssues));
        return updatedIssues;
      });
    }
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
      >
        <Container
          display="flex"
          justifyContent="center"
          maxW="100%"
          m="0"
          mt="24px"
          p="0"
          gap="18px"
        >
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <ListIssue
                key={col.id}
                column={col}
                issues={issues.filter((issue) => issue.state === col.id)}
              />
            ))}
          </SortableContext>
        </Container>

        {createPortal(
          <DragOverlay>
            {activeIssue && <IssueCard issue={activeIssue} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </>
  );
};

export default Board;
