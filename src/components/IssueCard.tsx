import { Box, Text } from "@chakra-ui/react";
import { Issue } from "../helpers/models";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { calculateDaysAgo } from "../helpers/helpers";

interface Props {
  issue: Issue;
}

const IssueCard = ({ issue }: Props) => {
  const createdAt = issue.created_at;
  const daysAgo = calculateDaysAgo(createdAt);

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
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <Box
        ref={setNodeRef}
        as="div"
        bg="#000003a2"
        opacity="30px"
        minH="160px"
        border="1px solid #646cff"
        rounded="24px"
        cursor="grab"
      />
    );
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
      as="div"
      rounded="24px"
      w="100%"
      p="16px"
      boxShadow="xl"
      cursor="grab"
      bgColor="#ffffff"
      border="1px solid #000003a2"
      _hover={{ borderColor: "#646cff" }}
      {...attributes}
      {...listeners}
    >
      <Text textAlign="start" fontWeight="600">
        {issue.title}
      </Text>
      <Text textAlign="start">
        #{issue.number} opened {daysAgo}
      </Text>
      <Text textAlign="start">
        {issue.user.login} | Comments: {issue.comments}
      </Text>
    </Box>
  );
};

export default IssueCard;
