import { Box, Heading, Stack } from "@chakra-ui/react";
import IssueCard from "./IssueCard";
import { useMemo } from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Column, Issue } from "../helpers/models";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  column: Column;
  issues: Issue[];
}

const ListIssue = ({
  column,
  issues,
}: //   { listIssue }: { listIssue: ListIssueType }
Props) => {
  //   const { issues, dropIssueFrom, swapIssues } = useListIssues(listIssue);
  //   const { dropIssueFrom, swapIssues } = useListIssues(listIssue);
  //   const { dropRef, isOver } = useListIssueDrop(listIssue, dropIssueFrom);
  //   const issues = useSelector(selectIssues);
  //   const ColumnIssues = issues.map((issue, index) => (
  //     <Issue
  //       key={issue.id}
  //       issue={issue}
  //       index={index}
  //       //   onDropHover={swapIssues}
  //     />
  //   ));
  //   const [editMode, setEditMode] = useState(false);

  const issuesIds = useMemo(() => {
    return issues.map((issue) => issue.id);
  }, [issues]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    // isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    // disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      backgroundColor="green"
      w="350px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      //       className="
      //   bg-columnBackgroundColor
      //   w-[350px]
      //   h-[500px]
      //   max-h-[500px]
      //   rounded-md
      //   flex
      //   flex-col
      //   "
    >
      <Heading
        fontSize="md"
        letterSpacing="wide"
        {...attributes}
        {...listeners}
        bg={"yellow"}
      >
        {/* {listIssue} */}
        {column.title}
      </Heading>

      <SortableContext
        items={issuesIds}
        //   strategy={verticalListSortingStrategy}
      >
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </SortableContext>

      {/* <Stack
        // ref={dropRef}
        direction={{ base: "column" }}
        h={{ base: "80vh" }}
        maxW="100ww"
        p={4}
        mt={6}
        spacing={4}
        bgColor={"gray.300"}
        boxShadow="md"
        overflow="auto"
        border="1px solid black"
        // opacity={isOver ? 0.85 : 1}
      >
        {ColumnIssues}
      </Stack> */}
    </Box>
  );
};

export default ListIssue;

// --------------------------------------------------------

// import { Box, Heading, Stack } from "@chakra-ui/react";
// import { ListIssueType } from "../helpers/enums";
// import Issue from "./Issue";
// // import { IssueModel } from "../helpers/models";
// // import useListIssues from "../hooks/useListIssues";
// import useListIssueDrop from "../hooks/useListIssueDrop";
// import { useSelector } from "react-redux";
// import { selectIssues } from "../redux/Issues/selectors";

// // const ListIssueColorScheme: Record<ListIssueType, string> = {
// //   ToDo: "green",
// //   "In Progress": "blue",
// //   Done: "gray",
// // };

// // const issues: IssueModel[] = [
// //   {
// //     id: "1",
// //     title: "Issue 1",
// //     text: "some issue",
// //     column: ListIssueType.TO_DO,
// //     color: "green",
// //   },
// //   {
// //     id: "1",
// //     title: "Issue 1",
// //     text: "some issue",
// //     column: ListIssueType.TO_DO,
// //     color: "blue",
// //   },
// //   {
// //     id: "1",
// //     title: "Issue 1",
// //     text: "some issue",
// //     column: ListIssueType.TO_DO,
// //     color: "gray",
// //   },
// // ];

// const ListIssue = ({ listIssue }: { listIssue: ListIssueType }) => {
//   //   const { issues, dropIssueFrom, swapIssues } = useListIssues(listIssue);
//   //   const { dropIssueFrom, swapIssues } = useListIssues(listIssue);

//     //   const { dropRef, isOver } = useListIssueDrop(listIssue, dropIssueFrom);

//   const issues = useSelector(selectIssues);

//   const ColumnIssues = issues.map((issue, index) => (
//     <Issue
//       key={issue.id}
//       issue={issue}
//       index={index}
//       //   onDropHover={swapIssues}
//     />
//   ));

//   return (
//     <Box>
//       <Heading fontSize="md" letterSpacing="wide">
//         {listIssue}
//       </Heading>

//       <Stack
//         // ref={dropRef}
//         direction={{ base: "column" }}
//         h={{ base: "80vh" }}
//         maxW="100ww"
//         p={4}
//         mt={6}
//         spacing={4}
//         bgColor={"gray.300"}
//         boxShadow="md"
//         overflow="auto"
//         border="1px solid black"
//         // opacity={isOver ? 0.85 : 1}
//       >
//         {ColumnIssues}
//       </Stack>
//     </Box>
//   );
// };

// export default ListIssue;

// ------------------------------------------------------------------------
// import { Box, Heading, Stack } from "@chakra-ui/react";
// import { ListIssueType } from "../helpers/enums";
// import Issue from "./Issue";
// // import { IssueModel } from "../helpers/models";
// // import useListIssues from "../hooks/useListIssues";
// import useListIssueDrop from "../hooks/useListIssueDrop";
// import { useSelector } from "react-redux";
// import { selectIssues } from "../redux/Issues/selectors";

// // const ListIssueColorScheme: Record<ListIssueType, string> = {
// //   ToDo: "green",
// //   "In Progress": "blue",
// //   Done: "gray",
// // };

// // const issues: IssueModel[] = [
// //   {
// //     id: "1",
// //     title: "Issue 1",
// //     text: "some issue",
// //     column: ListIssueType.TO_DO,
// //     color: "green",
// //   },
// //   {
// //     id: "1",
// //     title: "Issue 1",
// //     text: "some issue",
// //     column: ListIssueType.TO_DO,
// //     color: "blue",
// //   },
// //   {
// //     id: "1",
// //     title: "Issue 1",
// //     text: "some issue",
// //     column: ListIssueType.TO_DO,
// //     color: "gray",
// //   },
// // ];

// const ListIssue = ({ listIssue }: { listIssue: ListIssueType }) => {
//   //   const { issues, dropIssueFrom, swapIssues } = useListIssues(listIssue);
//   //   const { dropIssueFrom, swapIssues } = useListIssues(listIssue);

//   //   const { dropRef, isOver } = useListIssueDrop(listIssue, dropIssueFrom);
//   const issues = useSelector(selectIssues);

//   const ColumnIssues = issues.map((issue, index) => (
//     <Issue
//       key={issue.id}
//       issue={issue}
//       index={index}
//       //   onDropHover={swapIssues}
//     />
//   ));

//   return (
//     <Box>
//       <Heading fontSize="md" letterSpacing="wide">
//         {listIssue}
//       </Heading>

//       <Stack
//         // ref={dropRef}
//         direction={{ base: "column" }}
//         h={{ base: "80vh" }}
//         maxW="100ww"
//         p={4}
//         mt={6}
//         spacing={4}
//         bgColor={"gray.300"}
//         boxShadow="md"
//         overflow="auto"
//         border="1px solid black"
//         // opacity={isOver ? 0.85 : 1}
//       >
//         {/* {ColumnIssues} */}
//       </Stack>
//     </Box>
//   );
// };

// export default ListIssue;
