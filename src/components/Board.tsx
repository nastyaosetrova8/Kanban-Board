import { useEffect, useMemo, useState } from "react";
import { Column, Issue } from "../helpers/models";

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
    title: "In progress",
  },
  {
    id: "closed",
    title: "Done",
  },
];

const Board = ({ issues: initialIssues, repoInfo }) => {
  //   const dispatch = useDispatch();
  //   const issuesFromRedux = issues;
  //   const issues = useSelector(selectIssues);
  //   const setIssues: [Issue[], React.Dispatch<React.SetStateAction<Issue[]>>];
  //   const setIssues = useState<Issue[]>(issues);
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  console.log("defaultCols", columns);
  console.log("initialIssues", issues);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
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
      // Object.keys(localStorage).forEach((key) => {
      //   if (repoInfo.html_url === key) {
      // const storedIssues = localStorage.getItem(key);
      const storedIssues = localStorage.getItem(repoInfo.html_url);

      if (storedIssues) {
        const parsedIssues = JSON.parse(storedIssues);

        const newIssues = initialIssues.filter((issue) => {
          return !parsedIssues.some(
            (parsedIssue) => parsedIssue.id === issue.id
          );
        });

        const updatedIssues = [...parsedIssues, ...newIssues];
        setIssues(updatedIssues);

        // setIssues(parsedIssues);
        // }
        // console.log(`Ключ: ${key}, Значення: ${storedIssues}`);
      } else {
        setIssues(initialIssues);
      }
      // });
    }

    // });
    // console.log("heeey", initialIssues);
    // // -----------------------------
    // const storedIssues =
    //   // repoInfo && repoInfo.html_url ?
    //   localStorage.getItem("repoInfo.html_url");
    // // : null;
    // if (storedIssues) {
    //   // dispatch(
    //   //   getIssuesThunk(JSON.parse(localStorage.getItem(repoInfo.html_url)))
    //   // );
    //   setColumns(JSON.parse(storedIssues));
    // } else {
    //   setIssues(initialIssues);
    // }

    // const storedIssues = localStorage.getItem(repoInfo.html_url);
    // if (storedIssues) {
    //   setIssues(JSON.parse(storedIssues));
    // } else {
    //   setIssues(initialIssues);
    // }

    // localStorage.setItem(repoInfo.html_url, JSON.stringify(issues));
    // ------------------------------------
  }, [initialIssues, repoInfo]);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

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

        console.log(activeIndex);

        //   -------------------------------
        const updatedIssues = [...prevIssues];
        //   --------------------------------

        // if (issues[activeIndex].state !== issues[overIndex].state) {
        //   -------------------------------
        if (
          updatedIssues[activeIndex].state !== updatedIssues[overIndex].state
        ) {
          //   --------------------------------

          // Fix introduced after video recording

          //   issues[activeIndex].state = issues[overIndex].state;
          // -------------------------
          updatedIssues[activeIndex] = {
            ...updatedIssues[activeIndex],
            state: updatedIssues[overIndex].state,
          };

          // --------------------------
          //   return arrayMove(issues, activeIndex, overIndex - 1);
          // -----------

          return arrayMove(updatedIssues, activeIndex, overIndex - 1);
          // -----------
        }
        // console.log("DROPPING ISSUE OVER ISSUE", { activeIndex });
        console.log("DROPPING ISSUE OVER ISSUE", arrayMove);

        const newArray = arrayMove(updatedIssues, activeIndex, overIndex);
        // return arrayMove(updatedIssues, activeIndex, overIndex);
        console.log(newArray);
        localStorage.setItem(repoInfo.html_url, JSON.stringify(newArray));
        return newArray;
      });

      console.log("222222222DROPPING ISSUE OVER ISSUE", arrayMove);
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Dropping a Issue over a column
    if (isActiveAIssue && isOverAColumn) {
      setIssues((prevIssues) => {
        const activeIndex = prevIssues.findIndex((i) => i.id === activeId);

        // issues[activeIndex].state = overId;
        //   ------------------
        const updatedIssues = [...prevIssues];
        updatedIssues[activeIndex] = {
          ...updatedIssues[activeIndex],
          state: overId,
        };
        //   -------------------
        console.log("DROPPING ISSUE OVER COLUMN", { activeIndex });

        // return arrayMove(issues, activeIndex, activeIndex);
        console.log(updatedIssues);
        localStorage.setItem(repoInfo.html_url, JSON.stringify(updatedIssues));

        return updatedIssues;
      });
    }
  };

  // if (repoInfo && repoInfo.html_url) {
  // localStorage.setItem(repoInfo.html_url, JSON.stringify(issues));
  // }

  return (
    <div>
      {/* {issues && ( */}
      {/* <Container maxWidth="100ww" px={3} py={16} display="flex" gap="6px"> */}
      {/* <DndProvider backend={HTML5Backend}> */}
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        // onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <Container maxWidth="100ww" px={3} py={16} display="flex" gap="6px">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <ListIssue
                key={col.id}
                column={col}
                //   deleteColumn={deleteColumn}
                //   updateColumn={updateColumn}
                //   createTask={createTask}
                //   deleteTask={deleteTask}
                //   updateTask={updateTask}
                issues={issues.filter((issue) => issue.state === col.id)}
              />
            ))}
          </SortableContext>
        </Container>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ListIssue
                column={activeColumn}
                // deleteColumn={deleteColumn}
                // updateColumn={updateColumn}
                // createTask={createTask}
                // deleteTask={deleteTask}
                // updateTask={updateTask}
                issues={issues.filter(
                  (issue) => issue.state === activeColumn.id
                )}
              />
            )}
            {activeIssue && (
              <IssueCard
                issue={activeIssue}
                // deleteTask={deleteTask}
                // updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
        {/* <SimpleGrid columns={{ base: 3 }} spacing={{ base: 6 }}>
              <ListIssue
                listIssue={ListIssueType.OPEN}
                issues={issues.filter((issue) => issue.status === "open") || []}
              />
              <ListIssue
                listIssue={ListIssueType.IN_PROGRESS}
                // issues={issues || []}
              />
              <ListIssue
                listIssue={ListIssueType.CLOSED}
                issues={
                  issues.filter((issue) => issue.status === "closed") || []
                }
              />
            </SimpleGrid> */}
        {/* </DndProvider> */}
        {/* </Container> */}
      </DndContext>
      {/* </Container> */}
      {/* )} */}
    </div>
  );
};

