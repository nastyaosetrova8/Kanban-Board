import { Box, Text } from "@chakra-ui/react";
import { Issue, IssueModel } from "../helpers/models";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  issue: Issue;
}

const IssueCard = ({ issue }: Props) => {
  //   const { ref, isDragging } = useIssueDragAndDrop<HTMLDivElement>({
  //     issue,
  //     index: index,
  //     handleDropHover,
  //   });

  const [mouseIsOver, setMouseIsOver] = useState(false);

  // const issues = useSelector(selectIssues);
  // console.log(issues);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: issue.id,
    data: {
      type: "Issue",
      issue,
    },
    // disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <Box
        ref={setNodeRef}
        style={style}
        as="div"
        w={300}
        p="4px 4px 2px"
        bg="gray"
        opacity={30}
        // p={2.5}
        h={100}
        minH={100}
        display="flex"
        alignItems="center"
        border="1px solid white"
        rounded="24px"
        // cursor="grab"
        // position="relative"
        //   className="
        //   opacity-30
        // bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
        // "
      />
    );
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
      as="div"
      // role="group"
      // position="relative"
      rounded="24px"
      w={300}
      p="4px 4px 2px"
      // pl={4}
      // pr={4}
      // pt={4}
      // pb={2}
      boxShadow="xl"
      // cursor="grab"
      bgColor="blue"
      _hover={{ border: "1px solid white" }}
      //   opacity={isDragging ? 0.5 : 1}
      {...attributes}
      {...listeners}
      // onMouseEnter={() => {
      //   setMouseIsOver(true);
      // }}
      // onMouseLeave={() => {
      //   setMouseIsOver(false);
      // }}
    >
      <Text textAlign="start">{issue.id}</Text>
      <Text textAlign="start" mb="8px">
        Comments: {issue.comments}
      </Text>

      {/* <Textarea
        value={issue.title}
        fontWeight="roboto"
        cursor="inherit"
        border="none"
        p={0}
        resize="none"
        minH={20}
        focusBorderColor="green"
        // color="gray.800"
      >
        {issue.title}
      </Textarea> */}
    </Box>
  );
};

export default IssueCard;

// --------------------------------------------

// import { Box, Text } from "@chakra-ui/react";
// import { Issue, IssueModel } from "../helpers/models";
// // import { useIssueDragAndDrop } from "../hooks/useIssueDragAndDrop";
// import { useSelector } from "react-redux";
// import { selectIssues } from "../redux/Issues/selectors";

// type IssueProps = {
//   index: number;
//   issue: IssueModel;
//   onDropHover: (i: number, j: number) => void;
// };

// const IssueCard = ({ index, issue }: IssueProps) => {
//   //   const { ref, isDragging } = useIssueDragAndDrop<HTMLDivElement>({
//   //     issue,
//   //     index: index,
//   //     handleDropHover,
//   //   });

//   const issues = useSelector(selectIssues);
//   console.log(issues);

//   return (
//     <Box
//       //   ref={ref}
//       as="div"
//       role="group"
//       position="relative"
//       rounded="24px"
//       w={300}
//       pl={4}
//       pr={4}
//       pt={4}
//       pb={2}
//       boxShadow="xl"
//       cursor="grab"
//       bgColor={issue.color}
//       //   opacity={isDragging ? 0.5 : 1}
//     >
//       <Text textAlign="start">{issues.title}</Text>
//       <Text textAlign="start" mb="8px">
//         {issues.comment}
//       </Text>
//       {/* <Textarea
//         value={issue.title}
//         fontWeight="roboto"
//         cursor="inherit"
//         border="none"
//         p={0}
//         resize="none"
//         minH={20}
//         focusBorderColor="green"
//         // color="gray.800"
//       >
//         {issue.title}
//         {issue.text}
//       </Textarea> */}
//     </Box>
//   );
// };

// export default IssueCard;
