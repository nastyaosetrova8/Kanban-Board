import { Box, Heading } from "@chakra-ui/react";
import IssueCard from "./IssueCard";
import { useMemo } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Issue } from "../helpers/models";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  column: Column;
  issues: Issue[];
}

const ListIssue: React.FC<Props> = ({ column, issues }) => {
  const issuesIds = useMemo(() => {
    return issues.map((issue) => issue.id);
  }, [issues]);

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: column.id,
      data: {
        type: "Column",
        column,
      },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      maxW="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      borderRadius="4px"
    >
      <Heading size="md" letterSpacing="wide" {...attributes} {...listeners}>
        {column.title}
      </Heading>

      <Box
        style={style}
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        backgroundColor="#B4BDC2"
        border="1px solid #000003a2"
        borderRadius="4px"
        mt="18px"
        gap="14px"
        p="16px"
      >
        <SortableContext items={issuesIds}>
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </SortableContext>
      </Box>
    </Box>
  );
};

export default ListIssue;