export default Board;

// -----------------------------------

// import { useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { selectIssues } from "../redux/Issues/selectors";
// import { Column, Issue } from "../helpers/models";

// import {
//   DndContext,
//   DragStartEvent,
//   DragEndEvent,
//   DragOverEvent,
//   DragOverlay,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import { SortableContext, arrayMove } from "@dnd-kit/sortable";
// import { Container } from "@chakra-ui/react";
// import ListIssue from "./ListIssue";
// import { createPortal } from "react-dom";
// import IssueCard from "./IssueCard";

// const defaultCols: Column[] = [
//   {
//     id: "open",
//     title: "ToDo",
//   },
//   {
//     id: "in progress",
//     title: "In progress",
//   },
//   {
//     id: "closed",
//     title: "Done",
//   },
// ];

// const Board = ({ issues }) => {
//   //   const dispatch = useDispatch();
//   const issuesFromRedux = issues;

//   //   const issues = useSelector(selectIssues);
//   //   const setIssues: [Issue[], React.Dispatch<React.SetStateAction<Issue[]>>];
//   //   const setIssues = useState<Issue[]>(issues);
//   const [issuesDefault, setIssuesDefault] = useState<Issue[]>(issuesFromRedux);
//   console.log(issuesState);
//   const [columns, setColumns] = useState<Column[]>(defaultCols);
//   console.log(columns);

//   const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

//   const [activeColumn, setActiveColumn] = useState<Column | null>(null);
//   const [activeIssue, setActiveIssue] = useState<Issue | null>(null);

//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 10,
//       },
//     })
//   );

//   const onDragStart = (event: DragStartEvent) => {
//     if (event.active.data.current?.type === "Column") {
//       setActiveColumn(event.active.data.current.column);
//       return;
//     }

//     if (event.active.data.current?.type === "Issue") {
//       setActiveIssue(event.active.data.current.issue);
//       return;
//     }
//   };

//   const onDragEnd = (event: DragEndEvent) => {
//     setActiveColumn(null);
//     setActiveIssue(null);

//     const { active, over } = event;
//     if (!over) return;

//     const activeId = active.id;
//     const overId = over.id;

//     if (activeId === overId) return;

//     const isActiveAColumn = active.data.current?.type === "Column";
//     if (!isActiveAColumn) return;

//     // console.log("DRAG END");

//     // setColumns((columns) => {
//     //   const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

//     //   const overColumnIndex = columns.findIndex((col) => col.id === overId);

//     //   return arrayMove(columns, activeColumnIndex, overColumnIndex);
//     // });
//     setColumns((columns) => {
//       const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

//       const overColumnIndex = columns.findIndex((col) => col.id === overId);

//       return arrayMove(columns, activeColumnIndex, overColumnIndex);
//     });
//   };

//   const onDragOver = (event: DragOverEvent) => {
//     const { active, over } = event;
//     if (!over) return;

//     const activeId = active.id;
//     const overId = over.id;

//     if (activeId === overId) return;

//     const isActiveAIssue = active.data.current?.type === "Issue";
//     const isOverAIssue = over.data.current?.type === "Issue";

//     if (!isActiveAIssue) return;

//     // Im dropping a Task over another Task
//     if (isActiveAIssue && isOverAIssue) {
//       setIssues((issues) => {
//         const activeIndex = issues.findIndex((i) => i.id === activeId);
//         const overIndex = issues.findIndex((i) => i.id === overId);

//         if (issues[activeIndex].state != issues[overIndex].state) {
//           // Fix introduced after video recording
//           issues[activeIndex].state = issues[overIndex].state;
//           return arrayMove(issues, activeIndex, overIndex - 1);
//         }

//         return arrayMove(issues, activeIndex, overIndex);
//       });
//     }

//     const isOverAColumn = over.data.current?.type === "Column";

//     // Im dropping a Task over a column
//     if (isActiveAIssue && isOverAColumn) {
//       setIssues((issues) => {
//         const activeIndex = issues.findIndex((i) => i.id === activeId);

//         issues[activeIndex].state = overId;
//         // ----------
//         console.log("DROPPING TASK OVER COLUMN", { activeIndex });
//         //-------------
//         return arrayMove(issues, activeIndex, activeIndex);
//       });
//     }
//   };

//   return (
//     <div>
//       {/* {issues && ( */}
//       {/* <Container maxWidth="100ww" px={3} py={16} display="flex" gap="6px"> */}
//       {/* <DndProvider backend={HTML5Backend}> */}
//       <DndContext
//         sensors={sensors}
//         onDragStart={onDragStart}
//         onDragEnd={onDragEnd}
//         onDragOver={onDragOver}
//       >
//         <Container maxWidth="100ww" px={3} py={16} display="flex" gap="6px">
//           <SortableContext items={columnsId}>
//             {columns.map((col) => (
//               <ListIssue
//                 key={col.id}
//                 column={col}
//                 //   deleteColumn={deleteColumn}
//                 //   updateColumn={updateColumn}
//                 //   createTask={createTask}
//                 //   deleteTask={deleteTask}
//                 //   updateTask={updateTask}
//                 issues={issues.filter((issue) => issue.state === col.id)}
//               />
//             ))}
//           </SortableContext>
//         </Container>

//         {createPortal(
//           <DragOverlay>
//             {activeColumn && (
//               <ListIssue
//                 column={activeColumn}
//                 // deleteColumn={deleteColumn}
//                 // updateColumn={updateColumn}
//                 // createTask={createTask}
//                 // deleteTask={deleteTask}
//                 // updateTask={updateTask}
//                 issues={issues.filter(
//                   (issue) => issue.state === activeColumn.id
//                 )}
//               />
//             )}
//             {activeIssue && (
//               <IssueCard
//                 issue={activeIssue}
//                 // deleteTask={deleteTask}
//                 // updateTask={updateTask}
//               />
//             )}
//           </DragOverlay>,
//           document.body
//         )}
//         {/* <SimpleGrid columns={{ base: 3 }} spacing={{ base: 6 }}>
//               <ListIssue
//                 listIssue={ListIssueType.OPEN}
//                 issues={issues.filter((issue) => issue.status === "open") || []}
//               />
//               <ListIssue
//                 listIssue={ListIssueType.IN_PROGRESS}
//                 // issues={issues || []}
//               />
//               <ListIssue
//                 listIssue={ListIssueType.CLOSED}
//                 issues={
//                   issues.filter((issue) => issue.status === "closed") || []
//                 }
//               />
//             </SimpleGrid> */}
//         {/* </DndProvider> */}
//         {/* </Container> */}
//       </DndContext>
//       {/* </Container> */}
//       {/* )} */}
//     </div>
//   );
// };

// export default Board;
